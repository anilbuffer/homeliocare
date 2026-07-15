export type IncidentSeverity = "Low" | "Medium" | "High" | "Critical";

export type IncidentStatus = 
  | "Reported" 
  | "Assigned" 
  | "Investigated" 
  | "Corrective Action" 
  | "Closed";

export type IncidentCategory = 
  | "Medication Error"
  | "Fall"
  | "Abuse"
  | "Neglect"
  | "Missed Visit"
  | "Late Visit"
  | "Injury"
  | "Aggressive Behavior"
  | "Property Damage"
  | "Theft"
  | "Vehicle Accident"
  | "Needle Stick"
  | "HIPAA Breach"
  | "Complaint"
  | "Emergency"
  | "Hospital Transfer"
  | "Death"
  | "Infection"
  | "Documentation Error"
  | "Other";

export interface PersonInvolved {
  id: string;
  name: string;
  role: "Client" | "Caregiver" | "Witness" | "Other";
  avatar?: string;
  contactInfo?: string;
}

export interface CorrectiveAction {
  id: string;
  description: string;
  ownerName: string;
  dueDate: string;
  status: "Pending" | "Completed";
  completedDate?: string;
}

export interface WorkflowStageData {
  stage: IncidentStatus;
  completedBy?: string;
  completedAt?: string;
  slaTargetHours?: number; // SLA timer limit from start of stage
  startedAt?: string;
}

export interface RegulatoryReport {
  required: boolean;
  agency?: "State Health Dept" | "Adult Protective Services" | "OCR/HIPAA" | "Other";
  deadline?: string;
  submittedDate?: string;
  confirmationNumber?: string;
  status: "Not Required" | "Pending" | "Submitted" | "Overdue";
}

export interface LinkedVisit {
  visitId: string;
  date: string;
  caregiverName: string;
  clientName: string;
  clockInTime?: string;
  clockOutTime?: string;
  gpsVerified: boolean;
}

export interface Incident {
  id: string;
  type: IncidentCategory;
  severity: IncidentSeverity;
  status: IncidentStatus;
  reportedDate: string;
  incidentDate: string;
  location: string;
  description: string;
  
  peopleInvolved: PersonInvolved[];
  witnessStatements?: { author: string; text: string; date: string }[];
  attachments?: { name: string; url: string; type: "photo" | "document" }[];
  
  workflow: WorkflowStageData[];
  
  rootCauseFactors?: string[];
  rootCauseSummary?: string;
  correctiveActions?: CorrectiveAction[];
  
  notificationLog?: { notified: string; date: string; method: string }[];
  
  regulatoryReport: RegulatoryReport;
  
  linkedVisit?: LinkedVisit;
  
  supervisorAlert: boolean;
  isRestricted: boolean; // For sensitive types
  
  patternDetected?: string; // e.g. "3rd fall in 30 days"
  
  investigatorName?: string;
  signOff?: { name: string; date: string };
}
