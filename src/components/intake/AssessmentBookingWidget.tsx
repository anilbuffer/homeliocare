"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  MapPin,
  User,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/components/ui/Card";

interface Assessment {
  id: string;
  patientId: string;
  clientName: string;
  address: string;
  time: string;
  assessor: string;
}

const initialAssessments: Assessment[] = [
  {
    id: "assm-1",
    patientId: "c-1",
    clientName: "David Miller",
    address: "142 Oak St, Apt 4B",
    time: "10:00 AM",
    assessor: "Sarah Jenkins, RN"
  },
  {
    id: "assm-2",
    patientId: "c-2",
    clientName: "Evelyn Carter",
    address: "89 Pine Lane",
    time: "2:30 PM",
    assessor: "Maria Santos, CC"
  }
];

export function AssessmentBookingWidget() {
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>(initialAssessments);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const handleMarkComplete = (id: string) => {
    const assessment = assessments.find(a => a.id === id);
    if (!assessment) return;

    setCompletedIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setAssessments((prev) => prev.filter((a) => a.id !== id));
      setCompletedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      // Navigate to the care plan builder
      router.push(`/intake/patients/${assessment.patientId}?tab=care-plan`);
    }, 800);
  };

  return (
    <Card className="flex flex-col h-full bg-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Today's Assessments</h3>
            <p className="text-[11px] text-slate-500">Scheduled initial visits</p>
          </div>
        </div>
        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
          {assessments.length} Remaining
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {assessments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-32 text-slate-400"
            >
              <CheckCircle2 className="w-10 h-10 mb-3 text-emerald-400 opacity-50" />
              <p className="text-sm font-medium">All assessments complete!</p>
            </motion.div>
          ) : (
            assessments.map((a) => {
              const isCompleting = completedIds.has(a.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  key={a.id}
                  className="mb-3 p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md hover:shadow-slate-500/5 transition-all relative overflow-hidden"
                >
                  <AnimatePresence>
                    {isCompleting && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-10 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-600 font-semibold text-sm"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Handing off to Care Plan...
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col sm:flex-row gap-3 justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-bold text-slate-900 text-sm">{a.time}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="font-semibold text-slate-700 text-sm">{a.clientName}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Assessor: {a.assessor}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {a.address}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end justify-end mt-2 sm:mt-0">
                      <button
                        onClick={() => handleMarkComplete(a.id)}
                        disabled={isCompleting}
                        className="flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:border-brand-teal hover:text-brand-teal hover:bg-brand-teal/5 text-slate-700 px-3 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer w-full sm:w-auto"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Complete <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
