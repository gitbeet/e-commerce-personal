import React from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductsGrid.module.css";

const ProductsGrid = ({ products }) => {
  return (
    <div className={styles.productsGrid}>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductsGrid;
