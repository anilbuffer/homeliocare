"use client";

import React, { useState } from "react";
import { mockChecklists, AuditType, ChecklistItem } from "./mockData";
import { CheckCircle2, AlertCircle, MessageSquare, Save } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  activeTab: AuditType;
}

export function AuditChecklist({ activeTab }: Props) {
  const [items, setItems] = useState<ChecklistItem[]>(mockChecklists[activeTab] || []);
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});

  // Reset items when tab changes
  React.useEffect(() => {
    setItems(mockChecklists[activeTab] || []);
    setShowComments({});
  }, [activeTab]);

  const handleStatusChange = (id: string, status: ChecklistItem['status']) => {
    setItems(items.map(item => item.id === id ? { ...item, status } : item));
    if (status === 'Fail') {
      setShowComments(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleCommentChange = (id: string, comment: string) => {
    setItems(items.map(item => item.id === id ? { ...item, comment } : item));
  };

  const toggleComment = (id: string) => {
    setShowComments(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Auto-calculated score
  const scoreableItems = items.filter(i => i.status === 'Pass' || i.status === 'Fail');
  const passItems = items.filter(i => i.status === 'Pass');
  const score = scoreableItems.length > 0 ? Math.round((passItems.length / scoreableItems.length) * 100) : 0;

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-subtle">
        <div>
          <h3 className="text-lg font-medium text-text-primary">{activeTab} Checklist</h3>
          <p className="text-xs text-text-secondary mt-1">Complete all items to finalize audit</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-brand-teal tabular-nums">{score}%</div>
            <div className="text-xs text-text-secondary font-medium">Current Score</div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-xl transition-colors font-medium text-sm">
            <Save className="w-4 h-4" />
            Save Draft
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-100/50 [&::-webkit-scrollbar-thumb]:rounded-full">
        {items.map((item) => (
          <div key={item.id} className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-teal/30 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 text-sm text-slate-700 leading-relaxed font-medium">
                {item.question}
              </div>
              <div className="flex items-center gap-1 shrink-0 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => handleStatusChange(item.id, 'Pass')}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 relative overflow-hidden",
                    item.status === 'Pass' ? "bg-white shadow-sm text-emerald-600 ring-1 ring-emerald-500/20" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {item.status === 'Pass' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 className="w-3 h-3" />
                      </motion.div>
                    )}
                    Pass
                  </span>
                </button>
                <button
                  onClick={() => handleStatusChange(item.id, 'Fail')}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 relative",
                    item.status === 'Fail' ? "bg-white shadow-sm text-red-600 ring-1 ring-red-500/20" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {item.status === 'Fail' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <AlertCircle className="w-3 h-3" />
                      </motion.div>
                    )}
                    Fail
                  </span>
                </button>
                <button
                  onClick={() => handleStatusChange(item.id, 'N-A')}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
                    item.status === 'N-A' ? "bg-white shadow-sm text-slate-700 ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                  )}
                >
                  N/A
                </button>
              </div>
            </div>

            {/* Findings Flag Warning */}
            <AnimatePresence>
              {item.status === 'Fail' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-3 py-2 rounded-lg text-sm border border-red-400/20">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    This will automatically generate a Finding and require a Corrective Action.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => toggleComment(item.id)}
                className="flex items-center gap-1.5 text-xs text-brand-teal hover:text-brand-teal-hover transition-colors font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                {showComments[item.id] ? "Hide Comment" : (item.comment ? "Edit Comment" : "Add Comment")}
              </button>
            </div>

            <AnimatePresence>
              {showComments[item.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <textarea
                    value={item.comment || ""}
                    onChange={(e) => handleCommentChange(item.id, e.target.value)}
                    placeholder="Enter audit notes or finding details here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 min-h-[80px] resize-y transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
