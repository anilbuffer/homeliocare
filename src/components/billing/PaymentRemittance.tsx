"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";

const payments = [
  { payer: "Medicare", date: "Oct 14", method: "EFT", amount: 12420, status: "Matched" },
  { payer: "Medicaid", date: "Oct 12", method: "EFT", amount: 8760, status: "Matched" },
  { payer: "Private Pay", date: "Oct 10", method: "Check", amount: 4020, status: "Matched" },
  { payer: "Commercial", date: "Oct 08", method: "EFT", amount: 3210, status: "Unmatched" },
];

const payerColors = {
  "Medicare": { bg: "bg-brand-teal/10", text: "text-brand-teal", dot: "bg-brand-teal" },
  "Medicaid": { bg: "bg-blue-500/10", text: "text-blue-600", dot: "bg-blue-500" },
  "Private Pay": { bg: "bg-purple-500/10", text: "text-purple-600", dot: "bg-purple-500" },
  "Commercial": { bg: "bg-orange-500/10", text: "text-orange-600", dot: "bg-orange-500" },
};

export function PaymentRemittance() {
  return (
    <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      <CardHeader
        title="Payments & Remittance"
        action={<span className="text-slate-500 text-xs">Recent EFT / check payments with reconciliation status.</span>}
      />

      <div className="overflow-x-auto flex-1 mt-2 border border-slate-200 rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-2.5 font-medium">Payer</th>
              <th className="px-4 py-2.5 font-medium">Date</th>
              <th className="px-4 py-2.5 font-medium">Method</th>
              <th className="px-4 py-2.5 font-medium text-right">Amount</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {payments.map((payment, i) => (
              <tr key={i} className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className={clsx("inline-flex px-1.5 py-0.5 rounded-md text-[10px] font-medium items-center gap-1", payerColors[payment.payer as keyof typeof payerColors].bg, payerColors[payment.payer as keyof typeof payerColors].text)}>
                    <div className={clsx("w-1 h-1 rounded-full", payerColors[payment.payer as keyof typeof payerColors].dot)} />
                    {payment.payer}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{payment.date}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{payment.method}</td>
                <td className="px-4 py-3 font-medium text-slate-800 text-right">${payment.amount.toLocaleString("en-US")}</td>
                <td className="px-4 py-3">
                  <span className={clsx("text-xs font-medium", payment.status === "Matched" ? "text-brand-teal" : "text-amber-500")}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <button className="flex items-center gap-1 text-xs font-medium text-brand-teal hover:text-brand-teal/80 transition-colors">
          View full remittance log
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </Card>
  );
}
