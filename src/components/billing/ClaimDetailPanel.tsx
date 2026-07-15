"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Calendar, DollarSign, Activity, Paperclip } from "lucide-react";

interface ClaimDetailPanelProps {
  claimId: string;
  onClose: () => void;
}

export function ClaimDetailPanel({ claimId, onClose }: ClaimDetailPanelProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="relative w-full max-w-md bg-white h-full shadow-2xl shadow-slate-300/50 flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Claim Details</h2>
              <p className="text-sm text-slate-500 mt-0.5">{claimId}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

            {/* Client Info */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Client Information</div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-bold text-lg">
                  MC
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-base">Margaret Chen</div>
                  <div className="text-sm text-slate-500">ID: PAT-84920</div>
                </div>
              </div>
            </div>

            {/* Claim Summary */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Claim Summary</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                    <DollarSign className="w-3.5 h-3.5" /> Amount
                  </div>
                  <div className="font-semibold text-slate-900 text-lg">$2,450.00</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                    <Activity className="w-3.5 h-3.5" /> Status
                  </div>
                  <div className="font-semibold text-slate-900 text-lg">Draft</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-1 col-span-2">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5" /> Service Dates
                  </div>
                  <div className="font-semibold text-slate-900 text-base">Oct 01, 2026 - Oct 12, 2026</div>
                </div>
              </div>
            </div>

            {/* Codes & Auth */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Codes & Authorization</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Service Code (CPT)</span>
                  <span className="text-sm font-medium text-slate-900">T1019 (Personal Care)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Diagnosis Code (ICD-10)</span>
                  <span className="text-sm font-medium text-slate-900">G30.9 (Alzheimer's)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Authorization Ref</span>
                  <span className="text-sm font-medium text-brand-teal cursor-pointer hover:underline">AUTH-88291A</span>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Attached Documents</div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-sm font-medium text-slate-900 truncate">Timesheet_Oct1-12.pdf</div>
                    <div className="text-xs text-slate-500">2.4 MB • Uploaded Oct 12</div>
                  </div>
                  <Paperclip className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-3">
            <button className="flex-1 bg-white border border-slate-200 text-slate-700 font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              Edit Claim
            </button>
            <button className="flex-1 bg-brand-teal text-white font-medium py-2.5 rounded-xl hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20">
              Submit Claim
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
