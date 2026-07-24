"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronRight, UserCheck, FileSearch, PhoneCall, CalendarCheck, ShieldAlert, Award } from "lucide-react";
import { CandidateStage } from "@/types/hr";
import clsx from "clsx";

interface StageCount {
  stage: CandidateStage;
  count: number;
  icon: React.ElementType;
  color: string;
}

const stageData: StageCount[] = [
  { stage: "Applied", count: 8, icon: UserCheck, color: "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400" },
  { stage: "Phone Screen", count: 6, icon: PhoneCall, color: "bg-blue-50/70 text-blue-700 border-blue-200 hover:border-blue-400" },
  { stage: "Interview Scheduled", count: 5, icon: CalendarCheck, color: "bg-blue-100/60 text-blue-800 border-blue-300 hover:border-blue-500" },
  { stage: "Background Check", count: 4, icon: ShieldAlert, color: "bg-amber-50/70 text-amber-800 border-amber-200 hover:border-amber-400" },
  { stage: "Offer", count: 3, icon: FileSearch, color: "bg-emerald-50/70 text-emerald-800 border-emerald-200 hover:border-emerald-400" },
  { stage: "Hired", count: 2, icon: Award, color: "bg-brand-teal/10 text-brand-teal border-brand-teal/30 hover:border-brand-teal" },
];

export function RecruitingPipelineSnapshot() {
  const router = useRouter();

  const handleStageClick = (stage: CandidateStage) => {
    router.push(`/hr/recruiting?stage=${encodeURIComponent(stage)}`);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-200 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">Recruiting & Onboarding Pipeline Snapshot</h3>
          <p className="text-xs text-slate-500 mt-0.5">Click any stage to filter the dedicated candidate kanban board.</p>
        </div>
        <button
          onClick={() => router.push("/hr/recruiting")}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-teal hover:text-emerald-700 bg-brand-teal/10 hover:bg-brand-teal/20 px-3 py-1.5 rounded-full transition-all active:scale-95 border border-brand-teal/20 self-start sm:self-auto"
        >
          View Full Board
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-6">
        {stageData.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.stage}
              onClick={() => handleStageClick(item.stage)}
              className={clsx(
                "group p-3.5 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] relative flex flex-col justify-between h-28",
                item.color
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-bold uppercase tracking-wider line-clamp-1">{item.stage}</span>
                <div className="p-1.5 rounded-xl bg-white/80 shadow-xs group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 opacity-80 group-hover:opacity-100" />
                </div>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-black">{item.count}</span>
                <span className="text-[11px] font-bold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  View <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Step indicator arrow */}
              {index < stageData.length - 1 && (
                <div className="hidden lg:block absolute -right-5.5 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
