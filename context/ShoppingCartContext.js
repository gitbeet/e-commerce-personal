import React, {
  createContext,
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import db from "../firebase/config";
import { setDoc, getDoc, doc, getDocs } from "firebase/firestore";

const shoppingCartContext = createContext();

export function useShoppingCart() {
  const context = useContext(shoppingCartContext);
  if (!context) throw new Error("SHOPPING CART CONTEXT NOT FOUND");
  return context;
}

export default function ShoppingCartProvider({ children }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState("shoppingCart");
  const [shoppingCart, setShoppingCart] = useState([]);

  console.log(`INITIALIZING STATE ${shoppingCart.length}`);

  useEffect(() => {
    if (!user) {
      setShoppingCart([]);
      return;
    }
    async function getInitialCartItems() {
      const cartItemsRef = doc(db, "users", user.uid);
      const cartItemsSnapshot = await getDoc(cartItemsRef);
      if (cartItemsSnapshot.exists()) {
        console.log(cartItemsSnapshot.data());
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
        await setDoc(doc(db, "users", user.uid), {
          shoppingCart,
        });
      } catch (error) {
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

  function addToCart(prod, quantity) {
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
    console.log(shoppingCart);
  }

  function changeQuantity(id, operator) {
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

  function removeItem(id) {
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
