"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { FileDown, CalendarDays } from "lucide-react";

// Compliance Components
import { ComplianceScoreCard } from "@/components/compliance/ComplianceScoreCard";
import { KpiCardStrip } from "@/components/compliance/KpiCardStrip";
import { CategoryProgressBars } from "@/components/compliance/CategoryProgressBars";
import { ComplianceItemTracker } from "@/components/compliance/ComplianceItemTracker";
import { ReminderConfigPanel } from "@/components/compliance/ReminderConfigPanel";
import { VerificationQueue } from "@/components/compliance/VerificationQueue";
import { AuditLog } from "@/components/compliance/AuditLog";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-page-bg text-slate-900 font-sans overflow-hidden">
      {/* Sidebar - Desktop and Mobile Overlay */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        {/* Top Header */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-12 transition-all duration-300 ease-in-out">
          <div className="full-width space-y-6">

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-slate-900">Compliance Tracking</h1>
                <p className="text-sm text-slate-500 font-medium mt-0.5 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
                  17 compliance items need attention across the agency.
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <button className="hidden sm:flex items-center gap-2 bg-white border border-border-subtle rounded-full px-4 py-2 shadow-[0_6px_32px_rgba(0,0,0,0.06)] text-sm text-slate-700 font-medium transition-colors whitespace-nowrap">
                  <CalendarDays className="w-4 h-4 text-slate-400" />
                  This Quarter
                </button>
                <button className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap">
                  <FileDown className="w-4 h-4" />
                  Generate Report
                </button>
              </div>
            </div>

            {/* Row 1: Hero Compliance Score */}
            <div className="w-full">
              <ComplianceScoreCard data={mockComplianceScore} />
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
              <div>
                <ReminderConfigPanel logs={mockReminderLogs} />
              </div>
              <div>
                <VerificationQueue items={mockVerificationQueue} />
              </div>
            </div>

            {/* Row 7: Audit Log */}
            <div className="w-full">
              <AuditLog logs={mockAuditLogs} />
            </div>

            {/* Row 8: Policy Acknowledgment Tracker */}
            <div className="w-full pb-8">
              <PolicyAcknowledgmentMatrix policies={mockPolicyMatrix} />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
