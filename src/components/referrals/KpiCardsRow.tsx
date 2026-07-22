import React from "react";
import { Users, TrendingUp, Clock, ShieldCheck, AlertTriangle, AlertCircle, Clock4 } from "lucide-react";
import clsx from "clsx";

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: React.ElementType;
  alertStatus?: "danger" | "warning" | "none";
}

function KpiCard({ title, value, trend, trendUp, icon: Icon, alertStatus = "none" }: KpiCardProps) {
  const isDanger = alertStatus === "danger";
  const isWarning = alertStatus === "warning";

  return (
    <div className={clsx(
      "bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between relative overflow-hidden transition-all",
      isDanger ? "border-accent-red" : isWarning ? "border-accent-amber" : "border-slate-200"
    )}>
      {isDanger && (
        <div className="absolute top-0 left-0 w-full h-1 bg-accent-red" />
      )}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xs font-medium text-text-secondary pr-4">{title}</h3>
        <div className={clsx(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          isDanger ? "bg-red-100 text-accent-red" :
            isWarning ? "bg-amber-100 text-accent-amber" :
              "bg-slate-100 text-slate-500"
        )}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className={clsx(
          "text-xl font-bold",
          isDanger ? "text-accent-red" : "text-text-primary"
        )}>
          {value}
        </span>
        {trend && (
          <span className={clsx(
            "text-xs font-medium px-1.5 py-0.5 rounded-full",
            trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

export function KpiCardsRow() {
  const kpis = [
    {
      title: "New Referrals (Month)",
      value: "42",
      trend: "+12%",
      trendUp: true,
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: "68%",
      trend: "+5%",
      trendUp: true,
      icon: TrendingUp,
    },
    {
      title: "Avg. Time to Admit",
      value: "4.2 days",
      trend: "-0.5 days",
      trendUp: true,
      icon: Clock,
    },
    {
      title: "Pending Insurance",
      value: "8",
      icon: ShieldCheck,
      alertStatus: "none" as const,
    },
    {
      title: "Stalled (>7 days)",
      value: "3",
      icon: AlertCircle,
      alertStatus: "danger" as const,
    },
    {
      title: "Discharge Deadlines (Today)",
      value: "2",
      icon: AlertTriangle,
      alertStatus: "warning" as const,
    },
    {
      title: "Overdue Actions",
      value: "5",
      icon: Clock4,
      alertStatus: "danger" as const,
    },
  ];

  return (
    <div className="grid grid-cols md:grid-cols-4 lg:grid-cols-7 gap-3">
      {kpis.map((kpi, idx) => (
        <KpiCard key={idx} {...kpi} />
      ))}
    </div>
  );
}
