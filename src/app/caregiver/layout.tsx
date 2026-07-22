"use client";

import React from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["CAREGIVER", "ADMIN"]}>
      {children}
    </AuthGuard>
  );
}
