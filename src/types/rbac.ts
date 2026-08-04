export type Role = "ADMIN" | "SCHEDULER" | "HR" | "CLIENT" | "FAMILY" | "CAREGIVER" | "INTAKE_COORDINATOR" | "BILLING_FINANCE_STAFF" | "CLINICAL_SUPERVISOR_RN" | "QA_COMPLIANCE_OFFICER" | "FIELD_SUPERVISOR" | "PARTNER" | "TRAINER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role; // Legacy simple UI persona role
  role_id: string; // The detailed granular RBAC role ID
  avatarUrl?: string;
}

