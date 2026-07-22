"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  Receipt,
  FileText,
  Heart,
  ChevronDown,
  LogOut,
  Settings,
  Calendar,
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
      { name: "Overview", icon: LayoutDashboard, id: "overview" },
      { name: "Scheduling", icon: Calendar, id: "scheduling" },
      { name: "Care Plan", icon: Heart, id: "care-plan" },
      { name: "Visit History", icon: CalendarDays, id: "visits" },
      { name: "Billing & Payments", icon: Receipt, id: "billing" },
      { name: "Messages", icon: MessageSquare, id: "messages" },
      { name: "Documents", icon: FileText, id: "documents" },
    ],
  },
];

interface PortalSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function PortalSidebar({ isOpen = false, onClose }: PortalSidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse } = useSidebarCollapse();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [activeItem, setActiveItem] = useState(() => {
    if (pathname?.startsWith("/portal/visits")) return "visits";
    if (pathname?.startsWith("/portal/schedule")) return "scheduling";
    if (pathname?.startsWith("/portal/messages")) return "messages";
    if (pathname?.startsWith("/portal/billing")) return "billing";
    if (pathname?.startsWith("/portal/documents")) return "documents";
    if (pathname?.startsWith("/portal/care-plan")) return "care-plan";
    return "overview";
  });

  React.useEffect(() => {
    if (pathname.startsWith("/portal/visits")) setActiveItem("visits");
    else if (pathname.startsWith("/portal/schedule")) setActiveItem("scheduling");
    else if (pathname.startsWith("/portal/messages")) setActiveItem("messages");
    else if (pathname.startsWith("/portal/billing")) setActiveItem("billing");
    else if (pathname.startsWith("/portal/documents")) setActiveItem("documents");
    else if (pathname.startsWith("/portal/care-plan")) setActiveItem("care-plan");
    else setActiveItem("overview");
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
          "bg-sidebar-bg text-white flex flex-col h-screen fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out min-[1120px]:translate-x-0 min-[1120px]:sticky min-[1120px]:top-0 shadow-[4px_0_24px_rgba(0,0,0,0.15)] min-[1120px]:shadow-none select-none",
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
          <Link href="/portal" className="flex items-center gap-3 overflow-hidden group">
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
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/80">
          {navGroups.map((group, index) => (
            <div key={index}>
              {group.label && !isCollapsed && (
                <div className="px-3 text-[11px] font-semibold text-text-secondary tracking-wider uppercase mb-2 truncate">
                  {group.label}
                </div>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeItem === item.id;
                  const Icon = item.icon;

                  let href = "/portal";
                  if (item.id === "scheduling") href = "/portal/schedule";
                  if (item.id === "visits") href = "/portal/visits";
                  if (item.id === "care-plan") href = "/portal/care-plan";
                  if (item.id === "billing") href = "/portal/billing";
                  if (item.id === "messages") href = "/portal/messages";
                  if (item.id === "documents") href = "/portal/documents";

                  return (
                    <li key={item.id} className="relative group">
                      {isActive && (
                        <motion.div
                          layoutId="active-portal-nav"
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

        {/* User Profile */}
        <div className="p-3 border-t border-sidebar-active/60 relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={clsx(
              "flex items-center gap-3 w-full hover:bg-sidebar-active p-2 rounded-xl transition-colors text-left",
              isCollapsed && "justify-center"
            )}
            title={isCollapsed ? "Linda Alvarez (Family Member)" : undefined}
          >
            <div className="w-9 h-9 rounded-full bg-slate-600 shrink-0 overflow-hidden flex items-center justify-center text-sm font-medium ring-2 ring-brand-teal/40">
              L
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium text-white truncate">Linda Alvarez</div>
                  <div className="text-xs text-brand-teal truncate">Family Member</div>
                </div>
                <ChevronDown className={clsx("w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200", isProfileOpen && "rotate-180")} />
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
                    href="/portal/settings"
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
