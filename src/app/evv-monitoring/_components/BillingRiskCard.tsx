"use client";

import React from "react";
import { AlertTriangle, DollarSign, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface BillingRiskCardProps {
  totalRisk: number;
  likelyDenied: number;
  needsReview: number;
}

export function BillingRiskCard({ totalRisk, likelyDenied, needsReview }: BillingRiskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-red-50/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden h-full flex flex-col"
    >
      {/* Background Icon */}
      <ShieldAlert className="absolute -right-6 -bottom-6 w-32 h-32 text-red-100 opacity-50 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-red-900">Billing Risk</h3>
        </div>

        <div className="mb-4 mt-2">
          <div className="text-3xl font-black text-red-600 flex items-center">
            <DollarSign className="w-7 h-7" />
            {totalRisk.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-red-700/80 text-xs font-medium mt-1">Total At Risk from Unresolved Exceptions</p>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-xl border border-red-100">
            <span className="text-xs font-semibold text-slate-700">Needs Review (Pre-Claim)</span>
            <span className="font-bold text-slate-900">${needsReview.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-xl border border-red-100">
            <span className="text-xs font-semibold text-slate-700">Likely to be Denied</span>
            <span className="font-bold text-red-600">${likelyDenied.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="mt-auto">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Resolve Before Billing
          </button>
        </div>
      </div>
    </motion.div>
  );
}
