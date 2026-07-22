"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Check } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
  hero?: boolean;
  className?: string;
}

export function KpiCard({ title, value, subtitle, trend, trendValue, icon, hero = false, className }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={clsx(
        "bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-200 relative flex flex-col justify-between h-[135px]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className={clsx("text-sm font-semibold tracking-tight", hero ? "text-emerald-600" : "text-slate-500")}>
          {title}
        </h3>
        {hero ? (
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        ) : icon ? (
          <div className="w-7 h-7 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
            {icon}
          </div>
        ) : null}
      </div>

      <div>
        <div className="flex items-baseline gap-2 mt-1">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className={clsx("font-bold tracking-tight", hero ? "text-3xl text-emerald-600" : "text-2xl text-slate-900")}
          >
            {value}
          </motion.div>

          {trend && trendValue && (
            <div className={clsx(
              "flex items-center text-[11px] font-semibold rounded-full px-2 py-0.5 gap-0.5",
              trend === "up" ? "text-emerald-700 bg-emerald-100/80" :
                trend === "down" ? "text-amber-800 bg-amber-100/80" :
                  "text-slate-600 bg-slate-100"
            )}>
              <span>{trend === "up" ? "↗" : trend === "down" ? "↘" : "•"}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {subtitle && (
          <p className="text-[11px] text-slate-400 mt-1 font-medium">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}

