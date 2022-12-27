/* eslint-disable react-hooks/rules-of-hooks */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import db from "../firebase/config";
import { setDoc, getDoc, doc, getDocs } from "firebase/firestore";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { DisplayProductInterface, ShoppingCartProductInterface } from "Models";

interface Props {
  children?: ReactNode;
}

interface ShoppingCartContextInterface {
  shoppingCart: ShoppingCartProductInterface[];
  addToCart: (product: DisplayProductInterface, quantity: number) => void;
  removeItem: (id: string) => void;
  changeQuantity: (id: string, operator: string) => void;
}

const shoppingCartContext = createContext<ShoppingCartContextInterface | null>(
  null
);

export function useShoppingCart() {
  const context = useContext(shoppingCartContext);
  if (!context) throw new Error("SHOPPING CART CONTEXT NOT FOUND");
  return context;
}

export default function ShoppingCartProvider({ children }: Props): JSX.Element {
  const { user } = useAuth();
  const [userData, setUserData] = useState<string>("shoppingCart");
  const [shoppingCart, setShoppingCart] = useState<
    ShoppingCartProductInterface[]
  >([]);

  // useEffect(() => {
  //   if (!user) {
  //     setShoppingCart([]);
  //   }
  //   console.log(user);
  // }, [user]);

  // const { isLoading, isError } = useQuery(
  //   [`get-shopping-cart-data`],
  //   () => {
  //     return getShoppingCartProducts();
  //   },
  //   {
  //     enabled: Boolean(user?.uid),
  //     onSuccess: (data) => {
  //       console.log(data);
  //       setShoppingCart(data);
  //     },
  //   }
  // );

  // async function getShoppingCartProducts() {
  //   const cartItemsRef = doc(db, "users", user.uid);
  //   const cartItemsSnapshot = await getDoc(cartItemsRef);
  //   return cartItemsSnapshot.data().shoppingCart;
  // }
  // const { mutate: updateShoppingCartMutate } = updateShoppingCartReactQuery();

  // function updateShoppingCartReactQuery() {
  //   const queryClient = useQueryClient();
  //   return useMutation(updateShoppingCart, {
  //     onSuccess: queryClient.invalidateQueries("get-shopping-cart-data"),
  //   });
  // }

  // async function updateShoppingCart() {
  //   await setDoc(doc(db, "users", user.uid), {
  //     shoppingCart,
  //   });
  // }

  useEffect(() => {
    if (!user) {
      setShoppingCart([]);
      return;
    }
    async function getInitialCartItems() {
      if (!user) return;
      const cartItemsRef = doc(db, "users", user.uid);
      const cartItemsSnapshot = await getDoc(cartItemsRef);
      if (cartItemsSnapshot.exists()) {
        setShoppingCart(cartItemsSnapshot.data().shoppingCart);
      } else {
        setShoppingCart([]);
      }
    }
    getInitialCartItems();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    async function updateCart() {
      // const userDataRef = doc(db, "users", user.uid);
      try {
        if (!user) return;
        await setDoc(doc(db, "users", user.uid), {
          shoppingCart,
        });
        // ANY ??
      } catch (error: any) {
        console.log(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    }
    updateCart();
  }, [shoppingCart]);

  // useEffect(() => {
  //   // when loading get the items from the DB
  //   const shoppingCartJSON = localStorage.getItem(userData);
  //   if (shoppingCartJSON != null) setShoppingCart(JSON.parse(shoppingCartJSON));
  //   console.log(`COPYING VALUES FROM LOCALSTORAGE ${shoppingCart.length}`);
  // }, []);

  // useEffect(() => {
  //   // When changing user get the items for the currentUser from the DB
  //   if (!user) {
  //     setUserData("shoppingCart");
  //     const shoppingCartJSON = localStorage.getItem("shoppingCart");
  //     if (shoppingCartJSON != null) {
  //       setShoppingCart((prev) => (prev = JSON.parse(shoppingCartJSON)));
  //     } else {
  //       setShoppingCart((prev) => (prev = []));
  //     }
  //     console.log(`IF STATEMENT ${shoppingCart.length}`);
  //   } else {
  //     setUserData((prev) => (prev = user.email));
  //     const userEmail = user.email;
  //     const shoppingCartJSON = localStorage.getItem(userEmail);
  //     if (shoppingCartJSON != null) {
  //       setShoppingCart((prev) => (prev = JSON.parse(shoppingCartJSON)));
  //     } else {
  //       setShoppingCart((prev) => (prev = []));
  //     }
  //   }
  // }, [user]);

  // useEffect(() => {
  //   // update the DB user cart as the cart changes
  //   localStorage.setItem(userData, JSON.stringify(shoppingCart));
  //   console.log(`SETTING ITEM ${shoppingCart.length}`);
  // }, [shoppingCart]);

  function addToCart(prod: DisplayProductInterface, quantity: number) {
    if (quantity === 0) return;
    setShoppingCart((prev) => {
      return prev.length === 0
        ? [...prev, { ...prod, quantity: quantity }]
        : prev.findIndex((product) => product.id === prod.id) === -1
        ? [...prev, { ...prod, quantity: quantity }]
        : prev.map((product) => {
            return product.id === prod.id
              ? { ...product, quantity: product.quantity + quantity }
              : { ...product };
          });
    });
  }

  function changeQuantity(id: string, operator: string) {
    setShoppingCart((prev) =>
      prev.map((product) => {
        return product.id === id
          ? {
              ...product,
              quantity:
                operator === "plus"
                  ? product.quantity + 1
                  : product.quantity < 2
                  ? 1
                  : product.quantity - 1,
            }
          : product;
      })
    );
  }

  function removeItem(id: string) {
    setShoppingCart((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <shoppingCartContext.Provider
      value={{
        shoppingCart,
        addToCart,
        removeItem,
        changeQuantity,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
}
