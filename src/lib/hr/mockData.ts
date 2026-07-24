import { Candidate, ActionQueueItem, CredentialWatchItem, RetentionPulseData } from "@/types/hr";

export const initialCandidates: Candidate[] = [
  {
    id: "cand-101",
    name: "Jessica Smith",
    email: "jessica.smith@example.com",
    phone: "(555) 234-5678",
    positionApplied: "RN Charge Nurse",
    source: "Indeed",
    dateApplied: "2026-07-20",
    assignedRecruiter: "Sarah Jenkins (HR)",
    statusTag: "High Priority",
    stage: "Applied",
    experienceYears: 4,
    backgroundCheck: { status: "Not Started", provider: "Checkr" },
    sexOffenderCheck: { status: "Not Started" },
    oigSamCheck: { status: "Not Started" },
    tbTest: { result: "Pending" },
    credentialVerification: { licenseType: "RN", licenseNumber: "RN-994821", status: "Pending Verification", cprCertified: true },
    offerLetter: { status: "Not Sent" },
    onboardingChecklist: { policyAcknowledged: false, hipaaTrainingCompleted: false, abuseReportingCompleted: false, i9Submitted: false, w4Submitted: false },
    notes: []
  },
  {
    id: "cand-102",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "(555) 876-5432",
    positionApplied: "Certified Nursing Assistant (CNA)",
    source: "ZipRecruiter",
    dateApplied: "2026-07-18",
    assignedRecruiter: "Sarah Jenkins (HR)",
    statusTag: "Bilingual (Spanish)",
    stage: "Phone Screen",
    experienceYears: 2,
    backgroundCheck: { status: "Pending", provider: "Checkr", lastCheckedDate: "2026-07-21" },
    sexOffenderCheck: { status: "Clear", lastCheckedDate: "2026-07-21" },
    oigSamCheck: { status: "Clear", lastCheckedDate: "2026-07-21" },
    tbTest: { result: "Negative", date: "2026-07-19" },
    credentialVerification: { licenseType: "CNA", licenseNumber: "CNA-382910", status: "Verified", cprCertified: true },
    offerLetter: { status: "Not Sent" },
    onboardingChecklist: { policyAcknowledged: true, hipaaTrainingCompleted: false, abuseReportingCompleted: false, i9Submitted: false, w4Submitted: false },
    notes: [
      { id: "n1", interviewerName: "Sarah Jenkins", interviewerRole: "Recruiter", date: "2026-07-19", rating: 4.5, text: "Excellent phone screen! 2 years memory care experience, flexible night availability." }
    ]
  },
  {
    id: "cand-103",
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "(555) 345-6789",
    positionApplied: "Home Health Aide (HHA)",
    source: "Employee Referral",
    dateApplied: "2026-07-15",
    assignedRecruiter: "Sarah Jenkins (HR)",
    statusTag: "Ready for Review",
    stage: "Background Check",
    experienceYears: 3,
    backgroundCheck: { status: "Clear", provider: "Sterling", lastCheckedDate: "2026-07-22" },
    sexOffenderCheck: { status: "Clear", lastCheckedDate: "2026-07-22" },
    oigSamCheck: { status: "Clear", lastCheckedDate: "2026-07-22" },
    tbTest: { result: "Negative", date: "2026-07-17" },
    credentialVerification: { licenseType: "HHA", licenseNumber: "HHA-552019", status: "Verified", cprCertified: true },
    offerLetter: { status: "Not Sent" },
    onboardingChecklist: { policyAcknowledged: true, hipaaTrainingCompleted: true, abuseReportingCompleted: false, i9Submitted: false, w4Submitted: false },
    notes: [
      { id: "n2", interviewerName: "Elena Rodriguez", interviewerRole: "Field Supervisor", date: "2026-07-17", rating: 5, text: "In-person interview went great. Very empathetic demeanor, passed clinical skills assessment." }
    ]
  },
  {
    id: "cand-104",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "(555) 901-2345",
    positionApplied: "Companion / Homemaker",
    source: "Facebook",
    dateApplied: "2026-07-10",
    assignedRecruiter: "Sarah Jenkins (HR)",
    statusTag: "Offer Sent",
    stage: "Offer",
    experienceYears: 1,
    backgroundCheck: { status: "Clear", provider: "Checkr", lastCheckedDate: "2026-07-16" },
    sexOffenderCheck: { status: "Clear", lastCheckedDate: "2026-07-16" },
    oigSamCheck: { status: "Clear", lastCheckedDate: "2026-07-16" },
    tbTest: { result: "Negative", date: "2026-07-12" },
    credentialVerification: { licenseType: "Companion", licenseNumber: "N/A", status: "Verified", cprCertified: true },
    offerLetter: { status: "Awaiting Signature", sentDate: "2026-07-21" },
    onboardingChecklist: { policyAcknowledged: true, hipaaTrainingCompleted: true, abuseReportingCompleted: true, i9Submitted: false, w4Submitted: false },
    notes: [
      { id: "n3", interviewerName: "Sarah Jenkins", interviewerRole: "Recruiter", date: "2026-07-14", rating: 4.8, text: "Extended offer for Part-Time weekend position at $21/hr." }
    ]
  },
  {
    id: "cand-105",
    name: "Carlos Gomez",
    email: "carlos.gomez@example.com",
    phone: "(555) 678-9012",
    positionApplied: "Certified Nursing Assistant (CNA)",
    source: "CNA Program",
    dateApplied: "2026-07-05",
    assignedRecruiter: "Sarah Jenkins (HR)",
    statusTag: "Onboarding Checklist Incomplete",
    stage: "Hired",
    experienceYears: 2,
    backgroundCheck: { status: "Clear", provider: "Checkr", lastCheckedDate: "2026-07-10" },
    sexOffenderCheck: { status: "Clear", lastCheckedDate: "2026-07-10" },
    oigSamCheck: { status: "Clear", lastCheckedDate: "2026-07-10" },
    tbTest: { result: "Completed", date: "2026-07-08" },
    credentialVerification: { licenseType: "CNA", licenseNumber: "CNA-991024", status: "Verified", cprCertified: true },
    offerLetter: { status: "Signed", sentDate: "2026-07-12" },
    onboardingChecklist: { policyAcknowledged: true, hipaaTrainingCompleted: true, abuseReportingCompleted: true, i9Submitted: false, w4Submitted: false },
    notes: []
  },
  {
    id: "cand-106",
    name: "Amanda Vance",
    email: "amanda.vance@example.com",
    phone: "(555) 432-1098",
    positionApplied: "Home Health Aide (HHA)",
    source: "Walk-in",
    dateApplied: "2026-07-12",
    assignedRecruiter: "Sarah Jenkins (HR)",
    statusTag: "Flagged Check",
    stage: "Background Check",
    experienceYears: 5,
    backgroundCheck: { status: "Flagged", provider: "Sterling", lastCheckedDate: "2026-07-22", flagReason: "Discrepancy in previous employment dates" },
    sexOffenderCheck: { status: "Clear", lastCheckedDate: "2026-07-22" },
    oigSamCheck: { status: "Flagged", lastCheckedDate: "2026-07-22", flagReason: "Potential name match on Medicaid SAM exclusion registry — verification needed" },
    tbTest: { result: "Negative", date: "2026-07-14" },
    credentialVerification: { licenseType: "HHA", licenseNumber: "HHA-102938", status: "Pending Verification", cprCertified: false },
    offerLetter: { status: "Not Sent" },
    onboardingChecklist: { policyAcknowledged: false, hipaaTrainingCompleted: false, abuseReportingCompleted: false, i9Submitted: false, w4Submitted: false },
    notes: []
  }
];

export const initialActionQueue: ActionQueueItem[] = [
  {
    id: "aq-1",
    title: "Background check results ready to review",
    subtitle: "Checkr result returned status: CLEAR for David Miller (CNA)",
    candidateOrCaregiverName: "David Miller",
    category: "background_check",
    priority: "urgent",
    actionLabel: "Review",
    relatedId: "cand-103"
  },
  {
    id: "aq-2",
    title: "OIG/SAM exclusion check flag requiring review",
    subtitle: "Federal Medicaid exclusion potential match for Amanda Vance (HHA)",
    candidateOrCaregiverName: "Amanda Vance",
    category: "oig_sam",
    priority: "urgent",
    actionLabel: "Review",
    relatedId: "cand-106"
  },
  {
    id: "aq-3",
    title: "Offer letter awaiting signature",
    subtitle: "Sent 2 days ago via e-Sign — Emily Davis (Companion)",
    candidateOrCaregiverName: "Emily Davis",
    category: "offer_letter",
    priority: "high",
    actionLabel: "Send Reminder",
    relatedId: "cand-104"
  },
  {
    id: "aq-4",
    title: "New hire onboarding checklist incomplete",
    subtitle: "Carlos Gomez (CNA) has 2 mandatory training modules pending",
    candidateOrCaregiverName: "Carlos Gomez",
    category: "onboarding",
    priority: "normal",
    actionLabel: "Review",
    relatedId: "cand-105"
  },
  {
    id: "aq-5",
    title: "I-9 / W-4 forms missing before first shift",
    subtitle: "Required tax documents not submitted for Jessica Smith (RN)",
    candidateOrCaregiverName: "Jessica Smith",
    category: "i9_w4",
    priority: "high",
    actionLabel: "Send Request",
    relatedId: "cand-101"
  }
];

export const initialCredentialWatchlist: CredentialWatchItem[] = [
  {
    id: "cw-1",
    caregiverId: "cg-001",
    caregiverName: "Maria Garcia",
    role: "CNA",
    credentialType: "CNA License",
    expiryDate: "2026-07-28",
    daysRemaining: 5,
    status: "urgent",
    lastNotified: "2 days ago"
  },
  {
    id: "cw-2",
    caregiverId: "cg-002",
    caregiverName: "James Smith",
    role: "HHA",
    credentialType: "CPR / First Aid",
    expiryDate: "2026-07-22",
    daysRemaining: -1,
    status: "expired",
    lastNotified: "Yesterday"
  },
  {
    id: "cw-3",
    caregiverId: "cg-003",
    caregiverName: "Linda Johnson",
    role: "RN",
    credentialType: "TB Test",
    expiryDate: "2026-08-10",
    daysRemaining: 18,
    status: "expiring_soon"
  },
  {
    id: "cw-4",
    caregiverId: "cg-004",
    caregiverName: "Robert Taylor",
    role: "CNA",
    credentialType: "Background Check",
    expiryDate: "2026-08-20",
    daysRemaining: 28,
    status: "expiring_soon"
  }
];

export const initialRetentionData: RetentionPulseData = {
  turnoverTrend: [
    { month: "Aug", rate: 14.2 },
    { month: "Sep", rate: 13.8 },
    { month: "Oct", rate: 13.1 },
    { month: "Nov", rate: 12.5 },
    { month: "Dec", rate: 12.9 },
    { month: "Jan", rate: 12.0 },
    { month: "Feb", rate: 11.8 },
    { month: "Mar", rate: 11.5 },
    { month: "Apr", rate: 11.9 },
    { month: "May", rate: 11.4 },
    { month: "Jun", rate: 11.3 },
    { month: "Jul", rate: 11.2 }
  ],
  topReasons: [
    { reason: "Schedule Flexibility / Hours", percentage: 36, count: 18 },
    { reason: "Relocation / Moving", percentage: 24, count: 12 },
    { reason: "Career Advancement", percentage: 20, count: 10 },
    { reason: "Pay Rate / Compensation", percentage: 14, count: 7 },
    { reason: "Personal / Family Reasons", percentage: 6, count: 3 }
  ],
  recentSeparations: [
    {
      id: "sep-1",
      caregiverName: "Patricia Davis",
      role: "CNA",
      effectiveDate: "2026-07-15",
      type: "Voluntary",
      reasonCode: "Relocation / Moving",
      wouldRehire: true,
      exitNotes: "Moved to another state to be closer to family. Excellent performance record."
    },
    {
      id: "sep-2",
      caregiverName: "Marcus Vance",
      role: "HHA",
      effectiveDate: "2026-07-02",
      type: "Involuntary",
      reasonCode: "Policy Violation / Attendance",
      wouldRehire: false,
      exitNotes: "Repeated unexcused shift no-shows without notification."
    },
    {
      id: "sep-3",
      caregiverName: "Angela Martinez",
      role: "Companion",
      effectiveDate: "2026-06-25",
      type: "Voluntary",
      reasonCode: "Career Advancement",
      wouldRehire: true,
      exitNotes: "Accepted full-time nursing school program."
    }
  ]
};
