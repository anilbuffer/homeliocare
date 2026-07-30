"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle, Clock, ShieldAlert } from "lucide-react";
import { RestrictedIncident } from "@/lib/mock-data/compliance-dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Props {
  incidents: RestrictedIncident[];
}

export function RestrictedIncidentQueue({ incidents: initialIncidents }: Props) {
  const [incidents, setIncidents] = useState(initialIncidents);

  const handleAction = (id: string, actionName: string) => {
    setIncidents(prev => prev.filter(inc => inc.id !== id));
    toast.success(`Incident ${id} ${actionName} successfully`);
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-rose-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden h-auto lg:h-full flex flex-col">
      <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
      <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            Restricted Incident Queue
          </h3>
          <p className="text-xs text-slate-500 font-normal mt-0.5">Agency-wide sensitive incidents requiring immediate oversight.</p>
        </div>
        <span className="bg-rose-50 text-rose-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-rose-200">
          {incidents.length} Critical
        </span>
      </div>

      <div className="flex-1 overflow-visible lg:overflow-auto mt-3 pr-1 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        <AnimatePresence>
          {incidents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center flex flex-col items-center justify-center text-slate-500 h-full"
            >
              <CheckCircle className="w-12 h-12 text-emerald-400 mb-3" />
              <p className="text-sm font-semibold text-slate-700">No Restricted Incidents</p>
              <p className="text-xs mt-1">All sensitive incidents have been resolved.</p>
            </motion.div>
          ) : (
            incidents.map((incident) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white bg-rose-500">
                      {incident.id}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">{incident.type}</span>
                  </div>
                  <div className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {Math.floor(incident.stateReportingDeadline / 60)}h remaining
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <span className="text-slate-500 block mb-0.5">Client</span>
                    <span className="font-medium text-slate-900">{incident.client}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Status</span>
                    <span className="font-medium text-brand-teal px-3 py-1 rounded-full bg-brand-teal/20">{incident.investigationStatus}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block mb-0.5">Notification Chain</span>
                    <span className="font-medium text-slate-900">{incident.notificationChainStatus}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleAction(incident.id, "acknowledged")}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-full hover:bg-slate-50 transition-colors cursor-pointer active:scale-95"
                  >
                    Acknowledge
                  </button>
                  <button
                    onClick={() => handleAction(incident.id, "resolved & closed")}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-brand-teal rounded-full hover:bg-brand-teal/90 transition-colors cursor-pointer active:scale-95"
                  >
                    Resolve & Close
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
