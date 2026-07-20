import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["ADMIN", "CAREGIVER"]}>
      <AppLayout>{children}</AppLayout>
    </AuthGuard>
  );
}
