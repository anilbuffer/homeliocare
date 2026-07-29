"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

import { ClinicalKpiStrip } from "@/components/clinical/ClinicalKpiStrip";
import { ClinicalEscalationQueue } from "@/components/clinical/ClinicalEscalationQueue";
import { IncidentReviewQueue } from "@/components/clinical/IncidentReviewQueue";
import { CarePlanReviewQueue } from "@/components/clinical/CarePlanReviewQueue";
import { SupervisoryVisitSchedule } from "@/components/clinical/SupervisoryVisitSchedule";

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

export default function ClinicalDashboardPage() {
  const { currentUser } = useAuth();

  // Example of subtext based on the user's requirements
  const headerSubtext = "8 care plans due for review, 3 clinical incidents need review, 4 supervisory visits due this week.";

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Good morning, {currentUser?.name?.split(",")[0] || "Rachel"}!
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">{headerSubtext}</p>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Row 1: KPI Strip */}
        <motion.div variants={item}>
          <ClinicalKpiStrip />
        </motion.div>

        {/* Row 2: Clinical Escalation Queue (Front and center, highest stakes) */}
        <motion.div variants={item}>
          <ClinicalEscalationQueue />
        </motion.div>

        {/* Rows 3 & 4: Incident Review & Care Plan Review Queue side-by-side or stacked on smaller screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          <motion.div variants={item} className="h-full">
            <IncidentReviewQueue />
          </motion.div>
          <motion.div variants={item} className="h-full">
            <CarePlanReviewQueue />
          </motion.div>
        </div>

        {/* Row 5: Supervisory Visit Schedule */}
        <motion.div variants={item} className="h-[350px]">
          <SupervisoryVisitSchedule />
        </motion.div>

      </motion.div>
    </div>
  );
}
