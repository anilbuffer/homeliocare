"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldAlert, FileText, Send, AlertOctagon, Sparkles } from "lucide-react";
import { ActionQueueItem } from "@/types/hr";
import clsx from "clsx";

interface HrActionQueueProps {
  initialItems: ActionQueueItem[];
  onOpenCandidateDetail?: (candidateId: string) => void;
}

export function HrActionQueue({ initialItems, onOpenCandidateDetail }: HrActionQueueProps) {
  const [items, setItems] = useState<ActionQueueItem[]>(initialItems);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAction = (item: ActionQueueItem) => {
    setCompletedIds(prev => [...prev, item.id]);
    setNotification(`Action completed for ${item.candidateOrCaregiverName}`);

    setTimeout(() => {
      setItems(prev => prev.filter(i => i.id !== item.id));
      setNotification(null);
    }, 600);

    if (item.relatedId && onOpenCandidateDetail) {
      onOpenCandidateDetail(item.relatedId);
    }
  };

  const getIcon = (category: ActionQueueItem["category"]) => {
    switch (category) {
      case "background_check":
        return <ShieldAlert className="w-4 h-4 text-blue-600" />;
      case "oig_sam":
        return <AlertOctagon className="w-4 h-4 text-red-600" />;
      case "offer_letter":
        return <Send className="w-4 h-4 text-emerald-600" />;
      case "onboarding":
      case "i9_w4":
        return <FileText className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-200 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse ring-4 ring-amber-500/20" />
          <h3 className="font-semibold text-slate-900 text-base tracking-tight">HR Urgent Action Queue</h3>
          <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {items.length} Pending
          </span>
        </div>
        <p className="text-xs text-slate-500 hidden sm:block font-medium">One-click immediate resolution queue</p>
      </div>

      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 border border-emerald-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
        >
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </motion.div>
      )}

      <div className="space-y-3">
        <AnimatePresence>
          {items.map((item) => {
            const isCompleted = completedIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  if (item.relatedId && onOpenCandidateDetail) {
                    onOpenCandidateDetail(item.relatedId);
                  }
                }}
                className={clsx(
                  "flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] cursor-pointer group",
                  isCompleted ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-slate-50/60 border-slate-200/80 hover:border-brand-teal/40 hover:bg-slate-50"
                )}
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <div className="mt-0.5 p-2.5 rounded-xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] shrink-0 group-hover:scale-105 transition-transform">
                    {getIcon(item.category)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900 text-sm tracking-tight group-hover:text-brand-teal transition-colors">{item.title}</span>
                      {item.priority === "urgent" && (
                        <span className="bg-red-100 text-red-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                          URGENT
                        </span>
                      )}
                      {item.priority === "high" && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                          HIGH
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(item);
                      }}
                      className={clsx(
                        "px-4 py-2 text-xs font-bold rounded-full transition-all active:scale-95 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center gap-1.5 cursor-pointer",
                        item.category === "oig_sam"
                          ? "bg-red-600 hover:bg-red-700 text-white shadow-red-200"
                          : item.category === "background_check"
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
                            : "bg-brand-teal hover:bg-brand-teal/90 text-white shadow-brand-teal/20"
                      )}
                    >
                      {item.actionLabel}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-slate-800 text-sm">Action Queue Clear!</p>
            <p className="text-xs text-slate-500 mt-0.5">All pending candidate and compliance items have been reviewed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
