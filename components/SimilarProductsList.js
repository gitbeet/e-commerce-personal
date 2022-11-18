import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SimilarProduct from "./SimilarProduct";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase/config";

const breakpoints = {
  375: {
    width: 375,
    slidesPerView: 1.5,
  },
};

export default function SimilarProductsList({ category, productId }) {
  const [similarProducts, setSimilarProducts] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSimilarProducts() {
      const similarProductsQuery = query(
        collection(db, "productsList")
        // fetching all for now for slider test
        // where("category", "==", category)
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
    <Swiper
      loop={true}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      spaceBetween={10}
      slidesPerView={1}
      controller={true}
      breakpoints={breakpoints}
    >
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
