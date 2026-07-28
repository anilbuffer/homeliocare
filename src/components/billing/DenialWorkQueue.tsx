"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, Clock, ChevronRight, X, FileText, Activity, ShieldCheck, FileSignature } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { toast } from "sonner";

interface DeniedClaim {
  id: string;
  clientName: string;
  payer: string;
  reasonCode: string;
  reasonDescription: string;
  amount: number;
  daysRemaining: number;
  dateOfService: string;
}

const mockDeniedClaims: DeniedClaim[] = [
  { id: "CLM-9921", clientName: "Robert Chen", payer: "Medicaid", reasonCode: "CO-16", reasonDescription: "Lacks info for adjudication", amount: 480.00, daysRemaining: 5, dateOfService: "2026-06-15" },
  { id: "CLM-9943", clientName: "Mary Smith", payer: "BlueCross", reasonCode: "CO-29", reasonDescription: "Time limit for filing has expired", amount: 145.00, daysRemaining: 12, dateOfService: "2026-06-18" },
  { id: "CLM-9955", clientName: "James Wilson", payer: "Aetna", reasonCode: "PR-31", reasonDescription: "Patient cannot be identified", amount: 320.00, daysRemaining: 2, dateOfService: "2026-06-10" },
];

export function DenialWorkQueue() {
  const [claims, setClaims] = useState<DeniedClaim[]>(mockDeniedClaims);
  const [investigatingId, setInvestigatingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeClaim = claims.find(c => c.id === investigatingId);

  const handleAction = (id: string, action: string) => {
    // Correct & Resubmit, File Appeal, Write Off
    setClaims(prev => prev.filter(c => c.id !== id));
    setInvestigatingId(null);
    if (action === 'resubmit') {
      toast.success("Claim corrected and queued for resubmission.");
    } else if (action === 'appeal') {
      toast.success("Appeal filing process initiated.");
    } else if (action === 'writeoff') {
      toast.info("Write-off workflow started.");
    }
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          Denial Work Queue
        </h2>
        <p className="text-xs text-slate-500">
          {claims.length} denied claims require attention before timely filing expires.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="py-3 px-4 text-xs text-slate-500 uppercase tracking-wider">Client & Service</th>
              <th className="py-3 px-4 text-xs text-slate-500 uppercase tracking-wider">Payer</th>
              <th className="py-3 px-4 text-xs text-slate-500 uppercase tracking-wider">Denial Reason</th>
              <th className="py-3 px-4 text-xs text-slate-500 uppercase tracking-wider text-right">Amount</th>
              <th className="py-3 px-4 text-xs text-slate-500 uppercase tracking-wider">Deadline</th>
              <th className="py-3 px-4 text-xs text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <AnimatePresence initial={false}>
              {claims.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    No denied claims in queue.
                  </td>
                </tr>
              ) : (
                claims.map(claim => (
                  <motion.tr
                    key={claim.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="py-3 px-4">
                      <div className="text-xs font-semibold text-slate-900 whitespace-nowrap">{claim.clientName}</div>
                      <div className="text-xs text-slate-500 whitespace-nowrap">{claim.dateOfService} • {claim.id}</div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-700 whitespace-nowrap">{claim.payer}</td>
                    <td className="py-3 px-4">
                      <div className="text-xs font-medium text-slate-800 whitespace-nowrap">{claim.reasonCode}</div>
                      <div className="text-xs text-slate-500 max-w-[200px] truncate" title={claim.reasonDescription}>
                        {claim.reasonDescription}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                      ${claim.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <div className={clsx(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap",
                        claim.daysRemaining <= 5 ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                      )}>
                        <Clock className="w-3 h-3" />
                        {claim.daysRemaining} days left
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setInvestigatingId(claim.id)}
                        className="inline-flex items-center gap-1 bg-white border border-slate-200 text-slate-700 hover:text-brand-teal hover:border-brand-teal px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
                      >
                        Investigate
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Investigation Slide-over Panel */}
      {mounted && createPortal(
        <AnimatePresence>
          {activeClaim && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInvestigatingId(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100]"
            />
          )}
          {activeClaim && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white shadow-2xl border-l border-slate-200 z-[101] flex flex-col"
            >
              <div className="p-4 border-b border-slate-200 flex items-start justify-between bg-slate-50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider">Denied</span>
                    <span className="text-slate-500 text-xs">{activeClaim.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{activeClaim.clientName}</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {activeClaim.payer} • DOS: {activeClaim.dateOfService} • ${activeClaim.amount.toFixed(2)}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setInvestigatingId(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Denial Details */}
                <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
                  <h4 className="text-rose-800 font-semibold text-sm flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    Denial Reason: {activeClaim.reasonCode}
                  </h4>
                  <p className="text-rose-700 text-xs">{activeClaim.reasonDescription}</p>
                </div>

                {/* Cross-Reference View */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">Cross-Reference Data</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Claim Data */}
                    <div className="border border-slate-200 rounded-xl p-3 flex gap-3 bg-white">
                      <FileText className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase">Original Claim</div>
                        <div className="text-sm text-slate-900 mt-1">Billed: T1019 x 16 units</div>
                        <div className="text-xs text-slate-500">Submitted 2026-06-20</div>
                      </div>
                    </div>
                    {/* EVV Data */}
                    <div className="border border-slate-200 rounded-xl p-3 flex gap-3 bg-white">
                      <Activity className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase">EVV Record</div>
                        <div className="text-sm text-slate-900 mt-1">Clock In: 08:00 AM<br />Clock Out: 12:00 PM</div>
                        <div className="text-xs text-green-600 font-medium mt-1">GPS Verified</div>
                      </div>
                    </div>
                    {/* Auth Data */}
                    <div className="border border-slate-200 rounded-xl p-3 flex gap-3 bg-white">
                      <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase">Authorization</div>
                        <div className="text-sm text-slate-900 mt-1">AUTH-99214</div>
                        <div className="text-xs text-slate-500">Valid thru 2026-12-31</div>
                      </div>
                    </div>
                    {/* Visit Note */}
                    <div className="border border-slate-200 rounded-xl p-3 flex gap-3 bg-white">
                      <FileSignature className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase">Visit Note</div>
                        <div className="text-sm text-slate-900 mt-1">Signed by Caregiver & Client</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction(activeClaim.id, 'resubmit')}
                  className="flex-1 text-xs lg:text-sm bg-brand-teal hover:bg-brand-teal/90 text-white px-3 py-2 rounded-lg font-semibold transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 cursor-pointer"
                >
                  Correct & Resubmit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction(activeClaim.id, 'appeal')}
                  className="flex-1 text-xs lg:text-sm bg-white border-1 border-slate-300 hover:border-slate-400 text-slate-700 px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  File Appeal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction(activeClaim.id, 'writeoff')}
                  className="flex-1 md:w-auto text-xs lg:text-sm bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  Write Off...
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
