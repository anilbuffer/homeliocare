"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function CaregiverOvertime() {
  return (
    <Card className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <CardHeader title="Caregiver overtime" action={<Link href="/scheduling"><span className="text-brand-teal text-sm font-medium hover:underline cursor-pointer">Schedule →</span></Link>} />

      <div className="flex-1 space-y-3">
        {/* Alerts */}
        <div className="bg-accent-red/5 border border-accent-red/20 rounded-xl p-3 flex gap-3 items-center">
          <Avatar src="https://i.pravatar.cc/150?u=12" fallback="J" size="sm" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm text-text-primary">Jessica Miller</div>
            <div className="text-xs text-accent-red flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> 42.5 hrs (2.5 hrs OT)
            </div>
          </div>
        </div>

        <div className="bg-accent-red/5 border border-accent-red/20 rounded-xl p-3 flex gap-3 items-center">
          <Avatar src="https://i.pravatar.cc/150?u=15" fallback="T" size="sm" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm text-text-primary">Thomas Wright</div>
            <div className="text-xs text-accent-red flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> 41.0 hrs (1.0 hr OT)
            </div>
          </div>
        </div>

        {/* Healthy pill */}
        <div className="mt-4 bg-accent-green/10 text-accent-green rounded-xl p-3 flex items-center gap-2 text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" />
          98% of staff under 40 hours
        </div>
      </div>

      <div className="space-y-2 mt-6 pt-4 border-t border-border-subtle text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Total OT Hours</span>
          <span className="font-semibold text-text-primary">14.5 hrs</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Est. OT Cost</span>
          <span className="font-semibold text-accent-red">$543.75</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Approaching OT</span>
          <span className="font-semibold text-accent-amber">5 staff</span>
        </div>
      </div>
    </Card>
  );
}
