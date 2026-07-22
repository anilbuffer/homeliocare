"use client";

import React, { useState, useEffect } from "react";
import { useRBAC } from "@/lib/rbac/rbacStore";
import {
  Role,
  Module,
  RolePermission,
  AccessLevel,
  ScopeType,
} from "@/lib/rbac/types";
import { Card } from "@/components/ui/Card";
import {
  Shield,
  Lock,
  Plus,
  RotateCcw,
  Save,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Info,
  Search,
  CheckCircle2,
  Users,
  Layers,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Eye,
  Edit3,
  CheckSquare,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export function RolesPermissionsTab() {
  const {
    roles,
    modules,
    permissions,
    updateRolePermissions,
    resetRolePermissions,
    createCustomRole,
    getRoleUserCount,
  } = useRBAC();

  // Selected Role State
  const [selectedRoleId, setSelectedRoleId] = useState<string>("super_admin");
  const selectedRole = roles.find((r) => r.id === selectedRoleId) || roles[0];

  // Local draft state for permission matrix edits before saving
  const [draftPermissions, setDraftPermissions] = useState<RolePermission[]>([]);
  const [draftRoleDesc, setDraftRoleDesc] = useState<string>("");
  const [draftRoleName, setDraftRoleName] = useState<string>("");

  // Role search in left panel
  const [roleSearchTerm, setRoleSearchTerm] = useState("");

  // Module filter in right panel
  const [moduleCategoryTab, setModuleCategoryTab] = useState<
    "all" | "admin" | "portal"
  >("all");
  const [moduleSearchTerm, setModuleSearchTerm] = useState("");

  // Expanded sub-toggle rows
  const [expandedModuleIds, setExpandedModuleIds] = useState<Record<string, boolean>>({
    mod_patients: true,
    mod_incidents: true,
  });

  // Modals state
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleTier, setNewRoleTier] = useState<"internal" | "external">("internal");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [newRoleCloneFromId, setNewRoleCloneFromId] = useState<string>("");

  // Save Confirmation & Diff Modal
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [superAdminConfirmInput, setSuperAdminConfirmInput] = useState("");

  // Synchronize draft when selected role changes or stored permissions update
  useEffect(() => {
    const rolePerms = permissions.filter((p) => p.role_id === selectedRoleId);

    // Ensure all 24 modules exist in draft for this role
    const fullDraftPerms = modules.map((mod) => {
      const existing = rolePerms.find((p) => p.module_id === mod.id);
      if (existing) return { ...existing, field_permissions: existing.field_permissions ? { ...existing.field_permissions } : undefined };

      // Default fallback
      return {
        role_id: selectedRoleId,
        module_id: mod.id,
        access_level: "none" as AccessLevel,
        scope_type: "unscoped" as ScopeType,
        field_permissions: mod.id === "mod_incidents" ? { restricted_incidents: false } : undefined,
      };
    });

    setDraftPermissions(fullDraftPerms);
    setDraftRoleName(selectedRole.name);
    setDraftRoleDesc(selectedRole.description);
  }, [selectedRoleId, permissions, roles, modules]);

  // Check if draft has unsaved changes
  const hasUnsavedChanges = (() => {
    if (draftRoleDesc !== selectedRole.description) return true;
    if (!selectedRole.is_system_role && draftRoleName !== selectedRole.name) return true;

    const originalRolePerms = permissions.filter((p) => p.role_id === selectedRoleId);
    for (const draft of draftPermissions) {
      const orig = originalRolePerms.find((p) => p.module_id === draft.module_id);
      if (!orig) return true;
      if (orig.access_level !== draft.access_level) return true;
      if (orig.scope_type !== draft.scope_type) return true;

      if (draft.field_permissions && orig.field_permissions) {
        for (const key of Object.keys(draft.field_permissions)) {
          if (draft.field_permissions[key] !== orig.field_permissions[key]) return true;
        }
      }
    }
    return false;
  })();

  // Modified module count
  const modifiedModulesCount = (() => {
    const originalRolePerms = permissions.filter((p) => p.role_id === selectedRoleId);
    let count = 0;
    for (const draft of draftPermissions) {
      const orig = originalRolePerms.find((p) => p.module_id === draft.module_id);
      if (!orig || orig.access_level !== draft.access_level || orig.scope_type !== draft.scope_type) {
        count++;
      }
    }
    return count;
  })();

  // Filtered roles list
  const filteredRoles = roles.filter((r) =>
    r.name.toLowerCase().includes(roleSearchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(roleSearchTerm.toLowerCase())
  );

  const internalRoles = filteredRoles.filter((r) => r.tier === "internal");
  const externalRoles = filteredRoles.filter((r) => r.tier === "external");

  // Filtered modules list
  const filteredModules = modules.filter((m) => {
    const matchesCat =
      moduleCategoryTab === "all" || m.category === moduleCategoryTab;
    const matchesSearch =
      m.name.toLowerCase().includes(moduleSearchTerm.toLowerCase()) ||
      m.description?.toLowerCase().includes(moduleSearchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Handle matrix row change
  const handleAccessLevelChange = (moduleId: string, newLevel: AccessLevel) => {
    setDraftPermissions((prev) =>
      prev.map((p) => {
        if (p.module_id !== moduleId) return p;
        // If level set to none, scope set to unscoped
        const newScope = newLevel === "none" ? "unscoped" : p.scope_type;
        return { ...p, access_level: newLevel, scope_type: newScope };
      })
    );
  };

  const handleScopeTypeChange = (moduleId: string, newScope: ScopeType) => {
    setDraftPermissions((prev) =>
      prev.map((p) => (p.module_id === moduleId ? { ...p, scope_type: newScope } : p))
    );
  };

  const handleSubToggleChange = (moduleId: string, key: string, val: boolean) => {
    setDraftPermissions((prev) =>
      prev.map((p) => {
        if (p.module_id !== moduleId) return p;
        const currentFields = p.field_permissions || {};
        return {
          ...p,
          field_permissions: {
            ...currentFields,
            [key]: val,
          },
        };
      })
    );
  };

  const toggleModuleExpand = (moduleId: string) => {
    setExpandedModuleIds((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Discard local draft
  const handleDiscardChanges = () => {
    const rolePerms = permissions.filter((p) => p.role_id === selectedRoleId);
    setDraftPermissions(rolePerms);
    setDraftRoleName(selectedRole.name);
    setDraftRoleDesc(selectedRole.description);
  };

  // Confirm Save Matrix Changes
  const handleSaveMatrix = () => {
    if (selectedRoleId === "super_admin" && superAdminConfirmInput !== "Super Admin") {
      return; // Require exact confirmation string for Super Admin
    }

    updateRolePermissions(selectedRoleId, draftPermissions, {
      name: draftRoleName,
      description: draftRoleDesc,
    });

    setIsSaveModalOpen(false);
    setSuperAdminConfirmInput("");
  };

  // Reset to seed defaults
  const handleResetToDefault = () => {
    resetRolePermissions(selectedRoleId);
  };

  // Create new custom role
  const handleCreateCustomRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const created = createCustomRole({
      name: newRoleName,
      tier: newRoleTier,
      description: newRoleDesc || `Custom ${newRoleTier} role for agency operations.`,
      cloneFromRoleId: newRoleCloneFromId || undefined,
    });

    setIsNewRoleModalOpen(false);
    setSelectedRoleId(created.id);
    setNewRoleName("");
    setNewRoleDesc("");
    setNewRoleCloneFromId("");
  };

  const activeUserCountForRole = getRoleUserCount(selectedRoleId);

  return (
    <div className="space-y-6">
      {/* Mobile/Tablet Role Switcher Selector (< lg screens) */}
      <Card className="lg:hidden p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-brand-teal" />
            Select Role Matrix ({roles.length})
          </label>

          <button
            onClick={() => setIsNewRoleModalOpen(true)}
            className="px-2.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Custom Role
          </button>
        </div>

        <select
          value={selectedRoleId}
          onChange={(e) => setSelectedRoleId(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
        >
          <optgroup label="Internal Staff Roles (12)">
            {roles
              .filter((r) => r.tier === "internal")
              .map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({getRoleUserCount(r.id)} users)
                </option>
              ))}
          </optgroup>
          <optgroup label="External Portal Roles (3)">
            {roles
              .filter((r) => r.tier === "external")
              .map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({getRoleUserCount(r.id)} users)
                </option>
              ))}
          </optgroup>
        </select>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Panel: 15 Roles List (Desktop visible lg+) */}
        <Card className="hidden lg:block lg:col-span-4 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-teal" />
                System Roles ({roles.length})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Select a role to configure permissions.</p>
            </div>
          </div>

          {/* Role Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search roles..."
              value={roleSearchTerm}
              onChange={(e) => setRoleSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
            />
          </div>

          {/* Roles List (Grouped Internal / External) */}
          <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            {/* Internal Staff Roles Group */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-brand-teal" />
                Internal Staff Roles ({internalRoles.length})
              </div>
              <div className="space-y-1.5">
                {internalRoles.map((r) => {
                  const isSelected = r.id === selectedRoleId;
                  const userCount = getRoleUserCount(r.id);

                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRoleId(r.id)}
                      className={`w-full p-3 rounded-xl text-left transition-all border ${isSelected
                        ? "bg-teal-50/70 border-brand-teal/50 shadow-xs"
                        : "bg-slate-50/50 border-slate-200/60 hover:bg-slate-100/60 hover:border-slate-300"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-900 truncate">
                          {r.is_system_role ? (
                            <span title="System Role (Locked Name)">
                              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                            </span>
                          ) : (
                            <span title="Custom Role">
                              <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                            </span>
                          )}
                          <span className="truncate">{r.name}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white border border-slate-200 text-slate-600 shadow-2xs shrink-0">
                          <Users className="w-2.5 h-2.5 text-slate-400" />
                          {userCount}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {r.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* External Portal Roles Group */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-purple-600" />
                External Portal Roles ({externalRoles.length})
              </div>
              <div className="space-y-1.5">
                {externalRoles.map((r) => {
                  const isSelected = r.id === selectedRoleId;
                  const userCount = getRoleUserCount(r.id);

                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRoleId(r.id)}
                      className={`w-full p-3 rounded-xl text-left transition-all border ${isSelected
                        ? "bg-purple-50/80 border-purple-300 shadow-xs"
                        : "bg-slate-50/50 border-slate-200/60 hover:bg-slate-100/60 hover:border-slate-300"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5 font-semibold text-xs text-purple-950 truncate">
                          {r.is_system_role ? (
                            <Lock className="w-3 h-3 text-purple-400 shrink-0" />
                          ) : (
                            <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                          )}
                          <span className="truncate">{r.name}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white border border-purple-200 text-purple-700 shadow-2xs shrink-0">
                          <Users className="w-2.5 h-2.5 text-purple-400" />
                          {userCount}
                        </span>
                      </div>
                      <p className="text-[11px] text-purple-800/80 line-clamp-2 leading-relaxed">
                        {r.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Add Custom Role Button */}
          <button
            onClick={() => setIsNewRoleModalOpen(true)}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            + New Custom Role
          </button>
        </Card>

        {/* Right Panel: Selected Role Permissions Matrix Editor */}
        <Card className="lg:col-span-8 p-4 space-y-6 relative pb-20">
          {/* Header: Role Metadata & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                {selectedRole.is_system_role ? (
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    {selectedRole.name}
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      <Lock className="w-3 h-3 text-slate-400" />
                      System Role
                    </span>
                  </h2>
                ) : (
                  <input
                    type="text"
                    value={draftRoleName}
                    onChange={(e) => setDraftRoleName(e.target.value)}
                    className="text-lg sm:text-xl font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-brand-teal/20"
                  />
                )}
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${selectedRole.tier === "external"
                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                    : "bg-teal-100 text-teal-800 border border-teal-200"
                    }`}
                >
                  {selectedRole.tier === "external" ? "External Portal Tier" : "Internal Staff Tier"}
                </span>
              </div>
              <textarea
                rows={2}
                value={draftRoleDesc}
                onChange={(e) => setDraftRoleDesc(e.target.value)}
                className="w-full text-xs text-slate-600 bg-slate-50/60 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                placeholder="Enter role description..."
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {selectedRole.is_system_role && (
                <button
                  onClick={handleResetToDefault}
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                  title="Revert role permissions matrix back to seeded baseline values"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  Reset Defaults
                </button>
              )}
            </div>
          </div>

          {/* Matrix Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Category Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setModuleCategoryTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${moduleCategoryTab === "all"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                All Modules ({modules.length})
              </button>
              <button
                onClick={() => setModuleCategoryTab("admin")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${moduleCategoryTab === "admin"
                  ? "bg-white text-brand-teal shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                Admin (15)
              </button>
              <button
                onClick={() => setModuleCategoryTab("portal")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${moduleCategoryTab === "portal"
                  ? "bg-white text-purple-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                Portal (9)
              </button>
            </div>

            {/* Module Filter Search */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter modules..."
                value={moduleSearchTerm}
                onChange={(e) => setModuleSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              />
            </div>
          </div>

          {/* Desktop Matrix Table (sm+ screens) */}
          <div className="hidden sm:block border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[11px] uppercase font-bold bg-slate-50 border-b border-slate-200 text-slate-500 tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Module Name</th>
                    <th className="px-4 py-3">Access Level</th>
                    <th className="px-4 py-3">Scope Boundary</th>
                    <th className="px-4 py-3 text-right">Sensitive Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                  {filteredModules.map((mod) => {
                    const draftPerm = draftPermissions.find(
                      (p) => p.module_id === mod.id
                    ) || {
                      role_id: selectedRoleId,
                      module_id: mod.id,
                      access_level: "none" as AccessLevel,
                      scope_type: "unscoped" as ScopeType,
                    };

                    const isExpanded = !!expandedModuleIds[mod.id];
                    const hasSubToggles = mod.has_sub_toggles;

                    return (
                      <React.Fragment key={mod.id}>
                        <tr className="hover:bg-slate-50/70 transition-colors">
                          {/* Module Name & Info */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {hasSubToggles && (
                                <button
                                  type="button"
                                  onClick={() => toggleModuleExpand(mod.id)}
                                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-brand-teal" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                              <div>
                                <div className="font-semibold text-slate-900 text-xs whitespace-nowrap flex items-center gap-1.5">
                                  {mod.name}
                                  <span
                                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${mod.category === "portal"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-slate-100 text-slate-600"
                                      }`}
                                  >
                                    {mod.category}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-400 mt-0.5">
                                  {mod.description}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Access Level Dropdown */}
                          <td className="px-4 py-3">
                            <select
                              value={draftPerm.access_level}
                              onChange={(e) =>
                                handleAccessLevelChange(
                                  mod.id,
                                  e.target.value as AccessLevel
                                )
                              }
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-brand-teal/20 ${draftPerm.access_level === "full"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                                : draftPerm.access_level === "edit"
                                  ? "bg-blue-50 text-blue-800 border-blue-300 font-semibold"
                                  : draftPerm.access_level === "view"
                                    ? "bg-amber-50 text-amber-800 border-amber-300 font-semibold"
                                    : "bg-slate-100 text-slate-500 border-slate-200"
                                }`}
                            >
                              <option value="full">Full (Read & Write)</option>
                              <option value="edit">Edit (Update Existing)</option>
                              <option value="view">View Only (Read)</option>
                              <option value="none">None (No Access)</option>
                            </select>
                          </td>

                          {/* Scope Boundary Dropdown */}
                          <td className="px-4 py-3">
                            <select
                              disabled={draftPerm.access_level === "none"}
                              value={draftPerm.scope_type}
                              onChange={(e) =>
                                handleScopeTypeChange(
                                  mod.id,
                                  e.target.value as ScopeType
                                )
                              }
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all focus:outline-none focus:ring-2 focus:ring-brand-teal/20 disabled:opacity-40 disabled:cursor-not-allowed ${draftPerm.scope_type === "unscoped"
                                ? "bg-slate-50 text-slate-800 border-slate-200"
                                : draftPerm.scope_type === "caseload"
                                  ? "bg-teal-50 text-teal-800 border-teal-300 font-semibold"
                                  : draftPerm.scope_type === "branch"
                                    ? "bg-indigo-50 text-indigo-800 border-indigo-300 font-semibold"
                                    : draftPerm.scope_type === "self"
                                      ? "bg-purple-50 text-purple-800 border-purple-300 font-semibold"
                                      : "bg-amber-50 text-amber-800 border-amber-300"
                                }`}
                            >
                              <option value="unscoped">Unscoped (All Agency Data)</option>
                              <option value="caseload">My Caseload Only</option>
                              <option value="branch">My Assigned Branch Only</option>
                              <option value="self">Self Record Only</option>
                              <option value="restricted_subset">Restricted Subset Only</option>
                            </select>
                          </td>

                          {/* Sensitive Sub-toggle Indicator */}
                          <td className="px-4 py-3 text-right">
                            {hasSubToggles ? (
                              <button
                                type="button"
                                onClick={() => toggleModuleExpand(mod.id)}
                                className="text-xs text-brand-teal hover:underline font-semibold inline-flex items-center gap-1"
                              >
                                {isExpanded ? "Hide Sub-fields" : "Configure Sub-fields"}
                                <ChevronRight
                                  className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-90" : ""
                                    }`}
                                />
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-400 italic">Standard</span>
                            )}
                          </td>
                        </tr>

                        {/* Expandable Sub-toggles Section */}
                        {hasSubToggles && isExpanded && (
                          <tr className="bg-slate-50/80 border-t border-b border-slate-200/80">
                            <td colSpan={4} className="px-4 py-3">
                              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs">
                                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                                  Sensitive Field-Level Access Control ({mod.name})
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-1">
                                  {mod.sub_toggle_definitions?.map((sub) => {
                                    const currentVal =
                                      draftPerm.field_permissions?.[sub.key] ??
                                      sub.defaultValue ??
                                      false;

                                    return (
                                      <div
                                        key={sub.key}
                                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-2"
                                      >
                                        <div>
                                          <div className="text-xs font-semibold text-slate-900">
                                            {sub.label}
                                          </div>
                                          {sub.description && (
                                            <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                              {sub.description}
                                            </div>
                                          )}
                                        </div>

                                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                                          <input
                                            type="checkbox"
                                            disabled={draftPerm.access_level === "none"}
                                            checked={currentVal}
                                            onChange={(e) =>
                                              handleSubToggleChange(
                                                mod.id,
                                                sub.key,
                                                e.target.checked
                                              )
                                            }
                                            className="sr-only peer"
                                          />
                                          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-teal peer-disabled:opacity-50"></div>
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Module Accordion Cards (< sm screens) */}
          <div className="sm:hidden space-y-3">
            {filteredModules.map((mod) => {
              const draftPerm = draftPermissions.find(
                (p) => p.module_id === mod.id
              ) || {
                role_id: selectedRoleId,
                module_id: mod.id,
                access_level: "none" as AccessLevel,
                scope_type: "unscoped" as ScopeType,
              };

              const isExpanded = !!expandedModuleIds[mod.id];
              const hasSubToggles = mod.has_sub_toggles;

              return (
                <div
                  key={mod.id}
                  className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                        {mod.name}
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${mod.category === "portal"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-slate-100 text-slate-600"
                            }`}
                        >
                          {mod.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {mod.description}
                      </div>
                    </div>

                    {hasSubToggles && (
                      <button
                        type="button"
                        onClick={() => toggleModuleExpand(mod.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 bg-white rounded-lg border border-slate-200 shadow-2xs"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180 text-brand-teal" : ""
                            }`}
                        />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Access Level
                      </label>
                      <select
                        value={draftPerm.access_level}
                        onChange={(e) =>
                          handleAccessLevelChange(
                            mod.id,
                            e.target.value as AccessLevel
                          )
                        }
                        className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border ${draftPerm.access_level === "full"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                          : draftPerm.access_level === "edit"
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : draftPerm.access_level === "view"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : "bg-slate-100 text-slate-500 border-slate-200"
                          }`}
                      >
                        <option value="full">Full (Read & Write)</option>
                        <option value="edit">Edit (Update)</option>
                        <option value="view">View Only</option>
                        <option value="none">None (Blocked)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Scope Boundary
                      </label>
                      <select
                        disabled={draftPerm.access_level === "none"}
                        value={draftPerm.scope_type}
                        onChange={(e) =>
                          handleScopeTypeChange(
                            mod.id,
                            e.target.value as ScopeType
                          )
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg text-xs font-medium border bg-white border-slate-200 text-slate-800 disabled:opacity-40"
                      >
                        <option value="unscoped">Unscoped (All Data)</option>
                        <option value="caseload">My Caseload Only</option>
                        <option value="branch">My Branch Only</option>
                        <option value="self">Self Record Only</option>
                        <option value="restricted_subset">Restricted Subset</option>
                      </select>
                    </div>
                  </div>

                  {/* Sub-toggles in Mobile Accordion */}
                  {hasSubToggles && isExpanded && (
                    <div className="pt-2 border-t border-slate-200 space-y-2 bg-white p-3 rounded-lg">
                      <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                        Sub-Field Toggles
                      </div>
                      {mod.sub_toggle_definitions?.map((sub) => {
                        const currentVal =
                          draftPerm.field_permissions?.[sub.key] ??
                          sub.defaultValue ??
                          false;

                        return (
                          <div
                            key={sub.key}
                            className="flex items-center justify-between text-xs py-1"
                          >
                            <span className="text-slate-700 font-medium">
                              {sub.label}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                disabled={draftPerm.access_level === "none"}
                                checked={currentVal}
                                onChange={(e) =>
                                  handleSubToggleChange(
                                    mod.id,
                                    sub.key,
                                    e.target.checked
                                  )
                                }
                                className="sr-only peer"
                              />
                              <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-teal"></div>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sticky Unsaved Changes Save Bar */}
          {hasUnsavedChanges && (
            <div className="fixed sm:absolute bottom-3 sm:bottom-4 left-3 sm:left-6 right-3 sm:right-6 bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 z-30 border border-slate-700">
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <div className="text-xs">
                  <span className="font-bold text-white">Unsaved Changes:</span>{" "}
                  <span className="text-slate-300">
                    {modifiedModulesCount} module(s) modified for &quot;{selectedRole.name}&quot;.
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleDiscardChanges}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={() => setIsSaveModalOpen(true)}
                  className="px-4 py-1.5 text-xs font-bold bg-brand-teal text-white rounded-xl hover:bg-teal-700 shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Matrix
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Save Matrix Changes & Diff Confirmation Modal */}
      {isSaveModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsSaveModalOpen(false)}
          title="Confirm Permission Matrix Update"
          description={`Review diff summary for role "${selectedRole.name}"`}
          maxWidth="xl"
        >
          <div className="space-y-4">
            <div className="bg-teal-50 border border-teal-200 p-4 rounded-xl flex items-start gap-3">
              <Info className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div className="text-xs text-teal-900">
                <span className="font-bold block mb-0.5">Active User Impact:</span>
                Saving this matrix will immediately update access boundaries for{" "}
                <span className="font-bold text-brand-teal">{activeUserCountForRole} active user(s)</span> assigned to this role.
              </div>
            </div>

            {/* Super Admin Guardrail Warning */}
            {selectedRoleId === "super_admin" && (
              <div className="bg-rose-50 border border-rose-300 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  CRITICAL: Modifying Platform Owner Super Admin Role
                </div>
                <p className="text-xs text-rose-700">
                  Editing permissions for the Super Admin role modifies platform-owner capabilities. Type <span className="font-mono font-bold select-all">&quot;Super Admin&quot;</span> below to confirm.
                </p>
                <input
                  type="text"
                  placeholder="Type 'Super Admin' to confirm..."
                  value={superAdminConfirmInput}
                  onChange={(e) => setSuperAdminConfirmInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-rose-300 rounded-xl text-xs font-mono font-bold focus:ring-2 focus:ring-rose-500"
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsSaveModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  selectedRoleId === "super_admin" &&
                  superAdminConfirmInput !== "Super Admin"
                }
                onClick={handleSaveMatrix}
                className="px-5 py-2 text-xs font-bold bg-brand-teal text-white rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                Save & Apply Matrix Changes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* New Custom Role Modal */}
      <Modal
        isOpen={isNewRoleModalOpen}
        onClose={() => setIsNewRoleModalOpen(false)}
        title="Create New Custom Agency Role"
        description="Define an agency-specific role with customized permission boundaries."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateCustomRole} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Role Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lead Clinical Specialist"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Role Tier *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setNewRoleTier("internal")}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${newRoleTier === "internal"
                  ? "bg-teal-50 border-brand-teal text-brand-teal"
                  : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
              >
                <Shield className="w-4 h-4" />
                Internal Staff
              </button>
              <button
                type="button"
                onClick={() => setNewRoleTier("external")}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${newRoleTier === "external"
                  ? "bg-purple-50 border-purple-500 text-purple-700"
                  : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
              >
                <Layers className="w-4 h-4" />
                External Portal
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Describe the purpose and responsibilities of this role..."
              value={newRoleDesc}
              onChange={(e) => setNewRoleDesc(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Clone Permissions Baseline From (Optional)
            </label>
            <select
              value={newRoleCloneFromId}
              onChange={(e) => setNewRoleCloneFromId(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            >
              <option value="">None (Start with all modules set to None)</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  Clone from: {r.name} ({r.tier})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsNewRoleModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-brand-teal text-white rounded-xl hover:bg-teal-700 shadow-sm"
            >
              Create Role
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
