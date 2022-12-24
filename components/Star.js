import React from "react";

export default function Star({
  changeUserRatingOnHover,
  id,
  userRating,
  rateProduct,
  rateable = false,
  rate,
  commentRating,
}) {
  return (
    <>
      {rateable ? (
        <i
          onMouseOver={() => changeUserRatingOnHover(id)}
          onClick={rateProduct}
          className={
            userRating >= id
              ? `fa fa-star text-sm text-primary-600  ${
                  !commentRating && "cursor-pointer"
                }`
              : `fa fa-star text-sm text-neutral-500  ${
                  !commentRating && "cursor-pointer"
                }`
          }
        ></i>
      ) : (
        <i
          className={
            Math.round(rate) >= id
              ? `fa fa-star text-sm text-primary-600  ${
                  !commentRating && "cursor-pointer"
                }`
              : `fa fa-star text-sm text-neutral-500  ${
                  !commentRating && "cursor-pointer"
                }`
          }
        ></i>
      )}
    </>
  );
}
