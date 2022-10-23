import React, { useEffect, useState } from "react";
import Star from "./Star";

export default function Rating({
  rating,
  rateable = false,
  rateProduct,
  userRating,
  changeColorOnHover,
}) {
  const { rate, count } = rating;

  const stars = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  return (
    <>
      {rateable ? (
        <div className="flex items-center space-x-2">
          <div onMouseLeave={() => changeColorOnHover(Math.round(rate))}>
            {stars.map((star) => (
              <Star
                key={star.id}
                id={star.id}
                // checked={star.id <= starRating}
                rateable={rateable}
                changeColorOnHover={changeColorOnHover}
                userRating={userRating}
                rate={rate}
                rateProduct={rateProduct}
              />
            ))}
          </div>
          <span className="text-neutral-400">
            {rate}
            <span className="text-neutral-400 text-xs"> ({count})</span>
          </span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div>
            {stars.map((star) => (
              <Star key={star.id} id={star.id} rate={rate} />
            ))}
          </div>
          <span className="text-neutral-400">
            {rate}
            <span className="text-neutral-400 text-xs"> ({count})</span>
          </span>
        </div>
      )}
    </>
  );
}
