"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function AuthUtilization() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="Authorization utilization" action={<span className="text-brand-teal text-sm font-medium">Report →</span>} />

      <div className="flex-1 space-y-4">
        {/* At Risk */}
        <div className="bg-white border border-border-subtle rounded-xl p-3 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-accent-red">At Risk (90%+)</span>
            <span className="text-xs font-medium bg-accent-red/10 text-accent-red px-2 py-0.5 rounded-md">12 Patients</span>
          </div>
          <ProgressBar progress={94} color="bg-accent-red" />
        </div>

        {/* Approaching */}
        <div className="bg-white border border-border-subtle rounded-xl p-3 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-accent-amber">Approaching (75-90%)</span>
            <span className="text-xs font-medium bg-accent-amber/10 text-accent-amber px-2 py-0.5 rounded-md">28 Patients</span>
          </div>
          <ProgressBar progress={82} color="bg-accent-amber" />
        </div>

        {/* On Track */}
        <div className="bg-white border border-border-subtle rounded-xl p-3 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-brand-teal">On Track (&lt;75%)</span>
            <span className="text-xs font-medium bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-md">845 Patients</span>
          </div>
          <ProgressBar progress={45} color="bg-brand-teal" />
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border-subtle mt-6 pt-4 border-t border-border-subtle text-center">
        <div>
          <div className="text-lg font-bold text-text-primary">885</div>
          <div className="text-xs text-text-secondary">Active Auths</div>
        </div>
        <div>
          <div className="text-lg font-bold text-text-primary">14</div>
          <div className="text-xs text-text-secondary">Expiring Soon</div>
        </div>
        <div>
          <div className="text-lg font-bold text-text-primary">3</div>
          <div className="text-xs text-text-secondary">Expired</div>
        </div>
      </div>
    </Card>
  );
}
