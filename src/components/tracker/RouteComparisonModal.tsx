import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, Clock, MapPin, User, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Visit, Caregiver } from "@/lib/mockTrackerData";

interface RouteComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: Visit | null;
  caregivers: Caregiver[];
  onAssign: (caregiverId: string, visitId: string) => void;
}

export function RouteComparisonModal({ isOpen, onClose, visit, caregivers, onAssign }: RouteComparisonModalProps) {
  if (!visit || !isOpen) return null;

  // Mocking 2 specific caregiver recommendations for the comparison
  const recommendations = [
    {
      caregiverId: caregivers[0]?.id || 'c1',
      name: caregivers[0]?.name || 'Priya Patel',
      role: 'RN',
      skillMatch: 98,
      isBestFit: true,
      originalTime: "5h 20m",
      newTime: "5h 45m",
      detourMiles: "+0.8 mi",
      detourTime: "+25 mins",
      warning: null,
    },
    {
      caregiverId: caregivers[1]?.id || 'c2',
      name: caregivers[1]?.name || 'Maria Santos',
      role: 'CNA',
      skillMatch: 85,
      isBestFit: false,
      originalTime: "7h 10m",
      newTime: "8h 05m",
      detourMiles: "+3.2 mi",
      detourTime: "+55 mins",
      warning: "Approaching Overtime (8h+)",
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[110] p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-200 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span className="text-brand-teal">⚖️</span> Compare Route Impacts
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    Analyzing insertion of <strong className="text-slate-700">{visit.patientName} (Visit #{visit.id.replace('v-', '4570')})</strong>
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                <div className="grid grid-cols-2 gap-6">
                  {recommendations.map((rec, i) => (
                    <div 
                      key={rec.caregiverId} 
                      className={clsx(
                        "bg-white rounded-xl border p-5 flex flex-col relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                        rec.isBestFit ? "border-brand-teal/50 ring-1 ring-brand-teal/20" : "border-slate-200"
                      )}
                    >
                      {rec.isBestFit && (
                        <div className="absolute top-0 right-0 bg-brand-teal text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                          ⭐ Best Fit
                        </div>
                      )}

                      {/* Caregiver Info */}
                      <div className="flex items-start gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-base">{rec.name} <span className="text-slate-400 font-medium text-sm ml-1">({rec.role})</span></h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              {rec.skillMatch}% Skill Match
                            </span>
                            {rec.warning && (
                              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> {rec.warning}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Metrics Comparison */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Current Route</div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="font-bold text-slate-700">{rec.originalTime}</span>
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 relative">
                          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-slate-100 flex items-center justify-center shadow-sm z-10">
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                          </div>
                          <div className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mb-1">New Route</div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="font-bold text-blue-700">{rec.newTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Route Impact Summary */}
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 mb-6 flex-1">
                        <h4 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">Route Impact</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 font-medium flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-slate-400" /> Detour Distance
                            </span>
                            <span className={clsx("font-bold", rec.isBestFit ? "text-emerald-600" : "text-amber-600")}>
                              {rec.detourMiles}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 font-medium flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-400" /> Added Travel + Visit Time
                            </span>
                            <span className={clsx("font-bold", rec.isBestFit ? "text-emerald-600" : "text-amber-600")}>
                              {rec.detourTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => {
                          onAssign(rec.caregiverId, visit.id);
                          onClose();
                        }}
                        className={clsx(
                          "w-full py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2",
                          rec.isBestFit 
                            ? "bg-brand-teal text-white hover:bg-teal-600 shadow-brand-teal/20" 
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                        )}
                      >
                        {rec.isBestFit ? <><CheckCircle2 className="w-4 h-4" /> Assign to {rec.name}</> : `Assign to ${rec.name}`}
                      </button>

                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
