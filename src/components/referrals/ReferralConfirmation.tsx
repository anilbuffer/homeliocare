"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Copy, FileText, ExternalLink } from "lucide-react";

interface ReferralConfirmationProps {
  referenceNumber: string;
}

export function ReferralConfirmation({ referenceNumber }: ReferralConfirmationProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(referenceNumber);
    // In a real app, you might show a toast here
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-center p-8 md:p-12">
      <div className="flex justify-center mb-6">
        <div className="bg-teal-50 p-4 rounded-full">
          <CheckCircle2 className="w-16 h-16 text-teal-600" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Referral Received</h1>
      
      <p className="text-slate-600 text-lg max-w-lg mx-auto mb-8">
        Thank you. The referral has been securely submitted to Homelio and is now in our intake pipeline. We will contact the patient or family shortly.
      </p>

      <div className="inline-block bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
        <p className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wide">
          Reference Number
        </p>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-mono font-bold text-slate-800 tracking-wider">
            {referenceNumber}
          </span>
          <button 
            onClick={handleCopy}
            className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            title="Copy reference number"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </div>

      <hr className="border-slate-100 my-8" />

      <div className="bg-blue-50/50 rounded-xl p-6 text-left max-w-lg mx-auto border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              Want to check on this referral later?
            </h3>
            <p className="text-sm text-blue-800 mb-4">
              Get a secure link by email to check the status of your submitted referrals without creating an account.
            </p>
            <Link 
              href="/refer/status" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 bg-blue-100/50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            >
              Check Status Portal
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <button 
          onClick={() => window.location.reload()}
          className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors"
        >
          Submit another referral
        </button>
      </div>
    </div>
  );
}
