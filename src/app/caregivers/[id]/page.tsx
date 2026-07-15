import React from "react";
import { notFound } from "next/navigation";
import { mockCaregivers } from "@/lib/caregivers/mockData";
import { CaregiverHeader } from "@/components/caregivers/CaregiverHeader";
import { CaregiverTabs } from "@/components/caregivers/CaregiverTabs";

export default async function CaregiverProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const caregiver = mockCaregivers[resolvedParams.id];

  if (!caregiver) {
    notFound();
  }

  return (
    <div className="w-full">
      <CaregiverHeader caregiver={caregiver} />
      <CaregiverTabs caregiver={caregiver} />
    </div>
  );
}
