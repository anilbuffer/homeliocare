export type Role = "ADMIN" | "SCHEDULER" | "HR" | "CLIENT" | "CAREGIVER" | "INTAKE_COORDINATOR";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

