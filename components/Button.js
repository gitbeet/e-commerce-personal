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
          ? `disabled:opacity-20 w-fit text-md bg-primary-500 text-neutral-900 rounded-md shadow-lg px-6  py-2  hover-hover:hover:bg-primary-600 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "primary" && size === "lg"
          ? `disabled:opacity-20 w-fit text-md bg-primary-500 text-neutral-900 rounded-md shadow-lg px-6  py-3  hover-hover:hover:bg-primary-600 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "secondary" && size === "sm"
          ? `disabled:opacity-20 w-fit text-md bg-secondary-500 text-secondary-200 rounded-md shadow-lg px-6  py-2  hover-hover:hover:bg-neutral-400 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "secondary" && size === "lg"
          ? `disabled:opacity-20 w-fit text-md bg-secondary-500 text-secondary-200 rounded-md shadow-lg px-6  py-3  hover-hover:hover:bg-neutral-400 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "danger" && size === "sm"
          ? `disabled:opacity-20 w-fit text-md bg-danger-500 text-neutral-900 rounded-md shadow-lg px-6  py-2  hover-hover:hover:bg-danger-600 transition-all ${
              disabled && "opacity-50"
            }`
          : `disabled:opacity-20 w-fit text-md bg-danger-500 text-neutral-900 rounded-md shadow-lg px-6  py-3  hover-hover:hover:bg-danger-600 transition-all ${
              disabled && "opacity-50"
            }`
      }
    >
      {text}
    </button>
  );
}
