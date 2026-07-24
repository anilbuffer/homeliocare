"use client";

import React, { useState } from "react";
import { HrSidebar } from "@/components/layout/HrSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function HrLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard allowedRoles={["HR", "ADMIN"]}>
      <div className="flex h-screen overflow-hidden bg-page-bg font-sans">
        <HrSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 pb-20 min-[1120px]:pb-6 custom-scrollbar transition-all duration-300 ease-in-out">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

