"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  UserPlus,
  HeartHandshake,
  GraduationCap,
  Receipt,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  ChevronDown,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";
import { useAuth } from "@/hooks/useAuth";

const hrNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/hr/dashboard", id: "dashboard" },
  { name: "Recruiting", icon: UserPlus, href: "/hr/recruiting", id: "recruiting" },
  { name: "Caregivers", icon: HeartHandshake, href: "/hr/caregivers", id: "caregivers" },
  { name: "Training", icon: GraduationCap, href: "/hr/training", id: "training" },
  { name: "Payroll", icon: Receipt, href: "/hr/payroll", id: "payroll" },
  { name: "Messages", icon: MessageSquare, href: "/hr/messages", id: "messages" },
];

interface HrSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function HrSidebar({ isOpen = false, onClose }: HrSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const { isCollapsed, toggleCollapse } = useSidebarCollapse();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    router.push("/login");
  };

  const getActiveItem = () => {
    if (pathname?.startsWith("/hr/recruiting")) return "recruiting";
    if (pathname?.startsWith("/hr/caregivers")) return "caregivers";
    if (pathname?.startsWith("/hr/training")) return "training";
    if (pathname?.startsWith("/hr/payroll")) return "payroll";
    if (pathname?.startsWith("/hr/messages")) return "messages";
    if (pathname?.startsWith("/hr/dashboard") || pathname === "/hr") return "dashboard";
    return "dashboard";
  };

  const activeItem = getActiveItem();

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
          "bg-sidebar-bg text-white flex flex-col h-screen fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out min-[1120px]:translate-x-0 min-[1120px]:sticky min-[1120px]:top-0 shadow-[4px_0_24px_rgba(0,0,0,0.15)] min-[1120px]:shadow-none select-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "min-[1120px]:w-[76px] w-[240px]" : "w-[240px]"
        )}
      >
        {/* Floating Edge Toggle Button */}
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
          <Link href="/hr/dashboard" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-9 h-9 rounded-xl bg-brand-teal flex items-center justify-center font-bold text-lg text-white shadow-md shadow-brand-teal/30 shrink-0 group-hover:scale-105 transition-transform">
              H
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-base tracking-wide text-white truncate">
                  Homelio Care
                </span>
                <span className="text-[10px] text-brand-teal font-semibold uppercase tracking-wider -mt-0.5">
                  HR Portal
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full">
          {!isCollapsed && (
            <div className="px-3 text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-2">
              HR & People Operations
            </div>
          )}
          <ul className="space-y-1.5">
            {hrNavItems.map((item) => {
              const isActive = activeItem === item.id;
              const Icon = item.icon;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                      isActive
                        ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20 font-semibold"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                    )}
                  >
                    <Icon className={clsx("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                    {!isCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}

                    {/* Active Pip indicator when collapsed */}
                    {isCollapsed && isActive && (
                      <span className="absolute right-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Card Footer */}
        <div className="p-3 border-t border-sidebar-active/40 relative">
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={clsx(
              "flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 cursor-pointer transition-colors",
              isCollapsed && "justify-center"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-semibold flex items-center justify-center text-sm shrink-0 ring-2 ring-purple-400/30">
              {currentUser?.name ? currentUser.name.split(" ").map(n => n[0]).join("").slice(0, 2) : "SJ"}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{currentUser?.name || "Sarah Jenkins"}</p>
                <p className="text-xs text-slate-400 truncate flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-brand-teal" />
                  {currentUser?.role === "HR" ? "HR Recruiter" : currentUser?.role || "HR Staff"}
                </p>
              </div>
            )}
            {!isCollapsed && (
              <ChevronDown
                className={clsx(
                  "w-4 h-4 text-slate-400 transition-transform duration-200",
                  isProfileOpen && "rotate-180"
                )}
              />
            )}
          </div>

          {/* Profile Dropdown Popup */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={clsx(
                  "absolute bottom-16 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-2 text-sm text-slate-200 z-50 space-y-1",
                  isCollapsed ? "left-14 w-44" : "left-3 right-3"
                )}
              >
                <Link
                  href="/hr/settings"
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-700/60 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profile Settings</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </>
  );
}
