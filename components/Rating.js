import React, { useDeferredValue, useEffect, useState } from "react";
import Star from "./Star";

export default function Rating({ rating, rateable = false }) {
  const { rate, count } = rating;
  const starRating = Math.round(rate);
  const [checkedUpTo, setCheckedUpTo] = useState(starRating);
  function changeColorOnHover(id) {
    setCheckedUpTo(id);
  }
  const stars = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  useEffect(() => {
    changeColorOnHover(starRating);
  }, [starRating]);

  return (
    <div className="flex items-center space-x-2">
      <div onMouseLeave={() => changeColorOnHover(starRating)}>
        {stars.map((star) => (
          <Star
            key={star.id}
            id={star.id}
            // checked={star.id <= starRating}
            rateable={rateable}
            changeColorOnHover={changeColorOnHover}
            checkedUpTo={checkedUpTo}
            rate={rate}
          />
        ))}
      </div>
      <span className="text-neutral-400">
        {rate}
        <span className="text-neutral-400 text-xs"> ({count})</span>
      </span>
    </div>
  );
}
