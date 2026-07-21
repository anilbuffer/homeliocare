"use client";

import React, { useState } from "react";
import { ApplicantCard, Applicant } from "./ApplicantCard";
import { Plus } from "lucide-react";

type Stage = "New" | "Interviewing" | "Background Check" | "Offer" | "Hired";

const mockApplicants: Record<Stage, Applicant[]> = {
  "New": [
    { id: "1", name: "Jessica Smith", role: "CNA", appliedDate: "2 days ago", matchScore: 92, tags: ["Dementia Care", "Bilingual"] },
    { id: "2", name: "Michael Chen", role: "HHA", appliedDate: "3 days ago", matchScore: 78, tags: ["Night Shift", "CPR Certified"] },
  ],
  "Interviewing": [
    { id: "3", name: "Sarah Jenkins", role: "RN", appliedDate: "1 week ago", matchScore: 98, tags: ["Wound Care", "IV Certified"] },
  ],
  "Background Check": [
    { id: "4", name: "David Miller", role: "CNA", appliedDate: "2 weeks ago", matchScore: 85, tags: ["Hospice", "Transfer Assistance"] },
  ],
  "Offer": [
    { id: "5", name: "Emily Davis", role: "Companion", appliedDate: "3 weeks ago", matchScore: 90, tags: ["Meal Prep", "Light Housekeeping"] },
  ],
  "Hired": []
};

export function PipelineBoard() {
  const [pipeline, setPipeline] = useState(mockApplicants);

  return (
    <div className="flex gap-6 overflow-x-auto pb-6 w-full h-[calc(100vh-280px)] min-h-[500px] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
      {(Object.keys(pipeline) as Stage[]).map((stage) => (
        <div key={stage} className="flex flex-col min-w-[320px] max-w-[320px] bg-slate-50/50 rounded-2xl border border-slate-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] h-full overflow-hidden">
          {/* Column Header */}
          <div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800">{stage}</h3>
              <span className="bg-slate-200 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {pipeline[stage].length}
              </span>
            </div>
            {stage === "New" && (
              <button className="p-1 text-slate-400 hover:text-brand-teal hover:bg-brand-teal/10 rounded-md transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Column Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/80 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar-thumb]:rounded-full">
            {pipeline[stage].map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} />
            ))}
            
            {pipeline[stage].length === 0 && (
              <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                No applicants
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
