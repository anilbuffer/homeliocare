export type Role = "ADMIN" | "SCHEDULER" | "HR" | "CLIENT" | "CAREGIVER" | "INTAKE_COORDINATOR" | "BILLING_FINANCE_STAFF";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

