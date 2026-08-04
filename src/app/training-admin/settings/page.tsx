"use client";

import React, { useState } from "react";
import {
  User,
  Bell,
  ShieldCheck,
  Sliders,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { NotificationPreferences } from "@/components/settings/NotificationPreferences";
import { UserProfile } from "@/components/settings/UserProfile";

export default function TrainerAdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("user-profile");

  const tabs = [
    {
      id: "user-profile",
      label: "Trainer Profile",
      icon: User,
      desc: "Manage your personal details",
    },
    {
      id: "notifications",
      label: "Notifications & Alerts",
      icon: Bell,
      desc: "System alerts, SMS & email routing",
    },
    {
      id: "security",
      label: "Security & Passwords",
      icon: ShieldCheck,
      desc: "Password policy, MFA settings",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4">
      {/* Top Header Banner matching Compliance Settings layout */}
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-brand-teal text-xs font-semibold uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" /> Trainer Administrator Settings
          </div>
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight mt-0.5">Trainer Profile & Configuration</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage your trainer profile, course notification preferences, and account security.
          </p>
        </div>
      </div>

      {/* 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Vertical Tab Navigation (1/4 width) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-1 self-start">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${isActive
                  ? "bg-brand-teal text-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] font-semibold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-normal"
                  }`}
              >
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${isActive ? "text-white" : "text-brand-teal"}`} />
                <div>
                  <div className="text-sm font-semibold leading-tight">{t.label}</div>
                  <div className={`text-[11px] text-normal mt-0.5 ${isActive ? "text-teal-100" : "text-gray-400 font-normal"}`}>
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
              {activeTab === "user-profile" && <UserProfile />}
              {activeTab === "notifications" && <NotificationPreferences />}
              {activeTab === "security" && <SecuritySettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
