import React, { createContext, useContext, useEffect, useState } from "react";

const apiContext = createContext();

export function useProductData() {
  const context = useContext(apiContext);
  if (!context) throw new Error("THERE IS NO API CONTEXT");
  return context;
}

export default function ProductDataProvider({ children }) {
  const [products, setProducts] = useState();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((productData) => setProducts(productData));
  }, []);

  return (
    <apiContext.Provider value={{ products }}>{children}</apiContext.Provider>
  );
}
