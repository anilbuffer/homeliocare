"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  PhoneCall,
  CheckCircle2,
  Clock,
  Building2,
  UserPlus,
  Phone,
  Mic,
  Activity
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
    id: "inq-ew-101",
    patientId: "ref-ew-001",
    name: "Eleanor Whitfield",
    source: "Hospital Discharge (Cedar Falls)",
    waitTimeStr: "5m",
    waitTimeMins: 5,
    isHospitalDischarge: true,
    phone: "(610) 555-0148"
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
  const [activeCallId, setActiveCallId] = useState<string | null>(null);

  const getWaitTimeColor = (mins: number, isUrgent: boolean) => {
    if (isUrgent || mins > 30) return "bg-red-100 text-red-700 border-red-200 animate-pulse shadow-[0_4px_20px_rgba(0,0,0,0.04)] shadow-red-500/20";
    if (mins >= 15) return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
                    <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                      <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border shrink-0", getWaitTimeColor(inq.waitTimeMins, inq.isHospitalDischarge))}>
                        <Clock className="w-3.5 h-3.5" />
                        Wait: {inq.waitTimeStr}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveCallId(inq.id)}
                          disabled={isCompleting}
                          className="flex items-center justify-center gap-1.5 bg-brand-teal hover:bg-teal-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.04)] shadow-brand-teal/20 active:scale-95 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          Call Patient
                        </button>
                        <button
                          onClick={() => handleLogContact(inq.id)}
                          disabled={isCompleting}
                          className="flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors active:scale-95 cursor-pointer"
                        >
                          Log
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* VoIP Call Transcription Modal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeCallId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Call header */}
                <div className="bg-slate-900 p-4 text-white flex justify-between items-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-xs text-brand-teal font-semibold uppercase tracking-wider mb-0.5 flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" /> Live VoIP Call
                    </p>
                    <h3 className="font-semibold text-base">{inquiries.find(i => i.id === activeCallId)?.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 relative z-10 bg-black/30 px-3 py-1.5 rounded-full">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-sm font-medium tabular-nums">00:14</span>
                  </div>
                </div>

                {/* Transcription body */}
                <div className="p-4 lg:p-6 h-70 overflow-y-auto bg-slate-50 flex flex-col gap-4">
                  <div className="text-center mb-2">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-200 px-2 py-0.5 rounded-full">Call Connected</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center shrink-0 font-semibold text-xs">You</div>
                    <div className="bg-white border border-slate-200 p-2.5 rounded-2xl rounded-tl-sm text-sm text-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.04)] leading-relaxed">
                      Hi, this is James from HomelioCare. I'm calling about the hospital discharge pending for {inquiries.find(i => i.id === activeCallId)?.name?.split(" ")[0]}.
                    </div>
                  </div>
                  <div className="flex gap-2 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center shrink-0 font-semibold text-[10px] uppercase">{inquiries.find(i => i.id === activeCallId)?.name?.substring(0, 2)}</div>
                    <div className="bg-blue-600 text-white p-2.5 rounded-2xl rounded-tr-sm text-sm shadow-[0_4px_20px_rgba(0,0,0,0.04)] leading-relaxed">
                      Oh, hello James. Yes, we are waiting for the transport now. The discharge papers are ready.
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center shrink-0 font-semibold text-xs">You</div>
                    <div className="bg-white border border-slate-200 p-2.5 rounded-2xl rounded-tl-sm text-sm text-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center gap-2">
                      <span className="flex gap-1 h-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer actions */}
                <div className="p-4 bg-white border-t border-slate-100 flex justify-center items-center gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                  <button className="flex flex-col items-center gap-1 group">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                      <Mic className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500">Mute</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogContact(activeCallId!);
                      setActiveCallId(null);
                    }}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center group-hover:bg-red-600 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.04)] shadow-red-500/30">
                      <Phone className="w-6 h-6 transform rotate-[135deg]" />
                    </div>
                    <span className="text-[10px] font-semibold text-red-500">End Call</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </Card>
  );
}
