export type ReferralStage = 
  | "Referral Received"
  | "Contact Attempted"
  | "Initial Assessment Scheduled"
  | "Insurance Verification"
  | "Eligibility Confirmed"
  | "Consent & Agreements"
  | "Care Plan Setup"
  | "Admitted";

export type ReferralSource = "Hospital" | "Doctor" | "Social Worker" | "Self" | "Online Form";

export interface DocumentStatus {
  name: string;
  status: "Missing" | "Uploaded" | "Verified";
  uploadDate?: string;
}

export interface ConsentStatus {
  name: string;
  signed: boolean;
  date?: string;
}

export interface CommunicationEntry {
  id: string;
  timestamp: string;
  author: string;
  type: "call" | "email" | "text" | "note";
  content: string;
}

export interface Referral {
  id: string;
  clientName: string;
  clientInitials: string;
  dob?: string;
  phone?: string;
  source: ReferralSource;
  referringParty?: string;
  dateReceived: string;
  stage: ReferralStage;
  daysInStage: number;
  assignedCoordinator: {
    name: string;
    avatarUrl?: string;
  };
  dischargeDeadline?: string; // ISO date string, optional
  isPossibleDuplicate?: boolean;
  duplicateMatches?: Array<{ id: string; name: string; dob: string }>;
  serviceZoneStatus: "in-zone" | "near-capacity" | "out-of-zone";
  serviceZoneName?: string;
  capacityUtilization?: number;
  documents: DocumentStatus[];
  consents: ConsentStatus[];
  communications: CommunicationEntry[];
  nextAction?: {
    description: string;
    dueDate: string;
    isOverdue: boolean;
  };
  insurance?: {
    payer: string;
    policyNumber?: string;
    status: "Pending" | "Verified" | "Denied";
    authorizedHours?: number;
    verificationDate?: string;
  };
  demographics?: {
    gender?: string;
    address?: string;
  };
  diagnosis?: string;
  emergencyContact?: string;
  assessment?: {
    scheduledDate?: string;
    assignedAssessor?: string;
    type?: string;
    status: "Pending" | "Completed";
  };
}
