"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ShieldAlert,
  FileCheck,
  Settings,
  HelpCircle,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import clsx from "clsx";

const navGroups = [
  {
    label: "CARE OPERATIONS",
    items: [
      { name: "Overview", icon: LayoutDashboard, id: "overview" },
      { name: "Schedule", icon: CalendarDays, id: "schedule" },
      { name: "Caregivers", icon: Users, id: "caregivers" },
    ],
  },
  {
    label: "FIELD TOOLS",
    items: [
      { name: "Incidents", icon: ShieldAlert, id: "incidents" },
      { name: "Care Plans", icon: FileCheck, id: "care-plans" },
    ],
  },
  {
    label: "PLATFORM",
    items: [
      { name: "Settings", icon: Settings, id: "settings" },
      { name: "Support", icon: HelpCircle, id: "support" },
    ],
  },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("overview");

  return (
    <aside className="w-[260px] flex-shrink-0 bg-sidebar-bg text-white flex flex-col h-screen fixed lg:sticky top-0 left-0 z-40 hidden md:flex">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-6 py-6 h-20">
        <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center font-bold text-lg">
          H
        </div>
        <span className="font-semibold text-lg tracking-wide">Homelio Care</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="px-3 text-xs font-semibold text-text-secondary tracking-wider mb-2">
              {group.label}
            </div>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = activeItem === item.id;
                const Icon = item.icon;
                return (
                  <li key={item.id} className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 bg-brand-teal rounded-xl"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <button
                      onClick={() => setActiveItem(item.id)}
                      className={clsx(
                        "relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors z-10",
                        isActive ? "text-white" : "text-slate-300 hover:text-white hover:bg-sidebar-active"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* HIPAA Card */}
      <div className="px-4 mb-4">
        <div className="bg-[#0e354a] rounded-xl p-4 flex items-start gap-3 border border-sidebar-active">
          <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-white">HIPAA Compliant</div>
            <div className="text-xs text-slate-400 mt-1">Data encrypted in transit and at rest.</div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-active">
        <button className="flex items-center gap-3 w-full hover:bg-sidebar-active p-2 rounded-xl transition-colors text-left">
          <div className="w-9 h-9 rounded-full bg-slate-600 shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=admin" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium text-white truncate">Sarah Jenkins</div>
            <div className="text-xs text-slate-400 truncate">Agency Admin</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        </button>
      </div>
    </aside>
  );
}
