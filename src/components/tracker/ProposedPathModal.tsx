import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, MapPin, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import clsx from "clsx";

interface ProposedPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export function ProposedPathModal({ isOpen, onClose, onApply }: ProposedPathModalProps) {
  if (!isOpen) return null;

  const currentRoute = [
    { id: "v1", name: "Margaret Chen", time: "08:30", address: "1200 Sunset Blvd" },
    { id: "v2", name: "Robert Alvarez", time: "10:00", address: "44 Linden Ave" }, // 2nd
    { id: "v3", name: "Thomas Becker", time: "11:15", address: "55 El Camino" },  // 3rd
    { id: "v4", name: "Aiko Tanaka", time: "13:00", address: "33 Fillmore St" },
  ];

  const optimizedRoute = [
    { id: "v1", name: "Margaret Chen", time: "08:30", address: "1200 Sunset Blvd" },
    { id: "v3", name: "Thomas Becker", time: "09:45", address: "55 El Camino", highlighted: true }, // swapped
    { id: "v2", name: "Robert Alvarez", time: "11:30", address: "44 Linden Ave", highlighted: true }, // swapped
    { id: "v4", name: "Aiko Tanaka", time: "13:00", address: "33 Fillmore St" },
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
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
                <div>
                  <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                    <span className="text-yellow-500">⚡</span> AI Proposed Path Optimization
                  </h2>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    Re-ordering <strong className="text-slate-700">Priya Patel's</strong> route to avoid rush-hour traffic on Sunset Blvd.
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
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">

                {/* Metrics Banner */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mb-4 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-emerald-800 font-semibold text-sm">Saves 18 Minutes</div>
                      <div className="text-emerald-600 font-medium text-xs">Total travel time reduced from 1h 45m to 1h 27m.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-slate-500 text-xs font-medium">Current Distance</div>
                      <div className="text-slate-800 font-semibold text-md">12.4 mi</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300" />
                    <div className="text-center">
                      <div className="text-emerald-600 text-xs font-medium">New Distance</div>
                      <div className="text-emerald-700 font-semibold text-md">10.1 mi</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Current Route */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      Current Route Schedule
                    </h3>
                    <div className="relative pl-4 border-l-2 border-slate-100 space-y-4">
                      {currentRoute.map((v, i) => (
                        <div key={v.id} className="relative">
                          <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-slate-700 text-sm">{v.name}</span>
                              <span className="text-xs font-medium text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" />{v.time}</span>
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" /> {v.address}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proposed Route */}
                  <div className="bg-white rounded-xl border border-yellow-200 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-700 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                      Optimized
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      Proposed Route Schedule
                    </h3>
                    <div className="relative pl-4 border-l-2 border-yellow-100 space-y-4">
                      {optimizedRoute.map((v, i) => (
                        <div key={v.id} className="relative">
                          <div className={clsx(
                            "absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white",
                            v.highlighted ? "bg-yellow-400" : "bg-emerald-400"
                          )} />
                          <div className={clsx(
                            "rounded-lg p-3 border transition-colors",
                            v.highlighted ? "bg-yellow-50 border-yellow-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "bg-emerald-50/30 border-emerald-100"
                          )}>
                            <div className="flex items-center justify-between mb-1">
                              <span className={clsx("font-semibold text-sm", v.highlighted ? "text-yellow-900" : "text-slate-700")}>{v.name}</span>
                              <span className={clsx(
                                "text-xs font-medium flex items-center gap-1",
                                v.highlighted ? "text-yellow-700" : "text-slate-500"
                              )}>
                                <Clock className="w-3 h-3" />{v.time}
                              </span>
                            </div>
                            <div className={clsx("text-xs flex items-center gap-1", v.highlighted ? "text-yellow-700" : "text-slate-500")}>
                              <MapPin className="w-3 h-3 opacity-70" /> {v.address}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-all active:scale-95"
                >
                  Keep Current Route
                </button>
                <button
                  onClick={() => {
                    onApply();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-slate-900 text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.1)] shadow-yellow-500/20 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>⚡</span> Apply Optimization
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
