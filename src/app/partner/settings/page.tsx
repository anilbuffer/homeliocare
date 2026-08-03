"use client";

import React, { useState } from "react";
import {
  Building2,
  Users,
  Bell,
  Sliders,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { OrgTeamManagement } from "@/components/partner/settings/OrgTeamManagement";
import { mockOrganization } from "@/lib/partner/mockData";

export default function PartnerSettingsPage() {
  const [activeTab, setActiveTab] = useState("org-profile");

  const tabs = [
    {
      id: "org-profile",
      label: "Organization Profile",
      icon: Building2,
      desc: "Manage your organization details",
    },
    {
      id: "team-management",
      label: "Team Management",
      icon: Users,
      desc: "Manage staff and permissions",
    },
    {
      id: "notifications",
      label: "Notifications & Alerts",
      icon: Bell,
      desc: "Alerts and email preferences",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4">
      {/* Top Header Banner matching Compliance Settings layout */}
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-brand-teal text-xs font-semibold uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" /> Account Settings
          </div>
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight mt-0.5">Settings & Configuration</h1>
          <p className="text-xs text-slate-500 font-normal mt-1">
            Manage your organization's profile, team members, and notification preferences.
          </p>
        </div>
      </div>
      {/* 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Tab Navigation (1/4 width on desktop) */}
        <div className="bg-white p-1 lg:p-4 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex flex-row lg:flex-col gap-1 lg:gap-2 self-start w-full relative">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 lg:flex-none lg:w-full min-w-0 text-center lg:text-left p-1.5 lg:p-3 rounded-xl transition-all flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-1 lg:gap-3 cursor-pointer group relative overflow-hidden ${isActive
                  ? "bg-brand-teal text-white shadow-[0_6px_24px_rgba(14,163,131,0.25)] font-semibold"
                  : "bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-normal"
                  }`}
              >
                {/* Active state indicator for mobile */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabSettings"
                    className="absolute inset-0 bg-brand-teal"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-1 lg:gap-3 w-full">
                  <Icon className={`w-5 h-5 shrink-0 lg:mt-0.5 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-brand-teal"}`} />
                  <div className="hidden lg:block w-full text-left">
                    <div className="text-sm font-semibold leading-tight">{t.label}</div>
                    <div className={`text-[11px] font-normal mt-0.5 ${isActive ? "text-teal-100" : "text-slate-400"}`}>
                      {t.desc}
                    </div>
                  </div>
                  {/* Mobile text (shortened) */}
                  <span className="lg:hidden text-[10px] sm:text-[11px] font-medium whitespace-nowrap truncate w-full text-center">
                    {t.label.split(" ")[0]}
                  </span>
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
              className="w-full h-full"
            >
              {activeTab === "org-profile" && <OrgProfileTab />}
              {activeTab === "team-management" && <div className="h-full"><OrgTeamManagement /></div>}
              {activeTab === "notifications" && <NotificationsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function OrgProfileTab() {
  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl px-4 py-3 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden h-full">
      <div className="flex items-center gap-3 mb-3 lg:mb-4">
        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
          <Building2 className="w-5 h-5 text-slate-500" />
        </div>
        <h3 className="font-semibold text-slate-800 text-base">Organization Profile</h3>
      </div>
      <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Organization Name</label>
          <input type="text" defaultValue={mockOrganization.name} className="w-full rounded-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2 px-3 border outline-none text-slate-700 bg-slate-50" readOnly />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Primary Contact</label>
          <input type="text" defaultValue={mockOrganization.primaryContact} className="w-full rounded-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2 px-3 border outline-none text-slate-700" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Contact Email</label>
          <input type="email" defaultValue={mockOrganization.primaryEmail} className="w-full rounded-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2 px-3 border outline-none text-slate-700" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Address</label>
          <textarea rows={2} defaultValue={mockOrganization.address} className="w-full rounded-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2 px-3 border outline-none resize-none text-slate-700"></textarea>
        </div>
        <div className="md:col-span-2">
          <button
            onClick={() => {
              const toast = require("sonner").toast;
              toast.success("Organization profile updated successfully.");
            }}
            className="w-full py-2.5 bg-brand-teal text-white hover:bg-brand-teal/90 rounded-xl text-sm font-medium transition-colors shadow-[0_4px_12px_rgba(13,148,136,0.4)] hover:shadow-[0_6px_16px_rgba(13,148,136,0.6)]">
            Save Profile Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-4 h-full">
      <div className="flex items-center gap-3 mb-3 lg:mb-4">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
          <Bell className="w-5 h-5 text-amber-500" />
        </div>
        <h3 className="font-semibold text-slate-800 text-base">Notifications</h3>
      </div>
      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            defaultChecked
            onChange={(e) => {
              const toast = require("sonner").toast;
              toast.success(e.target.checked ? "Status Updates enabled" : "Status Updates disabled");
            }}
            className="mt-1 rounded text-brand-teal focus:ring-brand-teal border-slate-300 w-4 h-4 cursor-pointer"
          />
          <div>
            <div className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Status Updates</div>
            <div className="text-xs text-slate-500">Receive emails when referral status changes</div>
          </div>
        </label>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            defaultChecked
            onChange={(e) => {
              const toast = require("sonner").toast;
              toast.success(e.target.checked ? "New Messages notifications enabled" : "New Messages notifications disabled");
            }}
            className="mt-1 rounded text-brand-teal focus:ring-brand-teal border-slate-300 w-4 h-4 cursor-pointer"
          />
          <div>
            <div className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">New Messages</div>
            <div className="text-xs text-slate-500">Receive emails when Homelio sends a message</div>
          </div>
        </label>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            onChange={(e) => {
              const toast = require("sonner").toast;
              toast.success(e.target.checked ? "Monthly Summary enabled" : "Monthly Summary disabled");
            }}
            className="mt-1 rounded text-brand-teal focus:ring-brand-teal border-slate-300 w-4 h-4 cursor-pointer"
          />
          <div>
            <div className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Monthly Summary</div>
            <div className="text-xs text-slate-500">Receive a monthly report of referral performance</div>
          </div>
        </label>
      </div>
    </div>
  );
}
