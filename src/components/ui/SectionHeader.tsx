import React from "react";
import { ArrowRight } from "lucide-react";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  actionText = "See all",
  onAction,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-end justify-between ${className}`}>
      <div>
        {eyebrow && (
          <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-emerald-700 mb-1">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif font-bold text-[30px] text-stone-900 tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      {actionText && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1.5 text-base font-medium text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
}
