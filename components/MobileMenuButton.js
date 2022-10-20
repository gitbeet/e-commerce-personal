import { useState } from "react";
import { useModal } from "../context/ModalContext";

export default function MobileMenuButton() {
  const { showMobileMenu, toggleMobileMenu } = useModal();

  return (
    <div onClick={toggleMobileMenu} className="space-y-[6px]">
      <div className="w-[40px] h-[4px] bg-neutral-200 rounded-full"></div>
      <div className="w-[40px] h-[4px] bg-neutral-200 rounded-full"></div>
      <div className="w-[40px] h-[4px] bg-neutral-200 rounded-full"></div>
    </div>
  );
}
