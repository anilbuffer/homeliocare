"use client";

import React from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, Clock, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/components/ui/Card";

export function IncidentsKpiStrip() {
  const kpiData = [
    { label: "Open Incidents", value: "8", trend: "3 require action", icon: ShieldAlert, color: "text-accent-amber", bg: "bg-accent-amber/10", trendColor: "text-accent-red" },
    { label: "Under Investigation", value: "3", trend: "1 assigned today", icon: Activity, color: "text-accent-blue", bg: "bg-accent-blue/10", trendColor: "text-text-secondary" },
    { label: "Awaiting Corrective Action", value: "2", trend: "Both overdue", icon: AlertTriangle, color: "text-accent-orange", bg: "bg-accent-orange/10", trendColor: "text-accent-red" },
    { label: "Resolved This Month", value: "14", trend: "+ 2 vs last month", icon: CheckCircle2, color: "text-accent-green", bg: "bg-accent-green/10", trendColor: "text-accent-green" },
    { label: "Avg. Time to Resolution", value: "4.2 days", trend: "- 0.5 days", icon: Clock, color: "text-brand-teal", bg: "bg-brand-teal/10", trendColor: "text-brand-teal" },
    { label: "Supervisor Alerts", value: "2", trend: "Unread", icon: ShieldAlert, color: "text-accent-red", bg: "bg-accent-red/10", trendColor: "text-accent-red" },
    { label: "Regulatory Reports Overdue", value: "1", trend: "Requires immediate action", icon: ShieldCheck, color: "text-white", bg: "bg-accent-red", trendColor: "text-accent-red" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="p-4 bg-white backdrop-blur-xl rounded-2xl border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 relative overflow-hidden flex flex-col h-full group relative">
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
