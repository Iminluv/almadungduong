import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "text";
  size?: "sm" | "md" | "lg" | "full";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center transition-colors duration-200 uppercase tracking-[0.06em] font-semibold text-sm rounded-[2px]";
    
    const variants = {
      primary: "bg-accent text-white hover:bg-[#112C20]",
      outline: "border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white",
      ghost: "hover:bg-surface text-text",
      text: "text-navy border-b border-navy hover:opacity-70 !rounded-none !p-0",
    };

    const sizes = {
      sm: "px-4 py-2 text-[12px]",
      md: "px-8 py-[14px]",
      lg: "px-10 py-4",
      full: "w-full py-4",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
