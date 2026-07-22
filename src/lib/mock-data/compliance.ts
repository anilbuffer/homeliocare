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
    category: "Corporate Governance",
    version: "v3.2",
    effectiveDate: "2025-01-01",
    requiredForRoles: ["RN", "LPN", "HHA", "PT", "OT", "Admin"],
    totalRequired: 247,
    signedCount: 238,
    overdueCount: 0,
    status: "In Progress",
    signers: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", role: "RN", email: "sarah.j@homeliocare.com", status: "Signed", signedAt: "2025-07-21T08:30:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", role: "HHA", email: "m.chen@homeliocare.com", status: "Signed", signedAt: "2025-07-21T09:15:00Z" },
      { caregiverId: "cg-3", caregiverName: "Elena Rodriguez", role: "LPN", email: "elena.r@homeliocare.com", status: "Pending", dueDate: "2026-07-30" },
      { caregiverId: "cg-4", caregiverName: "David Kim", role: "PT", email: "d.kim@homeliocare.com", status: "Signed", signedAt: "2025-07-18T14:20:00Z" },
      { caregiverId: "cg-5", caregiverName: "Jessica Davis", role: "RN", email: "j.davis@homeliocare.com", status: "Signed", signedAt: "2025-07-20T11:45:00Z" },
      { caregiverId: "cg-6", caregiverName: "Amanda Lee", role: "HHA", email: "a.lee@homeliocare.com", status: "Pending", dueDate: "2026-07-31" },
      { caregiverId: "cg-7", caregiverName: "Robert Taylor", role: "LPN", email: "r.taylor@homeliocare.com", status: "Signed", signedAt: "2025-07-15T10:10:00Z" },
      { caregiverId: "cg-8", caregiverName: "Maria Santos", role: "HHA", email: "m.santos@homeliocare.com", status: "Pending", dueDate: "2026-07-28" },
      { caregiverId: "cg-9", caregiverName: "James Wilson", role: "OT", email: "j.wilson@homeliocare.com", status: "Signed", signedAt: "2025-07-19T16:00:00Z" },
      { caregiverId: "cg-10", caregiverName: "Patricia Miller", role: "RN", email: "p.miller@homeliocare.com", status: "Signed", signedAt: "2025-07-21T13:25:00Z" },
      { caregiverId: "cg-11", caregiverName: "Samantha Brooks", role: "LPN", email: "s.brooks@homeliocare.com", status: "Pending", dueDate: "2026-08-01" },
      { caregiverId: "cg-12", caregiverName: "Marcus Vance", role: "HHA", email: "m.vance@homeliocare.com", status: "Pending", dueDate: "2026-07-29" },
    ],
    acknowledgments: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", acknowledgedAt: "2025-07-21T08:30:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", acknowledgedAt: "2025-07-21T09:15:00Z" },
      { caregiverId: "cg-3", caregiverName: "Elena Rodriguez" },
    ]
  },
  {
    id: "pa-2",
    policyName: "HIPAA Privacy & Security Policy",
    category: "Regulatory Compliance",
    version: "v4.1",
    effectiveDate: "2025-01-15",
    requiredForRoles: ["RN", "LPN", "HHA", "PT", "OT", "Admin"],
    totalRequired: 247,
    signedCount: 247,
    overdueCount: 0,
    status: "Fully Signed",
    signers: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", role: "RN", email: "sarah.j@homeliocare.com", status: "Signed", signedAt: "2025-07-21T08:35:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", role: "HHA", email: "m.chen@homeliocare.com", status: "Signed", signedAt: "2025-07-21T09:20:00Z" },
      { caregiverId: "cg-3", caregiverName: "Elena Rodriguez", role: "LPN", email: "elena.r@homeliocare.com", status: "Signed", signedAt: "2025-07-21T10:00:00Z" },
      { caregiverId: "cg-4", caregiverName: "David Kim", role: "PT", email: "d.kim@homeliocare.com", status: "Signed", signedAt: "2025-07-18T14:25:00Z" },
      { caregiverId: "cg-5", caregiverName: "Jessica Davis", role: "RN", email: "j.davis@homeliocare.com", status: "Signed", signedAt: "2025-07-20T11:50:00Z" },
    ],
    acknowledgments: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", acknowledgedAt: "2025-07-21T08:35:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", acknowledgedAt: "2025-07-21T09:20:00Z" },
      { caregiverId: "cg-3", caregiverName: "Elena Rodriguez", acknowledgedAt: "2025-07-21T10:00:00Z" },
    ]
  },
  {
    id: "pa-3",
    policyName: "Emergency Response & Evacuation Plan",
    category: "Safety & Emergency",
    version: "v2.0",
    effectiveDate: "2025-03-01",
    requiredForRoles: ["RN", "LPN", "HHA", "PT", "OT"],
    totalRequired: 247,
    signedCount: 180,
    overdueCount: 24,
    status: "Overdue",
    signers: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", role: "RN", email: "sarah.j@homeliocare.com", status: "Signed", signedAt: "2025-06-10T12:00:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", role: "HHA", email: "m.chen@homeliocare.com", status: "Signed", signedAt: "2025-06-12T14:30:00Z" },
      { caregiverId: "cg-3", caregiverName: "Elena Rodriguez", role: "LPN", email: "elena.r@homeliocare.com", status: "Overdue", dueDate: "2026-07-10" },
      { caregiverId: "cg-4", caregiverName: "David Kim", role: "PT", email: "d.kim@homeliocare.com", status: "Overdue", dueDate: "2026-07-05" },
      { caregiverId: "cg-5", caregiverName: "Jessica Davis", role: "RN", email: "j.davis@homeliocare.com", status: "Pending", dueDate: "2026-07-25" },
      { caregiverId: "cg-6", caregiverName: "Amanda Lee", role: "HHA", email: "a.lee@homeliocare.com", status: "Overdue", dueDate: "2026-07-01" },
      { caregiverId: "cg-7", caregiverName: "Robert Taylor", role: "LPN", email: "r.taylor@homeliocare.com", status: "Pending", dueDate: "2026-07-28" },
      { caregiverId: "cg-8", caregiverName: "Maria Santos", role: "HHA", email: "m.santos@homeliocare.com", status: "Overdue", dueDate: "2026-06-30" },
    ],
    acknowledgments: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", acknowledgedAt: "2025-06-10T12:00:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", acknowledgedAt: "2025-06-12T14:30:00Z" },
    ]
  },
  {
    id: "pa-4",
    policyName: "Infection Prevention & PPE Protocol",
    category: "Clinical Protocols",
    version: "v3.0",
    effectiveDate: "2025-02-15",
    requiredForRoles: ["RN", "LPN", "HHA"],
    totalRequired: 247,
    signedCount: 241,
    overdueCount: 2,
    status: "Overdue",
    signers: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", role: "RN", email: "sarah.j@homeliocare.com", status: "Signed", signedAt: "2025-05-04T09:00:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", role: "HHA", email: "m.chen@homeliocare.com", status: "Signed", signedAt: "2025-05-05T11:20:00Z" },
      { caregiverId: "cg-3", caregiverName: "Elena Rodriguez", role: "LPN", email: "elena.r@homeliocare.com", status: "Signed", signedAt: "2025-05-06T15:10:00Z" },
      { caregiverId: "cg-6", caregiverName: "Amanda Lee", role: "HHA", email: "a.lee@homeliocare.com", status: "Overdue", dueDate: "2026-07-12" },
      { caregiverId: "cg-12", caregiverName: "Marcus Vance", role: "HHA", email: "m.vance@homeliocare.com", status: "Overdue", dueDate: "2026-07-14" },
    ],
    acknowledgments: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", acknowledgedAt: "2025-05-04T09:00:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", acknowledgedAt: "2025-05-05T11:20:00Z" },
      { caregiverId: "cg-3", caregiverName: "Elena Rodriguez", acknowledgedAt: "2025-05-06T15:10:00Z" },
    ]
  },
  {
    id: "pa-5",
    policyName: "Workplace Violence & Safety Policy",
    category: "Employee Safety",
    version: "v1.8",
    effectiveDate: "2025-04-01",
    requiredForRoles: ["RN", "LPN", "HHA", "PT"],
    totalRequired: 210,
    signedCount: 202,
    overdueCount: 0,
    status: "In Progress",
    signers: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", role: "RN", email: "sarah.j@homeliocare.com", status: "Signed", signedAt: "2025-06-01T10:15:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", role: "HHA", email: "m.chen@homeliocare.com", status: "Signed", signedAt: "2025-06-02T13:40:00Z" },
      { caregiverId: "cg-3", caregiverName: "Elena Rodriguez", role: "LPN", email: "elena.r@homeliocare.com", status: "Signed", signedAt: "2025-06-03T16:00:00Z" },
      { caregiverId: "cg-5", caregiverName: "Jessica Davis", role: "RN", email: "j.davis@homeliocare.com", status: "Pending", dueDate: "2026-07-27" },
    ],
    acknowledgments: [
      { caregiverId: "cg-1", caregiverName: "Sarah Jenkins", acknowledgedAt: "2025-06-01T10:15:00Z" },
      { caregiverId: "cg-2", caregiverName: "Michael Chen", acknowledgedAt: "2025-06-02T13:40:00Z" },
      { caregiverId: "cg-3", caregiverName: "Elena Rodriguez", acknowledgedAt: "2025-06-03T16:00:00Z" },
    ]
  }
];
