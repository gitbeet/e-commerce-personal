const { createContext, useContext, useState } = require("react");

const modalContext = createContext();

export function useModal() {
  const context = useContext(modalContext);
  if (!context) throw new Error("Modal context was not found.");
  return context;
}

export default function ModalProvider({ children }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showShoppingCartModal, setShowShoppingCartModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  function toggleMobileMenu() {
    setShowMobileMenu((prev) => !prev);
  }

  function toggleUserModal() {
    setShowUserModal((prev) => !prev);
  }

  function toggleShoppingCartModal() {
    setShowShoppingCartModal((prev) => !prev);
  }

  return (
    <modalContext.Provider
      value={{
        showMobileMenu,
        toggleMobileMenu,
        showShoppingCartModal,
        toggleShoppingCartModal,
        showUserModal,
        toggleUserModal,
      }}
    >
      {children}
    </modalContext.Provider>
  );
}
