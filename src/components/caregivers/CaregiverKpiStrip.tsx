"use client";

import React from "react";
import { Users, UserPlus, Star, ShieldCheck, CalendarX2 } from "lucide-react";
import { cn } from "@/components/ui/Card";

const kpiData = [
  { label: "Active Caregivers", value: "84", trend: "+ 2 this week", icon: Users, color: "text-brand-teal", bg: "bg-brand-teal/20", trendColor: "text-brand-teal" },
  { label: "Onboarding", value: "5", trend: "3 pending background check", icon: UserPlus, color: "text-accent-purple", bg: "bg-accent-purple/20", trendColor: "text-text-secondary" },
  { label: "Avg. Rating", value: "4.8", trend: "Based on 1.2k reviews", icon: Star, color: "text-accent-amber", bg: "bg-accent-amber/20", trendColor: "text-text-secondary" },
  { label: "Compliance Rate", value: "92%", trend: "14 expiring credentials", icon: ShieldCheck, color: "text-accent-green", bg: "bg-accent-green/20", trendColor: "text-accent-orange" },
  { label: "Open Availability Gaps", value: "12", trend: "Week of July 15-21", icon: CalendarX2, color: "text-accent-red", bg: "bg-accent-red/20", trendColor: "text-text-secondary" },
];

export function CaregiverKpiStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full group relative">
            <div className="flex justify-between items-start mb-4">
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
