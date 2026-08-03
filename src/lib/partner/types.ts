export type ReferralStatus =
  | "Received"
  | "Under Review"
  | "Assessment Scheduled"
  | "Accepted as Client"
  | "Not a Fit"
  | "Referred Elsewhere"
  | "Additional Info Requested";

export interface PartnerReferral {
  id: string;
  patientName: string;
  patientInitials: string;
  submittedAt: string;
  status: ReferralStatus;
  urgency: "Normal" | "Discharge within 24-48h";
  submittingMember: string;
  notes?: string;
  serviceRequested: string;
}

export interface PartnerKPIs {
  referralsSubmittedThisMonth: number;
  conversionRate: number; // percentage (e.g. 68 for 68%)
  avgResponseTimeHours: number;
  openInReview: number;
}

export interface PartnerOrganization {
  id: string;
  name: string;
  type: string;
  primaryContact: string;
  primaryPhone: string;
  primaryEmail: string;
  address: string;
}

export interface PartnerTeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}
