import { 
  ComplianceItem, 
  ComplianceScoreData, 
  KpiSummaryData,
  ReminderLogEntry,
  VerificationQueueItem,
  AuditLogEntry,
  PolicyAcknowledgment
} from "@/types/compliance";

export const mockComplianceScore: ComplianceScoreData = {
  overallScore: 96.4,
  trend: 1.2,
  breakdown: [
    { category: "HIPAA", score: 98 },
    { category: "OSHA", score: 95 },
    { category: "State Compliance", score: 99 },
    { category: "Medicaid", score: 100 },
    { category: "Medicare", score: 100 },
    { category: "Background Checks", score: 92 },
    { category: "License Monitoring", score: 94 },
    { category: "Vaccinations", score: 89 },
    { category: "Policy Acknowledgment", score: 97 },
  ],
};

export const mockKpiSummary: KpiSummaryData = {
  fullyCompliantCount: 238,
  expiringCount: 14,
  expiredCount: 3,
  pendingCount: 8,
  remindersSent: 45,
  avgDaysToRenewal: 5.2,
};

export const mockComplianceItems: ComplianceItem[] = [
  {
    id: "ci-1",
    caregiver: { id: "cg-1", name: "Sarah Jenkins", role: "RN", avatarUrl: "" },
    itemName: "CPR Certification",
    category: "License Monitoring",
    issueDate: "2024-01-15",
    expiryDate: "2026-01-15",
    status: "Compliant",
  },
  {
    id: "ci-2",
    caregiver: { id: "cg-2", name: "Michael Chen", role: "HHA", avatarUrl: "" },
    itemName: "TB Test",
    category: "Vaccinations",
    issueDate: "2025-07-20",
    expiryDate: "2026-07-20",
    status: "Expiring",
  },
  {
    id: "ci-3",
    caregiver: { id: "cg-3", name: "Elena Rodriguez", role: "LPN", avatarUrl: "" },
    itemName: "HIPAA Training",
    category: "HIPAA",
    issueDate: "2023-05-10",
    expiryDate: "2024-05-10",
    status: "Expired",
  },
  {
    id: "ci-4",
    caregiver: { id: "cg-4", name: "David Kim", role: "PT", avatarUrl: "" },
    itemName: "State Background Check",
    category: "Background Checks",
    issueDate: "2026-07-10",
    expiryDate: "2027-07-10",
    status: "Pending",
  },
  {
    id: "ci-5",
    caregiver: { id: "cg-5", name: "Jessica Davis", role: "RN", avatarUrl: "" },
    itemName: "Driver's License",
    category: "License Monitoring",
    issueDate: "2020-03-12",
    expiryDate: "2028-03-12",
    status: "Compliant",
  },
];

export const mockReminderLogs: ReminderLogEntry[] = [
  {
    id: "rl-1",
    caregiverName: "Michael Chen",
    itemName: "TB Test",
    sentAt: "2026-07-15T09:00:00Z",
    status: "Sent",
    channel: "email",
  },
  {
    id: "rl-2",
    caregiverName: "Elena Rodriguez",
    itemName: "HIPAA Training",
    sentAt: "2026-07-14T10:30:00Z",
    status: "Opened",
    channel: "sms",
  },
];

export const mockVerificationQueue: VerificationQueueItem[] = [
  {
    id: "vq-1",
    caregiver: { id: "cg-4", name: "David Kim", role: "PT", avatarUrl: "" },
    documentType: "State Background Check Result",
    uploadDate: "2026-07-16T08:15:00Z",
  },
  {
    id: "vq-2",
    caregiver: { id: "cg-6", name: "Amanda Lee", role: "HHA", avatarUrl: "" },
    documentType: "COVID-19 Vaccination Card",
    uploadDate: "2026-07-15T14:45:00Z",
  }
];

export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: "al-1",
    timestamp: "2026-07-16T10:22:00Z",
    user: "System",
    action: "Reminder Sent",
    details: "Automated 30-day reminder sent to Michael Chen for TB Test.",
  },
  {
    id: "al-2",
    timestamp: "2026-07-16T09:15:00Z",
    user: "Sarah Jenkins (Admin)",
    action: "Document Verified",
    details: "Approved CPR Certification for Jessica Davis. Status updated to Compliant.",
  },
];

export const mockPolicyMatrix: PolicyAcknowledgment[] = [
  {
    id: "pa-1",
    policyName: "Agency Code of Conduct",
    requiredForRoles: ["RN", "LPN", "HHA", "PT", "OT"],
    acknowledgments: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", acknowledgedAt: "2024-01-16T08:00:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", acknowledgedAt: "2025-07-21T09:00:00Z" },
      { caregiverId: "cg-3", caregiverName: "Elena Rodriguez" }, // Missing acknowledgment
    ]
  },
  {
    id: "pa-2",
    policyName: "HIPAA Privacy Policy",
    requiredForRoles: ["RN", "LPN", "HHA", "PT", "OT"],
    acknowledgments: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", acknowledgedAt: "2024-01-16T08:05:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", acknowledgedAt: "2025-07-21T09:05:00Z" },
      { caregiverId: "cg-3", caregiverName: "Elena Rodriguez", acknowledgedAt: "2023-05-11T10:00:00Z" },
    ]
  }
];
