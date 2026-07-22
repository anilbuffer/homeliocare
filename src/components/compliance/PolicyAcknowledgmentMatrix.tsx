"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FileSignature,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  X,
  ChevronRight,
  Send,
  ShieldCheck,
  UserX,
  UserCheck,
  ChevronLeft,
  Calendar,
  Sparkles,
  Check
} from "lucide-react";
import { PolicyAcknowledgment, PolicySignerRecord } from "@/types/compliance";

interface PolicyAcknowledgmentMatrixProps {
  policies: PolicyAcknowledgment[];
}

export function PolicyAcknowledgmentMatrix({ policies }: PolicyAcknowledgmentMatrixProps) {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyAcknowledgment | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unsigned" | "overdue" | "pending" | "signed">("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [remindedSigners, setRemindedSigners] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemsPerPage = 6;

  // Show Toast Message helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Open modal with pre-configured policy & optional default filter
  const handleOpenDrillDown = (policy: PolicyAcknowledgment, defaultUnsigned = false) => {
    setSelectedPolicy(policy);
    setStatusFilter(defaultUnsigned ? "unsigned" : "all");
    setSearchQuery("");
    setRoleFilter("all");
    setCurrentPage(1);
  };

  // Filtered Signers for Drill-Down Modal
  const filteredSigners = useMemo(() => {
    if (!selectedPolicy) return [];

    let list: PolicySignerRecord[] = selectedPolicy.signers || [];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.caregiverName.toLowerCase().includes(q) ||
          s.role.toLowerCase().includes(q) ||
          (s.email && s.email.toLowerCase().includes(q))
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      list = list.filter((s) => s.role.toUpperCase() === roleFilter.toUpperCase());
    }

    // Status filter
    if (statusFilter === "unsigned") {
      list = list.filter((s) => s.status === "Pending" || s.status === "Overdue");
    } else if (statusFilter === "overdue") {
      list = list.filter((s) => s.status === "Overdue");
    } else if (statusFilter === "pending") {
      list = list.filter((s) => s.status === "Pending");
    } else if (statusFilter === "signed") {
      list = list.filter((s) => s.status === "Signed");
    }

    return list;
  }, [selectedPolicy, searchQuery, statusFilter, roleFilter]);

  // Paginated Signers
  const totalPages = Math.ceil(filteredSigners.length / itemsPerPage) || 1;
  const paginatedSigners = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSigners.slice(start, start + itemsPerPage);
  }, [filteredSigners, currentPage]);

  // Send Individual Reminder
  const handleSendReminder = (signerId: string, signerName: string) => {
    setRemindedSigners((prev) => ({ ...prev, [`${selectedPolicy?.id}-${signerId}`]: true }));
    triggerToast(`Signature reminder sent to ${signerName}`);
  };

  // Send Bulk Reminder
  const handleSendBulkReminder = () => {
    if (!selectedPolicy) return;
    const unsignedCount = selectedPolicy.signers.filter((s) => s.status !== "Signed").length;
    triggerToast(`Bulk signature reminder dispatched to all ${unsignedCount} unsigned staff members!`);
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 relative flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100000] bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-[90vw] sm:max-w-md">
          <Sparkles className="w-4 h-4 text-brand-teal animate-pulse shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Header Area */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-teal/10 text-brand-teal border border-brand-teal/20 shrink-0">
            <FileSignature className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Regulatory & Policy Acknowledgment Matrix
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600 border border-slate-300/60">
                {policies.length} Core Policies
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Track staff policy signatures with rollup completion rates and exceptions-first drill-down audit lists.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <span className="text-xs text-slate-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Compliance: <strong className="text-emerald-700">96.4% Signed</strong>
          </span>
        </div>
      </div>

      {/* Flipped Axis Policy List Cards */}
      <div className="p-3 sm:p-5 divide-y divide-slate-100 space-y-3">
        {policies.map((policy) => {
          const total = policy.totalRequired || policy.signers?.length || 247;
          const signed = policy.signedCount || policy.signers?.filter((s) => s.status === "Signed").length || 0;
          const overdue = policy.overdueCount || policy.signers?.filter((s) => s.status === "Overdue").length || 0;
          const percentage = Math.round((signed / total) * 100);

          // Color coded status evaluation
          let statusTheme = {
            badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
            barColor: "bg-emerald-500",
            label: "Fully Signed",
            icon: CheckCircle2,
          };

          if (overdue > 0 || policy.status === "Overdue") {
            statusTheme = {
              badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
              barColor: "bg-rose-500",
              label: `${overdue} Overdue`,
              icon: AlertTriangle,
            };
          } else if (percentage < 100) {
            statusTheme = {
              badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
              barColor: "bg-amber-500",
              label: "In Progress",
              icon: Clock,
            };
          }

          const StatusIcon = statusTheme.icon;

          return (
            <div
              key={policy.id}
              onClick={() => handleOpenDrillDown(policy)}
              className="pt-3 group hover:bg-slate-50/90 p-3.5 sm:p-4 rounded-xl border border-slate-100 hover:border-brand-teal/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] active:scale-[0.99] transition-all duration-200 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4"
            >
              {/* Left Column: Policy Details & Badges */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-brand-teal transition-colors">
                    {policy.policyName}
                  </span>
                  {policy.version && (
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                      {policy.version}
                    </span>
                  )}
                  {policy.category && (
                    <span className="text-[10px] font-medium bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-100 shrink-0">
                      {policy.category}
                    </span>
                  )}
                </div>

                {/* Required Roles Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[11px] text-slate-400 font-medium shrink-0">Applicable Roles:</span>
                  {policy.requiredForRoles.map((role) => (
                    <span
                      key={role}
                      className="text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Middle Column: Rollup Metric & Visual Progress Bar */}
              <div className="w-full lg:w-64 space-y-1.5 shrink-0 bg-slate-50/50 p-2.5 sm:p-3 lg:bg-transparent lg:p-0 rounded-xl border border-slate-100 lg:border-none">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">
                    <strong className="text-slate-900 font-bold">{signed}</strong> / {total} signed
                  </span>
                  <span className="font-bold text-slate-800">{percentage}%</span>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-2.5 bg-slate-200/60 rounded-full overflow-hidden p-0.5 border border-slate-200/80">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${statusTheme.barColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Unsigned Exceptions Quick Trigger */}
                {total - signed > 0 && (
                  <div className="flex justify-between sm:justify-end items-center pt-0.5">
                    <span className="text-[10px] text-amber-700 font-semibold sm:hidden">
                      {total - signed} staff pending
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDrillDown(policy, true);
                      }}
                      className="text-[11px] font-medium text-brand-teal hover:underline flex items-center gap-1 min-h-[32px] sm:min-h-0"
                    >
                      <UserX className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Show {total - signed} unsigned staff</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Status & Drill-down Button */}
              <div className="flex items-center gap-3 shrink-0 justify-between lg:justify-end border-t border-slate-100 lg:border-t-0 pt-2 lg:pt-0">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusTheme.badgeBg}`}
                >
                  <StatusIcon className="w-3.5 h-3.5 shrink-0" />
                  {statusTheme.label}
                </span>

                <button className="flex items-center justify-center gap-1 text-xs font-semibold text-slate-700 group-hover:text-brand-teal bg-slate-100 group-hover:bg-brand-teal/10 px-3.5 py-2 rounded-xl transition-all border border-slate-200 group-hover:border-brand-teal/30 active:scale-95 touch-manipulation min-h-[38px]">
                  <span>Drill-down</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* DRILL-DOWN MODAL VIA REACT PORTAL (FULL PAGE OVERVIEW) */}
      {/* ========================================================================= */}
      {mounted && selectedPolicy && createPortal(
        <div className="fixed inset-0 z-[99999] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200">
          {/* Modal Backdrop Click to Close */}
          <div className="absolute inset-0" onClick={() => setSelectedPolicy(null)} />

          {/* Modal Content Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 relative z-10">

            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/90 flex items-start justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded border border-brand-teal/20">
                    Policy Drill-Down Audit
                  </span>
                  {selectedPolicy.version && (
                    <span className="text-xs font-medium text-slate-500">Version {selectedPolicy.version}</span>
                  )}
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1 truncate">
                  {selectedPolicy.policyName}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                  Staff log ({selectedPolicy.signedCount} of {selectedPolicy.totalRequired} signed)
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleSendBulkReminder}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-2 rounded-xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-colors min-h-[38px]"
                  title="Dispatch signature reminder to all staff who haven't signed yet"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Remind Unsigned ({selectedPolicy.totalRequired - selectedPolicy.signedCount})</span>
                </button>

                <button
                  onClick={() => setSelectedPolicy(null)}
                  className="p-2 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors touch-manipulation"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-3 sm:p-4 border-b border-slate-200 bg-white space-y-3 shrink-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search staff by name or role..."
                    className="w-full pl-9 pr-8 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal bg-slate-50/50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Role Filter Dropdown */}
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline-block" />
                  <select
                    value={roleFilter}
                    onChange={(e) => {
                      setRoleFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full sm:w-auto text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                  >
                    <option value="all">All Roles</option>
                    {selectedPolicy.requiredForRoles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Filter Chips (Exceptions-First "Show only unsigned") */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 [&::-webkit-scrollbar]:hidden flex-nowrap sm:flex-wrap">
                <span className="text-[11px] font-semibold text-slate-400 shrink-0 hidden md:inline-block">
                  View:
                </span>

                {/* Exceptions-First Primary Toggle */}
                <button
                  onClick={() => {
                    setStatusFilter("unsigned");
                    setCurrentPage(1);
                  }}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 shrink-0 touch-manipulation ${statusFilter === "unsigned"
                    ? "bg-amber-500 text-white border-amber-500 shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                    : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                    }`}
                >
                  <UserX className="w-3.5 h-3.5" />
                  Show Only Unsigned ({selectedPolicy.totalRequired - selectedPolicy.signedCount})
                </button>

                <button
                  onClick={() => {
                    setStatusFilter("all");
                    setCurrentPage(1);
                  }}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all shrink-0 touch-manipulation ${statusFilter === "all"
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    }`}
                >
                  All ({selectedPolicy.totalRequired})
                </button>

                <button
                  onClick={() => {
                    setStatusFilter("overdue");
                    setCurrentPage(1);
                  }}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all shrink-0 touch-manipulation ${statusFilter === "overdue"
                    ? "bg-rose-600 text-white border-rose-600"
                    : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                    }`}
                >
                  Overdue ({selectedPolicy.overdueCount || 0})
                </button>

                <button
                  onClick={() => {
                    setStatusFilter("signed");
                    setCurrentPage(1);
                  }}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all shrink-0 touch-manipulation ${statusFilter === "signed"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    }`}
                >
                  Signed ({selectedPolicy.signedCount})
                </button>
              </div>
            </div>

            {/* Drill-down Table Area (Responsive Table + Mobile Fallback Cards) */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {filteredSigners.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                  <UserCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">No matching staff signers found</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Try adjusting your search keywords or switching back to the "All Staff" view filter.
                  </p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                  <table className="w-full text-left border-collapse min-w-[550px]">
                    <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                      <tr>
                        <th className="px-3.5 py-3">Staff Member</th>
                        <th className="px-3.5 py-3">Role</th>
                        <th className="px-3.5 py-3">Signature Status</th>
                        <th className="px-3.5 py-3">Date Signed / Due</th>
                        <th className="px-3.5 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {paginatedSigners.map((signer) => {
                        const isReminded = remindedSigners[`${selectedPolicy.id}-${signer.caregiverId}`];

                        return (
                          <tr key={signer.caregiverId} className="hover:bg-slate-50/80 transition-colors">
                            {/* Staff Info */}
                            <td className="px-3.5 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold text-xs shrink-0 border border-brand-teal/20">
                                  {signer.caregiverName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-800 truncate">{signer.caregiverName}</div>
                                  {signer.email && (
                                    <div className="text-[10px] text-slate-400 truncate">{signer.email}</div>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Role */}
                            <td className="px-3.5 py-3 font-semibold text-slate-600">
                              <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px]">
                                {signer.role}
                              </span>
                            </td>

                            {/* Status Badge */}
                            <td className="px-3.5 py-3">
                              {signer.status === "Signed" ? (
                                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                  Signed
                                </span>
                              ) : signer.status === "Overdue" ? (
                                <span className="inline-flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                                  <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                                  Overdue
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                                  <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                                  Pending
                                </span>
                              )}
                            </td>

                            {/* Date Signed / Due */}
                            <td className="px-3.5 py-3 text-slate-600 font-medium">
                              {signer.signedAt ? (
                                <span className="flex items-center gap-1 text-slate-700">
                                  <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                                  {new Date(signer.signedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              ) : signer.dueDate ? (
                                <span
                                  className={
                                    signer.status === "Overdue"
                                      ? "text-rose-600 font-bold"
                                      : "text-amber-600"
                                  }
                                >
                                  Due by {signer.dueDate}
                                </span>
                              ) : (
                                <span className="text-slate-400">N/A</span>
                              )}
                            </td>

                            {/* Action Button */}
                            <td className="px-3.5 py-3 text-right">
                              {signer.status === "Signed" ? (
                                <span className="text-[11px] text-slate-400 font-medium flex items-center justify-end gap-1">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  Verified
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleSendReminder(signer.caregiverId, signer.caregiverName)}
                                  disabled={isReminded}
                                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors inline-flex items-center gap-1 touch-manipulation min-h-[32px] ${isReminded
                                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                    : "bg-brand-teal text-white border-brand-teal hover:bg-brand-teal/90 shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                                    }`}
                                >
                                  {isReminded ? (
                                    <>
                                      <Check className="w-3 h-3 text-slate-400" />
                                      Reminded
                                    </>
                                  ) : (
                                    <>
                                      <Send className="w-3 h-3" />
                                      Send Reminder
                                    </>
                                  )}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer with Pagination */}
            <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 shrink-0">
              <div>
                Showing <strong>{filteredSigners.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{" "}
                <strong>{Math.min(currentPage * itemsPerPage, filteredSigners.length)}</strong> of{" "}
                <strong>{filteredSigners.length}</strong> signers
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors touch-manipulation"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-semibold text-slate-800">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors touch-manipulation"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
