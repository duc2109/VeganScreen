import React from "react";

export interface MeterProps {
  label?: string;
  queriesLeft: number;
  totalQueries?: number;
  className?: string;
}

export function Meter({
  label = "Free trial",
  queriesLeft = 3,
  totalQueries = 3,
  className = "",
}: MeterProps) {
  const percentage = Math.min(
    100,
    Math.max(0, (queriesLeft / totalQueries) * 100)
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-between text-sm font-medium text-amber-900">
        <span>{label}</span>
        <span>
          {queriesLeft}/{totalQueries} queries left
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-amber-200 overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
