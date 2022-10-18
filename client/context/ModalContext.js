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

  function toggleMobileMenu() {
    setShowMobileMenu((prev) => !prev);
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
      }}
    >
      {children}
    </modalContext.Provider>
  );
}
