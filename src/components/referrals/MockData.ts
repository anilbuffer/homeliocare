import { Referral } from "./types";

export const initialReferrals: Referral[] = [
  {
    id: "ref-ew-001",
    workflowType: "Referral",
    clientName: "Sarah Connor",
    clientInitials: "SC",
    source: "Hospital Discharge",
    sourceDetails: "Los Angeles Medical Center",
    referringParty: "Dr. Miles Dyson",
    intakeNotes: "Patient requires support with ADLs due to severe flare-up of Rheumatoid Arthritis. Mobility: Requires assistance. Pain management plan established.",
    dateReceived: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    stage: "Admitted",
    authorizationStatus: "Approved",
    clinicalReviewStatus: "Completed",
    daysInStage: 0,
    assignedCoordinator: {
      name: "Sarah Jenkins",
      avatarUrl: "https://i.pravatar.cc/150?u=sarah",
    },
    dischargeDeadline: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // 48 hours from now
    urgency: "High",
    serviceZoneStatus: "in-zone",
    serviceZoneName: "Los Angeles County",
    documents: [
      { name: "Rheumatology Report", status: "Verified" },
      { name: "Physician Orders", status: "Verified" },
      { name: "Intake Inquiry Form", status: "Verified" }
    ],
    consents: [
      { name: "HIPAA Consent", signed: true, date: new Date().toISOString() },
      { name: "Service Agreement", signed: true, date: new Date().toISOString() }
    ],
    communications: [
      {
        id: "c-ew-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
        author: "John Connor (Son)",
        type: "call",
        content: "Caller is the son. Mom (Sarah) has severe arthritis flare-ups. Needs help with mobility and daily tasks. Wants care to start ASAP. Confirmed Medicare.",
        summary: "• Hours/week requested: 4 hrs/day, 5 days/week initially\n• Payment source: Medicare — pending authorization verification\n• Outcome: Qualified → Assessment scheduled for tomorrow AM"
      }
    ],
    insurance: {
      payer: "Medicare Part B",
      status: "Verified",
    },
    demographics: {
      gender: "Female",
      address: "909 Cybernetics Way, Los Angeles, CA 90012",
      phone: "(310) 555-0148",
      primaryContactName: "John Connor",
      primaryContactRelationship: "Son / POA",
      primaryContactPhone: "(310) 555-0192",
      primaryContactEmail: "s.connor@email.com"
    },
    diagnosis: "Severe Rheumatoid Arthritis, managing chronic pain",
    emergencyContact: "Kyle Reese (Friend) - (215) 555-0873",
    assessment: {
      status: "Completed",
      scheduledDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
    }
  },
  {
    id: "c-1",
    workflowType: "Referral",
    clientName: "Eleanor Ruth Whitfield",
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
      { name: "Referral Form", status: "Verified" },
      { name: "Physician Orders", status: "Verified" },
      { name: "Intake Inquiry Form", status: "Verified" }
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
    clientName: "James Doe",
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
    documents: [
      { name: "Intake Inquiry Form", status: "Verified" }
    ],
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
    clientName: "Martha Smith",
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
      { name: "Insurance Card Copy", status: "Verified" },
      { name: "Intake Inquiry Form", status: "Verified" }
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
