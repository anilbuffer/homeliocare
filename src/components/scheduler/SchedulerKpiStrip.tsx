"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  UserX,
  CheckCircle2,
  Timer,
  Users,
} from "lucide-react";
import clsx from "clsx";

interface KpiMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  isUrgent?: boolean;
  colorClass: string;
  bgLight: string;
  borderColor: string;
  icon: React.ElementType;
  subtext: string;
}

interface SchedulerKpiStripProps {
  unfilledCount: number;
  fillingSoonCount: number;
  callOffsCount: number;
  confirmedCount: number;
  avgFillTimeMins?: number;
  availabilityGapsCount?: number;
}

export function SchedulerKpiStrip({
  unfilledCount = 3,
  fillingSoonCount = 2,
  callOffsCount = 1,
  confirmedCount = 18,
  avgFillTimeMins = 24,
  availabilityGapsCount = 5,
}: SchedulerKpiStripProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 mb-5 sm:mb-6">
      {/* 1. Unfilled Shifts - Priority Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="col-span-2 sm:col-span-1 bg-gradient-to-br from-rose-50 to-white border-2 border-rose-400/80 rounded-2xl p-2 sm:px-4 sm:py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-rose-500/10 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
            Unfilled Shifts
          </span>
          <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/30 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <Counter value={unfilledCount} className="text-2xl sm:text-3xl font-black text-rose-600" />
          <span className="text-xs font-semibold text-rose-500">Urgent</span>
        </div>
        <p className="text-[11px] text-rose-700/80 font-medium mt-1">Needs assignment now</p>
      </motion.div>

      {/* 2. Filling Soon (<4h) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="col-span-2 sm:col-span-1 bg-white border border-amber-200/80 rounded-2xl p-3 sm:px-4 sm:py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-amber-500/10 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all"
      >
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-[10px] sm:text-[11px] font-bold text-amber-700 uppercase tracking-wider truncate pr-1">
            Filling Soon
          </span>
          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1 sm:gap-1.5">
          <Counter value={fillingSoonCount} className="text-xl sm:text-2xl font-bold text-amber-600" />
          <span className="text-[10px] text-amber-700 font-medium">&lt; 4 hrs</span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 truncate">Approaching start</p>
      </motion.div>

      {/* 3. Call-Offs Today */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="col-span-2 sm:col-span-1 bg-white border border-red-200/80 rounded-2xl p-3 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-red-500/10 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all"
      >
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-[10px] sm:text-[11px] font-bold text-red-700 uppercase tracking-wider truncate pr-1">
            Call-Offs Today
          </span>
          <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <UserX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1 sm:gap-1.5">
          <Counter value={callOffsCount} className="text-xl sm:text-2xl font-bold text-red-600" />
          <span className="text-[10px] text-red-500 font-semibold truncate">Action req.</span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 truncate">Reassignment queue</p>
      </motion.div>

      {/* 4. Confirmed Today */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="col-span-2 sm:col-span-1 bg-white border border-teal-200/80 rounded-2xl p-3 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-teal-500/10 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all"
      >
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-[10px] sm:text-[11px] font-bold text-brand-teal uppercase tracking-wider truncate pr-1">
            Confirmed Today
          </span>
          <div className="w-7 h-7 rounded-lg bg-teal-100 text-brand-teal flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1 sm:gap-1.5">
          <Counter value={confirmedCount} className="text-xl sm:text-2xl font-bold text-brand-teal" />
          <span className="text-[10px] text-emerald-600 font-medium truncate">Covered</span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 truncate">86% shift fill rate</p>
      </motion.div>

      {/* 5. Avg. Fill Time */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="col-span-1 bg-white border border-blue-200/80 rounded-2xl p-3 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-blue-500/10 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all"
      >
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-[10px] sm:text-[11px] font-bold text-blue-700 uppercase tracking-wider truncate pr-1">
            Avg. Fill Time
          </span>
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <Counter value={avgFillTimeMins} className="text-xl sm:text-2xl font-bold text-blue-600" />
          <span className="text-xs font-semibold text-blue-600">min</span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 truncate">This week speed</p>
      </motion.div>

      {/* 6. Availability Gaps - Balanced Footer Card on Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="col-span-2 sm:col-span-1 bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-slate-500/10 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all"
      >
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
            Availability Gaps
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <Counter value={availabilityGapsCount} className="text-2xl sm:text-2xl font-bold text-slate-800" />
          <span className="text-xs font-semibold text-slate-600">Caregivers</span>
        </div>
        <p className="text-[11px] text-slate-500 font-medium mt-1">Under-scheduled this week</p>
      </motion.div>
    </div>
  );
}

function Counter({ value, className }: { value: number; className?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span className={className}>{displayValue}</span>;
}
