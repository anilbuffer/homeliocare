export interface RestrictedIncident {
  id: string;
  client: string;
  date: string;
  type: string;
  notificationChainStatus: string;
  stateReportingDeadline: number; // minutes remaining
  investigationStatus: "Open" | "Under Review" | "Pending Sign-off";
}

export const mockRestrictedIncidents: RestrictedIncident[] = [
  {
    id: "inc-104",
    client: "Evelyn Carter",
    date: "2026-07-29T08:30:00Z",
    type: "Unexplained Injury (Possible Abuse)",
    notificationChainStatus: "Executive Director Notified",
    stateReportingDeadline: 14 * 60, // 14 hours
    investigationStatus: "Under Review",
  },
  {
    id: "inc-112",
    client: "Marcus Vance",
    date: "2026-07-28T14:15:00Z",
    type: "HIPAA Breach (Lost Device)",
    notificationChainStatus: "Privacy Officer Notified",
    stateReportingDeadline: 59 * 24 * 60, // ~59 days left for HHS
    investigationStatus: "Open",
  }
];

export interface StateDeadlineIncident {
  id: string;
  title: string;
  severity: "High" | "Critical";
  deadlineMinutes: number; // negative means overdue
  assignedTo: string;
}

export const mockStateDeadlines: StateDeadlineIncident[] = [
  {
    id: "dead-01",
    title: "State Report: Unexplained Injury",
    severity: "Critical",
    deadlineMinutes: 14 * 60,
    assignedTo: "David Chen",
  },
  {
    id: "dead-02",
    title: "Medication Error with ER Visit",
    severity: "High",
    deadlineMinutes: 3 * 24 * 60, // 3 days
    assignedTo: "Rachel Miller, RN",
  }
];

export const mockQualityTrends = [
  { month: "Jan", falls: 4, hospitalizations: 2, complaints: 1 },
  { month: "Feb", falls: 3, hospitalizations: 1, complaints: 2 },
  { month: "Mar", falls: 5, hospitalizations: 2, complaints: 0 },
  { month: "Apr", falls: 2, hospitalizations: 1, complaints: 1 },
  { month: "May", falls: 4, hospitalizations: 3, complaints: 3 },
  { month: "Jun", falls: 3, hospitalizations: 1, complaints: 1 },
];

export const mockPatternAlerts = [
  "3 falls involving the same caregiver (John D.) this month.",
  "Spike in weekend medication errors (+15%) compared to Q1.",
  "2 formal grievances related to late arrivals in the past 14 days."
];
