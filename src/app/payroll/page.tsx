"use client";

import React, { useState } from "react";
import { Download, Calculator, Clock, DollarSign, Calendar as CalendarIcon, CheckCircle2, ChevronDown, ChevronRight, User, X, AlertTriangle, ArrowRight, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Card } from "@/components/ui/Card";

// Mock Data
const payrollData = [
  {
    id: "CG-001",
    name: "Maria Garcia",
    baseHours: 35.0,
    otHours: 5.5,
    dtHours: 1.0,
    travelMiles: 120,
    travelTime: 3.5,
    rate: 22,
    shiftDiff: 45.00,
    holidayPay: 0,
    total: 1045.50,
    otReason: "CA Daily (>8h) + Weekly (>40h)",
    dtReason: "CA Daily (>12h)"
  },
  {
    id: "CG-002",
    name: "James Smith",
    baseHours: 35.5,
    otHours: 0,
    dtHours: 0,
    travelMiles: 85,
    travelTime: 2.0,
    rate: 20,
    shiftDiff: 0,
    holidayPay: 160.00,
    total: 910.00,
    otReason: null,
    dtReason: null
  },
  {
    id: "CG-003",
    name: "Linda Johnson",
    baseHours: 40.0,
    otHours: 4.0,
    dtHours: 0,
    travelMiles: 150,
    travelTime: 4.0,
    rate: 25,
    shiftDiff: 75.00,
    holidayPay: 0,
    total: 1275.00,
    otReason: "Weekly (>40h)",
    dtReason: null
  }
];

export default function PayrollPage() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [exporting, setExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isPayPeriodOpen, setIsPayPeriodOpen] = useState(false);
  const [selectedPayPeriod, setSelectedPayPeriod] = useState("Jul 1 - Jul 14");
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  const totalEvvHours = payrollData.reduce((acc, curr) => acc + curr.baseHours + curr.otHours + curr.dtHours, 0);
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
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Payroll Engine</h1>
            <p className="text-xs text-slate-500 mt-1">Reconcile EVV-verified hours with CA state overtime rules.</p>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <button
                onClick={() => setIsPayPeriodOpen(!isPayPeriodOpen)}
                className="flex items-center gap-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
              >
                <CalendarIcon className="w-4 h-4 text-slate-400" />
                Pay Period: {selectedPayPeriod}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              <AnimatePresence>
                {isPayPeriodOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden z-20"
                  >
                    {["Jul 1 - Jul 14", "Jun 15 - Jun 30", "Jun 1 - Jun 14"].map(period => (
                      <button
                        key={period}
                        onClick={() => {
                          setSelectedPayPeriod(period);
                          setIsPayPeriodOpen(false);
                        }}
                        className={clsx(
                          "w-full text-left px-4 py-3 text-sm hover:bg-slate-50 transition-colors flex items-center justify-between",
                          selectedPayPeriod === period ? "text-brand-teal font-semibold bg-brand-teal/5" : "text-slate-600"
                        )}
                      >
                        {period}
                        {selectedPayPeriod === period && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsRulesOpen(true)}
              className="flex items-center gap-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              Rule Configuration
            </button>
            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-brand-teal/90 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              Export Payroll
            </button>
          </div>
        </div>

        {/* Reconciliation Pipeline Visual */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-slate-900">Reconciliation Pipeline</h2>
            <div className="text-xs font-semibold text-brand-teal bg-teal-100 px-3 py-1 rounded-full flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> All Exceptions Cleared
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Step 1 */}
            <div className="flex-1 bg-slate-100 rounded-xl p-4 border border-slate-200 relative">
              <div className="text-xs font-medium text-slate-400 mb-1">Step 1: Scheduling</div>
              <div className="text-2xl font-bold text-slate-900">128.5 <span className="text-sm font-medium text-slate-500">Scheduled Hrs</span></div>
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 bg-slate-100 rounded-xl p-4 border border-slate-200 relative">
              <div className="text-xs font-medium text-slate-400 mb-1">Step 2: EVV Verified</div>
              <div className="text-2xl font-bold text-slate-900">125.0 <span className="text-sm font-medium text-slate-500">Actual Hrs</span></div>
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 bg-brand-teal/5 rounded-xl p-4 border border-brand-teal relative">
              <div className="text-xs font-medium text-brand-teal mb-1">Step 3: Payroll Rules Applied</div>
              <div className="text-2xl font-bold text-brand-teal">${totalPayroll.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-sm font-medium text-brand-teal/70">Est. Payout</span></div>
              <div className="mt-2 gap-2">
                <span className="text-[10px] font-medium bg-white text-slate-700 px-2 py-0.5 rounded-full border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)]">CA Overtime Included</span>
                <span className="text-[10px] font-medium bg-white text-slate-700 px-2 py-0.5 rounded-full border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)]">Shift Differentials</span>
              </div>
            </div>
          </div>
        </Card>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Total EVV Hours</p>
              <p className="text-2xl font-bold text-slate-900">{totalEvvHours}</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Overtime / Double</p>
              <p className="text-2xl font-bold text-slate-900">
                {payrollData.reduce((acc, curr) => acc + curr.otHours, 0)} / {payrollData.reduce((acc, curr) => acc + curr.dtHours, 0)}
              </p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Shift Differentials</p>
              <p className="text-2xl font-bold text-slate-900">
                ${payrollData.reduce((acc, curr) => acc + curr.shiftDiff, 0).toLocaleString()}
              </p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Est. Payroll</p>
              <p className="text-2xl font-bold text-slate-900">${totalPayroll.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          </Card>
        </div>

        {/* Main Table Area */}
        <Card noPadding className="flex flex-col">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-100">
            <h3 className="font-bold text-slate-900">Pay Period Reconciliation</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3 w-8"></th>
                  <th className="px-4 py-3">Caregiver</th>
                  <th className="px-4 py-3 text-right">Base Hrs</th>
                  <th className="px-4 py-3 text-right">OT / DT</th>
                  <th className="px-4 py-3 text-right">Base Rate</th>
                  <th className="px-4 py-3 text-right">Total Est. Pay</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {payrollData.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr
                      className={clsx("hover:bg-slate-50 transition-colors cursor-pointer", expandedRow === row.id && "bg-slate-50")}
                      onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                    >
                      <td className="px-4 py-3 text-center text-slate-400">
                        <ChevronRight className={clsx("w-5 h-5 transition-transform", expandedRow === row.id && "rotate-90 text-brand-teal")} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{row.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{row.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-slate-700">{row.baseHours}h</td>
                      <td className="px-4 py-3 text-right">
                        {(row.otHours > 0 || row.dtHours > 0) ? (
                          <div className="flex flex-col items-end gap-1">
                            {row.otHours > 0 && <span className="font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-md text-xs">{row.otHours}h OT (1.5x)</span>}
                            {row.dtHours > 0 && <span className="font-medium text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md text-xs">{row.dtHours}h DT (2.0x)</span>}
                          </div>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">${row.rate}/hr</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-900">
                        ${row.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Ready
                        </span>
                      </td>
                    </tr>

                    {/* Expandable Detail View */}
                    <AnimatePresence>
                      {expandedRow === row.id && (
                        <tr className="bg-slate-100 border-b-1 border-t-1 border-slate-200">
                          <td colSpan={7} className="p-0">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 ml-12 mr-6 border-l-4 border-brand-teal">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Earnings Breakdown</h4>
                                <div className="grid grid-cols-5 gap-6">
                                  <div>
                                    <div className="text-xs text-slate-500 mb-1">Base Pay</div>
                                    <div className="font-semibold text-slate-900">${(row.baseHours * row.rate).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                    <div className="text-[10px] text-slate-400">{row.baseHours}h @ ${row.rate}</div>
                                  </div>

                                  <div>
                                    <div className="text-xs text-slate-500 mb-1">Overtime & Double Time</div>
                                    <div className="font-semibold text-amber-600">
                                      ${((row.otHours * row.rate * 1.5) + (row.dtHours * row.rate * 2.0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                      {row.otReason && <div>{row.otReason}</div>}
                                      {row.dtReason && <div>{row.dtReason}</div>}
                                      {!row.otReason && !row.dtReason && "None"}
                                    </div>
                                  </div>

                                  <div>
                                    <div className="text-xs text-slate-500 mb-1">Travel Time & Mileage</div>
                                    <div className="font-semibold text-slate-900">
                                      ${((row.travelTime * 15.50) + (row.travelMiles * 0.655)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-[10px] text-slate-400">{row.travelTime}h @ $15.50 + {row.travelMiles}mi @ $0.655</div>
                                  </div>

                                  <div>
                                    <div className="text-xs text-slate-500 mb-1">Shift Differentials</div>
                                    <div className="font-semibold text-purple-600">
                                      ${row.shiftDiff.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-[10px] text-slate-400">{row.shiftDiff > 0 ? "Weekend / Night Shift Bonus" : "None"}</div>
                                  </div>

                                  <div>
                                    <div className="text-xs text-slate-500 mb-1">Holiday Pay</div>
                                    <div className="font-semibold text-emerald-600">
                                      ${row.holidayPay.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-[10px] text-slate-400">{row.holidayPay > 0 ? "1.5x Premium Rate Applied" : "None"}</div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
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
                    Your formatted file for {selectedFormat} has been generated with all earnings codes mapped.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Export Payroll</h2>
                      <p className="text-sm text-slate-500 mt-1">Select your payroll provider mapping</p>
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
                    {[
                      { name: "ADP Run", desc: "Maps OT to Code 02, Travel to Code 09" },
                      { name: "Gusto", desc: "Native API integration format" },
                      { name: "Paychex Flex", desc: "CSV format with standard earnings codes" },
                      { name: "QuickBooks Time", desc: "IIF format for QBDT" }
                    ].map(format => (
                      <button
                        key={format.name}
                        onClick={() => setSelectedFormat(format.name)}
                        disabled={exporting}
                        className={clsx(
                          "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between",
                          selectedFormat === format.name
                            ? "border-brand-teal bg-brand-teal/5 text-brand-teal"
                            : "border-slate-100 hover:border-slate-200 text-slate-700 bg-white"
                        )}
                      >
                        <div>
                          <span className="font-bold">{format.name}</span>
                          <p className={clsx("text-xs mt-0.5", selectedFormat === format.name ? "text-teal-700" : "text-slate-500")}>
                            {format.desc}
                          </p>
                        </div>
                        {selectedFormat === format.name && <CheckCircle2 className="w-5 h-5 shrink-0" />}
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

      {/* Rules Configuration Modal */}
      <AnimatePresence>
        {isRulesOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
              onClick={() => setIsRulesOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden border border-slate-100"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Rule Configuration</h2>
                  <p className="text-sm text-slate-500 mt-1">Manage state-specific overtime and penalty rules</p>
                </div>
                <button
                  onClick={() => setIsRulesOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">California Overtime Rules</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white">
                    <div>
                      <div className="font-bold text-slate-900">Daily Overtime (&gt;8 hours)</div>
                      <div className="text-xs text-slate-500 mt-0.5">Pay 1.5x regular rate for hours worked over 8 in a workday</div>
                    </div>
                    <div className="w-10 h-6 bg-brand-teal rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white">
                    <div>
                      <div className="font-bold text-slate-900">Daily Double Time (&gt;12 hours)</div>
                      <div className="text-xs text-slate-500 mt-0.5">Pay 2.0x regular rate for hours worked over 12 in a workday</div>
                    </div>
                    <div className="w-10 h-6 bg-brand-teal rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Shift Differentials</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white">
                    <div>
                      <div className="font-bold text-slate-900">Weekend Premium</div>
                      <div className="text-xs text-slate-500 mt-0.5">+$2.50/hr for shifts starting Sat/Sun</div>
                    </div>
                    <div className="w-10 h-6 bg-brand-teal rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => setIsRulesOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsRulesOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium text-white bg-brand-teal hover:bg-brand-teal/90 shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 transition-all"
                >
                  Save Configuration
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
