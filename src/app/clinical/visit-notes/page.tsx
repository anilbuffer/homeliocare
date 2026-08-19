"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { FileText, CheckCircle } from "lucide-react";

export default function ClinicalVisitNotesPage() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Visit Notes Review</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and sign off on clinical notes submitted by caregivers and LPNs.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="p-4 shadow-sm border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-900">Dorothy Vance</h3>
              <p className="text-xs text-slate-500 mt-1">Submitted by: Maria Alvarez (HHA) on Oct 24, 2023</p>
              <div className="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-slate-700 italic border border-slate-100">
                "Patient reported mild dizziness when standing up today. Assisted with mobility. Otherwise stable."
              </div>
            </div>
            <button className="bg-brand-teal text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-teal-600 transition-colors flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle className="w-3.5 h-3.5" /> Acknowledge
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
