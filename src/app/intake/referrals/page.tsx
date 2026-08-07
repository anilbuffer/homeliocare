"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ListFilter, Kanban, CheckSquare } from "lucide-react";

import { KpiCardsRow } from "@/components/referrals/KpiCardsRow";
import { PipelineBoard } from "@/components/referrals/PipelineBoard";
import { SourcePerformanceChart } from "@/components/referrals/SourcePerformanceChart";
import { OnlineReferralQueue } from "@/components/referrals/OnlineReferralQueue";
import { RecentlyDeclinedList } from "@/components/referrals/RecentlyDeclinedList";
import { NewReferralModal } from "@/components/referrals/NewReferralModal";
import { NewInquiryModal } from "@/components/referrals/NewInquiryModal";
import { initialReferrals } from "@/components/referrals/MockData";
import { Referral } from "@/components/referrals/types";

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

export default function IntakeReferralsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("pipeline");
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);

  const handleAddReferral = (newReferral: Referral) => {
    setReferrals(prev => [newReferral, ...prev]);
  };

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Referrals & Intake Pipeline</h2>
          <p className="text-xs text-text-secondary mt-1">Manage incoming inquiries and admissions</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
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

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-600 active:scale-95 transition-all text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-[0_6px_24px_rgba(14,163,131,0.25)] hover:shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Intake
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-[60] py-1 overflow-hidden origin-top-right"
                >
                  <button
                    onClick={() => {
                      setIsInquiryModalOpen(true);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-teal transition-colors"
                  >
                    New Inquiry
                  </button>
                  <button
                    onClick={() => {
                      setIsReferralModalOpen(true);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-teal transition-colors"
                  >
                    New Referral
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        {/* Row 1: KPI Strip */}
        <motion.div variants={item}>
          <KpiCardsRow />
        </motion.div>

        {/* Row 2: Pipeline Board */}
        <motion.div variants={item}>
          <PipelineBoard viewMode={viewMode} referrals={referrals} setReferrals={setReferrals} />
        </motion.div>

        {/* Row 3: Performance & Queue */}
        <motion.div variants={item} className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <SourcePerformanceChart />
          </div>
          <div className="xl:col-span-1 flex flex-col gap-4">
            <OnlineReferralQueue />
            <RecentlyDeclinedList />
          </div>
        </motion.div>
      </motion.div>

      <NewInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        onSubmit={handleAddReferral}
      />
      <NewReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        onSubmit={handleAddReferral}
      />
    </div>
  );
}
