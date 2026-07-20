import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["ADMIN", "CAREGIVER"]}>
      <AppLayout>{children}</AppLayout>
    </AuthGuard>
  );
}
