import React from "react";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, className = "", ...props }, ref) => {
    return (
      <div className={`relative flex items-center w-full ${className}`}>
        <select
          ref={ref}
          className="w-full h-11 bg-white border border-stone-200 rounded-xl px-4 pr-10 text-base text-stone-900 outline-none transition-all focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-xs appearance-none cursor-pointer"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 text-stone-400 pointer-events-none">
          <ChevronDown className="w-4 h-4" strokeWidth={2} />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
