export type Role = "ADMIN" | "CLIENT" | "CAREGIVER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}
