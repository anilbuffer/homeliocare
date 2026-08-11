"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Play, Pause, Save, Square, AlertCircle, CheckCircle2, AlertTriangle, FileText, Upload, Video, ArrowLeft } from "lucide-react";
import clsx from "clsx";
import { ComprehensiveCarePlanForm } from "./ComprehensiveCarePlanForm";

type ConfidenceLevel = "high" | "review" | "missing";

interface TranscriptSegment {
  id: string;
  text: string;
  timestamp: string;
  confidence: ConfidenceLevel;
  fieldId?: string; // Maps to a field in the form
}

const initialMockTranscript: TranscriptSegment[] = [
  { id: "t1", timestamp: "00:12", text: "Patient is Evelyn Harper.", confidence: "high", fieldId: "id-fullname" },
  { id: "t2", timestamp: "00:15", text: "Date of birth is April 12, 1952.", confidence: "high", fieldId: "id-dob" },
  { id: "t3", timestamp: "01:05", text: "Patient reports difficulty dressing lower extremities due to right hip stiffness.", confidence: "review", fieldId: "adls-dressing" },
  { id: "t4", timestamp: "01:42", text: "Requires assistance with bathing from one person.", confidence: "review", fieldId: "adls-bathing" },
  { id: "t5", timestamp: "02:15", text: "She is at high risk for falls, Morse score is 65.", confidence: "high", fieldId: "safety-falls" },
  { id: "t6", timestamp: "03:10", text: "Currently taking Lisinopril 10mg daily for hypertension.", confidence: "high", fieldId: "meds-1" },
];

interface HybridWorkspaceProps {
  patientId: string;
  templateId: string;
  initialMode: "recording" | "transcript" | "manual";
  onComplete: () => void;
  onBack?: () => void;
}

export function HybridCarePlanWorkspace({ patientId, templateId, initialMode, onComplete, onBack }: HybridWorkspaceProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);
  const [hoveredFieldId, setHoveredFieldId] = useState<string | null>(null);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(initialMode !== "manual");
  const [transcript, setTranscript] = useState<TranscriptSegment[]>(initialMockTranscript);
  const [isRecordingNote, setIsRecordingNote] = useState(false);

  // Handlers for bidirectional hover
  const handleTranscriptHover = (fieldId?: string) => {
    if (fieldId) setHoveredFieldId(fieldId);
  };
  const handleTranscriptLeave = () => setHoveredFieldId(null);

  const handleFieldHover = (fieldId: string) => {
    const segment = transcript.find(t => t.fieldId === fieldId);
    if (segment) setActiveSegmentId(segment.id);
  };
  const handleFieldLeave = () => setActiveSegmentId(null);

  const toggleRecordingNote = () => {
    if (isRecordingNote) {
      // Stop recording and add a mock note
      setIsRecordingNote(false);
      setTranscript(prev => [
        ...prev,
        {
          id: `t${prev.length + 1}`,
          timestamp: "05:15", // Mock new timestamp
          text: "Patient mentioned minor pain in lower back after sitting for long periods.",
          confidence: "high",
          fieldId: "physical-pain"
        }
      ]);
    } else {
      setIsRecordingNote(true);
    }
  };

  return (
    <div className="w-full flex flex-col h-[calc(100vh-140px)] bg-slate-50 overflow-hidden rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative">

      {/* Header */}
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold tracking-wider shrink-0">
            EH
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-slate-900 leading-tight truncate">Evelyn Harper</h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              DOB 04/12/1952 · Comprehensive Initial
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
          <div className="hidden xl:flex items-center gap-4 mr-2">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-slate-500">
              <div className="w-2 h-2 rounded-full bg-green-500" /> High
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-slate-500">
              <div className="w-2 h-2 rounded-full bg-yellow-400" /> Review
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center justify-center gap-1.5 flex-1 md:flex-none"
              >
                <ArrowLeft className="w-4 h-4 text-slate-500" /> <span className="hidden sm:inline">Back</span>
              </button>
            )}
            <button className="px-3 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center justify-center gap-1.5 flex-1 md:flex-none">
              <Save className="w-4 h-4 text-slate-500" /> <span className="hidden sm:inline">Save</span>
            </button>
            <button
              onClick={onComplete}
              className="px-4 py-2 text-sm font-semibold text-white bg-brand-teal rounded-xl hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] shadow-brand-teal/20 flex items-center justify-center gap-1.5 flex-[2] md:flex-none whitespace-nowrap"
            >
              <CheckCircle2 className="w-4 h-4" /> Sign-off
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">
        {/* LEFT PANEL: AI TRANSCRIPT */}
        <AnimatePresence initial={false}>
          {isTranscriptOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full lg:w-[340px] xl:w-[380px] shrink-0 bg-white lg:border-r border-b lg:border-b-0 border-slate-200 flex flex-col h-[50%] md:h-[60%] lg:h-full z-10 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:shadow-none"
            >

              {/* Audio controls */}
              <div className="hidden md:flex p-4 border-b border-slate-100 bg-slate-50/50 flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center">
                      <Mic className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm text-slate-700">Audio Recording</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-slate-200 px-2 py-1 rounded-md">03:42 / 05:10</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shrink-0"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  {/* Simulated Waveform */}
                  <div className="flex-1 flex items-center gap-0.5 h-6 opacity-70">
                    {[...Array(40)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-brand-teal rounded-full"
                        style={{ height: `${Math.max(20, Math.random() * 100)}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Transcript List */}
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3.5">
                <h3 className="text-xs font-semibold uppercase text-slate-400 mb-2">Transcript Highlights</h3>

                {transcript.map((segment) => {
                  const isHovered = activeSegmentId === segment.id;
                  return (
                    <div
                      key={segment.id}
                      onMouseEnter={() => handleTranscriptHover(segment.fieldId)}
                      onMouseLeave={handleTranscriptLeave}
                      className={clsx(
                        "p-2.5 rounded-xl border transition-all duration-200 cursor-pointer relative group",
                        isHovered ? "bg-brand-teal/5 border-brand-teal/30 shadow-[0_6px_32px_rgba(0,0,0,0.06)]" : "bg-white border-slate-100 hover:border-slate-200",
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 shrink-0">
                          {segment.confidence === "high" && <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" title="High Confidence" />}
                          {segment.confidence === "review" && <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]" title="Needs Review" />}
                          {segment.confidence === "missing" && <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" title="Unmapped" />}
                        </div>
                        <div>
                          <div className="text-xs font-mono text-slate-400 mb-1">{segment.timestamp}</div>
                          <p className={clsx(
                            "text-xs leading-relaxed",
                            isHovered ? "text-slate-900 font-medium" : "text-slate-600"
                          )}>
                            "{segment.text}"
                          </p>
                        </div>
                      </div>

                      {/* Action button overlay on hover */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 bg-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200 rounded-lg text-slate-400 hover:text-brand-teal">
                          <Play className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend & Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <div className="flex flex-col gap-1 mb-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-green-500" /> High Confidence ({'>'}90%)
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" /> Needs RN Review (60-89%)
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-red-500" /> Missing / Unmapped
                  </div>
                </div>
                <button 
                  onClick={toggleRecordingNote}
                  className={clsx(
                    "hidden md:flex w-full py-2 border border-dashed rounded-xl font-medium text-xs transition-colors items-center justify-center gap-2",
                    isRecordingNote
                      ? "border-red-300 text-red-500 bg-red-50 animate-pulse"
                      : "border-slate-300 text-slate-500 hover:border-brand-teal hover:text-brand-teal hover:bg-brand-teal/5"
                  )}
                >
                  {isRecordingNote ? (
                    <>
                      <Square className="w-3.5 h-3.5" /> Stop Recording Note
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5" /> Click to Add Voice Note
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RIGHT PANEL: FORM (65%) */}
        <div className="flex-1 bg-slate-50/50 relative overflow-hidden flex flex-col h-full">
          {/* We pass the hover state and callbacks to the form so it can react */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-3 md:p-4 h-full">
              <ComprehensiveCarePlanForm
                isHybridMode={true}
                hoveredFieldId={hoveredFieldId}
                onFieldHover={handleFieldHover}
                onFieldLeave={handleFieldLeave}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
