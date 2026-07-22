"use client";

import React, { useState } from "react";
import { RBACProvider, useRBAC } from "@/lib/rbac/rbacStore";
import { UsersTab } from "@/components/rbac/UsersTab";
import { RolesPermissionsTab } from "@/components/rbac/RolesPermissionsTab";
import { UserAuditModal } from "@/components/rbac/UserAuditModal";
import { Card } from "@/components/ui/Card";
import {
  Users as UsersIcon,
  ShieldCheck,
  Lock,
  UserPlus,
  Key,
  Clock,
  Layers,
  RotateCcw,
  Shield,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function UserManagementContent() {
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");
  const [isSystemAuditOpen, setIsSystemAuditOpen] = useState(false);
  const { users, roles, resetAllToDefaults } = useRBAC();

  const activeUsersCount = users.filter((u) => u.status === "active").length;
  const adminUsersCount = users.filter((u) => u.role_id === "super_admin" && u.status === "active").length;
  const pendingInvitesCount = users.filter((u) => u.status === "invited").length;

  const tabs = [
    { id: "users", label: "Users", icon: UsersIcon, count: users.length },
    { id: "roles", label: "Roles & Permissions", icon: Lock, count: roles.length },
  ];

  return (
    <div className="w-full max-w-full mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              User Management & Roles (RBAC)
            </h1>
            <span className="bg-teal-50 text-brand-teal text-xs font-semibold px-2.5 py-0.5 rounded-full border border-teal-200/60 inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              HIPAA Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage agency-wide user accounts, branch scope assignments, and configure 15-role granular access matrices.
          </p>
        </div>

        {/* Global Action Header Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsSystemAuditOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs shadow-[0_6px_32px_rgba(0,0,0,0.06)] font-semibold transition-colors"
          >
            <Clock className="w-4 h-4 text-brand-teal" />
            System Audit Log
          </button>

          <button
            onClick={resetAllToDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 rounded-xl text-xs font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-colors"
            title="Reset all RBAC user and role state back to initial seed defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="px-4 py-3 flex items-center gap-3">
          <div className="w-11 h-11 bg-teal-100 rounded-xl flex items-center justify-center text-brand-teal shrink-0">
            <UsersIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{activeUsersCount}</div>
            <div className="text-xs text-slate-500 font-medium">Active Platform Users</div>
          </div>
        </Card>

        <Card className="px-4 py-3 flex items-center gap-3">
          <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{adminUsersCount}</div>
            <div className="text-xs text-slate-500 font-medium">Super Admin Owners</div>
          </div>
        </Card>

        <Card className="px-4 py-3 flex items-center gap-3">
          <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{roles.length}</div>
            <div className="text-xs text-slate-500 font-medium">Defined Roles (12 Int / 3 Ext)</div>
          </div>
        </Card>

        <Card className="px-4 py-3 flex items-center gap-3">
          <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{pendingInvitesCount}</div>
            <div className="text-xs text-slate-500 font-medium">Pending Account Invites</div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation Container (Matches SettingsPage styling) */}
      <div className="flex items-center p-1.5 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl overflow-x-auto border border-slate-200 w-full sm:w-max max-w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "users" | "roles")}
              className={`relative px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl flex items-center gap-2.5 ${isActive
                ? "text-brand-teal"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                }`}
            >
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
              <span
                className={`relative z-10 text-xs px-2 py-0.5 rounded-full font-bold ${isActive
                  ? "bg-brand-teal/15 text-brand-teal"
                  : "bg-slate-100 text-slate-600"
                  }`}
              >
                {tab.count}
              </span>
              {isActive && (
                <motion.div
                  layoutId="users-tab-indicator"
                  className="absolute inset-0 bg-brand-teal/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-brand-teal/20"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activeTab === "users" ? <UsersTab /> : <RolesPermissionsTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* System Audit Modal */}
      <UserAuditModal
        isOpen={isSystemAuditOpen}
        onClose={() => setIsSystemAuditOpen(false)}
        targetUser={null}
      />
    </div>
  );
}

export default function UserManagementPage() {
  return (
    <RBACProvider>
      <UserManagementContent />
    </RBACProvider>
  );
}
