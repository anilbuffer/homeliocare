import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["ADMIN", "SCHEDULER", "HR", "CLIENT", "FAMILY", "CAREGIVER", "INTAKE_COORDINATOR", "BILLING_FINANCE_STAFF", "CLINICAL_SUPERVISOR_RN", "QA_COMPLIANCE_OFFICER", "FIELD_SUPERVISOR", "PARTNER", "TRAINER"]}>
      <AppLayout>{children}</AppLayout>
    </AuthGuard>
  );
}
