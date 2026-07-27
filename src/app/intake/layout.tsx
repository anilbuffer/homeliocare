import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["INTAKE_COORDINATOR", "ADMIN"]}>
      <AppLayout>{children}</AppLayout>
    </AuthGuard>
  );
}
