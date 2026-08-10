"use client";

import React from "react";
import { CaregiverLayout } from "@/components/caregiver/CaregiverLayout";
import { IncidentsPage } from "@/components/incidents/IncidentsPage";

export default function CaregiverIncidentsPage() {
  return (
    <CaregiverLayout>
      <div className="w-full mx-auto pb-10">
        <IncidentsPage />
      </div>
    </CaregiverLayout>
  );
}
