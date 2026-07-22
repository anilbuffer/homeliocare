"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Lock, Users, ShieldAlert } from "lucide-react";
import { UsersTab } from "@/components/rbac/UsersTab";
import { RBACProvider } from "@/lib/rbac/rbacStore";

export function UserManagement() {
  return (
    <RBACProvider>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-teal" />
              <h3 className="text-lg font-bold text-white">Full RBAC & Role Management System</h3>
            </div>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Manage individual user invitations, branch assignments, and granular 15-role permission matrices (Internal Staff vs External Portal) directly on the standalone page.
            </p>
          </div>

          <Link
            href="/users"
            className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all shrink-0"
          >
            Open Dedicated /users Page
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Embedded Users Tab */}
        <UsersTab />
      </div>
    </RBACProvider>
  );
}
