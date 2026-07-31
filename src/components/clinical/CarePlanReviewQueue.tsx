"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, FileText, CalendarDays, AlertTriangle, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export interface CarePlanReview {
  id: string;
  clientName: string;
  clientId: string;
  dueDate: string; // ISO String
  triggerReason: "periodic_60" | "post_hospitalization" | "condition_change" | "incident" | "family_request";
  status: "approaching" | "overdue";
}

const mockReviews: CarePlanReview[] = [
  {
    id: "cp-1",
    clientName: "Eleanor Vance",
    clientId: "c-1",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days overdue
    triggerReason: "periodic_60",
    status: "overdue",
  },
  {
    id: "cp-2",
    clientName: "Arthur Pendelton",
    clientId: "c-2",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days from now
    triggerReason: "post_hospitalization",
    status: "approaching",
  },
  {
    id: "cp-3",
    clientName: "Margaret Chen",
    clientId: "c-1",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days from now
    triggerReason: "periodic_60",
    status: "approaching",
  },
];

export function CarePlanReviewQueue() {
  const [items, setItems] = useState<CarePlanReview[]>(mockReviews);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleStartReview = (id: string) => {
    // In a real app, this might open a modal or navigate to a pre-filled form.
    // For now, we'll just remove it from the queue for success feedback.
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [items, sortOrder]);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "overdue":
        return "bg-rose-50 border-rose-200";
      case "approaching":
        return "bg-amber-50 border-amber-200";
      default:
        return "bg-white border-slate-200";
    }
  };

  const formatTriggerReason = (reason: string) => {
    switch (reason) {
      case "periodic_60": return "60-Day Periodic Review";
      case "post_hospitalization": return "Post-Hospitalization";
      case "condition_change": return "Condition Change";
      case "incident": return "Incident Triggered";
      case "family_request": return "Family Request";
      default: return reason;
    }
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-3 bg-amber-100 rounded-xl text-amber-500">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-medium text-text-primary">Care Plan Review Queue</h3>
            <p className="text-xs font-normal text-text-secondary mt-0.5">Upcoming and overdue plan renewals</p>
          </div>
        </div>
        <button
          onClick={toggleSort}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          Sort by Date
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar min-h-0 -mx-4 sm:-mx-5 px-4 sm:px-5">
        <AnimatePresence mode="popLayout">
          {sortedItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-40 text-slate-400"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
              <p className="text-sm font-medium text-slate-500">No care plans due for review.</p>
              <p className="text-xs">All plans are up to date.</p>
            </motion.div>
          ) : (
            sortedItems.map((item) => {
              const isOverdue = item.status === "overdue";

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className={clsx(
                    "p-3 sm:p-4 rounded-xl border transition-all duration-300 relative group",
                    getStatusStyles(item.status)
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ml-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Link href={`/clinical/patients/${item.clientId}`} className="font-semibold text-sm text-slate-900 hover:text-brand-teal transition-colors truncate">
                          {item.clientName}
                        </Link>
                        {isOverdue && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-[10px] font-semibold text-rose-600 shrink-0">
                            <AlertTriangle className="w-3 h-3" />
                            Overdue
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <div className={clsx(
                          "flex items-center gap-1.5 font-normal",
                          isOverdue ? "text-rose-600" : "text-amber-600"
                        )}>
                          <CalendarDays className="w-3.5 h-3.5" />
                          <span>
                            Due: {new Date(item.dueDate).toLocaleDateString('en-US')}
                          </span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <div className="text-slate-600 font-normal">
                          Trigger: {formatTriggerReason(item.triggerReason)}
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 w-full sm:w-auto mt-3 sm:mt-0">
                      <button
                        onClick={() => handleStartReview(item.id)}
                        className="w-full sm:w-auto px-4 py-2 bg-brand-teal text-xs text-white border border-brand-teal/20 rounded-full font-normal transition-colors flex items-center justify-center gap-1.5 cursor-pointer hover:bg-brand-teal/90 shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20"
                      >
                        <span>Start Review</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
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
