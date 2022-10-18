/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import SmallButton from "./SmallButton";
export default function ShoppingCartModalProduct({ product }) {
  const { removeItem } = useShoppingCart();
  console.log(product);

  const { id, image, title, price } = product.product;
  const { quantity } = product;

  if (!product) return <h1>loading data...</h1>;

  const formattedPrice = formatCurrency(price);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="space-x-4 flex w-full">
        <div className="w-[75px] h-[75px]  p-2 flex items-center justify-center">
          <img className="" src={image} alt="product" />
        </div>
        <div className="flex flex-col">
          <div>
            <h2 className="truncate max-w-[12rem]">{title}</h2>
            <p>{formattedPrice}</p>
          </div>
          <div className="flex items-center justify-start bg-neutral-800 w-fit space-x-4">
            <SmallButton text="-" />
            <p>{quantity}</p>
            <SmallButton text="+" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-sm">
        <SmallButton
          text={<i className="fa fa-trash"></i>}
          onClick={() => removeItem(id)}
        />
      </div>
    </div>
  );
}
