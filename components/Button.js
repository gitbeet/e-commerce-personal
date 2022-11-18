import React from "react";

export default function Button({
  onClick,
  text,
  type,
  size,
  disabled = false,
}) {
  return (
    <button
      disabled={disabled}
      tabIndex={0}
      onClick={onClick}
      className={`disabled:opacity-50 w-full text-md font-semibold text-neutral-900 bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-md shadow-lg transition-all duration-[400ms] whitespace-nowrap ${
        size === "sm" ? "px-6 py-2" : "px-6 py-3"
      } bg-gradient-to-r  ${
        type === "primary" && "from-primary-550 via-primary-600 to-primary-500"
      } ${
        type === "danger" && "from-primary-550 via-primary-600 to-primary-500"
      }}`}
    >
      {text}
    </button>
  );
}
