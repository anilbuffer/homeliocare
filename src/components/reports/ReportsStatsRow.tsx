import React from "react";
import { Users, UserPlus, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/components/ui/Card";

const kpiData = [
  { label: "Total Referrals", value: "342", trend: "+ 12% this month", icon: Users, color: "text-brand-teal", bg: "bg-brand-teal/20", trendColor: "text-brand-teal" },
  { label: "Pending Admissions", value: "28", trend: "5 urgent", icon: UserPlus, color: "text-accent-purple", bg: "bg-accent-purple/20", trendColor: "text-accent-purple" },
  { label: "Conversion Rate", value: "68%", trend: "+ 2.4% vs last month", icon: TrendingUp, color: "text-accent-blue", bg: "bg-accent-blue/20", trendColor: "text-brand-teal" },
  { label: "Avg Time to Admit", value: "2.4 days", trend: "- 0.3 days this month", icon: Clock, color: "text-accent-green", bg: "bg-accent-green/20", trendColor: "text-brand-teal" },
];

export function ReportsStatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="bg-white backdrop-blur-xl rounded-2xl px-5 py-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-slate-500 leading-tight pr-2">{kpi.label}</span>
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0", kpi.bg, kpi.color)}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-auto">
              <div className="text-2xl font-bold text-slate-800 tracking-tight mb-1">
                {kpi.value}
              </div>
              <div className={cn("text-xs font-medium", kpi.trendColor)}>
                {kpi.trend}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
