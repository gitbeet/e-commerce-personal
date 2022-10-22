/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { formatCurrency } from "../utilities/formatCurrency";

export default function SimilarProduct({ product }) {
  const { title, image, price, id } = product;

  return (
    <Link href={`/products/${id}`}>
      <div className="cursor-pointer h-[70vw] bg-neutral-900 border border-neutral-500 rounded-md flex flex-col items-center justify-between px-4 py-2 ">
        <div className="block max-h-[48px] overflow-hidden">
          <p className="w-fit leading-4   text-sm text-center">{title}</p>
        </div>

        <div className="flex items-center justify-center w-full max-h-[35vw]">
          <img className="max-h-full" src={image} alt="img src" />
        </div>
        <p>{formatCurrency(price)}</p>
      </div>
    </Link>
  );
}
