import React from "react";
import { cn } from "./Card";

type BadgeVariant = "success" | "warning" | "error" | "info" | "default" | "neutral" | "brand";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-accent-green/10 text-accent-green",
  warning: "bg-accent-amber/10 text-accent-amber",
  error: "bg-accent-red/10 text-accent-red",
  info: "bg-accent-blue/10 text-accent-blue",
  default: "bg-slate-100 text-slate-600",
  neutral: "bg-slate-100 text-slate-600",
  brand: "bg-brand-teal/10 text-brand-teal",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
