import React from "react";
import { notFound } from "next/navigation";
import { mockPatients } from "@/lib/patients/mockData";
import { PatientHeader } from "@/components/patients/PatientHeader";
import { PatientTabs } from "@/components/patients/PatientTabs";

export default async function ClinicalPatientHubPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const patient = mockPatients[resolvedParams.id];

  if (!patient) {
    notFound();
  }

  return (
    <div className="w-full max-w-full">
      <PatientHeader patient={patient} />
      <PatientTabs patient={patient} />
    </div>
  );
}

export function generateStaticParams() { return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "cg-001" }, { id: "pt-001" }, { id: "c-1" }, { id: "c-2" }, { id: "c-3" }]; }
