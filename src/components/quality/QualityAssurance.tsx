"use client";

import React, { useState } from "react";
import { Plus, Calendar as CalendarIcon, FileCheck, AlertTriangle, CheckSquare, Clock, ShieldAlert, ChevronDown, Search } from "lucide-react";
import { QAScoreCard } from "./QAScoreCard";
import { AuditList } from "./AuditList";
import { AuditChecklist } from "./AuditChecklist";
import { FindingsTable } from "./FindingsTable";
import { SupervisorEvalCard } from "./SupervisorEvalCard";
import { TrendsChart } from "./TrendsChart";
import { AuditType } from "./mockData";
import clsx from "clsx";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/hooks/useAuth";

const KPI_DATA = [
  { label: "Audits Completed", value: "24", subtext: "This Month", icon: FileCheck, color: "text-brand-teal", bg: "bg-brand-teal/20" },
  { label: "Audits Overdue", value: "3", subtext: "Requires action", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-400/20" },
  { label: "Avg. Audit Score", value: "92%", subtext: "+2% vs last mo", icon: CheckSquare, color: "text-emerald-400", bg: "bg-emerald-400/20" },
  { label: "Open Findings", value: "12", subtext: "Across all audits", icon: ShieldAlert, color: "text-amber-400", bg: "bg-amber-400/20" },
  { label: "Corrective Actions", value: "5", subtext: "In Progress", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/20" },
  { label: "Closed On Time", value: "88%", subtext: "Target: 95%", icon: FileCheck, color: "text-purple-400", bg: "bg-purple-400/20" },
];

const AUDIT_TABS: AuditType[] = [
  "Chart Audit",
  "Visit Audit",
  "Documentation Audit",
  "Care Plan Audit",
  "Medication Audit"
];

export function QualityAssurance() {
  const { currentUser } = useAuth();

  const allowedTabs = currentUser?.role === "CLINICAL_SUPERVISOR_RN"
    ? (["Care Plan Audit", "Medication Audit"] as AuditType[])
    : AUDIT_TABS;

  const [activeTab, setActiveTab] = useState<AuditType>(allowedTabs[0]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <div className="full-width space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-base font-semibold text-slate-900">Quality Assurance</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-teal"></span>
            15 audits due this month
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-white backdrop-blur-xl rounded-2xl px-4 py-2 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
            <CalendarIcon className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer">
              <option className="bg-white">This Month (July 2026)</option>
              <option className="bg-white">Last Month (June 2026)</option>
              <option className="bg-white">Q3 2026</option>
            </select>
          </div>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Schedule Audit
          </button>
        </div>
      </div>

      {/* Row 1 & 2: Score Card and KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <QAScoreCard />
        </div>
        <div className="lg:col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {KPI_DATA.map((kpi, index) => (
            <div key={index} className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className={clsx("p-2 rounded-full", kpi.bg, kpi.color)}>
                  <kpi.icon className="w-4 h-4" />
                </div>
                <div className="text-sm font-medium text-text-secondary line-clamp-1">{kpi.label}</div>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <div className="text-xl font-bold text-text-primary">{kpi.value}</div>
                <div className="text-xs text-slate-500">{kpi.subtext}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Audit Schedule & Assignment */}
      <div className="h-full">
        <AuditList />
      </div>

      {/* Row 4: Audit Types Breakdown (Tabs & Checklist) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[500px]">
        {/* Tabs */}
        <div className="lg:col-span-1 bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col gap-2">
          <h3 className="text-base font-medium text-text-primary mb-2">Audit Instruments</h3>
          {allowedTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                activeTab === tab
                  ? "bg-brand-teal/10 text-brand-teal border-brand-teal/30 shadow-[0_0_15px_rgba(20,184,166,0.1)]"
                  : "bg-transparent text-text-secondary border-slate-100 hover:bg-slate-100 hover:text-slate-800"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Checklist */}
        <div className="lg:col-span-3 h-full">
          <AuditChecklist activeTab={activeTab} />
        </div>
      </div>

      {/* Row 5: Findings & Corrective Actions */}
      <div className="h-full">
        <FindingsTable />
      </div>

      {/* Row 6 & 7: Supervisor Evals & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <SupervisorEvalCard />
        <TrendsChart />
      </div>

      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule New Audit"
        description="Select the type and subject for the new quality assurance audit."
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <button
              onClick={() => setIsScheduleModalOpen(false)}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsScheduleModalOpen(false)}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-teal to-brand-teal/90 hover:from-brand-teal/90 hover:to-brand-teal shadow-[0_4px_14px_0_rgba(20,184,166,0.39)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.23)] hover:-translate-y-0.5 rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              <CalendarIcon className="w-4 h-4" />
              Confirm Schedule
            </button>
          </div>
        }
      >
        <div className="space-y-5 py-2">
          {/* Audit Type */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Audit Type</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-teal transition-colors">
                <ShieldAlert className="w-[18px] h-[18px]" />
              </div>
              <select className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-700 focus:bg-white focus:outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 transition-all appearance-none cursor-pointer">
                {AUDIT_TABS.map(tab => (
                  <option key={tab}>{tab}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Subject (Caregiver / Patient)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-teal transition-colors">
                <Search className="w-[18px] h-[18px]" />
              </div>
              <input
                type="text"
                placeholder="Search subject name..."
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <div className="bg-white text-slate-400 text-[10px] font-semibold px-2 py-1 rounded-md border border-slate-200/60 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">⌘K</div>
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Due Date</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-teal transition-colors">
                <CalendarIcon className="w-[18px] h-[18px]" />
              </div>
              <input
                type="date"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 focus:bg-white focus:outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 transition-all"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
