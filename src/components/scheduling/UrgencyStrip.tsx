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
            className="bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-2xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 relative overflow-hidden group flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={clsx("p-2 rounded-full", kpi.bg)}>
                <Icon className={clsx("w-5 h-5", kpi.color)} />
              </div>
              <div className={clsx("w-1.5 h-1.5 rounded-full", kpi.dot)} />
            </div>
            <div>
              <div className={clsx("text-2xl font-bold mb-1", kpi.color)}>{kpi.value}</div>
              <div className="text-sm font-medium text-slate-500">{kpi.label}</div>
            </div>
            
            {/* Subtle bottom accent line */}
            <div className={clsx("absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity", kpi.dot)} />
          </div>
        );
      })}
    </div>
  );
}
