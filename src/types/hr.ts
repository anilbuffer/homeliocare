export type CandidateStage =
  | "Applied"
  | "Phone Screen"
  | "Interview Scheduled"
  | "Background Check"
  | "Offer"
  | "Hired";

export type CandidateSource =
  | "Indeed"
  | "ZipRecruiter"
  | "Facebook"
  | "Employee Referral"
  | "CNA Program"
  | "Walk-in"
  | "Staffing Agency";

export type IntegrationCheckStatus = "Not Started" | "Pending" | "Clear" | "Flagged";

export interface InterviewNote {
  id: string;
  interviewerName: string;
  interviewerRole: string;
  date: string;
  rating: number;
  text: string;
}

export interface OnboardingChecklist {
  policyAcknowledged: boolean;
  hipaaTrainingCompleted: boolean;
  abuseReportingCompleted: boolean;
  i9Submitted: boolean;
  w4Submitted: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  positionApplied: string;
  source: CandidateSource;
  dateApplied: string;
  assignedRecruiter: string;
  statusTag: string;
  stage: CandidateStage;
  resumeUrl?: string;
  experienceYears: number;
  backgroundCheck: {
    status: IntegrationCheckStatus;
    provider: "Checkr" | "Sterling";
    lastCheckedDate?: string;
    flagReason?: string;
  };
  sexOffenderCheck: {
    status: IntegrationCheckStatus;
    lastCheckedDate?: string;
  };
  oigSamCheck: {
    status: IntegrationCheckStatus;
    lastCheckedDate?: string;
    flagReason?: string;
    overrideBy?: string;
    overrideDate?: string;
  };
  tbTest: {
    result: "Pending" | "Negative" | "Chest X-Ray Required" | "Completed";
    date?: string;
  };
  credentialVerification: {
    licenseType: "CNA" | "HHA" | "RN" | "LPN" | "Companion";
    licenseNumber: string;
    status: "Verified" | "Pending Verification" | "Invalid";
    cprCertified: boolean;
  };
  offerLetter: {
    status: "Not Sent" | "Awaiting Signature" | "Signed" | "Declined";
    sentDate?: string;
  };
  onboardingChecklist: OnboardingChecklist;
  notes: InterviewNote[];
}

export interface ActionQueueItem {
  id: string;
  title: string;
  subtitle: string;
  candidateOrCaregiverName: string;
  category: "background_check" | "oig_sam" | "offer_letter" | "onboarding" | "i9_w4";
  priority: "high" | "urgent" | "normal";
  actionLabel: string;
  relatedId?: string;
  completed?: boolean;
}

export interface CredentialWatchItem {
  id: string;
  caregiverId: string;
  caregiverName: string;
  role: string;
  credentialType: "CNA License" | "CPR / First Aid" | "TB Test" | "Background Check" | "HHA Cert";
  expiryDate: string;
  daysRemaining: number;
  status: "expiring_soon" | "urgent" | "expired";
  lastNotified?: string;
}

export interface RetentionPulseData {
  turnoverTrend: { month: string; rate: number }[];
  topReasons: { reason: string; percentage: number; count: number }[];
  recentSeparations: {
    id: string;
    caregiverName: string;
    role: string;
    effectiveDate: string;
    type: "Voluntary" | "Involuntary";
    reasonCode: string;
    wouldRehire: boolean;
    exitNotes?: string;
  }[];
}
