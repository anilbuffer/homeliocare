"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
  hero?: boolean;
}

export function KpiCard({ title, value, subtitle, trend, trendValue, icon, hero = false }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={clsx(
        "bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full",
        hero && "bg-brand-teal/5 border-brand-teal/20"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={clsx("text-sm font-medium", hero ? "text-brand-teal" : "text-slate-500")}>
          {title}
        </h3>
        {icon && (
          <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center", hero ? "bg-brand-teal text-white" : "bg-slate-50 text-slate-400")}>
            {icon}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className={clsx("font-bold tracking-tight", hero ? "text-4xl text-brand-teal" : "text-2xl text-slate-900")}
          >
            {value}
          </motion.div>

          {trend && trendValue && (
            <div className={clsx(
              "flex items-center text-xs font-medium rounded-full px-2 py-0.5",
              trend === "up" ? "text-emerald-700 bg-emerald-50" :
                trend === "down" ? "text-amber-700 bg-amber-50" :
                  "text-slate-600 bg-slate-100"
            )}>
              {trend === "up" && <ArrowUpRight className="w-3 h-3 mr-1" />}
              {trend === "down" && <ArrowDownRight className="w-3 h-3 mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-2 font-medium">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}
