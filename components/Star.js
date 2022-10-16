import React from "react";

export default function Star({ checked }) {
  return (
    <i
      className={
        checked ? `fa fa-star text-primary-600` : `fa fa-star text-neutral-500`
      }
    ></i>
  );
}
