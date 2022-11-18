/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import Rating from "./Rating";
import ImageModal from "./ImageModal";
import Link from "next/link";
import AddToCart from "./AddToCart";

export default function ProductCard(props) {
  const { addItems } = useShoppingCart();
  const [open, setOpen] = useState(false);
  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  if (props.product) {
    const {
      id,
      title,
      description,
      price,
      category,
      image,
      rating,
      displayElement,
    } = props.product;
    const { rate, count } = rating;

    return (
      <>
        <div
          className={`${
            displayElement ? "flex" : "hidden"
          } flex-col justify-center items-center border border-neutral-800 rounded-md  text-center md:w-[20rem] p-6 md:justify-between`}
        >
          {/* IMAGE */}
          <div
            onClick={openModal}
            className="w-full overflow-hidden cursor-pointer"
          >
            <img
              className=" hover-hover:hover:scale-110 transition-all duration-[400ms] ease-in-out"
              src={image}
              alt="product img"
            />
          </div>
          {/* BODY */}
          <div>
            <div className="mb-24 mt-8">
              <Link href={`/products/${id}`}>
                <p className="text-neutral-400 text-xl cursor-pointer">
                  {title}
                </p>
              </Link>
            </div>
            {/* RATING ROW */}
            <div className="flex justify-between mb-10">
              <Rating rating={rating} />
              <Link className="more__info" href={`/products/${id}`}>
                <p className=" cursor-pointer text-secondary-600 hover-hover:hover:text-secondary-500 transition-all">
                  More info
                </p>
              </Link>
            </div>
            {/* PRICE ROW */}
            <div className="flex justify-between items-center">
              <p className="text-secondary-400 text-lg tracking-wider  text-neutral-400 ">
                {formatCurrency(price)}
              </p>
            </div>
            <AddToCart product={props.product} />
          </div>
        </div>
        <ImageModal open={open} product={props.product} onClose={closeModal} />
      </>
    );
  } else {
    return <h1>loading...</h1>;
  }
}
