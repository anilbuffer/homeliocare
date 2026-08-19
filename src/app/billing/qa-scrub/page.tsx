"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { CheckCircle, AlertTriangle, FileSignature } from "lucide-react";

export default function QAScrubPage() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pre-Billing QA Scrub</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review completed EVV visits for compliance (signatures, task completion) before releasing to payroll/claims.
          </p>
        </div>
        <button className="bg-brand-teal text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors">
          Approve All Clean Visits
        </button>
      </div>

      <div className="space-y-4">
        {/* Scrub Item 1 */}
        <Card className="p-4 shadow-sm border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-900 text-base">Arthur Pendelton</h3>
                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Exception Found</span>
              </div>
              <div className="text-sm text-slate-700 mb-2">
                <strong>Caregiver:</strong> Robert Chen <br/>
                <strong>Date:</strong> Oct 24, 2023 (01:30 PM - 04:30 PM)
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-100 w-max">
                <FileSignature className="w-4 h-4" /> Missing Client Signature
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors">
                Request Signature
              </button>
              <button className="bg-brand-teal text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-teal-600 transition-colors">
                Override & Approve
              </button>
            </div>
          </div>
        </Card>

        {/* Scrub Item 2 */}
        <Card className="p-4 shadow-sm border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-900 text-base">Dorothy Vance</h3>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Clean</span>
              </div>
              <div className="text-sm text-slate-700 mb-2">
                <strong>Caregiver:</strong> Maria Alvarez <br/>
                <strong>Date:</strong> Oct 24, 2023 (08:30 AM - 12:30 PM)
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 p-2 rounded-lg border border-emerald-100 w-max">
                <CheckCircle className="w-4 h-4" /> All tasks completed, signature verified.
              </div>
            </div>
            <button className="bg-brand-teal text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-teal-600 transition-colors">
              Approve Visit
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
