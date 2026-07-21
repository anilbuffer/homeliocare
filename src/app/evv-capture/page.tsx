"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Clock, Calendar, Phone, CheckCircle2, Circle, 
  ChevronRight, Camera, PenTool, AlertTriangle, FileSignature, AlertCircle
} from "lucide-react";
import clsx from "clsx";

type VisitState = "NotStarted" | "ClockedIn" | "Review" | "Completed";

const TASKS = [
  { id: "t1", label: "Assist with bathing and grooming", required: true },
  { id: "t2", label: "Prepare lunch (low sodium)", required: true },
  { id: "t3", label: "Light housekeeping (living room)", required: false },
  { id: "t4", label: "Medication reminder", required: true },
];

export default function EVVCapturePage() {
  const [visitState, setVisitState] = useState<VisitState>("NotStarted");
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState("");
  const [gpsVerified, setGpsVerified] = useState<boolean | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    // Simulate GPS verification
    setGpsVerified(true);
    setTimeout(() => {
      setVisitState("ClockedIn");
    }, 1000);
  };

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const requiredRemaining = TASKS.filter(t => t.required && !completedTasks.has(t.id)).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-100 flex flex-col h-[85vh] max-h-[800px]">
        
        {/* Header */}
        <div className="bg-brand-teal px-6 pt-12 pb-6 text-white shrink-0">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-teal-100 text-sm font-medium mb-1">Today's Visit</p>
              <h1 className="text-2xl font-bold">Eleanor Rigby</h1>
            </div>
            <div className="bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
              <p className="text-sm font-semibold tabular-nums">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-teal-50 text-sm">
              <Clock className="w-4 h-4 opacity-80" />
              <span>9:00 AM - 12:00 PM (3 hrs)</span>
            </div>
            <div className="flex items-center gap-2 text-teal-50 text-sm">
              <MapPin className="w-4 h-4 opacity-80" />
              <span>123 Abbey Road, London, NW8 9AY</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 relative">
          <AnimatePresence mode="wait">
            
            {visitState === "NotStarted" && (
              <motion.div 
                key="NotStarted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 h-full flex flex-col"
              >
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 mb-6">
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      <AlertCircle className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-blue-900">Ready to start?</h4>
                      <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                        Please ensure you are at the patient's home. Your location will be captured via GPS for EVV compliance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  {gpsVerified === true && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 py-3 rounded-xl font-medium text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Location Verified
                    </motion.div>
                  )}

                  <button 
                    onClick={handleClockIn}
                    disabled={gpsVerified === true}
                    className={clsx(
                      "w-full py-4 rounded-2xl text-lg font-bold text-white transition-all shadow-lg active:scale-[0.98]",
                      gpsVerified === true ? "bg-emerald-500 shadow-emerald-500/20" : "bg-brand-teal hover:bg-brand-teal/90 shadow-brand-teal/20"
                    )}
                  >
                    {gpsVerified === true ? "Clocking In..." : "Clock In (GPS)"}
                  </button>

                  <button className="w-full py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telephony / FVV Fallback
                  </button>
                </div>
              </motion.div>
            )}

            {visitState === "ClockedIn" && (
              <motion.div 
                key="ClockedIn"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Plan of Care Tasks</h3>
                  <p className="text-sm text-slate-500">Tap to mark tasks as completed.</p>
                </div>

                <div className="space-y-3">
                  {TASKS.map(task => (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={clsx(
                        "w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 group",
                        completedTasks.has(task.id) 
                          ? "bg-emerald-50/50 border-emerald-200" 
                          : "bg-white border-slate-200 hover:border-brand-teal/40 hover:shadow-md"
                      )}
                    >
                      <div className="mt-0.5 shrink-0 transition-transform group-active:scale-90">
                        {completedTasks.has(task.id) ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-300" />
                        )}
                      </div>
                      <div>
                        <p className={clsx(
                          "text-sm font-medium transition-colors",
                          completedTasks.has(task.id) ? "text-emerald-900" : "text-slate-700"
                        )}>
                          {task.label}
                        </p>
                        {task.required && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded flex w-max mt-1.5">
                            Required
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 mt-6 border-t border-slate-200">
                  <button 
                    onClick={() => setVisitState("Review")}
                    disabled={requiredRemaining > 0}
                    className="w-full py-4 rounded-2xl text-base font-bold text-white transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:bg-slate-300 disabled:cursor-not-allowed bg-brand-teal hover:bg-brand-teal/90 shadow-brand-teal/20 flex items-center justify-center gap-2"
                  >
                    Proceed to Notes
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  {requiredRemaining > 0 && (
                    <p className="text-xs text-center mt-3 text-amber-600 font-medium">
                      Complete {requiredRemaining} more required task(s) to proceed.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {visitState === "Review" && (
              <motion.div 
                key="Review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 h-full flex flex-col space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Visit Notes</h3>
                  <p className="text-sm text-slate-500">Document any observations or changes.</p>
                </div>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Patient was in good spirits. Ate full lunch. Refused to do living room housekeeping today..."
                  className="w-full h-32 p-4 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 resize-none"
                />

                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileSignature className="w-4 h-4 text-slate-400" />
                      Client Signature
                    </h4>
                  </div>
                  <div className="h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center relative cursor-crosshair">
                    {/* Simulated signature pad */}
                    <PenTool className="w-8 h-8 text-slate-300 absolute" />
                    <span className="text-xs font-medium text-slate-400 mt-12">Sign Here</span>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <button 
                    onClick={() => setVisitState("Completed")}
                    className="w-full py-4 rounded-2xl text-base font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Complete & Clock Out
                  </button>
                </div>
              </motion.div>
            )}

            {visitState === "Completed" && (
              <motion.div 
                key="Completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 h-full flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Visit Complete!</h2>
                <p className="text-sm text-slate-500">
                  Data securely synced to EVV aggregator.<br/>
                  Great job today.
                </p>

                <div className="bg-slate-100 rounded-xl p-4 w-full mt-6 flex justify-between items-center text-sm font-medium text-slate-700">
                  <span>Shift Time</span>
                  <span>3h 0m</span>
                </div>
                
                <button 
                  onClick={() => setVisitState("NotStarted")}
                  className="mt-8 px-6 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
