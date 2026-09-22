"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";

export interface BookmarkButtonProps {
  initialSaved?: boolean;
  onToggle?: (saved: boolean) => void;
  className?: string;
  size?: "sm" | "md";
}

export function BookmarkButton({
  initialSaved = false,
  onToggle,
  className = "",
}: BookmarkButtonProps) {
  const [saved, setSaved] = useState(initialSaved);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !saved;
    setSaved(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={saved ? "Remove bookmark" : "Save bookmark"}
      className={`w-9 h-9 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center transition-colors cursor-pointer hover:bg-white shadow-sm ${
        saved ? "text-emerald-700" : "text-stone-700 hover:text-stone-900"
      } ${className}`}
    >
      <Bookmark
        className={`w-[18px] h-[18px] ${saved ? "fill-emerald-700 text-emerald-700" : ""}`}
        strokeWidth={1.75}
      />
    </button>
  );
}
