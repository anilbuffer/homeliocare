import { redirect } from "next/navigation";

export default async function ClinicalPatientRedirectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  redirect(`/patients/${resolvedParams.id}`);
}
