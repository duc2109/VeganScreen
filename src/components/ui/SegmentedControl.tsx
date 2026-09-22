"use client";

import React from "react";
import { UserRole } from "@/context/RoleContext";

export interface SegmentedControlProps {
  value: UserRole;
  onChange: (value: UserRole) => void;
  options?: UserRole[];
  className?: string;
}

export function SegmentedControl({
  value,
  onChange,
  options = ["Guest", "Member", "Admin"],
  className = "",
}: SegmentedControlProps) {
  return (
    <div
      className={`bg-stone-100 rounded-lg p-1 grid grid-cols-3 gap-1 select-none ${className}`}
    >
      {options.map((opt) => {
        const isActive = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`py-1.5 px-2 text-sm font-medium rounded-md text-center transition-all cursor-pointer ${
              isActive
                ? "bg-white shadow-sm text-stone-900 font-semibold"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
