"use client";

import React from "react";
import { HRNavHeader } from "@/components/caregivers/HRNavHeader";
import { TimeOffTable } from "@/components/caregivers/time-off/TimeOffTable";
import { Clock, CalendarCheck, CalendarX } from "lucide-react";

export default function TimeOffPage() {
  return (
    <div className="w-full mx-auto space-y-6">
      <HRNavHeader activeTab="time-off" />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-800">1</div>
            <div className="text-sm text-slate-500 font-medium">Pending Requests</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-800">12</div>
            <div className="text-sm text-slate-500 font-medium">Approved this month</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <CalendarX className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-800">2</div>
            <div className="text-sm text-slate-500 font-medium">Caregivers on leave today</div>
          </div>
        </div>
      </div>

      <TimeOffTable />
    </div>
  );
}
