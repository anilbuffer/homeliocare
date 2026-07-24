"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HeartHandshake } from "lucide-react";

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
  onSubmitExitInterview
}: ExitInterviewModalProps) {
  const [wouldRehire, setWouldRehire] = useState(true);
  const [primaryReason, setPrimaryReason] = useState(reasonCode || "Schedule Flexibility / Hours");
  const [exitNotes, setExitNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitExitInterview({
      wouldRehire,
      primaryReason,
      exitNotes
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4 text-xs"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-teal/10 text-brand-teal">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base tracking-tight">Offboarding Exit Interview Form</h3>
                <p className="text-slate-500 text-[11px] font-medium">Feeds HR Retention Pulse analytics</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-0.5">
              <div className="font-bold text-slate-900">{caregiverName}</div>
              <div className="text-slate-500 text-[11px] font-medium">Separation Date: {effectiveDate}</div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Primary Exit Reason (Retention Tracking) *</label>
              <select
                value={primaryReason}
                onChange={(e) => setPrimaryReason(e.target.value)}
                className="w-full p-3 border rounded-2xl bg-white font-bold outline-none focus:ring-2 focus:ring-brand-teal"
              >
                <option value="Schedule Flexibility / Hours">Schedule Flexibility / Hours</option>
                <option value="Relocation / Moving">Relocation / Moving</option>
                <option value="Career Advancement">Career Advancement</option>
                <option value="Pay Rate / Compensation">Pay Rate / Compensation</option>
                <option value="Personal / Family Reasons">Personal / Family Reasons</option>
                <option value="Policy Violation / Involuntary">Policy Violation / Involuntary</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Would Rehire in Future? *</label>
              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="rehire"
                    checked={wouldRehire}
                    onChange={() => setWouldRehire(true)}
                    className="text-brand-teal focus:ring-brand-teal"
                  />
                  Yes — Eligible for Rehire
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-red-700">
                  <input
                    type="radio"
                    name="rehire"
                    checked={!wouldRehire}
                    onChange={() => setWouldRehire(false)}
                    className="text-red-600 focus:ring-red-500"
                  />
                  No — Do Not Rehire
                </label>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Exit Interview Detailed Summary & Feedback</label>
              <textarea
                rows={3}
                placeholder="Enter feedback regarding agency experience, management support, reasons for leaving..."
                value={exitNotes}
                onChange={(e) => setExitNotes(e.target.value)}
                className="w-full p-3 border rounded-2xl outline-none focus:ring-2 focus:ring-brand-teal font-medium"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
              <button type="button" onClick={onClose} className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-full">
                Skip Form
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold rounded-full transition-all shadow-md shadow-brand-teal/20 active:scale-95"
              >
                Save Exit Interview & Finalize
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
