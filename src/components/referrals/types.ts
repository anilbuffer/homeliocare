export type ReferralStage =
  | "Referral Received"
  | "Contact Attempted"
  | "Initial Assessment Scheduled"
  | "Clinical Review"
  | "Insurance Verification"
  | "Eligibility Confirmed"
  | "Assigned to Care Team"
  | "Consent & Agreements"
  | "Admitted"
  | "Converted";

export type ReferralSource = "Hospital" | "Hospital Discharge" | "Doctor" | "Social Worker" | "Self" | "Online Form";

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
  summary?: string;
  recordingUrl?: string;
}

export interface Referral {
  id: string;
  workflowType?: "Inquiry" | "Referral";
  npi?: string;
  authorizationStatus?: "Not Started" | "Pending" | "Approved" | "Denied";
  clinicalReviewStatus?: "Pending" | "Approved" | "Denied";
  clientName: string;
  clientInitials: string;
  dob?: string;
  phone?: string;
  source: ReferralSource;
  sourceDetails?: string;
  referringParty?: string;
  intakeNotes?: string;
  dateReceived: string;
  stage: ReferralStage;
  daysInStage: number;
  assignedCoordinator: {
    name: string;
    avatarUrl?: string;
  };
  dischargeDeadline?: string; // ISO date string, optional
  urgency?: "Low" | "Medium" | "High";
  isPossibleDuplicate?: boolean;
  duplicateMatches?: Array<{ id: string; name: string; dob: string }>;
  serviceZoneStatus: "in-zone" | "near-capacity" | "out-of-zone";
  serviceZoneName?: string;
  capacityUtilization?: number;
  readmissionRisk?: "High" | "Medium" | "Low";
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
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    email?: string;
    primaryContactName?: string;
    primaryContactRelationship?: string;
    primaryContactPhone?: string;
    primaryContactEmail?: string;
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
