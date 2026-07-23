"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, CheckCircle2, AlertTriangle, ShieldCheck, MapPin } from "lucide-react";
import { SchedulerKpiStrip } from "@/components/scheduler/SchedulerKpiStrip";
import { UnfilledShiftsQueue, type UnfilledShiftItem } from "@/components/scheduler/UnfilledShiftsQueue";
import { CallOffQueue } from "@/components/scheduler/CallOffQueue";
import { CompactCoverageMap } from "@/components/scheduler/CompactCoverageMap";
import { WeekAtAGlance } from "@/components/scheduler/WeekAtAGlance";
import { CreateShiftModal } from "@/components/scheduling/CreateShiftModal";
import { mockShifts, mockCaregivers, type Shift } from "@/lib/scheduling/mockData";

const defaultUnfilledShifts: UnfilledShiftItem[] = [
  {
    id: "s1",
    patientName: "Mabel Ortiz",
    patientAddress: "1201 Grand St, Queens",
    timeWindow: "10:00 AM - 2:00 PM",
    requiredSkills: ["HHA", "Hoyer Lift"],
    unfilledDuration: "2.5 hrs",
    region: "Queens",
    suggestedCaregivers: [
      {
        id: "c3",
        name: "Maria Alvarez",
        rating: 4.9,
        distanceMiles: 1.8,
        matchingSkills: ["HHA", "Dementia"],
      },
      {
        id: "c1",
        name: "Mabel Ortiz",
        rating: 4.8,
        distanceMiles: 2.1,
        matchingSkills: ["HHA", "Hoyer"],
      },
      {
        id: "c7",
        name: "Aisha Nguyen",
        rating: 4.8,
        distanceMiles: 2.5,
        matchingSkills: ["HHA", "Dementia"],
      },
    ],
  },
  {
    id: "s2",
    patientName: "George Patel",
    patientAddress: "331 Wyckoff Ave, Brooklyn",
    timeWindow: "3:00 PM - 7:00 PM",
    requiredSkills: ["CNA"],
    unfilledDuration: "1.2 hrs",
    region: "Brooklyn",
    suggestedCaregivers: [
      {
        id: "c2",
        name: "George Patel",
        rating: 4.5,
        distanceMiles: 1.5,
        matchingSkills: ["CNA"],
      },
      {
        id: "c8",
        name: "Robert Chen",
        rating: 4.7,
        distanceMiles: 1.9,
        matchingSkills: ["CNA"],
      },
    ],
  },
  {
    id: "s9",
    patientName: "Betty Cooper",
    patientAddress: "23 River Rd, Bronx",
    timeWindow: "4:00 PM - 8:00 PM",
    requiredSkills: ["CNA", "Diabetes"],
    unfilledDuration: "45 mins",
    region: "Bronx",
    suggestedCaregivers: [
      {
        id: "c10",
        name: "Harold Simmons",
        rating: 4.6,
        distanceMiles: 2.2,
        matchingSkills: ["CNA", "Diabetes"],
      },
      {
        id: "c4",
        name: "James Okafor",
        rating: 4.7,
        distanceMiles: 4.2,
        matchingSkills: ["CNA", "Diabetes"],
      },
    ],
  },
];

export default function SchedulerDashboardPage() {
  const [unfilledShifts, setUnfilledShifts] = useState<UnfilledShiftItem[]>(defaultUnfilledShifts);
  const [confirmedCount, setConfirmedCount] = useState(18);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAssignUnfilledShift = (shiftId: string, caregiverId: string, caregiverName: string) => {
    const assignedShift = unfilledShifts.find((s) => s.id === shiftId);
    if (assignedShift) {
      setConfirmedCount((prev) => prev + 1);
      showToast(`Success: ${caregiverName} assigned to ${assignedShift.patientName} (${assignedShift.timeWindow})`);
    }
  };

  const handleReassignCallOff = (callOffId: string, replacementId: string, replacementName: string) => {
    showToast(`Call-off resolved: ${replacementName} assigned to replacement shift!`);
  };

  const handleCreateShift = (newShift: Shift) => {
    // Add to unfilled shifts queue
    const newUnfilledItem: UnfilledShiftItem = {
      id: newShift.id,
      patientName: newShift.patientName,
      patientAddress: newShift.patientAddress,
      timeWindow: `${newShift.startTime.slice(11, 16)} - ${newShift.endTime.slice(11, 16)}`,
      requiredSkills: newShift.requiredSkills,
      unfilledDuration: "Just created",
      region: newShift.region || "General",
      suggestedCaregivers: [
        { id: "c3", name: "Maria Alvarez", rating: 4.9, distanceMiles: 1.8, matchingSkills: ["HHA", "Dementia"] },
        { id: "c8", name: "Robert Chen", rating: 4.7, distanceMiles: 2.1, matchingSkills: ["CNA"] },
      ],
    };

    setUnfilledShifts((prev) => [newUnfilledItem, ...prev]);
    showToast(`New shift created for ${newShift.patientName} (#${newShift.shiftNumber})`);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto animate-in fade-in duration-500 relative">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good morning, Alex 👋
            </h1>
            <span className="bg-brand-teal/10 text-brand-teal text-xs font-bold px-2.5 py-1 rounded-full border border-brand-teal/20 shrink-0">
              Scheduler On Duty
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-1.5 leading-normal">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span>
              <strong className="text-slate-800">{unfilledShifts.length} shifts</strong> need coverage today. Lead priority is urgent dispatch.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 xs:flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <Link
            href="/scheduler/tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 min-h-[44px] rounded-full bg-white hover:bg-teal-50/50 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 :shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:border-brand-teal/40 transition-all cursor-pointer text-center"
          >
            <div className="w-5 h-5 rounded-full bg-teal-50 border border-brand-teal/30 flex items-center justify-center text-brand-teal shrink-0">
              <MapPin className="w-3 h-3" />
            </div>
            <span className="truncate">Track Caregivers</span>
          </Link>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 min-h-[44px] rounded-full bg-brand-teal hover:bg-teal-600 text-white font-bold text-xs sm:text-sm :shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-brand-teal/25 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5] shrink-0" />
            <span className="truncate">Create Shift</span>
          </button>
        </div>
      </div>

      {/* Row 1 — Urgency-First KPI Strip */}
      <SchedulerKpiStrip
        unfilledCount={unfilledShifts.length}
        fillingSoonCount={2}
        callOffsCount={1}
        confirmedCount={confirmedCount}
        avgFillTimeMins={24}
        availabilityGapsCount={5}
      />

      {/* Row 2 — Today's Unfilled/At-Risk Shifts (Action Queue) */}
      <UnfilledShiftsQueue shifts={unfilledShifts} onAssign={handleAssignUnfilledShift} />

      {/* Row 3 — Call-Off Queue */}
      <CallOffQueue onReassign={handleReassignCallOff} />

      {/* Row 4 — Live Coverage Map Embed */}
      <CompactCoverageMap />

      {/* Row 5 — This Week at a Glance */}
      <WeekAtAGlance />

      {/* Create Shift Modal */}
      <CreateShiftModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateShift}
      />

      {/* Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-sm font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-2.5 z-50 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
