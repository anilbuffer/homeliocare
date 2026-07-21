"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { FileText, Send, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export function AutoInvoicing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [invoices, setInvoices] = useState([
    { id: "INV-2023-1021", patient: "Arthur Dent", amount: 450.00, visits: 3, status: "Draft", autoSendDate: "Today, 17:00" },
    { id: "INV-2023-1020", patient: "Sarah Connor", amount: 1200.00, visits: 8, status: "Sent", autoSendDate: "Yesterday" },
    { id: "INV-2023-1019", patient: "John Smith", amount: 300.00, visits: 2, status: "Paid", autoSendDate: "Oct 12" },
  ]);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setInvoices(invoices.map(inv => 
        inv.status === "Draft" ? { ...inv, status: "Sent", autoSendDate: "Just now" } : inv
      ));
    }, 1500);
  };

  return (
    <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] h-full">
      <CardHeader 
        title="Auto-Invoicing Pipeline" 
        action={
          <button 
            onClick={handleProcess}
            disabled={isProcessing}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            {isProcessing ? "Processing..." : "Process Drafts Now"}
          </button>
        }
      />
      
      <div className="mt-4 space-y-3">
        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="text-sm text-indigo-900">
            <strong>12 verified visits</strong> from the last 7 days were automatically converted into <strong>1 Draft invoice</strong>. Drafts are auto-sent at 5:00 PM unless paused.
          </div>
        </div>

        <AnimatePresence>
          {invoices.map((inv) => (
            <motion.div 
              key={inv.id}
              layout
              className={clsx(
                "p-3 rounded-xl border flex flex-col gap-3",
                inv.status === "Draft" ? "bg-white border-slate-200 shadow-sm" : "bg-slate-50 border-slate-100"
              )}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={clsx(
                    "p-2 rounded-lg",
                    inv.status === "Paid" ? "bg-green-100 text-green-600" : (inv.status === "Sent" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600")
                  )}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-900">{inv.patient}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{inv.id} • {inv.visits} visits</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">${inv.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                  <div className={clsx(
                    "flex items-center justify-end gap-1 text-[10px] font-bold mt-1",
                    inv.status === "Draft" ? "text-amber-600" : (inv.status === "Paid" ? "text-green-600" : "text-blue-600")
                  )}>
                    {inv.status === "Draft" ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    {inv.status}
                  </div>
                </div>
              </div>

              {inv.status === "Draft" && (
                <div className="bg-slate-50 p-2 rounded-lg text-xs flex justify-between items-center border border-slate-100">
                  <span className="text-slate-500">Scheduled for: <span className="font-semibold text-slate-700">{inv.autoSendDate}</span></span>
                  <button className="text-indigo-600 hover:underline font-medium">Review & Edit</button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}
