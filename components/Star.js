import React from "react";

export default function Star({
  changeUserRatingOnHover,
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
          onMouseOver={() => changeUserRatingOnHover(id)}
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
            Math.round(rate) >= id
              ? `fa fa-star text-primary-600 cursor-pointer`
              : `fa fa-star text-neutral-500 cursor-pointer`
          }
        ></i>
      )}
    </>
  );
}
