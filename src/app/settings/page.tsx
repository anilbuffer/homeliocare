"use client";

import React, { useState } from "react";
import { Building2, FileText, CreditCard, Map, Users, Bell, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { AgencyProfile } from "@/components/settings/AgencyProfile";
import { ServiceLines } from "@/components/settings/ServiceLines";
import { PayerSetup } from "@/components/settings/PayerSetup";
import { EVVConfig } from "@/components/settings/EVVConfig";
import { UserManagement } from "@/components/settings/UserManagement";
import { NotificationPreferences } from "@/components/settings/NotificationPreferences";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("agency-profile");

  const tabs = [
    { id: "agency-profile", label: "Agency Profile" },
    { id: "service-lines", label: "Service Lines" },
    { id: "payer-setup", label: "Payers & MCOs" },
    { id: "evv-config", label: "State & EVV" },
    { id: "user-management", label: "Users" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
  ];

  return (
    <div className="w-full max-w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings & Configuration</h1>
        <p className="text-xs text-slate-500 mt-1">Manage agency-wide preferences, compliance configurations, and security policies.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center p-1.5 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl mb-6 overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 border border-slate-200 w-full sm:w-max max-w-full">
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
                  layoutId="settings-tab-indicator"
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
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activeTab === "agency-profile" && <AgencyProfile />}
            {activeTab === "service-lines" && <ServiceLines />}
            {activeTab === "payer-setup" && <PayerSetup />}
            {activeTab === "evv-config" && <EVVConfig />}
            {activeTab === "user-management" && <UserManagement />}
            {activeTab === "notifications" && <NotificationPreferences />}
            {activeTab === "security" && <SecuritySettings />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
