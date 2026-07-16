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

export function CaregiverTabs({ caregiver }: { caregiver: Caregiver }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex items-center p-1.5 bg-white backdrop-blur-md rounded-2xl mb-8 overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/80 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar-thumb]:rounded-full border border-slate-200/60 w-fit max-w-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl ${isActive ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
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
            {activeTab === "overview" && <OverviewTab caregiver={caregiver} />}
            {activeTab === "certifications" && <CertificationsTab caregiver={caregiver} />}
            {activeTab === "availability" && <AvailabilityTab caregiver={caregiver} />}
            {activeTab === "performance" && <PerformanceTab caregiver={caregiver} />}
            {activeTab === "assigned-patients" && <AssignedPatientsTab caregiver={caregiver} />}
            {activeTab === "documents" && <DocumentsTab caregiver={caregiver} />}
            {activeTab === "payroll" && <PayrollTab caregiver={caregiver} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
