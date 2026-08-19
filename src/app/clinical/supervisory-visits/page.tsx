"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Calendar, AlertCircle } from "lucide-react";

export default function SupervisoryVisitsPage() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Supervisory Visits Tracker</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track mandatory 60/90-day RN supervisory visits for active caregivers.
          </p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden shadow-sm border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Caregiver</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Last Visit</th>
                <th className="px-4 py-3">Next Due</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-900">Maria Alvarez</td>
                <td className="px-4 py-3 text-slate-700">Dorothy Vance</td>
                <td className="px-4 py-3">Aug 15, 2023</td>
                <td className="px-4 py-3 font-semibold text-slate-800">Oct 14, 2023</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-bold uppercase">
                    <AlertCircle className="w-3.5 h-3.5" /> Due Soon
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-brand-teal text-xs font-semibold hover:underline">Schedule</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-900">Robert Chen</td>
                <td className="px-4 py-3 text-slate-700">Frank Delaney</td>
                <td className="px-4 py-3">Sep 01, 2023</td>
                <td className="px-4 py-3 font-semibold text-slate-800">Oct 31, 2023</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold uppercase">
                    <Calendar className="w-3.5 h-3.5" /> Compliant
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-brand-teal text-xs font-semibold hover:underline">View Log</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
