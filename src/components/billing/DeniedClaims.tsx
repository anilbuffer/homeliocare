"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { clsx } from "clsx";

const deniedClaims = [
  { id: "CLM-10099", patient: "David Kim", payer: "Commercial", amount: 2650, reason: "Missing authorization", date: "Aug 30", status: "Appealing", reasonColor: "bg-red-50 text-red-700" },
  { id: "CLM-10100", patient: "Lisa Chen", payer: "Medicaid", amount: 980, reason: "Eligibility lapse", date: "Aug 27", status: "Resubmitted", reasonColor: "bg-orange-50 text-orange-700" },
  { id: "CLM-10101", patient: "Marcus Lee", payer: "Medicare", amount: 1420, reason: "Documentation error", date: "Aug 22", status: "Appealing", reasonColor: "bg-amber-50 text-amber-700" },
  { id: "CLM-10102", patient: "Amy Rodriguez", payer: "Commercial", amount: 720, reason: "Coding error", date: "Aug 18", status: "Written off", reasonColor: "bg-purple-50 text-purple-700" },
];

const payerColors = {
  "Medicare": { bg: "bg-brand-teal/10", text: "text-brand-teal", dot: "bg-brand-teal" },
  "Medicaid": { bg: "bg-blue-500/10", text: "text-blue-600", dot: "bg-blue-500" },
  "Commercial": { bg: "bg-orange-500/10", text: "text-orange-600", dot: "bg-orange-500" },
};

export function DeniedClaims({ onClaimClick }: { onClaimClick?: (id: string) => void }) {
  return (
    <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      <CardHeader
        title="Denied Claims"
        action={<span className="text-slate-500">Categorized denials awaiting action.</span>}
      />

      <div className="overflow-x-auto flex-1 mt-2 border border-slate-200 rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-3 py-2.5 font-medium">Patient</th>
              <th className="px-3 py-2.5 font-medium">Payer</th>
              <th className="px-3 py-2.5 font-medium">Claim</th>
              <th className="px-3 py-2.5 font-medium">Reason</th>
              <th className="px-3 py-2.5 font-medium text-right">Amount</th>
              <th className="px-3 py-2.5 font-medium text-right">Date</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th className="px-3 py-2.5 font-medium text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {deniedClaims.map((claim, i) => (
              <tr
                key={i}
                className={clsx(
                  "border-b border-slate-200 hover:bg-slate-50/50 transition-colors cursor-pointer",
                  claim.status === "Written off" ? "opacity-60" : ""
                )}
                onClick={() => onClaimClick?.(claim.id)}
              >
                <td className="px-3 py-3 font-medium text-slate-900 whitespace-nowrap">{claim.patient}</td>
                <td className="px-3 py-3">
                  <div className={clsx("inline-flex px-1.5 py-0.5 rounded-md text-[9px] font-medium items-center gap-1", payerColors[claim.payer as keyof typeof payerColors].bg, payerColors[claim.payer as keyof typeof payerColors].text)}>
                    <div className={clsx("w-1 h-1 rounded-full", payerColors[claim.payer as keyof typeof payerColors].dot)} />
                    {claim.payer}
                  </div>
                </td>
                <td className="px-3 py-3 text-xs text-slate-500 whitespace-nowrap">{claim.id}</td>
                <td className="px-3 py-3">
                  <span className={clsx("px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap border border-black/5", claim.reasonColor)}>
                    {claim.reason}
                  </span>
                </td>
                <td className="px-3 py-3 font-medium text-slate-800 text-right">${claim.amount.toLocaleString("en-US")}</td>
                <td className="px-3 py-3 text-slate-500 text-xs text-right whitespace-nowrap">{claim.date}</td>
                <td className="px-3 py-3 text-slate-600 text-xs whitespace-nowrap">{claim.status}</td>
                <td className="px-3 py-3 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-1">
                    <button className="text-[10px] font-medium text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-50 hover:text-brand-teal transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                      Appeal
                    </button>
                    <button className="text-[10px] font-medium text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-50 hover:text-brand-teal transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                      Resubmit
                    </button>
                    {claim.status !== "Written off" && (
                      <button className="text-[10px] font-medium text-red-600 bg-white border border-slate-200 px-2 py-1 rounded hover:bg-red-50 hover:border-red-200 transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                        Write off
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
