"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/components/ui/Card";

const feedData = [
  { id: 1, time: "08:00 AM", initials: "MC", bg: "bg-brand-teal/10 text-brand-teal", name: "Margaret Chen", role: "MD", address: "1289 Sunset Blvd", status: "Completed", variant: "success" as const },
  { id: 2, time: "08:00 AM", initials: "RA", bg: "bg-accent-blue/10 text-accent-blue", name: "Robert Alvarez", role: "RN", address: "44 Cedar Ave", status: "In progress", variant: "info" as const },
  { id: 3, time: "09:00 AM", initials: "AT", bg: "bg-accent-purple/10 text-accent-purple", name: "Aiko Tanaka", role: "LPN", address: "33 Fillmore St", status: "Scheduled", variant: "warning" as const },
  { id: 4, time: "09:00 AM", initials: "TB", bg: "bg-accent-amber/10 text-accent-amber", name: "Thomas Becker", role: "MD", address: "18 El Camino", status: "Scheduled", variant: "warning" as const },
  { id: 5, time: "09:00 AM", initials: "MC", bg: "bg-brand-teal/10 text-brand-teal", name: "Margaret Chen", role: "MD", address: "1289 Sunset Blvd", status: "Scheduled", variant: "warning" as const },
];

export function LiveVisitFeed() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="Live visit feed" action={<Link href="/evv-monitoring"><span className="text-brand-teal text-sm font-medium hover:underline cursor-pointer">View all →</span></Link>} />

      <div className="flex-1 space-y-3 mt-4 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {feedData.map((item) => (
          <div key={item.id} className="flex gap-3 items-center bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-2xl p-3 transition-all hover:-translate-y-0.5 group shrink-0">
            <div className="w-14 text-[11px] font-bold text-slate-400 shrink-0 text-right leading-tight">
              {item.time.replace(' ', '\n')}
            </div>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-bold shrink-0 shadow-inner border border-white/50 group-hover:scale-110 transition-transform", item.bg)}>
              {item.initials}
            </div>
            <div className="flex-1 min-w-0 flex flex-wrap justify-between items-center gap-2">
              <div className="min-w-0 flex-1 min-w-[140px]">
                <div className="font-bold text-slate-800 text-[13px] truncate flex items-center gap-1.5 mb-0.5 tracking-tight">
                  {item.name}
                  <span className="text-[9px] font-bold text-accent-orange px-1.5 py-0.5 bg-accent-orange/10 rounded-md border border-accent-orange/20 uppercase tracking-wider shrink-0">
                    {item.role}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-text-secondary truncate">
                  {item.address}
                </div>
              </div>
              <Badge variant={item.variant} className="shadow-[0_6px_32px_rgba(0,0,0,0.06)] shrink-0">{item.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
