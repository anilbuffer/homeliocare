"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (!pathname) return "Dashboard";
    if (pathname.startsWith("/training")) return "Training (LMS)";
    if (pathname.startsWith("/clients")) return "Clients";
    if (pathname.startsWith("/scheduling")) return "Scheduling";
    if (pathname.startsWith("/evv")) return "EVV Monitoring";
    if (pathname.startsWith("/caregivers")) return "Caregivers & HR";
    if (pathname.startsWith("/billing")) return "Billing & Claims";
    if (pathname.startsWith("/incidents")) return "Incident & Risk";
    if (pathname.startsWith("/compliance")) return "Compliance Tracking";
    if (pathname.startsWith("/qa")) return "Quality Assurance";
    if (pathname.startsWith("/reports")) return "Reports";
    if (pathname.startsWith("/referrals")) return "Referrals & Intake";
    if (pathname.startsWith("/communications")) return "Communications";
    if (pathname.startsWith("/settings")) return "Settings";
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
        <div className="relative hidden min-[1120px]:block group">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
          <input
            type="text"
            placeholder="Search patients, caregivers..."
            className="w-[200px] min-[1120px]:w-[280px] h-10 pl-10 pr-4 bg-white border border-border-subtle rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal transition-all duration-300 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow"
          />
        </div>

        {/* Mobile Search Icon */}
        <button className="min-[1120px]:hidden p-2 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
          <Search className="w-5 h-5" />
        </button>

        <button className="relative p-2 rounded-full bg-white border border-border-subtle text-slate-500 hover:bg-slate-50 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-accent-red rounded-full border-2 border-white animate-pulse" />
        </button>
      </div>
    </header>
  );
}
