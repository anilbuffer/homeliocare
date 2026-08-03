"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck } from "lucide-react";
import { FieldSupervisorKpiStrip } from "../../components/supervisor/FieldSupervisorKpiStrip";
import { VisitDueQueue } from "../../components/supervisor/VisitDueQueue";
import { FindingsFollowUpQueue } from "../../components/supervisor/FindingsFollowUpQueue";
import { MyTeamSnapshot } from "../../components/supervisor/MyTeamSnapshot";
import { RecentIncidentsFiled } from "../../components/supervisor/RecentIncidentsFiled";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function FieldSupervisorDashboard() {
  const { currentUser } = useAuth();

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Premium Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Good morning, {currentUser?.name?.split(",")[0] || "Supervisor"}
            </h1>
            <span className="inline-flex items-center gap-1 bg-brand-teal/10 text-brand-teal text-xs font-medium px-3 py-1 rounded-full border border-brand-teal/20 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Field Supervisor
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-2 font-regular flex-wrap">
            <span>{today}</span>
            <span>&bull;</span>
            <span><span className="text-brand-teal font-semibold">12 visits due</span> this week</span>
            <span>&bull;</span>
            <span><span className="text-accent-red font-semibold">2 overdue</span></span>
          </p>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
        {/* Row 1 - KPI Strip */}
        <motion.div variants={itemVariants}>
          <FieldSupervisorKpiStrip />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
          <div className="xl:col-span-2 flex flex-col gap-6">
            {/* Row 2 - Visit Queue */}
            <motion.div variants={itemVariants} className="flex-1 min-h-[300px]">
              <VisitDueQueue />
            </motion.div>

            {/* Row 3 - Findings Follow-Up */}
            <motion.div variants={itemVariants} className="flex-1 min-h-[300px]">
              <FindingsFollowUpQueue />
            </motion.div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Row 4 - My Team Snapshot */}
            <motion.div variants={itemVariants} className="flex-1 min-h-[300px]">
              <MyTeamSnapshot />
            </motion.div>

            {/* Row 5 - Recent Incidents */}
            <motion.div variants={itemVariants} className="flex-1 min-h-[300px]">
              <RecentIncidentsFiled />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
