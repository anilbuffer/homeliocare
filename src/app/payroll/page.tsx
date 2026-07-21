"use client";

import React, { useState } from "react";
import { Download, Calculator, Clock, DollarSign, Calendar as CalendarIcon, CheckCircle2, ChevronDown, User, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// Mock Data
const payrollData = [
  { id: "CG-001", name: "Maria Garcia", evvHours: 40.0, overtime: 2.5, travel: 120, rate: 22, total: 988.0 },
  { id: "CG-002", name: "James Smith", evvHours: 35.5, overtime: 0, travel: 85, rate: 20, total: 752.5 },
  { id: "CG-003", name: "Linda Johnson", evvHours: 42.0, overtime: 5.0, travel: 150, rate: 25, total: 1262.5 },
  { id: "CG-004", name: "Robert Williams", evvHours: 20.0, overtime: 0, travel: 40, rate: 18, total: 378.0 },
  { id: "CG-005", name: "Sarah Jenkins", evvHours: 38.0, overtime: 0, travel: 90, rate: 24, total: 957.0 },
];

export default function PayrollPage() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [exporting, setExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const totalEvvHours = payrollData.reduce((acc, curr) => acc + curr.evvHours + curr.overtime, 0);
  const totalPayroll = payrollData.reduce((acc, curr) => acc + curr.total, 0);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExportComplete(true);
      setTimeout(() => {
        setIsExportOpen(false);
        setExportComplete(false);
        setSelectedFormat("");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex-1 bg-page-bg min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payroll Engine</h1>
            <p className="text-sm text-slate-500 mt-1">Reconcile EVV-verified hours, overtime, and travel.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors shadow-sm">
              <CalendarIcon className="w-4 h-4 text-slate-400" />
              Pay Period: Oct 1 - Oct 14
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              Export Payroll
            </button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">EVV Verified</p>
              <p className="text-2xl font-bold text-slate-900">100%</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total EVV Hours</p>
              <p className="text-2xl font-bold text-slate-900">{totalEvvHours}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overtime Hours</p>
              <p className="text-2xl font-bold text-slate-900">7.5</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Est. Payroll</p>
              <p className="text-2xl font-bold text-slate-900">${totalPayroll.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
          </div>
        </div>

        {/* Main Table Area */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Pay Period Reconciliation</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Caregiver</th>
                  <th className="p-4 text-right">Regular Hours</th>
                  <th className="p-4 text-right">Overtime</th>
                  <th className="p-4 text-right">Travel (Miles)</th>
                  <th className="p-4 text-right">Base Rate</th>
                  <th className="p-4 text-right">Total Est. Pay</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {payrollData.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{row.name}</div>
                          <div className="text-[10px] font-mono text-slate-400 mt-0.5">{row.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-medium text-slate-700">{row.evvHours}h</td>
                    <td className="p-4 text-right">
                      {row.overtime > 0 ? (
                        <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-xs">
                          {row.overtime}h
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right text-slate-600">{row.travel} mi</td>
                    <td className="p-4 text-right text-slate-600">${row.rate}/hr</td>
                    <td className="p-4 text-right font-bold text-slate-900">
                      ${row.total.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      <AnimatePresence>
        {isExportOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
              onClick={() => !exporting && !exportComplete && setIsExportOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden border border-slate-100"
            >
              {exportComplete ? (
                <div className="p-10 text-center space-y-4">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-slate-900">Export Complete</h2>
                  <p className="text-slate-500 text-sm">
                    Your payroll file for {selectedFormat} has been generated successfully.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Export Payroll</h2>
                      <p className="text-sm text-slate-500 mt-1">Select your payroll provider</p>
                    </div>
                    <button 
                      onClick={() => setIsExportOpen(false)} 
                      disabled={exporting}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5 text-slate-500" />
                    </button>
                  </div>

                  <div className="p-6 space-y-3">
                    {["ADP Run", "Gusto", "Paychex", "QuickBooks Time", "Custom CSV"].map(format => (
                      <button
                        key={format}
                        onClick={() => setSelectedFormat(format)}
                        disabled={exporting}
                        className={clsx(
                          "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between",
                          selectedFormat === format 
                            ? "border-brand-teal bg-brand-teal/5 text-brand-teal" 
                            : "border-slate-100 hover:border-slate-200 text-slate-700 bg-white"
                        )}
                      >
                        <span className="font-bold">{format}</span>
                        {selectedFormat === format && <CheckCircle2 className="w-5 h-5" />}
                      </button>
                    ))}
                  </div>

                  <div className="p-6 bg-slate-50 border-t border-slate-100">
                    <button 
                      onClick={handleExport}
                      disabled={!selectedFormat || exporting}
                      className="w-full py-4 bg-brand-teal hover:bg-brand-teal/90 disabled:opacity-50 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-teal/20"
                    >
                      {exporting ? "Generating File..." : "Download Export File"}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
