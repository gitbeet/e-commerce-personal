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

  function addItems(id, itemToAdd) {
    setShoppingCart((prev) => {
      return prev.findIndex((el) => el.id === id) === -1
        ? [...prev, { ...itemToAdd, quantity: 1 }]
        : prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
    });
  }

  function removeItems(id) {
    setShoppingCart((prev) => {
      return prev.map((item) =>
        item.id === id
          ? item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : { ...item, quantity: 0 }
          : item
      );
    });
  }

  function removeItemFromCheckout(id) {
    setShoppingCart((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <shoppingCartContext.Provider
      value={{ shoppingCart, addItems, removeItems, removeItemFromCheckout }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
}
