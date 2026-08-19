import React from "react";
import { X, MapPin, User, FileText, CheckCircle2, ShieldAlert, Clock, Key } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { SchedulerPatient } from "@/types/scheduler";

interface PatientDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  patient: SchedulerPatient | null;
  onEdit?: () => void;
  onSchedule?: () => void;
}

export function PatientDetailsDrawer({ isOpen, onClose, patient, onEdit, onSchedule }: PatientDetailsDrawerProps) {
  if (!patient) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={clsx(
                    "px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider",
                    patient.status === "Admitted" ? "bg-emerald-100 text-emerald-700" :
                      patient.status === "Pending" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-700"
                  )}>
                    {patient.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">ID: {patient.id}</span>
                </div>
                <h2 className="text-base font-semibold text-slate-900">{patient.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1 text-[11px] font-semibold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> Scheduled Hours
                  </div>
                  <div className="font-semibold text-slate-900 text-sm flex items-end gap-1">
                    {patient.scheduledHours} <span className="text-xs text-slate-500 font-medium">/ {patient.authorizedHours}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1 mt-2">
                    <div
                      className={`h-1 rounded-full ${patient.scheduledHours < patient.authorizedHours ? 'bg-amber-400' : 'bg-brand-teal'}`}
                      style={{ width: `${Math.min(100, (patient.scheduledHours / patient.authorizedHours) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1 text-[11px] font-semibold uppercase tracking-wider">
                    <User className="w-3.5 h-3.5" /> Primary Caregiver
                  </div>
                  <div className={clsx("font-semibold text-sm", patient.primaryCaregiver ? "text-slate-900" : "text-red-500 italic")}>
                    {patient.primaryCaregiver || "Unassigned"}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-teal" /> Location & Access
                </h3>
                <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-3">
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Address</div>
                    <div className="text-sm font-medium text-slate-700 leading-relaxed">{patient.address}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Access Instructions</div>
                    <div className="flex items-start gap-2 bg-amber-50 text-amber-800 text-xs px-3 py-2 rounded-lg border border-amber-100 mt-1">
                      <Key className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="font-medium">{patient.accessInstructions}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-teal" /> Care Requirements
                </h3>
                <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {patient.requiredSkills.map(skill => (
                      <span key={skill} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                        {skill}
                      </span>
                    ))}
                    {patient.requiredSkills.length === 0 && (
                      <span className="text-slate-400 text-xs italic">No specific skills listed</span>
                    )}
                  </div>

                  {patient.riskFlags.length > 0 && (
                    <div className="border-t border-slate-100 pt-3 mt-3">
                      <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-2">Risk Flags</div>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        {patient.riskFlags.map(flag => (
                          <div key={flag} className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2 py-1 rounded-lg border border-red-100">
                            <ShieldAlert className="w-3.5 h-3.5" /> {flag}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(onEdit || onSchedule) && (
              <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex gap-3">
                {onEdit && (
                  <button
                    onClick={() => onEdit()}
                    className="flex-1 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-slate-50 transition-colors"
                  >
                    Edit Details
                  </button>
                )}
                {onSchedule && (
                  <button
                    onClick={() => onSchedule()}
                    className="flex-1 py-2.5 rounded-xl bg-brand-teal text-white text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-brand-teal/20 hover:bg-teal-600 transition-colors"
                  >
                    Schedule Visit
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
