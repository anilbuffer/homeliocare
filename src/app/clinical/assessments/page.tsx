"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mic, FileText, Upload, Video, Square, CheckCircle2 } from "lucide-react";
import { HybridCarePlanWorkspace } from "@/components/clinical/HybridCarePlanWorkspace";
import clsx from "clsx";

import { CarePlanStepper, CarePlanStep } from "@/components/clinical/CarePlanStepper";
import { CarePlanCapture } from "@/components/clinical/CarePlanCapture";
import { CarePlanSignOff } from "@/components/clinical/CarePlanSignOff";
import { Info } from "lucide-react";

export default function ClinicalAssessmentsPage() {
  const [currentStep, setCurrentStep] = useState<CarePlanStep>("setup");
  const [captureMode, setCaptureMode] = useState<"voice" | "manual">("voice");

  // Context Selection
  const [patientId, setPatientId] = useState("");
  const [templateId, setTemplateId] = useState("");

  const isContextReady = patientId !== "" && templateId !== "";

  const handleStartVoice = () => {
    if (!isContextReady) return;
    setCaptureMode("voice");
    setCurrentStep("capture");
  };

  const handleStartManual = () => {
    if (!isContextReady) return;
    setCaptureMode("manual");
    setCurrentStep("capture");
  };

  return (
    <div className={clsx("w-full mx-auto h-full flex flex-col", currentStep === "setup" || currentStep === "capture" || currentStep === "signoff" ? "max-w-full" : "")}>

      {/* Title block for setup */}
      {currentStep === "setup" && (
        <div className="flex flex-col mb-4 mt-2 text-left">
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
            Assessments & Care Plan Builder
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Complete initial and periodic client evaluations — voice and manual entry, unified.
          </p>
        </div>
      )}

      {/* Global Stepper */}
      <CarePlanStepper currentStep={currentStep} />

      <AnimatePresence mode="wait">
        {currentStep === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4"
          >
            {/* Context Setup Header */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col gap-4">
              <h3 className="text-base font-semibold text-slate-900">Patient & Assessment Context</h3>
              <p className="text-sm text-slate-500 mb-2">This determines where the completed care plan will be filed.</p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-semibold text-slate-700">Patient</label>
                  <select
                    value={patientId}
                    onChange={e => setPatientId(e.target.value)}
                    className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none bg-slate-50 focus:bg-white transition-colors"
                  >
                    <option value="">Select a patient...</option>
                    <option value="p1">Evelyn Harper — DOB 04/12/1952</option>
                    <option value="p2">Robert Chen — DOB 08/24/1945</option>
                  </select>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-semibold text-slate-700">Assessment Template</label>
                  <select
                    value={templateId}
                    onChange={e => setTemplateId(e.target.value)}
                    className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none bg-slate-50 focus:bg-white transition-colors"
                  >
                    <option value="">Select a template...</option>
                    <option value="initial">Comprehensive Initial Assessment</option>
                    <option value="oasis">OASIS-E Comprehensive</option>
                    <option value="reeval">60-Day Re-evaluation</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Entry Paths */}
            <div className={clsx("bg-white p-4 rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-opacity duration-300 flex flex-col", !isContextReady && "opacity-50 pointer-events-none")}>
              <h3 className="text-base font-semibold text-slate-900 mb-1">Choose how you'd like to start</h3>
              <p className="text-xs text-slate-500 mb-6">Both paths open the same care plan workspace — you can dictate inside the manual form, or type over anything the AI transcribes.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option A: AI Voice Assistant (Recommended) */}
                <div
                  onClick={handleStartVoice}
                  className="bg-white p-4 rounded-2xl border-2 border-brand-teal/20 hover:border-brand-teal hover:shadow-[0_8px_30px_rgba(20,184,166,0.15)] cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute top-3 right-3 bg-brand-teal/10 text-brand-teal text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md z-10">
                    Recommended
                  </div>
                  <div className="h-12 w-12 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-teal group-hover:text-white z-10 mt-2">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div className="z-10 flex flex-col items-center flex-1">
                    <h3 className="text-lg font-bold text-slate-900">AI Voice Assistant</h3>
                    <p className="text-sm text-slate-500 mt-2 max-w-[260px] mx-auto leading-relaxed">
                      Record your live patient assessment or dictate clinical notes. Audio maps directly into structured fields as you speak.
                    </p>
                  </div>
                  <div className="w-full bg-brand-teal/5 text-brand-teal/80 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 mt-2">
                    <CheckCircle2 className="w-4 h-4" /> You'll review every AI-mapped field with a confidence score before anything is saved.
                  </div>
                </div>
                {/* Option B: Standard Manual Form */}
                <div
                  onClick={handleStartManual}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-500/60 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-4 group relative overflow-hidden"
                >
                  <div className="h-12 w-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-600 group-hover:text-white z-10 mt-2">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="z-10 flex flex-col items-center flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">Standard Manual Form</h3>
                    <p className="text-sm text-slate-500 mt-2 max-w-[260px] mx-auto leading-relaxed">
                      Start with blank structured fields and type directly, section by section.
                    </p>
                  </div>
                  <div className="w-full bg-slate-50 text-slate-600 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 mt-2">
                    <Mic className="w-4 h-4" /> A dictation mic is available inside every section if you want to speak instead of type.
                  </div>
                </div>
              </div>
            </div>

            {/* Hybrid Info Banner */}
            <div className="bg-slate-900 text-white p-4 rounded-xl flex gap-3 text-sm leading-relaxed items-start">
              <Info className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <p>
                <span className="font-semibold text-brand-teal">Hybrid by default.</span> Homelio no longer treats voice and manual entry as separate silos. Whichever you pick, you land in one workspace and can freely mix speaking and typing — the assessment always ends with the same Review & Sign-off step.
              </p>
            </div>
          </motion.div>
        )}

        {currentStep === "capture" && (
          <motion.div
            key="capture"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 min-h-0"
          >
            <CarePlanCapture
              initialMode={captureMode}
              patientId={patientId}
              templateId={templateId}
              onSwitchMode={(m) => setCaptureMode(m)}
              onComplete={() => setCurrentStep("review")}
              onBack={() => setCurrentStep("setup")}
            />
          </motion.div>
        )}

        {currentStep === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 min-h-0"
          >
            <HybridCarePlanWorkspace
              patientId={patientId}
              templateId={templateId}
              initialMode="transcript" // Always show dual-pane on Review
              onComplete={() => setCurrentStep("signoff")}
              onBack={() => setCurrentStep("capture")}
            />
          </motion.div>
        )}

        {currentStep === "signoff" && (
          <motion.div
            key="signoff"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 min-h-0"
          >
            <CarePlanSignOff
              onComplete={() => {
                setCurrentStep("setup");
                setPatientId("");
                setTemplateId("");
              }}
              onBack={() => setCurrentStep("review")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
