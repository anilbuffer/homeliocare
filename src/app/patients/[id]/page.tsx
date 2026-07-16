import React from "react";
import { notFound } from "next/navigation";
import { mockPatients } from "@/lib/patients/mockData";
import { PatientHeader } from "@/components/patients/PatientHeader";
import { PatientTabs } from "@/components/patients/PatientTabs";

export default async function PatientHubPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const patient = mockPatients[resolvedParams.id];

  if (!patient) {
    notFound();
  }

  return (
    <div className="w-full">
      <PatientHeader patient={patient} />
      <PatientTabs patient={patient} />
    </div>
  );
}
