"use client";

import React from "react";
import Link from "next/link";
import { Send, FileText, ArrowRight } from "lucide-react";

export function ReferralSubmitWidget() {
  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl px-4 py-3 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
      <div className="relative z-10 flex-1">
        <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal mb-2 lg:mb-3">
          <Send className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-slate-800 text-lg mb-1">Submit a New Referral</h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3 lg:mb-4">
          Quickly refer a patient to Homelio Care. Organization details are pre-filled for a faster experience.
        </p>

        <div className="space-y-3">
          <Link
            href="/partner/submit"
            className="w-full flex items-center justify-center gap-2 bg-brand-teal hover:bg-teal-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-brand-teal/20"
          >
            Start Referral <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/partner/submit?urgent=true"
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl text-sm font-medium transition-colors border border-slate-200"
          >
            Urgent Discharge (24-48h)
          </Link>
        </div>
      </div>
    </div>
  );
}
