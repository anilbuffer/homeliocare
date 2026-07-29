import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
