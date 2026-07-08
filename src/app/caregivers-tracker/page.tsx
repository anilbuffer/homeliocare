"use client";

import React, { useState } from "react";
import { IconRail } from "@/components/tracker/IconRail";
import { CaregiverRoster } from "@/components/tracker/CaregiverRoster";
import { LiveMap } from "@/components/tracker/LiveMap";
import { VisitQueue } from "@/components/tracker/VisitQueue";
import { mockCaregivers, mockVisits } from "@/lib/mockTrackerData";

export default function CaregiversTrackerPage() {
  const [caregivers, setCaregivers] = useState(mockCaregivers);
  const [visits, setVisits] = useState(mockVisits);
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New states for drag & drop / hover preview
  const [hoveredCaregiverId, setHoveredCaregiverId] = useState<string | null>(null);
  const [draggedCaregiverId, setDraggedCaregiverId] = useState<string | null>(null);
  const [dragOverVisitId, setDragOverVisitId] = useState<string | null>(null);

  const activeCaregiverId = draggedCaregiverId || hoveredCaregiverId;
  const activeCaregiver = caregivers.find(c => c.id === activeCaregiverId);

  const assignedCaregiverIds = new Set(
    visits.filter(v => v.status === "Assigned" || v.status === "In Progress").map(v => v.caregiverId).filter(Boolean) as string[]
  );

  // When selecting a caregiver, we might optionally want to clear the selected visit, 
  // or keep it if it belongs to them. For simplicity, we just set the new state.
  const handleSelectCaregiver = (id: string | null) => {
    setSelectedCaregiverId(id);
    if (id) {
      // If we select a caregiver, clear the specific visit focus if it doesn't belong to them
      const visit = visits.find(v => v.id === selectedVisitId);
      if (visit && visit.caregiverId !== id) {
        setSelectedVisitId(null);
      }
    }
  };

  const handleSelectVisit = (id: string | null) => {
    setSelectedVisitId(id);
    if (id) {
      // If we select a visit, highlight the assigned caregiver
      const visit = visits.find(v => v.id === id);
      if (visit && visit.caregiverId) {
        setSelectedCaregiverId(visit.caregiverId);
      }
    }
  };

  const handleAssignCaregiver = (caregiverId: string, visitId: string) => {
    const caregiver = caregivers.find(c => c.id === caregiverId);
    const visit = visits.find(v => v.id === visitId);

    if (caregiver && visit) {
      setVisits(prev => prev.map(v => 
        v.id === visitId ? { ...v, status: "Assigned", caregiverId } : v
      ));

      setToastMessage(`${caregiver.name} assigned to ${visit.clientName} — Visit #${visit.id.replace('v-', '4570')}`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-page-bg font-sans relative">
      <IconRail />
      
      <CaregiverRoster 
        caregivers={caregivers} 
        assignedCaregiverIds={assignedCaregiverIds}
        selectedCaregiverId={selectedCaregiverId}
        onSelectCaregiver={handleSelectCaregiver}
        onHoverCaregiver={setHoveredCaregiverId}
        onDragCaregiver={setDraggedCaregiverId}
      />
      
      <LiveMap 
        caregivers={caregivers}
        visits={visits}
        selectedCaregiverId={selectedCaregiverId}
        selectedVisitId={selectedVisitId}
        onSelectCaregiver={handleSelectCaregiver}
        onSelectVisit={handleSelectVisit}
        activeCaregiverId={activeCaregiverId}
        dragOverVisitId={dragOverVisitId}
      />
      
      <VisitQueue 
        visits={visits}
        selectedVisitId={selectedVisitId}
        onSelectVisit={handleSelectVisit}
        onAssign={handleAssignCaregiver}
        activeCaregiver={activeCaregiver}
        onDragOverVisit={setDragOverVisitId}
        caregivers={caregivers}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute bottom-4 right-4 bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
