"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  PhoneCall,
  CheckCircle2,
  Clock,
  Building2,
  UserPlus
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/components/ui/Card";

interface Inquiry {
  id: string;
  patientId: string;
  name: string;
  source: string;
  waitTimeStr: string;
  waitTimeMins: number;
  isHospitalDischarge: boolean;
  phone: string;
}

const initialInquiries: Inquiry[] = [
  {
    id: "inq-101",
    patientId: "c-1",
    name: "Eleanor Vance (Family: Robert)",
    source: "Hospital Discharge (Mercy Gen)",
    waitTimeStr: "12m",
    waitTimeMins: 12,
    isHospitalDischarge: true,
    phone: "(555) 123-4567"
  },
  {
    id: "inq-102",
    patientId: "c-2",
    name: "Arthur Pendelton",
    source: "Website Lead",
    waitTimeStr: "45m",
    waitTimeMins: 45,
    isHospitalDischarge: false,
    phone: "(555) 987-6543"
  },
  {
    id: "inq-103",
    patientId: "c-1",
    name: "Margaret Smith",
    source: "Physician Referral",
    waitTimeStr: "18m",
    waitTimeMins: 18,
    isHospitalDischarge: false,
    phone: "(555) 234-5678"
  },
];

export function IntakeUrgencyQueue() {
  const router = useRouter();

  // Sort logic: Hospital Discharges first, then by longest wait time
  const sortInquiries = (inqs: Inquiry[]) => {
    return [...inqs].sort((a, b) => {
      if (a.isHospitalDischarge && !b.isHospitalDischarge) return -1;
      if (!a.isHospitalDischarge && b.isHospitalDischarge) return 1;
      return b.waitTimeMins - a.waitTimeMins;
    });
  };

  const [inquiries, setInquiries] = useState<Inquiry[]>(sortInquiries(initialInquiries));
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const handleLogContact = (id: string) => {
    const inquiry = inquiries.find(i => i.id === id);
    if (!inquiry) return;
    
    setCompletedIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      setCompletedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      if (inquiry.patientId) {
        router.push(`/intake/patients/${inquiry.patientId}`);
      }
    }, 800); // Wait for success animation
  };

  return (
    <Card className="flex flex-col h-full bg-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Response-Time Urgency Queue</h3>
            <p className="text-[11px] text-slate-500">Sorted by urgency & SLA</p>
          </div>
        </div>
        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
          {inquiries.length} Waiting
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {inquiries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-40 text-slate-400"
            >
              <CheckCircle2 className="w-10 h-10 mb-3 text-emerald-400 opacity-50" />
              <p className="text-sm font-medium">No new inquiries right now.</p>
              <p className="text-xs">Nice work staying on top of the queue!</p>
            </motion.div>
          ) : (
            inquiries.map((inq) => {
              const isCompleting = completedIds.has(inq.id);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  key={inq.id}
                  className={cn(
                    "mb-3 p-3.5 rounded-xl border transition-colors relative overflow-hidden",
                    inq.isHospitalDischarge
                      ? "bg-red-50/40 border-red-200 hover:border-red-300 hover:shadow-md hover:shadow-red-500/5"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-500/5"
                  )}
                >
                  {/* Success Overlay */}
                  <AnimatePresence>
                    {isCompleting && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-10 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-600 font-semibold text-sm"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Contact Logged
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-bold text-slate-900 text-sm truncate">{inq.name}</span>
                        {inq.isHospitalDischarge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100 px-2 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            Urgent Discharge
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <UserPlus className="w-3.5 h-3.5 text-slate-400" />
                          {inq.source}
                        </span>
                        <span className="flex items-center gap-1">
                          <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                          {inq.phone}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto mt-1 sm:mt-0">
                      <div className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-semibold border border-slate-200 shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                        Wait: {inq.waitTimeStr}
                      </div>
                      <button
                        onClick={() => handleLogContact(inq.id)}
                        disabled={isCompleting}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-brand-teal hover:bg-brand-teal/90 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-brand-teal/20 active:scale-95 cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        Log Contact
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
