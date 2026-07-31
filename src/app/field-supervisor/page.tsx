"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { FieldSupervisorKpiStrip } from "../../components/supervisor/FieldSupervisorKpiStrip";
import { VisitDueQueue } from "../../components/supervisor/VisitDueQueue";
import { FindingsFollowUpQueue } from "../../components/supervisor/FindingsFollowUpQueue";
import { MyTeamSnapshot } from "../../components/supervisor/MyTeamSnapshot";
import { RecentIncidentsFiled } from "../../components/supervisor/RecentIncidentsFiled";

export default function FieldSupervisorDashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-4 w-full">
      {/* Header Banner */}
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
            Good morning, {currentUser?.name?.split(",")[0] || "Supervisor"}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            You have <span className="text-brand-teal font-semibold">12 visits due</span> this week and <span className="text-accent-red font-semibold">2 overdue</span>.
          </p>
        </div>
      </div>

      {/* Row 1 - KPI Strip */}
      <FieldSupervisorKpiStrip />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-stretch">
        <div className="xl:col-span-2 flex flex-col gap-4">
          {/* Row 2 - Visit Queue */}
          <div className="flex-1 min-h-[300px]">
            <VisitDueQueue />
          </div>

          {/* Row 3 - Findings Follow-Up */}
          <div className="flex-1 min-h-[300px]">
            <FindingsFollowUpQueue />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Row 4 - My Team Snapshot */}
          <div className="flex-1 min-h-[300px]">
            <MyTeamSnapshot />
          </div>

          {/* Row 5 - Recent Incidents */}
          <div className="flex-1 min-h-[300px]">
            <RecentIncidentsFiled />
          </div>
        </div>
      </div>
    </div>
  );
}
