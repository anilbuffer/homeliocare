"use client";

import React from "react";
import { User, Calendar, Star, FileText } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export function SupervisorEvalCard() {
  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-subtle">
        <h3 className="text-lg font-medium text-text-primary">Recent Supervisor Home Visits</h3>
        <button className="text-sm font-medium text-brand-teal hover:text-brand-teal-hover transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-100/50 [&::-webkit-scrollbar-thumb]:rounded-full">
        {/* Sample Eval 1 */}
        <div className="p-4 rounded-xl border border-border-subtle bg-slate-50/50 hover:border-border-subtle transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar fallback="M" className="w-10 h-10 rounded-full bg-slate-100" />
              <div>
                <div className="text-sm font-medium text-text-primary">Marcus Johnson</div>
                <div className="text-xs text-text-secondary">Caregiver</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg text-sm font-medium">
              <Star className="w-4 h-4 fill-emerald-400" />
              4.8
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-3">
            <div className="flex items-center gap-2 text-xs text-text-primary">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Patient: Eleanor Vance
            </div>
            <div className="flex items-center gap-2 text-xs text-text-primary">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Jul 14, 2026
            </div>
          </div>

          <div className="text-xs text-text-secondary flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-border-subtle">
            <FileText className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p>Excellent bedside manner. Followed safety protocols for transfer exactly as per care plan. Patient expressed high satisfaction.</p>
          </div>
        </div>

        {/* Sample Eval 2 */}
        <div className="p-4 bg-white backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar fallback="S" className="w-10 h-10 rounded-full bg-slate-100" />
              <div>
                <div className="text-sm font-medium text-text-primary">Sarah Thompson</div>
                <div className="text-xs text-text-secondary">RN Supervisor</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg text-sm font-medium">
              <Star className="w-4 h-4 fill-amber-400" />
              3.5
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-3">
            <div className="flex items-center gap-2 text-xs text-text-primary">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Patient: Robert Chen
            </div>
            <div className="flex items-center gap-2 text-xs text-text-primary">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Jul 12, 2026
            </div>
          </div>

          <div className="text-xs text-text-secondary flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-border-subtle shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <FileText className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p>Needs improvement on documentation timeliness. Discussed best practices for charting at the end of the shift.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
