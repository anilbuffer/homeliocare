"use client";

import React from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, Clock, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/components/ui/Card";

import { motion, Variants } from "framer-motion";

export function IncidentsKpiStrip() {
  const kpiData = [
    { label: "Open Incidents", value: "8", trend: "3 require action", icon: ShieldAlert, color: "text-accent-amber", bg: "bg-accent-amber/20", trendColor: "text-accent-red" },
    { label: "Under Investigation", value: "3", trend: "1 assigned today", icon: Activity, color: "text-accent-blue", bg: "bg-accent-blue/20", trendColor: "text-text-secondary" },
    { label: "Awaiting Corrective Action", value: "2", trend: "Both overdue", icon: AlertTriangle, color: "text-accent-orange", bg: "bg-accent-orange/20", trendColor: "text-accent-red" },
    { label: "Resolved This Month", value: "14", trend: "+ 2 vs last month", icon: CheckCircle2, color: "text-accent-green", bg: "bg-accent-green/20", trendColor: "text-accent-green" },
    { label: "Avg. Time to Resolution", value: "4.2 days", trend: "- 0.5 days", icon: Clock, color: "text-brand-teal", bg: "bg-brand-teal/20", trendColor: "text-brand-teal" },
    { label: "Supervisor Alerts", value: "2", trend: "Unread", icon: ShieldAlert, color: "text-accent-red", bg: "bg-accent-red/20", trendColor: "text-accent-red" },
    { label: "Regulatory Reports Overdue", value: "1", trend: "Requires immediate action", icon: ShieldCheck, color: "text-white", bg: "bg-accent-red", trendColor: "text-accent-red" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-7 gap-4"
    >
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 20 } }}
            key={idx}
            className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:border-brand-teal/60 transition-colors duration-300 relative overflow-hidden flex flex-col h-full group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[12px] font-medium text-text-secondary leading-tight pr-2">{kpi.label}</span>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shrink-0", kpi.bg, kpi.color)}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-auto">
              <div className="text-xl font-semibold text-slate-800 tracking-tight mb-1">
                {kpi.value}
              </div>
              <div className={cn("text-[11px] font-medium", kpi.trendColor)}>
                {kpi.trend}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
