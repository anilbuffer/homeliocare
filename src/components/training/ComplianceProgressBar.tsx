"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0-100
  colorClass?: string;
  heightClass?: string;
  showText?: boolean;
}

export function ComplianceProgressBar({
  progress,
  colorClass = "bg-brand-teal",
  heightClass = "h-2",
  showText = false
}: ProgressBarProps) {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    // Animate on load
    const timer = setTimeout(() => {
      setFill(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="w-full flex items-center gap-2">
      <div className={`flex-1 bg-slate-100 rounded-full overflow-hidden ${heightClass}`}>
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${fill}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      {showText && (
        <span className="text-xs font-medium text-slate-600 min-w-[32px] text-right">
          {progress}%
        </span>
      )}
    </div>
  );
}
