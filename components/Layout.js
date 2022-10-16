import { useModal } from "../context/ModalContext";
import Meta from "./Meta";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav";

export default function Layout({ children }) {
  const { showMobileMenu, toggleMobileMenu } = useModal();

  return (
    <>
      <Meta />
      <Nav />
      <MobileMenu show={showMobileMenu} onClose={toggleMobileMenu} />
      {children}
    </>
  );
}
