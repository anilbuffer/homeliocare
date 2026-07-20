"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";

export function PortalTopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (!pathname || pathname === "/portal") return "Overview";
    if (pathname.startsWith("/portal/visits")) return "Visit History";
    if (pathname.startsWith("/portal/messages")) return "Messages";
    if (pathname.startsWith("/portal/billing")) return "Billing & Payments";
    if (pathname.startsWith("/portal/documents")) return "Documents";
    if (pathname.startsWith("/portal/care-plan")) return "Care Plan Summary";
    if (pathname.startsWith("/portal/settings")) return "Account Settings";
    if (pathname.startsWith("/portal/profile")) return "My Profile";
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
        <h1 className="text-lg sm:text-xl font-semibold text-text-primary truncate max-w-[200px] sm:max-w-none">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex flex-col items-end mr-4">
           <span className="text-sm font-medium text-text-primary">Viewing: Robert Alvarez</span>
           <span className="text-xs text-text-secondary">You are his daughter</span>
        </div>
        
        <button className="relative p-2 rounded-full bg-white border border-border-subtle text-slate-500 hover:bg-slate-50 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
