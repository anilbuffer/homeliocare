export const portalUser = {
  id: "fam-123",
  name: "Linda Alvarez",
  relationship: "Daughter",
  clientName: "Robert Alvarez",
};

export const todaysVisit = {
  id: "visit-1",
  date: "Today",
  timeWindow: "9:00 AM - 1:00 PM",
  status: "In progress", // Scheduled, On the way, In progress, Completed
  caregiver: {
    name: "Sarah Jenkins",
    photo: "https://i.pravatar.cc/150?u=sarah",
  },
};

export const quickStats = {
  nextVisit: "Tomorrow, 9:00 AM",
  unreadMessages: 2,
  outstandingBalance: "$120.00",
};

export const recentUpdates = [
  {
    id: "update-1",
    timestamp: "Today at 10:30 AM",
    caregiverName: "Sarah Jenkins",
    caregiverPhoto: "https://i.pravatar.cc/150?u=sarah",
    note: "Robert had a good morning! He ate all of his breakfast and we just finished our walk around the neighborhood. He's in good spirits today.",
    photos: ["https://images.unsplash.com/photo-1516307365426-bea591f05011?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
  },
  {
    id: "update-2",
    timestamp: "Yesterday at 12:45 PM",
    caregiverName: "Marcus Thorne",
    caregiverPhoto: "https://i.pravatar.cc/150?u=marcus",
    note: "Helped Robert with his afternoon medication. We played a few hands of cards after lunch.",
  },
];

export const upcomingVisits = [
  {
    id: "visit-2",
    date: "Tomorrow, Jul 22",
    time: "9:00 AM - 1:00 PM",
    caregiverName: "Sarah Jenkins",
  },
  {
    id: "visit-3",
    date: "Friday, Jul 24",
    time: "9:00 AM - 1:00 PM",
    caregiverName: "Marcus Thorne",
  },
];

export const careTeam = [
  {
    id: "team-1",
    name: "Sarah Jenkins",
    role: "Primary Caregiver",
    photo: "https://i.pravatar.cc/150?u=sarah",
    isPrimaryContact: true,
  },
  {
    id: "team-2",
    name: "Marcus Thorne",
    role: "Caregiver",
    photo: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    id: "team-3",
    name: "Dr. Emily Chen",
    role: "Care Coordinator",
    photo: "https://i.pravatar.cc/150?u=emily",
  },
];

export const visitHistory = [
  {
    id: "hist-1",
    date: "Yesterday, Jul 23",
    caregiver: "Marcus Thorne",
    duration: "4 hours",
    shortNote: "Helped Robert with his afternoon medication. We played a few hands of cards after lunch.",
    tasksCompleted: ["Medication reminders", "Tidy living room", "Reading aloud or conversation"],
    photos: [],
  },
  {
    id: "hist-2",
    date: "Monday, Jul 21",
    caregiver: "Sarah Jenkins",
    duration: "4 hours",
    shortNote: "Good morning overall. Assisted with bathing and dressing.",
    tasksCompleted: ["Help with getting dressed and bathing", "Breakfast preparation", "20-minute walk"],
    photos: [],
  },
];

export const messageThreads = [
  {
    id: "thread-1",
    careTeamMember: "Sarah Jenkins",
    photo: "https://i.pravatar.cc/150?u=sarah",
    lastMessage: "He's doing great today! We are going for a walk now.",
    time: "10:35 AM",
    unread: 1,
    messages: [
      { sender: "Linda Alvarez", text: "Hi Sarah, how is my dad this morning?", time: "10:00 AM", isOwn: true },
      { sender: "Sarah Jenkins", text: "Hi Linda! He's doing great today! We are going for a walk now.", time: "10:35 AM", isOwn: false },
    ],
  },
  {
    id: "thread-2",
    careTeamMember: "Dr. Emily Chen",
    photo: "https://i.pravatar.cc/150?u=emily",
    lastMessage: "I've updated the care plan for next month.",
    time: "Yesterday",
    unread: 1,
    messages: [
      { sender: "Dr. Emily Chen", text: "Hi Linda, just letting you know I've updated the care plan for next month to include more focus on fall prevention.", time: "4:00 PM", isOwn: false },
    ],
  },
];

export const carePlanSummary = {
  focusAreas: [
    { title: "Fall Prevention", progress: 85, description: "Ensuring clear pathways and assisting with mobility." },
    { title: "Medication Support", progress: 100, description: "Daily reminders for morning and evening medications." },
    { title: "Companionship", progress: 95, description: "Engaging in hobbies, conversation, and mental exercises." }
  ],
  tasks: [
    {
      category: "Personal Care",
      items: ["Help with getting dressed and bathing", "Assistance with grooming"]
    },
    {
      category: "Meals",
      items: ["Breakfast preparation", "Lunch preparation", "Clean up dining area"]
    },
    {
      category: "Light Housekeeping",
      items: ["Laundry", "Tidy living room"]
    },
    {
      category: "Health Monitoring",
      items: ["Medication reminders", "Check blood pressure"]
    },
    {
      category: "Companionship",
      items: ["20-minute walk", "Reading aloud or conversation"]
    }
  ]
};

export const billingData = {
  currentBalance: 120.00,
  invoices: [
    { id: "inv-002", date: "Jul 15, 2026", amount: 120.00, status: "Due" },
    { id: "inv-001", date: "Sep 15, 2026", amount: 480.00, status: "Paid" },
  ]
};

export const documentsData = [
  { id: "doc-1", name: "July Care Plan Summary", date: "Jul 1, 2026", type: "PDF", category: "Care Plan Summary", needsSignature: false },
  { id: "doc-2", name: "Service Agreement v2", date: "Jul 20, 2026", type: "PDF", category: "Signed Agreements", needsSignature: true },
  { id: "doc-3", name: "September Invoice", date: "Jul 1, 2026", type: "PDF", category: "Invoices & Receipts", needsSignature: false },
  { id: "doc-4", name: "Aetna Insurance Card", date: "Jan 10, 2026", type: "IMG", category: "Insurance Information", needsSignature: false },
];

export const medicationsData = [
  { id: "med-1", name: "Lisinopril", purpose: "For blood pressure", schedule: "Morning", icon: "pill", todayStatus: "reminded", declineReason: null },
  { id: "med-2", name: "Atorvastatin", purpose: "For cholesterol", schedule: "Evening", icon: "capsule", todayStatus: "upcoming", declineReason: null },
  { id: "med-3", name: "Vitamin D3", purpose: "Supplement", schedule: "Morning", icon: "vitamin", todayStatus: "declined", declineReason: "Client felt nauseous; nurse notified." },
];

export const todosData = [
  { id: "todo-1", text: "Refill Lisinopril prescription by Jul 28", dueDate: "Jul 28, 2026", status: "pending" },
  { id: "todo-2", text: "Sign updated service agreement", dueDate: "Jul 30, 2026", status: "pending" },
  { id: "todo-3", text: "Upcoming care plan review via Zoom", dueDate: "Nov 5, 2026", status: "pending" },
];

export const feedbackHistoryData = [
  { id: "fb-1", date: "Jul 10, 2026", category: "Care Quality", type: "feedback", status: "Resolved", description: "Sarah is doing a wonderful job getting my dad to go on walks." },
  { id: "fb-2", date: "Sep 22, 2026", category: "Scheduling", type: "complaint", status: "Being Reviewed", description: "The weekend caregiver arrived 30 mins late without calling." },
];

export const portalActivities = [
  {
    id: "act-1",
    type: "visit_completed",
    title: "Visit completed",
    description: "Good morning overall. Assisted with bathing and dressing.",
    timestamp: "Today at 1:00 PM",
    link: "/portal/visits", // links into Visit Notes page for detail
  },
  {
    id: "act-2",
    type: "care_plan_updated",
    title: "Care plan updated",
    description: "Added focus on fall prevention.",
    timestamp: "Yesterday",
    link: "/portal/care-plan",
  },
  {
    id: "act-3",
    type: "incident_reported",
    title: "Incident reported",
    description: "Minor skin tear on arm, cleaned and bandaged.",
    timestamp: "Jul 21",
    link: null,
  },
  {
    id: "act-4",
    type: "visit_completed",
    title: "Visit completed",
    description: "Helped Robert with his afternoon medication. We played a few hands of cards after lunch.",
    timestamp: "Jul 21 at 5:00 PM",
    link: "/portal/visits",
  },
  {
    id: "act-5",
    type: "care_plan_updated",
    title: "Care plan updated",
    description: "Adjusted medication schedule.",
    timestamp: "Jul 20",
    link: "/portal/care-plan",
  }
];

export const statusBanner = null; // e.g. { type: 'warning', message: "Today's visit hasn't been confirmed yet" }
