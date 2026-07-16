"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, User, Pill, Activity, AlertTriangle, MessageCircle, FileText, ClipboardList } from "lucide-react";
import { ChronologyEntry, ChronologyCategory } from "@/lib/patients/mockChronology";

interface MedicalTimelineProps {
  entries: ChronologyEntry[];
  highlightedEntryIds: string[];
}

export function MedicalTimeline({ entries, highlightedEntryIds }: MedicalTimelineProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
        <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-700">No entries found</h3>
        <p className="text-slate-500 mt-1 text-sm">No medical history matches the current filters.</p>
      </div>
    );
  }

  const getCategoryConfig = (category: ChronologyCategory) => {
    switch (category) {
      case 'admission':
        return { icon: <User className="w-4 h-4" />, color: "bg-teal-100 text-teal-700 border-teal-200", badgeColor: "bg-teal-500", label: "Admission" };
      case 'visit':
        return { icon: <ClipboardList className="w-4 h-4" />, color: "bg-slate-800 text-white border-slate-700", badgeColor: "bg-slate-800", label: "Visit/Note" };
      case 'medication':
        return { icon: <Pill className="w-4 h-4" />, color: "bg-amber-100 text-amber-700 border-amber-200", badgeColor: "bg-amber-500", label: "Medication" };
      case 'vitals':
        return { icon: <Activity className="w-4 h-4" />, color: "bg-blue-100 text-blue-700 border-blue-200", badgeColor: "bg-blue-500", label: "Vitals" };
      case 'incident':
        return { icon: <AlertTriangle className="w-4 h-4" />, color: "bg-red-100 text-red-700 border-red-200", badgeColor: "bg-red-500", label: "Incident" };
      case 'communication':
        return { icon: <MessageCircle className="w-4 h-4" />, color: "bg-purple-100 text-purple-700 border-purple-200", badgeColor: "bg-purple-500", label: "Communication" };
      case 'care_plan':
        return { icon: <FileText className="w-4 h-4" />, color: "bg-slate-200 text-slate-700 border-slate-300", badgeColor: "bg-slate-500", label: "Care Plan" };
      default:
        return { icon: <FileText className="w-4 h-4" />, color: "bg-gray-100 text-gray-700 border-gray-200", badgeColor: "bg-gray-500", label: "Other" };
    }
  };

  return (
    <div className="relative py-4">
      {/* Connecting vertical line */}
      <div className="absolute left-[20px] sm:left-[20px] top-4 bottom-4 w-[2px] bg-slate-200 rounded-full" />

      <div className="space-y-6">
        {entries.map((entry) => {
          const config = getCategoryConfig(entry.category);
          const isExpanded = expandedIds.has(entry.id);
          const isHighlighted = highlightedEntryIds.includes(entry.id);

          return (
            <div key={entry.id} className={`relative flex gap-4 sm:gap-6 group ${isHighlighted ? 'opacity-100' : highlightedEntryIds.length > 0 ? 'opacity-40' : 'opacity-100'} transition-opacity duration-300`}>
              {/* Timeline Node */}
              <div className="relative z-10 mt-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm ${config.color} ${isHighlighted ? 'ring-4 ring-brand-teal/20 scale-110' : ''} transition-all`}>
                  {config.icon}
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 rounded-2xl border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden hover:border-brand-teal/40 transition-colors">
                <div
                  className={`p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${isHighlighted ? 'bg-brand-teal/5' : ''}`}
                  onClick={() => toggleExpand(entry.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${config.badgeColor}`}>
                        {config.label}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {format(new Date(entry.timestamp), "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                    <h4 className="text-base font-medium text-slate-900 leading-snug">
                      {entry.summary}
                    </h4>
                    <div className="text-sm text-slate-500 mt-2 flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {entry.author.charAt(0)}
                      </div>
                      {entry.author}
                    </div>
                  </div>

                  {entry.details && (
                    <button className="text-slate-400 hover:text-brand-teal transition-colors self-start sm:self-center p-2 rounded-full hover:bg-slate-50">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {isExpanded && entry.details && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-100 bg-brand-teal/10">
                        <p className="text-sm text-brand-teal whitespace-pre-wrap leading-relaxed">
                          {entry.details}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
