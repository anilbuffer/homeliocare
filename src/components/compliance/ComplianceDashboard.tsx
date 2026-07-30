"use client";

import React, { useState, useRef, useEffect } from "react";
import { ComplianceScoreCard } from "@/components/compliance/ComplianceScoreCard";
import { KpiCardStrip } from "@/components/compliance/KpiCardStrip";
import { RestrictedIncidentQueue } from "@/components/compliance/RestrictedIncidentQueue";
import { StateReportingDeadlineTracker } from "@/components/compliance/StateReportingDeadlineTracker";
import { VerificationQueue } from "@/components/compliance/VerificationQueue";
import { QualityTrends } from "@/components/compliance/QualityTrends";
import { CalendarDays, FileDown, ChevronDown } from "lucide-react";
import { toast } from "sonner";

import { mockComplianceScore, mockKpiSummary, mockVerificationQueue } from "@/lib/mock-data/compliance";
import { mockRestrictedIncidents, mockStateDeadlines } from "@/lib/mock-data/compliance-dashboard";

export function ComplianceDashboard() {
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
    <div className="full-width space-y-4">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Good morning, David</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            17 compliance items due, {mockRestrictedIncidents.length} restricted incidents open, survey readiness at {mockComplianceScore.overallScore}%
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
            onClick={() => toast.success("Generating compliance report...")}
            className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap active:scale-95">
            <FileDown className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Row 1: KPI Strip (from compliance) */}
      <div className="w-full">
        <KpiCardStrip data={mockKpiSummary} />
      </div>

      {/* Main Grid Layout for better responsiveness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
        
        {/* Restricted Incident Queue */}
        <div className="col-span-1 lg:col-span-2 xl:col-span-2 h-auto lg:h-[450px]">
          <RestrictedIncidentQueue incidents={mockRestrictedIncidents} />
        </div>

        {/* Verification Queue */}
        <div className="col-span-1 h-auto lg:h-[450px]">
          <VerificationQueue items={mockVerificationQueue} />
        </div>

        {/* State Reporting Deadline Tracker */}
        <div className="col-span-1 h-auto lg:h-[450px]">
          <StateReportingDeadlineTracker deadlines={mockStateDeadlines} />
        </div>

        {/* Quality Trends */}
        <div className="col-span-1 lg:col-span-2 xl:col-span-2 h-auto lg:h-[450px]">
          <QualityTrends />
        </div>

      </div>
    </div>
  );
}
