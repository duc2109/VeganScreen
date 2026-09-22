import React from "react";
import { Search } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search";
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", icon, className = "", ...props }, ref) => {
    if (variant === "search") {
      return (
        <div className={`relative flex items-center w-full ${className}`}>
          <div className="absolute left-4 text-stone-400 pointer-events-none">
            {icon || <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />}
          </div>
          <input
            ref={ref}
            className="w-full h-11 bg-stone-50 border border-stone-200 rounded-full pl-11 pr-4 text-base text-stone-900 placeholder:text-stone-400 outline-none transition-all focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600 shadow-xs"
            {...props}
          />
        </div>
      );
    }

    return (
      <div className={`relative flex items-center w-full ${className}`}>
        {icon && (
          <div className="absolute left-3.5 text-stone-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full h-11 bg-white border border-stone-200 rounded-xl px-4 text-base text-stone-900 placeholder:text-stone-400 outline-none transition-all focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-xs ${
            icon ? "pl-11" : ""
          }`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
