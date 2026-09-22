import React from "react";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${className}`}>
      <div>
        {eyebrow && (
          <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-emerald-700 mb-1">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif font-bold text-[30px] text-stone-900 tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-base text-stone-600 leading-normal max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
