"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { clsx } from "clsx";
import { motion } from "framer-motion";

const segments = [
  { label: "0-30 days", amount: 18000, percentage: 66, color: "bg-brand-teal", text: "text-brand-teal" },
  { label: "31-60 days", amount: 6000, percentage: 22, color: "bg-amber-500", text: "text-amber-500" },
  { label: "61-90 days", amount: 2000, percentage: 7, color: "bg-orange-500", text: "text-orange-500" },
  { label: "90+ days", amount: 1200, percentage: 5, color: "bg-red-500", text: "text-red-500" },
];

const arRecords = [
  { id: "CLM-10231", patient: "Margaret Chen", payer: "Medicare", amount: 2450, days: 12, action: "Submitted Oct 3", urgent: false },
  { id: "CLM-10201", patient: "Aiko Tanaka", payer: "Private Pay", amount: 3120, days: 24, action: "Invoice emailed", urgent: false },
  { id: "CLM-10189", patient: "Rachel Kim", payer: "Medicaid", amount: 2110, days: 42, action: "Follow-up call", urgent: false },
  { id: "CLM-10188", patient: "Devon Price", payer: "Medicare", amount: 2985, days: 55, action: "Corrected & resubmitted", urgent: false },
  { id: "CLM-10190", patient: "Carlos Mendez", payer: "Commercial", amount: 5210, days: 71, action: "Payer inquiry", urgent: false },
  { id: "CLM-10101", patient: "Marcus Lee", payer: "Medicare", amount: 1420, days: 96, action: "Escalated to supervisor", urgent: true },
  { id: "CLM-10099", patient: "David Kim", payer: "Commercial", amount: 2650, days: 112, action: "Appeal in progress", urgent: true },
];

const payerColors = {
  "Medicare": { bg: "bg-brand-teal/10", text: "text-brand-teal", dot: "bg-brand-teal" },
  "Medicaid": { bg: "bg-blue-500/10", text: "text-blue-600", dot: "bg-blue-500" },
  "Private Pay": { bg: "bg-purple-500/10", text: "text-purple-600", dot: "bg-purple-500" },
  "Commercial": { bg: "bg-orange-500/10", text: "text-orange-600", dot: "bg-orange-500" },
};

export function ARAging({ onClaimClick }: { onClaimClick?: (id: string) => void }) {
  return (
    <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <CardHeader
        title="AR Aging"
        action={<span className="text-slate-500 text-xs">Outstanding balances grouped by days since submission.</span>}
      />

      {/* Segmented Bar */}
      <div className="mt-4 mb-4">
        <div className="flex justify-between text-xs font-medium mb-2">
          {segments.map(seg => (
            <div key={seg.label} className={clsx("flex flex-col", seg.percentage < 10 ? "items-end" : "")}>
              <span className="text-slate-700">{seg.label}</span>
              <span className={clsx("text-[10px]", seg.text)}>${seg.amount.toLocaleString("en-US")}</span>
            </div>
          ))}
        </div>
        <div className="h-3 rounded-full flex overflow-hidden bg-slate-100">
          {segments.map((seg, i) => (
            <motion.div
              key={seg.label}
              className={clsx("h-full", seg.color)}
              initial={{ width: 0 }}
              animate={{ width: `${seg.percentage}%` }}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
        </div>
        <div className="text-right text-[10px] text-slate-400 mt-2">DSO 38 days • Target ≤ 45</div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-sm text-left shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 font-medium">Patient</th>
              <th className="px-4 py-3 font-medium">Payer</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
              <th className="px-4 py-3 font-medium text-right">Days out</th>
              <th className="px-4 py-3 font-medium">Last action</th>
              <th className="px-4 py-3 font-medium text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {arRecords.map((record, i) => (
              <tr
                key={i}
                className={clsx(
                  "border-b border-slate-200 hover:bg-slate-50/50 transition-colors group cursor-pointer",
                  record.urgent ? "bg-red-50/30 hover:bg-red-50/60" : ""
                )}
                onClick={() => onClaimClick?.(record.id)}
              >
                <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{record.patient}</td>
                <td className="px-4 py-3">
                  <div className={clsx("inline-flex px-2 py-1 rounded-md text-[10px] font-medium items-center gap-1.5 whitespace-nowrap", payerColors[record.payer as keyof typeof payerColors].bg, payerColors[record.payer as keyof typeof payerColors].text)}>
                    <div className={clsx("w-1.5 h-1.5 rounded-full", payerColors[record.payer as keyof typeof payerColors].dot)} />
                    {record.payer}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-slate-800 text-right whitespace-nowrap">${record.amount.toLocaleString("en-US")}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <span className={clsx("font-semibold whitespace-nowrap", record.days >= 90 ? "text-red-600" : record.days >= 60 ? "text-orange-600" : record.days >= 30 ? "text-amber-600" : "text-brand-teal")}>
                    {record.days}d
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{record.action}</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-[11px] font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 hover:text-brand-teal transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] opacity-0 group-hover:opacity-100 focus:opacity-100">
                    Follow up
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
