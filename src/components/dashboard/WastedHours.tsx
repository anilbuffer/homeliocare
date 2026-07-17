"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

export function WastedHours() {
  return (
    <Card className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Wasted Hours</h3>
          <p className="text-sm text-text-secondary mt-0.5">Schedule vs actual EVV — this week</p>
        </div>
        <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-100 text-xs font-semibold text-amber-600 shrink-0">
          Cost leakage
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1.5 mb-1">
          <div className="text-[40px] leading-none font-bold text-amber-500 tracking-tighter">14.6</div>
          <div className="text-2xl text-amber-500 font-medium">hrs</div>
        </div>
        <div className="text-[13px] text-text-secondary">Est. cost impact <span className="font-bold text-slate-900">$467</span></div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Late Clock-ins</div>
          <div className="text-base font-bold text-slate-900 tracking-tight">9.2 hrs</div>
        </div>
        <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Early Clock-outs</div>
          <div className="text-base font-bold text-slate-900 tracking-tight">3.1 hrs</div>
        </div>
        <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Late Clock-outs</div>
          <div className="text-base font-bold text-slate-900 tracking-tight">2.3 hrs</div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Top Offenders</div>
        <div className="space-y-2.5">
          <div className="flex justify-between items-center bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-xl p-3 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow">
            <div>
              <div className="text-[13px] font-medium text-slate-800 tracking-tight mb-0.5">Carlos Mendez</div>
              <div className="text-[11px] text-text-secondary">Schedule 08:00 → 12:00 • Actual 08:24 → 11:48</div>
            </div>
            <div className="px-2.5 py-1 bg-amber-100/60 text-amber-600 border border-amber-200/50 rounded-full text-[11px] font-semibold shrink-0">-36m</div>
          </div>
          <div className="flex justify-between items-center bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-xl p-3 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow">
            <div>
              <div className="text-[13px] font-medium text-slate-800 tracking-tight mb-0.5">Rachel Kim</div>
              <div className="text-[11px] text-text-secondary">Schedule 09:00 → 13:00 • Actual 09:18 → 12:52</div>
            </div>
            <div className="px-2.5 py-1 bg-amber-100/60 text-amber-600 border border-amber-200/50 rounded-full text-[11px] font-semibold shrink-0">-26m</div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Link href="/scheduling"><span className="text-brand-teal text-sm font-medium cursor-pointer hover:underline">View all wasted-time exceptions →</span></Link>
      </div>
    </Card>
  );
}
