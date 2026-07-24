"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { SchedulerSidebar } from "@/components/layout/SchedulerSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function SchedulerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Standalone tab for Caregiver Tracker
  if (pathname === "/scheduler/tracker") {
    return (
      <AuthGuard allowedRoles={["SCHEDULER", "ADMIN"]}>
        <div className="h-screen w-screen overflow-hidden bg-page-bg font-sans">{children}</div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard allowedRoles={["SCHEDULER", "ADMIN"]}>
      <div className="flex h-screen overflow-hidden bg-page-bg font-sans">
        <SchedulerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 sm:py-6 pb-10 sm:pb-15 transition-all duration-300 ease-in-out">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

