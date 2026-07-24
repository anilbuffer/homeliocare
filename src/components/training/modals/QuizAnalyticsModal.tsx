"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { BarChart3, CheckCircle2, AlertCircle, HelpCircle, TrendingUp, Users } from "lucide-react";

interface QuizAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuizAnalyticsModal({ isOpen, onClose }: QuizAnalyticsModalProps) {
  const quizMetrics = [
    { title: "Avg First-Try Pass Rate", value: "86.4%", change: "+3.1% vs last mo", color: "text-brand-teal" },
    { title: "Total Quizzes Attempted", value: "342", change: "Last 30 Days", color: "text-slate-800" },
    { title: "Avg Assessment Score", value: "91.2%", change: "+1.8%", color: "text-emerald-700" },
  ];

  const questionBreakdown = [
    { question: "Medication timing & PRN protocol boundaries", passRate: 42, attempts: 118, course: "Medication Safety" },
    { question: "HIPAA social media photo scenario & patient consent", passRate: 58, attempts: 140, course: "HIPAA Privacy 2026" },
    { question: "Fall risk assessment standard 3-step evaluation", passRate: 64, attempts: 96, course: "Patient Safety" },
    { question: "Fire extinguisher PASS mnemonic execution order", passRate: 88, attempts: 110, course: "Fire Safety" },
    { question: "PPE donning & doffing order under OSHA guidance", passRate: 94, attempts: 152, course: "Infection Control" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Quiz & Knowledge Assessment Analytics"
      icon={
        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] shrink-0">
          <BarChart3 className="w-5 h-5 text-brand-teal" />
        </div>
      }
      footer={
        <button
          onClick={onClose}
          className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full sm:w-auto"
        >
          Close Analytics
        </button>
      }
    >
      <div className="space-y-5">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quizMetrics.map((m, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{m.title}</span>
              <span className={`text-2xl font-extrabold ${m.color}`}>{m.value}</span>
              <span className="text-[10px] font-medium text-slate-400 block">{m.change}</span>
            </div>
          ))}
        </div>

        {/* Most Missed Questions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Highest Friction Questions (Attention Needed)
            </h4>
            <span className="text-[11px] text-slate-500">Sorted by lowest pass rate</span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {questionBreakdown.map((item, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-200/80 rounded-xl space-y-2 hover:border-slate-300 transition-all text-xs">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-brand-teal uppercase bg-brand-teal/10 px-2 py-0.5 rounded-full inline-block mb-1">
                      {item.course}
                    </span>
                    <p className="font-semibold text-slate-800 leading-snug">{item.question}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`font-bold ${item.passRate < 60 ? "text-rose-600" : item.passRate < 80 ? "text-amber-600" : "text-emerald-600"}`}>
                      {item.passRate}% Pass
                    </span>
                    <p className="text-[10px] text-slate-400">{item.attempts} attempts</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${item.passRate < 60 ? "bg-rose-500" : item.passRate < 80 ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${item.passRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Modal>
  );
}
