import React from "react";

export default function Star({
  changeColorOnHover,
  id,
  userRating,
  rateProduct,
  rateable = false,
  rate,
}) {
  return (
    <>
      {rateable ? (
        <i
          onMouseOver={() => changeColorOnHover(id)}
          onClick={rateProduct}
          className={
            userRating >= id
              ? `fa fa-star text-primary-600 cursor-pointer`
              : `fa fa-star text-neutral-500 cursor-pointer`
          }
        ></i>
      ) : (
        <i
          className={
            rate >= id - 1
              ? `fa fa-star text-primary-600 cursor-pointer`
              : `fa fa-star text-neutral-500 cursor-pointer`
          }
        ></i>
      )}
    </>
  );
}
