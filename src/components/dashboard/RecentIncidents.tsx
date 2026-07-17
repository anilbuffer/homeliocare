"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ShieldAlert, AlertTriangle, AlertCircle } from "lucide-react";

const incidentsData = [
  { id: 1, title: "Missed Clock-in", subtitle: "Caregiver: Marcus T. • Patient: Helen S.", status: "Unresolved", variant: "error" as const, icon: AlertCircle },
  { id: 2, title: "Medication Refusal", subtitle: "Caregiver: Emily R. • Patient: Arthur D.", status: "In review", variant: "warning" as const, icon: AlertTriangle },
  { id: 3, title: "Fall Incident", subtitle: "Caregiver: Sarah J. • Patient: Robert M.", status: "Resolved", variant: "success" as const, icon: ShieldAlert },
];

export function RecentIncidents() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="Recent Incidents" action={<Link href="/incidents"><span className="text-brand-teal text-sm font-medium hover:underline cursor-pointer">View all →</span></Link>} />
      
      <div className="flex-1 space-y-4">
        {incidentsData.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex gap-4 items-start p-3 rounded-xl border border-border-subtle bg-slate-50/50">
              <div className={`p-2 rounded-lg ${item.variant === 'error' ? 'bg-accent-red/10 text-accent-red' : item.variant === 'warning' ? 'bg-accent-amber/10 text-accent-amber' : 'bg-accent-green/10 text-accent-green'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-semibold text-text-primary text-sm truncate">{item.title}</div>
                  <Badge variant={item.variant} className="ml-2 shrink-0">{item.status}</Badge>
                </div>
                <div className="text-xs text-text-secondary truncate">{item.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
