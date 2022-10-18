import SimilarProduct from "./SimilarProduct";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function SimilarProductsList({ category, productId }) {
  const [similarProducts, setSimilarProducts] = useState();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => setSimilarProducts(json));
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
