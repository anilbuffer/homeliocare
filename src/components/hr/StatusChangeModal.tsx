"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserX } from "lucide-react";
import clsx from "clsx";

interface StatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
  currentStatus: string;
  onConfirmStatusChange: (newStatus: "Active" | "Leave of Absence" | "Terminated", reasonCode: string, effectiveDate: string) => void;
}

export function StatusChangeModal({
  isOpen,
  onClose,
  caregiverName,
  currentStatus,
  onConfirmStatusChange
}: StatusChangeModalProps) {
  const [targetStatus, setTargetStatus] = useState<"Active" | "Leave of Absence" | "Terminated">("Leave of Absence");
  const [reasonCode, setReasonCode] = useState("Personal Leave");
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split("T")[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmStatusChange(targetStatus, reasonCode, effectiveDate);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4 text-xs"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-2xl bg-amber-100 text-amber-700">
                <UserX className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base tracking-tight">Change Caregiver Status</h3>
            </div>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Caregiver</label>
              <div className="p-3 bg-slate-100/70 rounded-2xl font-bold text-slate-900">{caregiverName} (Current: {currentStatus})</div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">New Employment Status *</label>
              <select
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value as any)}
                className="w-full p-3 border rounded-2xl bg-white font-bold outline-none focus:ring-2 focus:ring-brand-teal"
              >
                <option value="Active">Active (Eligible for Shifts)</option>
                <option value="Leave of Absence">Leave of Absence (Temporarily Paused)</option>
                <option value="Terminated">Terminated (Offboarding & Removed from Scheduling Pool)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Reason Code *</label>
              {targetStatus === "Terminated" ? (
                <select
                  value={reasonCode}
                  onChange={(e) => setReasonCode(e.target.value)}
                  className="w-full p-3 border rounded-2xl bg-white font-bold outline-none focus:ring-2 focus:ring-brand-teal"
                >
                  <option value="Voluntary - Relocation / Moving">Voluntary - Relocation / Moving</option>
                  <option value="Voluntary - Schedule Flexibility / Hours">Voluntary - Schedule Flexibility / Hours</option>
                  <option value="Voluntary - Career Advancement">Voluntary - Career Advancement</option>
                  <option value="Voluntary - Pay Rate / Compensation">Voluntary - Pay Rate / Compensation</option>
                  <option value="Involuntary - Policy Violation / Attendance">Involuntary - Policy Violation / Attendance</option>
                  <option value="Involuntary - Failed Background Check / Credential">Involuntary - Failed Background Check / Credential</option>
                </select>
              ) : (
                <select
                  value={reasonCode}
                  onChange={(e) => setReasonCode(e.target.value)}
                  className="w-full p-3 border rounded-2xl bg-white font-bold outline-none focus:ring-2 focus:ring-brand-teal"
                >
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Medical Leave (FMLA)">Medical Leave (FMLA)</option>
                  <option value="Maternity / Paternity Leave">Maternity / Paternity Leave</option>
                  <option value="Educational Leave">Educational Leave</option>
                </select>
              )}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Effective Date *</label>
              <input
                type="date"
                required
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="w-full p-3 border rounded-2xl bg-white font-bold outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>

            {targetStatus === "Terminated" && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-900 text-[11px] space-y-1 font-medium">
                <strong>Warning:</strong> Terminating this caregiver will immediately remove them from the active shift scheduling pool and trigger the Exit Interview questionnaire.
              </div>
            )}

            <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
              <button type="button" onClick={onClose} className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-full">
                Cancel
              </button>
              <button
                type="submit"
                className={clsx(
                  "px-5 py-2.5 text-white font-bold rounded-full transition-all shadow-md active:scale-95",
                  targetStatus === "Terminated" ? "bg-red-600 hover:bg-red-700 shadow-red-200" : "bg-brand-teal hover:bg-brand-teal/90 shadow-brand-teal/20"
                )}
              >
                Confirm Status Change
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
