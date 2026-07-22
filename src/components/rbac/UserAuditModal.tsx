"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useRBAC } from "@/lib/rbac/rbacStore";
import { User, AuditLog } from "@/lib/rbac/types";
import { Shield, Clock, UserCheck, FileText, Search, Activity, ChevronRight } from "lucide-react";

interface UserAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser?: User | null;
}

export function UserAuditModal({
  isOpen,
  onClose,
  targetUser,
}: UserAuditModalProps) {
  const { auditLogs } = useRBAC();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = auditLogs.filter((log) => {
    if (targetUser) {
      return (
        log.target_id === targetUser.id ||
        log.target_name.toLowerCase().includes(targetUser.name.toLowerCase()) ||
        log.actor_email === targetUser.email
      );
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        log.actor_name.toLowerCase().includes(q) ||
        log.target_name.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        targetUser
          ? `Audit History: ${targetUser.name}`
          : "System-Wide RBAC Audit Trail"
      }
      description={
        targetUser
          ? `HIPAA-compliant security log for ${targetUser.email}`
          : "Full chronological ledger of user invites, role changes, permission matrix updates, and access revocations."
      }
      maxWidth="3xl"
    >
      <div className="space-y-4">
        {!targetUser && (
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit trail by actor, target, action, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
            />
          </div>
        )}

        {targetUser && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold text-sm">
                {targetUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{targetUser.name}</div>
                <div className="text-xs text-slate-500">{targetUser.email}</div>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500">
              <div>Status: <span className="font-medium text-slate-700 capitalize">{targetUser.status}</span></div>
              <div>Last Login: <span className="font-medium text-slate-700">{targetUser.last_login_at || "Never"}</span></div>
            </div>
          </div>
        )}

        {filteredLogs.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">No audit log records found.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 py-2">
            {filteredLogs.map((log) => (
              <div key={log.id} className="relative pl-6">
                {/* Timeline node */}
                <div className="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-white border-2 border-brand-teal shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-teal"></div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-shadow">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200/50">
                      <Shield className="w-3 h-3" />
                      {log.action}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-800 mt-2">
                    {log.details}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div>
                      Actor: <span className="font-semibold text-slate-700">{log.actor_name}</span> ({log.actor_email})
                    </div>
                    <div>
                      Target: <span className="font-semibold text-slate-700">{log.target_name}</span>
                    </div>
                  </div>

                  {log.diff && (
                    <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">State Diff</div>
                      <div className="grid grid-cols-2 gap-2 text-slate-700">
                        {log.diff.before && (
                          <div className="bg-rose-50/70 border border-rose-200/50 p-2 rounded text-rose-800">
                            <span className="font-bold text-rose-600 block mb-0.5">BEFORE:</span>
                            {JSON.stringify(log.diff.before, null, 2)}
                          </div>
                        )}
                        {log.diff.after && (
                          <div className="bg-emerald-50/70 border border-emerald-200/50 p-2 rounded text-emerald-800">
                            <span className="font-bold text-emerald-600 block mb-0.5">AFTER:</span>
                            {JSON.stringify(log.diff.after, null, 2)}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
