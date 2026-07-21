"use client";

import React, { useState } from "react";
import { CreditCard, DollarSign, CheckCircle2, History, AlertCircle } from "lucide-react";
import clsx from "clsx";

export default function PrivatePayPage() {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCharge = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Private Pay Processing</h1>
        <p className="text-sm text-slate-500 mt-1">Manage credit card and ACH payments via Stripe.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Charge Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-900 text-lg">Process Payment</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Patient Account</label>
              <select className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-brand-teal">
                <option>Eleanor Rigby (Balance: $450.00)</option>
                <option>John Smith (Balance: $120.00)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Amount</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="number" 
                  defaultValue={450.00}
                  className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-teal"
                />
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700">Payment Method</span>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">ON FILE</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-900">
                <div className="w-8 h-5 bg-indigo-600 rounded flex items-center justify-center text-white text-[8px] font-bold">VISA</div>
                •••• 4242 (Exp 12/28)
              </div>
            </div>

            <button
              onClick={handleCharge}
              disabled={processing || success}
              className={clsx(
                "w-full py-3 rounded-xl font-bold text-white transition-all mt-2",
                processing ? "bg-slate-300" : success ? "bg-emerald-500" : "bg-indigo-600 hover:bg-indigo-700"
              )}
            >
              {processing ? "Processing via Stripe..." : success ? "Payment Successful" : "Charge Card"}
            </button>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <History className="w-5 h-5 text-slate-400" />
            <h3 className="font-bold text-slate-900">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <tbody className="divide-y divide-slate-100 text-sm">
                {[
                  { id: "ch_1OzX", patient: "Eleanor Rigby", amount: "$450.00", date: "Today, 11:30 AM", status: "Succeeded" },
                  { id: "ch_2PxY", patient: "Mary Johnson", amount: "$210.00", date: "Yesterday, 02:15 PM", status: "Succeeded" },
                  { id: "ch_3QwZ", patient: "Robert Brown", amount: "$85.00", date: "Oct 12, 09:00 AM", status: "Declined" },
                ].map((tx, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{tx.patient}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{tx.id}</div>
                    </td>
                    <td className="p-4 font-bold text-slate-700">{tx.amount}</td>
                    <td className="p-4 text-slate-500 text-xs">{tx.date}</td>
                    <td className="p-4 text-right">
                      {tx.status === "Succeeded" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs">
                          <CheckCircle2 className="w-3 h-3" /> Succeeded
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 font-semibold text-xs">
                          <AlertCircle className="w-3 h-3" /> Declined
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
