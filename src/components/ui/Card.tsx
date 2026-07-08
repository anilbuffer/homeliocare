import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, type HTMLMotionProps } from "framer-motion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends HTMLMotionProps<"div"> {
  className?: string;
  noPadding?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, noPadding = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-surface rounded-2xl border border-border-subtle shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-brand-teal/20",
          !noPadding && "p-5 sm:p-6",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";

export function CardHeader({
  title,
  action,
  className,
}: {
  title: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      {action && <div className="text-sm">{action}</div>}
    </div>
  );
}
