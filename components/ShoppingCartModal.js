import * as ReactDOM from "react-dom";
import { useModal } from "../context/ModalContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Backdrop from "./Backdrop";
import ShoppingCartModalProduct from "./ShoppingCartModalProduct";
import { v4 as uuid } from "uuid";
import Button from "./Button";
import { useEffect } from "react";

export default function ShoppingCartModal({ show, onClose }) {
  const { shoppingCart } = useShoppingCart();

  if (typeof window === "object") {
    return ReactDOM.createPortal(
      <>
        {show ? (
          <>
            <div className="fixed  w-[min(90%,450px)]  top-[10rem]  z-[9] left-1/2 -translate-x-1/2 bg-neutral-900 p-8 rounded-md ">
              <div className="flex flex-col space-y-8 border-b border-neutral-600 pb-8">
                {shoppingCart.map((product) => {
                  return (
                    <ShoppingCartModalProduct key={uuid()} product={product} />
                  );
                })}
              </div>
              <div className="p-4 flex justify-center items-center">
                <Button type="primary" size="sm" text="Checkout" />
              </div>
            </div>
            <Backdrop onClose={onClose} zIndex={8} />
          </>
        ) : null}
      </>,
      document.getElementById("modal-root")
    );
  }
  return null;
}
