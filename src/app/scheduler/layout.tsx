"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { SchedulerSidebar } from "@/components/layout/SchedulerSidebar";
import { TopBar } from "@/components/layout/TopBar";

export default function SchedulerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Standalone tab for Caregiver Tracker
  if (pathname === "/scheduler/tracker") {
    return <div className="h-screen w-screen overflow-hidden bg-page-bg font-sans">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-page-bg font-sans">
      <SchedulerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 sm:py-6 pb-15 sm:pb-20 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </div>
  );
}
