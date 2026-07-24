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
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Recruiting & Onboarding Pipeline</h1>
            <span className="bg-brand-teal/10 text-brand-teal text-xs font-medium px-3 py-1 rounded-full border border-brand-teal/20">
              Live Kanban
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-regular">
            Caregiver applicant tracking, pre-employment compliance, Checkr/Sterling background checks & e-sign onboarding.
          </p>
        </div>

        {/* Mini stats */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-center min-w-[100px]">
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">Total Active</span>
            <span className="text-lg font-bold text-slate-900">{initialCandidates.length}</span>
          </div>
          <div className="bg-blue-50/70 px-3.5 py-2 rounded-xl border border-blue-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-center min-w-[100px]">
            <span className="text-[10px] font-medium text-blue-600 uppercase tracking-wider block">Background</span>
            <span className="text-lg font-bold text-blue-700">
              {initialCandidates.filter(c => c.stage === "Background Check").length}
            </span>
          </div>
          <div className="bg-emerald-50/70 px-3.5 py-2 rounded-xl border border-emerald-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-center min-w-[100px]">
            <span className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider block">Hired 30d</span>
            <span className="text-lg font-bold text-emerald-700">
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

