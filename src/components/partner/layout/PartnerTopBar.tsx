"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { mockOrganization } from "@/lib/partner/mockData";

export function PartnerTopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.startsWith("/partner/submit")) return "Submit Referral";
    if (pathname.startsWith("/partner/referrals")) return "My Referrals";
    if (pathname.startsWith("/partner/analytics")) return "Analytics";
    if (pathname.startsWith("/partner/messages")) return "Messages";
    if (pathname.startsWith("/partner/settings")) return "Account Settings";
    return `Welcome back, ${mockOrganization.name}`;
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
        <h1 suppressHydrationWarning className="text-base sm:text-xl font-bold text-text-primary truncate max-w-[200px] xs:max-w-[250px] sm:max-w-none">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Simple notification bell for the partner portal */}
        <button className="p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#F4F6F8]"></span>
        </button>
      </div>
    </header>
  );
}
