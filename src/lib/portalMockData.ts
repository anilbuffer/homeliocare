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
    date: "Tomorrow, Oct 25",
    time: "9:00 AM - 1:00 PM",
    caregiverName: "Sarah Jenkins",
  },
  {
    id: "visit-3",
    date: "Friday, Oct 27",
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
    date: "Yesterday, Oct 23",
    caregiver: "Marcus Thorne",
    duration: "4 hours",
    shortNote: "Helped Robert with his afternoon medication. We played a few hands of cards after lunch.",
    tasksCompleted: ["Medication reminder", "Light housekeeping", "Companionship"],
    photos: [],
  },
  {
    id: "hist-2",
    date: "Monday, Oct 21",
    caregiver: "Sarah Jenkins",
    duration: "4 hours",
    shortNote: "Good morning overall. Assisted with bathing and dressing.",
    tasksCompleted: ["Personal Care", "Meal preparation", "Mobility assistance"],
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
};

export const billingData = {
  currentBalance: 120.00,
  invoices: [
    { id: "inv-002", date: "Oct 15, 2026", amount: 120.00, status: "Due" },
    { id: "inv-001", date: "Sep 15, 2026", amount: 480.00, status: "Paid" },
  ]
};

export const documentsData = [
  { id: "doc-1", name: "October Care Plan Summary", date: "Oct 1, 2026", type: "PDF" },
  { id: "doc-2", name: "Service Agreement", date: "Jan 15, 2026", type: "PDF" },
];
