"use client";

import React, { useState } from "react";
import { Patient } from "@/lib/patients/mockData";
import { Card } from "@/components/ui/Card";
import { ClipboardList, Calendar, Clock, User, CheckCircle2, AlertCircle } from "lucide-react";
import { PersonalCareForm } from "@/components/patients/assessments/PersonalCareForm";

export function AssessmentsTab({ patient }: { patient: Patient }) {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Clinical Assessments</h2>
          <p className="text-xs text-slate-500 mt-1">Manage state-specific personal care forms and supervisory visits.</p>
        </div>
        <button
          onClick={() => setIsAssessmentOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-teal hover:bg-teal-700 text-white rounded-full text-sm font-medium transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.04)]"
        >
          <ClipboardList className="w-4 h-4" />
          Start New Assessment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Assessment History */}
        <Card className="p-4">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-brand-teal" />
            Recent Assessments
          </h3>
          <div className="space-y-4">
            {patient.name === "Eleanor Ruth Whitfield" && (
              <div className="px-4 py-3 border border-rose-200 rounded-xl bg-rose-50 hover:bg-rose-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm">Pre-discharge Hospital Assessment</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Location: Cedar Falls Regional, Rm 412</p>
                  </div>
                  <span className="px-2.5 py-1 bg-rose-200 text-rose-800 text-[10px] font-bold rounded-full flex items-center gap-1 uppercase tracking-wider border border-rose-300">
                    <AlertCircle className="w-3 h-3" /> Fall Risk: High
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-600 mt-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Today</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Pending RN Review</span>
                </div>
              </div>
            )}
            <div className="px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-slate-900 text-sm">Initial Personal Care Assessment</h4>
                  <p className="text-xs text-slate-500 mt-0.5">State Form ID: PC-101A</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Signed
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-600 mt-4">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Jun 15, 2026</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Sarah Jenkins (RN)</span>
              </div>
            </div>
            <div className="px-4 py-3 border border-amber-200 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-slate-900 text-sm">60-Day Reassessment</h4>
                  <p className="text-xs text-slate-500 mt-0.5">State Form ID: PC-102B</p>
                </div>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Due Soon
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-600 mt-4">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Aug 14, 2026</span>
                <span className="flex items-center gap-1">Action Required</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Supervisory Visit Schedule */}
        <Card className="p-4">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-brand-teal" />
            Supervisory Visit Schedule
          </h3>
          <p className="text-xs text-slate-600 mb-3">
            Non-medical personal care requires a supervisory visit every 60 days to evaluate caregiver performance and care plan adherence.
          </p>

          <div className="relative pl-6 border-l-2 border-slate-100 space-y-4">
            <div className="relative">
              <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[29px] top-1 ring-4 ring-white" />
              <div className="font-medium text-slate-900 text-sm">Completed Visit</div>
              <div className="text-xs text-slate-500 mt-2 flex flex-col gap-1">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Jun 20, 2026 at 10:00 AM</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Supervisor: Marcus T.</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute w-3 h-3 bg-brand-teal rounded-full -left-[29px] top-1 ring-4 ring-white" />
              <div className="font-medium text-slate-900 text-sm">Next Scheduled Visit</div>
              <div className="text-xs text-slate-500 mt-2 flex flex-col gap-1">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Aug 18, 2026</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Unassigned time</span>
              </div>
              <button onClick={() => setIsAssessmentOpen(true)} className="mt-4 text-xs font-semibold text-brand-teal hover:text-teal-700">Schedule Now</button>
            </div>
          </div>
        </Card>
      </div>

      <PersonalCareForm
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        patientName={patient.name}
      />
    </div>
  );
}
