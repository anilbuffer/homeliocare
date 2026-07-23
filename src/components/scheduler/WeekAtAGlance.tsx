"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import clsx from "clsx";

interface DayCoverage {
  day: string;
  date: string;
  totalShifts: number;
  coveredShifts: number;
  percentage: number;
  isToday?: boolean;
}

const mockWeekCoverage: DayCoverage[] = [
  { day: "Mon", date: "Jul 20", totalShifts: 24, coveredShifts: 24, percentage: 100 },
  { day: "Tue", date: "Jul 21", totalShifts: 26, coveredShifts: 25, percentage: 96 },
  { day: "Wed", date: "Jul 22", totalShifts: 28, coveredShifts: 27, percentage: 96 },
  { day: "Thu", date: "Jul 23", totalShifts: 25, coveredShifts: 22, percentage: 88, isToday: true },
  { day: "Fri", date: "Jul 24", totalShifts: 30, coveredShifts: 23, percentage: 76 },
  { day: "Sat", date: "Jul 25", totalShifts: 18, coveredShifts: 17, percentage: 94 },
  { day: "Sun", date: "Jul 26", totalShifts: 16, coveredShifts: 16, percentage: 100 },
];

export function WeekAtAGlance() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 sm:mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold shrink-0">
            <Calendar className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex flex-wrap items-center gap-2">
              <span>This Week at a Glance</span>
              <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 shrink-0">
                Shift Coverage Rate
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">Spot under-covered upcoming days before emergencies happen</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[10px] sm:text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-brand-teal shrink-0" /> &ge;90% Optimal
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500 shrink-0" /> 80–89% Watch
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500 shrink-0" /> &lt;80% Risk
          </span>
        </div>
      </div>

      {/* Days Strip */}
      <div className="flex md:grid md:grid-cols-7 gap-2 sm:gap-3 overflow-x-auto snap-x snap-mandatory custom-scrollbar pb-2 pt-1 -mx-1 px-1 touch-pan-x">
        {mockWeekCoverage.map((item, idx) => {
          const isLow = item.percentage < 80;
          const isModerate = item.percentage >= 80 && item.percentage < 90;

          return (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={clsx(
                "rounded-xl p-2.5 sm:p-3 border transition-all text-center flex flex-col justify-between relative overflow-hidden shrink-0 w-[105px] xs:w-[120px] sm:w-[130px] md:w-auto snap-center select-none",
                item.isToday
                  ? "border-brand-teal ring-2 ring-brand-teal/20 bg-teal-50/30 shadow-sm"
                  : "border-slate-200/80 bg-slate-50 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              )}
            >
              {item.isToday && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-teal" title="Today" />
              )}

              <div>
                <div className="text-xs font-bold text-slate-700">{item.day}</div>
                <div className="text-[10px] text-slate-500 font-medium">{item.date}</div>
              </div>

              <div className="my-2 sm:my-2.5">
                <div className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  {item.percentage}%
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {item.coveredShifts}/{item.totalShifts} shifts
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-slate-200/80 rounded-full h-1.5 sm:h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + idx * 0.05 }}
                  className={clsx(
                    "h-full rounded-full transition-colors",
                    isLow ? "bg-rose-500" : isModerate ? "bg-amber-500" : "bg-brand-teal"
                  )}
                />
              </div>

              {isLow && (
                <div className="mt-1.5 text-[10px] font-bold text-rose-600 flex items-center justify-center gap-0.5">
                  <AlertTriangle className="w-2.5 h-2.5 shrink-0" /> Need shifts
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
