"use client";

import React from "react";
import { Shield, ShieldAlert, CheckCircle, ExternalLink, Clock, RefreshCw } from "lucide-react";

export function BackgroundCheckWidget() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-teal" />
          Background & Screening
        </h3>
        <button className="text-xs font-medium text-brand-teal hover:text-teal-700 flex items-center gap-1">
          <RefreshCw className="w-3 h-3" /> Run Checks
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Checkr / Sterling */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Criminal Background Check</h4>
              <p className="text-xs text-slate-500 mt-0.5">Provider: Checkr • Last run: Jul 15, 2026</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded border border-emerald-200">
            Clear
          </span>
        </div>

        {/* OIG / SAM Exclusion List */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">OIG/SAM Exclusion List</h4>
              <p className="text-xs text-slate-500 mt-0.5">Monthly Medicaid Requirement</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded border border-amber-200">
            Pending
          </span>
        </div>

        {/* State Registry */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">State Nurse Aide Registry</h4>
              <p className="text-xs text-slate-500 mt-0.5">Automated Sync</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded border border-red-200">
              Flagged
            </span>
            <button className="text-[10px] text-slate-400 hover:text-brand-teal flex items-center gap-1">
              View Details <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
