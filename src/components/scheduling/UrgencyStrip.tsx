import React from "react";
import { AlertCircle, Clock, UserCheck, PhoneOff, Sparkles } from "lucide-react";
import clsx from "clsx";

const KPI_DATA = [
  {
    label: "Unfilled Shifts",
    value: "2",
    icon: AlertCircle,
    color: "text-red-500",
    bg: "bg-red-50",
    dot: "bg-red-500",
  },
  {
    label: "Filling Soon (<4h)",
    value: "1",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-50",
    dot: "bg-amber-500",
  },
  {
    label: "Confirmed Today",
    value: "3",
    icon: UserCheck,
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
    dot: "bg-brand-teal",
  },
  {
    label: "Call-Offs This Week",
    value: "3",
    icon: PhoneOff,
    color: "text-orange-500",
    bg: "bg-orange-50",
    dot: "bg-orange-500",
  },
  {
    label: "Avg Fill Time",
    value: "23m",
    icon: Sparkles,
    color: "text-slate-600",
    bg: "bg-slate-100",
    dot: "bg-slate-400",
  },
];

export function UrgencyStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {KPI_DATA.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="bg-white backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgb(0,0,0,0.04)] rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_8px_32px_rgb(0,0,0,0.08)] hover:-translate-y-1 relative overflow-hidden group flex items-center gap-4"
          >
            <div className={clsx("p-3 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3", kpi.bg, kpi.color)}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 py-0.5">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className={clsx("text-2xl font-bold tracking-tight leading-none", kpi.color)}>{kpi.value}</div>
                <div className={clsx("w-2 h-2 rounded-full shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-150", kpi.dot)} />
              </div>
              <div className="text-[12px] font-medium text-slate-500 leading-tight line-clamp-2">{kpi.label}</div>
            </div>
            
            {/* Subtle background glow */}
            <div className={clsx("absolute -right-4 -bottom-4 w-16 h-16 rounded-full opacity-0 blur-xl transition-all duration-500 group-hover:opacity-20", kpi.dot)} />
          </div>
        );
      })}
    </div>
  );
}
