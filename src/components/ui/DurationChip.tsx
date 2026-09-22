import React from "react";
import { Play } from "lucide-react";

export interface DurationChipProps {
  duration: string;
  className?: string;
  variant?: "video" | "hero";
}

export function DurationChip({
  duration,
  className = "",
  variant = "video",
}: DurationChipProps) {
  const bgClass =
    variant === "hero"
      ? "bg-black/55 backdrop-blur px-3"
      : "bg-stone-900/70 backdrop-blur px-2.5";

  return (
    <div
      className={`h-7 rounded-full inline-flex items-center gap-1 text-white text-[13px] font-semibold select-none ${bgClass} ${className}`}
    >
      <Play className="w-3 h-3 fill-current" />
      <span>{duration}</span>
    </div>
  );
}
