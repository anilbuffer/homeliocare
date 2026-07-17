"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Clock, Bell, Calendar } from "lucide-react";
import { KpiSummaryData } from "@/types/compliance";

interface KpiCardStripProps {
  data: KpiSummaryData;
}

export function KpiCardStrip({ data }: KpiCardStripProps) {
  const cards = [
    {
      title: "Fully Compliant Staff",
      value: data.fullyCompliantCount,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-400/60",
    },
    {
      title: "Expiring Within 30 Days",
      value: data.expiringCount,
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-400/60",
    },
    {
      title: "Expired / Overdue",
      value: data.expiredCount,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-400/60",
    },
    {
      title: "Pending Verification",
      value: data.pendingCount,
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-400/60",
    },
    {
      title: "Automated Reminders",
      value: data.remindersSent,
      icon: Bell,
      color: "text-purple-600",
      bg: "bg-purple-400/60",
    },
    {
      title: "Avg Days to Renewal",
      value: data.avgDaysToRenewal.toFixed(1),
      icon: Calendar,
      color: "text-brand-teal",
      bg: "bg-brand-teal/60",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xs font-medium text-slate-500">{card.title}</h3>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${card.bg}`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-auto">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
