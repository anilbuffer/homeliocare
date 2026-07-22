export interface CaregiverTask {
  id: string;
  category: "Personal Care" | "Meals" | "Household" | "Health Monitoring" | "Mobility" | "Companionship";
  title: string;
  description?: string;
  completed: boolean;
  completedAt?: string;
  skipped?: boolean;
  skipReason?: string;
}

export interface MedicationReminder {
  id: string;
  medicationName: string;
  dosage: string;
  scheduleTime: string;
  instructions: string;
  status: "pending" | "reminded" | "took" | "declined";
  loggedAt?: string;
  note?: string;
}

export interface Visit {
  id: string;
  clientId: string;
  clientName: string;
  clientPhoto: string;
  address: string;
  cityStateZip: string;
  phone: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Missed";
  clockInTime?: string;
  clockOutTime?: string;
  clockInMethod?: "gps" | "ivr" | "fvv" | "manual";
  clockInReason?: string;
  clockInCoords?: { lat: number; lng: number };
  clientCoords: { lat: number; lng: number };
  distanceFromClientMiles: number;
  travelTimeFromPreviousMin?: number;
  travelDistanceMiles?: number;
  tasks: CaregiverTask[];
  medications: MedicationReminder[];
  visitNotes?: string;
  signatureUrl?: string;
  clientSigned?: boolean;
  unableToSignReason?: string;
  photos?: { id: string; url: string; caption: string; isSensitive: boolean }[];
  mileageRecorded?: number;
  syncedOffline?: boolean;
}

export interface OpenShift {
  id: string;
  clientId: string;
  clientName: string;
  clientPhoto: string;
  location: string;
  date: string;
  timeWindow: string;
  hours: number;
  hourlyRate: number;
  bonusRate?: string;
  skillsRequired: string[];
  status: "Available" | "Accepted" | "Filled";
}

export interface TimeOffRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Denied";
  submittedAt: string;
  reviewerNote?: string;
}

export interface CaregiverMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface MessageThread {
  id: string;
  title: string;
  subtitle: string;
  avatar?: string;
  isGroup: boolean;
  unreadCount: number;
  lastMessageTime: string;
  messages: CaregiverMessage[];
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: "Required" | "Continuing Ed" | "Specialty";
  dueDate?: string;
  durationMinutes: number;
  progressPercent: number;
  status: "Not Started" | "In Progress" | "Completed" | "Expiring";
  ceUnits: number;
  description: string;
  thumbnail: string;
}

export interface CaregiverCertification {
  id: string;
  name: string;
  issueDate: string;
  expiryDate: string;
  status: "Active" | "Expiring Soon" | "Expired";
  issuer: string;
}

export interface PayStub {
  id: string;
  payPeriod: string;
  payDate: string;
  regularHours: number;
  otHours: number;
  grossPay: number;
  netPay: number;
  mileageAmount: number;
  status: "Paid" | "Processing";
}

export interface CaregiverProfileData {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
  branch: string;
  hireDate: string;
  employeeId: string;
  payRate: number;
  complianceScore: number;
  onTimeClockInRate: number;
  completedVisitsTotal: number;
  clientRating: number;
  assignedClients: { id: string; name: string; mrn: string; image: string }[];
  certifications: CaregiverCertification[];
  paystubs: PayStub[];
}

export const INITIAL_CAREGIVER_PROFILE: CaregiverProfileData = {
  id: "cg-101",
  name: "Maria Santos, CNA",
  title: "Certified Nursing Assistant",
  email: "maria.santos@homeliocare.com",
  phone: "(555) 382-9102",
  address: "412 Oakwood Ave, Apt 3B, North Branch",
  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  branch: "North Regional Branch",
  hireDate: "2024-03-15",
  employeeId: "EMP-8842",
  payRate: 25.50,
  complianceScore: 98,
  onTimeClockInRate: 97.4,
  completedVisitsTotal: 342,
  clientRating: 4.95,
  assignedClients: [
    { id: "cli-101", name: "Eleanor Vance", mrn: "MRN-88491", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" },
    { id: "cli-102", name: "Arthur Pendelton", mrn: "MRN-33920", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" },
    { id: "cli-103", name: "Margaret Higgins", mrn: "MRN-77102", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=120" },
  ],
  certifications: [
    { id: "cert-1", name: "CNA License (State Board)", issueDate: "2023-04-10", expiryDate: "2027-04-10", status: "Active", issuer: "State Board of Nursing" },
    { id: "cert-2", name: "BLS / CPR for Healthcare Providers", issueDate: "2024-08-01", expiryDate: "2026-08-04", status: "Expiring Soon", issuer: "American Heart Assoc" },
    { id: "cert-3", name: "Dementia & Alzheimer's Care Level 1", issueDate: "2024-05-12", expiryDate: "2027-05-12", status: "Active", issuer: "Homelio Academy" },
    { id: "cert-4", name: "Annual TB Screening Clear Clearance", issueDate: "2025-07-20", expiryDate: "2026-07-20", status: "Expiring Soon", issuer: "Metro Health Lab" },
  ],
  paystubs: [
    { id: "stub-01", payPeriod: "Jul 1, 2026 - Jul 15, 2026", payDate: "Jul 20, 2026", regularHours: 76.5, otHours: 4.0, grossPay: 2103.75, netPay: 1683.00, mileageAmount: 71.00, status: "Paid" },
    { id: "stub-02", payPeriod: "Jun 16, 2026 - Jun 30, 2026", payDate: "Jul 5, 2026", regularHours: 80.0, otHours: 2.5, grossPay: 2135.63, netPay: 1708.50, mileageAmount: 64.50, status: "Paid" },
    { id: "stub-03", payPeriod: "Jun 1, 2026 - Jun 15, 2026", payDate: "Jun 20, 2026", regularHours: 78.0, otHours: 0.0, grossPay: 1989.00, netPay: 1591.20, mileageAmount: 58.00, status: "Paid" },
  ]
};

export const INITIAL_VISITS: Visit[] = [
  {
    id: "visit-101",
    clientId: "cli-101",
    clientName: "Eleanor Vance",
    clientPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    address: "742 Evergreen Terrace",
    cityStateZip: "Springfield, IL 62704",
    phone: "(555) 981-4401",
    scheduledStartTime: "08:30 AM",
    scheduledEndTime: "12:30 PM",
    status: "Scheduled",
    clientCoords: { lat: 40.7128, lng: -74.0060 },
    distanceFromClientMiles: 0.05, // Inside 150m (approx 0.09 miles)
    tasks: [
      { id: "t-1", category: "Personal Care", title: "Assist with morning shower & dressing", description: "Use shower chair & non-slip mat", completed: false },
      { id: "t-2", category: "Personal Care", title: "Oral hygiene & hair grooming", completed: false },
      { id: "t-3", category: "Meals", title: "Prepare low-sodium diabetic breakfast", description: "Oatmeal with fresh blueberries & poached egg", completed: false },
      { id: "t-4", category: "Meals", title: "Ensure 500ml fresh water at bedside", completed: false },
      { id: "t-5", category: "Household", title: "Light housekeeping & kitchen wipe down", completed: false },
      { id: "t-6", category: "Household", title: "Change bed linens & wash laundry", completed: false },
      { id: "t-7", category: "Health Monitoring", title: "Record morning blood pressure & pulse", description: "Target BP < 135/85 mmHg", completed: false },
      { id: "t-8", category: "Mobility", title: "Assisted 20-min walking garden exercise", description: "Use 4-point cane for stability", completed: false },
      { id: "t-9", category: "Companionship", title: "Engage in memory puzzle or reading activity", completed: false },
    ],
    medications: [
      { id: "m-1", medicationName: "Metformin", dosage: "500mg", scheduleTime: "09:00 AM", instructions: "Take with breakfast", status: "pending" },
      { id: "m-2", medicationName: "Lisinopril", dosage: "10mg", scheduleTime: "09:00 AM", instructions: "Take with water", status: "pending" },
    ]
  },
  {
    id: "visit-102",
    clientId: "cli-102",
    clientName: "Arthur Pendelton",
    clientPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    address: "108 Ocean View Drive",
    cityStateZip: "Springfield, IL 62708",
    phone: "(555) 621-9988",
    scheduledStartTime: "01:30 PM",
    scheduledEndTime: "04:30 PM",
    status: "Scheduled",
    clientCoords: { lat: 40.7306, lng: -73.9866 },
    distanceFromClientMiles: 0.4,
    travelTimeFromPreviousMin: 14,
    travelDistanceMiles: 4.2,
    tasks: [
      { id: "t-201", category: "Personal Care", title: "Assist with transfer & mobility", completed: false },
      { id: "t-202", category: "Meals", title: "Prepare afternoon meal & hydration", completed: false },
      { id: "t-203", category: "Health Monitoring", title: "Blood glucose monitoring check", completed: false },
      { id: "t-204", category: "Companionship", title: "Social engagement & news reading", completed: false },
    ],
    medications: [
      { id: "m-201", medicationName: "Donepezil", dosage: "10mg", scheduleTime: "02:00 PM", instructions: "Take after lunch", status: "pending" },
    ]
  },
  {
    id: "visit-103",
    clientId: "cli-103",
    clientName: "Margaret Higgins",
    clientPhoto: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200",
    address: "55 Pinecrest Way",
    cityStateZip: "Springfield, IL 62711",
    phone: "(555) 774-1200",
    scheduledStartTime: "05:00 PM",
    scheduledEndTime: "07:00 PM",
    status: "Scheduled",
    clientCoords: { lat: 40.7589, lng: -73.9851 },
    distanceFromClientMiles: 0.8,
    travelTimeFromPreviousMin: 10,
    travelDistanceMiles: 2.8,
    tasks: [
      { id: "t-301", category: "Meals", title: "Dinner preparation & assistance", completed: false },
      { id: "t-302", category: "Personal Care", title: "Evening bath prep & oral care", completed: false },
      { id: "t-303", category: "Health Monitoring", title: "Evening vital signs recording", completed: false },
    ],
    medications: [
      { id: "m-301", medicationName: "Atorvastatin", dosage: "20mg", scheduleTime: "06:00 PM", instructions: "Take with evening meal", status: "pending" },
    ]
  }
];

export const INITIAL_OPEN_SHIFTS: OpenShift[] = [
  {
    id: "shift-op-1",
    clientId: "cli-102",
    clientName: "Arthur Pendelton",
    clientPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    location: "108 Ocean View Drive (North Zone)",
    date: "Tomorrow, Jul 23",
    timeWindow: "09:00 AM - 01:00 PM (4 hrs)",
    hours: 4,
    hourlyRate: 27.50,
    bonusRate: "+$2/hr Weekend Shift Premium",
    skillsRequired: ["Mobility Assistance", "Diabetic Care", "Vital Signs"],
    status: "Available"
  },
  {
    id: "shift-op-2",
    clientId: "cli-105",
    clientName: "Dorothy Gale",
    clientPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    location: "312 Emerald City Lane (Westside)",
    date: "Friday, Jul 24",
    timeWindow: "02:00 PM - 07:00 PM (5 hrs)",
    hours: 5,
    hourlyRate: 28.00,
    bonusRate: "Urgent Pickup Bonus $25",
    skillsRequired: ["Dementia Care", "Personal Hygiene", "Meal Prep"],
    status: "Available"
  },
  {
    id: "shift-op-3",
    clientId: "cli-104",
    clientName: "Samuel Oak",
    clientPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    location: "88 Pallet Town Rd (Central)",
    date: "Saturday, Jul 25",
    timeWindow: "08:00 AM - 12:00 PM (4 hrs)",
    hours: 4,
    hourlyRate: 26.00,
    skillsRequired: ["Companion", "Light Housekeeping"],
    status: "Available"
  }
];

export const INITIAL_TIME_OFF: TimeOffRequest[] = [
  {
    id: "to-1",
    startDate: "2026-08-10",
    endDate: "2026-08-14",
    reason: "Personal Vacation / Family Time",
    status: "Approved",
    submittedAt: "2026-07-02",
    reviewerNote: "Approved by Marcus Thompson (HR)"
  },
  {
    id: "to-2",
    startDate: "2026-07-28",
    endDate: "2026-07-28",
    reason: "Medical Appointment",
    status: "Pending",
    submittedAt: "2026-07-18"
  }
];

export const INITIAL_THREADS: MessageThread[] = [
  {
    id: "th-1",
    title: "Clinical Supervisor - Rachel Miller RN",
    subtitle: "Re: Eleanor Vance's morning blood pressure trend",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200",
    isGroup: false,
    unreadCount: 1,
    lastMessageTime: "10:14 AM",
    messages: [
      { id: "m-1", threadId: "th-1", senderId: "usr-005", senderName: "Rachel Miller RN", senderRole: "Clinical Supervisor", senderAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200", text: "Good morning Maria! Please ensure Eleanor takes her morning vital signs before her breakfast walk today.", timestamp: "08:15 AM", isMe: false },
      { id: "m-2", threadId: "th-1", senderId: "cg-101", senderName: "Maria Santos", senderRole: "Caregiver", text: "Will do, Nurse Rachel! I have her Metformin and Lisinopril queued up.", timestamp: "08:22 AM", isMe: true },
      { id: "m-3", threadId: "th-1", senderId: "usr-005", senderName: "Rachel Miller RN", senderRole: "Clinical Supervisor", senderAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200", text: "Perfect. If her systolic BP is above 140, drop a quick note in the visit log.", timestamp: "10:14 AM", isMe: false },
    ]
  },
  {
    id: "th-2",
    title: "North Branch Caregiver Team",
    subtitle: "Marcus: Shift coverage request for tomorrow",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=200",
    isGroup: true,
    unreadCount: 0,
    lastMessageTime: "Yesterday",
    messages: [
      { id: "m-201", threadId: "th-2", senderId: "usr-002", senderName: "Marcus Thompson", senderRole: "Dispatcher", text: "Team, we have 2 open shifts for Thursday in North Zone. Please check the Open Shifts board!", timestamp: "Yesterday 3:30 PM", isMe: false },
    ]
  }
];

export const INITIAL_TRAINING_COURSES: TrainingCourse[] = [
  {
    id: "tr-101",
    title: "Annual HIPAA & Patient Privacy Compliance",
    category: "Required",
    dueDate: "Jul 31, 2026",
    durationMinutes: 45,
    progressPercent: 100,
    status: "Completed",
    ceUnits: 1.5,
    description: "Comprehensive review of PHI handling, EVV mobile privacy, and secure communications.",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "tr-102",
    title: "Dementia & Alzheimer's Care Level II",
    category: "Continuing Ed",
    dueDate: "Aug 15, 2026",
    durationMinutes: 60,
    progressPercent: 65,
    status: "In Progress",
    ceUnits: 2.0,
    description: "Advanced de-escalation techniques, memory exercises, and family communication strategies.",
    thumbnail: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "tr-103",
    title: "BLS / CPR Healthcare Provider Refresher",
    category: "Required",
    dueDate: "Aug 04, 2026",
    durationMinutes: 90,
    progressPercent: 0,
    status: "Expiring",
    ceUnits: 3.0,
    description: "Required hands-on CPR refresher course with certified instructor sign-off.",
    thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "tr-104",
    title: "Infection Control & PPE Best Practices 2026",
    category: "Specialty",
    durationMinutes: 30,
    progressPercent: 0,
    status: "Not Started",
    ceUnits: 1.0,
    description: "Updated CDC guidelines for home care hygiene, sterilization, and respiratory protection.",
    thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400"
  }
];
