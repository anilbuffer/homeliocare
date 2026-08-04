"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function PortalTopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const isClient = currentUser?.role === "CLIENT";

  const getPageTitle = () => {
    if (!pathname || pathname === "/portal") return "Overview";
    if (pathname.startsWith("/portal/visits")) return isClient ? "My Visits" : "Visit History";
    if (pathname.startsWith("/portal/schedule")) return isClient ? "My Schedule" : "Scheduling";
    if (pathname.startsWith("/portal/messages")) return "Messages";
    if (pathname.startsWith("/portal/billing")) return isClient ? "My Billing" : "Billing & Payments";
    if (pathname.startsWith("/portal/documents")) return isClient ? "My Documents" : "Documents";
    if (pathname.startsWith("/portal/care-plan")) return isClient ? "My Care Plan" : "Care Plan Summary";
    if (pathname.startsWith("/portal/settings")) return "Settings";
    if (pathname.startsWith("/training-admin/settings")) return "Settings";
    if (pathname.startsWith("/training-admin/compliance")) return "Compliance Tracking";
    if (pathname.startsWith("/training-admin/courses")) return "Course Management";
    if (pathname.startsWith("/training-admin/quizzes")) return "Quiz Management";
    if (pathname.startsWith("/training-admin/messages")) return "Messages";
    if (pathname === "/training-admin" || pathname.startsWith("/training-admin/dashboard")) return "Training Center Dashboard";
    return "Overview";
  };

  return (
    <header className="h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between bg-page-bg/80 backdrop-blur-md sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-200 min-[1120px]:hidden transition-colors active:scale-95"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <h1 suppressHydrationWarning className="text-lg sm:text-xl font-semibold text-text-primary truncate max-w-[200px] sm:max-w-none">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {currentUser?.role === "FAMILY" && (
          <button className="hidden sm:flex flex-col items-end mr-4 hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-slate-200">
             <span className="text-sm font-medium text-text-primary flex items-center gap-1.5">
               Viewing: Robert Alvarez
               <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-teal transition-colors" />
             </span>
             <span className="text-xs text-text-secondary mr-5">You are his daughter</span>
          </button>
        )}
        
        <button className="relative p-2 rounded-full bg-white border border-border-subtle text-slate-500 hover:bg-slate-50 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
