"use client";

import React from "react";
import { CommunicationsLayout } from "@/components/communications/CommunicationsLayout";
import { MessageSquare, ShieldCheck } from "lucide-react";

export default function SchedulerMessagesPage() {
  return (
    <div className="w-full mx-auto space-y-4 flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Scheduler Communications Hub</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
              Staff & Care Team Focused
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Shift confirmations, availability queries, and call-off notifications coordination
          </p>
        </div>
      </div>

      {/* Main Layout Area initialized to Staff & Caregivers tab */}
      <div className="flex-1 min-h-0">
        <CommunicationsLayout initialCategory="Staff & Caregivers" />
      </div>
    </div>
  );
}
