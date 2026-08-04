"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types/rbac";
import { Loader2 } from "lucide-react";

export function AuthGuard({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles: Role[];
}) {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!currentUser) {
        router.push("/login");
      } else if (!allowedRoles.includes(currentUser.role)) {
        // Redirect to their default panel if they are trying to access an unauthorized route
        if (currentUser.role === "ADMIN") {
          router.push("/dashboard");
        } else if (currentUser.role === "SCHEDULER") {
          router.push("/scheduler");
        } else if (currentUser.role === "HR") {
          router.push("/hr/dashboard");
        } else if (currentUser.role === "CLIENT") {
          router.push("/portal");
        } else if (currentUser.role === "CAREGIVER") {
          router.push("/caregiver");
        } else if (currentUser.role === "INTAKE_COORDINATOR") {
          router.push("/intake/dashboard");
        } else if (currentUser.role === "BILLING_FINANCE_STAFF") {
          router.push("/billing");
        } else if (currentUser.role === "CLINICAL_SUPERVISOR_RN") {
          router.push("/clinical");
        } else if (currentUser.role === "FIELD_SUPERVISOR") {
          router.push("/field-supervisor");
        } else if (currentUser.role === "PARTNER") {
          router.push("/partner");
        } else if (currentUser.role === "TRAINER") {
          router.push("/training-admin");
        } else if (currentUser.role === "QA_COMPLIANCE_OFFICER") {
          router.push("/compliance");
        } else if (currentUser.role === "FAMILY") {
          router.push("/portal");
        } else {
          router.push("/login");
        }
      }
    }
  }, [currentUser, isLoading, allowedRoles, router]);

  if (isLoading || !currentUser || !allowedRoles.includes(currentUser.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return <>{children}</>;
}
