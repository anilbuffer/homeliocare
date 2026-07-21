"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, AlertTriangle, FileText, Download, RotateCcw, Lock,
  MapPin, ShieldCheck, Link2, Clock, CheckCircle2, AlertCircle
} from "lucide-react";
import { Incident } from "@/types/incidents";
import { Badge } from "@/components/ui/Badge";
import { WorkflowStepper } from "./WorkflowStepper";
import { CorrectiveActionList } from "./CorrectiveActionList";
import { format } from "date-fns";
import { cn } from "@/components/ui/Card";

interface IncidentDetailPanelProps {
  incident: Incident | null;
  onClose: () => void;
}

export function IncidentDetailPanel({ incident, onClose }: IncidentDetailPanelProps) {
  const [isReopening, setIsReopening] = useState(false);
  const [reopenReason, setReopenReason] = useState("");

  if (!incident) return null;

  const isClosed = incident.status === "Closed";

  const handleReopen = () => {
    if (reopenReason.trim()) {
      // In a real app, dispatch to API
      alert(`Incident Reopened. Reason: ${reopenReason}`);
      setIsReopening(false);
      setReopenReason("");
      onClose(); // Or just update local state
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Panel */}
        <motion.div
          initial={{ x: "100%", opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0.5 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl bg-slate-50 h-full shadow-2xl flex flex-col border-l border-slate-200"
        >
          {/* Header */}
          <div className="bg-white border-b border-slate-200 p-6 flex-shrink-0 relative z-10">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3 pr-12">
              <Badge variant={incident.severity === "Critical" ? "error" : incident.severity === "High" ? "warning" : "default"}>
                {incident.severity} Severity
              </Badge>
              <Badge variant={isClosed ? "success" : "default"}>{incident.status}</Badge>
              {incident.isRestricted && (
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded group relative cursor-help">
                  <Lock className="w-3 h-3" />
                  Restricted
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-white p-2 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    Visible to Compliance Officer, Supervisor only
                  </div>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-1">{incident.type}</h2>
            <div className="text-sm text-slate-500 flex items-center gap-2">
              <span>ID: {incident.id}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {incident.location}</span>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-brand-teal text-slate-700 hover:text-brand-teal text-sm font-medium rounded-xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-colors">
                <Download className="w-4 h-4" />
                Generate PDF
              </button>

              {isClosed && (
                <button
                  onClick={() => setIsReopening(!isReopening)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-accent-amber text-accent-amber hover:bg-accent-amber/5 text-sm font-medium rounded-xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reopen Incident
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">

            {/* Reopen Form Overlay/Section */}
            <AnimatePresence>
              {isReopening && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6">
                    <h4 className="text-sm font-bold text-amber-900 mb-2">Reopen Incident</h4>
                    <textarea
                      className="w-full text-sm p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 mb-3"
                      placeholder="Reason for reopening (required)..."
                      rows={3}
                      value={reopenReason}
                      onChange={(e) => setReopenReason(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setIsReopening(false)} className="px-3 py-1.5 text-sm text-amber-700 hover:bg-amber-100 rounded-lg">Cancel</button>
                      <button onClick={handleReopen} disabled={!reopenReason.trim()} className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded-lg disabled:opacity-50">Confirm Reopen</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pattern Detected Callout */}
            {incident.patternDetected && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-accent-amber/10 border border-accent-amber p-4 rounded-xl flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-accent-amber shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Pattern Detected</h4>
                  <p className="text-xs text-amber-800 mt-1 mb-2">{incident.patternDetected}</p>
                  <button className="text-xs font-semibold bg-white text-accent-amber px-3 py-1.5 rounded-lg border border-accent-amber/30 hover:bg-accent-amber hover:text-white transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                    Flag on Patient Profile
                  </button>
                </div>
              </motion.div>
            )}

            {/* Workflow Tracker */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              <h3 className="text-sm font-bold text-slate-800 mb-2">Workflow Status</h3>
              <WorkflowStepper workflow={incident.workflow} />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                <h3 className="text-sm font-bold text-slate-800 mb-4">People Involved</h3>
                <div className="space-y-4">
                  {incident.peopleInvolved.map((person, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        {person.avatar ? (
                          <img src={person.avatar} alt={person.name} className="w-full h-full object-cover bg-slate-100" />
                        ) : (
                          <div className="w-full h-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm border border-slate-200">
                            {person.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{person.name}</div>
                        <div className="text-xs text-slate-500">{person.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col gap-4">
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Incident Time</div>
                  <div className="text-sm font-medium text-slate-800">{format(new Date(incident.incidentDate), "MMM d, yyyy - h:mm a")}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Reported Time</div>
                  <div className="text-sm font-medium text-slate-800">{format(new Date(incident.reportedDate), "MMM d, yyyy - h:mm a")}</div>
                </div>
                {incident.investigatorName && (
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-1">Assigned Investigator</div>
                    <div className="text-sm font-medium text-slate-800">{incident.investigatorName}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Incident Description</h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100">
                {incident.description}
              </p>
            </div>

            {/* Regulatory Reporting */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-teal" />
                  Regulatory Reporting
                </h3>
                <Badge variant={
                  incident.regulatoryReport.status === "Overdue" ? "error" :
                    incident.regulatoryReport.status === "Submitted" ? "success" :
                      incident.regulatoryReport.status === "Pending" ? "warning" : "default"
                }>
                  {incident.regulatoryReport.status}
                </Badge>
              </div>

              {incident.regulatoryReport.required ? (
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-1">Agency</div>
                    <div className="text-sm font-semibold text-slate-800">{incident.regulatoryReport.agency}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-1">Deadline</div>
                    <div className={cn(
                      "text-sm font-semibold",
                      incident.regulatoryReport.status === "Overdue" ? "text-accent-red" : "text-slate-800"
                    )}>
                      {incident.regulatoryReport.deadline ? format(new Date(incident.regulatoryReport.deadline), "MMM d, yyyy - h:mm a") : "N/A"}
                    </div>
                  </div>
                  {incident.regulatoryReport.submittedDate && (
                    <>
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-1">Submitted Date</div>
                        <div className="text-sm font-medium text-slate-800">{format(new Date(incident.regulatoryReport.submittedDate), "MMM d, yyyy")}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-1">Confirmation Number</div>
                        <div className="text-sm font-mono bg-white px-2 py-1 rounded border border-slate-200 inline-block">{incident.regulatoryReport.confirmationNumber}</div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No external regulatory reporting required for this incident type.</p>
              )}
            </div>

            {/* Linked Visit */}
            {incident.linkedVisit && (
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex items-start justify-between group cursor-pointer hover:border-brand-teal/50 transition-colors">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                    <Link2 className="w-4 h-4 text-brand-teal" />
                    Linked Visit Record
                  </h3>
                  <div className="text-sm text-slate-600">
                    {format(new Date(incident.linkedVisit.date), "MMM d, yyyy")} • {incident.linkedVisit.caregiverName} & {incident.linkedVisit.patientName}
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    {incident.linkedVisit.gpsVerified && (
                      <span className="flex items-center gap-1 text-xs text-accent-green font-medium bg-accent-green/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> GPS Verified
                      </span>
                    )}
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {incident.linkedVisit.clockInTime ? format(new Date(incident.linkedVisit.clockInTime), "h:mm a") : "--"}
                      {" - "}
                      {incident.linkedVisit.clockOutTime ? format(new Date(incident.linkedVisit.clockOutTime), "h:mm a") : "--"}
                    </span>
                  </div>
                </div>
                <div className="text-brand-teal text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  View full record <span className="text-lg leading-none">→</span>
                </div>
              </div>
            )}

            {/* Corrective Actions */}
            {incident.correctiveActions && incident.correctiveActions.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                <h3 className="text-sm font-bold text-slate-800 mb-4">Corrective Action Plan</h3>
                <CorrectiveActionList actions={incident.correctiveActions} />
              </div>
            )}

            {/* Sign-off */}
            {incident.signOff && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                <div className="text-sm text-slate-500 mb-1">Incident Closed & Signed Off By</div>
                <div className="font-[signature] text-3xl text-slate-800 my-2" style={{ fontFamily: "cursive" }}>
                  {incident.signOff.name}
                </div>
                <div className="text-xs text-slate-400">{format(new Date(incident.signOff.date), "MMMM d, yyyy - h:mm a")}</div>
              </div>
            )}

            {/* Spacer */}
            <div className="h-8" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
