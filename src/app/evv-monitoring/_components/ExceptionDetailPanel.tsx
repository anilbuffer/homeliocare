"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVVException } from "../types";
import { X, MapPin, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { VisitMaintenanceModal } from "./VisitMaintenanceModal";

interface ExceptionDetailPanelProps {
  exception: EVVException | null;
  onClose: () => void;
  onResolve: (id: string, action: string) => void;
}

export function ExceptionDetailPanel({ exception, onClose, onResolve }: ExceptionDetailPanelProps) {
  const [resolving, setResolving] = useState(false);
  const [resolveAction, setResolveAction] = useState("");
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false);

  if (!exception) return null;

  const handleConfirmClick = () => {
    setIsMaintenanceOpen(true);
  };

  const handleMaintenanceSave = (reasonCode: string, note: string) => {
    setIsMaintenanceOpen(false);
    setResolving(true);
    setTimeout(() => {
      onResolve(exception.id, resolveAction);
      setResolving(false);
      setResolveAction("");
      onClose();
    }, 600); // simulate network request and show checkmark
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Exception Review
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                  {exception.caregiver.avatarUrl ? (
                    <img src={exception.caregiver.avatarUrl} alt={exception.caregiver.name} className="w-full h-full object-cover bg-slate-100" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                      {exception.caregiver.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-base leading-tight">{exception.caregiver.name}</div>
                  <div className="text-slate-500 font-medium text-xs leading-tight">Caregiver</div>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-500 text-xs font-medium">Patient</span>
                  <span className="text-sm font-semibold text-slate-900">{exception.patient.name}</span>
                </div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-500 text-xs font-medium">Date</span>
                  <span className="text-sm font-semibold text-slate-900">{exception.visitDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-xs font-medium">Exception Type</span>
                  <span className="text-sm font-semibold text-slate-900">{exception.type}</span>
                </div>
              </div>
            </div>

            {/* Time Comparison */}
            <div>
              <h3 className="text-[11px] font-bold text-slate-900 mb-2 uppercase tracking-wider">Time Logs</h3>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between bg-slate-50/80 p-2.5 rounded-lg">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">Scheduled</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{exception.scheduledTime.start} - {exception.scheduledTime.end}</span>
                </div>

                <div className="flex items-center justify-between bg-amber-50/70 p-2.5 rounded-lg">
                  <div className="flex items-center gap-1.5 text-amber-700">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">Actual</span>
                  </div>
                  <span className="text-sm font-bold text-amber-900">
                    {exception.actualTime.start || "Missing"} - {exception.actualTime.end || "Missing"}
                  </span>
                </div>
              </div>
            </div>

            {/* Map (if GPS issue) */}
            {exception.type === "Wrong GPS location" && (
              <div>
                <h3 className="text-[11px] font-bold text-slate-900 mb-2 uppercase tracking-wider">Location Mismatch</h3>
                <div className="h-32 bg-slate-900 rounded-lg overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=34.0522,-118.2437&zoom=14&size=400x200&style=feature:all|element:labels|visibility:off&style=feature:water|element:geometry|color:0x1a2133&style=feature:landscape|element:geometry|color:0x0e1424&style=feature:road|element:geometry|color:0x202b40')] bg-cover bg-center" />

                  {/* Fake map markers for effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8">
                    <div className="flex flex-col items-center">
                      <div className="bg-brand-teal p-1 rounded-full mb-0.5 border border-white">
                        <MapPin className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-[9px] font-bold text-brand-teal bg-white px-1 py-0.5 rounded shadow-[0_6px_32px_rgba(0,0,0,0.06)]">Expected</span>
                    </div>

                    <div className="w-8 border-t border-dashed border-red-500/50 absolute left-6 top-3 -z-10" />

                    <div className="flex flex-col items-center">
                      <div className="bg-red-500 p-1 rounded-full mb-0.5 border border-white">
                        <MapPin className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-[9px] font-bold text-red-600 bg-white px-1 py-0.5 rounded shadow-[0_6px_32px_rgba(0,0,0,0.06)]">Actual</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Resolution Actions */}
            <div>
              <h3 className="text-[11px] font-bold text-slate-900 mb-2 uppercase tracking-wider">Resolution Actions</h3>
              <div className="space-y-1.5">
                {[
                  { id: "approve", label: "Approve as-is", desc: "Keep recorded times" },
                  { id: "adjust", label: "Manual time adjustment", desc: "Override with scheduled time" },
                  { id: "flag", label: "Flag for supervisor", desc: "Requires tier 2 review" },
                  { id: "risk", label: "Mark as billing risk", desc: "Do not submit to payer" },
                ].map(action => (
                  <button
                    key={action.id}
                    onClick={() => setResolveAction(action.id)}
                    className={clsx(
                      "w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-colors",
                      resolveAction === action.id
                        ? "bg-brand-teal/10 text-brand-teal"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                    )}
                  >
                    <div>
                      <div className="font-semibold text-sm">{action.label}</div>
                      <div className="text-[11px] opacity-80 mt-0.5">{action.desc}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                ))}
              </div>
            </div>

            {/* Audit Trail */}
            <div className="pt-3 border-t border-slate-100/50">
              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Action will be recorded in the EVV audit log.
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-100 bg-white">
            <button
              disabled={!resolveAction || resolving}
              onClick={handleConfirmClick}
              className={clsx(
                "w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all",
                resolveAction && !resolving
                  ? "bg-brand-teal text-white hover:bg-brand-teal/90"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
            >
              {resolving ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Resolved
                </motion.div>
              ) : (
                "Confirm Resolution"
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
      
      {isMaintenanceOpen && (
        <VisitMaintenanceModal
          isOpen={isMaintenanceOpen}
          onClose={() => setIsMaintenanceOpen(false)}
          onSave={handleMaintenanceSave}
          exceptionType={exception.type}
        />
      )}
    </AnimatePresence>
  );
}
