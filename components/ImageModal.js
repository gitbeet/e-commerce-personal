/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import * as ReactDOM from "react-dom";
import { formatCurrency } from "../Utilities/formatCurrency";
import Backdrop from "./Backdrop";

export default function ImageModal(props) {
  if (!props.open) return null;

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

  return ReactDOM.createPortal(
    <>
      <div className="shadow-lg fixed  px-8 overflow-auto  w-[90vw] max-h-[90vh] top-[50vh] left-[50vw] -translate-x-1/2 -translate-y-1/2 bg-neutral-900 z-[20] rounded-md  text-left space-y-4">
        <div className="h-full flex flex-col justify-between">
          <img className="pt-16 mx-auto" src={image} alt="img src" />
          <div className="flex flex-col justify-between items-stretch h-full pt-10 pb-8">
            <div className="space-y-4">
              <h3 className="text-lg text-neutral-200">{title}</h3>
              <p>{formatCurrency(price)}</p>
            </div>
            <div className="">
              <p className="text-neutral-400">{description}</p>
              <Link href={`/products/${id}`}>Go to product&apos;s page</Link>
            </div>
          </div>
          <span
            className="py-4 px-6 absolute top-0 left-full -translate-x-full scale-150 origin-center"
            onClick={props.onClose}
          >
            <i className="fa fa-close text-neutral-400" />
          </span>
        </div>
      </div>
      <Backdrop onClose={props.onClose} />
    </>,

    document.getElementById("modal-root")
  );
}
