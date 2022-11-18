import React from "react";

export default function Button({
  onClick,
  text,
  type = "primary",
  size,
  disabled = false,
  padding = "6",
  textSize = "md",
  fontWeight = "semibold",
  shadow = true,
  focus = false,
}) {
  return (
    <button
      disabled={disabled}
      tabIndex={0}
      onClick={onClick}
      className={`disabled:opacity-50   w-full text-${textSize} font-${fontWeight} rounded-md ${
        shadow ? "shadow-lg" : ""
      } transition-all duration-[200ms] whitespace-nowrap ${
        size === "sm" ? `px-${padding} py-2` : `px-${padding} py-3`
      }
      ${
        type === "primary"
          ? " text-neutral-900 border-primary-500 bg-primary-500 hover-hover:hover:bg-primary-600"
          : ""
      } 
      ${
        type === "ghost"
          ? ` bg-none ${
              focus
                ? "border-primary-500 text-neutral-900 bg-primary-500 "
                : "border-neutral-600  text-neutral-200"
            } `
          : ""
      } `}
    >
      {text}
    </button>
  );
}
