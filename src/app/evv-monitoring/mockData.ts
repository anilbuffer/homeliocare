import { EVVException, TopOffender } from "./types";

export const mockExceptions: EVVException[] = [
  {
    id: "exc-1",
    type: "Wrong GPS location",
    severity: "critical",
    status: "New",
    caregiver: {
      id: "cg-1",
      name: "Marcus Johnson",
      avatarUrl: "https://i.pravatar.cc/150?u=marcus",
    },
    patient: {
      id: "cl-1",
      name: "Eleanor Vance",
    },
    visitDate: "Today",
    scheduledTime: { start: "08:00 AM", end: "11:00 AM" },
    actualTime: { start: "08:05 AM", end: null },
    gpsDistanceMiles: 1.2,
    estimatedBillingImpact: 145.0,
    expectedLocation: { lat: 34.0522, lng: -118.2437 },
    actualLocation: { lat: 34.0622, lng: -118.2537 },
  },
  {
    id: "exc-2",
    type: "Missing clock-out",
    severity: "warning",
    status: "New",
    caregiver: {
      id: "cg-2",
      name: "Sarah Jenkins",
      avatarUrl: "https://i.pravatar.cc/150?u=sarah",
    },
    patient: {
      id: "cl-2",
      name: "Robert Chen",
    },
    visitDate: "Today",
    scheduledTime: { start: "09:00 AM", end: "01:00 PM" },
    actualTime: { start: "08:58 AM", end: null },
    timeDeltaMinutes: -120,
    estimatedBillingImpact: 95.0,
  },
  {
    id: "exc-3",
    type: "Time mismatch",
    severity: "warning",
    status: "Under Review",
    caregiver: {
      id: "cg-3",
      name: "Jessica Alba",
      avatarUrl: "https://i.pravatar.cc/150?u=jessica",
    },
    patient: {
      id: "cl-3",
      name: "Michael Smith",
    },
    visitDate: "Yesterday",
    scheduledTime: { start: "10:00 AM", end: "02:00 PM" },
    actualTime: { start: "10:35 AM", end: "02:15 PM" },
    timeDeltaMinutes: -35, // late clock in
    estimatedBillingImpact: 0,
  },
  {
    id: "exc-4",
    type: "Missing clock-in",
    severity: "critical",
    status: "New",
    caregiver: {
      id: "cg-4",
      name: "David Kim",
      avatarUrl: "https://i.pravatar.cc/150?u=david",
    },
    patient: {
      id: "cl-4",
      name: "Mary Johnson",
    },
    visitDate: "Today",
    scheduledTime: { start: "11:00 AM", end: "03:00 PM" },
    actualTime: { start: null, end: null },
    estimatedBillingImpact: 210.0,
  },
  {
    id: "exc-5",
    type: "Manual adjustment",
    severity: "info",
    status: "Resolved",
    caregiver: {
      id: "cg-5",
      name: "Amanda Hugginkiss",
      avatarUrl: "https://i.pravatar.cc/150?u=amanda",
    },
    patient: {
      id: "cl-5",
      name: "John Doe",
    },
    visitDate: "Yesterday",
    scheduledTime: { start: "01:00 PM", end: "05:00 PM" },
    actualTime: { start: "01:00 PM", end: "05:00 PM" },
    timeDeltaMinutes: 0,
    estimatedBillingImpact: 0,
    notes: "Caregiver forgot phone. Time verified via patient call.",
  }
];

export const mockTopOffenders: TopOffender[] = [
  {
    id: "cg-2",
    name: "Sarah Jenkins",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah",
    exceptionCount: 8,
    mostCommonType: "Missing clock-out",
    trend: "worsening",
  },
  {
    id: "cg-1",
    name: "Marcus Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=marcus",
    exceptionCount: 5,
    mostCommonType: "Wrong GPS location",
    trend: "stable",
  },
  {
    id: "cg-4",
    name: "David Kim",
    avatarUrl: "https://i.pravatar.cc/150?u=david",
    exceptionCount: 3,
    mostCommonType: "Missing clock-in",
    trend: "improving",
  },
];
