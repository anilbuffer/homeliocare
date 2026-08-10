export interface SchedulerPatient {
  id: string;
  name: string;
  address: string;
  accessInstructions: string;
  requiredSkills: string[];
  authorizedHours: number;
  scheduledHours: number;
  primaryCaregiver: string | null;
  riskFlags: string[];
  status: "Admitted" | "Pending" | "Discharged";
}
