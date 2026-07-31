"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Calendar, User, MapPin, AlertCircle, CheckCircle2, Play } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/components/ui/Card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Visit = {
  id: string;
  clientName: string;
  address: string;
  caregiverAssigned: string;
  lastVisitDate: string | null;
  visitTypeRequired: "Initial" | "Periodic" | "Unannounced";
  dueDate: string;
  status: "due" | "overdue";
};

const mockVisits: Visit[] = [
  {
    id: "v-1",
    clientName: "Eleanor Vance",
    address: "142 Maple St, Apt 4B",
    caregiverAssigned: "Maria Santos, CNA",
    lastVisitDate: null,
    visitTypeRequired: "Initial",
    dueDate: "2026-07-31",
    status: "due",
  },
  {
    id: "v-2",
    clientName: "Arthur Pendelton",
    address: "889 Oakwood Dr",
    caregiverAssigned: "James Wilson",
    lastVisitDate: "2026-05-10",
    visitTypeRequired: "Periodic",
    dueDate: "2026-07-28",
    status: "overdue",
  },
  {
    id: "v-3",
    clientName: "Margaret Higgins",
    address: "55 Pine Lane",
    caregiverAssigned: "Sarah Jenkins",
    lastVisitDate: "2025-08-15",
    visitTypeRequired: "Unannounced",
    dueDate: "2026-08-05",
    status: "due",
  },
];

export function VisitDueQueue() {
  const [visits, setVisits] = useState<Visit[]>(mockVisits);
  const router = useRouter();

  const handleStartVisit = (id: string) => {
    // In a real app, this would route to the evaluation form with the visit context.
    toast.success("Starting Visit Evaluation");
    router.push(`/field-supervisor/visits?client=${id}`);
  };

  return (
    <Card className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <CardHeader
        title="Visit Queue"
        subtitle="Due & overdue supervisory visits"
        action={
          <div className="bg-brand-teal/10 text-brand-teal px-3 py-1 rounded-full text-xs font-medium">
            {visits.length} Visits pending
          </div>
        }
      />
      <div className="flex-1 space-y-3 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {visits.length === 0 ? (
          <div className="p-8 text-center text-text-secondary flex flex-col items-center">
            <CheckCircle2 className="w-10 h-10 text-accent-green mb-3" />
            <p className="font-medium text-text-primary">No visits due this week</p>
            <p className="text-xs mt-1">Nice work! You're all caught up.</p>
          </div>
        ) : (
          visits.map((visit) => (
            <div key={visit.id} className="p-4 hover:bg-slate-100/50 transition-colors group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border-subtle bg-slate-50/50">
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary text-sm truncate">{visit.clientName}</span>
                  {visit.status === "overdue" && (
                    <Badge variant="error" className="shrink-0 flex items-center gap-1 text-xs">
                      <AlertCircle className="w-3 h-3" /> Overdue
                    </Badge>
                  )}
                  <span className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0",
                    visit.visitTypeRequired === "Initial" ? "border-brand-teal/30 text-brand-teal bg-brand-teal/5" :
                      visit.visitTypeRequired === "Periodic" ? "border-accent-blue/30 text-accent-blue bg-accent-blue/5" :
                        "border-accent-purple/30 text-accent-purple bg-accent-purple/5"
                  )}>
                    {visit.visitTypeRequired}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-text-secondary">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{visit.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{visit.caregiverAssigned}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    Due: {visit.dueDate}
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-medium shrink-0">Last Visit:</span>
                    <span className="truncate">{visit.lastVisitDate ? visit.lastVisitDate : "None (New)"}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-end sm:justify-center">
                <button
                  onClick={() => handleStartVisit(visit.id)}
                  className="flex items-center gap-2 bg-white border border-slate-200 text-text-primary font-medium text-xs px-3 py-2 rounded-xl hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] group/btn"
                >
                  <Play className="h-3.5 h-3.5 fill-current group-hover/btn:scale-110 transition-transform" />
                  Start Evaluation
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
