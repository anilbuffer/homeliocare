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
  LogIn,
  User,
  Settings,
  HelpCircle,
  Calendar
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

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

                  let href = "/portal";
                  if (item.id === "scheduling") href = "/portal/schedule";
                  if (item.id === "visits") href = "/portal/visits";
                  if (item.id === "care-plan") href = "/portal/care-plan";
                  if (item.id === "billing") href = "/portal/billing";
                  if (item.id === "messages") href = "/portal/messages";
                  if (item.id === "documents") href = "/portal/documents";

                  return (
                    <li key={item.id} className="relative">
                      {isActive && (
                        <motion.div
                          layoutId="active-portal-nav"
                          className="absolute inset-0 bg-brand-teal rounded-xl"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
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
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-active relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 w-full hover:bg-sidebar-active p-2 rounded-xl transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-full bg-slate-600 shrink-0 overflow-hidden flex items-center justify-center text-sm font-medium">
              L
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium text-white truncate">Linda Alvarez</div>
              <div className="text-xs text-brand-teal truncate">Family Member</div>
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
                    href="/portal/settings"
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-sidebar-active rounded-lg transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <Link
                    href="/portal/help"
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
