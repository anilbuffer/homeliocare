"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Caregiver } from "@/lib/caregivers/mockData";

// Placeholders for tabs
import { OverviewTab } from "@/components/caregivers/tabs/OverviewTab";
import { CertificationsTab } from "@/components/caregivers/tabs/CertificationsTab";
import { AvailabilityTab } from "@/components/caregivers/tabs/AvailabilityTab";
import { PerformanceTab } from "@/components/caregivers/tabs/PerformanceTab";
import { AssignedPatientsTab } from "@/components/caregivers/tabs/AssignedPatientsTab";
import { DocumentsTab } from "@/components/caregivers/tabs/DocumentsTab";
import { PayrollTab } from "@/components/caregivers/tabs/PayrollTab";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "certifications", label: "Certifications" },
  { id: "availability", label: "Availability" },
  { id: "performance", label: "Performance" },
  { id: "assigned-patients", label: "Assigned Patients" },
  { id: "documents", label: "Documents" },
  { id: "payroll", label: "Payroll" },
];

interface CaregiverTabsProps {
  caregiver: Caregiver;
  onRunChecks?: () => void;
  onViewScreeningDetails?: () => void;
  onViewDocument?: (title: string, category?: string, date?: string) => void;
  onViewCertificate?: (cert: { name: string; issuer: string; issueDate: string; expiryDate: string; status: string }) => void;
  onTriggerToast?: (msg: string) => void;
  onEditAvailability?: () => void;
  onAddRegion?: () => void;
  onScheduleShift?: () => void;
  regions?: string[];
  onViewFeedback?: () => void;
  onAssignPatient?: () => void;
  onUploadDocument?: () => void;
  onDownloadDocument?: (title: string) => void;
  extraDocuments?: Array<{ name: string; category: string; date: string; size: string }>;
  onViewPayStubs?: () => void;
  onDownloadPayStub?: (period: string) => void;
}

export function CaregiverTabs({
  caregiver,
  onRunChecks,
  onViewScreeningDetails,
  onViewDocument,
  onViewCertificate,
  onTriggerToast,
  onEditAvailability,
  onAddRegion,
  onScheduleShift,
  regions,
  onViewFeedback,
  onAssignPatient,
  onUploadDocument,
  onDownloadDocument,
  extraDocuments,
  onViewPayStubs,
  onDownloadPayStub,
}: CaregiverTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex items-center p-1.5 bg-white backdrop-blur-md rounded-2xl mb-4 overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/80 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar-thumb]:rounded-full border border-slate-200/60 w-fit max-w-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl ${isActive ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }`}
            >
              <span className="relative z-10">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="caregiver-tab-indicator"
                  className="absolute inset-0 bg-brand-teal/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-brand-teal/20"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <OverviewTab
                caregiver={caregiver}
                onRunChecks={onRunChecks}
                onViewScreeningDetails={onViewScreeningDetails}
              />
            )}
            {activeTab === "certifications" && (
              <CertificationsTab
                caregiver={caregiver}
                onViewDocument={onViewDocument}
                onViewCertificate={onViewCertificate}
                onTriggerToast={onTriggerToast}
              />
            )}
            {activeTab === "availability" && (
              <AvailabilityTab
                caregiver={caregiver}
                onEditAvailability={onEditAvailability}
                onAddRegion={onAddRegion}
                onScheduleShift={onScheduleShift}
                regions={regions}
              />
            )}
            {activeTab === "performance" && (
              <PerformanceTab
                caregiver={caregiver}
                onViewFeedback={onViewFeedback}
              />
            )}
            {activeTab === "assigned-patients" && (
              <AssignedPatientsTab
                caregiver={caregiver}
                onAssignPatient={onAssignPatient}
              />
            )}
            {activeTab === "documents" && (
              <DocumentsTab
                caregiver={caregiver}
                onUploadDocument={onUploadDocument}
                onViewDocument={onViewDocument}
                onDownloadDocument={onDownloadDocument}
                extraDocuments={extraDocuments}
              />
            )}
            {activeTab === "payroll" && (
              <PayrollTab
                caregiver={caregiver}
                onViewPayStubs={onViewPayStubs}
                onDownloadPayStub={onDownloadPayStub}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
