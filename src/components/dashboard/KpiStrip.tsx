"use client";

import React from "react";
import { Users, UserCircle2, CalendarCheck, ShieldAlert, DollarSign, CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/components/ui/Card";

const kpiData = [
  { label: "Active Patients", value: "247", trend: "+ 12 this month", icon: Users, color: "text-brand-teal", bg: "bg-brand-teal/20", trendColor: "text-brand-teal" },
  { label: "Active Caregivers", value: "84", trend: "5 onboarding", icon: UserCircle2, color: "text-accent-purple", bg: "bg-accent-purple/20", trendColor: "text-accent-purple" },
  { label: "Today's Visits", value: "142", trend: "98 completed · 44 upcoming", icon: CalendarCheck, color: "text-accent-blue", bg: "bg-accent-blue/20", trendColor: "text-text-secondary" },
  { label: "EVV Compliance", value: "96.4%", trend: "9 exceptions today", icon: CheckCircle2, color: "text-accent-green", bg: "bg-accent-green/20", trendColor: "text-accent-orange" },
  { label: "Open Unfilled Shifts", value: "8", trend: "5 urgent (within 4 hrs)", icon: Clock, color: "text-accent-orange", bg: "bg-accent-orange/20", trendColor: "text-accent-red" },
  { label: "Open Incidents", value: "3", trend: "1 in compliance review", icon: ShieldAlert, color: "text-accent-amber", bg: "bg-accent-amber/20", trendColor: "text-text-secondary" },
  { label: "Monthly Revenue", value: "$486k", trend: "+ 4.4% vs last month", icon: DollarSign, color: "text-brand-teal", bg: "bg-brand-teal/20", trendColor: "text-brand-teal" },
];

export function KpiStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
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
