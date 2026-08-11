"use client";

import React from "react";
import { Check } from "lucide-react";
import clsx from "clsx";

export type CarePlanStep = "setup" | "capture" | "review" | "signoff";

const STEPS = [
  { id: "setup", label: "Setup" },
  { id: "capture", label: "Capture" },
  { id: "review", label: "Review & Verify" },
  { id: "signoff", label: "Sign-Off" }
] as const;

interface CarePlanStepperProps {
  currentStep: CarePlanStep;
}

export function CarePlanStepper({ currentStep }: CarePlanStepperProps) {
  const currentIndex = STEPS.findIndex(s => s.id === currentStep);

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-6 flex items-center justify-between overflow-x-auto custom-scrollbar gap-2 sm:gap-4">
      {STEPS.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;
        const isPending = index > currentIndex;

        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div
                className={clsx(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors shrink-0",
                  isActive && "bg-white border-2 border-brand-teal text-brand-teal",
                  isCompleted && "bg-brand-teal text-white",
                  isPending && "bg-slate-100 text-slate-400"
                )}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : (index + 1)}
              </div>
              <span
                className={clsx(
                  "text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap",
                  !isActive && "hidden md:inline", // Hide non-active labels on small screens
                  isActive && "text-slate-900 inline",
                  isCompleted && "text-slate-700",
                  isPending && "text-slate-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className="flex-1 min-w-[20px] mx-1 sm:mx-4 relative h-px bg-slate-200 shrink-0">
                {isCompleted && (
                  <div className="absolute top-0 left-0 h-full bg-brand-teal w-full transition-all duration-300" />
                )}
                {isActive && index === currentIndex && (
                  <div className="absolute top-0 left-0 h-full bg-brand-teal w-1/2 transition-all duration-300" />
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
