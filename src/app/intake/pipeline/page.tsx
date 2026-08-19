"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Search, UserPlus, FileText, CheckCircle, Clock } from "lucide-react";

export default function IntakePipelinePage() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Referral Pipeline</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and manage patient inquiries from lead to admission.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-brand-teal text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors">
          <UserPlus className="w-4 h-4" />
          New Inquiry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700 text-sm">New Referrals</span>
            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">3</span>
          </div>
          <Card className="p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-brand-teal">
            <div className="font-semibold text-slate-900">John Doe</div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Clock className="w-3 h-3"/> 2 hrs ago</div>
          </Card>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
            <span className="font-semibold text-amber-800 text-sm">Insurance Verification</span>
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">1</span>
          </div>
          <Card className="p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-amber-500">
            <div className="font-semibold text-slate-900">Alice Smith</div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-1"><FileText className="w-3 h-3"/> Pending Medicaid auth</div>
          </Card>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-200">
            <span className="font-semibold text-indigo-800 text-sm">Ready for Admission</span>
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-bold">2</span>
          </div>
          <Card className="p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-indigo-500">
            <div className="font-semibold text-slate-900">Robert Johnson</div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-1"><CheckCircle className="w-3 h-3"/> Documents signed</div>
          </Card>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
            <span className="font-semibold text-emerald-800 text-sm">Admitted (Pending RN)</span>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold">1</span>
          </div>
          <Card className="p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-emerald-500">
            <div className="font-semibold text-slate-900">Mary Williams</div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-1 text-emerald-600 font-medium"><CheckCircle className="w-3 h-3"/> Sent to Clinical</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
