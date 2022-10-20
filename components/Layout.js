import { useModal } from "../context/ModalContext";
import Footer from "./Footer";
import Meta from "./Meta";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav";
import ShoppingCartModal from "./ShoppingCartModal";

export default function Layout({ children }) {
  const { showMobileMenu, toggleMobileMenu } = useModal();
  const { showShoppingCartModal, toggleShoppingCartModal } = useModal();

  return (
    <div className="min-h-[100vh] flex flex-col">
      <Meta />
      <Nav />
      <MobileMenu show={showMobileMenu} onClose={toggleMobileMenu} />
      <ShoppingCartModal
        show={showShoppingCartModal}
        onClose={toggleShoppingCartModal}
      />
      {children}
      <Footer />
    </div>
  );
}
