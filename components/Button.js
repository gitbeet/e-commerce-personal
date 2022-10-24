import React from "react";

export default function Button({
  onClick,
  text,
  type,
  size,
  disabled = false,
  submit = false,
}) {
  return (
    <button
      disabled={disabled}
      tabIndex={0}
      onClick={onClick}
      className={
        type === "primary" && size === "sm"
          ? `disabled:opacity-50 w-full text-md font-semibold text-neutral-900 bg-gradient-to-r   from-primary-550 via-primary-600 to-primary-500  bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-md shadow-lg px-6  py-2   transition-all duration-[400ms] whitespace-nowrap ${
              disabled && "opacity-50"
            }`
          : type === "primary" && size === "lg"
          ? `disabled:opacity-50 w-full text-md font-semibold text-neutral-900 bg-gradient-to-r   from-primary-550 via-primary-600 to-primary-500  bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-md shadow-lg px-6  py-3   transition-all duration-[400ms] whitespace-nowrap ${
              disabled && "opacity-50"
            }`
          : type === "secondary" && size === "sm"
          ? `disabled:opacity-50 w-full text-md font-semibold bg-secondary-500 text-secondary-200 rounded-md shadow-lg px-6  py-2  hover-hover:hover:bg-neutral-400 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "secondary" && size === "lg"
          ? `disabled:opacity-50 w-full text-md font-semibold bg-secondary-500 text-secondary-200 rounded-md shadow-lg px-6  py-3  hover-hover:hover:bg-neutral-400 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "danger" && size === "sm"
          ? `disabled:opacity-50 w-full text-md font-semibold bg-danger-500 text-neutral-900 rounded-md shadow-lg px-6  py-2  hover-hover:hover:bg-danger-600 transition-all ${
              disabled && "opacity-50"
            }`
          : `disabled:opacity-50 w-full text-md font-semibold bg-danger-500 text-neutral-900 rounded-md shadow-lg px-6  py-3  hover-hover:hover:bg-danger-600 transition-all ${
              disabled && "opacity-50"
            }`
      }
    >
      {text}
    </button>
  );
}
