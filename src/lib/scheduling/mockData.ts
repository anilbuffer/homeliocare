export type ShiftStatus = 'Unfilled' | 'Pending Confirmation' | 'Confirmed' | 'In Progress' | 'Completed' | 'Call-Off';

export interface Caregiver {
  id: string;
  name: string;
  avatarUrl?: string;
  credentials: string[];
  rating: number;
  distanceMiles?: number;
}

export interface Patient {
  id: string;
  name: string;
  address: string;
}

export interface Shift {
  id: string;
  patientId: string;
  patientName: string;
  patientAddress: string;
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
    patientId: 'cl1',
    patientName: 'Mabel Ortiz',
    patientAddress: '1201 Grand St, Queen',
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
    patientId: 'cl2',
    patientName: 'George Patel',
    patientAddress: '331 Wyckoff Ave, Bust',
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
    patientId: 'cl3',
    patientName: 'Frank Delaney',
    patientAddress: '77 Boerum Pl, Brookly',
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
    patientId: 'cl4',
    patientName: 'Harold Simmons',
    patientAddress: '98 5th Ave, Brookly',
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
    patientId: 'cl5',
    patientName: 'Rosa Beltran',
    patientAddress: '9 Vernon Blvd, LIC',
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
    patientId: 'cl6',
    patientName: 'Eleanor Whitaker',
    patientAddress: '412 Oak Ln, Astoria',
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
    patientId: 'cl7',
    patientName: 'Doris Hensley',
    patientAddress: '540 Metropolitan A',
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
    patientId: 'cl8',
    patientName: 'Albert Wright',
    patientAddress: '110 W 14th St',
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
    patientId: 'cl9',
    patientName: 'Betty Cooper',
    patientAddress: '23 River Rd',
    requiredSkills: ['CNA'],
    startTime: '2026-07-08T16:00:00Z',
    endTime: '2026-07-08T20:00:00Z',
    status: 'Unfilled',
    region: 'Bronx',
    assignedCaregiverId: null,
    shiftNumber: '#59'
  }
];
