"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ListFilter, Kanban, CheckSquare } from "lucide-react";

import { KpiCardsRow } from "../../components/referrals/KpiCardsRow";
import { PipelineBoard } from "../../components/referrals/PipelineBoard";
import { SourcePerformanceChart } from "../../components/referrals/SourcePerformanceChart";
import { OnlineReferralQueue } from "../../components/referrals/OnlineReferralQueue";
import { RecentlyDeclinedList } from "../../components/referrals/RecentlyDeclinedList";
import { NewReferralModal } from "../../components/referrals/NewReferralModal";

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

type ViewMode = "pipeline" | "list" | "tasks";

export default function ReferralsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("pipeline");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Referrals & Intake</h2>
          <p className="text-sm text-text-secondary mt-1">3 active referrals in pipeline</p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Toggles */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <button
              onClick={() => setViewMode("pipeline")}
              className={`p-2 rounded-full transition-colors ${viewMode === "pipeline" ? "bg-brand-teal/20 text-brand-teal shadow-[0_6px_32px_rgba(0,0,0,0.06)]" : "text-slate-500 hover:text-slate-700"}`}
              title="Pipeline View"
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-colors ${viewMode === "list" ? "bg-brand-teal/20 text-brand-teal shadow-[0_6px_32px_rgba(0,0,0,0.06)]" : "text-slate-500 hover:text-slate-700"}`}
              title="List View"
            >
              <ListFilter className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("tasks")}
              className={`p-2 rounded-full transition-colors ${viewMode === "tasks" ? "bg-brand-teal/20 text-brand-teal shadow-[0_6px_32px_rgba(0,0,0,0.06)]" : "text-slate-500 hover:text-slate-700"}`}
              title="My Tasks"
            >
              <CheckSquare className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-600 active:scale-95 transition-all text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-[0_6px_24px_rgba(14,163,131,0.25)] hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            New Referral
          </button>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Row 1: KPI Strip */}
        <motion.div variants={item}>
          <KpiCardsRow />
        </motion.div>

        {/* Row 2: Pipeline Board */}
        <motion.div variants={item}>
          <PipelineBoard viewMode={viewMode} />
        </motion.div>

        {/* Row 3: Performance & Queue */}
        <motion.div variants={item} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <SourcePerformanceChart />
          </div>
          <div className="xl:col-span-1 flex flex-col gap-6">
            <OnlineReferralQueue />
            <RecentlyDeclinedList />
          </div>
        </motion.div>
      </motion.div>

      <NewReferralModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
