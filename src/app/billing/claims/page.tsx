"use client";

import React, { useState } from "react";
import { Server, Download, FileText, CheckCircle2, AlertCircle, PlayCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function ClaimsClearinghousePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [claimStatus, setClaimStatus] = useState<"idle" | "generating" | "complete">("idle");

  const handleGenerate = () => {
    setIsGenerating(true);
    setClaimStatus("generating");
    setTimeout(() => {
      setIsGenerating(false);
      setClaimStatus("complete");
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Claims Clearinghouse</h1>
          <p className="text-sm text-slate-500 mt-1">Manage 837 generation and 835 ERA auto-posting through Waystar.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Actions */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300">
            <h2 className="font-bold text-slate-900 mb-4">Generate 837 Batch</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Ready to Bill (Scrubbed)</span>
                <span className="font-bold text-slate-900">142 Visits</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Est. Revenue</span>
                <span className="font-bold text-emerald-600">$18,450.00</span>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className={clsx(
                  "w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2",
                  isGenerating ? "bg-slate-300" : "bg-brand-teal hover:bg-brand-teal/90 shadow-lg shadow-brand-teal/20"
                )}
              >
                {isGenerating ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Compiling 837P...</>
                ) : (
                  <><PlayCircle className="w-5 h-5" /> Generate & Submit to Waystar</>
                )}
              </button>

              <AnimatePresence>
                {claimStatus === "complete" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-emerald-50 text-emerald-700 p-3 rounded-xl text-sm font-medium flex gap-3 mt-4"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <div>
                      <p>Batch #837-1042 Submitted.</p>
                      <p className="text-xs opacity-80 mt-1">Accepted by clearinghouse at {new Date().toLocaleTimeString()}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-5 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">ERA Auto-Posting</h3>
                <p className="text-xs text-slate-500">Checking for 835s</p>
              </div>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-indigo-100">
              <span className="text-sm font-semibold text-slate-700">Last Sync: 10 mins ago</span>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">2 files found</span>
            </div>
          </div>
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Recent Clearinghouse Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Batch/File ID</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {[
                  { id: "835-ERA-901", type: "835 Remittance", time: "Today, 08:30 AM", status: "Posted" },
                  { id: "837-1041", type: "837P Claim", time: "Yesterday, 06:00 PM", status: "Accepted" },
                  { id: "837-1040", type: "837P Claim", time: "Oct 12, 06:00 PM", status: "Rejected" },
                  { id: "835-ERA-900", type: "835 Remittance", time: "Oct 11, 09:15 AM", status: "Posted" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      {row.id}
                    </td>
                    <td className="p-4 text-slate-700">{row.type}</td>
                    <td className="p-4 text-slate-600">{row.time}</td>
                    <td className="p-4">
                      {row.status === "Posted" || row.status === "Accepted" ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {row.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {row.status}
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
