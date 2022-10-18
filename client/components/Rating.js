import React from "react";
import Star from "./Star";

export default function Rating({ rating }) {
  const { rate, count } = rating;
  const stars = [
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
    { id: 4, checked: false },
    { id: 5, checked: false },
  ];

  for (let i = 0; i < Math.round(rate); i++) {
    stars[i].checked = true;
  }

  return (
    <div className="flex items-center space-x-2">
      <div>
        {stars.map((star) => (
          <Star key={star.id} checked={star.checked} />
        ))}
      </div>
      <span className="text-neutral-400">
        {rate}
        <span className="text-neutral-400 text-xs"> ({count})</span>
      </span>
    </div>
  );
}
