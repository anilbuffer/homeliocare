"use client";

import React, { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

interface PublicReferralFormProps {
  onSubmitSuccess: (referenceNumber: string) => void;
}

export function PublicReferralForm({ onSubmitSuccess }: PublicReferralFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Generate a mock reference number
      const refNumber = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      onSubmitSuccess(refNumber);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Submit a New Referral</h1>
        <p className="text-slate-500">
          Enter the patient details below to begin the intake process. No account required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
        {/* Section 1: Provider Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-sm">1</span>
            Referring Provider Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="providerName" className="text-sm font-medium text-slate-700">Your Name *</label>
              <input required id="providerName" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="Dr. Jane Smith" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="organization" className="text-sm font-medium text-slate-700">Organization/Facility *</label>
              <input required id="organization" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="General Hospital" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="role" className="text-sm font-medium text-slate-700">Your Role *</label>
              <select required id="role" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow bg-white">
                <option value="">Select a role...</option>
                <option value="discharge_planner">Discharge Planner</option>
                <option value="physician">Physician</option>
                <option value="social_worker">Social Worker</option>
                <option value="case_manager">Case Manager</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="providerEmail" className="text-sm font-medium text-slate-700">Your Email *</label>
              <input required id="providerEmail" type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="jane.smith@hospital.org" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="providerPhone" className="text-sm font-medium text-slate-700">Your Phone *</label>
              <input required id="providerPhone" type="tel" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="(555) 123-4567" />
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Section 2: Patient Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-sm">2</span>
              Patient Details
            </h2>
            <div className="text-xs text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
              <ShieldCheck className="w-3.5 h-3.5" /> Minimum PHI Required
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="patientName" className="text-sm font-medium text-slate-700">Patient Name *</label>
              <input required id="patientName" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="John Doe" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="patientAge" className="text-sm font-medium text-slate-700">Patient Age *</label>
              <input required id="patientAge" type="number" min="0" max="130" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="75" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label htmlFor="patientContact" className="text-sm font-medium text-slate-700">Best Contact for Patient/Family *</label>
              <input required id="patientContact" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="Wife (Mary): (555) 987-6543" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label htmlFor="reason" className="text-sm font-medium text-slate-700">Reason for Referral / Care Needs *</label>
              <textarea required id="reason" rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow resize-none" placeholder="Requires post-op wound care and assistance with ADLs..." />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label htmlFor="paymentSource" className="text-sm font-medium text-slate-700">Known Payment Source (Optional)</label>
              <input id="paymentSource" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="e.g., Medicare, Private Pay, specific insurance plan" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label htmlFor="notes" className="text-sm font-medium text-slate-700">Additional Notes (Optional)</label>
              <textarea id="notes" rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow resize-none" placeholder="Any other context..." />
            </div>
          </div>
        </div>

        {/* Urgency Flag */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <div className="pt-0.5">
            <input type="checkbox" id="urgency" className="w-5 h-5 text-amber-600 rounded border-amber-300 focus:ring-amber-500 focus:ring-2 focus:ring-offset-1 accent-amber-600" />
          </div>
          <div>
            <label htmlFor="urgency" className="font-semibold text-amber-900 cursor-pointer block">
              Patient is discharging within 24–48 hours
            </label>
            <p className="text-sm text-amber-700 mt-1">
              Check this if the patient needs immediate intake processing upon discharge.
            </p>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 max-w-sm">
            <p className="flex items-center gap-1.5 font-medium mb-1">
              <ShieldCheck className="w-4 h-4 text-teal-600" /> 
              Secure & Encrypted
            </p>
            This information is submitted securely for the sole purpose of evaluating care eligibility.
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 focus:ring-4 focus:ring-teal-600/20 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit Referral
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
