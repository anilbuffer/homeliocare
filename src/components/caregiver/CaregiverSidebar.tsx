"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  GraduationCap,
  User,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Settings,
  HeartHandshake,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/Avatar";
import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";

const caregiverNavItems = [
  { name: "Today", icon: LayoutDashboard, href: "/caregiver", id: "today" },
  { name: "Schedule", icon: CalendarDays, href: "/caregiver/schedule", id: "schedule" },
  { name: "Messages", icon: MessageSquare, href: "/caregiver/messages", id: "messages", badge: 1 },
  { name: "Training", icon: GraduationCap, href: "/caregiver/training", id: "training", badge: 1 },
  { name: "Profile", icon: User, href: "/caregiver/profile", id: "profile" },
];

interface CaregiverSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function CaregiverSidebar({ isOpen = false, onClose }: CaregiverSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const { isCollapsed, toggleCollapse } = useSidebarCollapse();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showHipaaTooltip, setShowHipaaTooltip] = useState(false);

  const activeItem = React.useMemo(() => {
    if (pathname === "/caregiver/schedule" || pathname?.startsWith("/caregiver/schedule")) return "schedule";
    if (pathname === "/caregiver/messages" || pathname?.startsWith("/caregiver/messages")) return "messages";
    if (pathname === "/caregiver/training" || pathname?.startsWith("/caregiver/training")) return "training";
    if (pathname === "/caregiver/profile" || pathname?.startsWith("/caregiver/profile")) return "profile";
    return "today";
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

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
          <Link href="/caregiver" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-9 h-9 rounded-xl bg-brand-teal flex items-center justify-center font-bold text-lg text-white shadow-md shadow-brand-teal/30 shrink-0 group-hover:scale-105 transition-transform">
              H
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="truncate"
              >
                <span className="font-bold text-base tracking-wide text-white block leading-tight truncate">
                  Homelio Care
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-brand-teal flex items-center gap-1 mt-0.5">
                  <HeartHandshake className="w-3 h-3 inline" /> Caregiver Portal
                </span>
              </motion.div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/80">
          {!isCollapsed && (
            <div className="px-3 text-[11px] font-semibold text-text-secondary tracking-wider uppercase mb-3 truncate">
              Caregiver Navigation
            </div>
          )}

          <ul className="space-y-1.5">
            {caregiverNavItems.map((item) => {
              const isActive = activeItem === item.id;
              const Icon = item.icon;

              return (
                <li key={item.id} className="relative group">
                  {isActive && (
                    <motion.div
                      layoutId="active-caregiver-nav"
                      className="absolute inset-0 bg-brand-teal rounded-xl shadow-md shadow-brand-teal/25"
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
                      "relative flex items-center rounded-xl text-sm font-medium transition-colors z-10",
                      isCollapsed
                        ? "justify-center p-3"
                        : "justify-between px-3.5 py-3",
                      isActive ? "text-white font-semibold" : "text-slate-300 hover:text-white hover:bg-sidebar-active/60"
                    )}
                  >
                    <div className={clsx("flex items-center gap-3", isCollapsed && "justify-center")}>
                      <Icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </div>

                    {/* Badge */}
                    {item.badge && item.badge > 0 && (
                      <span
                        className={clsx(
                          "flex items-center justify-center font-bold rounded-full transition-colors",
                          isCollapsed
                            ? "absolute -top-1 -right-1 w-5 h-5 text-[10px] bg-brand-teal text-white ring-2 ring-sidebar-bg"
                            : "px-2 py-0.5 text-xs",
                          !isCollapsed && (isActive
                            ? "bg-white text-brand-teal"
                            : "bg-brand-teal/20 text-brand-teal border border-brand-teal/30")
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {/* Tooltip for Mini Sidebar View */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-2xl border border-slate-700/80 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 flex items-center gap-2 translate-x-1 group-hover:translate-x-0">
                      <span>{item.name}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="bg-brand-teal text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
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

              {/* Tooltip popover for mini mode */}
              <AnimatePresence>
                {showHipaaTooltip && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-full ml-4 bottom-0 w-60 bg-slate-900 border border-slate-700 p-3.5 rounded-xl shadow-2xl z-50 text-left pointer-events-none"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                      <ShieldCheck className="w-4 h-4 text-brand-teal" />
                      EVV & HIPAA Compliant
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      GPS timestamps encrypted & automatically logged to state Matrix.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-[#0e354a] rounded-xl p-3.5 flex items-start gap-3 border border-sidebar-active">
              <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-white">EVV & HIPAA Compliant</div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                  GPS timestamps encrypted & logged to state matrix.
                </div>
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
            title={isCollapsed ? currentUser?.name || "Maria Santos" : undefined}
          >
            <Avatar
              src={currentUser?.avatarUrl}
              name={currentUser?.name || "Maria Santos"}
              size="sm"
              className="w-9 h-9 shrink-0 ring-2 ring-brand-teal/40"
            />
            {!isCollapsed && (
              <>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-semibold text-white truncate">
                    {currentUser?.name || "Maria Santos, CNA"}
                  </div>
                  <div className="text-xs text-slate-400 truncate">Caregiver (Field Staff)</div>
                </div>
                <ChevronDown
                  className={clsx(
                    "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200",
                    isProfileOpen && "rotate-180"
                  )}
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
                    href="/caregiver/settings"
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-sidebar-active rounded-xl transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Account Settings
                  </Link>
                  <div className="h-px w-full bg-sidebar-active/60 my-0.5"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
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
