import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Save } from "lucide-react";

interface VisitMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reasonCode: string, note: string) => void;
  exceptionType: string;
}

const REASON_CODES = [
  { code: "01", label: "Caregiver forgot to clock in/out" },
  { code: "02", label: "Caregiver mobile device issue" },
  { code: "03", label: "Patient emergency" },
  { code: "04", label: "Telephony/FVV system failure" },
  { code: "05", label: "GPS location incorrect/drift" },
];

export function VisitMaintenanceModal({ isOpen, onClose, onSave, exceptionType }: VisitMaintenanceModalProps) {
  const [selectedCode, setSelectedCode] = useState("");
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (!selectedCode) return;
    onSave(selectedCode, note);
    setSelectedCode("");
    setNote("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Visit Maintenance</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-amber-900">State Compliance Requirement</h4>
                  <p className="text-xs text-amber-700 mt-1">
                    Correcting a "{exceptionType}" exception requires a valid State EVV reason code.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Reason Code *</label>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {REASON_CODES.map(rc => (
                    <button
                      key={rc.code}
                      onClick={() => setSelectedCode(rc.code)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                        selectedCode === rc.code 
                          ? "bg-brand-teal/10 border-brand-teal text-brand-teal font-semibold" 
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs mr-2">{rc.code}</span>
                      {rc.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Resolution Note (Optional)</label>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Additional context for the aggregator..."
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-brand-teal resize-none h-20"
                />
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={!selectedCode}
                className="px-4 py-2 bg-brand-teal hover:bg-brand-teal/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-brand-teal/20"
              >
                <Save className="w-4 h-4" />
                Apply Correction
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
