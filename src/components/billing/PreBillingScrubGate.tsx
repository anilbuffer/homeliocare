import React from "react";
import { AlertTriangle, FileWarning, ShieldAlert, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const scrubItems = [
  { id: 1, type: "EVV Exceptions", count: 12, amount: 2850.00, urgent: true },
  { id: 2, type: "Missing Signatures", count: 5, amount: 950.00, urgent: true },
  { id: 3, type: "Missing Auth Units", count: 2, amount: 480.00, urgent: false },
];

export function PreBillingScrubGate() {
  const totalBlocked = scrubItems.reduce((acc, curr) => acc + curr.amount, 0);

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

            <div className="flex flex-col gap-3 shrink-0">
              {scrubItems.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-6 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 min-w-[280px]">
                  <div className="flex items-center gap-3">
                    {item.urgent ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    ) : (
                      <FileWarning className="w-4 h-4 text-slate-400" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.type}</p>
                      <p className="text-xs text-slate-500">{item.count} visits affected</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-rose-600">${item.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between pl-14">
            <p className="text-sm font-medium text-slate-500">
              Requires attention in the <span className="font-bold text-slate-700">EVV Monitoring</span> and <span className="font-bold text-slate-700">QA</span> modules.
            </p>
            <button className="flex items-center gap-2 text-brand-teal hover:text-teal-700 font-bold text-sm bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-xl transition-colors">
              Review Blocked Visits
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
