import React from "react";
import { Star } from "lucide-react";

export interface RatingProps {
  score: number;
  reviewsCount?: string;
  variant?: "hero" | "placeRow";
  className?: string;
}

export function Rating({
  score,
  reviewsCount,
  variant = "placeRow",
  className = "",
}: RatingProps) {
  if (variant === "hero") {
    return (
      <div className={`inline-flex items-center gap-1.5 font-semibold text-base text-white ${className}`}>
        <Star className="w-[18px] h-[18px] fill-amber-400 text-amber-400" />
        <span>{score.toFixed(1)}</span>
        {reviewsCount && (
          <span className="text-emerald-300 font-semibold">({reviewsCount})</span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1 text-[15px] font-semibold text-stone-700 ${className}`}>
      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
      <span>{score.toFixed(1)}</span>
    </div>
  );
}
