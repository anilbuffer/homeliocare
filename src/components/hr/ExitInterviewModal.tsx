"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HeartHandshake, ChevronDown, FileText, Check, AlertCircle, ArrowRight } from "lucide-react";
import clsx from "clsx";

interface ExitInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
  reasonCode: string;
  effectiveDate: string;
  onSubmitExitInterview: (data: {
    wouldRehire: boolean;
    primaryReason: string;
    exitNotes: string;
  }) => void;
}

export function ExitInterviewModal({
  isOpen,
  onClose,
  caregiverName,
  reasonCode,
  effectiveDate,
  onSubmitExitInterview,
}: ExitInterviewModalProps) {
  const [wouldRehire, setWouldRehire] = useState(true);
  const [primaryReason, setPrimaryReason] = useState(
    reasonCode || "Schedule Flexibility / Hours"
  );
  const [exitNotes, setExitNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitExitInterview({
      wouldRehire,
      primaryReason,
      exitNotes,
    });
    onClose();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 text-xs font-sans text-slate-800"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-teal/10 text-brand-teal">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg tracking-tight">
                  Offboarding Exit Interview Form
                </h3>
                <p className="text-slate-500 text-xs font-normal mt-0.5">
                  Feeds HR Retention Pulse analytics & caregiver feedback
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Caregiver Info Banner */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white font-semibold flex items-center justify-center text-xs shadow-sm">
                  {getInitials(caregiverName)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {caregiverName}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Separation Effective Date: {effectiveDate}
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                Offboarding
              </span>
            </div>

            {/* Primary Exit Reason Dropdown */}
            <div>
              <label className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                <span>Primary Exit Reason <span className="text-rose-500">*</span></span>
                <span className="text-[10px] text-slate-400 font-normal lowercase">HR Retention Category</span>
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={primaryReason}
                  onChange={(e) => setPrimaryReason(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 font-medium text-xs outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 appearance-none transition-all cursor-pointer"
                >
                  <option value="Schedule Flexibility / Hours">
                    Schedule Flexibility / Hours
                  </option>
                  <option value="Relocation / Moving">Relocation / Moving</option>
                  <option value="Career Advancement">Career Advancement</option>
                  <option value="Pay Rate / Compensation">
                    Pay Rate / Compensation
                  </option>
                  <option value="Personal / Family Reasons">
                    Personal / Family Reasons
                  </option>
                  <option value="Policy Violation / Involuntary">
                    Policy Violation / Involuntary
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Rehire Eligibility Radio Cards */}
            <div>
              <label className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5">
                Would Rehire in Future? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setWouldRehire(true)}
                  className={clsx(
                    "p-3 rounded-2xl border text-left transition-all duration-150 flex items-center gap-3",
                    wouldRehire
                      ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40 text-emerald-900 font-bold"
                      : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-100/60 text-slate-600"
                  )}
                >
                  <div
                    className={clsx(
                      "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                      wouldRehire
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300 bg-white"
                    )}
                  >
                    {wouldRehire && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold">Yes — Eligible</div>
                    <div className="text-[10px] text-slate-500 font-normal">
                      Cleared for rehire pool
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setWouldRehire(false)}
                  className={clsx(
                    "p-3 rounded-2xl border text-left transition-all duration-150 flex items-center gap-3",
                    !wouldRehire
                      ? "border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/40 text-rose-900 font-bold"
                      : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-100/60 text-slate-600"
                  )}
                >
                  <div
                    className={clsx(
                      "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                      !wouldRehire
                        ? "border-rose-600 bg-rose-600 text-white"
                        : "border-slate-300 bg-white"
                    )}
                  >
                    {!wouldRehire && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-rose-700">
                      No — Do Not Rehire
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal">
                      Flagged in system audit
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Exit Notes */}
            <div>
              <label className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5">
                Exit Interview Summary & Feedback
              </label>
              <textarea
                rows={3}
                placeholder="Enter notes regarding agency experience, management support, or exit details..."
                value={exitNotes}
                onChange={(e) => setExitNotes(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 font-medium text-xs outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Footer Actions */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors text-xs"
              >
                Skip Form
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold rounded-xl transition-all duration-150 shadow-md shadow-brand-teal/20 active:scale-[0.98] flex items-center gap-2 text-xs"
              >
                <span>Save Exit Interview & Finalize</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

