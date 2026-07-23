"use client";

import React, { useState } from "react";
import { HRNavHeader } from "@/components/caregivers/HRNavHeader";
import { OnboardingList } from "@/components/caregivers/onboarding/OnboardingList";
import { Users, FileCheck, AlertCircle, Sparkles, FilterX } from "lucide-react";
import { cn } from "@/components/ui/Card";

export default function OnboardingPage() {
  const [activeKpiFilter, setActiveKpiFilter] = useState<"all" | "completed" | "missing">("all");

  return (
    <div className="w-full mx-auto space-y-6">
      <HRNavHeader activeTab="onboarding" />

      {/* Interactive KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: All in Onboarding */}
        <button
          onClick={() => setActiveKpiFilter(activeKpiFilter === "all" ? "all" : "all")}
          className={cn(
            "text-left bg-white rounded-2xl p-5 border transition-all shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex items-center justify-between group focus:outline-none",
            activeKpiFilter === "all"
              ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-100"
              : "border-slate-200 hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
          )}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-800">12</div>
              <div className="text-sm text-slate-500 font-medium">In Onboarding</div>
            </div>
          </div>
          {activeKpiFilter === "all" && (
            <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Active View
            </span>
          )}
        </button>

        {/* Card 2: Completed this week */}
        <button
          onClick={() => setActiveKpiFilter(activeKpiFilter === "completed" ? "all" : "completed")}
          className={cn(
            "text-left bg-white rounded-2xl p-5 border transition-all shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex items-center justify-between group focus:outline-none",
            activeKpiFilter === "completed"
              ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50"
              : "border-slate-200 hover:border-emerald-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
          )}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-800">5</div>
              <div className="text-sm text-slate-500 font-medium">Completed this week</div>
            </div>
          </div>
          {activeKpiFilter === "completed" && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Filtered
            </span>
          )}
        </button>

        {/* Card 3: Missing Documents */}
        <button
          onClick={() => setActiveKpiFilter(activeKpiFilter === "missing" ? "all" : "missing")}
          className={cn(
            "text-left bg-white rounded-2xl p-5 border transition-all shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex items-center justify-between group focus:outline-none",
            activeKpiFilter === "missing"
              ? "border-rose-500 ring-2 ring-rose-500/20 bg-rose-100"
              : "border-slate-200 hover:border-rose-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
          )}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-800">3</div>
              <div className="text-sm text-slate-500 font-medium">Missing Documents</div>
            </div>
          </div>
          {activeKpiFilter === "missing" && (
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Filtered
            </span>
          )}
        </button>
      </div>

      {/* Main Table List */}
      <OnboardingList
        activeKpiFilter={activeKpiFilter}
        onSelectKpiFilter={(filter) => setActiveKpiFilter(filter)}
      />
    </div>
  );
}
