"use client";

import React from "react";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "diet" | "filter";
  active?: boolean;
  children: React.ReactNode;
}

export function Chip({
  variant = "filter",
  active = false,
  className = "",
  children,
  ...props
}: ChipProps) {
  if (variant === "diet") {
    return (
      <button
        type="button"
        className={`h-[30px] px-3 text-[13px] font-medium rounded-full border transition-colors cursor-pointer select-none ${
          active
            ? "bg-emerald-700 text-white border-emerald-700"
            : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900"
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`h-10 px-[18px] text-[15px] rounded-full border transition-colors cursor-pointer select-none inline-flex items-center justify-center ${
        active
          ? "bg-emerald-700 text-white border-emerald-700 font-semibold shadow-sm"
          : "bg-white text-stone-700 border-stone-200 font-medium hover:border-stone-300 hover:text-stone-900"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
