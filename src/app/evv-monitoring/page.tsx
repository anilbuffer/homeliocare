"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Filter, Search, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";

import { mockExceptions, mockTopOffenders } from "./mockData";
import { EVVException } from "./types";

import { KpiCard } from "./_components/KpiCard";
import { ComplianceDonut } from "./_components/ComplianceDonut";
import { ExceptionRow } from "./_components/ExceptionRow";
import { ExceptionDetailPanel } from "./_components/ExceptionDetailPanel";
import { OffenderRow } from "./_components/OffenderRow";
import { BillingRiskCard } from "./_components/BillingRiskCard";
import { SubmissionDashboard } from "./_components/Submissions/SubmissionDashboard";
import { AggregatorConfig } from "@/components/billing/evv/AggregatorConfig";

const donutData = [
  { name: "Wrong GPS location", value: 45 },
  { name: "Missing clock-in", value: 22 },
  { name: "Missing clock-out", value: 38 },
  { name: "Time mismatch", value: 16 },
];

export default function EVVMonitoringPage() {
  const [exceptions, setExceptions] = useState(mockExceptions);
  const [selectedException, setSelectedException] = useState<EVVException | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"overview" | "exceptions" | "submissions" | "config">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8,ID,Type,Status\n1,Missing clock-in,Pending\n2,Wrong GPS,Resolved";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "evv_report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
      showToast("Report downloaded successfully!");
    }, 1500);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredExceptions = exceptions.filter(e => {
    const matchesFilter = activeFilter === "All" || e.type === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || e.caregiver.name.toLowerCase().includes(q) || e.patient.name.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const handleResolve = (id: string, action: string) => {
    setExceptions(prev => prev.map(ex =>
      ex.id === id ? { ...ex, status: "Resolved" } : ex
    ));
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="space-y-4 sm:space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="mb-0">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">EVV Monitoring</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              <span className="text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded-full text-xs mr-1">
                {exceptions.filter(e => e.status !== "Resolved").length} visits
              </span> need review today
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mb-4">
            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full bg-white border border-slate-200 text-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-slate-50 hover:border-slate-300 transition-all">
                <CalendarIcon className="w-4 h-4 text-slate-400" />
                This Week
              </button>
              {showCalendar && (
                <div className="absolute top-full mt-2 right-0 w-46 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-3 animate-in fade-in slide-in-from-top-2">
                  <div className="text-sm font-semibold text-slate-900 mb-2">Select Date Range</div>
                  <div className="space-y-1">
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Today</button>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg bg-brand-teal/5 text-brand-teal font-medium">This Week</button>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Last Week</button>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">This Month</button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 sm:flex-none w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-teal text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-teal/90 transition-all shadow-sm whitespace-nowrap disabled:opacity-70 disabled:hover:scale-100 active:scale-95">
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              {isDownloading ? 'Exporting...' : 'Export Report'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center p-1.5 bg-white/80 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl overflow-x-auto border border-slate-200 w-full max-w-full mb-4 no-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`relative px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl ${activeTab === "overview" ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
              }`}
          >
            <span className="relative z-10">Overview</span>
            {activeTab === "overview" && (
              <motion.div
                layoutId="evv-tab"
                className="absolute inset-0 bg-brand-teal/10 rounded-xl border border-brand-teal/20"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("exceptions")}
            className={`relative px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl ${activeTab === "exceptions" ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
              }`}
          >
            <span className="relative z-10">Exceptions Queue</span>
            {activeTab === "exceptions" && (
              <motion.div
                layoutId="evv-tab"
                className="absolute inset-0 bg-brand-teal/10 rounded-xl border border-brand-teal/20"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`relative px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl ${activeTab === "submissions" ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
              }`}
          >
            <span className="relative z-10">State Submissions</span>
            {activeTab === "submissions" && (
              <motion.div
                layoutId="evv-tab"
                className="absolute inset-0 bg-brand-teal/10 rounded-xl border border-brand-teal/20"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`relative px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl ${activeTab === "config" ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
              }`}
          >
            <span className="relative z-10">State Config & Connectors</span>
            {activeTab === "config" && (
              <motion.div
                layoutId="evv-tab"
                className="absolute inset-0 bg-brand-teal/10 rounded-xl border border-brand-teal/20"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Top Row: 5 KPI Cards (Matching screenshot) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <KpiCard
                title="Overall Compliance"
                value="92.4%"
                hero
                trend="up"
                trendValue="+1.2%"
              />
              <KpiCard
                title="Total Exceptions"
                value={125}
                subtitle="This period"
                trend="down"
                trendValue="-14"
              />
              <KpiCard
                title="Est. Billing Risk"
                value="$4,250"
                subtitle="Pending review"
                trend="down"
                trendValue="-$520"
              />
              <KpiCard
                title="Avg. Resolution Time"
                value="4.2 hrs"
                subtitle="From exception to fix"
              />
              <KpiCard
                title="Auto vs Manual"
                value="8.5 : 1"
                subtitle="Verification ratio"
                trend="up"
                trendValue="+0.4"
              />
            </div>

            {/* Middle Row: Compliance Breakdown, Top Offenders, Billing Risk */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
              {/* Card 1: Compliance Breakdown */}
              <div className="min-h-[300px]">
                <ComplianceDonut
                  data={donutData}
                  overallCompliance={92}
                  onSegmentClick={(segment) => {
                    setActiveFilter(segment === activeFilter ? "All" : segment);
                    setActiveTab("exceptions");
                  }}
                />
              </div>

              {/* Card 2: Top Offenders */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all duration-200 flex flex-col justify-between h-full min-h-[300px]">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5">Top Offenders</h3>
                  <p className="text-xs text-slate-500 font-medium mb-4">Caregivers with the most exceptions this period.</p>
                  <div className="space-y-2.5">
                    {mockTopOffenders.map(offender => (
                      <OffenderRow key={offender.id} offender={offender} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Billing Risk */}
              <div className="min-h-[300px]">
                <BillingRiskCard
                  totalRisk={4250.00}
                  needsReview={2800.00}
                  likelyDenied={1450.00}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Exceptions Queue */}
        {activeTab === "exceptions" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Exceptions Queue Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  Exceptions Queue
                  {activeFilter !== "All" && (
                    <span className="text-[10px] font-bold bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-full">
                      Filtered by: {activeFilter}
                    </span>
                  )}
                </h3>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search caregiver or patient..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm font-medium w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all bg-white"
                    />
                  </div>
                  <div className="relative shrink-0">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="p-2 border border-slate-200 rounded-xl text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all">
                      <Filter className="w-4 h-4" />
                    </button>
                    {showFilters && (
                      <div className="absolute top-full mt-2 right-0 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-4 animate-in fade-in slide-in-from-top-2">
                        <div className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Status Filter</div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2.5 text-sm font-medium text-slate-700 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal border-slate-300" defaultChecked /> Unresolved
                          </label>
                          <label className="flex items-center gap-2.5 text-sm font-medium text-slate-700 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal border-slate-300" /> Resolved
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Header row */}
                  <div className="flex items-center px-4 sm:px-5 py-3 border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
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
          </motion.div>
        )}

        {/* Tab 3: Submissions */}
        {activeTab === "submissions" && (
          <SubmissionDashboard />
        )}

        {/* Tab 4: Config */}
        {activeTab === "config" && (
          <AggregatorConfig />
        )}

      </div>

      {/* Slide-in Detail Panel */}
      <ExceptionDetailPanel
        exception={selectedException}
        onClose={() => setSelectedException(null)}
        onResolve={handleResolve}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 z-[100]">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

