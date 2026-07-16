export type ChronologyCategory = 
  | 'admission' 
  | 'visit' 
  | 'medication' 
  | 'vitals' 
  | 'incident' 
  | 'communication' 
  | 'care_plan';

export interface ChronologyEntry {
  id: string;
  clientId: string;
  timestamp: string; // ISO date string
  category: ChronologyCategory;
  summary: string;
  author: string; // e.g. "Priya S. — RN"
  details?: string;
}

export interface ChronologyInsights {
  clientId: string;
  trend: 'Improving' | 'Stable' | 'Declining' | 'Needs attention';
  summary: string;
  flaggedPatterns: { id: string, text: string, relatedEntryIds: string[] }[];
  confidenceNote: string;
}

export const mockChronologyEntries: Record<string, ChronologyEntry[]> = {
  "c-1": [ // Eleanor Vance
    {
      id: "entry-1",
      clientId: "c-1",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      category: "vitals",
      summary: "Blood pressure recorded: 128/82",
      author: "Maria Garcia — RN",
      details: "Patient is resting well. BP is within normal limits. Pulse 72, Temp 98.6°F, O2 98% on room air."
    },
    {
      id: "entry-2",
      clientId: "c-1",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      category: "visit",
      summary: "Routine check-in and assistance with ADLs",
      author: "David Chen — HHA",
      details: "Assisted with morning routine and breakfast preparation. Patient ate 80% of meal. Mood is positive."
    },
    {
      id: "entry-3",
      clientId: "c-1",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      category: "medication",
      summary: "Adjusted morning Lasix dosage per PCP orders",
      author: "Dr. Amanda Chen — PCP",
      details: "Increased furosemide to 40mg daily to manage mild pedal edema."
    },
    {
      id: "entry-4",
      clientId: "c-1",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      category: "communication",
      summary: "Update given to daughter (Sarah)",
      author: "Maria Garcia — RN",
      details: "Called family to report slight increase in swelling in lower extremities. Scheduled follow-up visit with PCP."
    },
    {
      id: "entry-5",
      clientId: "c-1",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
      category: "incident",
      summary: "Patient reported mild dizziness upon standing",
      author: "David Chen — HHA",
      details: "Patient felt dizzy after getting up from recliner too quickly. Sat back down and recovered after 2 minutes. Vital signs stable."
    },
    {
      id: "entry-6",
      clientId: "c-1",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
      category: "care_plan",
      summary: "Care plan updated to include daily weight monitoring",
      author: "Maria Garcia — RN",
      details: "Added strict daily weight tracking to monitor CHF status. Instructed patient and HHA on procedure."
    },
    {
      id: "entry-7",
      clientId: "c-1",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
      category: "admission",
      summary: "Admitted to Home Care Services",
      author: "Admissions Team",
      details: "Initial assessment completed. Primary diagnosis: CHF. Care plan established for skilled nursing and HHA support."
    }
  ]
};

export const mockChronologyInsights: Record<string, ChronologyInsights> = {
  "c-1": {
    clientId: "c-1",
    trend: "Stable",
    summary: "Eleanor has been stable over the last week with good adherence to her updated medication regimen. Her recent vital signs are within normal limits, and the slight dizziness reported last week has not recurred. Family is engaged and informed about her care plan.",
    flaggedPatterns: [
      {
        id: "pattern-1",
        text: "Vitals remain stable following medication adjustment",
        relatedEntryIds: ["entry-1", "entry-3"]
      },
      {
        id: "pattern-2",
        text: "No recurrence of dizziness reported",
        relatedEntryIds: ["entry-5"]
      }
    ],
    confidenceNote: "Based on 7 caregiver entries and 1 family check-in, last updated 2 hours ago"
  }
};
