import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import Star from "public/assets/icons/icon-star-rating.svg";
import { COLOR } from "@styles/color";

interface IRatingProps {
  rating: number;
  readOnly: boolean;
  setRating?: Dispatch<SetStateAction<number>>;
}

const StarRating = ({ rating, readOnly, setRating }: IRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const currentRating = e.currentTarget.dataset.rating ?? 0;
    if (+currentRating === rating) {
      setRating?.(0);
    } else {
      setRating?.(+currentRating);
    }
  };

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    const currentRating = e.currentTarget.dataset.rating ?? 0;
    setHoverRating(+currentRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <button
          key={`rate-${index + 1}`}
          type="button"
          data-rating={index + 1}
          disabled={readOnly}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Star
            fill={index < (hoverRating || rating) ? COLOR.red : COLOR.greyC4}
          />
        </button>
      ))}
    </div>
  );
};

export default React.memo(StarRating);
