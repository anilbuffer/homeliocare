"use client";

import React from "react";
import { Check, Circle, Loader2 } from "lucide-react";
import { StateConfig } from "@/types/evv";

export function AltEVVCertification({ status }: { status: StateConfig['altEvvStatus'] }) {
  const steps = [
    { label: "Not Started", value: "Not Started" },
    { label: "Testing", value: "Testing" },
    { label: "Vendor Approved", value: "Vendor Approved" },
    { label: "Active", value: "Active" },
  ];

  const currentStepIndex = steps.findIndex(s => s.value === status) || 0;

  return (
    <div className="mt-8 border-t border-slate-100/50 pt-8">
      <h3 className="text-sm font-semibold text-slate-900 mb-6 flex items-center gap-2">
        Alt-EVV Certification Status
      </h3>
      <div className="relative">
        <div className="absolute top-5 left-0 w-full h-[3px] bg-slate-100 rounded-full z-0" />
        <div 
          className="absolute top-5 left-0 h-[3px] bg-brand-teal rounded-full z-0 transition-all duration-700 ease-in-out" 
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />
        
        <div className="relative z-10 flex justify-between">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            
            return (
              <div key={step.value} className="flex flex-col items-center w-24">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-[3px] bg-white transition-all duration-500 shadow-sm ${
                  isCompleted ? "border-brand-teal bg-brand-teal text-white shadow-brand-teal/20" :
                  isCurrent ? "border-brand-teal text-brand-teal shadow-brand-teal/20" :
                  "border-slate-200 text-slate-300 shadow-transparent"
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : 
                   isCurrent && step.value === 'Testing' ? <Loader2 className="w-5 h-5 animate-spin" /> :
                   isCurrent ? <Circle className="w-4 h-4 fill-current" /> :
                   <Circle className="w-3 h-3" />}
                </div>
                <span className={`text-[11px] mt-3 font-semibold text-center leading-tight tracking-wide uppercase ${
                  isCompleted ? "text-brand-teal" : 
                  isCurrent ? "text-slate-900" : "text-slate-400"
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {status === 'Not Started' && (
        <div className="mt-6 flex justify-end">
          <button className="bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-teal/90 transition-colors shadow-sm shadow-brand-teal/20">
            Initiate Certification
          </button>
        </div>
      )}
      {status === 'Testing' && (
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex justify-between items-center">
          <div>
            <h4 className="text-sm font-medium text-blue-900">Test Data Required</h4>
            <p className="text-xs text-blue-700 mt-1">Please submit a batch of 50 test visits via SFTP to proceed.</p>
          </div>
          <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
            Upload Test File
          </button>
        </div>
      )}
    </div>
  );
}
