"use client";

import React, { useState } from "react";
import {
  Building2,
  FileText,
  CreditCard,
  MapPin,
  Users,
  Bell,
  ShieldCheck,
  Sliders,
} from "lucide-react";
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
    {
      id: "agency-profile",
      label: "Agency Profile",
      icon: Building2,
      desc: "NPI, Tax ID, address & contacts",
    },
    {
      id: "service-lines",
      label: "Service Lines & Rates",
      icon: FileText,
      desc: "Billing codes, rates & service lines",
    },
    {
      id: "payer-setup",
      label: "Payers & MCOs",
      icon: CreditCard,
      desc: "Payer contracts, EDI & clearinghouse",
    },
    {
      id: "evv-config",
      label: "State & EVV Config",
      icon: MapPin,
      desc: "State aggregators, GPS & clock-in",
    },
    {
      id: "user-management",
      label: "Users & Roles",
      icon: Users,
      desc: "Staff accounts, security roles & RBAC",
    },
    {
      id: "notifications",
      label: "Notifications & Alerts",
      icon: Bell,
      desc: "System alerts, SMS & email routing",
    },
    {
      id: "security",
      label: "Security & Compliance",
      icon: ShieldCheck,
      desc: "Password policy, MFA & HIPAA compliance",
    },
  ];

  return (
    <div className="max-w-full mx-auto space-y-6">
      {/* Top Header Banner matching Caregiver & Portal Settings layout */}
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" /> Agency Master Settings
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Settings & Configuration</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage agency-wide preferences, compliance configurations, service offerings, EVV parameters, and RBAC security policies.
          </p>
        </div>
      </div>

      {/* 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Vertical Tab Navigation (1/4 width) */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-1 self-start">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${isActive
                    ? "bg-brand-teal text-white shadow-xs font-bold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium"
                  }`}
              >
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${isActive ? "text-white" : "text-brand-teal"}`} />
                <div>
                  <div className="text-xs font-bold leading-tight">{t.label}</div>
                  <div className={`text-[11px] mt-0.5 ${isActive ? "text-teal-100" : "text-gray-400 font-normal"}`}>
                    {t.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Main Form Container (3/4 width) */}
        <div className="lg:col-span-3">
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
    </div>
  );
}
