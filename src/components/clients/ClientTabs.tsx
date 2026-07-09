"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Client } from "@/lib/clients/mockData";
import { OverviewTab } from "@/components/clients/tabs/OverviewTab";
import { CarePlanTab } from "@/components/clients/tabs/CarePlanTab";
import { VisitsTab } from "@/components/clients/tabs/VisitsTab";
import { MedicationsTab } from "@/components/clients/tabs/MedicationsTab";
import { DocumentsTab } from "@/components/clients/tabs/DocumentsTab";
import { BillingTab } from "@/components/clients/tabs/BillingTab";
import { CommunicationTab } from "@/components/clients/tabs/CommunicationTab";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "careplan", label: "Care Plan" },
  { id: "visits", label: "Visits" },
  { id: "medications", label: "Medications" },
  { id: "documents", label: "Documents" },
  { id: "billing", label: "Billing" },
  { id: "communication", label: "Communication" },
];

export function ClientTabs({ client }: { client: Client }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex items-center gap-6 border-b border-slate-200 mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-4 px-2 text-sm font-medium transition-colors whitespace-nowrap ${
                isActive ? "text-brand-teal" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="client-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-teal"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
            {activeTab === "overview" && <OverviewTab client={client} />}
            {activeTab === "careplan" && <CarePlanTab client={client} />}
            {activeTab === "visits" && <VisitsTab client={client} />}
            {activeTab === "medications" && <MedicationsTab client={client} />}
            {activeTab === "documents" && <DocumentsTab client={client} />}
            {activeTab === "billing" && <BillingTab client={client} />}
            {activeTab === "communication" && <CommunicationTab client={client} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
