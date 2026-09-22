import React from "react";
import { Check } from "lucide-react";

export interface AvatarProps {
  initials: string;
  verified?: boolean;
  size?: number;
  className?: string;
}

export function Avatar({
  initials,
  verified = true,
  className = "",
}: AvatarProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center ring-2 ring-white select-none">
        <span className="text-xs font-semibold text-amber-800 tracking-wider">
          {initials}
        </span>
      </div>
      {verified && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-600 ring-2 ring-emerald-900 flex items-center justify-center text-white"
          title="Verified creator"
        >
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        </span>
      )}
    </div>
  );
}
