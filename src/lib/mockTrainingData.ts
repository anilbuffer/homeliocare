export interface Course {
  id: string;
  title: string;
  category: string;
  format: "Video" | "Reading" | "PDF" | "PowerPoint";
  duration: string; // e.g. '45m'
  required: boolean;
  thumbnailColor: string; // For mock purposes, a tailwind bg class or color code
  passRate: number; // For admin view
  attemptsAllowed: number;
  assignedCount: number;
  completionRate: number; // overall completion % across agency
}

export interface UserCourse {
  courseId: string;
  status: "Not Started" | "In Progress" | "Completed" | "Expired";
  dueDate?: string;
  progress: number; // 0-100
}

export interface Certification {
  id: string;
  name: string;
  issued: string;
  expires: string;
  status: "Active" | "Expiring Soon" | "Expired";
}

export interface StaffTrainingStatus {
  id: string;
  name: string;
  avatar: string;
  role: string;
  coursesCompleted: number;
  coursesTotal: number;
  complianceScore: number;
  certificationsExpiring: number;
  lastActivity: string;
  status: "On track" | "At risk" | "Overdue";
  daysOverdue?: number; // if overdue
  daysLeft?: number; // if expiring soon
}

export const MOCK_COURSES: Course[] = [
  { id: "c1", title: "HIPAA Privacy Essentials 2026", category: "HIPAA", format: "Video", duration: "45m", required: true, thumbnailColor: "bg-brand-teal", passRate: 80, attemptsAllowed: 3, assignedCount: 31, completionRate: 87 },
  { id: "c2", title: "Bloodborne Pathogens & OSHA", category: "OSHA", format: "Video", duration: "60m", required: true, thumbnailColor: "bg-accent-blue", passRate: 80, attemptsAllowed: 3, assignedCount: 49, completionRate: 74 },
  { id: "c3", title: "Hand Hygiene & Infection Control", category: "Infection Control", format: "Reading", duration: "25m", required: true, thumbnailColor: "bg-accent-purple", passRate: 80, attemptsAllowed: 3, assignedCount: 54, completionRate: 92 },
  { id: "c4", title: "Medication Administration Safety", category: "Medication Management", format: "Video", duration: "55m", required: true, thumbnailColor: "bg-accent-amber", passRate: 80, attemptsAllowed: 3, assignedCount: 48, completionRate: 68 },
  { id: "c5", title: "Incident Reporting Workflow", category: "Incident Reporting", format: "PDF", duration: "20m", required: true, thumbnailColor: "bg-slate-500", passRate: 80, attemptsAllowed: 3, assignedCount: 22, completionRate: 89 },
  { id: "c6", title: "Abuse & Neglect Prevention", category: "Abuse Prevention", format: "Video", duration: "45m", required: true, thumbnailColor: "bg-accent-red", passRate: 80, attemptsAllowed: 3, assignedCount: 25, completionRate: 81 },
  { id: "c7", title: "Dementia & Alzheimer's Care", category: "Dementia Care", format: "Video", duration: "90m", required: true, thumbnailColor: "bg-accent-purple", passRate: 80, attemptsAllowed: 3, assignedCount: 58, completionRate: 71 },
  { id: "c8", title: "CPR & First Aid Recertification", category: "CPR/First Aid", format: "Video", duration: "120m", required: true, thumbnailColor: "bg-accent-red", passRate: 80, attemptsAllowed: 3, assignedCount: 58, completionRate: 65 },
  { id: "c9", title: "Fire Safety in the Home", category: "Fire Safety", format: "PowerPoint", duration: "30m", required: true, thumbnailColor: "bg-brand-teal", passRate: 80, attemptsAllowed: 3, assignedCount: 45, completionRate: 94 },
  { id: "c10", title: "Emergency Preparedness Playbook", category: "Emergency Prep", format: "PDF", duration: "35m", required: true, thumbnailColor: "bg-accent-blue", passRate: 80, attemptsAllowed: 3, assignedCount: 45, completionRate: 80 },
  { id: "c11", title: "Safe Lifting & Transfer Techniques", category: "Lifting Techniques", format: "Video", duration: "50m", required: true, thumbnailColor: "bg-brand-teal", passRate: 80, attemptsAllowed: 3, assignedCount: 50, completionRate: 85 },
  { id: "c12", title: "Client Rights & Dignity", category: "Client Rights", format: "Reading", duration: "30m", required: true, thumbnailColor: "bg-accent-purple", passRate: 80, attemptsAllowed: 3, assignedCount: 50, completionRate: 88 },
  { id: "c13", title: "Documentation Best Practices", category: "Documentation", format: "Video", duration: "60m", required: true, thumbnailColor: "bg-accent-amber", passRate: 80, attemptsAllowed: 3, assignedCount: 50, completionRate: 75 },
  { id: "c14", title: "Communication with Families", category: "Communication", format: "Video", duration: "35m", required: false, thumbnailColor: "bg-accent-blue", passRate: 80, attemptsAllowed: 3, assignedCount: 15, completionRate: 90 },
  { id: "c15", title: "Cultural Competency in Care", category: "Cultural Competency", format: "Reading", duration: "40m", required: false, thumbnailColor: "bg-accent-purple", passRate: 80, attemptsAllowed: 3, assignedCount: 20, completionRate: 85 },
  { id: "c16", title: "De-escalation & Behavior Support", category: "Behavior Management", format: "Video", duration: "50m", required: true, thumbnailColor: "bg-accent-red", passRate: 80, attemptsAllowed: 3, assignedCount: 30, completionRate: 82 },
  { id: "c17", title: "Privacy & Cybersecurity Basics", category: "Privacy & Cyber Security", format: "Video", duration: "30m", required: true, thumbnailColor: "bg-slate-600", passRate: 80, attemptsAllowed: 3, assignedCount: 50, completionRate: 74 },
];

export const MOCK_USER_COURSES: UserCourse[] = [
  { courseId: "c1", status: "In Progress", progress: 62, dueDate: "Jul 28, 2026" },
  { courseId: "c2", status: "Not Started", progress: 0, dueDate: "Jul 25, 2026" },
  { courseId: "c3", status: "Completed", progress: 100 },
  { courseId: "c4", status: "In Progress", progress: 34, dueDate: "Aug 02, 2026" },
  { courseId: "c5", status: "Completed", progress: 100 },
  { courseId: "c6", status: "Expired", progress: 15, dueDate: "Jun 15, 2026" },
  { courseId: "c7", status: "Not Started", progress: 0, dueDate: "Aug 15, 2026" },
  { courseId: "c8", status: "In Progress", progress: 18, dueDate: "Jul 12, 2026" },
  { courseId: "c9", status: "Completed", progress: 100 },
  { courseId: "c10", status: "Not Started", progress: 0, dueDate: "Aug 30, 2026" },
  { courseId: "c11", status: "Completed", progress: 100 },
  { courseId: "c12", status: "In Progress", progress: 45, dueDate: "Jul 28, 2026" },
  { courseId: "c13", status: "Not Started", progress: 0, dueDate: "Aug 05, 2026" },
  { courseId: "c16", status: "Not Started", progress: 0, dueDate: "Aug 20, 2026" },
  { courseId: "c17", status: "In Progress", progress: 79, dueDate: "Jul 18, 2026" },
];

export const MOCK_CERTIFICATIONS: Certification[] = [
  { id: "cert1", name: "Certified Nursing Assistant (CNA)", issued: "Mar 12, 2024", expires: "Mar 12, 2026", status: "Active" },
  { id: "cert2", name: "CPR & AED Provider", issued: "Aug 04, 2024", expires: "Aug 04, 2026", status: "Expiring Soon" },
  { id: "cert3", name: "HIPAA Compliance", issued: "Jul 20, 2025", expires: "Jul 20, 2026", status: "Active" },
  { id: "cert4", name: "Bloodborne Pathogens", issued: "Jun 01, 2025", expires: "Jun 01, 2026", status: "Expired" },
  { id: "cert5", name: "Alzheimer's Care Specialist", issued: "May 15, 2025", expires: "May 15, 2026", status: "Active" },
  { id: "cert6", name: "First Aid Certified", issued: "Feb 04, 2024", expires: "Sep 04, 2026", status: "Expiring Soon" },
];

export const MOCK_STAFF_STATUS: StaffTrainingStatus[] = [
  { id: "s1", name: "James O'Brien", avatar: "JO", role: "RN", coursesCompleted: 9, coursesTotal: 17, complianceScore: 53, certificationsExpiring: 4, lastActivity: "1 wk ago", status: "Overdue", daysOverdue: 14 },
  { id: "s2", name: "Sofia Rossi", avatar: "SR", role: "CNA", coursesCompleted: 10, coursesTotal: 17, complianceScore: 59, certificationsExpiring: 2, lastActivity: "4d ago", status: "Overdue", daysOverdue: 22 },
  { id: "s3", name: "Aisha Williams", avatar: "AW", role: "HHA", coursesCompleted: 11, coursesTotal: 17, complianceScore: 65, certificationsExpiring: 3, lastActivity: "3d ago", status: "At risk", daysLeft: 8 },
  { id: "s4", name: "Rachel Kim", avatar: "RK", role: "HHA", coursesCompleted: 13, coursesTotal: 17, complianceScore: 76, certificationsExpiring: 2, lastActivity: "2d ago", status: "At risk", daysLeft: 41 },
  { id: "s5", name: "Maria Santos", avatar: "MS", role: "CNA", coursesCompleted: 14, coursesTotal: 17, complianceScore: 82, certificationsExpiring: 2, lastActivity: "Yesterday", status: "On track", daysOverdue: 3 },
  { id: "s6", name: "Carlos Mendez", avatar: "CM", role: "CNA", coursesCompleted: 15, coursesTotal: 17, complianceScore: 88, certificationsExpiring: 1, lastActivity: "5h ago", status: "On track" },
  { id: "s7", name: "Priya Patel", avatar: "PP", role: "RN", coursesCompleted: 16, coursesTotal: 17, complianceScore: 94, certificationsExpiring: 1, lastActivity: "2h ago", status: "On track" },
  { id: "s8", name: "David Nguyen", avatar: "DN", role: "RN", coursesCompleted: 17, coursesTotal: 17, complianceScore: 100, certificationsExpiring: 0, lastActivity: "1h ago", status: "On track" },
];

export const MOCK_QUIZ_STATS = {
  averagePassRate: 86,
  mostFailedQuestions: [
    { question: "Medication timing & PRN...", passRate: 42 },
    { question: "HIPAA social media scenario", passRate: 58 },
    { question: "Fall risk assessment steps", passRate: 64 },
  ]
};

export const MOCK_SURVEYS = [
  { name: "Employee Satisfaction", responseRate: 78, link: "#" },
  { name: "Course Feedback", responseRate: 64, link: "#" },
  { name: "Knowledge Assessment", responseRate: 91, link: "#" },
  { name: "Annual Survey", responseRate: 55, link: "#" }
];
