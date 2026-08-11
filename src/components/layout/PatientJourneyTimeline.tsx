"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Clock, ChevronUp, ChevronDown, MapPin, User, Activity, Calendar } from "lucide-react";
import clsx from "clsx";

const journeySteps = [
  {
    id: 1,
    title: "Inquiry & Intake",
    status: "completed",
    date: "Today, 09:15 AM",
    description: "Referral from Cedar Falls Regional Hospital.",
    icon: MapPin
  },
  {
    id: 2,
    title: "Pre-Discharge Assessment",
    status: "completed",
    date: "Today, 11:30 AM",
    description: "Completed by RN at hospital. High fall risk identified.",
    icon: Activity
  },
  {
    id: 3,
    title: "Care Plan & Matching",
    status: "completed",
    date: "Today, 12:45 PM",
    description: "Care plan signed. Denise Ruiz (CNA) matched as primary caregiver.",
    icon: User
  },
  {
    id: 4,
    title: "Caregiver Introduction",
    status: "upcoming",
    date: "Tomorrow, 09:00 AM",
    description: "Virtual intro with POA (Meg) and Denise.",
    icon: Calendar
  },
  {
    id: 5,
    title: "Service Start",
    status: "pending",
    date: "Tomorrow, 02:00 PM",
    description: "First shift at Whitfield Residence. Pending Physician Co-Sign.",
    icon: Clock
  }
];

export function PatientJourneyTimeline() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        layout
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-brand-teal/20 w-80 overflow-hidden flex flex-col"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-gradient-to-r from-brand-teal to-teal-700 p-4 flex items-center justify-between text-white hover:brightness-110 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
              EW
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm leading-tight">Eleanor Whitfield</h3>
              <p className="text-[10px] text-teal-100 uppercase tracking-widest font-medium">Demo Patient Journey</p>
            </div>
          </div>
          {isExpanded ? <ChevronDown className="w-5 h-5 opacity-80" /> : <ChevronUp className="w-5 h-5 opacity-80" />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 bg-slate-50 max-h-[400px] overflow-y-auto custom-scrollbar relative">
                <div className="absolute left-[33px] top-6 bottom-6 w-0.5 bg-slate-200 rounded-full" />
                
                <div className="space-y-6 relative">
                  {journeySteps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.id} className={clsx(
                        "flex gap-4 relative",
                        step.status === "completed" ? "opacity-100" : step.status === "upcoming" ? "opacity-90" : "opacity-50"
                      )}>
                        <div className="shrink-0 relative z-10 mt-0.5">
                          {step.status === "completed" ? (
                            <div className="w-7 h-7 rounded-full bg-brand-teal text-white flex items-center justify-center shadow-md shadow-brand-teal/30">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          ) : step.status === "upcoming" ? (
                            <div className="w-7 h-7 rounded-full bg-white border-2 border-brand-teal text-brand-teal flex items-center justify-center shadow-md shadow-brand-teal/20">
                              <span className="w-2.5 h-2.5 rounded-full bg-brand-teal animate-pulse" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-white border-2 border-slate-300 text-slate-300 flex items-center justify-center">
                              <Circle className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        
                        <div className="pb-1">
                          <h4 className={clsx(
                            "text-sm font-bold leading-tight mb-0.5",
                            step.status === "completed" ? "text-slate-900" : step.status === "upcoming" ? "text-brand-teal" : "text-slate-500"
                          )}>
                            {step.title}
                          </h4>
                          <p className="text-[10px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {step.date}
                          </p>
                          <div className={clsx(
                            "text-xs leading-relaxed p-2.5 rounded-xl border",
                            step.status === "completed" ? "bg-white border-slate-200 text-slate-600" :
                            step.status === "upcoming" ? "bg-brand-teal/5 border-brand-teal/20 text-teal-800" :
                            "bg-slate-100 border-transparent text-slate-500"
                          )}>
                            {step.description}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
