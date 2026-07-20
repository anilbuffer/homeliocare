"use client";

import React, { useState } from "react";
import { visitHistory } from "@/lib/portalMockData";
import { CalendarDays, Clock, CheckCircle2, ChevronRight, Image as ImageIcon, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PortalVisitsPage() {
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Visit History</h1>
          <p className="text-xs text-text-secondary mt-1">Review past care visits and notes from the care team.</p>
        </div>
      </div>

      <div className="space-y-4">
        {visitHistory.map((visit) => {
          const isExpanded = selectedVisit === visit.id;
          return (
            <div key={visit.id} className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle overflow-hidden">
              {/* Header / Summary row */}
              <button
                onClick={() => setSelectedVisit(isExpanded ? null : visit.id)}
                className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{visit.date}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-sm text-text-secondary">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {visit.duration}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Caregiver: <span className="font-medium text-text-primary">{visit.caregiver}</span></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-[#E6F7F1] text-brand-teal text-xs font-medium">
                    Visit completed
                  </span>
                  <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </motion.div>
                </div>
              </button>

              {/* Expanded details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border-subtle bg-slate-50 overflow-hidden"
                  >
                    <div className="p-4 sm:px-20 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2">Caregiver Note</h4>
                        <p className="text-sm text-text-secondary leading-relaxed bg-white px-3 py-2 rounded-xl border border-border-subtle">
                          "{visit.shortNote}"
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2">Tasks Completed</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {visit.tasksCompleted.map((task, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-text-secondary bg-white px-3 py-2 rounded-lg border border-border-subtle">
                              <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                              {task}
                            </div>
                          ))}
                        </div>
                      </div>

                      {visit.photos && visit.photos.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-slate-400" />
                            Shared Photos
                          </h4>
                          <div className="flex gap-2">
                            {visit.photos.map((photo, idx) => (
                              <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden bg-slate-200">
                                <img src={photo} alt="Visit detail" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
