export type ContactStatus = "online" | "away" | "offline";
export type ConversationCategory = "Clients" | "Family Members" | "Staff & Caregivers" | "Care Team Channels" | "Announcements";
export type ChannelMode = "in-app" | "sms" | "email";
export type MessageDeliveryStatus = "sent" | "delivered" | "read" | "failed" | "queued";

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: ContactStatus;
  phone: string;
  email: string;
  preferredLanguage?: string;
  notificationPreferences?: string;
  linkedProfileUrl?: string;
}

export interface LinkedRecord {
  id: string;
  type: "Visit" | "Incident" | "Care Plan" | "Client";
  label: string;
  url: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string; // "me" for the current user
  content: string;
  timestamp: string;
  channelMode: ChannelMode;
  deliveryStatus: MessageDeliveryStatus;
  isInternalNote: boolean;
  isPHIWarning?: boolean;
  hasAttachment?: boolean;
  attachmentUrl?: string;
}

export interface Conversation {
  id: string;
  categoryId: ConversationCategory;
  participants: Contact[];
  lastMessage: Message;
  unreadCount: number;
  isUrgent: boolean;
  isMuted: boolean;
  isArchived: boolean;
  linkedRecord?: LinkedRecord;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  audience: string;
  date: string;
  readRate: number;
  requiresAcknowledgment: boolean;
}

// MOCK DATA

export const mockContacts: Record<string, Contact> = {
  c1: { id: "c1", name: "Robert Alvarez", avatar: "", role: "Client", status: "online", phone: "555-0101", email: "robert@example.com" },
  c2: { id: "c2", name: "Linda Chen", avatar: "", role: "Daughter/Family", status: "away", phone: "555-0102", email: "linda@example.com", preferredLanguage: "Spanish" },
  c3: { id: "c3", name: "Sarah Jenkins", avatar: "", role: "Caregiver", status: "offline", phone: "555-0103", email: "sarah@example.com" },
  c4: { id: "c4", name: "Dr. Emily Wong", avatar: "", role: "Primary Nurse", status: "online", phone: "555-0104", email: "emily@example.com" },
};

export const mockMessages: Record<string, Message[]> = {
  "conv_1": [
    { id: "m1", conversationId: "conv_1", senderId: "c1", content: "Hello, what time is the visit today?", timestamp: "10:30 AM", channelMode: "sms", deliveryStatus: "read", isInternalNote: false },
    { id: "m2", conversationId: "conv_1", senderId: "me", content: "Hi Robert, Sarah will be there at 2:00 PM.", timestamp: "10:35 AM", channelMode: "sms", deliveryStatus: "delivered", isInternalNote: false },
  ],
  "conv_2": [
    { id: "m3", conversationId: "conv_2", senderId: "c2", content: "Is the medication list updated?", timestamp: "Yesterday", channelMode: "email", deliveryStatus: "read", isInternalNote: false },
    { id: "m4", conversationId: "conv_2", senderId: "me", content: "Yes, I will send it over.", timestamp: "Yesterday", channelMode: "in-app", deliveryStatus: "read", isInternalNote: false },
    { id: "m5", conversationId: "conv_2", senderId: "me", content: "Need to verify if we need an updated prescription.", timestamp: "Yesterday", channelMode: "in-app", deliveryStatus: "sent", isInternalNote: true },
  ],
  "conv_3": [
    { id: "m6", conversationId: "conv_3", senderId: "c4", content: "Patient's blood pressure is slightly elevated.", timestamp: "9:00 AM", channelMode: "in-app", deliveryStatus: "read", isInternalNote: true },
    { id: "m7", conversationId: "conv_3", senderId: "me", content: "Noted. We will monitor it.", timestamp: "9:15 AM", channelMode: "in-app", deliveryStatus: "read", isInternalNote: true },
  ]
};

export const mockConversations: Conversation[] = [
  {
    id: "conv_1",
    categoryId: "Clients",
    participants: [mockContacts.c1],
    lastMessage: mockMessages["conv_1"][1],
    unreadCount: 0,
    isUrgent: false,
    isMuted: false,
    isArchived: false,
    linkedRecord: { id: "visit_4521", type: "Visit", label: "Visit #4521", url: "#" }
  },
  {
    id: "conv_2",
    categoryId: "Family Members",
    participants: [mockContacts.c2],
    lastMessage: mockMessages["conv_2"][2],
    unreadCount: 1,
    isUrgent: false,
    isMuted: false,
    isArchived: false,
  },
  {
    id: "conv_3",
    categoryId: "Care Team Channels",
    participants: [mockContacts.c3, mockContacts.c4],
    lastMessage: mockMessages["conv_3"][1],
    unreadCount: 2,
    isUrgent: true,
    isMuted: false,
    isArchived: false,
    linkedRecord: { id: "client_101", type: "Client", label: "Margaret Chen", url: "#" }
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "a1",
    title: "Updated COVID-19 Protocols",
    content: "Please review the attached updated protocols for home visits starting next week.",
    audience: "All Staff",
    date: "Oct 12, 2026",
    readRate: 85,
    requiresAcknowledgment: true
  },
  {
    id: "a2",
    title: "Office Closed for Holidays",
    content: "Our main office will be closed on November 26th and 27th.",
    audience: "All Families",
    date: "Oct 10, 2026",
    readRate: 60,
    requiresAcknowledgment: false
  }
];
