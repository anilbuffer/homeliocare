"use client";

import React, { useState } from "react";
import { IconRail } from "@/components/tracker/IconRail";
import { CaregiverRoster } from "@/components/tracker/CaregiverRoster";
import { LiveMap } from "@/components/tracker/LiveMap";
import { VisitQueue } from "@/components/tracker/VisitQueue";
import { mockCaregivers, mockVisits } from "@/lib/mockTrackerData";

export default function CaregiversTrackerPage() {
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);

  // When selecting a caregiver, we might optionally want to clear the selected visit, 
  // or keep it if it belongs to them. For simplicity, we just set the new state.
  const handleSelectCaregiver = (id: string | null) => {
    setSelectedCaregiverId(id);
    if (id) {
      // If we select a caregiver, clear the specific visit focus if it doesn't belong to them
      const visit = mockVisits.find(v => v.id === selectedVisitId);
      if (visit && visit.caregiverId !== id) {
        setSelectedVisitId(null);
      }
    }
  };

  const handleSelectVisit = (id: string | null) => {
    setSelectedVisitId(id);
    if (id) {
      // If we select a visit, highlight the assigned caregiver
      const visit = mockVisits.find(v => v.id === id);
      if (visit && visit.caregiverId) {
        setSelectedCaregiverId(visit.caregiverId);
      }
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-page-bg font-sans">
      <IconRail />
      
      <CaregiverRoster 
        caregivers={mockCaregivers} 
        selectedCaregiverId={selectedCaregiverId}
        onSelectCaregiver={handleSelectCaregiver}
      />
      
      <LiveMap 
        caregivers={mockCaregivers}
        visits={mockVisits}
        selectedCaregiverId={selectedCaregiverId}
        selectedVisitId={selectedVisitId}
        onSelectCaregiver={handleSelectCaregiver}
        onSelectVisit={handleSelectVisit}
      />
      
      <VisitQueue 
        visits={mockVisits}
        selectedVisitId={selectedVisitId}
        onSelectVisit={handleSelectVisit}
      />
    </div>
  );
}
