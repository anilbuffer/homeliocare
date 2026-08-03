"use client";

import React, { useState } from "react";
import { PartnerSidebar } from "@/components/partner/layout/PartnerSidebar";
import { PartnerTopBar } from "@/components/partner/layout/PartnerTopBar";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard allowedRoles={["PARTNER"]}>
      <div className="flex h-screen overflow-hidden bg-page-bg">
        <PartnerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
          <PartnerTopBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto px-3 sm:px-6 pb-15 lg:pb-24 min-[1120px]:pb-6 custom-scrollbar transition-all duration-300 ease-in-out">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
