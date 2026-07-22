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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";

const navGroups = [
  {
    label: "",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
      { name: "User Management", icon: ShieldCheck, id: "users" },
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
  const { isCollapsed, toggleCollapse } = useSidebarCollapse();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showHipaaTooltip, setShowHipaaTooltip] = useState(false);

  const [activeItem, setActiveItem] = useState(() => {
    if (pathname?.startsWith("/users")) return "users";
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
    if (pathname?.startsWith("/payroll")) return "payroll";
    if (pathname?.startsWith("/settings")) return "settings";
    if (pathname === "/dashboard" || pathname === "/") return "dashboard";
    return "dashboard";
  });

  React.useEffect(() => {
    if (pathname.startsWith("/users")) setActiveItem("users");
    else if (pathname.startsWith("/training")) setActiveItem("training");
    else if (pathname.startsWith("/billing")) setActiveItem("billing");
    else if (pathname.startsWith("/scheduling")) setActiveItem("scheduling");
    else if (pathname.startsWith("/patients")) setActiveItem("patients");
    else if (pathname.startsWith("/caregivers")) setActiveItem("caregivers");
    else if (pathname.startsWith("/evv-monitoring")) setActiveItem("evv-monitoring");
    else if (pathname.startsWith("/quality-assurance")) setActiveItem("qa");
    else if (pathname.startsWith("/incidents")) setActiveItem("incidents");
    else if (pathname.startsWith("/compliance")) setActiveItem("compliance");
    else if (pathname.startsWith("/referrals")) setActiveItem("referrals");
    else if (pathname.startsWith("/communications")) setActiveItem("communications");
    else if (pathname.startsWith("/reports")) setActiveItem("reports");
    else if (pathname.startsWith("/payroll")) setActiveItem("payroll");
    else if (pathname.startsWith("/settings")) setActiveItem("settings");
    else if (pathname === "/dashboard" || pathname === "/") setActiveItem("dashboard");
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

      <aside
        className={clsx(
          "bg-sidebar-bg text-white flex flex-col h-screen fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out min-[1120px]:translate-x-0 min-[1120px]:sticky shadow-[4px_0_24px_rgba(0,0,0,0.15)] min-[1120px]:shadow-none select-none relative",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "min-[1120px]:w-[76px] w-[240px]" : "w-[240px]"
        )}
      >
        {/* Floating Edge Toggle Button matching requested screenshot */}
        <button
          onClick={toggleCollapse}
          title={isCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
          className="hidden min-[1120px]:flex absolute -right-4 top-4 z-50 w-7 h-7 rounded-full bg-brand-teal text-white items-center justify-center shadow-lg border-1 border-white ring-1.5 ring-slate-900/80 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-4.5 h-4.5" />
          ) : (
            <PanelLeftClose className="w-4.5 h-4.5" />
          )}
        </button>

        {/* Header / Logo Area */}
        <div
          className={clsx(
            "flex items-center h-20 border-b border-sidebar-active/40 transition-all duration-300",
            isCollapsed ? "px-3 justify-center" : "px-5 justify-start"
          )}
        >
          <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-9 h-9 rounded-xl bg-brand-teal flex items-center justify-center font-bold text-lg text-white shadow-md shadow-brand-teal/30 shrink-0 group-hover:scale-105 transition-transform">
              H
            </div>
            {!isCollapsed && (
              <span className="font-bold text-base tracking-wide text-white truncate">
                Homelio Care
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/80">
          {navGroups.map((group, index) => (
            <div key={index}>
              {group.label ? (
                !isCollapsed ? (
                  <div className="px-3 text-[11px] font-semibold text-text-secondary tracking-wider uppercase mb-2 truncate">
                    {group.label}
                  </div>
                ) : (
                  <div className="h-px bg-slate-800 my-2 mx-2" />
                )
              ) : null}

              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeItem === item.id;
                  const Icon = item.icon;

                  let href = "#";
                  if (item.id === "dashboard") href = "/dashboard";
                  if (item.id === "users") href = "/users";
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
                  if (item.id === "reports") href = "/reports";
                  if (item.id === "payroll") href = "/payroll";
                  if (item.id === "settings") href = "/settings";

                  return (
                    <li key={item.id} className="relative group">
                      {isActive && (
                        <motion.div
                          layoutId="active-nav"
                          className="absolute inset-0 bg-brand-teal rounded-xl shadow-md shadow-brand-teal/20"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        />
                      )}

                      <Link
                        href={href}
                        onClick={() => {
                          if (onClose) onClose();
                        }}
                        className={clsx(
                          "relative flex items-center rounded-xl text-sm font-medium transition-colors z-10",
                          isCollapsed ? "justify-center p-3" : "px-3.5 py-2.5 gap-3",
                          isActive ? "text-white font-semibold" : "text-slate-300 hover:text-white hover:bg-sidebar-active/60"
                        )}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span className="truncate">{item.name}</span>}
                      </Link>

                      {/* Tooltip for Mini View */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-2xl border border-slate-700/80 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 translate-x-1 group-hover:translate-x-0">
                          {item.name}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* HIPAA Card */}
        <div className="px-3 mb-3 relative group">
          {isCollapsed ? (
            <div
              onMouseEnter={() => setShowHipaaTooltip(true)}
              onMouseLeave={() => setShowHipaaTooltip(false)}
              className="bg-[#0e354a] rounded-xl p-3 flex items-center justify-center border border-sidebar-active/60 cursor-pointer hover:bg-sidebar-active/50 transition-colors relative"
            >
              <div className="relative">
                <ShieldCheck className="w-5 h-5 text-brand-teal" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-sidebar-bg"></span>
              </div>

              <AnimatePresence>
                {showHipaaTooltip && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-full ml-4 bottom-0 w-56 bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl z-50 text-left pointer-events-none"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                      <ShieldCheck className="w-4 h-4 text-brand-teal" />
                      HIPAA Compliant
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      Data encrypted in transit and at rest.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-[#0e354a] rounded-xl p-4 flex items-start gap-3 border border-sidebar-active">
              <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-white">HIPAA Compliant</div>
                <div className="text-xs text-slate-400 mt-1">Data encrypted in transit and at rest.</div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="p-3 border-t border-sidebar-active/60 relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={clsx(
              "flex items-center gap-3 w-full hover:bg-sidebar-active p-2 rounded-xl transition-colors text-left",
              isCollapsed && "justify-center"
            )}
            title={isCollapsed ? "Sarah Jenkins (Agency Admin)" : undefined}
          >
            <div className="w-9 h-9 rounded-full bg-slate-600 shrink-0 overflow-hidden flex items-center justify-center ring-2 ring-brand-teal/40">
              <User className="w-4.5 h-4.5 text-slate-300" />
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium text-white truncate">Sarah Jenkins</div>
                  <div className="text-xs text-slate-400 truncate">Agency Admin</div>
                </div>
                <ChevronDown
                  className={clsx("w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200", isProfileOpen && "rotate-180")}
                />
              </>
            )}
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={clsx(
                  "absolute bg-slate-800 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5",
                  isCollapsed
                    ? "left-full ml-4 bottom-3 w-48"
                    : "bottom-[calc(100%-10px)] left-3 right-3 mb-2"
                )}
              >
                <div className="flex flex-col gap-1">
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-sidebar-active rounded-xl transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Settings
                  </Link>
                  <div className="h-px w-full bg-sidebar-active/60 my-0.5" />
                  <Link
                    href="/login"
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors"
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
