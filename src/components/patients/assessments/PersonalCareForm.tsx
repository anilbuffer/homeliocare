"use client";

import React, { useState } from "react";
import { X, Save, FileSignature, CheckCircle, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PersonalCareFormProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
}

export function PersonalCareForm({ isOpen, onClose, patientName }: PersonalCareFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setStep(1);
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-brand-teal" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Personal Care Assessment Form</h3>
                <p className="text-xs text-slate-500 font-medium">State-Specific Non-Medical Evaluation • {patientName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-slate-50/30">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center py-20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle className="w-8 h-8" />
                </motion.div>
                <h4 className="text-xl font-bold text-slate-900">Assessment Saved Successfully</h4>
                <p className="text-slate-500 mt-2">The care plan has been updated.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <h4 className="font-semibold text-slate-800 border-b border-slate-200 pb-2">Activities of Daily Living (ADLs)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["Bathing", "Dressing", "Toileting", "Transferring", "Continence", "Feeding"].map((adl) => (
                        <div key={adl} className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                          <label className="block text-sm font-medium text-slate-700 mb-2">{adl} Support Required</label>
                          <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-brand-teal focus:border-brand-teal">
                            <option>Independent</option>
                            <option>Needs Setup</option>
                            <option>Needs Physical Assist</option>
                            <option>Total Dependence</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <h4 className="font-semibold text-slate-800 border-b border-slate-200 pb-2">Home Environment & Safety</h4>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-3">
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4 text-brand-teal rounded border-slate-300" />
                          <span className="text-sm text-slate-700">Are there slip/fall hazards present? (e.g., loose rugs)</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4 text-brand-teal rounded border-slate-300" />
                          <span className="text-sm text-slate-700">Is adequate lighting available in hallways and bathrooms?</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4 text-brand-teal rounded border-slate-300" />
                          <span className="text-sm text-slate-700">Are mobility aids (walkers, canes) accessible?</span>
                        </label>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Additional Safety Notes</label>
                        <textarea className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-brand-teal focus:border-brand-teal min-h-[100px]" placeholder="Note any specific environmental concerns..."></textarea>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {!submitted && (
            <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between">
              <div className="text-sm font-medium text-slate-500">
                Step {step} of 2
              </div>
              <div className="flex items-center gap-3">
                {step === 2 && (
                  <button onClick={() => setStep(1)} className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                    Back
                  </button>
                )}
                {step === 1 ? (
                  <button onClick={() => setStep(2)} className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-teal hover:bg-teal-700 rounded-xl transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-teal hover:bg-teal-700 rounded-xl transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <FileSignature className="w-4 h-4" />
                    {isSubmitting ? "Signing & Saving..." : "Sign & Complete"}
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
