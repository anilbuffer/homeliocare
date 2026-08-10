import React from "react";
import { mockVisits } from "@/lib/mockTrackerData";

export function generateStaticParams() { 
  return mockVisits.map((visit) => ({
    id: visit.id,
  }));
}

export default function VisitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
