"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (!pathname) return "Dashboard";
    if (pathname.startsWith("/training")) return "Training (LMS)";
    if (pathname.startsWith("/patients")) return "Patients";
    if (pathname.startsWith("/scheduling")) return "Scheduling";
    if (pathname.startsWith("/evv")) return "EVV Monitoring";
    if (pathname.startsWith("/caregivers")) return "Caregivers & HR";
    if (pathname.startsWith("/billing")) return "Billing & Claims";
    if (pathname.startsWith("/incidents")) return "Incident & Risk";
    if (pathname.startsWith("/compliance")) return "Compliance Tracking";
    if (pathname.startsWith("/qa") || pathname.startsWith("/quality-assurance")) return "Quality Assurance";
    if (pathname.startsWith("/reports")) return "Reports";
    if (pathname.startsWith("/referrals")) return "Referrals & Intake";
    if (pathname.startsWith("/communications")) return "Communications";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/profile")) return "Profile";
    return "Dashboard";
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
        <h1 className="text-lg sm:text-xl font-semibold text-text-primary truncate max-w-[200px] sm:max-w-none">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex-1 flex justify-end min-[1120px]:justify-start min-[1120px]:max-w-[480px] mx-1 sm:mx-4 z-40">
          <GlobalSearch />
        </div>

        <button className="relative p-2 rounded-full bg-white border border-border-subtle text-slate-500 hover:bg-slate-50 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-accent-red rounded-full border-2 border-white animate-pulse" />
        </button>
      </div>
    </header>
  );
}
