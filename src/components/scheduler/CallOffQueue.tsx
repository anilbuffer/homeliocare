"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserX,
  Clock,
  AlertTriangle,
  Star,
  UserCheck,
  PlusCircle,
  CheckCircle2,
  PhoneOff,
} from "lucide-react";
import clsx from "clsx";

export interface CallOffItem {
  id: string;
  caregiverName: string;
  patientName: string;
  timeUntilStart: string;
  reason: string;
  calledOffAt: string;
  suggestedReplacements: {
    id: string;
    name: string;
    rating: number;
    distanceMiles: number;
    credentials: string[];
  }[];
}

const defaultCallOffs: CallOffItem[] = [
  {
    id: "co-1",
    caregiverName: "Albert Wright",
    patientName: "Dorothy Vance",
    timeUntilStart: "1h 45m",
    reason: "Vehicle trouble on Highway 278",
    calledOffAt: "10 mins ago",
    suggestedReplacements: [
      { id: "c3", name: "Maria Alvarez", rating: 4.9, distanceMiles: 1.2, credentials: ["HHA", "Dementia"] },
      { id: "c5", name: "Priya Shah", rating: 4.6, distanceMiles: 2.0, credentials: ["HHA", "Post-op"] },
    ],
  },
  {
    id: "co-2",
    caregiverName: "George Patel",
    patientName: "Frank Delaney",
    timeUntilStart: "3h 10m",
    reason: "Sudden illness / Fever",
    calledOffAt: "25 mins ago",
    suggestedReplacements: [
      { id: "c8", name: "Robert Chen", rating: 4.7, distanceMiles: 1.5, credentials: ["CNA"] },
      { id: "c4", name: "James Okafor", rating: 4.7, distanceMiles: 3.1, credentials: ["CNA", "Diabetes"] },
    ],
  },
];

interface CallOffQueueProps {
  onReassign: (callOffId: string, replacementId: string, replacementName: string) => void;
}

export function CallOffQueue({ onReassign }: CallOffQueueProps) {
  const [callOffs, setCallOffs] = useState<CallOffItem[]>(defaultCallOffs);
  const [reassignedItems, setReassignedItems] = useState<Record<string, string>>({});
  const [isSimulating, setIsSimulating] = useState(false);

  const handleReassign = (callOffId: string, replacementId: string, replacementName: string) => {
    setReassignedItems((prev) => ({ ...prev, [callOffId]: replacementName }));

    setTimeout(() => {
      onReassign(callOffId, replacementId, replacementName);
      setCallOffs((prev) => prev.filter((co) => co.id !== callOffId));
    }, 600);
  };

  const handleSimulateCallOff = () => {
    setIsSimulating(true);
    const newId = `co-${Date.now()}`;
    const sampleNames = ["David Miller", "Elena Rostova", "Marcus Vance"];
    const samplePatients = ["Arthur Pendelton", "Grace Hopper", "Walter White"];
    const sampleReasons = ["Family Emergency", "Childcare Conflict", "Transit Delay"];

    const randomIndex = Math.floor(Math.random() * sampleNames.length);

    const newCallOff: CallOffItem = {
      id: newId,
      caregiverName: sampleNames[randomIndex],
      patientName: samplePatients[randomIndex],
      timeUntilStart: "2h 15m",
      reason: sampleReasons[randomIndex],
      calledOffAt: "Just now",
      suggestedReplacements: [
        { id: "c9", name: "Eleanor Whitaker", rating: 4.9, distanceMiles: 1.8, credentials: ["HHA", "Dementia"] },
        { id: "c2", name: "George Patel", rating: 4.5, distanceMiles: 2.4, credentials: ["CNA"] },
      ],
    };

    setTimeout(() => {
      setCallOffs((prev) => [newCallOff, ...prev]);
      setIsSimulating(false);
    }, 300);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 sm:mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0">
            <PhoneOff className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex flex-wrap items-center gap-2">
              <span>Call-Off Queue</span>
              <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700 shrink-0">
                Real-time
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">Instant replacement dispatch for active call-offs</p>
          </div>
        </div>
        <button
          onClick={handleSimulateCallOff}
          disabled={isSimulating}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[36px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 active:scale-95 transition-all cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
        >
          <PlusCircle className="w-3.5 h-3.5 text-brand-teal shrink-0" />
          <span>Simulate Call-Off</span>
        </button>
      </div>
      {callOffs.length === 0 ? (
        <div className="border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-sm">
          No open call-offs pending reassignment right now.
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-3.5">
          <AnimatePresence initial={false}>
            {callOffs.map((co) => {
              const isReassigned = !!reassignedItems[co.id];

              return (
                <motion.div
                  key={co.id}
                  layout
                  initial={{ opacity: 0, y: -20, backgroundColor: "#FEF2F2" }}
                  animate={{ opacity: 1, y: 0, backgroundColor: "#FFFFFF" }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.5 }}
                  className={clsx(
                    "border rounded-2xl p-3.5 sm:p-4 transition-all relative overflow-hidden",
                    isReassigned
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-red-200 bg-red-50 hover:border-red-300"
                  )}
                >
                  {isReassigned && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-emerald-500/90 text-white backdrop-blur-xs flex items-center justify-center z-20 gap-2 font-bold text-sm px-4 text-center"
                    >
                      <CheckCircle2 className="w-5 h-5 animate-bounce shrink-0" />
                      <span>Reassigned to {reassignedItems[co.id]}!</span>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-center">
                    {/* Call-Off Info */}
                    <div className="lg:col-span-5 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <span className="text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 flex items-center gap-1">
                          <Clock className="w-3 h-3 shrink-0" />
                          Starts in {co.timeUntilStart}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-400 font-medium">{co.calledOffAt}</span>
                      </div>

                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 flex flex-wrap items-center gap-1.5">
                          <span className="line-through text-slate-400">{co.caregiverName}</span>
                          <span className="text-xs font-normal text-slate-500">called off for</span>
                          <span className="text-brand-teal font-bold">{co.patientName}</span>
                        </div>
                        <div className="text-xs text-red-600 font-medium mt-0.5 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />
                          <span className="truncate">Reason: {co.reason}</span>
                        </div>
                      </div>
                    </div>

                    {/* Replacements */}
                    <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-3 lg:pt-0 lg:pl-4">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                        Suggested Quick Replacements
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {co.suggestedReplacements.map((rep) => (
                          <div
                            key={rep.id}
                            className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between hover:bg-white hover:border-brand-teal/40 transition-all"
                          >
                            <div className="min-w-0 pr-1">
                              <div className="text-xs font-bold text-slate-800 truncate">{rep.name}</div>
                              <div className="text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1">
                                <span className="text-amber-500 font-semibold flex items-center">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                                  {rep.rating}
                                </span>
                                <span>•</span>
                                <span>{rep.distanceMiles} mi</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleReassign(co.id, rep.id, rep.name)}
                              className="px-3 py-2 min-h-[36px] rounded-xl bg-brand-teal hover:bg-teal-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <UserCheck className="w-3.5 h-3.5 shrink-0" />
                              <span>Reassign</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
