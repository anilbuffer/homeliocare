"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { AlertTriangle, MessageSquare, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/components/ui/Card";

type Finding = {
  id: string;
  clientName: string;
  description: string;
  severity: "minor" | "moderate" | "urgent";
  dateIdentified: string;
};

const mockFindings: Finding[] = [
  {
    id: "f-1",
    clientName: "Margaret Higgins",
    description: "Caregiver not fully following mobility care plan during transfer.",
    severity: "moderate",
    dateIdentified: "2 days ago",
  },
  {
    id: "f-2",
    clientName: "Samuel Oak",
    description: "Minor home safety hazard noted (loose rug in hallway).",
    severity: "minor",
    dateIdentified: "1 week ago",
  }
];

export function FindingsFollowUpQueue() {
  const [findings, setFindings] = useState<Finding[]>(mockFindings);

  const handleLogFollowUp = (id: string) => {
    toast.success("Follow-up logged successfully");
    setFindings(findings.filter((f) => f.id !== id));
  };

  const handleEscalate = (id: string) => {
    toast.info("Escalated to Clinical Supervisor");
    setFindings(findings.filter((f) => f.id !== id));
  };

  return (
    <Card className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <CardHeader
        title="Findings Follow-Up Queue"
        subtitle="Open quality and coaching items"
        action={
          <div className="bg-accent-amber/10 text-accent-amber px-3 py-1 rounded-full text-xs font-semibold shrink-0">
            {findings.length} Open Findings
          </div>
        }
      />

      <div className="flex-1 space-y-3 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {findings.length === 0 ? (
          <div className="p-8 text-center text-text-secondary flex flex-col items-center justify-center h-full min-h-[150px]">
            <CheckCircle2 className="w-10 h-10 text-accent-green mb-3" />
            <p className="font-medium text-text-primary">No open findings</p>
            <p className="text-sm mt-1">Excellent work.</p>
          </div>
        ) : (
          findings.map((finding) => (
            <div key={finding.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border-subtle bg-slate-50/50 hover:bg-slate-100/50 transition-colors group">
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={cn(
                    "w-4 h-4 shrink-0",
                    finding.severity === "minor" ? "text-accent-amber" : finding.severity === "moderate" ? "text-accent-orange" : "text-accent-red"
                  )} />
                  <span className="font-semibold text-text-primary text-sm truncate">{finding.clientName}</span>
                  <span className="text-xs text-text-secondary shrink-0">• {finding.dateIdentified}</span>
                </div>
                <p className="text-xs text-text-secondary pl-6 line-clamp-2">
                  {finding.description}
                </p>
              </div>
              <div className="shrink-0 flex items-center justify-end sm:justify-center gap-2 pl-6 sm:pl-0">
                <button
                  onClick={() => handleLogFollowUp(finding.id)}
                  className="flex items-center justify-center gap-1.5 bg-white border border-slate-200 text-text-primary text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-slate-100 hover:text-brand-teal transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] group/btn"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Log Follow-up
                </button>
                <button
                  onClick={() => handleEscalate(finding.id)}
                  className="flex items-center justify-center gap-1.5 bg-white border border-slate-200 text-text-primary text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-slate-100 hover:text-accent-red transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] group/btn"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Escalate
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
