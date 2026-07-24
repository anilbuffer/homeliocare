"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";
import { NotificationsCenter } from "./NotificationsCenter";

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.startsWith("/hr/recruiting")) return "HR Recruiting & Onboarding";
    if (pathname.startsWith("/hr/caregivers")) return "HR Caregiver Roster";
    if (pathname.startsWith("/hr/training")) return "HR Training & LMS";
    if (pathname.startsWith("/hr/payroll")) return "HR Payroll";
    if (pathname.startsWith("/hr/messages")) return "HR Messages";
    if (pathname.startsWith("/hr/dashboard") || pathname === "/hr") return "HR Dashboard";
    if (pathname.startsWith("/users")) return "User Management";
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
    if (pathname.startsWith("/payroll")) return "Payroll";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/profile")) return "Profile";
    return "Dashboard";
  };

  return (
    <header className="h-16 sm:h-20 px-3 sm:px-6 flex items-center justify-between bg-page-bg/90 backdrop-blur-md sticky top-0 z-30 transition-all duration-300 border-b border-slate-200/50">
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-1 rounded-xl text-slate-600 hover:bg-slate-200/70 min-[1120px]:hidden transition-colors active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <h1 suppressHydrationWarning className="text-base sm:text-xl font-bold text-text-primary truncate max-w-[120px] xs:max-w-[180px] sm:max-w-none">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex-1 flex justify-end min-[1120px]:justify-start min-[1120px]:max-w-[480px] mx-1 sm:mx-4 z-40">
          <GlobalSearch />
        </div>

        <NotificationsCenter />
      </div>
    </header>
  );
}
