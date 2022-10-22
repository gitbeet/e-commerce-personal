import SimilarProduct from "./SimilarProduct";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase/config";

export default function SimilarProductsList({ category, productId }) {
  const [similarProducts, setSimilarProducts] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSimilarProducts() {
      const similarProductsQuery = query(
        collection(db, "productsList"),
        where("category", "==", category)
      );
      const similarProductsSnapshot = await getDocs(similarProductsQuery);

      let p = [];

      similarProductsSnapshot.forEach((product) => {
        return p.push(product.data());
      });
      setSimilarProducts(p);
    }
    getSimilarProducts();
  }, [category]);

  if (!similarProducts) return <h1>loading...</h1>;
  return (
    <Swiper spaceBetween={20} slidesPerView={1.5} controller={true}>
      {similarProducts
        .filter((product) => product.id !== productId)
        .map((product) => (
          <SwiperSlide key={product.id}>
            <SimilarProduct product={product} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
