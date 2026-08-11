"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft } from "lucide-react";
import clsx from "clsx";

interface CarePlanSignOffProps {
  onComplete: () => void;
  onBack?: () => void;
}

const SECTIONS = [
  "1. Patient Identification",
  "2. Overview & Background",
  "3. Conditions & History",
  "4. Medication Management",
  "5. Functional — ADLs",
  "6. Functional — IADLs",
  "7. Cognitive & Psychosocial",
  "8. Nutrition & Hydration",
  "9. Safety & Risk",
  "10. Care Needs & Priorities",
  "11. Goals & Expected Outcomes",
  "12. Care Interventions",
  "13. Caregiver Instructions",
  "14. Care Team & Appointments"
];

export function CarePlanSignOff({ onComplete, onBack }: CarePlanSignOffProps) {
  const [attested, setAttested] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col w-full animate-in fade-in zoom-in-95 duration-500 pb-10">
        <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-2xl flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-12 h-12 bg-brand-teal text-white rounded-full flex items-center justify-center mb-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] shadow-brand-teal/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Care plan finalized</h2>
          <p className="text-sm text-slate-600 mb-2">
            Version 1.0 saved to Evelyn Harper's chart and locked for edits.
          </p>
          <p className="text-xs text-slate-400 mb-4">
            Signed by Rachel Miller, RN • 8/11/2026, 12:14:32 PM
          </p>
          <button
            onClick={onComplete}
            className="bg-brand-teal text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] shadow-brand-teal/20 hover:bg-brand-teal/90 transition-all"
          >
            Start another assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col w-full animate-in fade-in zoom-in-95 duration-500 pb-10">
      {onBack && (
        <div className="flex mb-4">
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" /> Back
          </button>
        </div>
      )}
      {/* Top Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center">
          <div className="text-xl font-bold text-brand-teal mb-1">18/18</div>
          <div className="text-xs font-medium text-slate-500">Sections complete</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center">
          <div className="text-xl font-bold text-brand-teal mb-1">91%</div>
          <div className="text-xs font-medium text-slate-500">Avg. AI confidence</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center">
          <div className="text-xl font-bold text-brand-teal mb-1">0</div>
          <div className="text-xs font-medium text-slate-500">Unresolved flags</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">

        {/* Left: Final Review Checklist */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-base font-semibold text-slate-900">Final Review Checklist</h3>
          </div>
          <div className="p-4 flex-1 overflow-y-auto custom-scrollbar space-y-2">
            {SECTIONS.map((section, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-1.5" />
                <div>
                  <span className="font-semibold text-sm text-slate-700">{section}</span>
                  <span className="text-slate-500 text-sm ml-2">— reviewed and confirmed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sign-Offs */}
        <div className="flex flex-col gap-4 h-fit sticky top-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">RN Sign-Off</h3>
            <p className="text-xs text-slate-500 mb-6">
              Your signature certifies clinical accuracy of every field in this care plan.
            </p>

            <label className="flex items-start gap-3 mb-6 cursor-pointer group">
              <div className="pt-0.5">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-brand-teal border-slate-300 rounded focus:ring-brand-teal mt-0.5"
                  checked={attested}
                  onChange={(e) => setAttested(e.target.checked)}
                />
              </div>
              <span className="text-xs text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                I, Rachel Miller RN, confirm this care plan accurately reflects my clinical assessment of Evelyn Harper and is ready to be filed.
              </span>
            </label>

            <div className="border border-dashed border-slate-300 bg-slate-50 rounded-xl p-6 mb-6 flex flex-col items-center justify-center min-h-[120px]">
              {attested ? (
                <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Signature</span>
                  <span className="font-[cursive] text-3xl text-slate-800 -rotate-2">Rachel Miller, RN</span>
                </div>
              ) : (
                <span className="text-xs font-medium text-slate-400">Attest above to sign</span>
              )}
            </div>

            <button
              onClick={() => {
                if (attested) setIsSuccess(true);
              }}
              disabled={!attested}
              className={clsx(
                "w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2",
                attested
                  ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20 hover:bg-brand-teal/90"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
            >
              {attested ? <ShieldCheck className="w-4 h-4" /> : null}
              Sign & Finalize Care Plan
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">POA / Client Sign-Off</h3>
            <p className="text-xs text-slate-500 mb-6">Electronic signature capture for Legal POA.</p>
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 mb-4">
              <p className="text-sm font-medium text-slate-700">Signed by: Margaret "Meg" Whitfield-Cho (POA)</p>
              <p className="text-xs text-slate-500">Date: Pending</p>
            </div>
            <button className="w-full py-2 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors">Capture POA Signature</button>
          </div>

          <div className="bg-amber-50 rounded-2xl border border-amber-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Physician Co-Sign</h3>
            <p className="text-xs text-amber-700 mb-3 leading-relaxed">Care started — physician co-sign outstanding. Required within 14 days per PA regulation.</p>
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold rounded-full w-fit">Status: Pending</span>
          </div>
        </div>

      </div>
    </div>
  );
}
