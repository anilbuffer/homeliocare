"use client";

import React from "react";
import { motion } from "framer-motion";
import { CommunicationsLayout } from "@/components/communications/CommunicationsLayout";
import { MessageSquare, Shield } from "lucide-react";

export default function HrMessagesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full mx-auto space-y-4 flex flex-col h-[calc(100vh-120px)]"
    >
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-6 h-6 text-brand-teal" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">HR Candidate & Caregiver Communications</h1>
          </div>
          <p className="text-xs font-regular text-slate-500 mt-1">
            Scoped messaging for recruitment outreach, candidate interview coordination, and caregiver HR inquiries.
          </p>
        </div>
        <div className="bg-brand-teal/10 text-brand-teal text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-teal/20 flex items-center gap-1.5 self-start sm:self-auto shadow-[0_8px_24px_rgba(0,0,0,0.04)] shrink-0">
          <Shield className="w-4 h-4 text-brand-teal" />
          <span>HR Scoped Access &bull; Clinical & Patient threads protected</span>
        </div>
      </div>

      {/* Main Communications Layout Area */}
      <div className="flex-1 min-h-0 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-[0_6px_32px_rgba(0,0,0,0.04)] overflow-hidden">
        <CommunicationsLayout initialCategory="Staff & Caregivers" />
      </div>
    </motion.div>
  );
}

