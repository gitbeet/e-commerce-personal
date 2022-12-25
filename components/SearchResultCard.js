import React from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import Link from "next/link";
const SearchResultCard = ({ product }) => {
  const { image, title, price, id } = product;
  return (
    <div className="p-4 flex gap-8 border-b border-neutral-600">
      <Link href={`/products/${id}`}>
        <img className="h-16 cursor-pointer" src={image} alt="img" />
      </Link>
      <div>
        <Link href={`/products/${id}`}>
          <h1 className="cursor-pointer">{title}</h1>
        </Link>
        <p className="font-semibold">{formatCurrency(price)}</p>
      </div>
    </div>
  );
};

export default SearchResultCard;
