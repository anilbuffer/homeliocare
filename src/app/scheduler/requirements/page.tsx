"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Calendar, User, FileText, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SchedulerRequirementsPage() {
  const router = useRouter();

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Scheduling Requirements</h1>
          <p className="text-sm text-slate-500 mt-1">
            Newly signed Care Plans requiring shifts to be generated and staffed.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Requirement 1 */}
        <Card className="p-4 shadow-sm border-brand-teal/20 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal mt-1">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Robert Johnson</h3>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400"/> Frequency: 3 days/wk, 4 hrs/day</span>
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-slate-400"/> Requires: HHA, Hoyer Lift</span>
                </div>
                <div className="text-xs text-brand-teal mt-2 font-semibold">Care Plan Signed: Today, 10:30 AM</div>
              </div>
            </div>
            <button 
              onClick={() => router.push('/scheduler/dispatch/optimizer')}
              className="bg-brand-teal text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Generate Shifts <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
