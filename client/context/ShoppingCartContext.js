import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const shoppingCartContext = createContext();

export function useShoppingCart() {
  const context = useContext(shoppingCartContext);
  if (!context) throw new Error("SHOPPING CART CONTEXT NOT FOUND");
  return context;
}

export default function ShoppingCartProvider({ children }) {
  const [userData, setUserData] = useState("shoppingCart");

  const [shoppingCart, setShoppingCart] = useState([]);

  const { user } = useAuth();
  console.log(`INITIALIZING STATE ${shoppingCart.length}`);

  useEffect(() => {
    const shoppingCartJSON = localStorage.getItem(userData);
    if (shoppingCartJSON != null) setShoppingCart(JSON.parse(shoppingCartJSON));
    console.log(`COPYING VALUES FROM LOCALSTORAGE ${shoppingCart.length}`);
  }, []);

  useEffect(() => {
    if (!user) {
      setUserData("shoppingCart");
      const shoppingCartJSON = localStorage.getItem("shoppingCart");
      if (shoppingCartJSON != null) {
        setShoppingCart((prev) => (prev = JSON.parse(shoppingCartJSON)));
      } else {
        setShoppingCart((prev) => (prev = []));
      }
      console.log(`IF STATEMENT ${shoppingCart.length}`);
    } else {
      setUserData((prev) => (prev = user.email));
      const userEmail = user.email;
      const shoppingCartJSON = localStorage.getItem(userEmail);
      if (shoppingCartJSON != null) {
        setShoppingCart((prev) => (prev = JSON.parse(shoppingCartJSON)));
      } else {
        setShoppingCart((prev) => (prev = []));
      }
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(userData, JSON.stringify(shoppingCart));
    console.log(`SETTING ITEM ${shoppingCart.length}`);
  }, [shoppingCart]);

  function addToCart(prod, quantity) {
    if (quantity === 0) return;
    setShoppingCart((prev) => {
      return prev.length === 0
        ? [...prev, { product: prod, quantity: quantity }]
        : prev.findIndex((product) => product.id === prod.id) === -1
        ? [...prev, { product: prod, quantity: quantity }]
        : prev.map((product) => {
            return product.id === prod.id
              ? { ...product, quantity: product.quantity + quantity }
              : { ...product };
          });
    });
    console.log(shoppingCart);
  }

  function changeQuantity(productId, operator) {
    setShoppingCartProducts((prev) =>
      prev.map((product) => {
        return product.name === productId
          ? {
              ...product,
              quantity:
                operator === "plus"
                  ? product.quantity + 1
                  : product.quantity < 1
                  ? 0
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
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
}
