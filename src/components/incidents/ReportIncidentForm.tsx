"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Upload, AlertTriangle } from "lucide-react";
import { cn } from "@/components/ui/Card";

interface ReportIncidentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const HIGH_SEVERITY_TYPES = ["Abuse", "Neglect", "Death", "HIPAA Breach", "Emergency"];
const INCIDENT_CATEGORIES = [
  "Medication Error", "Fall", "Abuse", "Neglect", "Missed Visit",
  "Late Visit", "Injury", "Aggressive Behavior", "Property Damage",
  "Theft", "Vehicle Accident", "Needle Stick", "HIPAA Breach",
  "Complaint", "Emergency", "Hospital Transfer", "Death", "Infection",
  "Documentation Error", "Other"
];

export function ReportIncidentForm({ isOpen, onClose }: ReportIncidentFormProps) {
  const [incidentType, setIncidentType] = useState("");
  const [notifySupervisor, setNotifySupervisor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-check supervisor notification for high-severity types
  useEffect(() => {
    if (HIGH_SEVERITY_TYPES.includes(incidentType)) {
      setNotifySupervisor(true);
    }
  }, [incidentType]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setIncidentType("");
      setNotifySupervisor(false);
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Auto close after success
      setTimeout(() => {
        onClose();
      }, 2500);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!isSuccess ? onClose : undefined}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {isSuccess ? (
            <div className="p-12 flex flex-col items-center justify-center text-center h-64">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-16 h-16 bg-accent-green/10 text-accent-green rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Incident Reported</h3>
              <p className="text-slate-500">Incident #INC-2026-042 has been successfully submitted.</p>
              {notifySupervisor && (
                <p className="text-sm font-medium text-brand-teal mt-2">Supervisor has been notified immediately.</p>
              )}
            </div>
          ) : (
            <>
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-800">Report Incident</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                <form id="incident-form" onSubmit={handleSubmit} className="space-y-5">

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Incident Type *</label>
                    <select
                      required
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all bg-white"
                      value={incidentType}
                      onChange={(e) => setIncidentType(e.target.value)}
                    >
                      <option value="" disabled>Select incident type...</option>
                      {INCIDENT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
                      <input
                        type="text"
                        placeholder="Search client..."
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Caregiver(s)</label>
                      <input
                        type="text"
                        placeholder="Search caregiver..."
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                      <input
                        type="date"
                        required
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                      <input
                        type="time"
                        required
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all text-slate-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Client Home - Bathroom"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Provide a detailed, objective account of what happened..."
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Evidence / Attachments</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mb-3">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-medium text-brand-teal mb-1">Click to upload photos or documents</p>
                      <p className="text-xs text-slate-400">PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>

                  <div className={cn(
                    "p-4 rounded-xl border flex gap-3 transition-colors duration-300",
                    notifySupervisor ? "bg-accent-red/5 border-accent-red/20" : "bg-slate-50 border-slate-200"
                  )}>
                    <input
                      type="checkbox"
                      id="notify-supervisor"
                      className="mt-1 w-4 h-4 text-accent-red rounded border-slate-300 focus:ring-accent-red"
                      checked={notifySupervisor}
                      onChange={(e) => setNotifySupervisor(e.target.checked)}
                    />
                    <div>
                      <label htmlFor="notify-supervisor" className="text-sm font-bold text-slate-800 cursor-pointer flex items-center gap-1.5">
                        Notify Supervisor Immediately
                        {HIGH_SEVERITY_TYPES.includes(incidentType) && (
                          <AlertTriangle className="w-4 h-4 text-accent-amber" />
                        )}
                      </label>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {HIGH_SEVERITY_TYPES.includes(incidentType)
                          ? `Auto-selected for ${incidentType} incidents.`
                          : "Check this if the incident requires urgent supervisor intervention."}
                      </p>
                    </div>
                  </div>

                </form>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  form="incident-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-medium bg-brand-teal border border-brand-teal hover:bg-brand-teal/90 text-white rounded-xl transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
