import React from "react";
import { notFound } from "next/navigation";
import { mockCaregivers, Caregiver } from "@/lib/caregivers/mockData";
import { CaregiverHeader } from "@/components/caregivers/CaregiverHeader";
import { CaregiverTabs } from "@/components/caregivers/CaregiverTabs";

export default async function CaregiverProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const targetId = resolvedParams.id;

  // Search by exact ID or fallback gracefully
  let caregiver: Caregiver | undefined = mockCaregivers[targetId];

  if (!caregiver) {
    // Check if ID matches any caregiver ID case-insensitively or return fallback template
    const matchedKey = Object.keys(mockCaregivers).find(
      (key) => key.toLowerCase() === targetId.toLowerCase()
    );

    if (matchedKey) {
      caregiver = mockCaregivers[matchedKey];
    } else {
      // Fallback template for newly created or custom hire IDs so the page never 404s
      const sample = mockCaregivers["cg-001"] || Object.values(mockCaregivers)[0];
      caregiver = {
        ...sample,
        id: targetId,
        name: targetId === "1" ? "Amanda Riley" : targetId === "2" ? "James Wilson" : targetId === "3" ? "Elena Rodriguez" : targetId === "4" ? "Marcus Vance" : "Onboarding Caregiver",
        status: "Onboarding",
      };
    }
  }

  return (
    <div className="w-full space-y-6">
      <CaregiverHeader caregiver={caregiver} />
      <CaregiverTabs caregiver={caregiver} />
    </div>
  );
}
