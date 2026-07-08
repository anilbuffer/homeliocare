export type ShiftStatus = 'Unfilled' | 'Pending Confirmation' | 'Confirmed' | 'In Progress' | 'Completed' | 'Call-Off';

export interface Caregiver {
  id: string;
  name: string;
  avatarUrl?: string;
  credentials: string[];
  rating: number;
  distanceMiles?: number;
}

export interface Client {
  id: string;
  name: string;
  address: string;
}

export interface Shift {
  id: string;
  clientId: string;
  clientName: string;
  clientAddress: string;
  requiredSkills: string[];
  startTime: string; // ISO date string or simplified "10a-2p"
  endTime: string;
  status: ShiftStatus;
  region: string;
  assignedCaregiverId: string | null;
  assignedCaregiverName?: string;
  assignedCaregiverAvatar?: string;
  shiftNumber: string;
  notes?: string;
}

export const mockCaregivers: Caregiver[] = [
  { id: 'c1', name: 'Mabel Ortiz', credentials: ['HHA', 'Hoyer'], rating: 4.8, distanceMiles: 2.1 },
  { id: 'c2', name: 'George Patel', credentials: ['CNA'], rating: 4.5, distanceMiles: 1.5 },
  { id: 'c3', name: 'Maria Alvarez', credentials: ['HHA', 'Dementia'], rating: 4.9, distanceMiles: 3.0 },
  { id: 'c4', name: 'James Okafor', credentials: ['CNA', 'Diabetes'], rating: 4.7, distanceMiles: 4.2 },
  { id: 'c5', name: 'Priya Shah', credentials: ['HHA', 'Post-op'], rating: 4.6, distanceMiles: 0.8 },
  { id: 'c6', name: 'Devon Brooks', credentials: ['CNA', 'Hoyer'], rating: 4.4, distanceMiles: 5.1 },
  { id: 'c7', name: 'Aisha Nguyen', credentials: ['HHA', 'Dementia'], rating: 4.8, distanceMiles: 2.5 },
  { id: 'c8', name: 'Robert Chen', credentials: ['CNA'], rating: 4.7, distanceMiles: 1.9 },
  { id: 'c9', name: 'Eleanor Whitaker', credentials: ['HHA', 'Dementia'], rating: 4.9, distanceMiles: 3.3 },
  { id: 'c10', name: 'Harold Simmons', credentials: ['CNA', 'Diabetes'], rating: 4.6, distanceMiles: 2.2 },
];

export const mockShifts: Shift[] = [
  {
    id: 's1',
    clientId: 'cl1',
    clientName: 'Mabel Ortiz',
    clientAddress: '1201 Grand St, Queen',
    requiredSkills: ['HHA', 'Hoyer'],
    startTime: '2026-07-08T10:00:00Z',
    endTime: '2026-07-08T14:00:00Z',
    status: 'Unfilled',
    region: 'Queens',
    assignedCaregiverId: null,
    shiftNumber: '#53'
  },
  {
    id: 's2',
    clientId: 'cl2',
    clientName: 'George Patel',
    clientAddress: '331 Wyckoff Ave, Bust',
    requiredSkills: ['CNA'],
    startTime: '2026-07-08T15:00:00Z',
    endTime: '2026-07-08T19:00:00Z',
    status: 'Unfilled',
    region: 'Brooklyn',
    assignedCaregiverId: null,
    shiftNumber: '#56'
  },
  {
    id: 's3',
    clientId: 'cl3',
    clientName: 'Frank Delaney',
    clientAddress: '77 Boerum Pl, Brookly',
    requiredSkills: ['HHA'],
    startTime: '2026-07-08T12:00:00Z',
    endTime: '2026-07-08T16:00:00Z',
    status: 'Pending Confirmation',
    region: 'Brooklyn',
    assignedCaregiverId: 'c5',
    assignedCaregiverName: 'Priya Shah',
    shiftNumber: '#54'
  },
  {
    id: 's4',
    clientId: 'cl4',
    clientName: 'Harold Simmons',
    clientAddress: '98 5th Ave, Brookly',
    requiredSkills: ['CNA', 'Diabetes'],
    startTime: '2026-07-08T09:00:00Z',
    endTime: '2026-07-08T13:00:00Z',
    status: 'Confirmed',
    region: 'Brooklyn',
    assignedCaregiverId: 'c4',
    assignedCaregiverName: 'James Okafor',
    shiftNumber: '#52'
  },
  {
    id: 's5',
    clientId: 'cl5',
    clientName: 'Rosa Beltran',
    clientAddress: '9 Vernon Blvd, LIC',
    requiredSkills: ['HHA', 'Diabetes'],
    startTime: '2026-07-08T14:00:00Z',
    endTime: '2026-07-08T18:00:00Z',
    status: 'Confirmed',
    region: 'Queens',
    assignedCaregiverId: 'c7',
    assignedCaregiverName: 'Aisha Nguyen',
    shiftNumber: '#55'
  },
  {
    id: 's6',
    clientId: 'cl6',
    clientName: 'Eleanor Whitaker',
    clientAddress: '412 Oak Ln, Astoria',
    requiredSkills: ['HHA', 'Dementia'],
    startTime: '2026-07-08T08:00:00Z',
    endTime: '2026-07-08T12:00:00Z',
    status: 'In Progress',
    region: 'Queens',
    assignedCaregiverId: 'c3',
    assignedCaregiverName: 'Maria Alvarez',
    shiftNumber: '#51'
  },
  {
    id: 's7',
    clientId: 'cl7',
    clientName: 'Doris Hensley',
    clientAddress: '540 Metropolitan A',
    requiredSkills: ['HHA'],
    startTime: '2026-07-08T07:00:00Z',
    endTime: '2026-07-08T11:00:00Z',
    status: 'Completed',
    region: 'Manhattan',
    assignedCaregiverId: 'c8',
    assignedCaregiverName: 'Robert Chen',
    shiftNumber: '#57'
  },
  {
    id: 's8',
    clientId: 'cl8',
    clientName: 'Albert Wright',
    clientAddress: '110 W 14th St',
    requiredSkills: ['HHA', 'Post-op'],
    startTime: '2026-07-08T10:30:00Z',
    endTime: '2026-07-08T14:30:00Z',
    status: 'Call-Off',
    region: 'Manhattan',
    assignedCaregiverId: null,
    shiftNumber: '#58'
  },
  {
    id: 's9',
    clientId: 'cl9',
    clientName: 'Betty Cooper',
    clientAddress: '23 River Rd',
    requiredSkills: ['CNA'],
    startTime: '2026-07-08T16:00:00Z',
    endTime: '2026-07-08T20:00:00Z',
    status: 'Unfilled',
    region: 'Bronx',
    assignedCaregiverId: null,
    shiftNumber: '#59'
  }
];
