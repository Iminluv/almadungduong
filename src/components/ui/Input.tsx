import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[12px] uppercase tracking-[0.08em] text-muted mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-transparent border-b-[1.5px] border-surface py-2 focus:outline-none focus:border-accent transition-colors duration-200 placeholder:text-muted/40",
            error && "border-[#C0392B]",
            className
          )}
          {...props}
        />
        {error && (
          <span className="block text-[11px] text-[#C0392B] mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
