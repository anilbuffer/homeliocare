"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Sparkles, Users, ShieldAlert, TrendingUp, AlertCircle, FileText } from "lucide-react";

export function AiInsights() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader 
        title="All Insights"
        action={
          <button className="flex items-center gap-2 bg-[#e6f6f4] text-brand-teal px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-brand-teal/20 transition-colors">
            <Sparkles className="w-3 h-3" />
            Sidekick
          </button>
        } 
      />
      
      <div className="flex-1 flex flex-col gap-3 mt-4 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {/* Staffing */}
        <div className="flex gap-4 p-4 bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-2xl transition-all hover:-translate-y-0.5 cursor-pointer group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0 border border-brand-teal/20 shadow-inner group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-slate-800 mb-1 leading-tight">Staffing</div>
            <div className="text-[11.5px] font-medium text-text-secondary leading-snug">3 caregivers needed in the Mission district by Thursday. Predicted demand from 4 new intakes.</div>
          </div>
        </div>

        {/* Compliance */}
        <div className="flex gap-4 p-4 bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-2xl transition-all hover:-translate-y-0.5 cursor-pointer group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center shrink-0 border border-accent-blue/20 shadow-inner group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-slate-800 mb-1 leading-tight">Compliance</div>
            <div className="text-[11.5px] font-medium text-text-secondary leading-snug">2 CPR certifications expiring within 14 days. Automated reminders queued.</div>
          </div>
        </div>

        {/* Risk */}
        <div className="flex gap-4 p-4 bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-2xl transition-all hover:-translate-y-0.5 cursor-pointer group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-accent-orange/10 text-accent-orange flex items-center justify-center shrink-0 border border-accent-orange/20 shadow-inner group-hover:scale-110 transition-transform">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-slate-800 mb-1 leading-tight">Risk</div>
            <div className="text-[11.5px] font-medium text-text-secondary leading-snug">Patient Robert Alvarez fall risk increased — recommend care plan review. <span className="text-accent-orange font-semibold">Authorization expires in 5 days</span> — renewal request not yet submitted.</div>
          </div>
        </div>

        {/* Financial */}
        <div className="flex gap-4 p-4 bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-2xl transition-all hover:-translate-y-0.5 cursor-pointer group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-accent-amber/10 text-accent-amber flex items-center justify-center shrink-0 border border-accent-amber/20 shadow-inner group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-slate-800 mb-1 leading-tight">Financial</div>
            <div className="text-[11.5px] font-medium text-text-secondary leading-snug">3 Medicaid claims denied this week — authorization code mismatch. Review before timely filing deadline (12 days).</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
