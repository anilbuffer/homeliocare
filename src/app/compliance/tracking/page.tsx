"use client";

import React, { useState, useRef, useEffect } from "react";
import { FileDown, CalendarDays, ChevronDown } from "lucide-react";
import { toast } from "sonner";

// Compliance Components
import { ComplianceScoreCard } from "@/components/compliance/ComplianceScoreCard";
import { KpiCardStrip } from "@/components/compliance/KpiCardStrip";
import { CategoryProgressBars } from "@/components/compliance/CategoryProgressBars";
import { ComplianceItemTracker } from "@/components/compliance/ComplianceItemTracker";
import { ReminderConfigPanel } from "@/components/compliance/ReminderConfigPanel";
import { VerificationQueue } from "@/components/compliance/VerificationQueue";
import { SystemAuditLog } from "@/components/compliance/SystemAuditLog";
import { PolicyAcknowledgmentMatrix } from "@/components/compliance/PolicyAcknowledgmentMatrix";

// Mock Data
import {
  mockComplianceScore,
  mockKpiSummary,
  mockComplianceItems,
  mockReminderLogs,
  mockVerificationQueue,
  mockAuditLogs,
  mockPolicyMatrix
} from "@/lib/mock-data/compliance";

export default function ComplianceTrackingPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("This Quarter");
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = ["This Week", "This Month", "This Quarter", "This Year", "All Time"];

  return (
    <>
      <div className="full-width space-y-4">
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Compliance Tracking</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
              17 compliance items need attention across the agency.
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="hidden sm:flex items-center gap-2 bg-white border border-border-subtle rounded-full px-4 py-2 shadow-[0_6px_32px_rgba(0,0,0,0.06)] text-sm text-slate-700 font-medium transition-colors whitespace-nowrap active:scale-95 hover:bg-slate-50">
                <CalendarDays className="w-4 h-4 text-slate-400" />
                {selectedFilter}
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50 py-1">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedFilter(option);
                        setIsFilterOpen(false);
                        toast.success(`Filter applied: ${option}`);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${selectedFilter === option ? 'text-brand-teal font-medium bg-slate-50/50' : 'text-slate-700'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => {
                toast.success("Report generation started");
                setTimeout(() => toast.success("Compliance Report downloaded successfully"), 1500);
              }}
              className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Row 1: Hero Compliance Score */}
        <div className="w-full">
          <ComplianceScoreCard
            data={mockComplianceScore}
            onCategoryClick={(category) => toast.info(`Viewing details for category: ${category}`)}
          />
        </div>

        {/* Row 2: KPI Strip */}
        <div className="w-full">
          <KpiCardStrip data={mockKpiSummary} />
        </div>

        {/* Row 3: Progress Bars */}
        <div className="w-full">
          <CategoryProgressBars data={mockComplianceScore.breakdown} />
        </div>

        {/* Row 4: Item Tracker */}
        <div className="w-full">
          <ComplianceItemTracker items={mockComplianceItems} />
        </div>

        {/* Row 5 & 6: Reminders and Verification Queue */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div>
            <ReminderConfigPanel logs={mockReminderLogs} />
          </div>
          <div>
            <VerificationQueue items={mockVerificationQueue} />
          </div>
        </div>

        {/* Row 7: Audit Log */}
        <div className="w-full">
          <SystemAuditLog />
        </div>

        {/* Row 8: Policy Acknowledgment Tracker */}
        <div className="w-full pb-8">
          <PolicyAcknowledgmentMatrix policies={mockPolicyMatrix} />
        </div>
      </div>
    </>
  );
}
