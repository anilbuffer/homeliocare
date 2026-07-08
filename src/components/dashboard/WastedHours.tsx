"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

export function WastedHours() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="Wasted Hours" action={<span className="text-brand-teal text-sm font-medium">Analysis →</span>} />
      
      <div className="mb-6 flex items-end gap-3">
        <div className="text-4xl font-bold text-text-primary">124<span className="text-lg text-text-secondary font-normal">hrs</span></div>
        <div className="mb-1 text-sm font-medium text-accent-red">Est. cost: $3,100</div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-slate-50 rounded-lg p-2 text-center border border-border-subtle">
          <div className="text-lg font-bold text-text-primary">82h</div>
          <div className="text-[10px] text-text-secondary leading-tight">Early Clock-outs</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 text-center border border-border-subtle">
          <div className="text-lg font-bold text-text-primary">31h</div>
          <div className="text-[10px] text-text-secondary leading-tight">Late Clock-ins</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 text-center border border-border-subtle">
          <div className="text-lg font-bold text-text-primary">11h</div>
          <div className="text-[10px] text-text-secondary leading-tight">No-shows</div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Top Offenders</div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar src="https://i.pravatar.cc/150?u=22" fallback="R" size="sm" />
              <div>
                <div className="text-sm font-medium">Richard S.</div>
                <div className="text-[10px] text-text-secondary">Sched: 40h • Actual: 32h</div>
              </div>
            </div>
            <Badge variant="error">-8h</Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar src="https://i.pravatar.cc/150?u=33" fallback="A" size="sm" />
              <div>
                <div className="text-sm font-medium">Amanda L.</div>
                <div className="text-[10px] text-text-secondary">Sched: 36h • Actual: 30h</div>
              </div>
            </div>
            <Badge variant="error">-6h</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
