"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, FileWarning, CheckCircle2, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export interface IncidentReview {
  id: string;
  clientName: string;
  clientId: string;
  reporter: string;
  dateReported: string;
  type: "fall" | "medication_error" | "medical_emergency" | "elopement" | "abuse" | "neglect" | "hipaa_breach";
  isRestricted: boolean;
  status: "pending_review" | "followup_required";
  summary: string;
}

const mockIncidents: IncidentReview[] = [
  {
    id: "inc-1",
    clientName: "Arthur Pendelton",
    clientId: "c-2",
    reporter: "Maria Santos",
    dateReported: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    type: "neglect",
    isRestricted: true,
    status: "pending_review",
    summary: "Suspicion of neglect from family member observed during weekend visit. Requires immediate state reporting determination.",
  },
  {
    id: "inc-2",
    clientName: "Eleanor Whitfield",
    clientId: "c-1",
    reporter: "James O.",
    dateReported: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    type: "fall",
    isRestricted: false,
    status: "followup_required",
    summary: "Unwitnessed fall in bathroom, no obvious injuries. Vitals stable. Follow-up required for care plan update.",
  },
  {
    id: "inc-3",
    clientName: "Margaret Chen",
    clientId: "c-1",
    reporter: "Sarah J.",
    dateReported: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    type: "medication_error",
    isRestricted: false,
    status: "pending_review",
    summary: "Missed morning dose of Lisinopril due to pharmacy delivery delay.",
  }
];

export function IncidentReviewQueue() {
  const [items, setItems] = useState<IncidentReview[]>(mockIncidents);

  const handleSignOff = (id: string, isRestricted: boolean) => {
    if (isRestricted) {
      // In a real app, this would open a modal to document follow-up actions before closing.
      alert("Restricted incidents require documented follow-up action and confirmation of state notification (if applicable) before closing.");
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const formatType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
            <FileWarning className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-medium text-text-primary">Incident Review Queue</h3>
            <p className="text-xs font-medium text-text-secondary mt-0.5">Clinical sign-off and follow-up determinations</p>
          </div>
        </div>
        <Link
          href="/clinical/incidents"
          className="text-xs font-semibold text-brand-teal hover:text-teal-700 transition-colors"
        >
          View All Incidents
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar min-h-0 -mx-4 sm:-mx-5 px-4">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-40 text-slate-400"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
              <p className="text-sm font-medium text-slate-500">No pending incidents.</p>
            </motion.div>
          ) : (
            // Sort to ensure restricted incidents are always at the top
            [...items].sort((a, b) => (a.isRestricted === b.isRestricted ? 0 : a.isRestricted ? -1 : 1)).map((item) => {

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className={clsx(
                    "p-2 sm:py-3 sm:px-4 rounded-xl border transition-all duration-300 relative group overflow-hidden",
                    item.isRestricted
                      ? "bg-rose-50 border-rose-300 shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  )}
                >
                  {item.isRestricted && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-600 rounded-l-xl" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 ml-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Link href={`/clinical/patients/${item.clientId}`} className="font-semibold text-sm text-slate-900 hover:text-brand-teal transition-colors">
                          {item.clientName}
                        </Link>

                        <span className={clsx(
                          "px-1.5 py-0.5 rounded-full text-[10px] font-medium border",
                          item.isRestricted
                            ? "bg-rose-100 text-rose-700 border-rose-200"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                        )}>
                          {formatType(item.type)}
                        </span>
                        {item.isRestricted && (
                          <span className="flex items-center gap-1 text-[10px] font-semibold uppercase text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded-full border border-rose-200 ml-auto sm:ml-0">
                            <AlertTriangle className="w-3 h-3" />
                            RESTRICTED
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-700 leading-snug mb-2">
                        {item.summary}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {item.reporter}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>
                          Reported: {new Date(item.dateReported).toLocaleDateString('en-US')}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                      <button
                        onClick={() => handleSignOff(item.id, item.isRestricted)}
                        className={clsx(
                          "flex-1 sm:flex-none w-full sm:w-auto px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_6px_32px_rgba(0,0,0,0.06)]",
                          item.isRestricted
                            ? "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20"
                            : "bg-brand-teal text-white hover:bg-brand-teal/90 shadow-brand-teal/20"
                        )}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{item.isRestricted ? "Document Action" : "Sign Off"}</span>
                      </button>

                      <Link
                        href={`/clinical/incidents`}
                        className="flex-1 sm:flex-none w-full sm:w-auto px-3 py-1.5 bg-white text-text-primary border border-slate-200 rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-1.5 hover:bg-slate-50 shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                      >
                        <span>Review</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
