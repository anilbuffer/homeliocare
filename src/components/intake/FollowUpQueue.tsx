"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/components/ui/Card";

interface FollowUpLead {
  id: string;
  patientId: string;
  name: string;
  lastContact: string;
  daysStale: number;
  note: string;
}

const initialFollowUps: FollowUpLead[] = [
  {
    id: "lead-201",
    patientId: "c-1",
    name: "James Wilson (Family: Sarah)",
    lastContact: "Last Tuesday",
    daysStale: 6,
    note: "Comparing agencies, waiting on pricing confirmation."
  },
  {
    id: "lead-202",
    patientId: "c-2",
    name: "Thomas Anderson",
    lastContact: "Yesterday",
    daysStale: 1,
    note: "Left voicemail, try again morning."
  },
  {
    id: "lead-203",
    patientId: "c-1",
    name: "Nancy Davis",
    lastContact: "3 days ago",
    daysStale: 3,
    note: "Decision maker (son) was out of town until today."
  },
];

export function FollowUpQueue() {
  const router = useRouter();
  const sortLeads = (leads: FollowUpLead[]) => {
    return [...leads].sort((a, b) => b.daysStale - a.daysStale);
  };

  const [leads, setLeads] = useState<FollowUpLead[]>(sortLeads(initialFollowUps));
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const handleAction = (id: string, actionType: 'email' | 'sms') => {
    const lead = leads.find(l => l.id === id);
    if (!lead) return;

    setCompletedIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setCompletedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      router.push(`/intake/patients/${lead.patientId}`);
    }, 800);
  };

  return (
    <Card className="flex flex-col h-full bg-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Follow-Up Queue</h3>
            <p className="text-[11px] text-slate-500">Stale leads needing touches</p>
          </div>
        </div>
        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
          {leads.length} Due
        </div>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {leads.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-40 text-slate-400"
            >
              <CheckCircle2 className="w-10 h-10 mb-3 text-emerald-400 opacity-50" />
              <p className="text-sm font-medium">No leads need follow-up today.</p>
            </motion.div>
          ) : (
            leads.map((lead) => {
              const isCompleting = completedIds.has(lead.id);
              const isVeryStale = lead.daysStale > 3;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  key={lead.id}
                  className={cn(
                    "mb-3 p-3.5 rounded-xl border transition-colors relative overflow-hidden",
                    isVeryStale
                      ? "bg-amber-50/40 border-amber-200 hover:border-amber-300 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                      : "bg-white border-slate-200 hover:border-slate-300 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                  )}
                >
                  <AnimatePresence>
                    {isCompleting && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-10 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-600 font-semibold text-sm"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Follow-up Logged
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("font-bold text-sm truncate",
                          isVeryStale ? "text-amber-700 " : "text-slate-900  "
                        )}>{lead.name}</span>
                      </div>
                      <div className={cn("text-xs text-slate-500 line-clamp-1 mb-2",
                        isVeryStale ? "text-amber-700 " : "text-slate-600 "
                      )}>
                        {lead.note}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border",
                          isVeryStale ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-slate-100 text-slate-600 border-slate-200"
                        )}>
                          <Clock className="w-3 h-3" />
                          Last touch: {lead.lastContact}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                      <button
                        onClick={() => handleAction(lead.id, 'email')}
                        disabled={isCompleting}
                        className="flex-1 sm:flex-none flex items-center justify-center p-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction(lead.id, 'sms')}
                        disabled={isCompleting}
                        className="flex-1 sm:flex-none flex items-center justify-center p-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                        title="Send SMS"
                      >
                        <MessageCircle className="w-4 h-4" />
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
