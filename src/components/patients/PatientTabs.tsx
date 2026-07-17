"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Patient } from "@/lib/patients/mockData";
import { OverviewTab } from "@/components/patients/tabs/OverviewTab";
import { CarePlanTab } from "@/components/patients/tabs/CarePlanTab";
import { VisitsTab } from "@/components/patients/tabs/VisitsTab";
import { MedicationsTab } from "@/components/patients/tabs/MedicationsTab";
import { DocumentsTab } from "@/components/patients/tabs/DocumentsTab";
import { BillingTab } from "@/components/patients/tabs/BillingTab";
import { CommunicationTab } from "@/components/patients/tabs/CommunicationTab";
import { ChronologyTab } from "./tabs/ChronologyTab";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "careplan", label: "Care Plan" },
  { id: "visits", label: "Visits" },
  { id: "medications", label: "Medications" },
  { id: "documents", label: "Documents" },
  { id: "billing", label: "Billing" },
  { id: "communication", label: "Communication" },
  { id: "chronology", label: "Chronology" },
];

function PatientTabsContent({ patient }: { patient: Patient }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabFromUrl = searchParams.get("tab");
  const initialTab = tabFromUrl && tabs.some(t => t.id === tabFromUrl) ? tabFromUrl : "overview";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (tabFromUrl && tabs.some(t => t.id === tabFromUrl) && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl, activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.replace(`${pathname}?tab=${tabId}`, { scroll: false });
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex items-center p-1.5 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl mb-8 overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 border border-slate-200/60 w-full sm:w-max max-w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`relative px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl ${isActive ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }`}
            >
              <span className="relative z-10">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="patient-tab-indicator"
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
            {activeTab === "overview" && <OverviewTab patient={patient} />}
            {activeTab === "careplan" && <CarePlanTab patient={patient} />}
            {activeTab === "visits" && <VisitsTab patient={patient} />}
            {activeTab === "medications" && <MedicationsTab patient={patient} />}
            {activeTab === "documents" && <DocumentsTab patient={patient} />}
            {activeTab === "billing" && <BillingTab patient={patient} />}
            {activeTab === "communication" && <CommunicationTab patient={patient} />}
            {activeTab === "chronology" && <ChronologyTab patient={patient} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function PatientTabs({ patient }: { patient: Patient }) {
  return (
    <Suspense fallback={<div>Loading tabs...</div>}>
      <PatientTabsContent patient={patient} />
    </Suspense>
  );
}
