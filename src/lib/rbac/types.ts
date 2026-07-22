export type AccessLevel = "full" | "edit" | "view" | "none";

export type ScopeType =
  | "unscoped"
  | "caseload"
  | "branch"
  | "self"
  | "restricted_subset"
  | "configurable";

export type RoleTier = "internal" | "external";

export type UserStatus = "active" | "invited" | "deactivated";

export type ModuleCategory = "admin" | "portal";

export interface Role {
  id: string;
  name: string;
  tier: RoleTier;
  is_system_role: boolean;
  description: string;
}

export interface SubToggleDefinition {
  key: string;
  label: string;
  description?: string;
  defaultValue?: boolean;
}

export interface Module {
  id: string;
  name: string;
  category: ModuleCategory;
  description?: string;
  has_sub_toggles?: boolean;
  sub_toggle_definitions?: SubToggleDefinition[];
}

export type FieldPermissions = Record<string, boolean>;

export interface RolePermission {
  role_id: string;
  module_id: string;
  access_level: AccessLevel;
  scope_type: ScopeType;
  field_permissions?: FieldPermissions;
}

export interface FamilyPermissions {
  billing_visibility: boolean;
  care_plan_visibility?: boolean;
  schedule_visibility?: boolean;
  medical_records_visibility?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role_id: string;
  status: UserStatus;
  branch_id: string | null;
  assigned_clients: string[] | null;
  assigned_caregivers: string[] | null;
  last_login_at: string | null;
  mfa_enabled: boolean;
  invited_by: string | null;
  invited_at: string | null;
  linked_client_ids: string[] | null;
  family_permissions?: FamilyPermissions | null;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor_name: string;
  actor_email: string;
  action: string;
  target_type: "User" | "Role" | "PermissionMatrix";
  target_id: string;
  target_name: string;
  details: string;
  diff?: {
    before?: Record<string, any>;
    after?: Record<string, any>;
  };
}

export interface Branch {
  id: string;
  name: string;
  code: string;
}

export interface ClientOption {
  id: string;
  name: string;
  mrn: string;
}
