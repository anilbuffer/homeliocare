"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { AlertTriangle, FileText, CheckCircle2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function BottomGlance() {
  return (
    <Card className="flex flex-col p-4 shrink-0 overflow-visible bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <div className="text-base font-semibold text-slate-800 mb-2">At a glance</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-4 items-center">
        {/* Item 1 */}
        <div className="flex items-center gap-3 bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-2xl p-3.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 group">
          <div className="relative w-20 h-20 shrink-0 transition-transform duration-300 group-hover:scale-110">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ value: 87 }, { value: 13 }]} cx="50%" cy="50%" innerRadius={26} outerRadius={34} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
                  <Cell fill="#0EA383" />
                  <Cell fill="#E5E9EC" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-base text-slate-800">
              87%
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-text-secondary leading-tight mb-1 truncate">Caregiver Util.</div>
            <div className="font-bold text-2xl text-slate-800 tracking-tight leading-none mb-1.5">87%</div>
            <div className="text-[11px] font-semibold text-text-secondary inline-flex px-1.5 py-0.5 rounded-md bg-white/60 shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-white/50">Target: 85%</div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-center gap-3 bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-2xl p-3.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 group">
          {/* <div className="w-12 h-12 rounded-xl bg-accent-orange/10 text-accent-orange flex items-center justify-center shrink-0 border border-accent-orange/20 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <AlertTriangle className="w-5 h-5" />
          </div> */}
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-text-secondary leading-tight mb-1 truncate">Compliance alerts</div>
            <div className="font-bold text-2xl text-slate-800 tracking-tight leading-none mb-1.5">7 <span className="text-base text-slate-500 font-medium tracking-normal">total</span></div>
            <div className="text-[11px] font-semibold text-accent-orange inline-flex px-1.5 py-0.5 rounded-md bg-accent-orange/10 border border-accent-orange/20">2 require review</div>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-center gap-3 bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-2xl p-3.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 group">
          {/* <div className="relative w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-110">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ value: 98.2 }, { value: 1.8 }]} cx="50%" cy="50%" innerRadius={15} outerRadius={22} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
                  <Cell fill="#3B82F6" />
                  <Cell fill="#E5E9EC" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue opacity-80" />
            </div>
          </div> */}
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-text-secondary leading-tight mb-1 truncate">Avg completion</div>
            <div className="font-bold text-2xl text-slate-800 tracking-tight leading-none mb-1.5">98.2%</div>
            <div className="text-[11px] font-semibold text-accent-green inline-flex px-1.5 py-0.5 rounded-md bg-accent-green/10 border border-accent-green/20">+ 1.2%</div>
          </div>
        </div>

        {/* Item 4 */}
        <div className="flex items-center gap-3 bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-2xl p-3.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 group">
          {/* <div className="w-12 h-12 rounded-xl bg-accent-red/10 text-accent-red flex items-center justify-center shrink-0 border border-accent-red/20 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <FileText className="w-5 h-5" />
          </div> */}
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-text-secondary leading-tight mb-1 truncate">Unbilled visits</div>
            <div className="font-bold text-2xl text-slate-800 tracking-tight leading-none mb-1.5">23</div>
            <div className="text-[11px] font-semibold text-accent-red inline-flex px-1.5 py-0.5 rounded-md bg-accent-red/10 border border-accent-red/20">$4,200 at risk</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
