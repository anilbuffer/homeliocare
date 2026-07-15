"use client";

import React from "react";
import { Users, UserPlus, Star, ShieldCheck, CalendarX2 } from "lucide-react";
import { cn } from "@/components/ui/Card";

const kpiData = [
  { label: "Active Caregivers", value: "84", trend: "+ 2 this week", icon: Users, color: "text-brand-teal", bg: "bg-brand-teal/10", trendColor: "text-brand-teal" },
  { label: "Onboarding", value: "5", trend: "3 pending background check", icon: UserPlus, color: "text-accent-purple", bg: "bg-accent-purple/10", trendColor: "text-text-secondary" },
  { label: "Avg. Rating", value: "4.8", trend: "Based on 1.2k reviews", icon: Star, color: "text-accent-amber", bg: "bg-accent-amber/10", trendColor: "text-text-secondary" },
  { label: "Compliance Rate", value: "92%", trend: "14 expiring credentials", icon: ShieldCheck, color: "text-accent-green", bg: "bg-accent-green/10", trendColor: "text-accent-orange" },
  { label: "Open Availability Gaps", value: "12", trend: "Week of July 15-21", icon: CalendarX2, color: "text-accent-red", bg: "bg-accent-red/10", trendColor: "text-text-secondary" },
];

export function CaregiverKpiStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-2xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 flex flex-col h-full group relative">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[12px] font-medium text-text-secondary leading-tight pr-2">{kpi.label}</span>
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0", kpi.bg, kpi.color)}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-auto">
              <div className="text-2xl font-bold text-slate-800 tracking-tight mb-1">
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
