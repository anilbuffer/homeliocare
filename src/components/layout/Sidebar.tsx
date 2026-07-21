"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  LogOut,
  User,
  HelpCircle
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const navGroups = [
  {
    label: "",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
      { name: "Patients", icon: Users, id: "patients" },
      { name: "Scheduling", icon: CalendarDays, id: "scheduling" },
      { name: "Caregivers & HR", icon: HeartHandshake, id: "caregivers" },
      { name: "Billing & Claims", icon: Receipt, id: "billing" },
    ],
  },
  {
    label: "COMPLIANCE & QUALITY",
    items: [
      { name: "Incident & Risk", icon: ShieldAlert, id: "incidents" },
      { name: "Compliance Tracking", icon: CheckSquare, id: "compliance" },
      { name: "EVV Compliance", icon: Activity, id: "evv-monitoring" },
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
    label: "CAREGIVER PORTAL",
    items: [
      { name: "EVV Capture", icon: Activity, id: "evv-capture" },
    ],
  },
  {
    label: "FINANCE & PAYROLL",
    items: [
      { name: "Payroll", icon: Receipt, id: "payroll" },
    ],
  },
  {
    label: "",
    items: [
      { name: "Settings", icon: Settings, id: "settings" },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [activeItem, setActiveItem] = useState(() => {
    if (pathname?.startsWith("/training")) return "training";
    if (pathname?.startsWith("/billing")) return "billing";
    if (pathname?.startsWith("/scheduling")) return "scheduling";
    if (pathname?.startsWith("/patients")) return "patients";
    if (pathname?.startsWith("/caregivers")) return "caregivers";
    if (pathname?.startsWith("/evv-monitoring")) return "evv-monitoring";
    if (pathname?.startsWith("/quality-assurance")) return "qa";
    if (pathname?.startsWith("/incidents")) return "incidents";
    if (pathname?.startsWith("/compliance")) return "compliance";
    if (pathname?.startsWith("/referrals")) return "referrals";
    if (pathname?.startsWith("/communications")) return "communications";
    if (pathname?.startsWith("/reports")) return "reports";
    if (pathname?.startsWith("/evv-capture")) return "evv-capture";
    if (pathname?.startsWith("/payroll")) return "payroll";
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
    } else if (pathname.startsWith("/patients")) {
      setActiveItem("patients");
    } else if (pathname.startsWith("/caregivers")) {
      setActiveItem("caregivers");
    } else if (pathname.startsWith("/evv-monitoring")) {
      setActiveItem("evv-monitoring");
    } else if (pathname.startsWith("/quality-assurance")) {
      setActiveItem("qa");
    } else if (pathname.startsWith("/incidents")) {
      setActiveItem("incidents");
    } else if (pathname.startsWith("/compliance")) {
      setActiveItem("compliance");
    } else if (pathname.startsWith("/referrals")) {
      setActiveItem("referrals");
    } else if (pathname.startsWith("/communications")) {
      setActiveItem("communications");
    } else if (pathname.startsWith("/reports")) {
      setActiveItem("reports");
    } else if (pathname.startsWith("/evv-capture")) {
      setActiveItem("evv-capture");
    } else if (pathname.startsWith("/payroll")) {
      setActiveItem("payroll");
    } else if (pathname === "/dashboard" || pathname === "/") {
      setActiveItem("dashboard");
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-slate-900/60 z-40 min-[1120px]:hidden backdrop-blur-sm"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside className={clsx(
        "w-[240px] flex-shrink-0 bg-sidebar-bg text-white flex flex-col h-screen fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out min-[1120px]:translate-x-0 min-[1120px]:sticky shadow-[4px_0_24px_rgba(0,0,0,0.15)] min-[1120px]:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Area */}
        <div className="flex items-center gap-3 px-6 py-4 h-20">
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
                  if (item.id === "patients") href = "/patients";
                  if (item.id === "caregivers") href = "/caregivers";
                  if (item.id === "evv-monitoring") href = "/evv-monitoring";
                  if (item.id === "qa") href = "/quality-assurance";
                  if (item.id === "incidents") href = "/incidents";
                  if (item.id === "compliance") href = "/compliance";
                  if (item.id === "referrals") href = "/referrals";
                  if (item.id === "communications") href = "/communications";
                  if (pathname?.startsWith("/reports")) href = "/reports";
                  if (item.id === "evv-capture") href = "/evv-capture";
                  if (item.id === "payroll") href = "/payroll";

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
                          onClick={() => {
                            if (onClose) onClose();
                          }}
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
        <div className="p-4 border-t border-sidebar-active relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 w-full hover:bg-sidebar-active p-2 rounded-xl transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-full bg-slate-600 shrink-0 overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=admin" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium text-white truncate">Sarah Jenkins</div>
              <div className="text-xs text-slate-400 truncate">Agency Admin</div>
            </div>
            <ChevronDown className={clsx("w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200", isProfileOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-[calc(100%-10px)] left-4 right-4 mb-2 bg-slate-800 border border-sidebar-active rounded-xl shadow-xl overflow-hidden z-50"
              >
                <div className="p-1 flex flex-col gap-1">
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-sidebar-active rounded-lg transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link 
                    href="/settings" 
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-sidebar-active rounded-lg transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </Link>
                  <Link 
                    href="/support" 
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-sidebar-active rounded-lg transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <HelpCircle className="w-4 h-4" />
                    Support
                  </Link>
                  <div className="h-px w-full bg-sidebar-active/50 my-0.5"></div>
                  <Link 
                    href="/login" 
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-sidebar-active rounded-lg transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </>
  );
}
