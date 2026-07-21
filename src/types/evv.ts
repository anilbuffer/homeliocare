export type AggregatorProvider = 
  | 'HHAeXchange' 
  | 'Sandata' 
  | 'Netsmart' 
  | 'CareBridge' 
  | 'AuthentiCare';

export type SubmissionStatus = 'Sent' | 'Accepted' | 'Rejected' | 'Pending';

export interface EVVSubmission {
  id: string;
  visitId: string;
  patientName: string;
  caregiverName: string;
  date: string; // YYYY-MM-DD
  beginTime: string; // ISO or HH:mm
  endTime: string; // ISO or HH:mm
  serviceType: string;
  location: string;
  aggregator: AggregatorProvider;
  state: string;
  status: SubmissionStatus;
  rejectReason?: string;
  resubmissionCount: number;
  lastUpdated: string;
}

export interface StateReasonCode {
  code: string;
  description: string;
}

export interface StateConfig {
  state: string;
  aggregator: AggregatorProvider;
  roundingRuleMinutes: number; // e.g. 7 or 15 minute rounding
  gracePeriodMinutes: number;
  reasonCodes: StateReasonCode[];
  altEvvStatus: 'Not Started' | 'Testing' | 'Vendor Approved' | 'Active';
}
