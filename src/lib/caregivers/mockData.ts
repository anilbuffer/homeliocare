export type CaregiverStatus = "Active" | "Onboarding" | "Inactive" | "On Leave";
export type EmploymentType = "W2" | "1099";

export interface Certification {
  id: string;
  name: string;
  issueDate: string;
  expiryDate: string;
  status: "Active" | "Expiring Soon" | "Expired";
  issuer: string;
}

export interface Shift {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "Completed" | "Upcoming" | "Missed";
}

export interface Caregiver {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  status: CaregiverStatus;
  rating: number;
  yearsWithAgency: number;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  languages: string[];
  skills: string[];
  hireDate: string;
  employmentType: EmploymentType;
  payRate: number;
  complianceScore: number;
  assignedClientsCount: number;
  lastActiveDate: string;
  certifications: Certification[];
  recentShifts: Shift[];
}

export const mockCaregivers: Record<string, Caregiver> = {
  "cg-001": {
    id: "cg-001",
    name: "Elena Rodriguez",
    avatarUrl: "https://i.pravatar.cc/150?u=cg1",
    role: "Registered Nurse (RN)",
    status: "Active",
    rating: 4.9,
    yearsWithAgency: 3,
    phone: "(555) 123-4567",
    email: "elena.r@homeliocare.com",
    address: "123 Healthcare Ave, Wellness City, ST 12345",
    emergencyContact: "Carlos Rodriguez (Husband) - (555) 987-6543",
    languages: ["English", "Spanish"],
    skills: ["Wound Care", "Medication Management", "IV Therapy", "Dementia Care"],
    hireDate: "2023-01-15",
    employmentType: "W2",
    payRate: 45.00,
    complianceScore: 100,
    assignedClientsCount: 4,
    lastActiveDate: "2026-07-15",
    certifications: [
      { id: "cert-1", name: "RN License", issueDate: "2022-05-01", expiryDate: "2027-05-01", status: "Active", issuer: "State Board of Nursing" },
      { id: "cert-2", name: "BLS/CPR", issueDate: "2025-01-10", expiryDate: "2027-01-10", status: "Active", issuer: "American Heart Association" },
    ],
    recentShifts: [
      { id: "s-1", clientId: "c-001", clientName: "Robert Hayes", date: "2026-07-14", startTime: "09:00", endTime: "13:00", status: "Completed" },
      { id: "s-2", clientId: "c-002", clientName: "Mary Johnson", date: "2026-07-15", startTime: "14:00", endTime: "18:00", status: "Upcoming" },
    ]
  },
  "cg-002": {
    id: "cg-002",
    name: "Marcus Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=cg2",
    role: "Home Health Aide (HHA)",
    status: "Active",
    rating: 4.7,
    yearsWithAgency: 1.5,
    phone: "(555) 234-5678",
    email: "marcus.j@homeliocare.com",
    address: "456 Caregiver Blvd, Health Town, ST 54321",
    emergencyContact: "Sarah Johnson (Sister) - (555) 876-5432",
    languages: ["English"],
    skills: ["Mobility Assistance", "Personal Care", "Meal Prep"],
    hireDate: "2025-02-10",
    employmentType: "1099",
    payRate: 22.50,
    complianceScore: 92,
    assignedClientsCount: 6,
    lastActiveDate: "2026-07-14",
    certifications: [
      { id: "cert-3", name: "HHA Certification", issueDate: "2024-06-01", expiryDate: "2026-06-01", status: "Active", issuer: "State Health Dept" },
      { id: "cert-4", name: "First Aid", issueDate: "2024-08-15", expiryDate: "2026-08-15", status: "Active", issuer: "Red Cross" },
    ],
    recentShifts: [
      { id: "s-3", clientId: "c-003", clientName: "John Doe", date: "2026-07-13", startTime: "08:00", endTime: "16:00", status: "Completed" }
    ]
  },
  "cg-003": {
    id: "cg-003",
    name: "Sarah Jenkins",
    avatarUrl: "https://i.pravatar.cc/150?u=cg3",
    role: "Certified Nursing Assistant (CNA)",
    status: "Onboarding",
    rating: 0,
    yearsWithAgency: 0,
    phone: "(555) 345-6789",
    email: "sarah.j@homeliocare.com",
    address: "789 Newbie Lane, Care City, ST 67890",
    emergencyContact: "Tom Jenkins (Father) - (555) 765-4321",
    languages: ["English", "French"],
    skills: ["Vital Signs", "Patient Positioning", "Basic Care"],
    hireDate: "2026-07-01",
    employmentType: "W2",
    payRate: 25.00,
    complianceScore: 65,
    assignedClientsCount: 0,
    lastActiveDate: "2026-07-15",
    certifications: [
      { id: "cert-5", name: "CNA License", issueDate: "2026-05-20", expiryDate: "2028-05-20", status: "Active", issuer: "State Nursing Board" },
      { id: "cert-6", name: "CPR", issueDate: "2024-07-01", expiryDate: "2026-07-01", status: "Expiring Soon", issuer: "American Heart Association" }
    ],
    recentShifts: []
  },
  "cg-004": {
    id: "cg-004",
    name: "David Chen",
    avatarUrl: "https://i.pravatar.cc/150?u=cg4",
    role: "Physical Therapist",
    status: "Active",
    rating: 4.8,
    yearsWithAgency: 5,
    phone: "(555) 456-7890",
    email: "david.c@homeliocare.com",
    address: "321 Therapy Way, Rehab City, ST 13579",
    emergencyContact: "Linda Chen (Wife) - (555) 654-3210",
    languages: ["English", "Mandarin"],
    skills: ["Orthopedic Rehab", "Neurological PT", "Gait Training"],
    hireDate: "2021-09-01",
    employmentType: "W2",
    payRate: 55.00,
    complianceScore: 100,
    assignedClientsCount: 8,
    lastActiveDate: "2026-07-15",
    certifications: [
      { id: "cert-7", name: "PT License", issueDate: "2020-09-01", expiryDate: "2030-09-01", status: "Active", issuer: "State PT Board" }
    ],
    recentShifts: []
  }
};
