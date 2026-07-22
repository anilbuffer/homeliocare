"use client";

import React, { useState, useEffect } from "react";
import { cn } from "./Card";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs font-semibold",
  md: "w-10 h-10 text-xs font-bold",
  lg: "w-12 h-12 text-sm font-bold",
  xl: "w-16 h-16 text-base font-bold",
};

/**
 * Generate 2-letter uppercase initials from name or fallback string
 * e.g., "Rachel Miller RN" -> "RM"
 * "Eleanor Vance" -> "EV"
 * "Maria Santos" -> "MS"
 */
export function getInitials(name?: string, fallback?: string): string {
  if (fallback && fallback.trim()) {
    const cleanFallback = fallback.trim();
    if (cleanFallback.length >= 2) return cleanFallback.substring(0, 2).toUpperCase();
    return cleanFallback.toUpperCase();
  }

  if (!name || !name.trim()) return "HC";

  // Clean title/credentials like "RN", "CNA", "MD" or parenthetical notes
  const cleanName = name
    .replace(/\b(RN|CNA|LPN|MD|DO|MSW|PhD)\b/gi, "")
    .replace(/\(.*\)/g, "")
    .trim();

  const parts = cleanName.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  } else if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return "HC";
}

export function Avatar({
  fallback,
  name,
  size = "md",
  className,
  src,
  alt,
  ...props
}: AvatarProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  const initials = getInitials(name || alt, fallback);

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-brand-teal/15 text-brand-teal flex items-center justify-center font-bold shrink-0 border border-brand-teal/30 select-none",
        sizeStyles[size],
        className
      )}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
          {...props}
        />
      ) : (
        <span className="leading-none tracking-tight">{initials}</span>
      )}
    </div>
  );
}
