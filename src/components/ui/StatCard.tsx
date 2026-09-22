import React from "react";
import { Card } from "./Card";

export interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  subtext,
  icon,
  badge,
  className = "",
}: StatCardProps) {
  return (
    <Card className={`p-5 flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          {label}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="font-serif font-bold text-3xl text-stone-900 tracking-tight">
          {value}
        </div>
        {(subtext || badge) && (
          <div className="mt-1 flex items-center gap-2">
            {badge}
            {subtext && <span className="text-xs text-stone-500">{subtext}</span>}
          </div>
        )}
      </div>
    </Card>
  );
}
