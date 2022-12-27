/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import Rating from "./Rating";
import ImageModal from "./ImageModal";
import Link from "next/link";
import Button from "./Button";
import { IoCartOutline } from "react-icons/io5";
import { DisplayProductInterface } from "Models";

interface Props {
  product: DisplayProductInterface;
}

const ProductCard = ({ product }: Props): JSX.Element => {
  const { addToCart } = useShoppingCart();
  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  if (product) {
    const { id, title, price, image, rating, displayElement } = product;

    return (
      <>
        <div
          className={`${
            displayElement ? "flex" : "hidden"
          }  flex-col justify-between items-center border border-neutral-800 rounded-md  text-center p-6 saturate-0`}
        >
          {/* IMAGE */}
          <Link href={`/products/${id}`}>
            <div
              // onClick={openModal}
              className="max-w-full overflow-hidden cursor-pointer"
            >
              <img
                className=" hover-hover:hover:scale-105 transition-all duration-[400ms] ease-in-out"
                src={image}
                alt="product img"
              />
            </div>
          </Link>
          {/* BODY */}
          <div className="flex flex-col max-w-full">
            <div className="mb-12 mt-8 line-clamp-3">
              <Link href={`/products/${id}`}>
                <p className="text-neutral-400 text-md cursor-pointer ">
                  {title}
                </p>
              </Link>
            </div>
            {/* RATING ROW */}
            <div className="flex justify-end mb-4">
              <Rating rating={rating} />
            </div>

            {/* PRICE ROW */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-secondary-400 text-lg tracking-wider  text-neutral-400 font-bold ">
                {formatCurrency(price)}
              </p>
              <Link href={`/products/${id}`}>
                <p className=" cursor-pointer text-secondary-600 hover-hover:hover:text-secondary-500 transition-all text-right">
                  More info
                </p>
              </Link>
            </div>
            {/* <AddToCart product={props.product} /> */}
            <Button
              onClick={() => addToCart(product, 1)}
              text="Add to cart"
              type="primary"
              size="lg"
              textSize="md"
              padding="4"
              width="full"
              icon={<IoCartOutline className="w-8 h-8" />}
            />
          </div>
        </div>
        <ImageModal open={open} product={product} onClose={closeModal} />
      </>
    );
  } else {
    return <h1>loading...</h1>;
  }
};

export default ProductCard;
