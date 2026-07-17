import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { Referral } from "./types";

interface HandoffSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  referral: Referral;
  onConfirm: () => void;
}

export function HandoffSummaryModal({ isOpen, onClose, referral, onConfirm }: HandoffSummaryModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-teal" />
              Admit Client: {referral.clientName}
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-sm text-slate-600">
              You are about to admit <strong>{referral.clientName}</strong>. This will create a new Client Profile and transfer all collected information. Please review the summary below.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Demographics</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>Name: {referral.clientName}</li>
                  <li>DOB: {referral.dob || "Missing"}</li>
                  <li>Phone: {referral.phone || "Missing"}</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Insurance</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>Payer: {referral.insurance?.payer || "None"}</li>
                  <li>Status: {referral.insurance?.status || "Pending"}</li>
                </ul>
              </div>
            </div>

            <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-amber-900">Missing Information</h4>
                <p className="text-sm text-amber-700 mt-1">Some documents are still missing (e.g., Physician Orders). You can admit the client now and upload these documents to their profile later.</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              Cancel
            </button>
            <button onClick={onConfirm} className="px-5 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-teal-600 rounded-lg shadow-md flex items-center gap-2 transition-colors">
              Confirm & Create Profile
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
