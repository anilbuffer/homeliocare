"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Search, UserMinus, AlertTriangle } from "lucide-react";

export default function IntakeDischargePage() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Non-Admits & Discharges</h1>
          <p className="text-sm text-slate-500 mt-1">
            Log and review patients who were not admitted or discharged during the intake process.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors">
          <UserMinus className="w-4 h-4" />
          Log Non-Admit
        </button>
      </div>

      <Card className="p-0 overflow-hidden shadow-sm border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Patient Name</th>
                <th className="px-4 py-3">Date logged</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Logged By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-900">Susan Connor</td>
                <td className="px-4 py-3">Oct 24, 2023</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-100 text-xs font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" /> Outside Service Area
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">Jane Smith</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-900">Michael Trennor</td>
                <td className="px-4 py-3">Oct 22, 2023</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 text-red-700 border border-red-100 text-xs font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" /> Insurance Denied (Medicare exhausted)
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">Jane Smith</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
