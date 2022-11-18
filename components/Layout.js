import { useModal } from "../context/ModalContext";
import Footer from "./Footer";
import Meta from "./Meta";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav";
import ShoppingCartModal from "./ShoppingCartModal";
import UserModal from "./UserModal";

export default function Layout({ children }) {
  const {
    showMobileMenu,
    toggleMobileMenu,
    showShoppingCartModal,
    toggleShoppingCartModal,
    showUserModal,
    toggleUserModal,
  } = useModal();

  return (
    <div className="min-h-[100vh] flex flex-col ">
      <div className="lg:w-[80%] mx-auto flex flex-col">
        <Meta />
        <Nav />
        <MobileMenu show={showMobileMenu} onClose={toggleMobileMenu} />
        <ShoppingCartModal
          show={showShoppingCartModal}
          onClose={toggleShoppingCartModal}
        />
        {children}
      </div>
      <Footer />
    </div>
  );
}
