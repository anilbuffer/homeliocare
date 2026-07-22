"use client";

import React, { useState } from "react";
import { Check, Pill, AlertCircle, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CaregiverTask, MedicationReminder } from "@/lib/caregiver/caregiverPortalData";

interface VisitTaskChecklistProps {
  clientName: string;
  tasks: CaregiverTask[];
  medications: MedicationReminder[];
  onToggleTask: (taskId: string) => void;
  onSkipTaskReason: (taskId: string, reason: string) => void;
  onLogMedication: (medId: string, status: "reminded" | "took" | "declined" | "pending") => void;
}

export function VisitTaskChecklist({
  clientName,
  tasks,
  medications,
  onToggleTask,
  onSkipTaskReason,
  onLogMedication,
}: VisitTaskChecklistProps) {
  const [activeTab, setActiveTab] = useState<"all" | "meds">("all");
  const [openSkipDropdownId, setOpenSkipDropdownId] = useState<string | null>(null);

  const categories = Array.from(new Set(tasks.map((t) => t.category)));
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:border-brand-teal/30 transition-all duration-300 p-6 space-y-6">
      {/* Header & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            Care Plan Visit Checklist
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Authored tasks from {clientName}&apos;s Care Plan Builder
          </p>
        </div>

        <div className="w-full sm:w-64">
          <div className="flex justify-between items-center text-xs font-semibold mb-1">
            <span className="text-gray-700">Completion Progress</span>
            <span className="text-brand-teal font-bold">{completedCount} of {tasks.length} ({progressPercent}%)</span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-teal rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Inline Medication Reminders Banner / Card */}
      {medications && medications.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Pill className="w-4 h-4 text-blue-600" />
              <span>Inline Medication Reminders (Observe & Prompt)</span>
            </div>
            <span className="text-[11px] font-medium text-blue-700 bg-white/80 px-2 py-0.5 rounded-full border border-blue-200">
              Non-Licensed Prompting Scope
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {medications.map((med) => (
              <div
                key={med.id}
                className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-xs flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900">{med.medicationName} ({med.dosage})</span>
                    <span className="text-[10px] font-mono font-semibold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                      Due {med.scheduleTime}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Remind {clientName} — {med.instructions}
                  </p>
                </div>

                {/* Log Buttons */}
                <div className="flex items-center gap-1.5 pt-1">
                  {med.status === "pending" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onLogMedication(med.id, "took")}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-brand-teal hover:bg-brand-teal/90 text-white text-[11px] font-bold shadow-xs transition-colors"
                      >
                        Client Took It ✓
                      </button>
                      <button
                        type="button"
                        onClick={() => onLogMedication(med.id, "reminded")}
                        className="py-1.5 px-2.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 text-[11px] font-semibold transition-colors"
                      >
                        Reminded ✓
                      </button>
                      <button
                        type="button"
                        onClick={() => onLogMedication(med.id, "declined")}
                        className="py-1.5 px-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-semibold border border-rose-200 transition-colors"
                      >
                        Declined
                      </button>
                    </>
                  ) : (
                    <div className="w-full flex items-center justify-between p-1.5 rounded-lg bg-gray-50 text-[11px] font-semibold text-gray-800">
                      <span className="capitalize text-brand-teal flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Status: Logged as {med.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => onLogMedication(med.id, "pending")}
                        className="text-gray-400 hover:text-gray-600 underline text-[10px]"
                      >
                        Undo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Checklist Grouped Grid */}
      <div className="space-y-6">
        {categories.map((cat) => {
          const categoryTasks = tasks.filter((t) => t.category === cat);

          return (
            <div key={cat} className="space-y-3">
              <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-teal" />
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">{cat}</h4>
                <span className="text-xs text-gray-400 font-normal">
                  ({categoryTasks.filter((t) => t.completed).length}/{categoryTasks.length})
                </span>
              </div>

              {/* 2-Column Grid on Desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {categoryTasks.map((t) => (
                  <div
                    key={t.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 relative ${t.completed
                      ? "bg-emerald-50/50 border-emerald-200"
                      : t.skipped
                        ? "bg-amber-50/40 border-amber-200"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                      }`}
                  >
                    {/* Animated Checkbox Button */}
                    <button
                      type="button"
                      onClick={() => onToggleTask(t.id)}
                      className={`w-5 h-5 rounded-md shrink-0 mt-0.5 border flex items-center justify-center transition-all ${t.completed
                        ? "bg-brand-teal border-brand-teal text-white shadow-xs"
                        : "border-gray-300 hover:border-brand-teal bg-white"
                        }`}
                    >
                      {t.completed && (
                        <motion.svg
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-3.5 h-3.5 stroke-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </motion.svg>
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-semibold transition-colors ${t.completed ? "line-through text-gray-400" : "text-gray-900"
                            }`}
                        >
                          {t.title}
                        </span>

                        {/* Inline Skip Reason Selector */}
                        {!t.completed && (
                          <div className="relative shrink-0">
                            <button
                              type="button"
                              onClick={() => setOpenSkipDropdownId(openSkipDropdownId === t.id ? null : t.id)}
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-md border flex items-center gap-1 transition-colors ${t.skipped
                                ? "bg-amber-100 text-amber-900 border-amber-300"
                                : "bg-gray-50 text-gray-500 hover:bg-gray-100 border-gray-200"
                                }`}
                            >
                              <span>{t.skipped ? `Skipped: ${t.skipReason}` : "Skip..."}</span>
                              <ChevronDown className="w-3 h-3" />
                            </button>

                            <AnimatePresence>
                              {openSkipDropdownId === t.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 z-30 p-1 space-y-1 text-xs"
                                >
                                  <div className="px-2 py-1 font-bold text-[10px] text-gray-400 uppercase">
                                    Reason for Skipping
                                  </div>
                                  {["Client declined", "N/A today", "Ran out of time", "Client sleeping"].map((r) => (
                                    <button
                                      key={r}
                                      type="button"
                                      onClick={() => {
                                        onSkipTaskReason(t.id, r);
                                        setOpenSkipDropdownId(null);
                                      }}
                                      className="w-full text-left px-2.5 py-1.5 hover:bg-amber-50 rounded-lg text-gray-700 hover:text-amber-900 font-medium transition-colors"
                                    >
                                      {r}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>

                      {t.description && (
                        <p className="text-xs text-gray-500 mt-1 leading-snug">{t.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
