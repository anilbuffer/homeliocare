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
          "bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 relative overflow-hidden",
          !noPadding && "p-6 sm:p-7",
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
