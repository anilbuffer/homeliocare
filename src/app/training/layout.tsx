import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-page-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
}
