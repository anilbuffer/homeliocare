"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Activity,
  HeartHandshake,
  Receipt,
  ShieldAlert,
  CheckSquare,
  Award,
  GraduationCap,
  BarChart3,
  Inbox,
  MessageSquare,
  Settings,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const navGroups = [
  {
    label: "",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
      { name: "Clients", icon: Users, id: "clients" },
      { name: "Scheduling", icon: CalendarDays, id: "scheduling" },
      { name: "EVV Monitoring", icon: Activity, id: "evv" },
      { name: "Caregivers & HR", icon: HeartHandshake, id: "caregivers" },
      { name: "Billing & Claims", icon: Receipt, id: "billing" },
    ],
  },
  {
    label: "COMPLIANCE & QUALITY",
    items: [
      { name: "Incident & Risk", icon: ShieldAlert, id: "incidents" },
      { name: "Compliance Tracking", icon: CheckSquare, id: "compliance" },
      { name: "Quality Assurance", icon: Award, id: "qa" },
      { name: "Training (LMS)", icon: GraduationCap, id: "training" },
    ],
  },
  {
    label: "BUSINESS",
    items: [
      { name: "Reports", icon: BarChart3, id: "reports" },
      { name: "Referrals & Intake", icon: Inbox, id: "referrals" },
      { name: "Communications", icon: MessageSquare, id: "communications" },
    ],
  },
  {
    label: "",
    items: [
      { name: "Settings", icon: Settings, id: "settings" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  
  const [activeItem, setActiveItem] = useState(() => {
    if (pathname?.startsWith("/training")) return "training";
    if (pathname?.startsWith("/billing")) return "billing";
    if (pathname?.startsWith("/scheduling")) return "scheduling";
    if (pathname === "/dashboard" || pathname === "/") return "dashboard";
    return "dashboard";
  });

  // Sync active item when pathname changes (e.g. browser back/forward)
  React.useEffect(() => {
    if (pathname.startsWith("/training")) {
      setActiveItem("training");
    } else if (pathname.startsWith("/billing")) {
      setActiveItem("billing");
    } else if (pathname.startsWith("/scheduling")) {
      setActiveItem("scheduling");
    } else if (pathname === "/dashboard" || pathname === "/") {
      setActiveItem("dashboard");
    }
  }, [pathname]);

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
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/80">
        {navGroups.map((group, index) => (
          <div key={index}>
            {group.label && (
              <div className="px-3 text-xs font-semibold text-text-secondary tracking-wider mb-2">
                {group.label}
              </div>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = activeItem === item.id;
                const Icon = item.icon;
                
                // Determine the correct href
                let href = "#";
                if (item.id === "dashboard") href = "/dashboard";
                if (item.id === "training") href = "/training";
                if (item.id === "billing") href = "/billing";
                if (item.id === "scheduling") href = "/scheduling";

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
                    {href !== "#" ? (
                      <Link
                        href={href}
                        onClick={() => setActiveItem(item.id)}
                        className={clsx(
                          "relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors z-10",
                          isActive ? "text-white" : "text-slate-300 hover:text-white hover:bg-sidebar-active"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    ) : (
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
                    )}
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
