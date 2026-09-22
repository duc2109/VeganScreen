import React from "react";
import { Rating } from "./Rating";

export interface PlaceRowProps {
  name: string;
  sub: string;
  rating: number;
  className?: string;
}

export function PlaceRow({ name, sub, rating, className = "" }: PlaceRowProps) {
  return (
    <div
      className={`h-[52px] flex items-center justify-between py-1 transition-colors hover:bg-stone-50/75 rounded-lg px-1.5 -mx-1.5 ${className}`}
    >
      <div className="flex flex-col min-w-0 pr-3">
        <span className="text-base font-semibold text-stone-900 truncate leading-snug">
          {name}
        </span>
        <span className="text-sm text-stone-500 truncate leading-normal">
          {sub}
        </span>
      </div>
      <Rating score={rating} variant="placeRow" />
    </div>
  );
}
