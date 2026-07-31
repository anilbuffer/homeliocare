import React from "react";
import { CommunicationsLayout } from "@/components/communications/CommunicationsLayout";
import { MessageSquare } from "lucide-react";

export default function FieldSupervisorMessagesPage() {
  return (
    <div className="w-full mx-auto space-y-4 flex flex-col h-[calc(100vh-140px)]">
      {/* Header Banner */}
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 lg:mb-4 shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-teal" />
            Messages
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">Coordination with clinical, scheduling, and your assigned caregivers</p>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex-1 min-h-0">
        <CommunicationsLayout initialCategory="Staff & Caregivers" />
      </div>
    </div>
  );
}
