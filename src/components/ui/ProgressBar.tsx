"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "./Card";

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string; // e.g., "bg-brand-teal"
  className?: string;
  height?: string;
}

export function ProgressBar({ progress, color = "bg-brand-teal", className, height = "h-2" }: ProgressBarProps) {
  return (
    <div className={cn("w-full bg-slate-100 rounded-full overflow-hidden", height, className)}>
      <motion.div
        className={cn("h-full rounded-full", color)}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
