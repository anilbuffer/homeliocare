"use client";

import React from "react";
import { cn } from "./Card";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

export function Avatar({ fallback, size = "md", className, src, alt, ...props }: AvatarProps) {
  const [error, setError] = React.useState(false);

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-slate-200 flex items-center justify-center font-medium text-slate-600 shrink-0 border border-white/50",
        sizeStyles[size],
        className
      )}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
          {...props}
        />
      ) : (
        <span>{fallback || (alt ? alt.charAt(0).toUpperCase() : "?")}</span>
      )}
    </div>
  );
}
