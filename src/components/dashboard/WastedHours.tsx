"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

export function WastedHours() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="Wasted Hours" action={<span className="text-brand-teal text-sm font-medium">Analysis →</span>} />
      
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <div className="text-5xl font-bold text-slate-800 tracking-tighter">124</div>
          <div className="text-lg text-text-secondary font-medium">hrs</div>
        </div>
        <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-accent-red/10 border border-accent-red/20 text-sm font-semibold text-accent-red shadow-sm">
          Cost: $3,100
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-transform hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:scale-105 cursor-pointer">
          <div className="text-xl font-bold text-slate-800 tracking-tight">82h</div>
          <div className="text-[11px] font-medium text-text-secondary leading-tight mt-1">Early Clock-outs</div>
        </div>
        <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-transform hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:scale-105 cursor-pointer">
          <div className="text-xl font-bold text-slate-800 tracking-tight">31h</div>
          <div className="text-[11px] font-medium text-text-secondary leading-tight mt-1">Late Clock-ins</div>
        </div>
        <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-transform hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:scale-105 cursor-pointer">
          <div className="text-xl font-bold text-slate-800 tracking-tight">11h</div>
          <div className="text-[11px] font-medium text-text-secondary leading-tight mt-1">No-shows</div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Top Offenders</div>
        <div className="space-y-2.5">
          <div className="flex justify-between items-center bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-xl p-3 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow">
            <div className="flex items-center gap-3">
              <Avatar src="https://i.pravatar.cc/150?u=22" fallback="R" size="sm" />
              <div>
                <div className="text-[13px] font-bold text-slate-800 tracking-tight">Richard S.</div>
                <div className="text-[11px] font-medium text-text-secondary mt-0.5">Sched: 40h • Actual: 32h</div>
              </div>
            </div>
            <Badge variant="error" className="shadow-sm">-8h</Badge>
          </div>
          <div className="flex justify-between items-center bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-xl p-3 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow">
            <div className="flex items-center gap-3">
              <Avatar src="https://i.pravatar.cc/150?u=33" fallback="A" size="sm" />
              <div>
                <div className="text-[13px] font-bold text-slate-800 tracking-tight">Amanda L.</div>
                <div className="text-[11px] font-medium text-text-secondary mt-0.5">Sched: 36h • Actual: 30h</div>
              </div>
            </div>
            <Badge variant="error" className="shadow-sm">-6h</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
