"use client";

import React, { useState } from "react";
import { Header } from "@/components/scheduling/Header";
import { FilterBar, type LayoutMode } from "@/components/scheduling/FilterBar";
import { UrgencyStrip } from "@/components/scheduling/UrgencyStrip";
import { CalendarView } from "@/components/scheduling/CalendarView";
import { BoardView } from "@/components/scheduling/BoardView";
import { ShiftModal } from "@/components/scheduling/ShiftModal";
import { CreateShiftModal } from "@/components/scheduling/CreateShiftModal";
import {
  mockShifts,
  mockCaregivers,
  type Shift,
  type ShiftStatus,
} from "@/lib/scheduling/mockData";

export default function SchedulerBoardPage() {
  const [viewMode, setViewMode] = useState<"Day" | "Week" | "Month">("Day");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("Calendar");
  const [activeFilter, setActiveFilter] = useState("All Shifts");

  const [caregiverFilter, setCaregiverFilter] = useState("");
  const [patientFilter, setPatientFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openShiftsCount = shifts.filter((s) => s.status === "Unfilled").length;

  const handleShiftStatusChange = (shiftId: string, newStatus: ShiftStatus) => {
    setShifts((prev) =>
      prev.map((shift) => {
        if (shift.id === shiftId) {
          if (newStatus === "Unfilled") {
            return { ...shift, status: newStatus, assignedCaregiverId: null, assignedCaregiverName: undefined };
          }
          return { ...shift, status: newStatus };
        }
        return shift;
      })
    );
  };

  const handleAssignCaregiver = (shiftId: string, caregiverId: string) => {
    const cg = mockCaregivers.find((c) => c.id === caregiverId);
    if (!cg) return;

    setShifts((prev) =>
      prev.map((shift) =>
        shift.id === shiftId
          ? {
              ...shift,
              status: "Pending Confirmation",
              assignedCaregiverId: caregiverId,
              assignedCaregiverName: cg.name,
            }
          : shift
      )
    );
  };

  const handleCallOff = (shiftId: string) => {
    handleShiftStatusChange(shiftId, "Unfilled");
  };

  const selectedShift = shifts.find((s) => s.id === selectedShiftId) || null;
  const suggestedCaregivers = [...mockCaregivers].sort((a, b) => b.rating - a.rating).slice(0, 3);

  const filteredShifts = shifts.filter((s) => {
    if (activeFilter === "Call-Offs") {
      if (s.status !== "Call-Off") return false;
    } else if (activeFilter !== "All Shifts") {
      if (s.status !== activeFilter) return false;
    }

    if (caregiverFilter && s.assignedCaregiverName !== caregiverFilter) return false;
    if (patientFilter && s.patientName !== patientFilter) return false;
    if (regionFilter && s.region !== regionFilter) return false;

    return true;
  });

  const uniqueCaregivers = Array.from(new Set(shifts.map((s) => s.assignedCaregiverName).filter(Boolean))) as string[];
  const uniquePatients = Array.from(new Set(shifts.map((s) => s.patientName).filter(Boolean)));
  const uniqueRegions = Array.from(new Set(shifts.map((s) => s.region).filter(Boolean)));

  return (
    <div className="w-full h-full animate-in fade-in duration-500">
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        openShiftsCount={openShiftsCount}
        onCreateShift={() => setIsCreateModalOpen(true)}
      />

      <UrgencyStrip />

      <FilterBar
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        caregiverFilter={caregiverFilter}
        setCaregiverFilter={setCaregiverFilter}
        patientFilter={patientFilter}
        setPatientFilter={setPatientFilter}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
        uniqueCaregivers={uniqueCaregivers}
        uniquePatients={uniquePatients}
        uniqueRegions={uniqueRegions}
      />

      <div className="mt-4">
        {layoutMode === "Calendar" ? (
          <CalendarView
            viewMode={viewMode}
            shifts={filteredShifts}
            caregivers={mockCaregivers}
            onShiftClick={(shift) => setSelectedShiftId(shift.id)}
          />
        ) : (
          <BoardView
            shifts={filteredShifts}
            onShiftClick={(shift) => setSelectedShiftId(shift.id)}
            onShiftStatusChange={handleShiftStatusChange}
          />
        )}
      </div>

      <ShiftModal
        shift={selectedShift}
        isOpen={!!selectedShift}
        onClose={() => setSelectedShiftId(null)}
        suggestedCaregivers={suggestedCaregivers}
        onAssignCaregiver={handleAssignCaregiver}
        onCallOff={handleCallOff}
      />

      <CreateShiftModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(newShift) => setShifts((prev) => [...prev, newShift])}
      />
    </div>
  );
}
