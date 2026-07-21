"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { CreditCard, Wallet, ArrowUpRight, ArrowDownLeft, Activity } from "lucide-react";
import { clsx } from "clsx";

export function StripeOverview() {
  const recentTransactions = [
    { id: "ch_348912", patient: "Maria Santos", amount: 1250.00, type: "Card (Auto-Pay)", status: "Succeeded", date: "Today, 10:24 AM" },
    { id: "pi_992102", patient: "David Kim", amount: 840.00, type: "ACH Direct Debit", status: "Processing", date: "Today, 09:15 AM", pending: true },
    { id: "ch_348891", patient: "Lisa Chen", amount: 2100.00, type: "Card (Manual)", status: "Failed", date: "Yesterday, 14:30 PM", error: true },
  ];

  return (
    <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] h-full">
      <CardHeader 
        title="Stripe Payment Gateway" 
        action={
          <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-200">
            <Activity className="w-3.5 h-3.5" />
            Connected
          </div>
        }
      />
      
      <div className="mt-4 grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
            <Wallet className="w-4 h-4 text-indigo-500" />
            Available Balance
          </div>
          <div className="text-2xl font-bold text-slate-900">$18,450.00</div>
          <div className="text-xs text-slate-500 mt-1">Est. Payout: Tomorrow</div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
            <CreditCard className="w-4 h-4 text-indigo-500" />
            Monthly Volume
          </div>
          <div className="text-2xl font-bold text-slate-900">$42,100.00</div>
          <div className="text-xs text-green-600 font-medium flex items-center mt-1">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> 12% vs last month
          </div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-slate-900 mb-3">Recent Transactions</h3>
      <div className="space-y-3">
        {recentTransactions.map((tx) => (
          <div key={tx.id} className={clsx(
            "p-3 rounded-xl border flex items-center justify-between",
            tx.error ? "bg-rose-50 border-rose-200" : "bg-white border-slate-100 shadow-sm"
          )}>
            <div className="flex items-center gap-3">
              <div className={clsx(
                "p-2 rounded-full",
                tx.error ? "bg-rose-100 text-rose-600" : (tx.pending ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600")
              )}>
                {tx.error ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-semibold text-sm text-slate-900">{tx.patient}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <span className="font-medium">{tx.type}</span>
                  <span>•</span>
                  <span>{tx.id}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-900">
                ${tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </div>
              <div className={clsx(
                "text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded uppercase inline-block",
                tx.error ? "text-rose-700 bg-rose-100" : (tx.pending ? "text-amber-700 bg-amber-100" : "text-green-700 bg-green-100")
              )}>
                {tx.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
