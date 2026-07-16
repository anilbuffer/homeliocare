export type CaregiverStatus = "Active" | "Offline";
export type VisitStatus = "Unassigned" | "Assigned" | "In Progress" | "Completed";

export interface Caregiver {
  id: string;
  name: string;
  avatar: string;
  status: CaregiverStatus;
  currentRoute: string; // e.g., "Chen Household"
  distanceToNext: number; // in miles
  email: string;
  phone: string;
  certNo: string;
  specialty: string;
  shiftStart: string;
  shiftEnd: string;
  location: { x: number; y: number }; // Relative coordinates (0-100) for the mock map
}

export interface Visit {
  id: string;
  patientName: string;
  address: string;
  time: string;
  status: VisitStatus;
  caregiverId?: string; // Links back to the caregiver, if assigned
  location: { x: number; y: number }; // Relative coordinates (0-100)
}

export const mockCaregivers: Caregiver[] = [
  {
    id: "cg-1",
    name: "Priya Patel",
    avatar: "PP",
    status: "Active",
    currentRoute: "Chen Household",
    distanceToNext: 1.2,
    email: "priya@homelio.care",
    phone: "(415) 555-0142",
    certNo: "RN-88214",
    specialty: "Wound Care",
    shiftStart: "08:00",
    shiftEnd: "16:00",
    location: { x: 30, y: 42 },
  },
  {
    id: "cg-2",
    name: "Maria Santos",
    avatar: "MS",
    status: "Active",
    currentRoute: "Alvarez Residence",
    distanceToNext: 0.6,
    email: "maria@homelio.care",
    phone: "(415) 555-0177",
    certNo: "CNA-40912",
    specialty: "Dementia Care",
    shiftStart: "07:30",
    shiftEnd: "15:30",
    location: { x: 62, y: 35 },
  },
  {
    id: "cg-3",
    name: "Aisha Williams",
    avatar: "AW",
    status: "Active",
    currentRoute: "Becker Home",
    distanceToNext: 2.4,
    email: "aisha@homelio.care",
    phone: "(415) 555-0198",
    certNo: "HHA-22174",
    specialty: "Physical Therapy",
    shiftStart: "09:00",
    shiftEnd: "17:00",
    location: { x: 60, y: 65 },
  },
  {
    id: "cg-4",
    name: "James O'Brien",
    avatar: "JO",
    status: "Active",
    currentRoute: "Tanaka Family",
    distanceToNext: 3.1,
    email: "james@homelio.care",
    phone: "(415) 555-0201",
    certNo: "CNA-40955",
    specialty: "General Care",
    shiftStart: "10:00",
    shiftEnd: "18:00",
    location: { x: 40, y: 72 },
  },
  {
    id: "cg-5",
    name: "Sarah Jenkins",
    avatar: "SJ",
    status: "Offline",
    currentRoute: "N/A",
    distanceToNext: 0,
    email: "sarah@homelio.care",
    phone: "(415) 555-0333",
    certNo: "RN-88299",
    specialty: "Pediatrics",
    shiftStart: "N/A",
    shiftEnd: "N/A",
    location: { x: 73, y: 20 }, // Offline location might be home or agency
  },
  {
    id: "cg-6",
    name: "Michael Chang",
    avatar: "MC",
    status: "Offline",
    currentRoute: "N/A",
    distanceToNext: 0,
    email: "michael@homelio.care",
    phone: "(415) 555-0444",
    certNo: "HHA-22199",
    specialty: "Post-Op Care",
    shiftStart: "N/A",
    shiftEnd: "N/A",
    location: { x: 31, y: 78 },
  },
  {
    id: "cg-7",
    name: "Elena Rossi",
    avatar: "ER",
    status: "Active",
    currentRoute: "Smith Residence",
    distanceToNext: 1.8,
    email: "elena@homelio.care",
    phone: "(415) 555-0555",
    certNo: "RN-88220",
    specialty: "Geriatrics",
    shiftStart: "08:00",
    shiftEnd: "16:00",
    location: { x: 82, y: 35 },
  },
  {
    id: "cg-8",
    name: "David Lee",
    avatar: "DL",
    status: "Active",
    currentRoute: "Gomez Home",
    distanceToNext: 0.9,
    email: "david@homelio.care",
    phone: "(415) 555-0666",
    certNo: "CNA-40988",
    specialty: "General Care",
    shiftStart: "09:00",
    shiftEnd: "17:00",
    location: { x: 20, y: 50 },
  }
];

export const mockVisits: Visit[] = [
  {
    id: "v-1",
    patientName: "Margaret Chen",
    address: "1200 Sunset Blvd, SF",
    time: "Today - 08:30",
    status: "In Progress",
    caregiverId: "cg-1",
    location: { x: 40, y: 36 },
  },
  {
    id: "v-2",
    patientName: "Robert Alvarez",
    address: "44 Linden Ave, SF",
    time: "Today - 09:00",
    status: "Assigned",
    caregiverId: "cg-2",
    location: { x: 58, y: 26 },
  },
  {
    id: "v-3",
    patientName: "Thomas Becker",
    address: "55 El Camino, SF",
    time: "Today - 10:15",
    status: "Completed",
    caregiverId: "cg-3",
    location: { x: 68, y: 54 },
  },
  {
    id: "v-4",
    patientName: "Aiko Tanaka",
    address: "33 Fillmore St, SF",
    time: "Today - 11:00",
    status: "Completed",
    caregiverId: "cg-4",
    location: { x: 49, y: 64 },
  },
  {
    id: "v-5",
    patientName: "David Kim",
    address: "9 Buena Vista, SF",
    time: "Today - 12:30",
    status: "Unassigned",
    location: { x: 35, y: 20 },
  },
  {
    id: "v-6",
    patientName: "Lisa Chen",
    address: "180 Mission St, SF",
    time: "Today - 14:00",
    status: "Unassigned",
    location: { x: 75, y: 72 },
  },
  {
    id: "v-7",
    patientName: "Amy Rodriguez",
    address: "12 Baker St, SF",
    time: "Today - 07:00",
    status: "Completed",
    caregiverId: "cg-1",
    location: { x: 51, y: 48 },
  },
  {
    id: "v-8",
    patientName: "William Smith",
    address: "88 Bay St, SF",
    time: "Today - 09:30",
    status: "Completed",
    caregiverId: "cg-7",
    location: { x: 80, y: 25 },
  },
  {
    id: "v-9",
    patientName: "Maria Gomez",
    address: "12 Market St, SF",
    time: "Today - 10:00",
    status: "Completed",
    caregiverId: "cg-8",
    location: { x: 25, y: 60 },
  }
];
