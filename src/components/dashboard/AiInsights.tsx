"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Sparkles, Users, ShieldAlert, TrendingUp } from "lucide-react";

export function AiInsights() {
  return (
    <Card className="flex flex-col h-full bg-gradient-to-b from-white to-slate-50">
      <CardHeader 
        title={<div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-teal" /> Sidekick Insights</div>} 
        action={<span className="text-brand-teal text-sm font-medium">Ask Sidekick →</span>} 
      />
      
      <div className="flex-1 space-y-4">
        {/* Staffing Insight */}
        <div className="bg-white border border-border-subtle rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-blue/10 text-accent-blue flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold mb-1">Staffing Shortfall Risk</div>
              <div className="text-xs text-text-secondary leading-relaxed">
                You have 14 unfilled shifts in the next 48 hours. Consider offering premium pay to available staff to cover the gap.
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Insight */}
        <div className="bg-white border border-border-subtle rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-orange/10 text-accent-orange flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold mb-1">Authorization Alerts</div>
              <div className="text-xs text-text-secondary leading-relaxed">
                12 patients are exceeding 90% of their authorized hours. Review care plans to prevent unbillable visits.
              </div>
            </div>
          </div>
        </div>

        {/* Performance Insight */}
        <div className="bg-white border border-border-subtle rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-green/10 text-accent-green flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold mb-1">Revenue Optimization</div>
              <div className="text-xs text-text-secondary leading-relaxed">
                Fixing the 8 missing EVV location exceptions today could release $1,400 in held billing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
