import React from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductsGrid.module.css";
import { ProductInterface } from "../Models";
interface Props {
  products: ProductInterface[];
}

const ProductsGrid = ({ products }: Props) => {
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
