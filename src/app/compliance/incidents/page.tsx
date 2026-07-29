import React from "react";
import { IncidentsPage } from "@/components/incidents/IncidentsPage";

export const metadata = {
  title: "Incident Reports | QA & Compliance",
  description: "Agency-wide unrestricted incident reports and compliance oversight.",
};

export default function ComplianceIncidents() {
  return <IncidentsPage />;
}
