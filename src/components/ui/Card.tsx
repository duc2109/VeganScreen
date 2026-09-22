import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white border border-stone-200 rounded-[20px] shadow-sm p-6 overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
