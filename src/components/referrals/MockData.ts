import { Referral } from "./types";

export const initialReferrals: Referral[] = [
  {
    id: "ref-001",
    workflowType: "Referral",
    clientName: "Eleanor Rigby",
    clientInitials: "ER",
    source: "Hospital",
    sourceDetails: "Discharge Planner - Room 402B",
    npi: "1234567890",
    authorizationStatus: "Pending",
    clinicalReviewStatus: "Pending",
    referringParty: "General Hospital Discharge",
    intakeNotes: "Patient requires high level of care upon discharge. Family is anxious but supportive.",
    dateReceived: "2026-07-16T10:00:00Z",
    stage: "Referral Received",
    daysInStage: 1,
    assignedCoordinator: {
      name: "Sarah Jenkins",
    },
    dischargeDeadline: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(), // 18 hours from now
    serviceZoneStatus: "in-zone",
    serviceZoneName: "North Region",
    documents: [
      { name: "Referral Form", status: "Uploaded" },
      { name: "Physician Orders", status: "Missing" },
    ],
    consents: [
      { name: "HIPAA Consent", signed: false },
    ],
    communications: [
      { id: "c1", timestamp: "2026-07-16T10:05:00Z", author: "System", type: "note", content: "Referral received from General Hospital." }
    ],
    readmissionRisk: "High",
    insurance: {
      payer: "Medicare",
      status: "Verified",
    }
  },
  {
    id: "ref-002",
    workflowType: "Inquiry",
    clientName: "John Doe",
    clientInitials: "JD",
    source: "Online Form",
    sourceDetails: "Google Ads Campaign - 'Home Care near me'",
    intakeNotes: "Spouse inquired about services for husband with early-onset dementia. Needs help with ADLs and medication reminders.",
    dateReceived: "2026-07-15T14:30:00Z",
    stage: "Contact Attempted",
    daysInStage: 2,
    assignedCoordinator: {
      name: "Sarah Jenkins",
    },
    isPossibleDuplicate: true,
    duplicateMatches: [{ id: "c-982", name: "Johnathan Doe", dob: "1945-05-12" }],
    serviceZoneStatus: "near-capacity",
    documents: [],
    consents: [],
    communications: [
      { 
        id: "c2", 
        timestamp: "2026-07-16T09:00:00Z", 
        author: "Sarah Jenkins", 
        type: "call", 
        content: "Spoke with wife regarding care options.",
        recordingUrl: "https://example.com/recording.mp3",
        summary: "• Caller (wife) seeks part-time care for husband with early-onset dementia\n• Primary concerns: wandering prevention and meal preparation\n• Recommended scheduling an in-home assessment for next week"
      }
    ],
    nextAction: {
      description: "Follow up call",
      dueDate: "2026-07-16T15:00:00Z",
      isOverdue: true,
    }
  },
  {
    id: "ref-003",
    workflowType: "Inquiry",
    clientName: "Mary Smith",
    clientInitials: "MS",
    source: "Doctor",
    referringParty: "Dr. Adams",
    dateReceived: "2026-07-10T09:00:00Z",
    stage: "Insurance Verification",
    daysInStage: 4,
    assignedCoordinator: {
      name: "Mark T.",
    },
    serviceZoneStatus: "in-zone",
    documents: [
      { name: "Referral Form", status: "Verified" },
      { name: "Insurance Card Copy", status: "Uploaded" },
    ],
    consents: [
      { name: "HIPAA Consent", signed: true, date: "2026-07-11T10:00:00Z" },
    ],
    communications: [],
    insurance: {
      payer: "Blue Cross",
      status: "Pending",
    }
  }
];
