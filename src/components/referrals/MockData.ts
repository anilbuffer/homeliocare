import { Referral } from "./types";

export const initialReferrals: Referral[] = [
  {
    id: "ref-001",
    clientName: "Eleanor Rigby",
    clientInitials: "ER",
    source: "Hospital",
    referringParty: "General Hospital Discharge",
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
    insurance: {
      payer: "Medicare",
      status: "Pending",
    }
  },
  {
    id: "ref-002",
    clientName: "John Doe",
    clientInitials: "JD",
    source: "Online Form",
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
      { id: "c2", timestamp: "2026-07-16T09:00:00Z", author: "Sarah Jenkins", type: "call", content: "Left voicemail." }
    ],
    nextAction: {
      description: "Follow up call",
      dueDate: "2026-07-16T15:00:00Z",
      isOverdue: true,
    }
  },
  {
    id: "ref-003",
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
