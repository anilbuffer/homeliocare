import { redirect } from "next/navigation";
import { mockPatients } from "@/lib/patients/mockData";

export default async function ClinicalPatientRedirectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  redirect(`/patients/${resolvedParams.id}`);
}

export function generateStaticParams() {
  return Object.keys(mockPatients).map((id) => ({ id }));
}
