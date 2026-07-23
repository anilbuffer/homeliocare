"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Star,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";

export interface UnfilledShiftItem {
  id: string;
  patientName: string;
  patientAddress: string;
  timeWindow: string;
  requiredSkills: string[];
  unfilledDuration: string;
  region: string;
  suggestedCaregivers: {
    id: string;
    name: string;
    avatarUrl?: string;
    rating: number;
    distanceMiles: number;
    matchingSkills: string[];
  }[];
}

interface UnfilledShiftsQueueProps {
  shifts: UnfilledShiftItem[];
  onAssign: (shiftId: string, caregiverId: string, caregiverName: string) => void;
}

export function UnfilledShiftsQueue({ shifts: initialShifts, onAssign }: UnfilledShiftsQueueProps) {
  const [shifts, setShifts] = useState<UnfilledShiftItem[]>(initialShifts);
  const [assignedShiftIds, setAssignedShiftIds] = useState<Record<string, string>>({});

  const handleAssignCaregiver = (shiftId: string, caregiverId: string, caregiverName: string) => {
    // Instant feedback checkmark
    setAssignedShiftIds((prev) => ({ ...prev, [shiftId]: caregiverName }));

    setTimeout(() => {
      // Trigger parent callback
      onAssign(shiftId, caregiverId, caregiverName);
      // Remove from queue
      setShifts((prev) => prev.filter((s) => s.id !== shiftId));
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 mb-3.5 sm:mb-4">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold shrink-0">
            <AlertCircle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex flex-wrap items-center gap-2">
              <span>Today's Unfilled / At-Risk Shifts</span>
              <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 shrink-0">
                {shifts.length} Needs Attention
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">Action queue — match & assign in one click</p>
          </div>
        </div>
      </div>

      {shifts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center py-8 sm:py-10"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 mb-3">
            <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-emerald-900">All shifts covered — nice work!</h3>
          <p className="text-xs sm:text-sm text-emerald-700/80 mt-1 max-w-sm">
            There are no open or unassigned shifts requiring immediate attention today.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3.5 sm:space-y-4">
          <AnimatePresence>
            {shifts.map((shift) => {
              const isAssigned = !!assignedShiftIds[shift.id];

              return (
                <motion.div
                  key={shift.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className={clsx(
                    "border rounded-2xl p-3.5 sm:p-4 transition-all duration-300 relative overflow-hidden",
                    isAssigned
                      ? "border-emerald-300 bg-emerald-50/50"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                  )}
                >
                  {isAssigned && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-emerald-500/90 text-white backdrop-blur-xs flex items-center justify-center z-20 gap-2 font-bold text-sm px-4 text-center"
                    >
                      <CheckCircle2 className="w-5 h-5 animate-bounce shrink-0" />
                      <span>Assigned to {assignedShiftIds[shift.id]}!</span>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-center">
                    {/* Shift details */}
                    <div className="lg:col-span-5 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <span className="text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 flex items-center gap-1">
                          <Clock className="w-3 h-3 shrink-0" />
                          Unfilled for {shift.unfilledDuration}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-600 font-medium px-2 py-0.5 rounded-full bg-slate-200/60">
                          {shift.region}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">{shift.patientName}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                          <span className="truncate max-w-[260px] xs:max-w-none">{shift.patientAddress}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <div className="font-semibold text-slate-700 text-xs bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shrink-0">
                          🕒 {shift.timeWindow}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {shift.requiredSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-slate-200/80 text-slate-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Smart Match Panel */}
                    <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-3 lg:pt-0 lg:pl-5">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                        <span className="text-[11px] font-bold text-brand-teal uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          Smart-Match Caregivers
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-500">Ranked by proximity & skills</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {shift.suggestedCaregivers.slice(0, 2).map((cg) => (
                          <div
                            key={cg.id}
                            className="bg-white border border-slate-200/90 rounded-xl p-2.5 flex items-center justify-between hover:border-brand-teal/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all"
                          >
                            <div className="flex items-center gap-2 min-w-0 pr-1">
                              <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                {cg.name.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-slate-800 truncate">{cg.name}</div>
                                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500">
                                  <span className="flex items-center text-amber-500 font-semibold">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline mr-0.5" />
                                    {cg.rating}
                                  </span>
                                  <span>•</span>
                                  <span className="truncate">{cg.distanceMiles} mi away</span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleAssignCaregiver(shift.id, cg.id, cg.name)}
                              className="ml-1.5 px-3 sm:px-3.5 py-2 min-h-[36px] rounded-xl bg-brand-teal hover:bg-teal-600 text-white text-xs font-bold shadow-xs hover:shadow active:scale-95 transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1"
                              aria-label={`Assign ${cg.name} to ${shift.patientName}`}
                            >
                              <UserCheck className="w-3.5 h-3.5 shrink-0" />
                              <span>Assign</span>
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
