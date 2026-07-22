import React from "react";
import { CommunicationsLayout } from "@/components/communications/CommunicationsLayout";
import { MessageSquare } from "lucide-react";

export default function CommunicationsPage() {
  return (
    <div className="w-full mx-auto space-y-6 flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 lg:mb-4 shrink-0">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Communications</h2>
          <p className="text-xs text-text-secondary mt-1">Unified messaging across your agency</p>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex-1 min-h-0">
        <CommunicationsLayout />
      </div>
    </div>
  );
}
