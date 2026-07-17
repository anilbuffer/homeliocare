"use client";

import React from "react";
import { Check, X, FileText, Clock } from "lucide-react";
import { VerificationQueueItem } from "@/types/compliance";

interface VerificationQueueProps {
  items: VerificationQueueItem[];
}

export function VerificationQueue({ items }: VerificationQueueProps) {
  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      <div className="pb-4 border-b border-slate-200 flex items-center justify-between bg-white/50">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-teal" />
          Verification Queue
        </h3>
        <span className="bg-brand-teal/20 text-brand-teal text-xs font-bold px-2 py-1 rounded-full">
          {items.length} Pending
        </span>
      </div>

      <div className="flex-1 overflow-auto divide-y divide-slate-100 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        {items.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center justify-center text-slate-500 h-full">
            <Check className="w-16 h-16 text-emerald-500/20 mb-4" />
            <p className="text-sm font-medium">No documents pending verification.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="p-4 hover:bg-slate-50/80 transition-colors duration-200 group">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="w-12 h-14 bg-slate-50 rounded-xl border border-slate-200 shadow-inner flex items-center justify-center group-hover:border-brand-teal/30 transition-colors">
                    <FileText className="w-6 h-6 text-slate-400 group-hover:text-brand-teal transition-colors" />
                  </div>
                  <img src={item.caregiver.avatarUrl} alt={item.caregiver.name} className="w-6 h-6 rounded-full border-2 border-white absolute -bottom-2 -right-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" />
                </div>
                <div className="flex-1 min-w-0 mt-0.5">
                  <div className="text-sm font-medium text-slate-900 truncate">{item.caregiver.name}</div>
                  <div className="text-xs text-brand-teal truncate mb-1">{item.documentType}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    Uploaded {new Date(item.uploadDate).toLocaleDateString('en-US')}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0 ml-3">
                  <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-500 border border-slate-200 hover:border-emerald-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-200 flex items-center justify-center" title="Approve">
                    <Check className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 hover:border-red-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-200 flex items-center justify-center" title="Reject">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
