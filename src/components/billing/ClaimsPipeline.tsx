"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

type ClaimStatus = "Draft" | "Submitted" | "Pending" | "Paid" | "Denied";

interface Claim {
  id: string;
  client: string;
  amount: number;
  payer: "Medicare" | "Medicaid" | "Private Pay" | "Commercial";
  status: ClaimStatus;
  date: string;
  age: string;
}

const initialClaims: Claim[] = [
  { id: "CLM-10231", client: "Margaret Chen", amount: 2450, payer: "Medicare", status: "Draft", date: "Oct 12", age: "" },
  { id: "CLM-10232", client: "Robert Alvarez", amount: 1820, payer: "Medicaid", status: "Draft", date: "Oct 11", age: "" },
  { id: "CLM-10201", client: "Aiko Tanaka", amount: 3120, payer: "Private Pay", status: "Submitted", date: "", age: "6d in submitted" },
  { id: "CLM-10202", client: "Thomas Becker", amount: 4260, payer: "Commercial", status: "Submitted", date: "", age: "7d in submitted" },
  { id: "CLM-10203", client: "Priya Patel", amount: 1590, payer: "Medicaid", status: "Submitted", date: "", age: "9d in submitted" },
  { id: "CLM-10188", client: "Devon Price", amount: 2985, payer: "Medicare", status: "Pending", date: "", age: "18d in pending" },
  { id: "CLM-10189", client: "Rachel Kim", amount: 2110, payer: "Medicaid", status: "Pending", date: "", age: "20d in pending" },
  { id: "CLM-10190", client: "Carlos Mendez", amount: 5210, payer: "Commercial", status: "Pending", date: "", age: "23d in pending" },
  { id: "CLM-10145", client: "Maria Santos", amount: 3480, payer: "Medicare", status: "Paid", date: "Sep 12", age: "" },
  { id: "CLM-10146", client: "James O'Brien", amount: 4020, payer: "Private Pay", status: "Paid", date: "Sep 10", age: "" },
  { id: "CLM-10147", client: "Aisha Williams", amount: 1780, payer: "Medicaid", status: "Paid", date: "Sep 08", age: "" },
  { id: "CLM-10099", client: "David Kim", amount: 2650, payer: "Commercial", status: "Denied", date: "Aug 30", age: "" },
  { id: "CLM-10100", client: "Lisa Chen", amount: 980, payer: "Medicaid", status: "Denied", date: "Aug 27", age: "" },
  { id: "CLM-10101", client: "Marcus Lee", amount: 1420, payer: "Medicare", status: "Denied", date: "Aug 22", age: "" },
  { id: "CLM-10102", client: "Amy Rodriguez", amount: 720, payer: "Commercial", status: "Denied", date: "Aug 18", age: "" },
];

const COLUMNS: { id: ClaimStatus; color: string; bg: string }[] = [
  { id: "Draft", color: "bg-slate-400", bg: "bg-slate-50" },
  { id: "Submitted", color: "bg-blue-500", bg: "bg-blue-50/50" },
  { id: "Pending", color: "bg-amber-500", bg: "bg-amber-50/50" },
  { id: "Paid", color: "bg-brand-teal", bg: "bg-brand-teal/5" },
  { id: "Denied", color: "bg-red-500", bg: "bg-red-50/50" },
];

const payerColors = {
  "Medicare": { bg: "bg-brand-teal/10", text: "text-brand-teal", dot: "bg-brand-teal" },
  "Medicaid": { bg: "bg-blue-500/10", text: "text-blue-600", dot: "bg-blue-500" },
  "Private Pay": { bg: "bg-purple-500/10", text: "text-purple-600", dot: "bg-purple-500" },
  "Commercial": { bg: "bg-orange-500/10", text: "text-orange-600", dot: "bg-orange-500" },
};

export function ClaimsPipeline({ onClaimClick }: { onClaimClick?: (id: string) => void }) {
  const [claims, setClaims] = useState(initialClaims);
  const [draggedClaimId, setDraggedClaimId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedClaimId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, status: ClaimStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) {
      setClaims(claims.map(c => c.id === id ? { ...c, status } : c));
    }
    setDraggedClaimId(null);
  };

  return (
    <Card>
      <CardHeader
        title="Claims Pipeline"
        action={<span className="text-slate-500">Drag cards between columns, or open a claim to change status.</span>}
      />

      <div className="flex gap-4 overflow-x-auto pb-4 mt-2 min-h-[400px]">
        {COLUMNS.map(column => {
          const colClaims = claims.filter(c => c.status === column.id);
          const totalValue = colClaims.reduce((sum, c) => sum + c.amount, 0);

          return (
            <div
              key={column.id}
              className={clsx(
                "flex-1 min-w-[280px] rounded-2xl border border-slate-200 flex flex-col transition-colors duration-200",
                column.bg
              )}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="p-4 flex items-center justify-between border-b border-slate-100/50">
                <div className="flex items-center gap-2">
                  <div className={clsx("w-2 h-2 rounded-full", column.color)} />
                  <span className="font-semibold text-slate-800">{column.id}</span>
                  <span className="text-xs font-medium text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-full">{colClaims.length}</span>
                </div>
                <div className="text-sm font-medium text-slate-600">${totalValue.toLocaleString("en-US")}</div>
              </div>

              {/* Cards Container */}
              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                <AnimatePresence>
                  {colClaims.map(claim => (
                    <motion.div
                      key={claim.id}
                      layoutId={claim.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      draggable
                      onDragStart={(e: any) => handleDragStart(e, claim.id)}
                      onDragEnd={() => setDraggedClaimId(null)}
                      onClick={() => onClaimClick?.(claim.id)}
                      className={clsx(
                        "bg-white p-4 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-slate-200/60 cursor-grab active:cursor-grabbing hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all",
                        draggedClaimId === claim.id && "opacity-50 scale-95 shadow-none"
                      )}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium text-slate-900 text-sm">{claim.client}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{claim.id}</div>
                        </div>
                        <div className="font-semibold text-slate-800 text-sm">${claim.amount.toLocaleString("en-US")}</div>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className={clsx("px-2 py-1 rounded-md text-[10px] font-medium flex items-center gap-1.5", payerColors[claim.payer].bg, payerColors[claim.payer].text)}>
                          <div className={clsx("w-1.5 h-1.5 rounded-full", payerColors[claim.payer].dot)} />
                          {claim.payer}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {claim.date || claim.age}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
