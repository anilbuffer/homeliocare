// src/lib/reports-mock-data.ts

export type ReportCategory = "Clinical" | "HR" | "Scheduling" | "Financial" | "Compliance" | "Custom Reports";

export interface ReportDefinition {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  chartType: "bar" | "line" | "donut" | "table" | "kpi";
  // The data structure depends on the chart type.
  // We'll use a generic any array for the mock data for simplicity,
  // but Recharts expects arrays of objects.
  data: any[]; 
  xAxisKey?: string;
  dataKeys?: { key: string; color: string; name?: string }[];
}

export const clinicalReports: ReportDefinition[] = [
  {
    id: "clin-1",
    title: "Care Outcomes",
    description: "Goal achievement rate and functional improvement trends.",
    category: "Clinical",
    chartType: "line",
    xAxisKey: "month",
    dataKeys: [
      { key: "goalsMet", color: "#0d9488", name: "Goals Met (%)" },
      { key: "functionalImprovement", color: "#3b82f6", name: "Functional Impr. (%)" },
    ],
    data: [
      { month: "Jan", goalsMet: 72, functionalImprovement: 65 },
      { month: "Feb", goalsMet: 75, functionalImprovement: 68 },
      { month: "Mar", goalsMet: 74, functionalImprovement: 67 },
      { month: "Apr", goalsMet: 81, functionalImprovement: 72 },
      { month: "May", goalsMet: 85, functionalImprovement: 78 },
      { month: "Jun", goalsMet: 88, functionalImprovement: 82 },
    ]
  },
  {
    id: "clin-2",
    title: "Hospital Readmissions",
    description: "Rate over time, by diagnosis and by caregiver.",
    category: "Clinical",
    chartType: "bar",
    xAxisKey: "month",
    dataKeys: [
      { key: "readmissionRate", color: "#ef4444", name: "Readmission Rate (%)" },
    ],
    data: [
      { month: "Jan", readmissionRate: 15 },
      { month: "Feb", readmissionRate: 14 },
      { month: "Mar", readmissionRate: 16 },
      { month: "Apr", readmissionRate: 12 },
      { month: "May", readmissionRate: 9 },
      { month: "Jun", readmissionRate: 7 },
    ]
  },
  {
    id: "clin-3",
    title: "Medication Errors",
    description: "Frequency, type, and trend of reported errors.",
    category: "Clinical",
    chartType: "donut",
    dataKeys: [
      { key: "value", color: "#000" } // Colors handled in donut renderer
    ],
    data: [
      { name: "Missed Dose", value: 45 },
      { name: "Wrong Time", value: 30 },
      { name: "Wrong Dose", value: 15 },
      { name: "Wrong Med", value: 10 },
    ]
  },
  {
    id: "clin-4",
    title: "Falls",
    description: "Fall rate by client risk level and time of day.",
    category: "Clinical",
    chartType: "bar",
    xAxisKey: "timeOfDay",
    dataKeys: [
      { key: "highRisk", color: "#ef4444", name: "High Risk" },
      { key: "medRisk", color: "#f59e0b", name: "Med Risk" },
      { key: "lowRisk", color: "#10b981", name: "Low Risk" },
    ],
    data: [
      { timeOfDay: "Morning", highRisk: 12, medRisk: 8, lowRisk: 2 },
      { timeOfDay: "Afternoon", highRisk: 15, medRisk: 10, lowRisk: 4 },
      { timeOfDay: "Evening", highRisk: 22, medRisk: 14, lowRisk: 5 },
      { timeOfDay: "Night", highRisk: 18, medRisk: 9, lowRisk: 3 },
    ]
  },
  {
    id: "clin-5",
    title: "Incident Trends",
    description: "Volume by type over time from Incident Reports.",
    category: "Clinical",
    chartType: "line",
    xAxisKey: "month",
    dataKeys: [
      { key: "falls", color: "#f59e0b", name: "Falls" },
      { key: "medErrors", color: "#ef4444", name: "Med Errors" },
      { key: "other", color: "#64748b", name: "Other" },
    ],
    data: [
      { month: "Jan", falls: 12, medErrors: 8, other: 4 },
      { month: "Feb", falls: 14, medErrors: 7, other: 5 },
      { month: "Mar", falls: 11, medErrors: 9, other: 6 },
      { month: "Apr", falls: 9, medErrors: 5, other: 3 },
      { month: "May", falls: 7, medErrors: 4, other: 2 },
      { month: "Jun", falls: 6, medErrors: 3, other: 2 },
    ]
  },
];

export const hrReports: ReportDefinition[] = [
  {
    id: "hr-1",
    title: "Attendance",
    description: "On-time percentage and call-off frequency.",
    category: "HR",
    chartType: "bar",
    xAxisKey: "month",
    dataKeys: [
      { key: "onTime", color: "#10b981", name: "On-Time %" },
      { key: "callOffs", color: "#f43f5e", name: "Call-Offs" },
    ],
    data: [
      { month: "Jan", onTime: 92, callOffs: 45 },
      { month: "Feb", onTime: 94, callOffs: 38 },
      { month: "Mar", onTime: 91, callOffs: 52 },
      { month: "Apr", onTime: 95, callOffs: 30 },
      { month: "May", onTime: 97, callOffs: 22 },
      { month: "Jun", onTime: 98, callOffs: 18 },
    ]
  },
  {
    id: "hr-2",
    title: "Turnover",
    description: "Rate over time, by role, and tenure.",
    category: "HR",
    chartType: "line",
    xAxisKey: "month",
    dataKeys: [
      { key: "rnTurnover", color: "#0ea5e9", name: "RN Turnover (%)" },
      { key: "hhaTurnover", color: "#8b5cf6", name: "HHA Turnover (%)" },
    ],
    data: [
      { month: "Jan", rnTurnover: 2.1, hhaTurnover: 5.4 },
      { month: "Feb", rnTurnover: 2.0, hhaTurnover: 5.1 },
      { month: "Mar", rnTurnover: 2.3, hhaTurnover: 6.2 },
      { month: "Apr", rnTurnover: 1.8, hhaTurnover: 4.8 },
      { month: "May", rnTurnover: 1.5, hhaTurnover: 4.2 },
      { month: "Jun", rnTurnover: 1.2, hhaTurnover: 3.5 },
    ]
  },
  {
    id: "hr-3",
    title: "Training Completion",
    description: "Compliance percentage by course and overdue count.",
    category: "HR",
    chartType: "bar",
    xAxisKey: "course",
    dataKeys: [
      { key: "completion", color: "#14b8a6", name: "Completion %" },
    ],
    data: [
      { course: "HIPAA", completion: 98 },
      { course: "Bloodborne", completion: 95 },
      { course: "Emergency", completion: 88 },
      { course: "Infection", completion: 92 },
    ]
  },
  {
    id: "hr-4",
    title: "Certifications",
    description: "Expiring/expired summary for agency staff.",
    category: "HR",
    chartType: "donut",
    dataKeys: [
      { key: "value", color: "#000" }
    ],
    data: [
      { name: "Valid", value: 85 },
      { name: "Expiring <30 Days", value: 10 },
      { name: "Expired", value: 5 },
    ]
  },
  {
    id: "hr-5",
    title: "Productivity",
    description: "Visits per caregiver and hours utilized vs. available.",
    category: "HR",
    chartType: "line",
    xAxisKey: "week",
    dataKeys: [
      { key: "utilized", color: "#8b5cf6", name: "Utilized Hours" },
      { key: "available", color: "#94a3b8", name: "Available Hours" },
    ],
    data: [
      { week: "W1", utilized: 1200, available: 1500 },
      { week: "W2", utilized: 1250, available: 1500 },
      { week: "W3", utilized: 1300, available: 1550 },
      { week: "W4", utilized: 1400, available: 1550 },
      { week: "W5", utilized: 1450, available: 1600 },
    ]
  },
];

export const schedulingReports: ReportDefinition[] = [
  {
    id: "sched-1",
    title: "Missed Visits",
    description: "Rate by reason, by caregiver, and by client.",
    category: "Scheduling",
    chartType: "donut",
    dataKeys: [
      { key: "value", color: "#000" }
    ],
    data: [
      { name: "Client Refused", value: 40 },
      { name: "Caregiver Sick", value: 35 },
      { name: "Weather", value: 15 },
      { name: "No Show", value: 10 },
    ]
  },
  {
    id: "sched-2",
    title: "Late Visits",
    description: "Frequency, average delay, and trends.",
    category: "Scheduling",
    chartType: "line",
    xAxisKey: "month",
    dataKeys: [
      { key: "lateCount", color: "#f59e0b", name: "Late Visits" },
    ],
    data: [
      { month: "Jan", lateCount: 120 },
      { month: "Feb", lateCount: 110 },
      { month: "Mar", lateCount: 135 },
      { month: "Apr", lateCount: 95 },
      { month: "May", lateCount: 80 },
      { month: "Jun", lateCount: 65 },
    ]
  },
  {
    id: "sched-3",
    title: "Coverage",
    description: "Unfilled shift rate over time, by region.",
    category: "Scheduling",
    chartType: "bar",
    xAxisKey: "region",
    dataKeys: [
      { key: "unfilled", color: "#ef4444", name: "Unfilled Shifts (%)" },
    ],
    data: [
      { region: "North", unfilled: 8 },
      { region: "South", unfilled: 12 },
      { region: "East", unfilled: 5 },
      { region: "West", unfilled: 15 },
    ]
  },
  {
    id: "sched-4",
    title: "Travel Time",
    description: "Average between visits, by caregiver, mileage totals.",
    category: "Scheduling",
    chartType: "line",
    xAxisKey: "month",
    dataKeys: [
      { key: "avgMinutes", color: "#0ea5e9", name: "Avg Travel (mins)" },
    ],
    data: [
      { month: "Jan", avgMinutes: 28 },
      { month: "Feb", avgMinutes: 27 },
      { month: "Mar", avgMinutes: 29 },
      { month: "Apr", avgMinutes: 25 },
      { month: "May", avgMinutes: 23 },
      { month: "Jun", avgMinutes: 21 },
    ]
  },
  {
    id: "sched-5",
    title: "Utilization",
    description: "Caregiver hours scheduled vs. capacity.",
    category: "Scheduling",
    chartType: "bar",
    xAxisKey: "role",
    dataKeys: [
      { key: "scheduled", color: "#8b5cf6", name: "Scheduled (%)" },
    ],
    data: [
      { role: "RN", scheduled: 88 },
      { role: "LPN", scheduled: 92 },
      { role: "HHA", scheduled: 75 },
      { role: "PT", scheduled: 85 },
    ]
  },
];

export const financialReports: ReportDefinition[] = [
  {
    id: "fin-1",
    title: "Revenue",
    description: "By payer, service line, and trend over time.",
    category: "Financial",
    chartType: "line",
    xAxisKey: "month",
    dataKeys: [
      { key: "revenue", color: "#10b981", name: "Revenue ($)" },
    ],
    data: [
      { month: "Jan", revenue: 150000 },
      { month: "Feb", revenue: 155000 },
      { month: "Mar", revenue: 162000 },
      { month: "Apr", revenue: 175000 },
      { month: "May", revenue: 182000 },
      { month: "Jun", revenue: 195000 },
    ]
  },
  {
    id: "fin-2",
    title: "Payroll",
    description: "Total cost and overtime cost trends.",
    category: "Financial",
    chartType: "bar",
    xAxisKey: "month",
    dataKeys: [
      { key: "base", color: "#3b82f6", name: "Base Pay" },
      { key: "overtime", color: "#f59e0b", name: "Overtime" },
    ],
    data: [
      { month: "Jan", base: 80000, overtime: 12000 },
      { month: "Feb", base: 82000, overtime: 11000 },
      { month: "Mar", base: 85000, overtime: 15000 },
      { month: "Apr", base: 88000, overtime: 9000 },
      { month: "May", base: 90000, overtime: 8000 },
      { month: "Jun", base: 92000, overtime: 6000 },
    ]
  },
  {
    id: "fin-3",
    title: "Profit Margin",
    description: "Revenue minus payroll/expenses, margin trend.",
    category: "Financial",
    chartType: "line",
    xAxisKey: "month",
    dataKeys: [
      { key: "margin", color: "#8b5cf6", name: "Margin (%)" },
    ],
    data: [
      { month: "Jan", margin: 15 },
      { month: "Feb", margin: 16 },
      { month: "Mar", margin: 14 },
      { month: "Apr", margin: 18 },
      { month: "May", margin: 20 },
      { month: "Jun", margin: 22 },
    ]
  },
  {
    id: "fin-4",
    title: "AR Aging",
    description: "Outstanding payments breakdown.",
    category: "Financial",
    chartType: "donut",
    dataKeys: [
      { key: "value", color: "#000" }
    ],
    data: [
      { name: "0-30 Days", value: 60 },
      { name: "31-60 Days", value: 25 },
      { name: "61-90 Days", value: 10 },
      { name: "90+ Days", value: 5 },
    ]
  },
  {
    id: "fin-5",
    title: "Claims",
    description: "Submission volume and denial rate trends.",
    category: "Financial",
    chartType: "bar",
    xAxisKey: "month",
    dataKeys: [
      { key: "submitted", color: "#0ea5e9", name: "Submitted" },
      { key: "denied", color: "#ef4444", name: "Denied" },
    ],
    data: [
      { month: "Jan", submitted: 450, denied: 45 },
      { month: "Feb", submitted: 480, denied: 42 },
      { month: "Mar", submitted: 510, denied: 55 },
      { month: "Apr", submitted: 540, denied: 38 },
      { month: "May", submitted: 560, denied: 30 },
      { month: "Jun", submitted: 600, denied: 25 },
    ]
  },
];

export const complianceReports: ReportDefinition[] = [
  {
    id: "comp-1",
    title: "HIPAA",
    description: "Training completion and policy acknowledgment.",
    category: "Compliance",
    chartType: "bar",
    xAxisKey: "department",
    dataKeys: [
      { key: "completion", color: "#10b981", name: "Completion %" },
    ],
    data: [
      { department: "Clinical", completion: 100 },
      { department: "Admin", completion: 98 },
      { department: "Billing", completion: 100 },
      { department: "HR", completion: 95 },
    ]
  },
  {
    id: "comp-2",
    title: "Training",
    description: "Agency-wide completion by required course.",
    category: "Compliance",
    chartType: "line",
    xAxisKey: "month",
    dataKeys: [
      { key: "compliance", color: "#0ea5e9", name: "Compliance (%)" },
    ],
    data: [
      { month: "Jan", compliance: 85 },
      { month: "Feb", compliance: 87 },
      { month: "Mar", compliance: 86 },
      { month: "Apr", compliance: 92 },
      { month: "May", compliance: 95 },
      { month: "Jun", compliance: 97 },
    ]
  },
  {
    id: "comp-3",
    title: "Documentation",
    description: "Chart audit scores and completeness rate.",
    category: "Compliance",
    chartType: "bar",
    xAxisKey: "month",
    dataKeys: [
      { key: "score", color: "#8b5cf6", name: "Avg Score (%)" },
    ],
    data: [
      { month: "Jan", score: 88 },
      { month: "Feb", score: 90 },
      { month: "Mar", score: 89 },
      { month: "Apr", score: 94 },
      { month: "May", score: 96 },
      { month: "Jun", score: 98 },
    ]
  },
  {
    id: "comp-4",
    title: "Audits",
    description: "QA score trends and findings by category.",
    category: "Compliance",
    chartType: "donut",
    dataKeys: [
      { key: "value", color: "#000" }
    ],
    data: [
      { name: "Pass", value: 85 },
      { name: "Minor Findings", value: 12 },
      { name: "Major Findings", value: 3 },
    ]
  },
  {
    id: "comp-5",
    title: "Licenses",
    description: "Expiration timeline and renewal completion rate.",
    category: "Compliance",
    chartType: "bar",
    xAxisKey: "status",
    dataKeys: [
      { key: "count", color: "#f59e0b", name: "Licenses" },
    ],
    data: [
      { status: "Active", count: 145 },
      { status: "Exp. < 30 Days", count: 12 },
      { status: "Exp. < 60 Days", count: 24 },
      { status: "Expired", count: 2 },
    ]
  },
];

export const allPrebuiltReports = [
  ...clinicalReports,
  ...hrReports,
  ...schedulingReports,
  ...financialReports,
  ...complianceReports,
];

export interface SavedReport {
  id: string;
  name: string;
  creator: string;
  dataSource: string;
  lastRunDate: string;
}

export const mockSavedReports: SavedReport[] = [
  {
    id: "sr-1",
    name: "Q2 Overtime Analysis",
    creator: "Sarah Jenkins",
    dataSource: "Caregivers, Visits",
    lastRunDate: "2023-07-15T10:30:00Z"
  },
  {
    id: "sr-2",
    name: "Patient Fall Risk Matrix",
    creator: "Dr. Alana Smith",
    dataSource: "Clients, Incidents",
    lastRunDate: "2023-07-14T09:15:00Z"
  },
  {
    id: "sr-3",
    name: "Medicare Denials YTD",
    creator: "Tom Billing",
    dataSource: "Claims",
    lastRunDate: "2023-07-10T14:45:00Z"
  }
];

export interface ScheduledReport {
  id: string;
  name: string;
  schedule: string;
  recipients: string;
  format: "PDF" | "Excel" | "CSV";
  nextRunDate: string;
  active: boolean;
}

export const mockScheduledReports: ScheduledReport[] = [
  {
    id: "sch-1",
    name: "Weekly EVV Compliance",
    schedule: "Weekly (Mon, 8:00 AM)",
    recipients: "management@homeliocare.com",
    format: "Excel",
    nextRunDate: "2023-07-24T08:00:00Z",
    active: true
  },
  {
    id: "sch-2",
    name: "Monthly Revenue Summary",
    schedule: "Monthly (1st, 9:00 AM)",
    recipients: "finance@homeliocare.com, ceo@homeliocare.com",
    format: "PDF",
    nextRunDate: "2023-08-01T09:00:00Z",
    active: true
  },
  {
    id: "sch-3",
    name: "Daily Missed Visits Alert",
    schedule: "Daily (5:00 PM)",
    recipients: "scheduling@homeliocare.com",
    format: "CSV",
    nextRunDate: "2023-07-17T17:00:00Z",
    active: false
  }
];
