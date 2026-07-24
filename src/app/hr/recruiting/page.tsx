"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { UserCheck, ShieldCheck, Clock, Award } from "lucide-react";
import { RecruitingPipelineBoard } from "@/components/hr/RecruitingPipelineBoard";
import { initialCandidates } from "@/lib/hr/mockData";
import { CandidateStage } from "@/types/hr";

function RecruitingContent() {
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage") as CandidateStage | null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full mx-auto space-y-6"
    >
      {/* Header & Quick Metrics */}
      <div className="bg-white backdrop-blur-2xl p-4 lg:p-6 rounded-xl border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col xl:flex-row xl:items-center justify-between gap-6 transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)]">
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Recruiting Pipeline</h1>
            <span className="bg-brand-teal/10 text-brand-teal text-xs font-medium px-3 py-1.5 rounded-full border border-brand-teal/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
              Live Kanban
            </span>
          </div>
          <p className="text-xs text-slate-500 font-regular max-w-2xl leading-relaxed">
            Caregiver applicant tracking, pre-employment compliance, Checkr/Sterling background checks & e-sign onboarding.
          </p>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 w-full xl:w-auto">
          <div className="bg-slate-50 backdrop-blur-md p-3 lg:px-4 rounded-xl border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.04)] text-center flex-1 min-w-[120px] transition-transform hover:-translate-y-1 duration-300">
            <span className="text-[10px] sm:text-xs font-medium text-slate-500 block mb-1">Total Active</span>
            <span className="text-xl font-bold text-slate-900">{initialCandidates.length}</span>
          </div>
          <div className="bg-blue-50 backdrop-blur-md p-3 lg:px-4 rounded-xl border border-blue-200 shadow-[0_8px_24px_rgba(0,0,0,0.04)] text-center flex-1 min-w-[120px] transition-transform hover:-translate-y-1 duration-300">
            <span className="text-[10px] sm:text-xs font-medium text-blue-600 block mb-1">Background</span>
            <span className="text-xl font-bold text-blue-700">
              {initialCandidates.filter(c => c.stage === "Background Check").length}
            </span>
          </div>
          <div className="bg-emerald-50 backdrop-blur-md p-3 lg:px-4 rounded-xl border border-emerald-200 shadow-[0_8px_24px_rgba(0,0,0,0.04)] text-center flex-1 min-w-[120px] col-span-2 sm:col-span-1 transition-transform hover:-translate-y-1 duration-300">
            <span className="text-[10px] sm:text-xs font-medium text-emerald-600 block mb-1">Hired 30d</span>
            <span className="text-xl font-bold text-emerald-700">
              {initialCandidates.filter(c => c.stage === "Hired").length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Kanban Board Component */}
      <RecruitingPipelineBoard
        initialCandidates={initialCandidates}
        initialStageFilter={stageParam}
      />
    </motion.div>
  );
}

export default function RecruitingPage() {
  return (
    <Suspense fallback={
      <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 rounded-full border-3 border-brand-teal border-t-transparent animate-spin" />
        <p className="text-slate-500 text-xs font-semibold">Loading Recruiting Pipeline...</p>
      </div>
    }>
      <RecruitingContent />
    </Suspense>
  );
}

