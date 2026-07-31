"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { ShieldAlert, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/components/ui/Card";

type IncidentStatus = "Under Review" | "Action Taken" | "Closed";

type Incident = {
  id: string;
  clientName: string;
  dateFiled: string;
  type: string;
  status: IncidentStatus;
};

const mockIncidents: Incident[] = [
  { id: "inc-1", clientName: "Samuel Oak", dateFiled: "Today", type: "Fall (No Injury)", status: "Under Review" },
  { id: "inc-2", clientName: "Arthur Pendelton", dateFiled: "Last Week", type: "Medication Error", status: "Closed" },
];

export function RecentIncidentsFiled() {
  return (
    <Card className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <CardHeader
        title="Recent Incidents I've Filed"
        subtitle="Status of your submitted reports"
        action={<ShieldAlert className="w-5 h-5 text-slate-400" />}
      />

      <div className="flex-1 space-y-3 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {mockIncidents.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            <p>No recent incidents filed.</p>
          </div>
        ) : (
          mockIncidents.map((incident) => (
            <div key={incident.id} className="flex flex-col sm:flex-row gap-4 px-4 py-3 rounded-xl border border-border-subtle bg-slate-50/50 hover:bg-slate-100/50 transition-colors group">
              <div className="flex gap-4 items-center flex-1 min-w-0">
                <div className={cn(
                  "p-2 rounded-full shrink-0",
                  incident.status === "Under Review" ? "bg-accent-amber/20 text-accent-amber" :
                    incident.status === "Action Taken" ? "bg-brand-teal/20 text-brand-teal" :
                      "bg-slate-200/50 text-slate-600"
                )}>
                  {incident.status === "Closed" ? <CheckCircle2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-semibold text-text-primary text-sm truncate">{incident.clientName}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{incident.type}</span>
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      {incident.dateFiled}
                    </span>
                  </div>
                </div>
              </div>
              <div className="shrink-0 flex items-center justify-end sm:justify-center">
                <Badge
                  variant={incident.status === "Under Review" ? "warning" : incident.status === "Action Taken" ? "success" : "default"}
                >
                  {incident.status}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
