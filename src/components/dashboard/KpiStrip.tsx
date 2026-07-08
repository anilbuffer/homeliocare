"use client";

import React from "react";
import { Users, UserCircle2, CalendarCheck, ShieldAlert, DollarSign, CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/components/ui/Card";

const kpiData = [
  { label: "Active Patients", value: "1,248", trend: "+12 this month", icon: Users, color: "text-brand-teal", bg: "bg-brand-teal/10" },
  { label: "Active Caregivers", value: "384", trend: "+5 this month", icon: UserCircle2, color: "text-accent-purple", bg: "bg-accent-purple/10" },
  { label: "Today's Visits", value: "412", trend: "94% assigned", icon: CalendarCheck, color: "text-accent-blue", bg: "bg-accent-blue/10" },
  { label: "Open Incidents", value: "3", trend: "-2 from yesterday", icon: ShieldAlert, color: "text-accent-orange", bg: "bg-accent-orange/10", negativeTrend: true },
  { label: "Monthly Revenue", value: "$1.2M", trend: "+4.2% vs last mo", icon: DollarSign, color: "text-accent-green", bg: "bg-accent-green/10" },
  { label: "EVV Compliance", value: "98.2%", trend: "+0.5% vs last wk", icon: CheckCircle2, color: "text-brand-teal", bg: "bg-brand-teal/10" },
  { label: "Unfilled Shifts", value: "14", trend: "Next 48 hours", icon: Clock, color: "text-accent-amber", bg: "bg-accent-amber/10", negativeTrend: true },
];

export function KpiStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <Card key={idx} className="p-4 sm:p-4 flex flex-col justify-between h-full group" noPadding>
            <div className="flex items-center gap-3 mb-3">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110", kpi.bg, kpi.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-text-secondary leading-tight">{kpi.label}</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{kpi.value}</div>
              <div className={cn(
                "text-[10px] mt-1 font-medium",
                kpi.negativeTrend ? "text-accent-orange" : "text-text-secondary"
              )}>
                {kpi.trend}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
