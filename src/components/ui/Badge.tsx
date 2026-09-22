import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "beta" | "recipeOfDay" | "info" | "success" | "flagged";
  children: React.ReactNode;
}

export function Badge({ variant = "info", className = "", children, ...props }: BadgeProps) {
  const variantStyles = {
    beta: "rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800",
    recipeOfDay: "h-8 px-3 rounded-full bg-amber-400 text-amber-950 text-sm font-semibold inline-flex items-center gap-1.5",
    info: "rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800",
    success: "rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-800",
    flagged: "rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-50 text-red-700",
  }[variant];

  return (
    <span className={`inline-flex items-center ${variantStyles} ${className}`} {...props}>
      {children}
    </span>
  );
}
