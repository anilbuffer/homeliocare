"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Plus, Sparkles, ShieldCheck, UserPlus } from "lucide-react";
import {
  HrKpiStrip,
  RecruitingPipelineSnapshot,
  HrActionQueue,
  CredentialWatchlist,
  RetentionPulse,
  AddCandidateModal,
  CandidateDetailPanel,
} from "@/components/hr";
import { initialCandidates, initialActionQueue, initialCredentialWatchlist, initialRetentionData } from "@/lib/hr/mockData";
import { Candidate } from "@/types/hr";

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

export default function HrDashboardPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const handleAddCandidate = (newCand: Candidate) => {
    setCandidates(prev => [newCand, ...prev]);
  };

  const handleOpenCandidateDetail = (candidateId: string) => {
    const matched = candidates.find(c => c.id === candidateId) || candidates[0];
    setSelectedCandidate(matched);
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Premium Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Good morning, Sarah</h1>
            <span className="inline-flex items-center gap-1 bg-brand-teal/10 text-brand-teal text-xs font-medium px-3 py-1 rounded-full border border-brand-teal/20 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <ShieldCheck className="w-3.5 h-3.5" />
              HR Recruiter Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-2 font-regular flex-wrap">
            <span>{today}</span>
            <span>&bull;</span>
            <button
              onClick={() => document.getElementById("action-queue")?.scrollIntoView({ behavior: "smooth" })}
              className="text-slate-700 hover:text-brand-teal font-regular hover:underline cursor-pointer transition-colors"
            >
              5 candidates awaiting action
            </button>
            <span>&bull;</span>
            <button
              onClick={() => document.getElementById("credential-watchlist")?.scrollIntoView({ behavior: "smooth" })}
              className="text-amber-600 hover:text-amber-700 font-regular hover:underline cursor-pointer transition-colors"
            >
              3 compliance items due
            </button>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 bg-brand-teal text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-all shadow-[0_6px_24px_rgba(14,163,131,0.28)] hover:shadow-[0_8px_30px_rgba(14,163,131,0.38)] active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Candidate
          </button>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
        {/* Row 1 — KPI Strip */}
        <motion.div variants={itemVariants} id="kpi-strip">
          <HrKpiStrip />
        </motion.div>

        {/* Row 2 — Recruiting Pipeline Snapshot */}
        <motion.div variants={itemVariants} id="recruiting-pipeline">
          <RecruitingPipelineSnapshot />
        </motion.div>

        {/* Row 3 — Urgent Action Queue */}
        <motion.div variants={itemVariants} id="action-queue">
          <HrActionQueue
            initialItems={initialActionQueue}
            onOpenCandidateDetail={handleOpenCandidateDetail}
          />
        </motion.div>

        {/* Row 4 — Credential & Compliance Watchlist */}
        <motion.div variants={itemVariants} id="credential-watchlist">
          <CredentialWatchlist initialItems={initialCredentialWatchlist} />
        </motion.div>

        {/* Row 5 — Retention Pulse */}
        <motion.div variants={itemVariants} id="retention-pulse">
          <RetentionPulse data={initialRetentionData} />
        </motion.div>
      </motion.div>

      {/* Modals */}
      <AddCandidateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        existingCandidates={candidates}
        onAddCandidate={handleAddCandidate}
      />

      {selectedCandidate && (
        <CandidateDetailPanel
          candidate={selectedCandidate}
          isOpen={Boolean(selectedCandidate)}
          onClose={() => setSelectedCandidate(null)}
          onUpdateCandidate={(updated: Candidate) => {
            setCandidates(prev => prev.map(c => c.id === updated.id ? updated : c));
            setSelectedCandidate(updated);
          }}
        />
      )}
    </div>
  );
}


