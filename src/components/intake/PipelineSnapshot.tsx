"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Filter, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/components/ui/Card";

export function PipelineSnapshot() {
  const router = useRouter();

  const funnelStages = [
    { name: "New Inquiry", count: 12, color: "bg-blue-500" },
    { name: "Qualifying", count: 8, color: "bg-indigo-500" },
    { name: "Assessment Scheduled", count: 5, color: "bg-purple-500" },
    { name: "Assessment Complete", count: 3, color: "bg-fuchsia-500" },
    { name: "Care Plan Pending Sig.", count: 4, color: "bg-pink-500" },
    { name: "Active Client", count: 2, color: "bg-brand-teal" },
  ];

  const maxCount = Math.max(...funnelStages.map(s => s.count));

  return (
    <Card className="flex flex-col h-full bg-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Pipeline Snapshot</h3>
            <p className="text-[11px] text-slate-500">Current funnel stages</p>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-center gap-3">
        {funnelStages.map((stage, idx) => {
          const widthPercent = Math.max(15, (stage.count / maxCount) * 100);
          return (
            <div key={idx} onClick={() => router.push('/intake/patients')} className="group relative flex items-center gap-3 cursor-pointer">
              <div className="w-32 shrink-0 text-[11px] font-semibold text-slate-600 truncate text-right">
                {stage.name}
              </div>
              <div className="flex-1 flex items-center h-6 bg-slate-100 rounded-r-md relative">
                <div 
                  className={cn("h-full rounded-r-md transition-all duration-1000 ease-out", stage.color)}
                  style={{ width: `${widthPercent}%` }}
                />
                <span className="absolute left-2 text-[10px] font-bold text-white drop-shadow-md">
                  {stage.count}
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
