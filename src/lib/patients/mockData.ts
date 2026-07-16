export interface Patient {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Hospitalized" | "Discharged";
  age: number;
  address: string;
  primaryDiagnosis: string;
  riskLevel: "Low" | "Medium" | "High";
  avatarUrl?: string;
  
  demographics: {
    dob: string;
    gender: string;
    phone: string;
    email: string;
    preferredLanguage: string;
    emergencyContacts: Array<{
      name: string;
      relation: string;
      phone: string;
    }>;
  };
  
  insurance: {
    primary: string;
    secondary?: string;
    policyNumber: string;
    groupNumber: string;
    authorizationStatus: string;
  };

  careTeam: {
    pcp: string;
    specialists: string[];
    caseManager: { name: string; avatarUrl?: string };
    primaryCaregivers: Array<{ name: string; avatarUrl?: string }>;
  };

  riskSummary: {
    fallRisk: { level: "Low" | "Medium" | "High"; lastAssessment: string };
    medicationRisk: { level: "Low" | "Medium" | "High"; lastAssessment: string };
    cognitiveStatus: { level: "Low" | "Medium" | "High"; lastAssessment: string };
  };

  recentActivity: Array<{
    id: string;
    type: "visit" | "medication" | "incident" | "document" | "note";
    title: string;
    timestamp: string;
  }>;

  carePlan?: {
    approval: {
      signer: string;
      date: string;
    };
    problems: Array<{
      id: string;
      title: string;
      targetDate: string;
      status: "On track" | "At risk";
    }>;
    tasks: Array<{
      id: string;
      task: string;
      frequency: string;
      assigned: string;
      lastCompleted: string;
      nextDue: string;
    }>;
    versionHistory: {
      revisions: number;
    };
  };

  visits?: {
    upcoming: Array<{
      id: string;
      date: string;
      time: string;
      staff: string;
      duration: string;
      status: "pending";
      type: "Scheduled";
    }>;
    history: Array<{
      id: string;
      date: string;
      time: string;
      staff: string;
      duration: string;
      status: "verified" | "flagged";
      type: "Completed" | "Late" | "Missed";
    }>;
  };

  medications?: {
    scheduled: Array<{
      id: string;
      name: string;
      prescriber: string;
      dosage: string;
      frequency: string;
      started: string;
    }>;
    prn: Array<{
      id: string;
      name: string;
      prescriber: string;
      dosage: string;
      frequency: string;
      started: string;
    }>;
    mar: {
      dates: string[];
      am: Array<"taken" | "missed" | "pending" | "na">;
      noon: Array<"taken" | "missed" | "pending" | "na">;
      pm: Array<"taken" | "missed" | "pending" | "na">;
      night: Array<"taken" | "missed" | "pending" | "na">;
    };
  };

  documents?: {
    intake: Array<{ id: string; name: string; author: string; date: string; size: string; type: "pdf" | "img" }>;
    consents: Array<{ id: string; name: string; author: string; date: string; size: string; type: "pdf" | "img" }>;
    clinical: Array<{ id: string; name: string; author: string; date: string; size: string; type: "pdf" | "img" }>;
    insurance: Array<{ id: string; name: string; author: string; date: string; size: string; type: "pdf" | "img" }>;
    orders: Array<{ id: string; name: string; author: string; date: string; size: string; type: "pdf" | "img" }>;
  };

  billing?: {
    authorization: {
      used: number;
      total: number;
    };
    balance: number;
    claims: Array<{
      id: string;
      serviceDates: string;
      payer: string;
      amount: string;
      status: "Draft" | "Pending" | "Paid";
    }>;
  };

  communication?: {
    familyThread: Array<{
      id: string;
      sender: string;
      timestamp: string;
      message: string;
      direction: "inbound" | "outbound";
    }>;
    logs: Array<{
      id: string;
      type: "Call in" | "Call out" | "SMS in" | "SMS out";
      contact: string;
      duration?: string;
      timestamp: string;
      summary: string;
    }>;
    internalNotes: Array<{
      id: string;
      author: string;
      timestamp: string;
      note: string;
    }>;
  };
}

export const mockPatients: Record<string, Patient> = {
  "c-1": {
    id: "c-1",
    name: "Eleanor Vance",
    status: "Active",
    age: 82,
    address: "142 Maple Street, Hillside, NJ 07205",
    primaryDiagnosis: "Congestive Heart Failure (CHF)",
    riskLevel: "High",
    avatarUrl: "/avatars/eleanor.png?v=2",
    
    demographics: {
      dob: "1944-03-12",
      gender: "Female",
      phone: "(555) 234-9812",
      email: "eleanor.vance44@email.com",
      preferredLanguage: "English",
      emergencyContacts: [
        { name: "Robert Vance", relation: "Son", phone: "(555) 789-0123" },
        { name: "Sarah Vance", relation: "Daughter-in-law", phone: "(555) 789-0124" }
      ]
    },
    
    insurance: {
      primary: "Medicare Part A & B",
      secondary: "AARP Supplemental",
      policyNumber: "MCR-9842100",
      groupNumber: "GRP-120",
      authorizationStatus: "Approved (Valid through 12/31/2026)"
    },

    careTeam: {
      pcp: "Dr. Amanda Chen",
      specialists: ["Dr. Robert Patel (Cardiology)"],
      caseManager: { name: "Maria Garcia, RN", avatarUrl: "https://i.pravatar.cc/150?u=maria" },
      primaryCaregivers: [
        { name: "David Kim", avatarUrl: "https://i.pravatar.cc/150?u=david" },
        { name: "Jessica Smith", avatarUrl: "https://i.pravatar.cc/150?u=jessica" }
      ]
    },

    riskSummary: {
      fallRisk: { level: "High", lastAssessment: "2026-06-15" },
      medicationRisk: { level: "Medium", lastAssessment: "2026-06-15" },
      cognitiveStatus: { level: "Low", lastAssessment: "2026-01-10" }
    },

    recentActivity: [
      { id: "a1", type: "visit", title: "Visit completed by David Kim", timestamp: "2026-07-09T10:30:00Z" },
      { id: "a2", type: "medication", title: "Morning meds administered", timestamp: "2026-07-09T08:15:00Z" },
      { id: "a3", type: "document", title: "New Cardiology Report uploaded", timestamp: "2026-07-08T14:20:00Z" },
      { id: "a4", type: "incident", title: "Slight dizziness reported", timestamp: "2026-07-05T09:00:00Z" }
    ],

    carePlan: {
      approval: { signer: "Dr. Alan Park", date: "Oct 04, 2025" },
      problems: [
        { id: "p1", title: "Congestive heart failure \u2014 fluid overload risk", targetDate: "Dec 31, 2025", status: "On track" },
        { id: "p2", title: "Type 2 Diabetes \u2014 glycemic control", targetDate: "Nov 15, 2025", status: "At risk" },
        { id: "p3", title: "Fall prevention", targetDate: "Ongoing", status: "On track" }
      ],
      tasks: [
        { id: "t1", task: "Vital signs check", frequency: "Every visit", assigned: "Maya Alvarez", lastCompleted: "Today", nextDue: "Tomorrow, 9 AM" },
        { id: "t2", task: "Medication administration", frequency: "BID", assigned: "Rotating", lastCompleted: "Today, 8 AM", nextDue: "Today, 6 PM" },
        { id: "t3", task: "Weight & I/O log", frequency: "Daily", assigned: "Maya Alvarez", lastCompleted: "Today", nextDue: "Tomorrow" },
        { id: "t4", task: "Bath / hygiene assist", frequency: "3x/week", assigned: "Maya Alvarez", lastCompleted: "Yesterday", nextDue: "Wednesday" },
        { id: "t5", task: "Nurse cardiac assessment", frequency: "Weekly", assigned: "Sarah Kim, RN", lastCompleted: "Sep 30", nextDue: "Oct 07" }
      ],
      versionHistory: { revisions: 3 }
    },

    visits: {
      upcoming: [
        { id: "v1", date: "Oct 08", time: "9:00 AM", staff: "Maya Alvarez", duration: "2h", status: "pending", type: "Scheduled" },
        { id: "v2", date: "Oct 08", time: "5:00 PM", staff: "Jordan Reed", duration: "1h 30m", status: "pending", type: "Scheduled" }
      ],
      history: [
        { id: "v3", date: "Oct 07", time: "9:00 AM", staff: "Maya Alvarez", duration: "2h 15m", status: "verified", type: "Completed" },
        { id: "v4", date: "Oct 06", time: "9:00 AM", staff: "Maya Alvarez", duration: "2h", status: "verified", type: "Completed" },
        { id: "v5", date: "Oct 05", time: "9:00 AM", staff: "Jordan Reed", duration: "1h 50m", status: "flagged", type: "Late" },
        { id: "v6", date: "Oct 04", time: "9:00 AM", staff: "Maya Alvarez", duration: "2h 05m", status: "verified", type: "Completed" },
        { id: "v7", date: "Oct 03", time: "9:00 AM", staff: "Maya Alvarez", duration: "0m", status: "flagged", type: "Missed" }
      ]
    },

    medications: {
      scheduled: [
        { id: "m1", name: "Metformin", prescriber: "Dr. Alan Park", dosage: "500 mg", frequency: "Twice daily with meals", started: "Jan 08, 2024" },
        { id: "m2", name: "Lisinopril", prescriber: "Dr. Rina Osei", dosage: "10 mg", frequency: "Once daily AM", started: "Mar 12, 2024" },
        { id: "m3", name: "Furosemide", prescriber: "Dr. Rina Osei", dosage: "20 mg", frequency: "Once daily AM", started: "May 04, 2024" },
        { id: "m4", name: "Atorvastatin", prescriber: "Dr. Alan Park", dosage: "20 mg", frequency: "Once daily PM", started: "Jan 08, 2024" }
      ],
      prn: [
        { id: "m5", name: "Nitroglycerin SL", prescriber: "Dr. Rina Osei", dosage: "0.4 mg", frequency: "As needed for chest pain", started: "May 04, 2024" },
        { id: "m6", name: "Acetaminophen", prescriber: "Dr. Alan Park", dosage: "500 mg", frequency: "As needed for pain, max 3g/day", started: "Jan 08, 2024" }
      ],
      mar: {
        dates: ["Jun 26", "Jun 27", "Jun 28", "Jun 29", "Jun 30", "Jul 1", "Jul 2", "Jul 3", "Jul 4", "Jul 5", "Jul 6", "Jul 7", "Jul 8", "Jul 9"],
        am: ["taken", "taken", "taken", "taken", "taken", "taken", "taken", "taken", "taken", "missed", "taken", "taken", "taken", "taken"],
        noon: ["na", "taken", "taken", "na", "taken", "taken", "na", "taken", "taken", "na", "taken", "taken", "na", "taken"],
        pm: ["taken", "taken", "taken", "taken", "missed", "taken", "taken", "taken", "taken", "taken", "taken", "taken", "taken", "pending"],
        night: ["taken", "taken", "taken", "taken", "taken", "taken", "taken", "taken", "taken", "taken", "taken", "taken", "taken", "pending"]
      }
    },

    documents: {
      intake: [
        { id: "d1", name: "Intake Assessment 2024.pdf", author: "Sarah Kim, RN", date: "Aug 22, 2025", size: "1.2 MB", type: "pdf" }
      ],
      consents: [
        { id: "d2", name: "Care Consent Form.pdf", author: "David Chen", date: "Aug 22, 2025", size: "384 KB", type: "pdf" },
        { id: "d3", name: "HIPAA Authorization.pdf", author: "David Chen", date: "Aug 22, 2025", size: "296 KB", type: "pdf" }
      ],
      clinical: [
        { id: "d4", name: "Cardiac Assessment Q3.pdf", author: "Sarah Kim, RN", date: "Sep 30, 2025", size: "812 KB", type: "pdf" },
        { id: "d5", name: "Lab Results - A1C.pdf", author: "Dr. Alan Park", date: "Sep 12, 2025", size: "204 KB", type: "pdf" }
      ],
      insurance: [
        { id: "d6", name: "Medicare Card.jpg", author: "Intake Team", date: "Aug 22, 2025", size: "612 KB", type: "img" }
      ],
      orders: [
        { id: "d7", name: "Physician Orders Oct 2025.pdf", author: "Dr. Alan Park", date: "Oct 03, 2025", size: "441 KB", type: "pdf" }
      ]
    },

    billing: {
      authorization: {
        used: 72,
        total: 80
      },
      balance: 240,
      claims: [
        { id: "CLM-10231", serviceDates: "Oct 1 - Oct 10", payer: "Medicare", amount: "$2,450", status: "Draft" },
        { id: "CLM-10188", serviceDates: "Sep 15 - Sep 25", payer: "Medicare", amount: "$2,985", status: "Pending" },
        { id: "CLM-10145", serviceDates: "Sep 1 - Sep 12", payer: "Medicare", amount: "$3,480", status: "Paid" }
      ]
    },

    communication: {
      familyThread: [
        { id: "msg1", sender: "David Chen", timestamp: "Yesterday, 6:12 PM", message: "How did mom's cardiac check go yesterday?", direction: "inbound" },
        { id: "msg2", sender: "Sarah Kim, RN", timestamp: "Yesterday, 7:48 PM", message: "Assessment went well \u2014 vitals stable, cleared her for regular PT. Full note in her chart.", direction: "outbound" },
        { id: "msg3", sender: "David Chen", timestamp: "Yesterday, 8:03 PM", message: "Thank you. Any changes to her medications?", direction: "inbound" }
      ],
      logs: [
        { id: "log1", type: "Call in", contact: "David Chen", duration: "6m 12s", timestamp: "Oct 05, 2:14 PM", summary: "Discussed weekend visit schedule" },
        { id: "log2", type: "SMS out", contact: "Margaret Chen", timestamp: "Oct 04, 8:00 AM", summary: "Appointment reminder sent" },
        { id: "log3", type: "Call out", contact: "Dr. Rina Osei's office", duration: "3m 44s", timestamp: "Oct 02, 10:22 AM", summary: "Confirmed Furosemide dose" }
      ],
      internalNotes: [
        { id: "note1", author: "Maya Alvarez, CNA", timestamp: "Oct 04, 3:20 PM", note: "Watch sodium \u2014 patient had extra salt at dinner Wednesday. Flagged in visit notes." }
      ]
    }
  },
  "c-2": {
    id: "c-2",
    name: "Arthur Pendelton",
    status: "Hospitalized",
    age: 76,
    address: "88 Oak Lane, Apt 4B, Springfield, MA 01103",
    primaryDiagnosis: "Post-Stroke Recovery",
    riskLevel: "High",
    avatarUrl: "/avatars/arthur.png?v=2",
    
    demographics: {
      dob: "1950-11-05",
      gender: "Male",
      phone: "(555) 456-7890",
      email: "arthur.p@email.com",
      preferredLanguage: "English",
      emergencyContacts: [
        { name: "Martha Pendelton", relation: "Spouse", phone: "(555) 456-7891" }
      ]
    },
    
    insurance: {
      primary: "Medicare",
      policyNumber: "MCR-456123",
      groupNumber: "GRP-099",
      authorizationStatus: "On Hold (Hospitalized)"
    },

    careTeam: {
      pcp: "Dr. James Wilson",
      specialists: ["Dr. Sarah Neurologist"],
      caseManager: { name: "John Doe, RN", avatarUrl: "https://i.pravatar.cc/150?u=john" },
      primaryCaregivers: []
    },

    riskSummary: {
      fallRisk: { level: "High", lastAssessment: "2026-07-01" },
      medicationRisk: { level: "High", lastAssessment: "2026-07-01" },
      cognitiveStatus: { level: "Medium", lastAssessment: "2026-07-01" }
    },

    recentActivity: [
      { id: "a1", type: "incident", title: "Transferred to St. Jude Hospital", timestamp: "2026-07-07T18:30:00Z" },
      { id: "a2", type: "visit", title: "Visit missed (Hospitalized)", timestamp: "2026-07-08T09:00:00Z" }
    ]
  }
};
