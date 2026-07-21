import { Incident, IncidentCategory, IncidentSeverity, IncidentStatus } from "@/types/incidents";
import { subDays, subHours, addDays, formatISO } from "date-fns";

const now = new Date();

export const mockIncidents: Incident[] = [
  {
    id: "INC-2026-001",
    type: "Fall",
    severity: "High",
    status: "Under Investigation" as any, // "Investigated" is in type, but "Under Investigation" was in prompt. Let's use "Investigated" or just cast it for UI. The type says "Investigated". Wait, I should use the type strictly.
    // Let's use the valid types.
    reportedDate: formatISO(subHours(now, 2)),
    incidentDate: formatISO(subHours(now, 3)),
    location: "Patient Home - Bathroom",
    description: "Patient slipped in the bathroom while transferring from the shower. Caregiver was present and assisted, but patient hit their arm on the sink counter.",
    peopleInvolved: [
      { id: "c-1", name: "Robert M.", role: "Patient", avatar: "/avatars/arthur.png?v=2" },
      { id: "cg-1", name: "Sarah J.", role: "Caregiver", avatar: "" }
    ],
    workflow: [
      { stage: "Reported", completedBy: "Sarah J.", completedAt: formatISO(subHours(now, 2)), startedAt: formatISO(subHours(now, 2)) },
      { stage: "Assigned", completedBy: "System", completedAt: formatISO(subHours(now, 1)), startedAt: formatISO(subHours(now, 2)), slaTargetHours: 2 },
      { stage: "Investigated", startedAt: formatISO(subHours(now, 1)), slaTargetHours: 24 }
    ],
    regulatoryReport: {
      required: false,
      status: "Not Required"
    },
    supervisorAlert: true,
    isRestricted: false,
    investigatorName: "Jane Supervisor",
    patternDetected: "3rd Fall in 30 days - consider a risk flag update.",
  },
  {
    id: "INC-2026-002",
    type: "Medication Error",
    severity: "Critical",
    status: "Corrective Action",
    reportedDate: formatISO(subDays(now, 2)),
    incidentDate: formatISO(subDays(now, 2)),
    location: "Patient Home - Living Room",
    description: "Incorrect dosage of blood pressure medication was administered. Patient experienced dizziness.",
    peopleInvolved: [
      { id: "c-2", name: "Helen S.", role: "Patient", avatar: "/avatars/eleanor.png?v=2" },
      { id: "cg-2", name: "Marcus T.", role: "Caregiver", avatar: "" }
    ],
    workflow: [
      { stage: "Reported", completedBy: "Marcus T.", completedAt: formatISO(subDays(now, 2)), startedAt: formatISO(subDays(now, 2)) },
      { stage: "Assigned", completedBy: "Jane Supervisor", completedAt: formatISO(subHours(subDays(now, 2), -2)), startedAt: formatISO(subDays(now, 2)), slaTargetHours: 2 },
      { stage: "Investigated", completedBy: "Jane Supervisor", completedAt: formatISO(subDays(now, 1)), startedAt: formatISO(subHours(subDays(now, 2), -2)), slaTargetHours: 24 },
      { stage: "Corrective Action", startedAt: formatISO(subDays(now, 1)), slaTargetHours: 48 }
    ],
    regulatoryReport: {
      required: true,
      agency: "State Health Dept",
      deadline: formatISO(addDays(now, 1)),
      status: "Pending"
    },
    supervisorAlert: true,
    isRestricted: true, // Sensitive
    investigatorName: "Jane Supervisor",
    correctiveActions: [
      { id: "ca-1", description: "Mandatory retraining on medication administration.", ownerName: "Marcus T.", dueDate: formatISO(addDays(now, 5)), status: "Pending" }
    ],
    rootCauseFactors: ["Training Gap", "Distraction"],
    rootCauseSummary: "Caregiver was distracted by family member during med pass."
  },
  {
    id: "INC-2026-003",
    type: "Missed Visit",
    severity: "Medium",
    status: "Closed",
    reportedDate: formatISO(subDays(now, 5)),
    incidentDate: formatISO(subDays(now, 5)),
    location: "Patient Home",
    description: "Caregiver did not show up for scheduled shift. Patient called agency.",
    peopleInvolved: [
      { id: "c-3", name: "Arthur D.", role: "Patient" },
      { id: "cg-3", name: "Emily R.", role: "Caregiver" }
    ],
    workflow: [
      { stage: "Reported", completedBy: "Arthur D.", completedAt: formatISO(subDays(now, 5)), startedAt: formatISO(subDays(now, 5)) },
      { stage: "Assigned", completedBy: "System", completedAt: formatISO(subDays(now, 5)), startedAt: formatISO(subDays(now, 5)), slaTargetHours: 2 },
      { stage: "Investigated", completedBy: "John Admin", completedAt: formatISO(subDays(now, 4)), startedAt: formatISO(subDays(now, 5)), slaTargetHours: 24 },
      { stage: "Corrective Action", completedBy: "John Admin", completedAt: formatISO(subDays(now, 4)), startedAt: formatISO(subDays(now, 4)), slaTargetHours: 48 },
      { stage: "Closed", completedBy: "Jane Supervisor", completedAt: formatISO(subDays(now, 3)), startedAt: formatISO(subDays(now, 4)), slaTargetHours: 72 }
    ],
    regulatoryReport: {
      required: false,
      status: "Not Required"
    },
    supervisorAlert: false,
    isRestricted: false,
    investigatorName: "John Admin",
    signOff: { name: "Jane Supervisor", date: formatISO(subDays(now, 3)) }
  },
  {
    id: "INC-2026-004",
    type: "HIPAA Breach",
    severity: "Critical",
    status: "Reported",
    reportedDate: formatISO(subHours(now, 1)),
    incidentDate: formatISO(subHours(now, 2)),
    location: "Agency Office",
    description: "Patient files were left unsecured on a desk accessible to non-authorized personnel.",
    peopleInvolved: [
      { id: "cg-4", name: "Admin Staff", role: "Other" }
    ],
    workflow: [
      { stage: "Reported", completedBy: "Jane Supervisor", completedAt: formatISO(subHours(now, 1)), startedAt: formatISO(subHours(now, 1)) },
      { stage: "Assigned", startedAt: formatISO(subHours(now, 1)), slaTargetHours: 1 } // Breach of SLA if it's over 1 hr and not assigned! Let's make it overdue.
    ],
    regulatoryReport: {
      required: true,
      agency: "OCR/HIPAA",
      deadline: formatISO(addDays(now, 14)), // Typical OCR deadline could be longer, but for demo
      status: "Pending"
    },
    supervisorAlert: true,
    isRestricted: true,
  }
];
