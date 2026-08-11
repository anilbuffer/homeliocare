"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Clock, CheckCircle2, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export interface EscalationItem {
  id: string;
  clientName: string;
  clientId: string;
  reporter: string;
  reporterRole: string;
  whatChanged: string;
  timeReported: string; // ISO string for sorting/aging
  type: "condition_change" | "reassessment_request" | "urgent_question";
}

const mockEscalations: EscalationItem[] = [
  {
    id: "esc-1",
    clientName: "Eleanor Ruth Whitfield",
    clientId: "c-1",
    reporter: "Maria Santos",
    reporterRole: "CNA",
    whatChanged: "BP elevated 160/95 over two consecutive readings, complaining of mild headache.",
    timeReported: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago (Escalated)
    type: "condition_change",
  },
  {
    id: "esc-2",
    clientName: "Arthur Pendelton",
    clientId: "c-2",
    reporter: "James O.",
    reporterRole: "Field Supervisor",
    whatChanged: "Family requested reassessment for increased weekend coverage after recent fall.",
    timeReported: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    type: "reassessment_request",
  },
  {
    id: "esc-3",
    clientName: "Margaret Chen",
    clientId: "c-1",
    reporter: "Sarah J.",
    reporterRole: "HHA",
    whatChanged: "Question regarding PRN medication instructions - Tylenol dosage clarification.",
    timeReported: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    type: "urgent_question",
  },
];

export function ClinicalEscalationQueue() {
  const [items, setItems] = useState<EscalationItem[]>(mockEscalations);

  const handleAcknowledge = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getUrgencyLevel = (timeReported: string) => {
    const hours = (Date.now() - new Date(timeReported).getTime()) / (1000 * 60 * 60);
    if (hours > 2) return "critical"; // Red
    if (hours > 1) return "warning"; // Amber
    return "normal"; // Blue/Teal
  };

  const getUrgencyStyles = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-rose-50 border-rose-200";
      case "warning":
        return "bg-amber-50 border-amber-200";
      default:
        return "bg-white border-slate-200 hover:border-slate-300";
    }
  };

  const getUrgencyTextStyles = (level: string) => {
    switch (level) {
      case "critical":
        return "text-rose-700";
      case "warning":
        return "text-amber-700";
      default:
        return "text-slate-500";
    }
  };

  const getUrgencyIconStyles = (level: string) => {
    switch (level) {
      case "critical":
        return "text-rose-600 bg-rose-100";
      case "warning":
        return "text-amber-600 bg-amber-100";
      default:
        return "text-blue-600 bg-blue-100";
    }
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-3 bg-rose-500/10 rounded-xl text-rose-500">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-medium text-text-primary">Clinical Escalation Queue</h3>
            <p className="text-xs font-normal text-text-secondary mt-0.5">Condition changes and urgent field reports</p>
          </div>
        </div>
        <div className="bg-rose-500/10 text-rose-500 font-normal text-xs px-2.5 py-1 rounded-full border border-rose-500/20">
          {items.length} Pending
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar min-h-0 -mx-4 sm:-mx-5 px-4 sm:px-5">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-40 text-slate-400"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
              <p className="text-sm font-medium text-slate-500">No pending escalations.</p>
              <p className="text-xs">Great work keeping the queue clear.</p>
            </motion.div>
          ) : (
            items.map((item) => {
              const urgency = getUrgencyLevel(item.timeReported);
              const isCritical = urgency === "critical";

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className={clsx(
                    "p-2 py-3 sm:p-3 rounded-xl border transition-all duration-300 relative overflow-hidden group",
                    getUrgencyStyles(urgency)
                  )}
                >
                  {isCritical && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 animate-pulse" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 ml-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Link href={`/clinical/patients/${item.clientId}`} className="font-bold text-sm text-slate-900 hover:text-brand-teal transition-colors">
                          {item.clientName}
                        </Link>
                        <span className="text-slate-300 text-xs">•</span>
                        <div className={clsx("flex items-center gap-1 text-[11px] font-medium", getUrgencyTextStyles(urgency))}>
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {new Date(item.timeReported).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-700 leading-snug mb-2 font-normal">
                        {item.whatChanged}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className={clsx("p-1 rounded bg-slate-100 flex items-center justify-center")}>
                          <User className="w-3 h-3 text-slate-400" />
                        </div>
                        <span className="font-medium text-slate-700">{item.reporter}</span>
                        <span className="text-slate-400">({item.reporterRole})</span>
                        <span className="px-1.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-500 ml-1">
                          {item.type.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center gap-2 sm:mt-0 mt-2 shrink-0 w-full sm:w-auto">
                      <button
                        onClick={() => handleAcknowledge(item.id)}
                        className="flex-1 sm:flex-none w-full sm:w-auto px-4 py-2 bg-brand-teal text-white border border-brand-teal/20 rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer hover:bg-brand-teal/90 shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Acknowledge</span>
                      </button>

                      <Link
                        href={`/clinical/patients/${item.clientId}`}
                        className="flex-1 sm:flex-none w-full sm:w-auto px-4 py-2 bg-white text-text-primary border border-slate-200 rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-1.5 hover:bg-slate-50 shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
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
