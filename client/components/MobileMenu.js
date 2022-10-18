import { useModal } from "../context/ModalContext";
import NavLinks from "./NavLinks";
import * as ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import Link from "next/link";
import styles from "../styles/MobileMenu.module.css";

export default function MobileMenu({ show, onClose }) {
  if (typeof window === "object") {
    return ReactDOM.createPortal(
      <>
        {show ? (
          <>
            <div
              className={
                "fixed min-h-[100vh] top-0 bottom-0 left-0 pl-10 pr-28 pt-32 z-[20] bg-[white] shadow-lg"
              }
            >
              {/* <div className={show ? styles.MobileMenuShow : styles.MobileMenu}> */}
              <p
                onClick={onClose}
                className="absolute left-full top-0 -translate-x-full pr-4 pt-4 cursor-pointer "
              >
                Close
              </p>
              <ul className="flex flex-col text-2xl uppercase tracking-widest space-y-12">
                <li onClick={onClose}>
                  <Link href="/">Home</Link>
                </li>
                <li onClick={onClose}>
                  <Link href="/products">Products</Link>
                </li>
                <li onClick={onClose}>
                  <Link href="/profile">Profile</Link>
                </li>
                <li onClick={onClose}>
                  <Link href="/about">About</Link>
                </li>
              </ul>
            </div>
            <Backdrop onClose={onClose} zIndex={10} />
          </>
        ) : null}
      </>,
      document.getElementById("modal-root")
    );
  }

  return null;
}
