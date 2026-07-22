import React, { useState } from "react";
import { AlertTriangle, FileWarning, ShieldAlert, ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

const initialScrubItems = [
  { id: 1, type: "EVV Exceptions", count: 12, amount: 2850.00, urgent: true, details: ["Visit #88392 - Missing Clock-Out", "Visit #88345 - GPS Variance"] },
  { id: 2, type: "Missing Signatures", count: 5, amount: 950.00, urgent: true, details: ["Patient: Mary Smith - Care Plan", "Caregiver: John Doe - Timesheet"] },
  { id: 3, type: "Missing Auth Units", count: 2, amount: 480.00, urgent: false, details: ["Patient: Robert Chen - PT Services"] },
];

export function PreBillingScrubGate() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [resolvedIds, setResolvedIds] = useState<number[]>([]);

  const scrubItems = initialScrubItems.filter(item => !resolvedIds.includes(item.id));
  const totalBlocked = scrubItems.reduce((acc, curr) => acc + curr.amount, 0);

  const handleResolve = (id: number) => {
    setResolvedIds([...resolvedIds, id]);
    if (expandedId === id) setExpandedId(null);
  };

  if (scrubItems.length === 0) {
    return (
      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <div className="bg-white rounded-3xl border border-teal-200 overflow-hidden shadow-[0_8px_30px_rgba(20,184,166,0.08)] relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-teal-500" />
          <div className="p-6 md:p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-teal-100 p-3 rounded-xl text-teal-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">All Claims Scrubbed</h2>
                <p className="text-slate-600 mt-1">No pending exceptions. Ready for batch generation.</p>
              </div>
            </div>
            <button className="bg-brand-teal text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-brand-teal/20 hover:bg-brand-teal/90 transition-colors">
              Generate 837 Batch
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
      <div className="bg-white rounded-3xl border border-rose-200 overflow-hidden shadow-[0_8px_30px_rgba(225,29,72,0.08)] relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-rose-500" />
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

            <div className="flex-1 space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-rose-100 p-2 rounded-xl text-rose-600">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Pre-Billing Scrub Gate</h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed pl-14">
                These visits cannot be generated into claims until missing data or compliance exceptions are resolved.
                Resolving these issues will release <span className="font-bold text-rose-600">${totalBlocked.toLocaleString()}</span> to the billing pipeline.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full md:w-[320px]">
              <AnimatePresence>
                {scrubItems.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-100 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          {item.urgent ? (
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                          ) : (
                            <FileWarning className="w-4 h-4 text-slate-400" />
                          )}
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.type}</p>
                            <p className="text-xs text-slate-500">{item.count} claims affected</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-bold text-rose-600">${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                          <ChevronDown className={clsx("w-4 h-4 text-slate-400 transition-transform", expandedId === item.id && "rotate-180")} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedId === item.id && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden bg-white border-t border-slate-100"
                          >
                            <div className="p-3 space-y-2">
                              {item.details.map((detail, idx) => (
                                <div key={idx} className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg flex justify-between items-center">
                                  <span>{detail}</span>
                                  <button
                                    className="text-brand-teal hover:underline font-medium"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleResolve(item.id);
                                    }}
                                  >
                                    Override
                                  </button>
                                </div>
                              ))}
                              <div className="pt-2 flex justify-end">
                                <button
                                  onClick={() => handleResolve(item.id)}
                                  className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
                                >
                                  Resolve All {item.type}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 md:flex items-center justify-between lg:pl-14">
            <p className="text-sm font-medium text-slate-500">
              Requires attention in the <span className="font-bold text-slate-700">EVV Monitoring</span> and <span className="font-bold text-slate-700">QA</span> modules.
            </p>
            <button className="flex items-center gap-2 text-brand-teal hover:text-teal-700 font-bold mt-3 md:mt-0 text-sm bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-xl transition-colors">
              Review Blocked Visits
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
