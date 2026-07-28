"use client";

import React, { useState } from "react";
import { AlertTriangle, FileWarning, CheckCircle2, ArrowRight, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Link from "next/link";
import { toast } from "sonner";

interface VisitRecord {
  id: string;
  clientName: string;
  dateOfService: string;
  amount: number;
  status: "CLEAN" | "BLOCKED";
  blockerReason?: string;
  blockerLink?: string;
}

const mockVisits: VisitRecord[] = [
  { id: "VIS-10492", clientName: "Mary Smith", dateOfService: "2026-07-26", amount: 145.00, status: "CLEAN" },
  { id: "VIS-10493", clientName: "Robert Chen", dateOfService: "2026-07-26", amount: 280.00, status: "CLEAN" },
  { id: "VIS-10494", clientName: "Eleanor Vance", dateOfService: "2026-07-25", amount: 210.00, status: "BLOCKED", blockerReason: "EVV exception unresolved", blockerLink: "/evv-monitoring" },
  { id: "VIS-10495", clientName: "Sarah Jenkins", dateOfService: "2026-07-25", amount: 180.00, status: "BLOCKED", blockerReason: "Missing authorization units", blockerLink: "/billing/authorizations" },
  { id: "VIS-10496", clientName: "James Wilson", dateOfService: "2026-07-24", amount: 320.00, status: "BLOCKED", blockerReason: "Signature missing", blockerLink: "/quality-assurance" },
];

export function PreBillingScrubQueue() {
  const [visits, setVisits] = useState<VisitRecord[]>(mockVisits);

  const handleSubmit = (id: string) => {
    // In a real app, make API call to submit claim
    setVisits((prev) => prev.filter((v) => v.id !== id));
    toast.success(`Claim ${id} submitted successfully.`);
  };

  const cleanCount = visits.filter(v => v.status === "CLEAN").length;
  const blockedCount = visits.filter(v => v.status === "BLOCKED").length;

  if (visits.length === 0) {
    return (
      <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
        <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-brand-teal" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Queue Cleared</h3>
        <p className="text-slate-500 mt-2">All visits have been scrubbed and submitted.</p>
      </div>
    );
  }

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            Pre-Billing Scrub Queue
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {cleanCount} ready to bill • {blockedCount} blocked
          </p>
        </div>
        {cleanCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-teal hover:bg-brand-teal/90 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-brand-teal/20 transition-all"
            onClick={() => {
              // Submit all clean
              setVisits(prev => prev.filter(v => v.status !== "CLEAN"));
              toast.success(`Successfully submitted ${cleanCount} clean claims.`);
            }}
          >
            Submit All Clean ({cleanCount})
          </motion.button>
        )}
      </div>

      <div className="divide-y divide-slate-200">
        <AnimatePresence initial={false}>
          {visits.map((visit) => (
            <motion.div
              key={visit.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                "px-4 py-2 hover:bg-slate-100 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4",
                visit.status === "BLOCKED" ? "bg-rose-100" : ""
              )}
            >
              <div className="flex items-start gap-4">
                <div className={clsx(
                  "p-2 rounded-xl shrink-0 mt-0.5",
                  visit.status === "CLEAN" ? "bg-teal-100 text-brand-teal" : "bg-rose-100 text-rose-600"
                )}>
                  {visit.status === "CLEAN" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <ShieldAlert className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">{visit.clientName}</span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-slate-600 text-xs">{visit.dateOfService}</span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="font-semibold text-sm text-slate-700">${visit.amount.toFixed(2)}</span>
                  </div>
                  <div className="mt-0.5">
                    {visit.status === "CLEAN" ? (
                      <span className="text-xs font-semibold text-brand-teal bg-teal-50 px-2.5 py-1 rounded-full">
                        Clean & Ready
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit">
                        Blocked: {visit.blockerReason}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center shrink-0">
                {visit.status === "CLEAN" ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubmit(visit.id)}
                    className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                  >
                    Submit Claim
                  </motion.button>
                ) : (
                  <Link
                    href={visit.blockerLink || "#"}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-700 hover:text-rose-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                  >
                    Fix Issue
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
