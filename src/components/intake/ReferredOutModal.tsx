"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Building2, Building } from "lucide-react";

interface ReferredOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string, agency: string) => void;
  clientName?: string;
}

const mockAgencies = [
  "Visiting Angels (North County)",
  "Comfort Keepers (East Side)",
  "Hospice Care Partners",
  "No suitable agency nearby (Dead End)"
];

const reasons = [
  "Outside Service Area",
  "Requires higher acuity care (Skilled Nursing)",
  "Cannot accommodate schedule",
  "Medicaid waiver not accepted by us",
  "Other"
];

export function ReferredOutModal({ isOpen, onClose, onConfirm, clientName }: ReferredOutModalProps) {
  const [selectedReason, setSelectedReason] = useState(reasons[0]);
  const [selectedAgency, setSelectedAgency] = useState(mockAgencies[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(selectedReason, selectedAgency);
    onClose();
  };

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
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Refer Out Inquiry</h3>
                <p className="text-xs text-slate-500">{clientName || "Client"} • Not Qualified</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Reason for Referring Out</label>
                <div className="space-y-2">
                  {reasons.map(r => (
                    <label key={r} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <input 
                        type="radio" 
                        name="reason" 
                        value={r}
                        checked={selectedReason === r}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal"
                      />
                      <span className="text-sm font-medium text-slate-700">{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Destination Agency</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={selectedAgency}
                    onChange={(e) => setSelectedAgency(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none appearance-none"
                  >
                    {mockAgencies.map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 ml-1">
                  Never a dead end for a family. Always try to provide a referral.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Confirm Referral Out
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
