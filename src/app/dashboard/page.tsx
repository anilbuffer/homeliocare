"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";

import { KpiStrip } from "@/components/dashboard/KpiStrip";
import { VisitsChart } from "@/components/dashboard/VisitsChart";
import { PatientSatisfaction } from "@/components/dashboard/PatientSatisfaction";
import { LiveVisitFeed } from "@/components/dashboard/LiveVisitFeed";
import { RecentIncidents } from "@/components/dashboard/RecentIncidents";
import { TopCaregivers } from "@/components/dashboard/TopCaregivers";
import { CredentialTracker } from "@/components/dashboard/CredentialTracker";
import { FinancialHealth } from "@/components/dashboard/FinancialHealth";
import { AuthUtilization } from "@/components/dashboard/AuthUtilization";
import { CaregiverOvertime } from "@/components/dashboard/CaregiverOvertime";
import { EvvCompliance } from "@/components/dashboard/EvvCompliance";
import { WastedHours } from "@/components/dashboard/WastedHours";
import { AiInsights } from "@/components/dashboard/AiInsights";
import { BottomGlance } from "@/components/dashboard/BottomGlance";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function DashboardPage() {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Good morning, Sarah!</h2>
          <p className="text-sm text-text-secondary mt-1">{today}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/caregivers-tracker" target="_blank" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 px-4 py-2.5 rounded-full text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <MapPin className="w-4 h-4 text-brand-teal" />
            Track Caregivers
          </Link>
          <button className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap">
            <Sparkles className="w-4 h-4 text-white" />
            AI Briefing
          </button>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        {/* Row 1: KPI Strip */}
        <motion.div variants={item}>
          <KpiStrip />
        </motion.div>

        {/* Row 2: 2/3 and 1/3 */}
        <motion.div variants={item} className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <VisitsChart />
          </div>
          <div className="xl:col-span-1">
            <PatientSatisfaction />
          </div>
        </motion.div>

        {/* Row 3: 1/2 and 1/2 */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EvvCompliance />
          <WastedHours />
        </motion.div>

        {/* Row 4: 1/3, 1/3, 1/3 */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <FinancialHealth />
          <AuthUtilization />
          <CaregiverOvertime />
        </motion.div>

        {/* Row 5: 1/3, 1/3, 1/3 */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RecentIncidents />
          <TopCaregivers />
          <CredentialTracker />
        </motion.div>

        {/* Row 6 & 7: Left 2/3 (At a glance + Insights), Right 1/3 (Live Feed) */}
        <motion.div variants={item} className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 flex flex-col gap-4">
            <BottomGlance />
            <AiInsights />
          </div>
          <div className="xl:col-span-1">
            <LiveVisitFeed />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
