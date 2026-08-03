"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Send,
  ListFilter,
  BarChart3,
  MessageSquare,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  LogOut,
  Building2,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";
import { useAuth } from "@/hooks/useAuth";
import { mockOrganization, mockTeamMembers } from "@/lib/partner/mockData";

const NAV_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, id: "dashboard", href: "/partner" },
  { name: "Submit Referral", icon: Send, id: "submit", href: "/partner/submit" },
  { name: "My Referrals", icon: ListFilter, id: "referrals", href: "/partner/referrals" },
  { name: "Analytics", icon: BarChart3, id: "analytics", href: "/partner/analytics" },
  { name: "Messages", icon: MessageSquare, id: "messages", href: "/partner/messages" },
  { name: "Account Settings", icon: Settings, id: "settings", href: "/partner/settings" },
];

interface PartnerSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function PartnerSidebar({ isOpen = false, onClose }: PartnerSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const { isCollapsed, toggleCollapse } = useSidebarCollapse();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    router.push("/login");
  };

  const activeItem = React.useMemo(() => {
    if (pathname === "/partner/submit") return "submit";
    if (pathname?.startsWith("/partner/referrals")) return "referrals";
    if (pathname?.startsWith("/partner/analytics")) return "analytics";
    if (pathname?.startsWith("/partner/messages")) return "messages";
    if (pathname?.startsWith("/partner/settings")) return "settings";
    if (pathname === "/partner") return "dashboard";
    return "dashboard";
  }, [pathname]);

  const activeMember = mockTeamMembers[0];

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
        {/* Toggle Button */}
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
            "flex items-center h-20 border-b border-sidebar-active/40 transition-all duration-300 relative",
            isCollapsed ? "px-3 justify-center" : "px-5 justify-start"
          )}
        >
          <Link href="/partner" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-9 h-9 rounded-xl bg-brand-teal flex items-center justify-center font-bold text-lg text-white shadow-md shadow-brand-teal/30 shrink-0 group-hover:scale-105 transition-transform">
              H
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate pr-4">
                <span className="font-bold text-base tracking-wide text-white block leading-tight truncate">
                  Homelio Care
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-teal mt-0.5">
                  Partner Portal
                </span>
              </div>
            )}
          </Link>

          {!isCollapsed && (
            <button
              onClick={onClose}
              className="absolute right-4 min-[1120px]:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/80">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.id;
              const Icon = item.icon;

              return (
                <li key={item.id} className="relative group">
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-partner"
                      className="absolute inset-0 bg-brand-teal rounded-xl shadow-md shadow-brand-teal/20"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}

                  <Link
                    href={item.href}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    className={clsx(
                      "relative flex items-center justify-between rounded-xl text-sm font-medium transition-colors z-10",
                      isCollapsed ? "p-3" : "px-3.5 py-2.5",
                      isActive ? "text-white font-semibold" : "text-slate-300 hover:text-white hover:bg-sidebar-active/60"
                    )}
                  >
                    <div className={clsx("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
                      <Icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </div>
                  </Link>

                  {/* Tooltip for Mini View */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-2xl border border-slate-700/80 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 flex items-center gap-2 translate-x-1 group-hover:translate-x-0">
                      <span>{item.name}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-sidebar-active/60 relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={clsx(
              "flex items-center gap-3 w-full hover:bg-sidebar-active p-2 rounded-xl transition-colors text-left cursor-pointer",
              isCollapsed && "justify-center"
            )}
          >
            <div className="w-9 h-9 rounded-full bg-slate-600 shrink-0 overflow-hidden flex items-center justify-center ring-2 ring-brand-teal/40">
              <User className="w-4.5 h-4.5 text-slate-300" />
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium text-white truncate">
                    {activeMember.name}
                  </div>
                  <div className="text-xs text-slate-400 truncate flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3" />
                    {mockOrganization.name}
                  </div>
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
                  "absolute bg-slate-800 border border-slate-700/80 rounded-2xl shadow-xl overflow-hidden z-50 p-1.5",
                  isCollapsed
                    ? "left-full ml-4 bottom-3 w-48"
                    : "bottom-[calc(100%-10px)] left-3 right-3 mb-2"
                )}
              >
                <div className="flex flex-col gap-1">
                  <Link
                    href="/partner/settings"
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-sidebar-active rounded-xl transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Account Settings
                  </Link>
                  <div className="h-px w-full bg-sidebar-active/60 my-0.5" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </>
  );
}
