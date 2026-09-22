import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "soft" | "ghostOnDark";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center transition-colors cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantStyles = {
      primary: "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm",
      accent: "bg-amber-400 hover:bg-amber-500 text-amber-950 font-medium",
      soft: "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium",
      ghostOnDark: "text-white hover:bg-white/10 font-semibold",
    }[variant];

    const sizeStyles = {
      sm: "h-9 px-4 text-sm rounded-full",
      md: "h-10 px-5 text-base rounded-full",
      lg: "h-[54px] px-7 text-[17px] rounded-full",
      icon: "w-9 h-9 rounded-xl",
    }[size];

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
