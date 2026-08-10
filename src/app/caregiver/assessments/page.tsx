"use client";

import React from "react";
import { CaregiverLayout } from "@/components/caregiver/CaregiverLayout";
import { AssessmentForm } from "@/components/clinical/AssessmentForm";

export default function CaregiverDailyAssessmentPage() {
  return (
    <CaregiverLayout>
      <div className="w-full space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Daily Assessment</h2>
            <p className="text-sm text-slate-500 mt-1">
              Complete the daily assessment for your assigned client. Ensure all observations are logged accurately.
            </p>
          </div>

          <div className="mt-4">
            <AssessmentForm />
          </div>
        </div>
      </div>
    </CaregiverLayout>
  );
}
