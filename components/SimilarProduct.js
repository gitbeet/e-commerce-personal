/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { formatCurrency } from "../Utilities/formatCurrency";

export default function SimilarProduct({ product }) {
  const { title, image, price, id } = product;

  return (
    <Link href={`/products/${id}`}>
      <div className="cursor-pointer h-[70vw] border border-neutral-500 rounded-md flex flex-col items-center justify-between p-4 ">
        <div className="max-h-[20]">
          <p className="w-full  text-sm text-center">{title}</p>
        </div>

        <div className="flex items-center justify-center w-full">
          <img src={image} alt="img src" />
        </div>
        <p>{formatCurrency(price)}</p>
      </div>
    </Link>
  );
}
