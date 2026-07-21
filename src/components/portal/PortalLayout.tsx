"use client";

import React, { useState } from "react";
import { PortalSidebar } from "./PortalSidebar";
import { PortalTopBar } from "./PortalTopBar";
import { FeedbackFAB } from "./FeedbackFAB";
export function PortalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-page-bg">
      <PortalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <PortalTopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 sm:px-4 lg:px-6 py-4 sm:py-4 pb-20 sm:pb-10 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
      <FeedbackFAB />
    </div>
  );
}
