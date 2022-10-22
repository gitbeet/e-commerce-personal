import React from "react";

export default function Star({
  rateable = false,
  changeColorOnHover,
  id,
  checkedUpTo,
  rate,
  checked,
}) {
  return (
    <i
      onMouseOver={() => changeColorOnHover(id)}
      className={
        checkedUpTo >= id
          ? `fa fa-star text-primary-600 cursor-pointer`
          : `fa fa-star text-neutral-500 cursor-pointer`
      }
    ></i>
  );
}
