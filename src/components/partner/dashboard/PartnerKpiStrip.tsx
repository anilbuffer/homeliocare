"use client";

import React from "react";
import { Send, CheckCircle2, Clock, Inbox } from "lucide-react";
import { mockKPIs } from "@/lib/partner/mockData";

export function PartnerKpiStrip() {
  const kpis = [
    {
      label: "Referrals Submitted",
      value: mockKPIs.referralsSubmittedThisMonth.toString(),
      subtext: "This month",
      subtextColor: "text-slate-500",
      icon: Send,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Conversion Rate",
      value: `${mockKPIs.conversionRate}%`,
      subtext: "Referred → Active Client",
      subtextColor: "text-brand-teal",
      icon: CheckCircle2,
      color: "text-brand-teal",
      bg: "bg-brand-teal/20",
    },
    {
      label: "Avg. Response Time",
      value: `${mockKPIs.avgResponseTimeHours}h`,
      subtext: "From agency",
      subtextColor: "text-slate-500",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      label: "Open / In-Review",
      value: mockKPIs.openInReview.toString(),
      subtext: "Awaiting update",
      subtextColor: "text-indigo-600",
      icon: Inbox,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-3 lg:mb-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="bg-white backdrop-blur-xl rounded-2xl px-4 py-3 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="text-[13px] font-medium text-slate-500 tracking-wide">{kpi.label}</div>
              <div className={`p-2.5 rounded-full ${kpi.bg}`}>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{kpi.value}</div>
              <div className={`text-[11px] font-medium ${kpi.subtextColor}`}>{kpi.subtext}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
