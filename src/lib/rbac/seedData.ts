import {
  Role,
  Module,
  RolePermission,
  User,
  AuditLog,
  Branch,
  ClientOption,
} from "./types";

export const SEED_BRANCHES: Branch[] = [
  { id: "branch-north", name: "North Regional Branch", code: "NR-01" },
  { id: "branch-south", name: "South Metro Branch", code: "SM-02" },
  { id: "branch-east", name: "East Valley Branch", code: "EV-03" },
  { id: "branch-west", name: "Westside Care Center", code: "WC-04" },
  { id: "branch-central", name: "Central Headquarters", code: "HQ-00" },
];

export const SEED_CLIENT_OPTIONS: ClientOption[] = [
  { id: "cli-101", name: "Eleanor Vance", mrn: "MRN-88491" },
  { id: "cli-102", name: "Arthur Pendelton", mrn: "MRN-33920" },
  { id: "cli-103", name: "Margaret Higgins", mrn: "MRN-77102" },
  { id: "cli-104", name: "Samuel Oak", mrn: "MRN-11293" },
  { id: "cli-105", name: "Dorothy Gale", mrn: "MRN-64820" },
];

export const SEED_ROLES: Role[] = [
  // Internal Roles (12)
  {
    id: "super_admin",
    name: "Super Admin",
    tier: "internal",
    is_system_role: true,
    description: "Platform owner / IT administrator with full unscoped system control, user management, and security audit access.",
  },
  {
    id: "exec_ops_director",
    name: "Executive / Operations Director",
    tier: "internal",
    is_system_role: true,
    description: "Agency leadership oversight with comprehensive view of dashboard analytics, financial billing, compliance, and QA.",
  },
  {
    id: "branch_regional_mgr",
    name: "Branch / Regional Manager",
    tier: "internal",
    is_system_role: true,
    description: "Multi-location manager with executive-level visibility scoped to their assigned regional branch.",
  },
  {
    id: "care_intake_coord",
    name: "Care Coordinator / Intake Coordinator",
    tier: "internal",
    is_system_role: true,
    description: "Manages referral intake pipeline to admission, client profile creation, and initial visit assignments.",
  },
  {
    id: "scheduler_dispatcher",
    name: "Scheduler / Dispatcher",
    tier: "internal",
    is_system_role: true,
    description: "Day-to-day shift coverage, caregiver tracking, and roster scheduling. Excludes client clinical notes.",
  },
  {
    id: "clinical_supervisor_rn",
    name: "Clinical Supervisor / RN",
    tier: "internal",
    is_system_role: true,
    description: "Clinical care plan oversight, RN evaluations, medication audits, and clinical incident reviews.",
  },
  {
    id: "qa_compliance_officer",
    name: "QA / Compliance Officer",
    tier: "internal",
    is_system_role: true,
    description: "Audits & regulatory compliance officer with full access to compliance tracking, QA, and restricted incident reports.",
  },
  {
    id: "hr_mgr_recruiter",
    name: "HR Manager / Recruiter",
    tier: "internal",
    is_system_role: true,
    description: "Staffing & people operations, caregiver roster & HR files, onboarding pipeline, LMS assignments, and payroll view.",
  },
  {
    id: "billing_finance_staff",
    name: "Billing / Finance Staff",
    tier: "internal",
    is_system_role: true,
    description: "Revenue cycle management, claims processing, and financial reporting. Accesses client insurance/demographics only.",
  },
  {
    id: "trainer_lms_admin",
    name: "Trainer / Training Administrator",
    tier: "internal",
    is_system_role: true,
    description: "LMS content authoring, course builder, quiz management, and training compliance tracking.",
  },
  {
    id: "field_supervisor",
    name: "Field Supervisor",
    tier: "internal",
    is_system_role: true,
    description: "In-person evaluations, field supervisory visit logs, incident creation, and caregiver performance management for assigned team.",
  },
  {
    id: "caregiver_field",
    name: "Caregiver (Field Staff)",
    tier: "internal",
    is_system_role: true,
    description: "Direct care delivery staff. Manages own schedule, EVV clock-in/out, visit task documentation, and training courses.",
  },

  // External Roles (3)
  {
    id: "portal_client",
    name: "Client (Patient)",
    tier: "external",
    is_system_role: true,
    description: "Self-service client portal access strictly scoped to their own personal care plan, schedule, billing, and messaging.",
  },
  {
    id: "portal_family",
    name: "Family Member / Guardian",
    tier: "external",
    is_system_role: true,
    description: "Care oversight portal for designated family members or guardians linked to specific client accounts.",
  },
  {
    id: "portal_referral_source",
    name: "Referral Source (Provider)",
    tier: "external",
    is_system_role: true,
    description: "External portal for hospitals, physicians, and social workers to submit inbound client referrals and check status.",
  },
];

export const SEED_MODULES: Module[] = [
  // Admin Category (15)
  {
    id: "mod_dashboard",
    name: "Dashboard",
    category: "admin",
    description: "Executive analytics, KPI summary widgets, and operational alerts.",
  },
  {
    id: "mod_patients",
    name: "Patients / Client Profile",
    category: "admin",
    description: "Client demographics, clinical care plans, insurance billing details, and face sheets.",
    has_sub_toggles: true,
    sub_toggle_definitions: [
      {
        key: "clinical_notes",
        label: "Clinical Notes & Care Plan",
        description: "PHI, diagnosis codes, nursing notes, and care plan details.",
        defaultValue: true,
      },
      {
        key: "demographics_insurance",
        label: "Demographics & Insurance",
        description: "Client contact info, emergency contacts, payer ID, and insurance policies.",
        defaultValue: true,
      },
      {
        key: "billing_balance",
        label: "Billing & Account Balance",
        description: "Client private pay rates, copays, invoices, and ledger balance.",
        defaultValue: true,
      },
    ],
  },
  {
    id: "mod_scheduling",
    name: "Scheduling",
    category: "admin",
    description: "Master calendar, shift matching, open shift dispatching, and visit authorizations.",
  },
  {
    id: "mod_caregivers",
    name: "Caregivers & HR",
    category: "admin",
    description: "Caregiver roster, background checks, HR onboarding, and credentialing.",
  },
  {
    id: "mod_payroll",
    name: "Payroll",
    category: "admin",
    description: "Caregiver timesheet calculations, gross pay rates, mileage, and payroll exports.",
  },
  {
    id: "mod_billing",
    name: "Billing & Claims",
    category: "admin",
    description: "Electronic 837 claims generation, ERA posting, invoice generation, and AR tracking.",
  },
  {
    id: "mod_incidents",
    name: "Incident & Risk",
    category: "admin",
    description: "Safety incident logs, fall reports, medication errors, and OSHA tracking.",
    has_sub_toggles: true,
    sub_toggle_definitions: [
      {
        key: "restricted_incidents",
        label: "Restricted Incidents (Abuse/Neglect/HIPAA Breach)",
        description: "High-sensitivity incident reports involving allegations of abuse, neglect, theft, or HIPAA breaches.",
        defaultValue: false,
      },
    ],
  },
  {
    id: "mod_compliance",
    name: "Compliance Tracking",
    category: "admin",
    description: "License expiration tracking, mandatory training compliance, and OIG exclusions.",
  },
  {
    id: "mod_evv",
    name: "EVV Monitoring",
    category: "admin",
    description: "Electronic Visit Verification GPS timestamps, call logs, and state aggregator sync status.",
  },
  {
    id: "mod_qa",
    name: "QA",
    category: "admin",
    description: "Quality assurance charts audit, supervisory visit evaluations, and corrective action plans.",
  },
  {
    id: "mod_training",
    name: "Training LMS",
    category: "admin",
    description: "Learning Management System, course authoring, orientation modules, and quiz grading.",
  },
  {
    id: "mod_reports",
    name: "Reports",
    category: "admin",
    description: "Standard financial, clinical, operational, and census reporting exports.",
  },
  {
    id: "mod_referrals",
    name: "Referrals & Intake",
    category: "admin",
    description: "Inbound client intake pipeline, insurance eligibility checks, and initial consults.",
  },
  {
    id: "mod_communications",
    name: "Communications",
    category: "admin",
    description: "Agency internal messaging, Broadcast SMS, and HIPAA secure chat.",
  },
  {
    id: "mod_settings",
    name: "Settings",
    category: "admin",
    description: "Agency profile, service lines, user accounts, and system RBAC security settings.",
  },

  // Portal Category (9)
  {
    id: "mod_portal_overview",
    name: "Overview",
    category: "portal",
    description: "Client & portal homepage overview dashboard.",
  },
  {
    id: "mod_portal_schedule",
    name: "Schedule",
    category: "portal",
    description: "Upcoming caregiver visit calendar and shift assignments.",
  },
  {
    id: "mod_portal_careplan",
    name: "Care Plan",
    category: "portal",
    description: "Client daily care tasks, ADLs, and nursing care goals.",
  },
  {
    id: "mod_portal_visithistory",
    name: "Visit History",
    category: "portal",
    description: "Historical visit logs, clock-in/out timestamps, and visit summaries.",
  },
  {
    id: "mod_portal_billing",
    name: "Billing",
    category: "portal",
    description: "Client invoices, copay statements, and online payment portal.",
  },
  {
    id: "mod_portal_messaging",
    name: "Messaging",
    category: "portal",
    description: "Direct messaging with agency care coordinator and supervisor.",
  },
  {
    id: "mod_portal_documents",
    name: "Documents",
    category: "portal",
    description: "Consent forms, service agreements, and discharge notes.",
  },
  {
    id: "mod_portal_referralform",
    name: "Referral Form",
    category: "portal",
    description: "Public/Provider intake form to submit new client referrals.",
  },
  {
    id: "mod_portal_submittedreferrals",
    name: "My Submitted Referrals",
    category: "portal",
    description: "Status tracking for previously submitted client referrals.",
  },
];

/**
 * Generate default seed permissions matrix for all 15 roles across all 24 modules.
 * Strictly adheres to rule: restricted_incidents is default TRUE ONLY for Super Admin, Clinical Supervisor, and QA/Compliance Officer.
 */
export function buildSeedPermissions(): RolePermission[] {
  const permissions: RolePermission[] = [];

  const getSubToggles = (
    roleId: string,
    moduleId: string
  ): Record<string, boolean> | undefined => {
    if (moduleId === "mod_incidents") {
      const isRestrictedAllowed = [
        "super_admin",
        "clinical_supervisor_rn",
        "qa_compliance_officer",
      ].includes(roleId);
      return { restricted_incidents: isRestrictedAllowed };
    }
    if (moduleId === "mod_patients") {
      if (roleId === "super_admin") {
        return {
          clinical_notes: true,
          demographics_insurance: true,
          billing_balance: true,
        };
      }
      if (
        [
          "exec_ops_director",
          "branch_regional_mgr",
          "care_intake_coord",
          "clinical_supervisor_rn",
          "qa_compliance_officer",
        ].includes(roleId)
      ) {
        return {
          clinical_notes: true,
          demographics_insurance: true,
          billing_balance: roleId.includes("exec") || roleId.includes("branch"),
        };
      }
      if (roleId === "billing_finance_staff") {
        return {
          clinical_notes: false, // Billing sees insurance/demographics but NOT clinical notes
          demographics_insurance: true,
          billing_balance: true,
        };
      }
      if (roleId === "hr_mgr_recruiter" || roleId === "scheduler_dispatcher") {
        return {
          clinical_notes: false,
          demographics_insurance: true,
          billing_balance: false,
        };
      }
      if (roleId === "trainer_lms_admin") {
        return {
          clinical_notes: false,
          demographics_insurance: false,
          billing_balance: false,
        };
      }
      return {
        clinical_notes: true,
        demographics_insurance: true,
        billing_balance: false,
      };
    }
    return undefined;
  };

  SEED_ROLES.forEach((role) => {
    SEED_MODULES.forEach((mod) => {
      let accessLevel: RolePermission["access_level"] = "none";
      let scopeType: RolePermission["scope_type"] = "unscoped";

      if (role.id === "super_admin") {
        accessLevel = "full";
        scopeType = "unscoped";
      } else if (role.tier === "internal") {
        // Internal staff roles rules
        if (mod.category === "admin") {
          switch (role.id) {
            case "exec_ops_director":
              accessLevel = [
                "mod_dashboard",
                "mod_patients",
                "mod_reports",
                "mod_billing",
                "mod_compliance",
                "mod_qa",
              ].includes(mod.id)
                ? "full"
                : "view";
              scopeType = "unscoped";
              break;

            case "branch_regional_mgr":
              accessLevel = [
                "mod_dashboard",
                "mod_patients",
                "mod_scheduling",
                "mod_caregivers",
                "mod_reports",
                "mod_compliance",
              ].includes(mod.id)
                ? "full"
                : "view";
              scopeType = "branch";
              break;

            case "care_intake_coord":
              if (mod.id === "mod_referrals") {
                accessLevel = "full";
                scopeType = "unscoped";
              } else if (mod.id === "mod_patients") {
                accessLevel = "edit";
                scopeType = "caseload";
              } else if (mod.id === "mod_scheduling") {
                accessLevel = "edit";
                scopeType = "caseload";
              } else if (["mod_payroll", "mod_billing"].includes(mod.id)) {
                accessLevel = "none";
              } else {
                accessLevel = "view";
                scopeType = "unscoped";
              }
              break;

            case "scheduler_dispatcher":
              if (mod.id === "mod_scheduling") {
                accessLevel = "full";
                scopeType = "branch";
              } else if (
                ["mod_caregivers", "mod_evv", "mod_communications"].includes(
                  mod.id
                )
              ) {
                accessLevel = "view";
                scopeType = "branch";
              } else if (["mod_patients"].includes(mod.id)) {
                accessLevel = "view";
                scopeType = "branch";
              } else if (
                [
                  "mod_payroll",
                  "mod_billing",
                  "mod_settings",
                  "mod_qa",
                ].includes(mod.id)
              ) {
                accessLevel = "none";
              } else {
                accessLevel = "view";
                scopeType = "branch";
              }
              break;

            case "clinical_supervisor_rn":
              if (
                ["mod_patients", "mod_qa", "mod_incidents"].includes(mod.id)
              ) {
                accessLevel = "full";
                scopeType = "caseload";
              } else if (
                ["mod_scheduling", "mod_compliance"].includes(mod.id)
              ) {
                accessLevel = "edit";
                scopeType = "caseload";
              } else if (["mod_billing", "mod_payroll"].includes(mod.id)) {
                accessLevel = "none";
              } else {
                accessLevel = "view";
                scopeType = "branch";
              }
              break;

            case "qa_compliance_officer":
              if (
                ["mod_compliance", "mod_qa", "mod_incidents"].includes(mod.id)
              ) {
                accessLevel = "full";
                scopeType = "unscoped";
              } else if (["mod_reports", "mod_evv"].includes(mod.id)) {
                accessLevel = "view";
                scopeType = "unscoped";
              } else {
                accessLevel = "view";
                scopeType = "unscoped";
              }
              break;

            case "hr_mgr_recruiter":
              if (
                ["mod_caregivers", "mod_training"].includes(mod.id)
              ) {
                accessLevel = "full";
                scopeType = "unscoped";
              } else if (mod.id === "mod_payroll") {
                accessLevel = "view";
                scopeType = "unscoped";
              } else if (["mod_patients", "mod_billing"].includes(mod.id)) {
                accessLevel = "none";
              } else {
                accessLevel = "view";
                scopeType = "unscoped";
              }
              break;

            case "billing_finance_staff":
              if (["mod_billing", "mod_payroll"].includes(mod.id)) {
                accessLevel = "full";
                scopeType = "unscoped";
              } else if (mod.id === "mod_reports") {
                accessLevel = "view";
                scopeType = "unscoped";
              } else if (mod.id === "mod_patients") {
                accessLevel = "view";
                scopeType = "unscoped";
              } else {
                accessLevel = "none";
              }
              break;

            case "trainer_lms_admin":
              if (mod.id === "mod_training") {
                accessLevel = "full";
                scopeType = "unscoped";
              } else if (mod.id === "mod_compliance") {
                accessLevel = "view";
                scopeType = "unscoped";
              } else {
                accessLevel = "none";
              }
              break;

            case "field_supervisor":
              if (mod.id === "mod_qa" || mod.id === "mod_incidents") {
                accessLevel = "edit";
                scopeType = "caseload";
              } else if (mod.id === "mod_caregivers") {
                accessLevel = "view";
                scopeType = "caseload";
              } else if (mod.id === "mod_scheduling") {
                accessLevel = "view";
                scopeType = "caseload";
              } else {
                accessLevel = "none";
              }
              break;

            case "caregiver_field":
              if (
                ["mod_scheduling", "mod_evv", "mod_communications"].includes(
                  mod.id
                )
              ) {
                accessLevel = "view";
                scopeType = "self";
              } else if (mod.id === "mod_patients") {
                accessLevel = "view";
                scopeType = "caseload";
              } else if (mod.id === "mod_training") {
                accessLevel = "view";
                scopeType = "self";
              } else {
                accessLevel = "none";
              }
              break;

            default:
              accessLevel = "view";
              scopeType = "unscoped";
          }
        } else {
          // Internal roles don't use portal category modules directly by default
          accessLevel = "none";
          scopeType = "unscoped";
        }
      } else {
        // External Portal Roles rules
        if (mod.category === "portal") {
          switch (role.id) {
            case "portal_client":
              if (
                [
                  "mod_portal_overview",
                  "mod_portal_schedule",
                  "mod_portal_careplan",
                  "mod_portal_visithistory",
                  "mod_portal_billing",
                  "mod_portal_messaging",
                  "mod_portal_documents",
                ].includes(mod.id)
              ) {
                accessLevel = "view";
                scopeType = "self";
              } else {
                accessLevel = "none";
              }
              break;

            case "portal_family":
              if (
                [
                  "mod_portal_overview",
                  "mod_portal_schedule",
                  "mod_portal_careplan",
                  "mod_portal_visithistory",
                  "mod_portal_billing",
                  "mod_portal_messaging",
                  "mod_portal_documents",
                ].includes(mod.id)
              ) {
                accessLevel = mod.id === "mod_portal_billing" ? "configurable" as any : "view";
                scopeType = "caseload";
              } else {
                accessLevel = "none";
              }
              break;

            case "portal_referral_source":
              if (
                [
                  "mod_portal_referralform",
                  "mod_portal_submittedreferrals",
                ].includes(mod.id)
              ) {
                accessLevel = "full";
                scopeType = "self";
              } else {
                accessLevel = "none";
              }
              break;
          }
        } else {
          // Portal roles cannot access admin modules
          accessLevel = "none";
          scopeType = "unscoped";
        }
      }

      permissions.push({
        role_id: role.id,
        module_id: mod.id,
        access_level: accessLevel,
        scope_type: scopeType,
        field_permissions: getSubToggles(role.id, mod.id),
      });
    });
  });

  return permissions;
}

export const SEED_USERS: User[] = [
  {
    id: "usr-001",
    name: "Sarah Jenkins",
    email: "sarah@homeliocare.com",
    role_id: "super_admin",
    status: "active",
    branch_id: "branch-central",
    assigned_clients: null,
    assigned_caregivers: null,
    last_login_at: "Today, 9:42 AM",
    mfa_enabled: true,
    invited_by: "System Initialization",
    invited_at: "2026-01-15T08:00:00Z",
    linked_client_ids: null,
  },
  {
    id: "usr-002",
    name: "Marcus Thompson",
    email: "marcus.t@homeliocare.com",
    role_id: "hr_mgr_recruiter",
    status: "active",
    branch_id: "branch-central",
    assigned_clients: null,
    assigned_caregivers: null,
    last_login_at: "Yesterday, 4:15 PM",
    mfa_enabled: true,
    invited_by: "sarah@homeliocare.com",
    invited_at: "2026-02-01T10:30:00Z",
    linked_client_ids: null,
  },
  {
    id: "usr-003",
    name: "Elena Rodriguez",
    email: "elena.r@homeliocare.com",
    role_id: "billing_finance_staff",
    status: "active",
    branch_id: "branch-north",
    assigned_clients: null,
    assigned_caregivers: null,
    last_login_at: "Today, 11:15 AM",
    mfa_enabled: true,
    invited_by: "sarah@homeliocare.com",
    invited_at: "2026-02-10T14:20:00Z",
    linked_client_ids: null,
  },
  {
    id: "usr-004",
    name: "David Chen",
    email: "david.c@homeliocare.com",
    role_id: "qa_compliance_officer",
    status: "invited",
    branch_id: "branch-south",
    assigned_clients: null,
    assigned_caregivers: null,
    last_login_at: null,
    mfa_enabled: false,
    invited_by: "sarah@homeliocare.com",
    invited_at: "2026-07-20T09:00:00Z",
    linked_client_ids: null,
  },
  {
    id: "usr-005",
    name: "Rachel Miller, RN",
    email: "rachel.m@homeliocare.com",
    role_id: "clinical_supervisor_rn",
    status: "active",
    branch_id: "branch-north",
    assigned_clients: ["cli-101", "cli-103"],
    assigned_caregivers: null,
    last_login_at: "Today, 8:20 AM",
    mfa_enabled: true,
    invited_by: "sarah@homeliocare.com",
    invited_at: "2026-03-01T11:00:00Z",
    linked_client_ids: null,
  },
  {
    id: "usr-006",
    name: "James Wilson",
    email: "jwilson@homeliocare.com",
    role_id: "branch_regional_mgr",
    status: "active",
    branch_id: "branch-north",
    assigned_clients: null,
    assigned_caregivers: null,
    last_login_at: "3 days ago",
    mfa_enabled: true,
    invited_by: "sarah@homeliocare.com",
    invited_at: "2026-01-20T16:45:00Z",
    linked_client_ids: null,
  },
  {
    id: "usr-007",
    name: "Patricia Vance",
    email: "pvance@familyportal.com",
    role_id: "portal_family",
    status: "active",
    branch_id: null,
    assigned_clients: null,
    assigned_caregivers: null,
    last_login_at: "Yesterday, 8:10 PM",
    mfa_enabled: false,
    invited_by: "rachel.m@homeliocare.com",
    invited_at: "2026-04-12T13:10:00Z",
    linked_client_ids: ["cli-101"],
    family_permissions: {
      billing_visibility: true,
      care_plan_visibility: true,
      schedule_visibility: true,
    },
  },
  {
    id: "usr-008",
    name: "Dr. Robert Vance (Metro Health)",
    email: "referrals@metrohealth.org",
    role_id: "portal_referral_source",
    status: "active",
    branch_id: null,
    assigned_clients: null,
    assigned_caregivers: null,
    last_login_at: "5 days ago",
    mfa_enabled: true,
    invited_by: "sarah@homeliocare.com",
    invited_at: "2026-05-02T10:00:00Z",
    linked_client_ids: null,
  },
];

export const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log-101",
    timestamp: "2026-07-22T09:42:00Z",
    actor_name: "Sarah Jenkins",
    actor_email: "sarah@homeliocare.com",
    action: "USER_LOGIN",
    target_type: "User",
    target_id: "usr-001",
    target_name: "Sarah Jenkins",
    details: "Authenticated successfully with MFA code via Web Session.",
  },
  {
    id: "log-100",
    timestamp: "2026-07-20T09:00:00Z",
    actor_name: "Sarah Jenkins",
    actor_email: "sarah@homeliocare.com",
    action: "USER_INVITED",
    target_type: "User",
    target_id: "usr-004",
    target_name: "David Chen",
    details: "Invited David Chen as QA / Compliance Officer for South Metro Branch.",
  },
  {
    id: "log-099",
    timestamp: "2026-07-15T14:30:00Z",
    actor_name: "Sarah Jenkins",
    actor_email: "sarah@homeliocare.com",
    action: "PERMISSION_MATRIX_UPDATED",
    target_type: "Role",
    target_id: "billing_finance_staff",
    target_name: "Billing / Finance Staff",
    details: "Updated module access for Billing & Claims from Edit (Unscoped) to Full (Unscoped).",
    diff: {
      before: { access_level: "edit" },
      after: { access_level: "full" },
    },
  },
];
