"use client";

import React, { useState } from "react";
import { CaregiverSidebar } from "./CaregiverSidebar";
import { CaregiverTopBar } from "./CaregiverTopBar";
import { OfflineSyncBanner } from "./OfflineSyncBanner";

interface CaregiverLayoutProps {
  children: React.ReactNode;
  isClockedIn?: boolean;
  activeClientName?: string;
  pendingSyncCount?: number;
}

export function CaregiverLayout({
  children,
  isClockedIn = false,
  activeClientName = "Eleanor Vance",
  pendingSyncCount = 0,
}: CaregiverLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [localPendingSync, setLocalPendingSync] = useState(pendingSyncCount);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F6F8]">
      <CaregiverSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <CaregiverTopBar
          onMenuClick={() => setSidebarOpen(true)}
          isClockedIn={isClockedIn}
          activeClientName={activeClientName}
          isOffline={isOffline}
          onToggleOffline={() => setIsOffline(!isOffline)}
          pendingSyncCount={localPendingSync}
        />
        <OfflineSyncBanner
          isOffline={isOffline}
          pendingSyncCount={localPendingSync}
          onSyncCompleted={() => setLocalPendingSync(0)}
        />
        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-5 pb-20 sm:pb-10 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </div>
  );
}
