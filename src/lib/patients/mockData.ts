export interface Patient {
  id: string;
  name: string;
  status: "Active" | "Care Completed" | "Hospitalized" | "Discharged";
  age: number;
  address: string;
  primaryDiagnosis: string;
  riskLevel: "Low" | "Medium" | "High";
  avatarUrl?: string;
  intakeStatus?: "New Referral" | "Auth Pending" | "Assessment Scheduled" | "Ready to Admit" | "Onboarding Hold" | "Admitted";
  missingDocuments?: string[];
  safetyAlerts?: {
    dnr: "DNR" | "Full Code" | "POLST" | "Unknown";
    isolationProtocols: string[];
  };
  
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
    type: "visit" | "medication" | "incident" | "document" | "note" | "call" | "sms";
    title: string;
    timestamp: string;
    audioUrl?: string;
    duration?: string;
    message?: string;
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
    name: "Eleanor Ruth Whitfield",
    status: "Active",
    age: 78,
    address: "214 Maple Ridge Lane, Cedar Falls, PA 19087",
    primaryDiagnosis: "s/p right hip ORIF, early-stage vascular dementia",
    riskLevel: "High",
    avatarUrl: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&q=80&w=150",
    intakeStatus: "Auth Pending",
    missingDocuments: ["Consent Form", "Primary Care Orders"],
    safetyAlerts: { dnr: "DNR", isolationProtocols: ["Contact Precautions (MRSA)"] },
    
    demographics: {
      dob: "1948-05-12",
      gender: "Female",
      phone: "(610) 555-0148",
      email: "meg.wcho@gmail.com",
      preferredLanguage: "English",
      emergencyContacts: [
        { name: "Margaret \"Meg\" Whitfield-Cho", relation: "Daughter / POA", phone: "(610) 555-0192" },
        { name: "David Whitfield", relation: "Son", phone: "(215) 555-0873" }
      ]
    },
    
    insurance: {
      primary: "Medicare Part A & B",
      secondary: "AARP Supplemental",
      policyNumber: "MCR-9842100",
      groupNumber: "GRP-120",
      authorizationStatus: "Pending Authorization"
    },

    careTeam: {
      pcp: "Dr. Amanda Chen",
      specialists: ["Dr. Robert Patel (Cardiology)"],
      caseManager: { name: "Maria Garcia, RN", avatarUrl: "" },
      primaryCaregivers: [
        { name: "David Kim", avatarUrl: "" },
        { name: "Jessica Smith", avatarUrl: "" }
      ]
    },

    riskSummary: {
      fallRisk: { level: "High", lastAssessment: "2026-06-15" },
      medicationRisk: { level: "Medium", lastAssessment: "2026-06-15" },
      cognitiveStatus: { level: "Low", lastAssessment: "2026-01-10" }
    },

    recentActivity: [
      { id: "a0_call", type: "call", title: "Inbound Call - Robert Rigby (Son)", timestamp: "2026-07-09T14:15:00Z", duration: "03:45", audioUrl: "/audio/mock_call.mp3" },
      { id: "a1", type: "visit", title: "Visit completed by David Kim", timestamp: "2026-07-09T10:30:00Z" },
      { id: "a0_sms", type: "sms", title: "SMS from Jessica Smith", timestamp: "2026-07-09T09:20:00Z", message: "Patient is experiencing mild discomfort in left leg today." },
      { id: "a2", type: "medication", title: "Morning meds administered", timestamp: "2026-07-09T08:15:00Z" },
      { id: "a3", type: "document", title: "New Cardiology Report uploaded", timestamp: "2026-07-08T14:20:00Z" },
      { id: "a4", type: "incident", title: "Slight dizziness reported", timestamp: "2026-07-05T09:00:00Z" }
    ],

    carePlan: {
      approval: { signer: "Dr. Alan Park", date: "Jul 04, 2026" },
      problems: [
        { id: "p1", title: "Congestive heart failure \u2014 fluid overload risk", targetDate: "Dec 31, 2026", status: "On track" },
        { id: "p2", title: "Type 2 Diabetes \u2014 glycemic control", targetDate: "Nov 15, 2026", status: "At risk" },
        { id: "p3", title: "Fall prevention", targetDate: "Ongoing", status: "On track" }
      ],
      tasks: [
        { id: "t1", task: "Vital signs check", frequency: "Every visit", assigned: "Maya Alvarez", lastCompleted: "Today", nextDue: "Tomorrow, 9 AM" },
        { id: "t2", task: "Medication administration", frequency: "BID", assigned: "Rotating", lastCompleted: "Today, 8 AM", nextDue: "Today, 6 PM" },
        { id: "t3", task: "Weight & I/O log", frequency: "Daily", assigned: "Maya Alvarez", lastCompleted: "Today", nextDue: "Tomorrow" },
        { id: "t4", task: "Bath / hygiene assist", frequency: "3x/week", assigned: "Maya Alvarez", lastCompleted: "Yesterday", nextDue: "Wednesday" },
        { id: "t5", task: "Nurse cardiac assessment", frequency: "Weekly", assigned: "Sarah Kim, RN", lastCompleted: "Sep 30", nextDue: "Jul 07" }
      ],
      versionHistory: { revisions: 3 }
    },

    visits: {
      upcoming: [
        { id: "v1", date: "Jul 08", time: "9:00 AM", staff: "Maya Alvarez", duration: "2h", status: "pending", type: "Scheduled" },
        { id: "v2", date: "Jul 08", time: "5:00 PM", staff: "Jordan Reed", duration: "1h 30m", status: "pending", type: "Scheduled" }
      ],
      history: [
        { id: "v3", date: "Jul 07", time: "9:00 AM", staff: "Maya Alvarez", duration: "2h 15m", status: "verified", type: "Completed" },
        { id: "v4", date: "Jul 06", time: "9:00 AM", staff: "Maya Alvarez", duration: "2h", status: "verified", type: "Completed" },
        { id: "v5", date: "Jul 05", time: "9:00 AM", staff: "Jordan Reed", duration: "1h 50m", status: "flagged", type: "Late" },
        { id: "v6", date: "Jul 04", time: "9:00 AM", staff: "Maya Alvarez", duration: "2h 05m", status: "verified", type: "Completed" },
        { id: "v7", date: "Jul 03", time: "9:00 AM", staff: "Maya Alvarez", duration: "0m", status: "flagged", type: "Missed" }
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
        { id: "d1", name: "Intake Assessment 2024.pdf", author: "Sarah Kim, RN", date: "Aug 22, 2026", size: "1.2 MB", type: "pdf" }
      ],
      consents: [
        { id: "d2", name: "Care Consent Form.pdf", author: "David Chen", date: "Aug 22, 2026", size: "384 KB", type: "pdf" },
        { id: "d3", name: "HIPAA Authorization.pdf", author: "David Chen", date: "Aug 22, 2026", size: "296 KB", type: "pdf" }
      ],
      clinical: [
        { id: "d4", name: "Cardiac Assessment Q3.pdf", author: "Sarah Kim, RN", date: "Sep 30, 2026", size: "812 KB", type: "pdf" },
        { id: "d5", name: "Lab Results - A1C.pdf", author: "Dr. Alan Park", date: "Sep 12, 2026", size: "204 KB", type: "pdf" }
      ],
      insurance: [
        { id: "d6", name: "Medicare Card.jpg", author: "Intake Team", date: "Aug 22, 2026", size: "612 KB", type: "img" }
      ],
      orders: [
        { id: "d7", name: "Physician Orders Jul 2026.pdf", author: "Dr. Alan Park", date: "Jul 03, 2026", size: "441 KB", type: "pdf" }
      ]
    },

    billing: {
      authorization: {
        used: 72,
        total: 80
      },
      balance: 240,
      claims: [
        { id: "CLM-10231", serviceDates: "Jul 1 - Jul 10", payer: "Medicare", amount: "$2,450", status: "Draft" },
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
        { id: "log1", type: "Call in", contact: "David Chen", duration: "6m 12s", timestamp: "Jul 05, 2:14 PM", summary: "Discussed weekend visit schedule" },
        { id: "log2", type: "SMS out", contact: "Margaret Chen", timestamp: "Jul 04, 8:00 AM", summary: "Appointment reminder sent" },
        { id: "log3", type: "Call out", contact: "Dr. Rina Osei's office", duration: "3m 44s", timestamp: "Jul 02, 10:22 AM", summary: "Confirmed Furosemide dose" }
      ],
      internalNotes: [
        { id: "note1", author: "Maya Alvarez, CNA", timestamp: "Jul 04, 3:20 PM", note: "Watch sodium \u2014 patient had extra salt at dinner Wednesday. Flagged in visit notes." }
      ]
    }
  },
  "c-2": {
    id: "c-2",
    name: "John Doe",
    status: "Hospitalized",
    age: 76,
    address: "88 Oak Lane, Apt 4B, Springfield, MA 01103",
    primaryDiagnosis: "Post-Stroke Recovery",
    riskLevel: "High",
    avatarUrl: "/avatars/arthur.png?v=2",
    intakeStatus: "Onboarding Hold",
    missingDocuments: ["Hospital Discharge Summary"],
    safetyAlerts: { dnr: "Full Code", isolationProtocols: [] },
    
    demographics: {
      dob: "1950-11-05",
      gender: "Male",
      phone: "(555) 456-7890",
      email: "john.doe@email.com",
      preferredLanguage: "English",
      emergencyContacts: [
        { name: "Jane Doe", relation: "Spouse", phone: "(555) 456-7891" }
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
      caseManager: { name: "John Doe, RN", avatarUrl: "" },
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
  },
  "c-3": {
    id: "c-3",
    name: "Mary Smith",
    status: "Care Completed",
    age: 65,
    address: "123 Main St, Anytown, CA 12345",
    primaryDiagnosis: "Routine Checkup",
    riskLevel: "Low",
    avatarUrl: "/avatars/placeholder.png",
    intakeStatus: "Ready to Admit",
    missingDocuments: [],
    safetyAlerts: { dnr: "Unknown", isolationProtocols: [] },
    
    demographics: {
      dob: "1961-01-01",
      gender: "Male",
      phone: "(555) 123-4567",
      email: "mary.smith@email.com",
      preferredLanguage: "English",
      emergencyContacts: []
    },
    
    insurance: {
      primary: "Medicare",
      policyNumber: "MCR-123456",
      groupNumber: "GRP-001",
      authorizationStatus: "Expired"
    },

    careTeam: {
      pcp: "Dr. Jane Doe",
      specialists: [],
      caseManager: { name: "John Doe, RN", avatarUrl: "" },
      primaryCaregivers: []
    },

    riskSummary: {
      fallRisk: { level: "Low", lastAssessment: "2025-01-01" },
      medicationRisk: { level: "Low", lastAssessment: "2025-01-01" },
      cognitiveStatus: { level: "Low", lastAssessment: "2025-01-01" }
    },

    recentActivity: []
  },
  "ref-ew-001": {
    id: "ref-ew-001",
    name: "Eleanor Ruth Whitfield",
    status: "Active",
    age: 78,
    address: "214 Maple Ridge Lane, Cedar Falls, PA 19087",
    primaryDiagnosis: "s/p right hip ORIF, early-stage vascular dementia",
    riskLevel: "High",
    avatarUrl: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&q=80&w=150",
    intakeStatus: "Admitted",
    missingDocuments: [],
    safetyAlerts: { dnr: "Unknown", isolationProtocols: [] },
    
    demographics: {
      dob: "1948-05-12",
      gender: "Female",
      phone: "(610) 555-0148",
      email: "meg.wcho@gmail.com",
      preferredLanguage: "English",
      emergencyContacts: [
        { name: "Margaret Whitfield-Cho", relation: "Daughter / POA", phone: "(610) 555-0192" },
        { name: "David Whitfield", relation: "Son", phone: "(215) 555-0873" }
      ]
    },
    
    insurance: {
      primary: "Medicaid - PA Community HealthChoices",
      policyNumber: "PA-CHC-9928174",
      groupNumber: "GRP-441-KF",
      authorizationStatus: "Approved"
    },

    careTeam: {
      pcp: "Dr. Robert Chen",
      specialists: [],
      caseManager: { name: "Sarah Jenkins", avatarUrl: "" },
      primaryCaregivers: []
    },

    riskSummary: {
      fallRisk: { level: "High", lastAssessment: new Date().toISOString() },
      medicationRisk: { level: "Medium", lastAssessment: new Date().toISOString() },
      cognitiveStatus: { level: "Medium", lastAssessment: new Date().toISOString() }
    },

    recentActivity: [
      {
        id: "act-1",
        type: "note",
        title: "Intake Note Added",
        timestamp: new Date().toISOString(),
        message: "Patient discharging in 48 hrs. s/p right hip ORIF (fall at home), early-stage vascular dementia, hypertension, osteoarthritis. Mobility: Walker-assisted, fall risk (high). Needs care in place before discharge."
      }
    ],

    documents: {
      intake: [
        { id: "doc-1", name: "Intake Inquiry Form", author: "Denise Okafor", date: "2026-08-11", size: "1.2 MB", type: "pdf" },
      ],
      consents: [
        { id: "doc-2", name: "HIPAA Consent", author: "Meg Whitfield-Cho", date: "2026-08-11", size: "0.5 MB", type: "pdf" },
        { id: "doc-3", name: "Service Agreement", author: "Meg Whitfield-Cho", date: "2026-08-11", size: "2.1 MB", type: "pdf" }
      ],
      clinical: [
        { id: "doc-4", name: "Discharge Summary", author: "Cedar Falls Regional Hospital", date: "2026-08-11", size: "3.4 MB", type: "pdf" }
      ],
      insurance: [
        { id: "doc-5", name: "Medicaid Card Copy", author: "Meg Whitfield-Cho", date: "2026-08-11", size: "1.8 MB", type: "img" }
      ],
      orders: [
        { id: "doc-6", name: "Physician Orders", author: "Dr. Robert Chen", date: "2026-08-11", size: "1.1 MB", type: "pdf" }
      ]
    },

    billing: {
      authorization: {
        used: 0,
        total: 80
      },
      balance: 0.00,
      claims: [
        { id: "clm-1", serviceDates: "2026-08-11", payer: "Medicaid", amount: "$0.00", status: "Draft" }
      ]
    },

    communication: {
      familyThread: [
        {
          id: "msg-1",
          sender: "Meg Whitfield-Cho",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          message: "Hi, I just wanted to check if everything is set for my mom's discharge on Thursday?",
          direction: "inbound"
        },
        {
          id: "msg-2",
          sender: "Sarah Jenkins",
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          message: "Hello Meg, we are finalizing the authorization with Medicaid now. We will have a caregiver ready for her on Thursday.",
          direction: "outbound"
        }
      ],
      logs: [
        {
          id: "log-1",
          type: "Call in",
          contact: "Meg Whitfield-Cho",
          duration: "12m 45s",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          summary: "Daughter called regarding intake process and authorization status. Confirmed Medicaid details."
        }
      ],
      internalNotes: [
        {
          id: "note-1",
          author: "Sarah Jenkins",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          note: "Need to follow up with Medicaid on Wednesday if auth not received by then."
        }
      ]
    }
  },
  "ref-002": {
    id: "ref-002",
    name: "John Doe",
    status: "Active",
    age: 72,
    address: "123 Main St, Springfield, IL 62701",
    primaryDiagnosis: "Early-onset dementia",
    riskLevel: "Medium",
    intakeStatus: "New Referral",
    demographics: {
      dob: "1954-04-12",
      gender: "Male",
      phone: "(555) 123-4567",
      email: "johndoe@email.com",
      preferredLanguage: "English",
      emergencyContacts: []
    },
    insurance: {
      primary: "Private Pay",
      policyNumber: "N/A",
      groupNumber: "N/A",
      authorizationStatus: "Not Started"
    },
    careTeam: {
      pcp: "Unknown",
      specialists: [],
      caseManager: { name: "Sarah Jenkins" },
      primaryCaregivers: []
    },
    riskSummary: {
      fallRisk: { level: "Medium", lastAssessment: new Date().toISOString() },
      medicationRisk: { level: "Medium", lastAssessment: new Date().toISOString() },
      cognitiveStatus: { level: "High", lastAssessment: new Date().toISOString() }
    },
    recentActivity: []
  },
  "ref-003": {
    id: "ref-003",
    name: "Mary Smith",
    status: "Active",
    age: 68,
    address: "456 Elm St, Springfield, IL 62701",
    primaryDiagnosis: "General debility",
    riskLevel: "Low",
    intakeStatus: "Auth Pending",
    demographics: {
      dob: "1958-08-20",
      gender: "Female",
      phone: "(555) 987-6543",
      email: "marysmith@email.com",
      preferredLanguage: "English",
      emergencyContacts: []
    },
    insurance: {
      primary: "Blue Cross",
      policyNumber: "BC-12345",
      groupNumber: "GRP-01",
      authorizationStatus: "Pending"
    },
    careTeam: {
      pcp: "Dr. Adams",
      specialists: [],
      caseManager: { name: "Mark T." },
      primaryCaregivers: []
    },
    riskSummary: {
      fallRisk: { level: "Low", lastAssessment: new Date().toISOString() },
      medicationRisk: { level: "Low", lastAssessment: new Date().toISOString() },
      cognitiveStatus: { level: "Low", lastAssessment: new Date().toISOString() }
    },
    recentActivity: []
  }
};
