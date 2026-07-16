"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Filter, Search, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

import { mockExceptions, mockTopOffenders } from "./mockData";
import { EVVException } from "./types";

import { KpiCard } from "./_components/KpiCard";
import { ComplianceDonut } from "./_components/ComplianceDonut";
import { ExceptionRow } from "./_components/ExceptionRow";
import { ExceptionDetailPanel } from "./_components/ExceptionDetailPanel";
import { OffenderRow } from "./_components/OffenderRow";
import { BillingRiskCard } from "./_components/BillingRiskCard";

const donutData = [
  { name: "Wrong GPS location", value: 45 },
  { name: "Missing clock-in", value: 22 },
  { name: "Missing clock-out", value: 38 },
  { name: "Time mismatch", value: 15 },
  { name: "Manual adjustment", value: 5 },
];

export default function EVVMonitoringPage() {
  const [exceptions, setExceptions] = useState(mockExceptions);
  const [selectedException, setSelectedException] = useState<EVVException | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredExceptions = activeFilter === "All"
    ? exceptions
    : exceptions.filter(e => e.type === activeFilter);

  const handleResolve = (id: string, action: string) => {
    setExceptions(prev => prev.map(ex =>
      ex.id === id ? { ...ex, status: "Resolved" } : ex
    ));
  };

  return (
    <div className="flex-1 bg-page-bg min-h-screen">
      <div className="max-w-full mx-auto p-4 space-y-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900">EVV Monitoring</h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">
              <span className="text-amber-600 font-bold">{exceptions.filter(e => e.status !== "Resolved").length} visits</span> need review today
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:bg-slate-50 transition-colors">
              <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
              This Week
            </button>
            <button className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap">
              <Download className="w-3.5 h-3.5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Row 1: KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <KpiCard title="Overall Compliance" value="92.4%" hero icon={<CheckCircle2 className="w-5 h-5" />} trend="up" trendValue="+1.2%" />
          <KpiCard title="Total Exceptions" value={125} subtitle="This period" trend="down" trendValue="-14" />
          <KpiCard title="Est. Billing Risk" value="$4,250" subtitle="Pending review" trend="down" trendValue="-$520" />
          <KpiCard title="Avg. Resolution Time" value="4.2 hrs" subtitle="From exception to fix" />
          <KpiCard title="Auto vs Manual" value="8.5 : 1" subtitle="Verification ratio" trend="up" trendValue="+0.4" />
        </div>

        {/* Row 2: Charts and Top Offenders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 h-[320px]">
            <ComplianceDonut
              data={donutData}
              overallCompliance={92}
              onSegmentClick={(segment) => setActiveFilter(segment === activeFilter ? "All" : segment)}
            />
          </div>

          <div className="lg:col-span-1 h-[320px] bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Top Offenders</h3>
            <p className="text-[11px] text-slate-500 font-medium mb-3">Caregivers with the most exceptions this period.</p>
            <div className="flex-1 overflow-y-auto pr-2 space-y-1">
              {mockTopOffenders.map(offender => (
                <OffenderRow key={offender.id} offender={offender} />
              ))}
            </div>
          </div>

          {/* Row 6 Concept: Billing Risk Callout (Moved to Row 2 right column for better grid fit) */}
          <div className="lg:col-span-1 h-[320px]">
            <BillingRiskCard
              totalRisk={4250.00}
              needsReview={2800.00}
              likelyDenied={1450.00}
            />
          </div>
        </div>

        {/* Row 3: Exceptions Queue */}
        <div className="bg-white/70 backdrop-blur-xl rounded-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
          <div className="p-3 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Exceptions Queue
              {activeFilter !== "All" && (
                <span className="text-[10px] font-semibold bg-brand-teal/10 text-brand-teal px-1.5 py-0.5 rounded-full">
                  Filtered by: {activeFilter}
                </span>
              )}
            </h3>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search caregiver or patient..."
                  className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium w-full md:w-56 focus:outline-none focus:ring-1 focus:ring-brand-teal/20 focus:border-brand-teal"
                />
              </div>
              <button className="p-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header row */}
              <div className="flex items-center px-4 py-2 border-b border-slate-100 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <div className="flex-[1.5] min-w-[200px]">Caregiver / Patient</div>
                <div className="flex-1 min-w-[150px]">Exception Type</div>
                <div className="flex-[1.5] min-w-[200px]">Details</div>
                <div className="w-[100px] shrink-0 text-right pr-4">Billing Risk</div>
                <div className="w-[140px] shrink-0 ml-4">Status</div>
              </div>

              {/* List */}
              <div className="divide-y divide-slate-100">
                <AnimatePresence>
                  {filteredExceptions.length > 0 ? (
                    filteredExceptions.map((exc, idx) => (
                      <ExceptionRow
                        key={exc.id}
                        exception={exc}
                        index={idx}
                        onClick={setSelectedException}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-12 text-center"
                    >
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">100% Compliant</h3>
                      <p className="text-slate-500 font-medium">No exceptions found for this filter.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Slide-in Detail Panel */}
      <ExceptionDetailPanel
        exception={selectedException}
        onClose={() => setSelectedException(null)}
        onResolve={handleResolve}
      />
    </div>
  );
}
