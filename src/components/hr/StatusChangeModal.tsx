"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UserX,
  UserCheck,
  UserMinus,
  Calendar,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  PauseCircle,
  FileText,
  Sparkles,
  ArrowRight
} from "lucide-react";
import clsx from "clsx";

interface StatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
  currentStatus: string;
  onConfirmStatusChange: (
    newStatus: "Active" | "Leave of Absence" | "Terminated",
    reasonCode: string,
    effectiveDate: string
  ) => void;
}

export function StatusChangeModal({
  isOpen,
  onClose,
  caregiverName,
  currentStatus,
  onConfirmStatusChange,
}: StatusChangeModalProps) {
  const [targetStatus, setTargetStatus] = useState<
    "Active" | "Leave of Absence" | "Terminated"
  >("Leave of Absence");
  const [reasonCode, setReasonCode] = useState("Personal Leave");
  const [effectiveDate, setEffectiveDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  if (!isOpen) return null;

  const handleStatusSelect = (status: "Active" | "Leave of Absence" | "Terminated") => {
    setTargetStatus(status);
    if (status === "Terminated") {
      setReasonCode("Voluntary - Relocation / Moving");
    } else if (status === "Active") {
      setReasonCode("Scheduled Return to Duty");
    } else {
      setReasonCode("Personal Leave");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmStatusChange(targetStatus, reasonCode, effectiveDate);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const statusConfig = {
    Active: {
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      iconBg: "bg-emerald-100 text-emerald-700",
      accentBorder: "border-emerald-500 bg-emerald-50/40",
      activeRing: "ring-2 ring-emerald-500/30 border-emerald-500",
      buttonBg: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25",
      icon: UserCheck,
      desc: "Eligible for shift assignments & active client care",
    },
    "Leave of Absence": {
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200/80",
      iconBg: "bg-amber-100 text-amber-700",
      accentBorder: "border-amber-500 bg-amber-50/40",
      activeRing: "ring-2 ring-amber-500/30 border-amber-500",
      buttonBg: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/25",
      icon: PauseCircle,
      desc: "Temporarily paused from active dispatch pool",
    },
    Terminated: {
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200/80",
      iconBg: "bg-rose-100 text-rose-700",
      accentBorder: "border-rose-500 bg-rose-50/40",
      activeRing: "ring-2 ring-rose-500/30 border-rose-500",
      buttonBg: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/25",
      icon: UserMinus,
      desc: "Offboarded & permanently removed from pool",
    },
  };

  const HeaderIcon = statusConfig[targetStatus].icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 text-xs font-sans text-slate-800"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  "p-2.5 rounded-2xl transition-colors duration-200",
                  statusConfig[targetStatus].iconBg
                )}
              >
                <HeaderIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg tracking-tight">
                  Change Caregiver Status
                </h3>
                <p className="text-slate-500 text-xs font-normal mt-0.5">
                  Update employment standing and scheduling availability
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Caregiver Summary Card */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white font-semibold flex items-center justify-center text-xs shadow-sm">
                  {getInitials(caregiverName)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {caregiverName}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Caregiver Profile ID: #CG-{Math.floor(1000 + Math.random() * 9000)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-0.5">
                  Current Status
                </span>
                <span
                  className={clsx(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
                    currentStatus === "Active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : currentStatus === "Onboarding"
                      ? "bg-sky-50 text-sky-700 border-sky-200"
                      : currentStatus === "Leave of Absence"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  )}
                >
                  {currentStatus}
                </span>
              </div>
            </div>

            {/* New Employment Status Visual Picker */}
            <div>
              <label className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider block mb-2">
                New Employment Status <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(
                  [
                    {
                      id: "Active",
                      title: "Active",
                      sub: "Available for Shifts",
                      icon: UserCheck,
                      color: "emerald",
                    },
                    {
                      id: "Leave of Absence",
                      title: "Leave of Absence",
                      sub: "Temporarily Paused",
                      icon: PauseCircle,
                      color: "amber",
                    },
                    {
                      id: "Terminated",
                      title: "Terminated",
                      sub: "Offboarding Pool",
                      icon: UserMinus,
                      color: "rose",
                    },
                  ] as const
                ).map((item) => {
                  const IconComp = item.icon;
                  const isSelected = targetStatus === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleStatusSelect(item.id)}
                      className={clsx(
                        "p-3 rounded-2xl border text-left transition-all duration-150 relative flex flex-col justify-between h-24",
                        isSelected
                          ? statusConfig[item.id].activeRing + " bg-white shadow-md"
                          : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-100/60 text-slate-600"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div
                          className={clsx(
                            "p-1.5 rounded-xl",
                            isSelected
                              ? statusConfig[item.id].iconBg
                              : "bg-slate-200/60 text-slate-500"
                          )}
                        >
                          <IconComp className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span
                            className={clsx(
                              "w-2 h-2 rounded-full",
                              item.color === "emerald"
                                ? "bg-emerald-500"
                                : item.color === "amber"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            )}
                          />
                        )}
                      </div>
                      <div>
                        <div
                          className={clsx(
                            "font-bold text-xs leading-snug",
                            isSelected ? "text-slate-900" : "text-slate-700"
                          )}
                        >
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                          {item.sub}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reason Code Dropdown */}
            <div>
              <label className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                <span>Reason Code <span className="text-rose-500">*</span></span>
                <span className="text-[10px] text-slate-400 font-normal lowercase">Required for audit trail</span>
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={reasonCode}
                  onChange={(e) => setReasonCode(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 font-medium text-xs outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 appearance-none transition-all cursor-pointer"
                >
                  {targetStatus === "Terminated" ? (
                    <>
                      <option value="Voluntary - Relocation / Moving">
                        Voluntary - Relocation / Moving
                      </option>
                      <option value="Voluntary - Schedule Flexibility / Hours">
                        Voluntary - Schedule Flexibility / Hours
                      </option>
                      <option value="Voluntary - Career Advancement">
                        Voluntary - Career Advancement
                      </option>
                      <option value="Voluntary - Pay Rate / Compensation">
                        Voluntary - Pay Rate / Compensation
                      </option>
                      <option value="Involuntary - Policy Violation / Attendance">
                        Involuntary - Policy Violation / Attendance
                      </option>
                      <option value="Involuntary - Failed Background Check / Credential">
                        Involuntary - Failed Background Check / Credential
                      </option>
                    </>
                  ) : targetStatus === "Active" ? (
                    <>
                      <option value="Scheduled Return to Duty">
                        Scheduled Return to Duty
                      </option>
                      <option value="Medical Clearance Received">
                        Medical Clearance Received
                      </option>
                      <option value="Onboarding Completed">
                        Onboarding Completed
                      </option>
                      <option value="Administrative Reinstatement">
                        Administrative Reinstatement
                      </option>
                    </>
                  ) : (
                    <>
                      <option value="Personal Leave">Personal Leave</option>
                      <option value="Medical Leave (FMLA)">
                        Medical Leave (FMLA)
                      </option>
                      <option value="Maternity / Paternity Leave">
                        Maternity / Paternity Leave
                      </option>
                      <option value="Educational Leave">Educational Leave</option>
                    </>
                  )}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Effective Date Picker */}
            <div>
              <label className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5">
                Effective Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  required
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 font-medium text-xs outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Dynamic Status Impact Banner */}
            <div
              className={clsx(
                "p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 transition-colors duration-200",
                targetStatus === "Terminated"
                  ? "bg-rose-50/70 border-rose-200 text-rose-900"
                  : targetStatus === "Leave of Absence"
                  ? "bg-amber-50/70 border-amber-200 text-amber-900"
                  : "bg-emerald-50/70 border-emerald-200 text-emerald-900"
              )}
            >
              {targetStatus === "Terminated" ? (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              ) : targetStatus === "Leave of Absence" ? (
                <PauseCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className="font-bold block">
                  {targetStatus === "Terminated"
                    ? "Warning: Immediate Offboarding Action"
                    : targetStatus === "Leave of Absence"
                    ? "Notice: Temporary Schedule Pause"
                    : "Reinstatement Notice"}
                </span>
                <p className="text-[11px] opacity-90">
                  {targetStatus === "Terminated"
                    ? "Terminating this caregiver will immediately remove them from the active shift scheduling pool and trigger the automated Exit Interview questionnaire."
                    : targetStatus === "Leave of Absence"
                    ? "Placing this caregiver on Leave of Absence will pause new shift assignments starting on the effective date."
                    : "Reinstating caregiver to Active status will restore shift matching eligibility and dispatch options."}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={clsx(
                  "px-5 py-2.5 font-bold rounded-xl transition-all duration-150 shadow-md active:scale-[0.98] flex items-center gap-2 text-xs",
                  statusConfig[targetStatus].buttonBg
                )}
              >
                <span>Confirm Status Change</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

