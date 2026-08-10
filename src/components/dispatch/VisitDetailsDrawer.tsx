import React from "react"; // Force IDE file watcher update
import { type Visit } from "@/lib/mockTrackerData";
import { X, Clock, MapPin, User, FileText, CheckCircle2, ShieldAlert } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface VisitDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  visit: Visit | null;
  onEdit?: () => void;
  onContact?: () => void;
}

export function VisitDetailsDrawer({ isOpen, onClose, visit, onEdit, onContact }: VisitDetailsDrawerProps) {
  if (!visit) return null;

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
                    visit.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                      visit.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                        visit.status === "Unassigned" ? "bg-red-100 text-red-700" :
                          "bg-teal-100 text-teal-700"
                  )}>
                    {visit.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Visit #{visit.id.replace('v-', '4570')}</span>
                </div>
                <h2 className="text-base font-semibold text-slate-900">{visit.patientName}</h2>
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
                    <Clock className="w-3.5 h-3.5" /> Time Window
                  </div>
                  <div className="font-semibold text-slate-900 text-sm">{visit.time}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1 text-[11px] font-semibold uppercase tracking-wider">
                    <User className="w-3.5 h-3.5" /> Caregiver
                  </div>
                  <div className={clsx("font-semibold text-sm", visit.caregiverId ? "text-slate-900" : "text-red-500 italic")}>
                    {visit.caregiverId || "Unassigned"}
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
                    <div className="text-sm font-medium text-slate-700">123 Example Street, Suite 400<br />New York, NY 10001</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Access Instructions</div>
                    <div className="font-medium text-amber-800 bg-amber-100 text-xs px-2 py-1 rounded-lg border border-amber-100">Gate Code: 4829. Key lockbox on side door.</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-teal" /> Care Requirements
                </h3>
                <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">HHA Required</span>
                    <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">Hoyer Lift</span>
                    <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">Dementia Care</span>
                  </div>
                  <div className="border-t border-slate-100 pt-3 mt-3">
                    <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Risk Flags</div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-600">
                      <ShieldAlert className="w-4 h-4" /> Fall Risk
                    </div>
                  </div>
                </div>
              </div>

              {visit.status === "Completed" && (
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> EVV Data
                  </h3>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-900">Check-In</span>
                      <span className="font-medium text-emerald-700">8:58 AM (Verified)</span>
                    </div>
                    <div className="w-full h-px bg-emerald-200/50 my-2" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-900">Check-Out</span>
                      <span className="font-medium text-emerald-700">1:05 PM (Verified)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex gap-3">
              <button 
                onClick={() => onEdit?.()}
                className="flex-1 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-slate-50 transition-colors"
              >
                Edit Visit
              </button>
              <button 
                onClick={() => onContact?.()}
                className="flex-1 py-2.5 rounded-xl bg-brand-teal text-white text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-brand-teal/20 hover:bg-teal-600 transition-colors"
              >
                Contact Caregiver
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
