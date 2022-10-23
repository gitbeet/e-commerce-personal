import React, { useEffect, useState } from "react";
import Star from "./Star";

export default function Rating({
  rating,
  rateable = false,
  commentRating = false,
  rateProduct,
  userRating,
  changeUserRatingOnHover,
  toggleAlreadyRatedMessage,
}) {
  const { rate, count } = rating;

  const stars = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  return (
    <>
      {rateable ? (
        <div className="flex items-center space-x-2">
          <div onMouseLeave={() => changeUserRatingOnHover(Math.round(rate))}>
            {stars.map((star) => (
              <Star
                key={star.id}
                id={star.id}
                rateable={rateable}
                changeUserRatingOnHover={changeUserRatingOnHover}
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
          <div onClick={toggleAlreadyRatedMessage}>
            {stars.map((star) => (
              <Star
                key={star.id}
                id={star.id}
                rate={rate}
                commentRating={commentRating}
              />
            ))}
          </div>
          {!commentRating && (
            <span className="text-neutral-400">
              {rate}
              <span className="text-neutral-400 text-xs"> ({count})</span>
            </span>
          )}
        </div>
      )}
    </>
  );
}
