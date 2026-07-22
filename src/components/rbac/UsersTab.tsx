"use client";

import React, { useState } from "react";
import { useRBAC, PermissionDiffItem } from "@/lib/rbac/rbacStore";
import { User, Role } from "@/lib/rbac/types";
import { Card } from "@/components/ui/Card";
import {
  Users as UsersIcon,
  Search,
  UserPlus,
  MoreVertical,
  ShieldCheck,
  Key,
  Building2,
  Mail,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  UserX,
  UserCheck,
  Clock,
  ExternalLink,
  Shield,
  Layers,
  ArrowRight,
  ChevronDown,
  Info,
  Filter,
  X,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { UserAuditModal } from "./UserAuditModal";

export function UsersTab() {
  const {
    users,
    roles,
    branches,
    clientOptions,
    inviteUser,
    updateUser,
    deactivateUser,
    reactivateUser,
    resendInvite,
    resetMFA,
    getRolePermissionDiff,
    canDeactivateUser,
    canDemoteUserRole,
  } = useRBAC();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [selectedBranchFilter, setSelectedBranchFilter] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Invite Modal state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRoleId, setInviteRoleId] = useState("branch_regional_mgr");
  const [inviteBranchId, setInviteBranchId] = useState("branch-north");
  const [inviteLinkedClientIds, setInviteLinkedClientIds] = useState<string[]>(["cli-101"]);
  const [inviteBillingVisibility, setInviteBillingVisibility] = useState(true);
  const [inviteSuccessNotification, setInviteSuccessNotification] = useState<{
    name: string;
    email: string;
    link: string;
  } | null>(null);

  // Edit User Modal state
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRoleId, setEditRoleId] = useState("");
  const [editBranchId, setEditBranchId] = useState<string | null>(null);
  const [editLinkedClientIds, setEditLinkedClientIds] = useState<string[]>([]);
  const [editBillingVisibility, setEditBillingVisibility] = useState(true);

  // Role Change Confirmation Modal state
  const [pendingRoleChange, setPendingRoleChange] = useState<{
    user: User;
    newRoleId: string;
    diff: PermissionDiffItem[];
  } | null>(null);

  // Action Menu open state per row
  const [activeMenuUserId, setActiveMenuUserId] = useState<string | null>(null);

  // Audit modal state
  const [auditUser, setAuditUser] = useState<User | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  // Guardrail alert modal state
  const [guardrailAlert, setGuardrailAlert] = useState<string | null>(null);

  // Filtered user list
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      selectedRoleFilter === "all" || u.role_id === selectedRoleFilter;
    const matchesStatus =
      selectedStatusFilter === "all" || u.status === selectedStatusFilter;
    const matchesBranch =
      selectedBranchFilter === "all" || u.branch_id === selectedBranchFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesBranch;
  });

  // Handle Invite Form Submission
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    inviteUser({
      name: inviteName,
      email: inviteEmail,
      role_id: inviteRoleId,
      branch_id: inviteBranchId,
      assigned_clients: null,
      assigned_caregivers: null,
      mfa_enabled: false,
      linked_client_ids: inviteRoleId.startsWith("portal_")
        ? inviteLinkedClientIds
        : null,
      family_permissions:
        inviteRoleId === "portal_family"
          ? { billing_visibility: inviteBillingVisibility }
          : null,
    });

    const inviteLink = `https://app.homeliocare.com/accept-invite?token=inv_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    setInviteSuccessNotification({
      name: inviteName,
      email: inviteEmail,
      link: inviteLink,
    });

    // Reset invite form
    setInviteName("");
    setInviteEmail("");
    setIsInviteModalOpen(false);
  };

  // Open Edit User Modal
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRoleId(user.role_id);
    setEditBranchId(user.branch_id);
    setEditLinkedClientIds(user.linked_client_ids || []);
    setEditBillingVisibility(
      user.family_permissions?.billing_visibility ?? true
    );
    setActiveMenuUserId(null);
  };

  // Save Edit User Form
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    // Check if role is changing
    if (editRoleId !== editingUser.role_id) {
      // Check guardrail for demoting last Super Admin
      const check = canDemoteUserRole(editingUser.id, editRoleId);
      if (!check.allowed) {
        setGuardrailAlert(check.reason || "Action blocked by guardrail.");
        return;
      }

      // Calculate diff and show confirmation modal
      const diff = getRolePermissionDiff(editingUser.role_id, editRoleId);
      setPendingRoleChange({
        user: editingUser,
        newRoleId: editRoleId,
        diff,
      });
      return;
    }

    // Apply updates directly if role didn't change
    try {
      updateUser(editingUser.id, {
        name: editName,
        email: editEmail,
        branch_id: editBranchId,
        linked_client_ids: editLinkedClientIds,
        family_permissions:
          editRoleId === "portal_family"
            ? { billing_visibility: editBillingVisibility }
            : editingUser.family_permissions,
      });
      setEditingUser(null);
    } catch (err: any) {
      setGuardrailAlert(err.message || "Failed to update user.");
    }
  };

  // Confirm Role Change Diff
  const confirmRoleChange = () => {
    if (!pendingRoleChange) return;

    try {
      updateUser(pendingRoleChange.user.id, {
        name: editName,
        email: editEmail,
        role_id: pendingRoleChange.newRoleId,
        branch_id: editBranchId,
        linked_client_ids: editLinkedClientIds,
        family_permissions:
          pendingRoleChange.newRoleId === "portal_family"
            ? { billing_visibility: editBillingVisibility }
            : pendingRoleChange.user.family_permissions,
      });
      setPendingRoleChange(null);
      setEditingUser(null);
    } catch (err: any) {
      setGuardrailAlert(err.message || "Failed to change user role.");
      setPendingRoleChange(null);
    }
  };

  // Handle Deactivate / Reactivate
  const handleToggleStatus = (user: User) => {
    setActiveMenuUserId(null);
    if (user.status === "deactivated") {
      reactivateUser(user.id);
    } else {
      const check = canDeactivateUser(user.id);
      if (!check.allowed) {
        setGuardrailAlert(check.reason || "Action blocked by guardrail.");
        return;
      }
      try {
        deactivateUser(user.id);
      } catch (err: any) {
        setGuardrailAlert(err.message || "Failed to deactivate user.");
      }
    }
  };

  const selectedRoleForInvite = roles.find((r) => r.id === inviteRoleId);

  return (
    <div className="space-y-6">
      {/* Top Bar: Search, Filters, Invite Button */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200 shrink-0"
              title="Toggle filters"
            >
              <Filter className="w-4 h-4" />
            </button>

            {/* Invite User Primary Button */}
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all shrink-0 active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Invite User</span>
              <span className="sm:hidden">Invite</span>
            </button>
          </div>

          {/* Filter Dropdowns Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${isMobileFilterOpen ? "block" : "hidden lg:grid"
              }`}
          >
            {/* Role Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 lg:hidden">
                Role Filter
              </label>
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              >
                <option value="all">All Roles (15)</option>
                <optgroup label="Internal Staff Roles">
                  {roles
                    .filter((r) => r.tier === "internal")
                    .map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="External Portal Roles">
                  {roles
                    .filter((r) => r.tier === "external")
                    .map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 lg:hidden">
                Status Filter
              </label>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="invited">Invited</option>
                <option value="deactivated">Deactivated</option>
              </select>
            </div>

            {/* Branch Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 lg:hidden">
                Branch Location
              </label>
              <select
                value={selectedBranchFilter}
                onChange={(e) => setSelectedBranchFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              >
                <option value="all">All Branches</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Desktop Table View (hidden on mobile < md) */}
      <Card noPadding className="hidden md:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50/80 border-b border-slate-100 text-slate-500 font-semibold tracking-wider">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Branch / Scope</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">MFA</th>
                <th className="px-4 py-3">Last Login</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    <UsersIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No users match your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const roleObj = roles.find((r) => r.id === user.role_id);
                  const branchObj = branches.find((b) => b.id === user.branch_id);

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Name & Email */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold text-xs shrink-0">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 group-hover:text-brand-teal transition-colors whitespace-nowrap">
                              {user.name}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-1 whitespace-nowrap">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center whitespace-nowrap gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${roleObj?.tier === "external"
                            ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                            : "bg-slate-100 text-slate-800 border border-slate-200/60"
                            }`}
                        >
                          {roleObj?.tier === "external" ? (
                            <Layers className="w-3 h-3 text-purple-600" />
                          ) : (
                            <Shield className="w-3 h-3 text-slate-500" />
                          )}
                          {roleObj?.name || user.role_id}
                        </span>
                      </td>

                      {/* Branch / Scope */}
                      <td className="px-4 py-3 text-xs font-medium text-slate-600">
                        {branchObj ? (
                          <span className="inline-flex whitespace-nowrap items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            {branchObj.name}
                          </span>
                        ) : user.linked_client_ids?.length ? (
                          <span className="text-purple-600 font-semibold whitespace-nowrap">
                            Linked to {user.linked_client_ids.length} Client(s)
                          </span>
                        ) : (
                          <span className="text-slate-400 whitespace-nowrap italic">All Branches / Global</span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex whitespace-nowrap items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${user.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : user.status === "invited"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 whitespace-nowrap rounded-full ${user.status === "active"
                              ? "bg-emerald-500"
                              : user.status === "invited"
                                ? "bg-amber-500 animate-pulse"
                                : "bg-rose-500"
                              }`}
                          />
                          {user.status}
                        </span>
                      </td>

                      {/* MFA Icon */}
                      <td className="px-4 py-3 text-center">
                        {user.mfa_enabled ? (
                          <span
                            title="MFA Enabled"
                            className="inline-flex items-center justify-center w-7 h-7 whitespace-nowrap rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </span>
                        ) : (
                          <span
                            title="MFA Disabled"
                            className="inline-flex items-center justify-center w-7 h-7 whitespace-nowrap rounded-full bg-slate-100 text-slate-400 border border-slate-200"
                          >
                            <Key className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>

                      {/* Last Login */}
                      <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                        {user.last_login_at || (
                          <span className="text-slate-400 italic whitespace-nowrap">Never logged in</span>
                        )}
                      </td>

                      {/* Row Actions Menu */}
                      <td className="px-4 py-3 whitespace-nowrap text-right relative">
                        <button
                          onClick={() =>
                            setActiveMenuUserId(
                              activeMenuUserId === user.id ? null : user.id
                            )
                          }
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeMenuUserId === user.id && (
                          <div className="absolute right-6 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 py-2 text-left animate-in fade-in zoom-in-95 duration-150">
                            <button
                              onClick={() => openEditModal(user)}
                              className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Shield className="w-3.5 h-3.5 text-slate-400" />
                              Edit User & Role
                            </button>

                            {user.status === "invited" && (
                              <button
                                onClick={() => {
                                  resendInvite(user.id);
                                  setActiveMenuUserId(null);
                                }}
                                className="w-full px-4 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Resend Invitation
                              </button>
                            )}

                            <button
                              onClick={() => handleToggleStatus(user)}
                              className={`w-full px-4 py-2 text-xs font-semibold flex items-center gap-2 ${user.status === "deactivated"
                                ? "text-emerald-700 hover:bg-emerald-50"
                                : "text-rose-700 hover:bg-rose-50"
                                }`}
                            >
                              {user.status === "deactivated" ? (
                                <>
                                  <UserCheck className="w-3.5 h-3.5" />
                                  Reactivate Account
                                </>
                              ) : (
                                <>
                                  <UserX className="w-3.5 h-3.5" />
                                  Deactivate Account
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => {
                                resetMFA(user.id);
                                setActiveMenuUserId(null);
                              }}
                              className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Key className="w-3.5 h-3.5 text-slate-400" />
                              Reset Password / MFA
                            </button>

                            <div className="h-px bg-slate-100 my-1"></div>

                            <button
                              onClick={() => {
                                setAuditUser(user);
                                setIsAuditModalOpen(true);
                                setActiveMenuUserId(null);
                              }}
                              className="w-full px-4 py-2 text-xs font-semibold text-brand-teal hover:bg-teal-50 flex items-center gap-2"
                            >
                              <Clock className="w-3.5 h-3.5" />
                              View Audit History
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile Card List View (visible on < md screens) */}
      <div className="md:hidden space-y-3">
        {filteredUsers.length === 0 ? (
          <Card className="p-8 text-center text-slate-400">
            <UsersIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />
            No users match your criteria.
          </Card>
        ) : (
          filteredUsers.map((user) => {
            const roleObj = roles.find((r) => r.id === user.role_id);
            const branchObj = branches.find((b) => b.id === user.branch_id);

            return (
              <Card key={user.id} className="p-4 space-y-3 relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold text-xs shrink-0">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">
                        {user.name}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize shrink-0 ${user.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : user.status === "invited"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${user.status === "active"
                        ? "bg-emerald-500"
                        : user.status === "invited"
                          ? "bg-amber-500 animate-pulse"
                          : "bg-rose-500"
                        }`}
                    />
                    {user.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Role
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded text-[11px] font-semibold ${roleObj?.tier === "external"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-slate-100 text-slate-800"
                        }`}
                    >
                      {roleObj?.name || user.role_id}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Branch / Scope
                    </span>
                    <span className="text-slate-700 font-medium truncate block mt-0.5">
                      {branchObj ? branchObj.name : "Global / Linked"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {user.last_login_at || "Never"}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setAuditUser(user);
                        setIsAuditModalOpen(true);
                      }}
                      className="p-1 text-brand-teal hover:bg-teal-50 rounded-lg"
                      title="Audit History"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Invite User Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite New User"
        description="Provision access to Homelio Care with role-based permissions."
        maxWidth="xl"
      >
        <form onSubmit={handleInviteSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="s.jenkins@agency.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Assign Role *
            </label>
            <select
              value={inviteRoleId}
              onChange={(e) => setInviteRoleId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
            >
              <optgroup label="Internal Staff Roles (12)">
                {roles
                  .filter((r) => r.tier === "internal")
                  .map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="External Portal Roles (3)">
                {roles
                  .filter((r) => r.tier === "external")
                  .map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
              </optgroup>
            </select>
            {selectedRoleForInvite && (
              <p className="text-xs text-slate-500 mt-1.5 bg-slate-50 border border-slate-200 p-2.5 rounded-lg">
                <span className="font-semibold text-slate-700">Role Info: </span>
                {selectedRoleForInvite.description}
              </p>
            )}
          </div>

          {/* Conditional: Branch selector if internal role */}
          {selectedRoleForInvite?.tier === "internal" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Assigned Branch
              </label>
              <select
                value={inviteBranchId}
                onChange={(e) => setInviteBranchId(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Conditional: Linked Clients if External Family/Client role */}
          {(inviteRoleId === "portal_family" || inviteRoleId === "portal_client") && (
            <div className="space-y-3 bg-purple-50/50 border border-purple-200/60 p-4 rounded-xl">
              <div>
                <label className="block text-xs font-semibold text-purple-900 mb-1">
                  Link to Client Record(s) *
                </label>
                <select
                  multiple
                  value={inviteLinkedClientIds}
                  onChange={(e) =>
                    setInviteLinkedClientIds(
                      Array.from(e.target.selectedOptions, (opt) => opt.value)
                    )
                  }
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 h-24"
                >
                  {clientOptions.map((cli) => (
                    <option key={cli.id} value={cli.id}>
                      {cli.name} ({cli.mrn})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-purple-600 mt-1">
                  Hold Ctrl/Cmd to select multiple clients.
                </p>
              </div>

              {/* Per-link family billing permission toggle */}
              {inviteRoleId === "portal_family" && (
                <div className="pt-2 border-t border-purple-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-purple-900">
                      Family Billing Visibility Toggle
                    </div>
                    <div className="text-[11px] text-purple-700">
                      Allow family member to view invoices, billing ledger, and pay copays.
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inviteBillingVisibility}
                      onChange={(e) => setInviteBillingVisibility(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              )}
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-brand-teal text-white rounded-xl hover:bg-teal-700 shadow-sm"
            >
              Send Invite Email
            </button>
          </div>
        </form>
      </Modal>

      {/* Invite Success Simulated Toast/Modal */}
      {inviteSuccessNotification && (
        <Modal
          isOpen={true}
          onClose={() => setInviteSuccessNotification(null)}
          title="User Invitation Dispatched!"
          description="An invitation email has been sent successfully."
          maxWidth="md"
        >
          <div className="space-y-4 text-center py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {inviteSuccessNotification.name}
              </p>
              <p className="text-xs text-slate-500">
                {inviteSuccessNotification.email}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Simulated Invite Activation Link
              </div>
              <div className="text-xs font-mono text-brand-teal select-all break-all">
                {inviteSuccessNotification.link}
              </div>
            </div>

            <button
              onClick={() => setInviteSuccessNotification(null)}
              className="w-full py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-teal-700"
            >
              Done
            </button>
          </div>
        </Modal>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <Modal
          isOpen={true}
          onClose={() => setEditingUser(null)}
          title={`Edit User: ${editingUser.name}`}
          description="Update role assignment, branch scope, or portal linkages."
          maxWidth="lg"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Role Assignment
              </label>
              <select
                value={editRoleId}
                onChange={(e) => setEditRoleId(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
              >
                <optgroup label="Internal Staff Roles">
                  {roles
                    .filter((r) => r.tier === "internal")
                    .map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="External Portal Roles">
                  {roles
                    .filter((r) => r.tier === "external")
                    .map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Branch Location
              </label>
              <select
                value={editBranchId || ""}
                onChange={(e) => setEditBranchId(e.target.value || null)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              >
                <option value="">No Specific Branch (Global)</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold bg-brand-teal text-white rounded-xl hover:bg-teal-700"
              >
                Review & Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Role Change Diff Confirmation Modal */}
      {pendingRoleChange && (
        <Modal
          isOpen={true}
          onClose={() => setPendingRoleChange(null)}
          title="Confirm Role Change & Permission Diff"
          description={`Review permission impact before reassigning ${pendingRoleChange.user.name}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <span className="font-semibold block mb-0.5">Access Level Summary:</span>
                Reassigning from{" "}
                <span className="font-bold">
                  {roles.find((r) => r.id === pendingRoleChange.user.role_id)?.name}
                </span>{" "}
                to{" "}
                <span className="font-bold">
                  {roles.find((r) => r.id === pendingRoleChange.newRoleId)?.name}
                </span>{" "}
                will immediately alter system access.
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100">
              {pendingRoleChange.diff.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 flex items-center justify-between text-xs gap-2"
                >
                  <div className="font-semibold text-slate-800 truncate">
                    {item.moduleName}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono shrink-0 text-[11px]">
                    <span
                      className={`px-1.5 py-0.5 rounded capitalize ${item.oldAccess === "none"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-slate-200 text-slate-800"
                        }`}
                    >
                      {item.oldAccess}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold capitalize ${item.type === "gained"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.type === "lost"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {item.newAccess}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setPendingRoleChange(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmRoleChange}
                className="px-5 py-2 text-xs font-semibold bg-brand-teal text-white rounded-xl hover:bg-teal-700 shadow-sm"
              >
                Confirm & Apply New Role
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Guardrail Block Alert Modal */}
      {guardrailAlert && (
        <Modal
          isOpen={true}
          onClose={() => setGuardrailAlert(null)}
          title="Guardrail Warning: Action Blocked"
          description="Security constraint prevents executing this operation."
          maxWidth="md"
        >
          <div className="space-y-4 py-2 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed bg-rose-50 border border-rose-200 p-3 rounded-xl font-medium">
              {guardrailAlert}
            </p>
            <button
              onClick={() => setGuardrailAlert(null)}
              className="w-full py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-900"
            >
              Acknowledge & Close
            </button>
          </div>
        </Modal>
      )}

      {/* Audit Modal */}
      <UserAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        targetUser={auditUser}
      />
    </div>
  );
}
