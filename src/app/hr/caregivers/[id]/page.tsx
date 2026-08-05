import React from "react";
import { mockCaregivers, Caregiver } from "@/lib/caregivers/mockData";
import { CaregiverProfileClient } from "@/components/caregivers/CaregiverProfileClient";

export default async function HrCaregiverProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const targetId = resolvedParams.id;

  let caregiver: Caregiver | undefined = mockCaregivers[targetId];

  if (!caregiver) {
    const matchedKey = Object.keys(mockCaregivers).find(
      (key) => key.toLowerCase() === targetId.toLowerCase()
    );
    if (matchedKey) {
      caregiver = mockCaregivers[matchedKey];
    } else {
      const sample = mockCaregivers["cg-001"] || Object.values(mockCaregivers)[0];
      caregiver = {
        ...sample,
        id: targetId,
        name: "Carlos Gomez",
        status: "Active",
      };
    }
  }

  return <CaregiverProfileClient initialCaregiver={caregiver} />;
}

export function generateStaticParams() { return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "cg-001" }, { id: "pt-001" }]; }
