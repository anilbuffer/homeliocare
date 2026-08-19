"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Search, ClipboardList, Clock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PendingAssessmentsPage() {
  const router = useRouter();

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pending Initial Assessments</h1>
          <p className="text-sm text-slate-500 mt-1">
            Patients admitted by Intake awaiting RN initial assessment and Care Plan creation.
          </p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal w-full sm:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Patient 1 */}
        <Card className="p-4 shadow-sm border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-900 text-lg">Mary Williams</h3>
              <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">High Priority</span>
            </div>
            <div className="text-sm text-slate-600 mb-4">
              <strong>Admitted:</strong> Today, 9:00 AM <br />
              <strong>Condition:</strong> Post-op recovery, mobility issues. <br />
              <strong>Location:</strong> Bronx, NY
            </div>
          </div>
          <button 
            onClick={() => router.push('/patients/p-1')}
            className="w-full bg-brand-teal text-white py-2 rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
          >
            <ClipboardList className="w-4 h-4" /> Start Assessment <ArrowRight className="w-4 h-4" />
          </button>
        </Card>

        {/* Patient 2 */}
        <Card className="p-4 shadow-sm border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-900 text-lg">James Ford</h3>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3"/> 2 Days Waiting</span>
            </div>
            <div className="text-sm text-slate-600 mb-4">
              <strong>Admitted:</strong> Oct 22, 2:30 PM <br />
              <strong>Condition:</strong> Dementia, needs ADL support. <br />
              <strong>Location:</strong> Brooklyn, NY
            </div>
          </div>
          <button 
            onClick={() => router.push('/patients/p-2')}
            className="w-full bg-brand-teal text-white py-2 rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
          >
            <ClipboardList className="w-4 h-4" /> Start Assessment <ArrowRight className="w-4 h-4" />
          </button>
        </Card>
      </div>
    </div>
  );
}
