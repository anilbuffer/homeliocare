import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";

export const metadata = {
  title: "User Management (Roles & RBAC) | Homelio Care",
  description: "Manage system access, internal staff roles, external portal permissions, and HIPAA security controls.",
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
