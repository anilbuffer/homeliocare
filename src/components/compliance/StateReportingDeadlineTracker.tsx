"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { StateDeadlineIncident } from "@/lib/mock-data/compliance-dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Props {
  deadlines: StateDeadlineIncident[];
}

export function StateReportingDeadlineTracker({ deadlines: initialDeadlines }: Props) {
  const [deadlines, setDeadlines] = useState(initialDeadlines);

  const handleAction = (id: string) => {
    setDeadlines(prev => prev.filter(d => d.id !== id));
    toast.success(`State report for ${id} marked as submitted`);
  };

  return (
    <div className="bg-white rounded-2xl px-4 py-3 border border-amber-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden h-auto lg:h-full flex flex-col">
      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            State Reporting Deadlines
          </h3>
          <p className="text-xs text-slate-500 font-normal mt-0.5">Mandatory reporting countdowns for serious incidents.</p>
        </div>
        <span className="bg-amber-50 text-amber-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
          {deadlines.length} Pending
        </span>
      </div>
      <div className="flex-1 overflow-visible lg:overflow-auto mt-3 pr-1 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        <AnimatePresence>
          {deadlines.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center flex flex-col items-center justify-center text-slate-500 h-full"
            >
              <CheckCircle className="w-12 h-12 text-emerald-400 mb-3" />
              <p className="text-sm font-semibold text-slate-700">No Pending Deadlines</p>
              <p className="text-xs mt-1">All state reports have been submitted.</p>
            </motion.div>
          ) : (
            deadlines.map((deadline) => {
              const isCritical = deadline.deadlineMinutes < 24 * 60; // less than 24 hours
              const hours = Math.floor(deadline.deadlineMinutes / 60);
              const isOverdue = deadline.deadlineMinutes < 0;

              return (
                <motion.div
                  key={deadline.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className={`px-4 py-3 rounded-xl border transition-colors group ${isOverdue ? 'bg-rose-50 border-rose-200' : isCritical ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${isOverdue ? 'bg-rose-600' : isCritical ? 'bg-amber-500' : 'bg-slate-500'
                        }`}>
                        {deadline.id}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 line-clamp-1">{deadline.title}</span>
                    </div>
                    {isOverdue ? (
                      <div className="flex items-center text-xs font-semibold text-rose-600 bg-rose-100 px-2 py-1 rounded-full border border-rose-300 animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        OVERDUE
                      </div>
                    ) : (
                      <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full border ${isCritical ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-amber-600 bg-amber-50 border-amber-200'
                        }`}>
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {hours}h remaining
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mb-2">
                    Assigned to: <span className="font-medium text-slate-900">{deadline.assignedTo}</span>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleAction(deadline.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-brand-teal rounded-full hover:bg-brand-teal/90 transition-colors cursor-pointer flex items-center gap-1 active:scale-95"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Mark Submitted
                    </button>
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
