"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Calendar, Clock, MapPin, CheckCircle2, Navigation, AlertTriangle } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export interface SupervisoryVisit {
  id: string;
  clientName: string;
  clientId: string;
  assignedRn: string;
  dueDate: string; // ISO string
  visitType: "initial_30" | "periodic_60" | "annual_unannounced" | "post_incident";
  status: "scheduled" | "overdue" | "pending_scheduling";
  location: string;
}

const mockVisits: SupervisoryVisit[] = [
  {
    id: "sv-1",
    clientName: "Eleanor Vance",
    clientId: "c-1",
    assignedRn: "Rachel Miller, RN",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day overdue
    visitType: "periodic_60",
    status: "overdue",
    location: "Home (123 Main St)",
  },
  {
    id: "sv-2",
    clientName: "Arthur Pendelton",
    clientId: "c-2",
    assignedRn: "Rachel Miller, RN",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // In 2 days
    visitType: "initial_30",
    status: "scheduled",
    location: "Home (456 Oak Ln)",
  },
  {
    id: "sv-3",
    clientName: "Margaret Chen",
    clientId: "c-1",
    assignedRn: "Unassigned",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(), // In 14 days
    visitType: "annual_unannounced",
    status: "pending_scheduling",
    location: "Assisted Living (789 Pine Rd)",
  },
];

export function SupervisoryVisitSchedule() {
  const [items, setItems] = useState<SupervisoryVisit[]>(mockVisits);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "overdue":
        return "bg-rose-50 border-rose-200";
      case "scheduled":
        return "bg-blue-50 border-blue-200";
      case "pending_scheduling":
        return "bg-slate-50 border-slate-200 border-dashed";
      default:
        return "bg-white border-slate-200";
    }
  };

  const formatVisitType = (type: string) => {
    switch (type) {
      case "initial_30": return "Initial 30-Day";
      case "periodic_60": return "Periodic 60-Day";
      case "annual_unannounced": return "Annual Unannounced";
      case "post_incident": return "Post-Incident follow-up";
      default: return type;
    }
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl px-4 py-3 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
            <UserPlus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-medium text-text-primary">Supervisory Visits</h3>
            <p className="text-xs font-normal text-text-secondary mt-0.5">Upcoming clinical field visits</p>
          </div>
        </div>
        <Link
          href="/clinical/patients"
          className="text-xs font-semibold text-brand-teal hover:text-teal-700 transition-colors"
        >
          View Full Schedule
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar min-h-0 -mx-4 sm:-mx-5 px-4">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-40 text-slate-400"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
              <p className="text-sm font-medium text-slate-500">No visits scheduled.</p>
            </motion.div>
          ) : (
            items.map((item) => {
              const isOverdue = item.status === "overdue";

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className={clsx(
                    "p-3 sm:p-4 rounded-xl border transition-all duration-300 relative group",
                    getStatusStyles(item.status)
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 ml-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Link href={`/clinical/patients/${item.clientId}`} className="font-semibold text-sm text-slate-900 hover:text-brand-teal transition-colors truncate">
                          {item.clientName}
                        </Link>
                        {isOverdue && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-[10px] font-semibold tracking-wider text-rose-600 shrink-0">
                            <AlertTriangle className="w-3 h-3" />
                            Overdue
                          </span>
                        )}
                        {item.status === "pending_scheduling" && (
                          <span className="px-1.5 py-0.5 rounded-full bg-slate-200 border border-slate-300 text-[10px] font-semibold tracking-wider text-slate-600 shrink-0">
                            Unscheduled
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-2">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span className={clsx("font-semibold", isOverdue ? "text-rose-600" : "")}>
                            Due: {new Date(item.dueDate).toLocaleDateString('en-US')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate" title={item.location}>{item.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="font-medium text-slate-700 bg-white/50 px-2 py-0.5 rounded-full border border-slate-200">
                          RN: {item.assignedRn}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>Type: {formatVisitType(item.visitType)}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0">
                      <Link
                        href={`/clinical/patients/${item.clientId}`}
                        className="w-full sm:w-auto px-3 py-2 bg-white text-text-primary border border-slate-200 rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-1.5 hover:bg-slate-50 shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                      >
                        <Navigation className="w-4 h-4 text-brand-teal" />
                        <span>Manage</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
