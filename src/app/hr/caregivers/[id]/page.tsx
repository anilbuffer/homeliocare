import React from "react";
import { mockCaregivers, Caregiver } from "@/lib/caregivers/mockData";
import { CaregiverHeader } from "@/components/caregivers/CaregiverHeader";
import { CaregiverTabs } from "@/components/caregivers/CaregiverTabs";

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

  return (
    <div className="w-full space-y-6">
      <div className="bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold px-3.5 py-2 rounded-xl flex items-center justify-between">
        <span>HR Personnel File & Credentials View</span>
        <span className="text-[11px] text-slate-500 font-normal">Scoped HR Access Layer</span>
      </div>

      <CaregiverHeader caregiver={caregiver} />
      <CaregiverTabs caregiver={caregiver} />
    </div>
  );
}
