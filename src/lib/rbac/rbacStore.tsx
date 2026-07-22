"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Role,
  Module,
  RolePermission,
  User,
  AuditLog,
  Branch,
  ClientOption,
  AccessLevel,
  ScopeType,
} from "./types";
import {
  SEED_ROLES,
  SEED_MODULES,
  SEED_USERS,
  SEED_AUDIT_LOGS,
  SEED_BRANCHES,
  SEED_CLIENT_OPTIONS,
  buildSeedPermissions,
} from "./seedData";

const LOCAL_STORAGE_KEY_USERS = "homelio_rbac_users_v2";
const LOCAL_STORAGE_KEY_ROLES = "homelio_rbac_roles_v2";
const LOCAL_STORAGE_KEY_PERMISSIONS = "homelio_rbac_permissions_v2";
const LOCAL_STORAGE_KEY_AUDIT = "homelio_rbac_audit_v2";

export interface PermissionDiffItem {
  moduleName: string;
  category: "admin" | "portal";
  oldAccess: AccessLevel;
  oldScope: ScopeType;
  newAccess: AccessLevel;
  newScope: ScopeType;
  type: "gained" | "lost" | "modified" | "unchanged";
}

interface RBACContextType {
  roles: Role[];
  modules: Module[];
  permissions: RolePermission[];
  users: User[];
  auditLogs: AuditLog[];
  branches: Branch[];
  clientOptions: ClientOption[];
  currentUser: User;
  
  // User Operations
  inviteUser: (
    data: Omit<
      User,
      "id" | "status" | "last_login_at" | "invited_at" | "invited_by"
    >
  ) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deactivateUser: (userId: string) => void;
  reactivateUser: (userId: string) => void;
  resendInvite: (userId: string) => void;
  resetMFA: (userId: string) => void;
  
  // Role & Matrix Operations
  updateRolePermissions: (
    roleId: string,
    updatedPermissions: RolePermission[],
    updatedRoleData?: Partial<Role>
  ) => void;
  resetRolePermissions: (roleId: string) => void;
  createCustomRole: (data: {
    name: string;
    tier: "internal" | "external";
    description: string;
    cloneFromRoleId?: string;
  }) => Role;
  
  // Utilities & Guardrails
  getRolePermissionDiff: (
    oldRoleId: string,
    newRoleId: string
  ) => PermissionDiffItem[];
  getRoleUserCount: (roleId: string) => number;
  canDeactivateUser: (userId: string) => { allowed: boolean; reason?: string };
  canDemoteUserRole: (
    userId: string,
    newRoleId: string
  ) => { allowed: boolean; reason?: string };
  resetAllToDefaults: () => void;
}

const RBACContext = createContext<RBACContextType | null>(null);

export function RBACProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<Role[]>(SEED_ROLES);
  const [modules] = useState<Module[]>(SEED_MODULES);
  const [permissions, setPermissions] = useState<RolePermission[]>(buildSeedPermissions());
  const [users, setUsers] = useState<User[]>(SEED_USERS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(SEED_AUDIT_LOGS);
  const [branches] = useState<Branch[]>(SEED_BRANCHES);
  const [clientOptions] = useState<ClientOption[]>(SEED_CLIENT_OPTIONS);

  // Current active user simulation (Sarah Jenkins - Super Admin)
  const currentUser = users.find((u) => u.role_id === "super_admin") || users[0];

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem(LOCAL_STORAGE_KEY_USERS);
      const savedRoles = localStorage.getItem(LOCAL_STORAGE_KEY_ROLES);
      const savedPerms = localStorage.getItem(LOCAL_STORAGE_KEY_PERMISSIONS);
      const savedAudit = localStorage.getItem(LOCAL_STORAGE_KEY_AUDIT);

      if (savedUsers) setUsers(JSON.parse(savedUsers));
      if (savedRoles) setRoles(JSON.parse(savedRoles));
      if (savedPerms) setPermissions(JSON.parse(savedPerms));
      if (savedAudit) setAuditLogs(JSON.parse(savedAudit));
    } catch (e) {
      console.warn("Failed to read RBAC state from localStorage:", e);
    }
  }, []);

  // Sync helpers
  const saveState = (
    newUsers?: User[],
    newRoles?: Role[],
    newPerms?: RolePermission[],
    newAudit?: AuditLog[]
  ) => {
    try {
      if (newUsers) {
        setUsers(newUsers);
        localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(newUsers));
      }
      if (newRoles) {
        setRoles(newRoles);
        localStorage.setItem(LOCAL_STORAGE_KEY_ROLES, JSON.stringify(newRoles));
      }
      if (newPerms) {
        setPermissions(newPerms);
        localStorage.setItem(LOCAL_STORAGE_KEY_PERMISSIONS, JSON.stringify(newPerms));
      }
      if (newAudit) {
        setAuditLogs(newAudit);
        localStorage.setItem(LOCAL_STORAGE_KEY_AUDIT, JSON.stringify(newAudit));
      }
    } catch (e) {
      console.warn("Failed to persist RBAC state to localStorage:", e);
    }
  };

  const addAuditLog = (
    action: string,
    targetType: AuditLog["target_type"],
    targetId: string,
    targetName: string,
    details: string,
    diff?: AuditLog["diff"]
  ) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      actor_name: currentUser.name,
      actor_email: currentUser.email,
      action,
      target_type: targetType,
      target_id: targetId,
      target_name: targetName,
      details,
      diff,
    };
    const updatedLogs = [newLog, ...auditLogs];
    saveState(undefined, undefined, undefined, updatedLogs);
  };

  // Guardrail check: Last Super Admin protection
  const activeSuperAdmins = users.filter(
    (u) => u.role_id === "super_admin" && u.status === "active"
  );

  const canDeactivateUser = (userId: string): { allowed: boolean; reason?: string } => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return { allowed: false, reason: "User not found." };

    if (targetUser.role_id === "super_admin" && targetUser.status === "active") {
      if (activeSuperAdmins.length <= 1) {
        return {
          allowed: false,
          reason:
            "Action blocked: This is the last active Super Admin account in the system. At least one active Super Admin must remain to maintain platform access.",
        };
      }
    }
    return { allowed: true };
  };

  const canDemoteUserRole = (
    userId: string,
    newRoleId: string
  ): { allowed: boolean; reason?: string } => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return { allowed: false, reason: "User not found." };

    if (
      targetUser.role_id === "super_admin" &&
      targetUser.status === "active" &&
      newRoleId !== "super_admin"
    ) {
      if (activeSuperAdmins.length <= 1) {
        return {
          allowed: false,
          reason:
            "Action blocked: Cannot change the role of the last active Super Admin. Assign another active user as Super Admin before demoting this account.",
        };
      }
    }
    return { allowed: true };
  };

  const getRoleUserCount = (roleId: string): number => {
    return users.filter((u) => u.role_id === roleId && u.status !== "deactivated")
      .length;
  };

  // User Operations
  const inviteUser = (
    data: Omit<
      User,
      "id" | "status" | "last_login_at" | "invited_at" | "invited_by"
    >
  ) => {
    const newId = `usr-${Date.now()}`;
    const newUser: User = {
      ...data,
      id: newId,
      status: "invited",
      last_login_at: null,
      invited_at: new Date().toISOString(),
      invited_by: currentUser.email,
    };

    const roleObj = roles.find((r) => r.id === data.role_id);
    const updatedUsers = [newUser, ...users];
    saveState(updatedUsers);

    addAuditLog(
      "USER_INVITED",
      "User",
      newId,
      newUser.name,
      `Invited ${newUser.name} (${newUser.email}) with role '${roleObj?.name || data.role_id}'.`
    );
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;

    if (updates.role_id && updates.role_id !== targetUser.role_id) {
      const demoteCheck = canDemoteUserRole(userId, updates.role_id);
      if (!demoteCheck.allowed) {
        throw new Error(demoteCheck.reason);
      }
    }

    if (updates.status === "deactivated" && targetUser.status !== "deactivated") {
      const deactCheck = canDeactivateUser(userId);
      if (!deactCheck.allowed) {
        throw new Error(deactCheck.reason);
      }
    }

    const updatedUserObj: User = { ...targetUser, ...updates };
    const updatedUsers = users.map((u) => (u.id === userId ? updatedUserObj : u));
    saveState(updatedUsers);

    const oldRole = roles.find((r) => r.id === targetUser.role_id)?.name;
    const newRole = updates.role_id
      ? roles.find((r) => r.id === updates.role_id)?.name
      : undefined;

    addAuditLog(
      "USER_UPDATED",
      "User",
      userId,
      targetUser.name,
      `Updated user details for ${targetUser.name}.${
        newRole && newRole !== oldRole
          ? ` Role changed from '${oldRole}' to '${newRole}'.`
          : ""
      }`,
      {
        before: { role: oldRole, status: targetUser.status },
        after: { role: newRole || oldRole, status: updatedUserObj.status },
      }
    );
  };

  const deactivateUser = (userId: string) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;

    const check = canDeactivateUser(userId);
    if (!check.allowed) {
      throw new Error(check.reason);
    }

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, status: "deactivated" as const } : u
    );
    saveState(updatedUsers);

    addAuditLog(
      "USER_DEACTIVATED",
      "User",
      userId,
      targetUser.name,
      `Immediately revoked session access and deactivated account for ${targetUser.name}.`
    );
  };

  const reactivateUser = (userId: string) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, status: "active" as const } : u
    );
    saveState(updatedUsers);

    addAuditLog(
      "USER_REACTIVATED",
      "User",
      userId,
      targetUser.name,
      `Reactivated account access for ${targetUser.name}.`
    );
  };

  const resendInvite = (userId: string) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;

    const now = new Date().toISOString();
    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, invited_at: now } : u
    );
    saveState(updatedUsers);

    addAuditLog(
      "INVITE_RESENT",
      "User",
      userId,
      targetUser.name,
      `Resent system invitation email to ${targetUser.email}.`
    );
  };

  const resetMFA = (userId: string) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, mfa_enabled: false } : u
    );
    saveState(updatedUsers);

    addAuditLog(
      "MFA_RESET",
      "User",
      userId,
      targetUser.name,
      `Forced Multi-Factor Authentication reset for ${targetUser.name}.`
    );
  };

  // Role & Matrix Operations
  const updateRolePermissions = (
    roleId: string,
    updatedPermissions: RolePermission[],
    updatedRoleData?: Partial<Role>
  ) => {
    const roleObj = roles.find((r) => r.id === roleId);
    if (!roleObj) return;

    // Update permissions array
    const otherPerms = permissions.filter((p) => p.role_id !== roleId);
    const newPerms = [...otherPerms, ...updatedPermissions];

    // Update role metadata if present
    let newRoles = roles;
    if (updatedRoleData) {
      newRoles = roles.map((r) =>
        r.id === roleId ? { ...r, ...updatedRoleData } : r
      );
    }

    saveState(undefined, newRoles, newPerms);

    const affectedUserCount = getRoleUserCount(roleId);
    addAuditLog(
      "PERMISSION_MATRIX_UPDATED",
      "Role",
      roleId,
      roleObj.name,
      `Updated permission matrix for role '${roleObj.name}'. Changes affect ${affectedUserCount} active user(s).`
    );
  };

  const resetRolePermissions = (roleId: string) => {
    const roleObj = roles.find((r) => r.id === roleId);
    if (!roleObj) return;

    const seedPerms = buildSeedPermissions().filter((p) => p.role_id === roleId);
    const otherPerms = permissions.filter((p) => p.role_id !== roleId);
    const newPerms = [...otherPerms, ...seedPerms];

    saveState(undefined, undefined, newPerms);

    addAuditLog(
      "ROLE_PERMISSIONS_RESET",
      "Role",
      roleId,
      roleObj.name,
      `Reset permission matrix for role '${roleObj.name}' back to system default seeded baseline.`
    );
  };

  const createCustomRole = (data: {
    name: string;
    tier: "internal" | "external";
    description: string;
    cloneFromRoleId?: string;
  }): Role => {
    const newRoleId = `custom_${data.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")}_${Date.now().toString().slice(-4)}`;

    const newRoleObj: Role = {
      id: newRoleId,
      name: data.name,
      tier: data.tier,
      is_system_role: false,
      description: data.description,
    };

    let newRolePerms: RolePermission[] = [];

    if (data.cloneFromRoleId) {
      const sourcePerms = permissions.filter((p) => p.role_id === data.cloneFromRoleId);
      newRolePerms = sourcePerms.map((p) => ({
        ...p,
        role_id: newRoleId,
        field_permissions: p.field_permissions ? { ...p.field_permissions } : undefined,
      }));
    } else {
      newRolePerms = modules.map((m) => ({
        role_id: newRoleId,
        module_id: m.id,
        access_level: "none",
        scope_type: "unscoped",
      }));
    }

    const updatedRoles = [...roles, newRoleObj];
    const updatedPerms = [...permissions, ...newRolePerms];

    saveState(undefined, updatedRoles, updatedPerms);

    addAuditLog(
      "CUSTOM_ROLE_CREATED",
      "Role",
      newRoleId,
      newRoleObj.name,
      `Created custom role '${newRoleObj.name}' (${newRoleObj.tier})${
        data.cloneFromRoleId
          ? ` cloned from role '${roles.find((r) => r.id === data.cloneFromRoleId)?.name}'`
          : " starting with empty permissions matrix"
      }.`
    );

    return newRoleObj;
  };

  const getRolePermissionDiff = (
    oldRoleId: string,
    newRoleId: string
  ): PermissionDiffItem[] => {
    const oldPerms = permissions.filter((p) => p.role_id === oldRoleId);
    const newPerms = permissions.filter((p) => p.role_id === newRoleId);

    const diff: PermissionDiffItem[] = [];

    const levelRank: Record<AccessLevel, number> = {
      none: 0,
      view: 1,
      edit: 2,
      full: 3,
    };

    modules.forEach((mod) => {
      const oldP = oldPerms.find((p) => p.module_id === mod.id) || {
        access_level: "none" as const,
        scope_type: "unscoped" as const,
      };
      const newP = newPerms.find((p) => p.module_id === mod.id) || {
        access_level: "none" as const,
        scope_type: "unscoped" as const,
      };

      if (
        oldP.access_level !== newP.access_level ||
        oldP.scope_type !== newP.scope_type
      ) {
        let type: PermissionDiffItem["type"] = "modified";
        if (levelRank[newP.access_level] > levelRank[oldP.access_level]) {
          type = "gained";
        } else if (levelRank[newP.access_level] < levelRank[oldP.access_level]) {
          type = "lost";
        }

        diff.push({
          moduleName: mod.name,
          category: mod.category,
          oldAccess: oldP.access_level,
          oldScope: oldP.scope_type,
          newAccess: newP.access_level,
          newScope: newP.scope_type,
          type,
        });
      }
    });

    return diff;
  };

  const resetAllToDefaults = () => {
    setRoles(SEED_ROLES);
    setPermissions(buildSeedPermissions());
    setUsers(SEED_USERS);
    setAuditLogs(SEED_AUDIT_LOGS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_USERS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_ROLES);
    localStorage.removeItem(LOCAL_STORAGE_KEY_PERMISSIONS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUDIT);
  };

  return (
    <RBACContext.Provider
      value={{
        roles,
        modules,
        permissions,
        users,
        auditLogs,
        branches,
        clientOptions,
        currentUser,
        inviteUser,
        updateUser,
        deactivateUser,
        reactivateUser,
        resendInvite,
        resetMFA,
        updateRolePermissions,
        resetRolePermissions,
        createCustomRole,
        getRolePermissionDiff,
        getRoleUserCount,
        canDeactivateUser,
        canDemoteUserRole,
        resetAllToDefaults,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error("useRBAC must be used within an RBACProvider");
  }
  return context;
}
