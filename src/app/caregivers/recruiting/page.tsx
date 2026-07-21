"use client";

import React from "react";
import { HRNavHeader } from "@/components/caregivers/HRNavHeader";
import { PipelineBoard } from "@/components/caregivers/recruiting/PipelineBoard";
import { Search, Filter, Plus } from "lucide-react";

export default function RecruitingPage() {
  return (
    <div className="w-full mx-auto space-y-6">
      <HRNavHeader activeTab="recruiting" />

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search applicants by name, role, or skills..."
              className="w-full pl-9 pr-4 py-2.5 bg-white rounded-full border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>
          <button className="px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium whitespace-nowrap">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
        <button className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap">
          <Plus className="w-4 h-4" />
          Add Applicant
        </button>
      </div>

      {/* Pipeline Board */}
      <PipelineBoard />
    </div>
  );
}
