import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function FieldSupervisorLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["FIELD_SUPERVISOR"]}>
      <AppLayout>{children}</AppLayout>
    </AuthGuard>
  );
}
