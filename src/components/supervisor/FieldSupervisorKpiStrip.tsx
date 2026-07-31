"use client";

import React from "react";
import { Users, CalendarCheck, ShieldAlert, CheckCircle2, AlertTriangle, Star } from "lucide-react";
import { cn } from "@/components/ui/Card";

const kpiData = [
  { label: "Visits Due This Week", value: "12", trend: "4 scheduled today", icon: CalendarCheck, color: "text-brand-teal", bg: "bg-brand-teal/20", trendColor: "text-brand-teal" },
  { label: "Visits Overdue", value: "2", trend: "Needs immediate action", icon: AlertTriangle, color: "text-accent-red", bg: "bg-accent-red/20", trendColor: "text-accent-red" },
  { label: "Unannounced Visits", value: "85%", trend: "42 of 49 annual requirement", icon: CheckCircle2, color: "text-accent-blue", bg: "bg-accent-blue/20", trendColor: "text-text-secondary" },
  { label: "Open Findings", value: "5", trend: "3 need clinical review", icon: ShieldAlert, color: "text-accent-amber", bg: "bg-accent-amber/20", trendColor: "text-accent-amber" },
  { label: "My Caregivers", value: "18", trend: "2 new this month", icon: Users, color: "text-accent-purple", bg: "bg-accent-purple/20", trendColor: "text-text-secondary" },
  { label: "Avg. Client Satisfaction", value: "4.8", trend: "Based on last 30 visits", icon: Star, color: "text-brand-teal", bg: "bg-brand-teal/20", trendColor: "text-brand-teal" },
];

export function FieldSupervisorKpiStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="bg-white backdrop-blur-xl rounded-2xl px-4 py-3 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[12px] font-medium text-text-secondary leading-tight pr-2">{kpi.label}</span>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0", kpi.bg, kpi.color)}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-auto">
              <div className="text-xl font-bold text-slate-800 tracking-tight mb-1">
                {kpi.value}
              </div>
              <div className={cn("text-[11px] font-medium", kpi.trendColor)}>
                {kpi.trend}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
