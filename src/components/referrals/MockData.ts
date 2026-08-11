import { Referral } from "./types";

export const initialReferrals: Referral[] = [
  {
    id: "ref-ew-001",
    workflowType: "Referral",
    clientName: "Eleanor Ruth Whitfield",
    clientInitials: "EW",
    source: "Hospital Discharge",
    sourceDetails: "Cedar Falls Regional Hospital",
    referringParty: "Discharge Planner, Denise Okafor, RN Case Manager",
    intakeNotes: "Patient discharging in 48 hrs. s/p right hip ORIF (fall at home), early-stage vascular dementia, hypertension, osteoarthritis. Mobility: Walker-assisted, fall risk (high). Needs care in place before discharge.",
    dateReceived: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    stage: "Insurance Verification",
    authorizationStatus: "Pending",
    clinicalReviewStatus: "Pending",
    daysInStage: 0,
    assignedCoordinator: {
      name: "Sarah Jenkins",
      avatarUrl: "https://i.pravatar.cc/150?u=sarah",
    },
    dischargeDeadline: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // 48 hours from now
    urgency: "High",
    serviceZoneStatus: "in-zone",
    serviceZoneName: "Chester County",
    documents: [
      { name: "Discharge Summary", status: "Verified" },
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
        author: "Meg Whitfield-Cho (Daughter)",
        type: "call",
        content: "Caller is the daughter, sounds overwhelmed. Mom (Eleanor) fell at home, broke her hip, had surgery Tuesday. Hospital says she can go home Thursday but can't be alone. Daughter works full time, can't move in. Brother is in Chicago, not much help day-to-day. Wants care to start the day Mom gets home. Confirmed Medicaid (CHC/Keystone First) — daughter isn't sure of authorization status, will need to verify. Cedar Falls is in our service area (Chester County).",
        summary: "• Hours/week requested: 6 hrs/day, 7 days/week initially (reassess after 2 weeks)\n• Payment source: Medicaid — pending authorization verification\n• Outcome: Qualified → Assessment scheduled for tomorrow AM (before discharge)"
      }
    ],
    insurance: {
      payer: "Medicaid — PA Community HealthChoices, MCO: Keystone First CHC",
      status: "Verified",
    },
    demographics: {
      gender: "Female",
      address: "214 Maple Ridge Lane, Cedar Falls, PA 19087",
      phone: "(610) 555-0148",
      primaryContactName: "Margaret \"Meg\" Whitfield-Cho",
      primaryContactRelationship: "Daughter / POA",
      primaryContactPhone: "(610) 555-0192",
      primaryContactEmail: "meg.wcho@gmail.com"
    },
    diagnosis: "s/p right hip ORIF (fall at home), early-stage vascular dementia, hypertension, osteoarthritis",
    emergencyContact: "David Whitfield (Son) - (215) 555-0873",
    assessment: {
      status: "Completed",
      scheduledDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
    }
  },
  {
    id: "c-1",
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
