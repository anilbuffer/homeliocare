"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { ShieldCheck, ShieldAlert, Calendar, RefreshCw } from "lucide-react";
import { clsx } from "clsx";

export function EligibilityChecker() {
  const checks = [
    { patient: "Margaret Chen", payer: "Medicaid", id: "MED-8829102", status: "Active", date: "Today, 08:00 AM", type: "Monthly Auto-Check" },
    { patient: "James O'Brien", payer: "Medicare", id: "MCR-9920192", status: "Active", date: "Today, 08:00 AM", type: "Monthly Auto-Check" },
    { patient: "Aiko Tanaka", payer: "Medicaid", id: "MED-1192837", status: "Lapsed", date: "Yesterday, 08:00 AM", type: "Monthly Auto-Check", alert: true },
    { patient: "Devon Price", payer: "Commercial", id: "BCBS-448201", status: "Active", date: "Oct 12, 14:30 PM", type: "Pre-Visit (270)" },
  ];

  return (
    <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] h-full">
      <CardHeader 
        title="Eligibility & Benefits (270/271)" 
        action={
          <button className="flex items-center gap-1.5 text-xs font-semibold text-brand-teal hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            Run Batch Check
          </button>
        }
      />
      
      <div className="mt-4 space-y-3">
        {checks.map((check, i) => (
          <div key={i} className={clsx("p-3 rounded-xl border flex items-center justify-between", check.alert ? "bg-rose-50 border-rose-200" : "bg-slate-50 border-slate-100")}>
            <div className="flex items-center gap-3">
              <div className={clsx("p-2 rounded-lg", check.alert ? "bg-rose-100 text-rose-600" : "bg-green-100 text-green-600")}>
                {check.alert ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-semibold text-sm text-slate-900">{check.patient}</div>
                <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="font-medium text-slate-700">{check.payer}</span>
                  <span>•</span>
                  <span>{check.id}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={clsx("text-xs font-bold", check.alert ? "text-rose-600" : "text-green-600")}>
                {check.status}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 justify-end">
                <Calendar className="w-3 h-3" />
                {check.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
