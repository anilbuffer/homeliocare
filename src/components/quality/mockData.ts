export type AuditType = 'Chart Audit' | 'Visit Audit' | 'Documentation Audit' | 'Care Plan Audit' | 'Medication Audit';
export type AuditStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';

export interface Audit {
  id: string;
  type: AuditType;
  subjectName: string;
  subjectType: 'Client' | 'Caregiver';
  subjectId: string; // Links to client or caregiver profile
  assignedSupervisor: string;
  dueDate: string;
  status: AuditStatus;
  score?: number;
  avatarUrl: string;
}

export interface Finding {
  id: string;
  description: string;
  severity: 'Minor' | 'Major' | 'Critical';
  sourceAuditId: string;
  sourceAuditType: AuditType;
  owner: string;
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Closed' | 'Overdue';
}

export interface ChecklistItem {
  id: string;
  question: string;
  status: 'Pass' | 'Fail' | 'N-A' | null;
  comment?: string;
}

export const mockAudits: Audit[] = [
  {
    id: "AUD-001",
    type: "Chart Audit",
    subjectName: "Eleanor Vance",
    subjectType: "Client",
    subjectId: "CLI-001",
    assignedSupervisor: "Sarah Jenkins",
    dueDate: "2026-07-20",
    status: "Completed",
    score: 95,
    avatarUrl: "https://i.pravatar.cc/150?u=eleanor"
  },
  {
    id: "AUD-002",
    type: "Visit Audit",
    subjectName: "Marcus Johnson",
    subjectType: "Caregiver",
    subjectId: "CG-042",
    assignedSupervisor: "David Kim",
    dueDate: "2026-07-15",
    status: "Overdue",
    avatarUrl: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    id: "AUD-003",
    type: "Medication Audit",
    subjectName: "Robert Chen",
    subjectType: "Client",
    subjectId: "CLI-003",
    assignedSupervisor: "Sarah Jenkins",
    dueDate: "2026-07-18",
    status: "In Progress",
    avatarUrl: "https://i.pravatar.cc/150?u=robert"
  },
  {
    id: "AUD-004",
    type: "Care Plan Audit",
    subjectName: "Maria Garcia",
    subjectType: "Client",
    subjectId: "CLI-005",
    assignedSupervisor: "Emily Thorne",
    dueDate: "2026-07-25",
    status: "Scheduled",
    avatarUrl: "https://i.pravatar.cc/150?u=maria"
  }
];

export const mockFindings: Finding[] = [
  {
    id: "FND-101",
    description: "Missing signature on initial assessment",
    severity: "Major",
    sourceAuditId: "AUD-001",
    sourceAuditType: "Chart Audit",
    owner: "David Kim",
    dueDate: "2026-07-18",
    status: "Overdue"
  },
  {
    id: "FND-102",
    description: "Care plan review overdue by 5 days",
    severity: "Critical",
    sourceAuditId: "AUD-005",
    sourceAuditType: "Care Plan Audit",
    owner: "Sarah Jenkins",
    dueDate: "2026-07-22",
    status: "In Progress"
  },
  {
    id: "FND-103",
    description: "Incomplete visit note for morning shift",
    severity: "Minor",
    sourceAuditId: "AUD-002",
    sourceAuditType: "Documentation Audit",
    owner: "Marcus Johnson",
    dueDate: "2026-07-20",
    status: "Open"
  }
];

export const mockChecklists: Record<AuditType, ChecklistItem[]> = {
  "Chart Audit": [
    { id: "c1", question: "Is the initial assessment present and signed?", status: null },
    { id: "c2", question: "Are all consent forms signed and dated by client/proxy?", status: null },
    { id: "c3", question: "Is the emergency contact information current?", status: null },
    { id: "c4", question: "Are advanced directives on file (if applicable)?", status: null }
  ],
  "Visit Audit": [
    { id: "v1", question: "Did the caregiver clock in/out within 5 minutes of scheduled time?", status: null },
    { id: "v2", question: "Does GPS location match the client's home address?", status: null },
    { id: "v3", question: "Were all assigned tasks marked as complete?", status: null }
  ],
  "Documentation Audit": [
    { id: "d1", question: "Are visit notes entered within 24 hours of shift end?", status: null },
    { id: "d2", question: "Do notes describe specific care provided rather than generic statements?", status: null },
    { id: "d3", question: "Is there any evidence of copy-pasting from previous notes?", status: null }
  ],
  "Care Plan Audit": [
    { id: "cp1", question: "Has the care plan been reviewed within the required timeframe (e.g. 60 days)?", status: null },
    { id: "cp2", question: "Do goals and interventions match the current diagnosis?", status: null },
    { id: "cp3", question: "Is the care plan signed by the reviewing supervisor?", status: null }
  ],
  "Medication Audit": [
    { id: "m1", question: "Does the MAR match the current physician orders?", status: null },
    { id: "m2", question: "Are all administered medications signed off correctly?", status: null },
    { id: "m3", question: "Is PRN medication use documented with reason and effectiveness?", status: null }
  ]
};
