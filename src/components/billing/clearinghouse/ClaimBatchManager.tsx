"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { FileUp, FileDown, CheckCircle, FileWarning, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export function ClaimBatchManager() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [batches, setBatches] = useState([
    { id: "BATCH-8922", type: "837P Professional", count: 42, amount: 12450.00, status: "Transmitted", date: "Today, 09:15 AM", provider: "Waystar" },
    { id: "BATCH-8921", type: "837I Institutional", count: 18, amount: 28900.00, status: "Accepted", date: "Yesterday, 16:30 PM", provider: "Waystar" },
  ]);

  const [eras, setEras] = useState([
    { id: "ERA-835-102", amount: 11200.00, status: "Auto-Posted", date: "Today, 07:00 AM" },
    { id: "ERA-835-101", amount: 28500.00, status: "Exceptions", date: "Yesterday, 07:00 AM", exceptions: 2 },
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setBatches([
        { id: "BATCH-8923", type: "837P Professional", count: 15, amount: 4800.00, status: "Transmitted", date: "Just now", provider: "Waystar" },
        ...batches
      ]);
    }, 1500);
  };

  return (
    <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] h-full">
      <CardHeader 
        title="837 Generation & 835 ERA" 
      />
      
      <div className="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Outbound 837 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileUp className="w-4 h-4 text-blue-500" />
              Outbound Claims (837)
            </h3>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              {isGenerating ? "Generating..." : "Generate New Batch"}
            </button>
          </div>

          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {batches.map((batch) => (
                <motion.div 
                  key={batch.id}
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-bold text-slate-900">{batch.id}</div>
                      <div className="text-xs text-slate-500">{batch.type} • {batch.count} claims</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-800">${batch.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                      <div className="text-[10px] text-slate-400">{batch.date}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1 pt-2 border-t border-slate-200/50">
                    <div className="text-xs font-medium text-slate-600">via {batch.provider}</div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      <CheckCircle className="w-3 h-3" />
                      {batch.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Inbound 835 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileDown className="w-4 h-4 text-green-500" />
              Inbound Remittance (835)
            </h3>
          </div>

          <div className="space-y-3">
            {eras.map((era) => (
              <div key={era.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{era.id}</div>
                    <div className="text-xs text-slate-500">Remittance Advice</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-800">${era.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                    <div className="text-[10px] text-slate-400">{era.date}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1 pt-2 border-t border-slate-200/50">
                  <div className="text-xs font-medium text-slate-600">Parsed & Matched</div>
                  <div className={clsx(
                    "flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-md",
                    era.exceptions ? "text-amber-600 bg-amber-50" : "text-green-600 bg-green-50"
                  )}>
                    {era.exceptions ? <FileWarning className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                    {era.status}
                    {era.exceptions && ` (${era.exceptions})`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Card>
  );
}
