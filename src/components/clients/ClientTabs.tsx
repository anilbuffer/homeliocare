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
      <div className="flex items-center p-1.5 bg-slate-100/80 backdrop-blur-md rounded-2xl mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden border border-slate-200/60 max-w-fit shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl ${
                isActive ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
              }`}
            >
              <span className="relative z-10">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="client-tab-indicator"
                  className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200/50"
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
