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
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/Avatar";

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
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
          "w-[240px] flex-shrink-0 bg-sidebar-bg text-white flex flex-col h-screen fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out min-[1120px]:translate-x-0 min-[1120px]:sticky shadow-[4px_0_24px_rgba(0,0,0,0.15)] min-[1120px]:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Area */}
        <div className="flex items-center gap-3 px-6 py-4 h-20 border-b border-sidebar-active/40">
          <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center font-bold text-lg text-white shadow-md shadow-brand-teal/30">
            H
          </div>
          <div>
            <span className="font-semibold text-lg tracking-wide text-white block leading-tight">Homelio Care</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-brand-teal flex items-center gap-1 mt-0.5">
              <HeartHandshake className="w-3 h-3 inline" /> Caregiver Portal
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/80">
          <div className="px-3 text-[11px] font-semibold text-text-secondary tracking-wider uppercase mb-3">
            Caregiver Navigation
          </div>

          <ul className="space-y-1.5">
            {caregiverNavItems.map((item) => {
              const isActive = activeItem === item.id;
              const Icon = item.icon;

              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="active-caregiver-nav"
                      className="absolute inset-0 bg-brand-teal rounded-xl shadow-md shadow-brand-teal/20"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    className={clsx(
                      "relative flex items-center justify-between w-full px-3.5 py-3 rounded-xl text-sm font-medium transition-colors z-10",
                      isActive ? "text-white" : "text-slate-300 hover:text-white hover:bg-sidebar-active"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4.5 h-4.5 shrink-0" />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && item.badge > 0 && (
                      <span
                        className={clsx(
                          "px-2 py-0.5 text-xs font-bold rounded-full transition-colors",
                          isActive
                            ? "bg-white text-brand-teal"
                            : "bg-brand-teal/20 text-brand-teal border border-brand-teal/30"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* HIPAA Card */}
        <div className="px-4 mb-3">
          <div className="bg-[#0e354a] rounded-xl p-3.5 flex items-start gap-3 border border-sidebar-active">
            <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">EVV & HIPAA Compliant</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">GPS timestamps encrypted & logged to state matrix.</div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-active relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 w-full hover:bg-sidebar-active p-2 rounded-xl transition-colors text-left"
          >
            <Avatar
              src={currentUser?.avatarUrl}
              name={currentUser?.name || "Maria Santos"}
              size="sm"
              className="w-9 h-9"
            />
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
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-[calc(100%-10px)] left-4 right-4 mb-2 bg-slate-800 border border-sidebar-active rounded-xl shadow-2xl overflow-hidden z-50 p-1.5"
              >
                <div className="flex flex-col gap-1">
                  <Link
                    href="/caregiver/settings"
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-sidebar-active rounded-lg transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Account Settings
                  </Link>
                  <div className="h-px w-full bg-sidebar-active my-0.5"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors text-left"
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
