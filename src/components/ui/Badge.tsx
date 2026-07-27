import React from "react";
import { cn } from "./Card";

type BadgeVariant = "success" | "warning" | "error" | "info" | "default" | "neutral" | "brand";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-accent-green/20 text-accent-green",
  warning: "bg-accent-amber/20 text-accent-amber",
  error: "bg-accent-red/20 text-accent-red",
  info: "bg-accent-blue/20 text-accent-blue",
  default: "bg-slate-100 text-slate-600",
  neutral: "bg-slate-100 text-slate-600",
  brand: "bg-brand-teal/20 text-brand-teal",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
