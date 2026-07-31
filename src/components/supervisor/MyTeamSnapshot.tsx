"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Users, Star, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/components/ui/Card";

type TeamMember = {
  id: string;
  name: string;
  reliability: number;
  lastVisitRating: number;
  incidentInvolvement: boolean;
};

const mockTeam: TeamMember[] = [
  { id: "cg-1", name: "Maria Santos, CNA", reliability: 98, lastVisitRating: 5, incidentInvolvement: false },
  { id: "cg-2", name: "James Wilson", reliability: 82, lastVisitRating: 4, incidentInvolvement: true },
  { id: "cg-3", name: "Sarah Jenkins", reliability: 95, lastVisitRating: 4.5, incidentInvolvement: false },
  { id: "cg-4", name: "David Chen", reliability: 100, lastVisitRating: 5, incidentInvolvement: false },
];

export function MyTeamSnapshot() {
  return (
    <Card className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <CardHeader
        title="My Team Snapshot"
        subtitle="Assigned caregivers performance"
        action={<Users className="w-5 h-5 text-slate-400" />}
      />

      <div className="flex-1 space-y-3 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {mockTeam.map((member) => (
          <div key={member.id} className="flex gap-4 items-center p-3 rounded-xl border border-border-subtle bg-slate-50/50 hover:bg-slate-100/50 transition-colors group">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-text-primary text-sm truncate flex items-center gap-1.5 mb-1">
                {member.name}
                {member.incidentInvolvement && (
                  <span title="Recent incident involvement" className="flex items-center text-accent-red bg-accent-red/10 p-1 rounded-md shrink-0">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-text-secondary">
                <span className={cn(
                  "font-medium",
                  member.reliability >= 95 ? "text-accent-green" : member.reliability >= 85 ? "text-accent-amber" : "text-accent-red"
                )}>
                  Reliability: {member.reliability}%
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-accent-amber fill-accent-amber" />
                  {member.lastVisitRating}
                </span>
              </div>
            </div>
            <Link
              href={`/field-supervisor/caregivers?id=${member.id}`}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-brand-teal group-hover:text-white group-hover:border-brand-teal transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] shrink-0"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
      <div className="pt-4 mt-auto border-t border-slate-100 text-center">
        <Link href="/field-supervisor/caregivers" className="text-sm font-medium text-brand-teal hover:underline">
          View All Assigned Caregivers
        </Link>
      </div>
    </Card>
  );
}
