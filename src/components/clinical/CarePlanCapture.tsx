"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Pause, Square, ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { ComprehensiveCarePlanForm } from "./ComprehensiveCarePlanForm";

interface CarePlanCaptureProps {
  initialMode: "voice" | "manual";
  patientId: string;
  templateId: string;
  onComplete: () => void;
  onSwitchMode: (mode: "voice" | "manual") => void;
  onBack?: () => void;
}

export function CarePlanCapture({ initialMode, patientId, templateId, onComplete, onSwitchMode, onBack }: CarePlanCaptureProps) {
  const [mode, setMode] = useState<"voice" | "manual">(initialMode);
  const [isRecording, setIsRecording] = useState(true);
  const [recordingTime, setRecordingTime] = useState(4); // Start at 00:04 for mockup

  // Sync internal mode with props if needed, though they should stay in sync
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSwitchMode = (newMode: "voice" | "manual") => {
    setMode(newMode);
    onSwitchMode(newMode);
  };

  if (mode === "manual") {
    return (
      <div className="h-full flex flex-col">
        {/* Simple top bar for manual capture mode if we want it, or just rely on stepper */}
        <div className="flex-1 overflow-hidden relative">
          <ComprehensiveCarePlanForm
            isHybridMode={false}
            showDictationMics={true}
            onComplete={onComplete}
            onBack={onBack}
          />
        </div>
      </div>
    );
  }

  // Voice Mode
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 animate-in fade-in zoom-in-95 duration-500 relative">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-0 left-0 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" /> Back
        </button>
      )}
      <div className="h-20 w-20 rounded-full bg-brand-teal/10 flex items-center justify-center mb-6 relative mt-12 md:mt-0">
        <div className="absolute inset-0 rounded-full border-2 border-brand-teal/30 animate-ping"></div>
        <Mic className="w-8 h-8 text-brand-teal" />
      </div>

      <h2 className="text-lg font-semibold text-slate-900 text-center mb-2">Recording in progress...</h2>
      <p className="text-slate-500 text-xs text-center max-w-md mb-3">
        Speak naturally — introduce the patient, describe what you observe, and note anything the family shares. Our AI is mapping this to <span className="font-semibold text-slate-700">Comprehensive Initial Assessment</span> in real time.
      </p>

      <div className="bg-red-50 border border-red-100 rounded-2xl p-4 w-full max-w-sm mb-3 flex flex-col items-center shadow-[0_6px_32px_rgba(239,68,68,0.06)]">
        <div className="flex items-center gap-2 text-red-600 font-semibold mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
          01:13
        </div>

        {/* Simulated Waveform */}
        <div className="flex items-center gap-1 h-8 mb-4 opacity-80">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-red-500 rounded-full"
              style={{ height: `${Math.max(30, Math.random() * 100)}%`, transition: 'height 0.2s ease' }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 w-full">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className="flex-1 py-2 bg-white border border-red-200 rounded-xl text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          >
            <Pause className="w-3.5 h-3.5" /> Pause
          </button>
          <button
            onClick={onComplete}
            className="flex-1 py-2 bg-white border border-red-200 rounded-xl text-red-600 font-semibold text-xs hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          >
            <Square className="w-3.5 h-3.5" /> Stop & Review
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-500 mb-4">
        Prefer to type instead? <button onClick={() => handleSwitchMode("manual")} className="text-brand-teal font-semibold hover:underline">Switch to manual form</button> — your audio stays attached.
      </p>

      <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Live Transcript • Mapping to fields</span>
          <span className="text-xs font-semibold text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-lg">16 fields mapped</span>
        </div>
        <div className="text-slate-900 text-xs leading-relaxed space-y-1.5">
          <p>Good morning, this is Rachel Miller, RN, conducting the comprehensive assessment for Evelyn Harper.</p>
          <p>Patient reports difficulty dressing lower extremities due to right hip stiffness.</p>
          <p>She has trouble getting in and out of the shower without assistance.</p>
          <p>Her regular doctor, Dr. Osei, wants a follow-up scheduled within two weeks.</p>
          <p>She's at home by herself, one floor, no stairs to the bedroom.</p>
          <p>Fall risk assessment — Morse score calculates to 65, so we'll flag that as high risk.</p>
        </div>
      </div>
    </div>
  );
}
