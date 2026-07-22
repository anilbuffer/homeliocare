"use client";

import React from "react";
import { HRNavHeader } from "@/components/caregivers/HRNavHeader";
import { OnboardingList } from "@/components/caregivers/onboarding/OnboardingList";
import { Users, FileCheck, AlertCircle } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="w-full mx-auto space-y-6">
      <HRNavHeader activeTab="onboarding" />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-800">12</div>
            <div className="text-sm text-slate-500 font-medium">In Onboarding</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-800">5</div>
            <div className="text-sm text-slate-500 font-medium">Completed this week</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-800">3</div>
            <div className="text-sm text-slate-500 font-medium">Missing Documents</div>
          </div>
        </div>
      </div>

      <OnboardingList />
    </div>
  );
}
