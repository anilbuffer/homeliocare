"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ManageTraining } from "@/components/training/ManageTraining";
import { RequiredTraining } from "@/components/training/RequiredTraining";
import { GraduationCap, Award, BookOpen, CheckCircle2, Sparkles } from "lucide-react";

type HrTrainingTab = "manage-training" | "required-training";

export default function HrTrainingPage() {
  const [view, setView] = useState<HrTrainingTab>("manage-training");

  const tabs: { id: HrTrainingTab; label: string }[] = [
    { id: "manage-training", label: "Assign & Manage Cohorts" },
    { id: "required-training", label: "Required Training Rules (By Role / Hire Date)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full mx-auto space-y-6"
    >
      {/* Header & Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                HR Training & LMS Management
                <span className="px-2 py-0.5 text-[10px] font-medium bg-brand-teal/10 text-brand-teal rounded-full border border-brand-teal/20">
                  LMS v2.4
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Assign mandatory compliance courses to new hires, manage caregiver cohorts, and configure role rules.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-100/90 p-1.5 gap-1 rounded-2xl relative self-start lg:self-auto border border-slate-200/80">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${view === tab.id ? "text-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.04)]" : "text-slate-500 hover:text-slate-800"
                }`}
            >
              {view === tab.id && (
                <motion.div
                  layoutId="hr-training-tab-indicator"
                  className="absolute inset-0 bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-slate-200/80"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Top Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/90 backdrop-blur-xl p-4.5 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-brand-teal/40 transition-all flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold border border-brand-teal/20 shrink-0 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-medium text-slate-400 block">Active LMS Modules</span>
            <span className="text-xl font-bold text-slate-900">17 Courses</span>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl p-4.5 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-emerald-300 transition-all flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200 shrink-0 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-medium text-emerald-700 block">30-Day Completion Rate</span>
            <span className="text-xl font-bold text-emerald-950">94.2%</span>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl p-4.5 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-blue-300 transition-all flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold border border-blue-200 shrink-0 group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-medium text-blue-700 block">Pending Certifications</span>
            <span className="text-xl font-bold text-blue-950">5 Caregivers</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {view === "manage-training" ? (
          <motion.div
            key="manage-training"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ManageTraining />
          </motion.div>
        ) : (
          <motion.div
            key="required-training"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <RequiredTraining />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


