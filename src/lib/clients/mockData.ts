export interface Client {
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
}

export const mockClients: Record<string, Client> = {
  "c-1": {
    id: "c-1",
    name: "Eleanor Vance",
    status: "Active",
    age: 82,
    address: "142 Maple Street, Hillside, NJ 07205",
    primaryDiagnosis: "Congestive Heart Failure (CHF)",
    riskLevel: "High",
    avatarUrl: "https://i.pravatar.cc/150?u=eleanor",
    
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
    ]
  },
  "c-2": {
    id: "c-2",
    name: "Arthur Pendelton",
    status: "Hospitalized",
    age: 76,
    address: "88 Oak Lane, Apt 4B, Springfield, MA 01103",
    primaryDiagnosis: "Post-Stroke Recovery",
    riskLevel: "High",
    avatarUrl: "https://i.pravatar.cc/150?u=arthur",
    
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
