import { PartnerOrganization, PartnerTeamMember, PartnerKPIs, PartnerReferral } from "./types";

export const mockOrganization: PartnerOrganization = {
  id: "org-1001",
  name: "Mercy General Hospital",
  type: "Hospital System",
  primaryContact: "Dr. Sarah Jenkins",
  primaryPhone: "(555) 123-4567",
  primaryEmail: "s.jenkins@mercygeneral.org",
  address: "123 Healthcare Blvd, Medical District, NY 10010"
};

export const mockTeamMembers: PartnerTeamMember[] = [
  { id: "tm-1", name: "Dr. Sarah Jenkins", role: "Director of Discharge Planning", email: "s.jenkins@mercygeneral.org", phone: "(555) 123-4567", status: "Active" },
  { id: "tm-2", name: "Marcus Webb", role: "Discharge Coordinator", email: "m.webb@mercygeneral.org", phone: "(555) 123-4568", status: "Active" },
  { id: "tm-3", name: "Elena Rostova", role: "Social Worker", email: "e.rostova@mercygeneral.org", phone: "(555) 123-4569", status: "Active" }
];

export const mockKPIs: PartnerKPIs = {
  referralsSubmittedThisMonth: 24,
  conversionRate: 72,
  avgResponseTimeHours: 1.5,
  openInReview: 5
};

export const mockReferrals: PartnerReferral[] = [
  {
    id: "ref-901",
    patientName: "Robert Miller",
    patientInitials: "RM",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "Received",
    urgency: "Discharge within 24-48h",
    submittingMember: "Marcus Webb",
    serviceRequested: "Post-op Care & PT"
  },
  {
    id: "ref-902",
    patientName: "Susan Chen",
    patientInitials: "SC",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    status: "Under Review",
    urgency: "Normal",
    submittingMember: "Elena Rostova",
    serviceRequested: "Companionship & Med Reminders"
  },
  {
    id: "ref-903",
    patientName: "James Wilson",
    patientInitials: "JW",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: "Additional Info Requested",
    urgency: "Normal",
    submittingMember: "Marcus Webb",
    serviceRequested: "Dementia Care",
    notes: "Please provide the latest neuro assessment."
  },
  {
    id: "ref-904",
    patientName: "Maria Garcia",
    patientInitials: "MG",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    status: "Accepted as Client",
    urgency: "Discharge within 24-48h",
    submittingMember: "Dr. Sarah Jenkins",
    serviceRequested: "24/7 Home Care"
  },
  {
    id: "ref-905",
    patientName: "William Turner",
    patientInitials: "WT",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    status: "Not a Fit",
    urgency: "Normal",
    submittingMember: "Elena Rostova",
    serviceRequested: "Skilled Nursing",
    notes: "Requires continuous skilled nursing which we do not provide."
  },
  {
    id: "ref-906",
    patientName: "Alice Freeman",
    patientInitials: "AF",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    status: "Accepted as Client",
    urgency: "Normal",
    submittingMember: "Marcus Webb",
    serviceRequested: "Daily ADL Assistance"
  }
];
