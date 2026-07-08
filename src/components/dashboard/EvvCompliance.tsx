"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AlertCircle } from "lucide-react";

export function EvvCompliance() {
  const compliance = 98.2;
  const data = [
    { value: compliance },
    { value: 100 - compliance }
  ];

  return (
    <Card className="flex flex-col h-full bg-white">
      <div className="flex justify-between items-start mb-8">
        <h3 className="text-lg font-bold text-slate-900">EVV Compliance</h3>
        <span className="text-brand-teal text-sm font-medium cursor-pointer hover:underline">Exceptions →</span>
      </div>
      
      <div className="flex items-center gap-8 mb-10">
        <div className="relative w-28 h-28 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={54}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell fill="#0EA383" />
                <Cell fill="#E5E9EC" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-[15px] text-slate-900">
            {compliance}%
          </div>
        </div>
        
        <div className="bg-accent-red/10 border border-accent-red/20 rounded-xl p-4 flex-1 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-accent-red mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-bold text-accent-red">14 Visits at Risk</div>
            <div className="text-xs text-accent-red/80 mt-1">Missing EVV data may block billing.</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-auto">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Top Exceptions</div>
        
        <div className="flex justify-between items-center bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow rounded-xl p-3">
          <span className="text-[13px] font-bold text-slate-800">Missing Location</span>
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-accent-red/10 text-accent-red text-xs font-bold shrink-0">8</div>
        </div>
        <div className="flex justify-between items-center bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow rounded-xl p-3">
          <span className="text-[13px] font-bold text-slate-800">Late Clock-out</span>
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-amber-100/60 text-amber-600 text-xs font-bold shrink-0">4</div>
        </div>
        <div className="flex justify-between items-center bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow rounded-xl p-3">
          <span className="text-[13px] font-bold text-slate-800">No Signature</span>
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-amber-100/60 text-amber-600 text-xs font-bold shrink-0">2</div>
        </div>
      </div>
    </Card>
  );
}
