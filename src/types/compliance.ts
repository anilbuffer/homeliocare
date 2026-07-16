export type ComplianceCategory = 
  | "HIPAA"
  | "OSHA"
  | "State Compliance"
  | "Medicaid"
  | "Medicare"
  | "Background Checks"
  | "License Monitoring"
  | "Vaccinations"
  | "Policy Acknowledgment";

export type ComplianceStatus = "Compliant" | "Expiring" | "Expired" | "Pending";

export interface CaregiverRef {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface ComplianceItem {
  id: string;
  caregiver: CaregiverRef;
  itemName: string;
  category: ComplianceCategory;
  issueDate?: string;
  expiryDate?: string;
  status: ComplianceStatus;
  documentUrl?: string;
  notes?: string;
}

export interface ComplianceScoreData {
  overallScore: number;
  trend: number;
  breakdown: {
    category: ComplianceCategory;
    score: number;
  }[];
}

export interface KpiSummaryData {
  fullyCompliantCount: number;
  expiringCount: number;
  expiredCount: number;
  pendingCount: number;
  remindersSent: number;
  avgDaysToRenewal: number;
}

export interface ReminderConfig {
  enabled: boolean;
  schedule: number[]; // e.g., [60, 30, 14, 1]
  channels: ("email" | "sms" | "in-app")[];
}

export interface ReminderLogEntry {
  id: string;
  caregiverName: string;
  itemName: string;
  sentAt: string;
  status: "Sent" | "Opened" | "Failed";
  channel: "email" | "sms" | "in-app";
}

export interface VerificationQueueItem {
  id: string;
  caregiver: CaregiverRef;
  documentType: string;
  uploadDate: string;
  thumbnailUrl?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

export interface PolicyAcknowledgment {
  id: string;
  policyName: string;
  requiredForRoles: string[];
  acknowledgments: {
    caregiverId: string;
    caregiverName: string;
    acknowledgedAt?: string;
  }[];
}
