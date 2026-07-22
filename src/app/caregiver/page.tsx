"use client";

import React, { useState } from "react";
import { CaregiverLayout } from "@/components/caregiver/CaregiverLayout";
import { ClockInOutCard } from "@/components/caregiver/ClockInOutCard";
import { TodayVisitsPanel } from "@/components/caregiver/TodayVisitsPanel";
import { VisitTaskChecklist } from "@/components/caregiver/VisitTaskChecklist";
import { EndVisitModal } from "@/components/caregiver/EndVisitModal";
import { INITIAL_VISITS, Visit } from "@/lib/caregiver/caregiverPortalData";
import { AlertCircle, Calendar, Clock, Sparkles } from "lucide-react";

export default function CaregiverTodayPage() {
  const [visits, setVisits] = useState<Visit[]>(INITIAL_VISITS);
  const [activeVisitId, setActiveVisitId] = useState<string>("visit-101");
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [showEndModal, setShowEndModal] = useState<boolean>(false);

  const activeVisit = visits.find((v) => v.id === activeVisitId) || visits[0];

  // Handle Clock In
  const handleClockIn = (method: "gps" | "ivr" | "fvv", reason?: string) => {
    setIsClockedIn(true);
    setVisits((prev) =>
      prev.map((v) =>
        v.id === activeVisitId
          ? {
            ...v,
            status: "In Progress",
            clockInTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            clockInMethod: method,
            clockInReason: reason,
          }
          : v
      )
    );
  };

  // Handle Task Checkbox Toggle
  const handleToggleTask = (taskId: string) => {
    setVisits((prev) =>
      prev.map((v) =>
        v.id === activeVisitId
          ? {
            ...v,
            tasks: v.tasks.map((t) =>
              t.id === taskId
                ? {
                  ...t,
                  completed: !t.completed,
                  completedAt: !t.completed ? new Date().toLocaleTimeString() : undefined,
                  skipped: false,
                }
                : t
            ),
          }
          : v
      )
    );
  };

  // Handle Skip Task Reason
  const handleSkipTaskReason = (taskId: string, reason: string) => {
    setVisits((prev) =>
      prev.map((v) =>
        v.id === activeVisitId
          ? {
            ...v,
            tasks: v.tasks.map((t) =>
              t.id === taskId
                ? {
                  ...t,
                  completed: false,
                  skipped: true,
                  skipReason: reason,
                }
                : t
            ),
          }
          : v
      )
    );
  };

  // Handle Medication Logging
  const handleLogMedication = (
    medId: string,
    status: "reminded" | "took" | "declined" | "pending"
  ) => {
    setVisits((prev) =>
      prev.map((v) =>
        v.id === activeVisitId
          ? {
            ...v,
            medications: v.medications.map((m) =>
              m.id === medId ? { ...m, status, loggedAt: new Date().toLocaleTimeString() } : m
            ),
          }
          : v
      )
    );
  };

  // Handle End of Visit Completion
  const handleCompleteVisit = (data: {
    notes: string;
    signatureUrl?: string;
    unableToSignReason?: string;
    photos: any[];
    mileage: number;
  }) => {
    setIsClockedIn(false);
    setShowEndModal(false);
    setVisits((prev) =>
      prev.map((v) =>
        v.id === activeVisitId
          ? {
            ...v,
            status: "Completed",
            clockOutTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            visitNotes: data.notes,
            signatureUrl: data.signatureUrl,
            unableToSignReason: data.unableToSignReason,
            photos: data.photos,
            mileageRecorded: data.mileage,
          }
          : v
      )
    );
  };

  return (
    <CaregiverLayout
      isClockedIn={isClockedIn}
      activeClientName={activeVisit.clientName}
      pendingSyncCount={isClockedIn ? 2 : 0}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300">
          <div>
            <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Caregiver Today Dashboard
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Welcome back, Maria!</h1>
            <p className="text-xs text-gray-500 mt-1">
              You have 3 visits scheduled today in Springfield North Zone. All client care plans synced.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 bg-slate-100 rounded-xl border border-slate-200 text-xs">
              <span className="text-gray-400 font-medium block">Today&apos;s Date</span>
              <span className="font-bold text-gray-800 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-brand-teal" /> Wednesday, Jul 22, 2026
              </span>
            </div>
          </div>
        </div>

        {/* Desktop 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Primary Column (Left/Center - 7 Cols on Desktop) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Clock-In / Clock-Out Card */}
            <ClockInOutCard
              visit={activeVisit}
              isClockedIn={isClockedIn}
              onClockIn={handleClockIn}
              onClockOutClick={() => setShowEndModal(true)}
            />

            {/* Visit Task Checklist */}
            <VisitTaskChecklist
              clientName={activeVisit.clientName}
              tasks={activeVisit.tasks}
              medications={activeVisit.medications}
              onToggleTask={handleToggleTask}
              onSkipTaskReason={handleSkipTaskReason}
              onLogMedication={handleLogMedication}
            />
          </div>

          {/* Secondary Side Panel (Right - 4 Cols on Desktop) */}
          <div className="lg:col-span-4 space-y-6 sticky top-20">
            <TodayVisitsPanel
              visits={visits}
              activeVisitId={activeVisitId}
              onSelectVisit={(id) => setActiveVisitId(id)}
            />
          </div>
        </div>
      </div>

      {/* End of Visit Multi-step Modal */}
      <EndVisitModal
        isOpen={showEndModal}
        visit={activeVisit}
        onClose={() => setShowEndModal(false)}
        onComplete={handleCompleteVisit}
      />
    </CaregiverLayout>
  );
}
