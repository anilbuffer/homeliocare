"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockOrganization, mockTeamMembers } from "@/lib/partner/mockData";
import { Send, CheckCircle2, Building2, User, Phone, Mail, AlertTriangle, FileText } from "lucide-react";
import clsx from "clsx";

export function PartnerReferralForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isUrgent = searchParams.get("urgent") === "true";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const activeMember = mockTeamMembers[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Redirect back to dashboard after a delay
      setTimeout(() => {
        router.push("/partner");
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative text-center max-w-2xl mx-auto mt-12">
        <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-brand-teal" />
        </div>
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Referral Submitted Successfully</h2>
        <p className="text-slate-500 mb-6">
          Thank you. The Homelio Care intake team has received your referral and will review it shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden group">
        {/* Form Header */}
        <div className="bg-slate-50/50 px-3 lg:px-6 py-3 lg:py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-800 text-lg">New Referral</h2>
            <p className="text-xs text-slate-500">Securely submit patient information to Homelio Care.</p>
          </div>
          {isUrgent && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg border border-red-200">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Urgent Discharge (24-48h)</span>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="px-3 py-3 lg:p-6 space-y-3 lg:space-y-4">
          {/* Section 1: Submitting Organization (Pre-filled) */}
          <section>
            <h3 className="text-sm font-semibold text-slate-800 mb-2 lg:mb-4">1. Referring Provider Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 flex items-start gap-3">
                <Building2 className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Facility / Organization</label>
                  <div className="text-sm font-medium text-slate-800">{mockOrganization.name}</div>
                  <div className="text-xs text-slate-500">{mockOrganization.address}</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 flex items-start gap-3">
                <User className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Referring Member</label>
                  <div className="text-sm font-medium text-slate-800">{activeMember.name}</div>
                  <div className="text-xs text-slate-500">{activeMember.role}</div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {activeMember.phone}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {activeMember.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2 italic">
              These details are automatically attached to your referral.
            </p>
          </section>
          <hr className="border-slate-200" />
          {/* Section 2: Patient Information */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">2. Patient Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                <input type="text" required className="w-full rounded-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2 px-3 border outline-none transition-colors" placeholder="Patient's first name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                <input type="text" required className="w-full rounded-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2 px-3 border outline-none transition-colors" placeholder="Patient's last name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                <input type="date" className="w-full rounded-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2 px-3 border outline-none transition-colors text-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Patient Phone</label>
                <input type="tel" className="w-full rounded-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2 px-3 border outline-none transition-colors" placeholder="(555) 000-0000" />
              </div>
            </div>
          </section>
          <hr className="border-slate-200" />
          {/* Section 3: Care Needs */}
          <section>
            <h3 className="text-sm font-semibold text-slate-800 mb-2">3. Care Needs & Urgency</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Primary Reason for Referral *</label>
                <select required className="w-full rounded-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2 px-3 border outline-none transition-colors bg-white text-slate-700">
                  <option value="">Select primary need...</option>
                  <option value="post-op">Post-operative Care</option>
                  <option value="dementia">Memory/Dementia Care</option>
                  <option value="adl">Daily Living Assistance (ADLs)</option>
                  <option value="companionship">Companionship</option>
                  <option value="other">Other (Please specify below)</option>
                </select>
              </div>

              {!isUrgent && (
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-brand-teal focus:ring-brand-teal border-slate-300 w-4 h-4 cursor-pointer" />
                    <span className="text-sm font-medium text-slate-700">Mark as Urgent (Discharging within 24-48 hours)</span>
                  </label>
                </div>
              )}
              <hr className="border-slate-200" />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes</label>
                <textarea rows={4} className="w-full rounded-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2 px-3 border outline-none transition-colors resize-none" placeholder="Include any relevant medical context, discharge instructions, or specific family requests..."></textarea>
              </div>

              {/* File Upload */}
              <label htmlFor="file-upload" className="border border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-slate-50 transition-colors cursor-pointer shadow-[0_6px_32px_rgba(0,0,0,0.06)] group relative">
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  }}
                />
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_6px_32px_rgba(0,0,0,0.06)] mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 text-slate-400 group-hover:text-brand-teal transition-colors" />
                </div>
                <div className="text-sm font-medium text-slate-700">
                  {file ? file.name : "Upload Face Sheet or Medical Records"}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "PDF, JPG, or PNG (max 10MB)"}
                </div>
              </label>
            </div>
          </section>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer text-slate-600 bg-slate-100 border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-white shadow-[0_4px_14px_rgba(14,163,131,0.25)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)]",
                isSubmitting ? "bg-teal-500 opacity-70 cursor-not-allowed" : "bg-brand-teal hover:bg-teal-600 active:scale-95"
              )}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Referral
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
