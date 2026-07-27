"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { IntakeKpiStrip } from "@/components/intake/IntakeKpiStrip";
import { IntakeUrgencyQueue } from "@/components/intake/IntakeUrgencyQueue";
import { AssessmentBookingWidget } from "@/components/intake/AssessmentBookingWidget";
import { PipelineSnapshot } from "@/components/intake/PipelineSnapshot";
import { FollowUpQueue } from "@/components/intake/FollowUpQueue";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { NewPatientModal } from "@/components/patients/NewPatientModal";

export default function IntakeDashboard() {
  const { currentUser } = useAuth();
  const [greeting, setGreeting] = useState("Good morning");
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <div className="max-w-full mx-auto space-y-6">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {greeting}, {currentUser?.name?.split(" ")[0] || "Coordinator"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            <span className="font-semibold text-brand-teal">4 new inquiries</span> need first contact, <span className="font-semibold text-accent-blue">8 assessments</span> scheduled today.
          </p>
        </div>

        <button 
          onClick={() => setIsNewPatientModalOpen(true)}
          className="flex items-center gap-2 bg-brand-teal hover:bg-brand-teal/90 text-white px-4 py-2 rounded-full font-bold text-sm shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-brand-teal/20 transition-all active:scale-95 cursor-pointer">
          <Plus className="w-4 h-4" />
          Log New Inquiry
        </button>
      </div>

      {/* Row 1: KPI Strip */}
      <IntakeKpiStrip />

      {/* Row 2 & 3: Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column (Urgency Queue dominates) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="h-[400px]">
            <IntakeUrgencyQueue />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[350px]">
              <PipelineSnapshot />
            </div>
            <div className="h-[350px]">
              <FollowUpQueue />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="h-[400px]">
            <AssessmentBookingWidget />
          </div>
        </div>

      </div>
      
      <NewPatientModal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
      />
    </div>
  );
}
