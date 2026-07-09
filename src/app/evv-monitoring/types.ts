export type ExceptionType =
  | "Wrong GPS location"
  | "Missing clock-in"
  | "Missing clock-out"
  | "Time mismatch"
  | "Manual adjustment";

export type ExceptionSeverity = "critical" | "warning" | "info";
export type ExceptionStatus = "New" | "Under Review" | "Resolved" | "Disputed";

export interface EVVException {
  id: string;
  type: ExceptionType;
  severity: ExceptionSeverity;
  status: ExceptionStatus;
  caregiver: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  client: {
    id: string;
    name: string;
  };
  visitDate: string;
  scheduledTime: {
    start: string;
    end: string;
  };
  actualTime: {
    start: string | null;
    end: string | null;
  };
  timeDeltaMinutes?: number; // e.g. -36 (early clock-out or late clock-in)
  gpsDistanceMiles?: number; // distance from expected location
  estimatedBillingImpact: number; // dollar amount at risk
  notes?: string;
  expectedLocation?: {
    lat: number;
    lng: number;
  };
  actualLocation?: {
    lat: number;
    lng: number;
  };
}

export interface TopOffender {
  id: string;
  name: string;
  avatarUrl?: string;
  exceptionCount: number;
  mostCommonType: ExceptionType;
  trend: "improving" | "worsening" | "stable";
}
