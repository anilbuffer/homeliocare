"use client";

import React from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface BillingRiskCardProps {
  totalRisk: number;
  likelyDenied: number;
  needsReview: number;
}

export function BillingRiskCard({ totalRisk, likelyDenied, needsReview }: BillingRiskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all duration-200 relative overflow-hidden h-full flex flex-col justify-between"
    >
      {/* Background Icon */}
      <ShieldAlert className="absolute -right-6 -bottom-6 w-32 h-32 text-red-100/40 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 stroke-[2.5]" />
            <h3 className="font-bold text-red-900 text-sm">Billing Risk</h3>
          </div>

          <div className="mb-4">
            <div className="text-3xl font-black text-red-600 tracking-tight">
              $ {totalRisk.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-red-500/90 text-xs font-semibold mt-1">Total At Risk from Unresolved Exceptions</p>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <span className="text-xs font-semibold text-slate-700">Needs Review (Pre-Claim)</span>
              <span className="font-bold text-slate-900 text-sm">
                ${needsReview.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <span className="text-xs font-semibold text-slate-700">Likely to be Denied</span>
              <span className="font-bold text-red-600 text-sm">
                ${likelyDenied.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-sm active:scale-[0.99]">
            <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
            Resolve Before Billing
          </button>
        </div>
      </div>
    </motion.div>
  );
}

