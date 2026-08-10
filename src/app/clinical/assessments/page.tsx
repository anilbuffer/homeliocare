"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AssessmentForm } from "@/components/clinical/AssessmentForm";
import { Mic, FileText, Upload, Video } from "lucide-react";

type AssessmentMode = "selection" | "transcript" | "manual";

export default function ClinicalAssessmentsPage() {
  const [mode, setMode] = useState<AssessmentMode>("selection");

  return (
    <div className="w-full mx-auto space-y-6 h-full pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Assessments & Care Plan Builder
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Complete initial and periodic client evaluations
          </p>
        </div>
        {mode !== "selection" && (
          <button
            onClick={() => setMode("selection")}
            className="text-sm text-brand-teal font-medium hover:underline px-4 py-2 rounded-lg hover:bg-brand-teal/5 transition-colors"
          >
            &larr; Change Method
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {mode === "selection" && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-4xl mx-auto"
          >
            {/* Automatic via Transcript */}
            <div
              onClick={() => setMode("transcript")}
              className="bg-white p-10 rounded-2xl border border-slate-200 hover:border-brand-teal/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-4 group"
            >
              <div className="h-20 w-20 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-teal group-hover:text-white">
                <Mic className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Automatic Assessment</h3>
                <p className="text-sm text-slate-500 mt-3 max-w-xs mx-auto leading-relaxed">
                  Generate an assessment automatically from an audio or video recording of your client visit.
                </p>
              </div>
              <div className="flex gap-3 text-brand-teal/50 mt-4 group-hover:text-brand-teal/70 transition-colors">
                <Mic className="w-6 h-6" />
                <Video className="w-6 h-6" />
              </div>
            </div>

            {/* Manual Form & Upload */}
            <div
              onClick={() => setMode("manual")}
              className="bg-white p-10 rounded-2xl border border-slate-200 hover:border-blue-500/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-4 group"
            >
              <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <FileText className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Manual Entry</h3>
                <p className="text-sm text-slate-500 mt-3 max-w-xs mx-auto leading-relaxed">
                  Fill out the assessment form manually or upload an existing document.
                </p>
              </div>
              <div className="flex gap-3 text-blue-400/50 mt-4 group-hover:text-blue-400/70 transition-colors">
                <FileText className="w-6 h-6" />
                <Upload className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        )}

        {mode === "transcript" && (
          <motion.div
            key="transcript"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="h-[calc(100vh-140px)] bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-teal/5 to-transparent pointer-events-none"></div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center gap-6 z-10 max-w-lg"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-teal/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="h-24 w-24 bg-white border-2 border-brand-teal/20 text-brand-teal rounded-full flex items-center justify-center relative shadow-xl">
                  <Mic className="w-10 h-10" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">Upload Assessment Recording</h3>
                <p className="text-slate-500 mt-3 text-base leading-relaxed">
                  Upload an audio or video recording. Our AI will analyze the transcript and automatically generate a comprehensive clinical assessment and care plan.
                </p>
              </div>

              <div className="w-full mt-4 p-8 border-2 border-dashed border-slate-300 rounded-2xl hover:border-brand-teal hover:bg-brand-teal/5 transition-all duration-300 cursor-pointer group flex flex-col items-center">
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-brand-teal transition-colors mb-3" />
                <span className="font-semibold text-slate-700 group-hover:text-brand-teal transition-colors">Click to upload file</span>
                <span className="text-xs text-slate-400 mt-1">Supports MP3, WAV, MP4 (Max 50MB)</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {mode === "manual" && (
          <motion.div
            key="manual"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="h-[calc(100vh-140px)]"
          >
            <AssessmentForm />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
