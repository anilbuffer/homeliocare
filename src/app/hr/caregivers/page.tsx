"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Download,
  RefreshCw,
  SlidersHorizontal,
  X,
  ChevronRight,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Briefcase,
  UserCheck,
  HeartHandshake,
  FileText,
  Check,
  ExternalLink,
  Star,
  UserX,
  Clock,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { mockCaregivers, Caregiver } from "@/lib/caregivers/mockData";
import { StatusChangeModal } from "@/components/hr/StatusChangeModal";
import { ExitInterviewModal } from "@/components/hr/ExitInterviewModal";
import { AddCandidateModal } from "@/components/hr/AddCandidateModal";
import { Candidate } from "@/types/hr";
import clsx from "clsx";

export default function HrCaregiversRosterPage() {
  const [caregivers, setCaregivers] = useState<Record<string, Caregiver>>(mockCaregivers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "status" | "compliance" | "payRate">("name");

  // Modals state
  const [selectedCaregiverForStatus, setSelectedCaregiverForStatus] = useState<Caregiver | null>(null);
  const [quickViewCaregiver, setQuickViewCaregiver] = useState<Caregiver | null>(null);
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [exitInterviewData, setExitInterviewData] = useState<{
    isOpen: boolean;
    caregiverName: string;
    reasonCode: string;
    effectiveDate: string;
  }>({
    isOpen: false,
    caregiverName: "",
    reasonCode: "",
    effectiveDate: ""
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const allList = useMemo(() => Object.values(caregivers), [caregivers]);

  // KPI counts
  const totalCount = allList.length;
  const activeCount = allList.filter((c) => c.status === "Active").length;
  const onboardingCount = allList.filter((c) => c.status === "Onboarding").length;
  const loaCount = allList.filter((c) => c.status === ("Leave of Absence" as any) || c.status === ("On Leave" as any)).length;
  const terminatedCount = allList.filter((c) => c.status === ("Terminated" as any) || c.status === ("Inactive" as any)).length;

  // Roles list for dropdown filter
  const rolesList = useMemo(() => {
    const set = new Set<string>();
    allList.forEach((cg) => {
      if (cg.role) set.add(cg.role);
    });
    return Array.from(set);
  }, [allList]);

  // Filtered and Sorted list
  const filteredCaregivers = useMemo(() => {
    return allList
      .filter((cg) => {
        const query = searchQuery.toLowerCase().trim();
        const matchSearch =
          !query ||
          cg.name.toLowerCase().includes(query) ||
          cg.role.toLowerCase().includes(query) ||
          cg.id.toLowerCase().includes(query) ||
          cg.email.toLowerCase().includes(query);

        let matchStatus = true;
        if (statusFilter === "Active") matchStatus = cg.status === "Active";
        else if (statusFilter === "Onboarding") matchStatus = cg.status === "Onboarding";
        else if (statusFilter === "Leave of Absence") matchStatus = cg.status === ("Leave of Absence" as any) || cg.status === ("On Leave" as any);
        else if (statusFilter === "Terminated") matchStatus = cg.status === ("Terminated" as any) || cg.status === ("Inactive" as any);

        const matchRole = roleFilter === "All" || cg.role === roleFilter;

        return matchSearch && matchStatus && matchRole;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "status") return a.status.localeCompare(b.status);
        if (sortBy === "compliance") return (b.complianceScore || 0) - (a.complianceScore || 0);
        if (sortBy === "payRate") return (b.payRate || 0) - (a.payRate || 0);
        return 0;
      });
  }, [allList, searchQuery, statusFilter, roleFilter, sortBy]);

  const handleStatusChangeConfirm = (
    newStatus: "Active" | "Leave of Absence" | "Terminated",
    reasonCode: string,
    effectiveDate: string
  ) => {
    if (!selectedCaregiverForStatus) return;

    const cgId = selectedCaregiverForStatus.id;
    setCaregivers((prev) => ({
      ...prev,
      [cgId]: {
        ...prev[cgId],
        status: newStatus as any
      }
    }));

    const cgName = selectedCaregiverForStatus.name;
    setSelectedCaregiverForStatus(null);
    showToast(`Status updated to "${newStatus}" for ${cgName}`);

    if (newStatus === "Terminated") {
      setExitInterviewData({
        isOpen: true,
        caregiverName: cgName,
        reasonCode,
        effectiveDate
      });
    }
  };

  const handleAddCandidate = (newCand: Candidate) => {
    const newId = `cg-${Date.now().toString().slice(-4)}`;
    const newCaregiver: Caregiver = {
      id: newId,
      name: newCand.name,
      avatarUrl: "",
      role: newCand.positionApplied || "Caregiver",
      status: "Onboarding",
      rating: 5.0,
      yearsWithAgency: 0,
      phone: newCand.phone || "(555) 000-0000",
      email: newCand.email || "candidate@homeliocare.com",
      address: "123 Main St, Austin, TX",
      emergencyContact: "Primary Contact - (555) 999-0000",
      languages: ["English"],
      skills: ["Personal Care", "Patient Assistance"],
      hireDate: new Date().toISOString().split("T")[0],
      employmentType: "W2",
      payRate: 24.0,
      complianceScore: 80,
      assignedPatientsCount: 0,
      lastActiveDate: "Today",
      certifications: [
        {
          id: `cert-${Date.now()}`,
          name: newCand.credentialVerification?.licenseType || "State Cert",
          issueDate: "2026-01-01",
          expiryDate: "2028-01-01",
          status: "Active",
          issuer: "State Nursing Board"
        }
      ],
      recentShifts: []
    };

    setCaregivers((prev) => ({
      ...prev,
      [newId]: newCaregiver
    }));

    setIsAddCandidateOpen(false);
    showToast(`Successfully added candidate "${newCand.name}" to roster!`);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Role", "Status", "Email", "Phone", "Pay Rate", "Compliance Score"];
    const rows = filteredCaregivers.map((cg) => [
      cg.id,
      `"${cg.name}"`,
      `"${cg.role}"`,
      cg.status,
      cg.email,
      cg.phone,
      `$${cg.payRate?.toFixed(2) || "0.00"}`,
      `${cg.complianceScore || 100}%`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `homelio_caregivers_roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Exported caregiver roster CSV file!");
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setRoleFilter("All");
    setSortBy("name");
  };

  const isFiltered = searchQuery !== "" || statusFilter !== "All" || roleFilter !== "All" || sortBy !== "name";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full mx-auto space-y-6 pb-12"
    >
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-indigo-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-indigo-700 flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Caregiver Personnel & HR Roster</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Personnel files, credential management, leave of absence logging, and offboarding workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsAddCandidateOpen(true)}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-brand-teal hover:bg-brand-teal/90 rounded-full transition-all active:scale-95 shadow-[0_4px_24px_rgba(0,0,0,0.04)] shadow-brand-teal/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Candidate / Caregiver</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-full border border-slate-200/90 transition-all active:scale-95 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Roster CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Cards (Interactive Filters) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <button
          onClick={() => setStatusFilter("All")}
          className={clsx(
            "text-left p-4 rounded-2xl border backdrop-blur-xl transition-all duration-200 active:scale-95 cursor-pointer relative overflow-hidden",
            statusFilter === "All"
              ? "bg-brand-teal/60 text-white border-brand-teal shadow-md ring-2 ring-brand-teal/50"
              : "bg-brand-teal/10 border-brand-teal hover:border-brand-teal text-brand-teal shadow-[0_2px_12px_rgba(99,102,241,0.08)] hover:-translate-y-0.5"
          )}
        >
          <span className={clsx("text-[10px] font-bold uppercase tracking-wider block", statusFilter === "All" ? "text-brand-teal/200" : "text-brand-teal")}>
            Total Roster
          </span>
          <span className="text-xl sm:text-2xl font-extrabold mt-1 block">{totalCount}</span>
          {statusFilter === "All" && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" />
          )}
        </button>

        <button
          onClick={() => setStatusFilter("Active")}
          className={clsx(
            "text-left p-4 rounded-2xl border backdrop-blur-xl transition-all duration-200 active:scale-95 cursor-pointer relative overflow-hidden",
            statusFilter === "Active"
              ? "bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/40"
              : "bg-emerald-50/80 border-emerald-200/80 hover:border-emerald-300 text-emerald-950 shadow-[0_2px_12px_rgba(16,185,129,0.08)] hover:-translate-y-0.5"
          )}
        >
          <span className={clsx("text-[10px] font-bold uppercase tracking-wider block", statusFilter === "Active" ? "text-emerald-100" : "text-emerald-700")}>
            Active Caregivers
          </span>
          <span className="text-xl sm:text-2xl font-extrabold mt-1 block">{activeCount}</span>
          {statusFilter === "Active" && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" />
          )}
        </button>

        <button
          onClick={() => setStatusFilter("Onboarding")}
          className={clsx(
            "text-left p-4 rounded-2xl border backdrop-blur-xl transition-all duration-200 active:scale-95 cursor-pointer relative overflow-hidden",
            statusFilter === "Onboarding"
              ? "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/40"
              : "bg-blue-50/80 border-blue-200/80 hover:border-blue-300 text-blue-950 shadow-[0_2px_12px_rgba(59,130,246,0.08)] hover:-translate-y-0.5"
          )}
        >
          <span className={clsx("text-[10px] font-bold uppercase tracking-wider block", statusFilter === "Onboarding" ? "text-blue-100" : "text-blue-700")}>
            In Onboarding
          </span>
          <span className="text-xl sm:text-2xl font-extrabold mt-1 block">{onboardingCount}</span>
          {statusFilter === "Onboarding" && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" />
          )}
        </button>

        <button
          onClick={() => setStatusFilter("Leave of Absence")}
          className={clsx(
            "text-left p-4 rounded-2xl border backdrop-blur-xl transition-all duration-200 active:scale-95 cursor-pointer relative overflow-hidden",
            statusFilter === "Leave of Absence"
              ? "bg-amber-500 text-white border-amber-500 shadow-md ring-2 ring-amber-400/40"
              : "bg-amber-50/80 border-amber-200/80 hover:border-amber-300 text-amber-950 shadow-[0_2px_12px_rgba(245,158,11,0.08)] hover:-translate-y-0.5"
          )}
        >
          <span className={clsx("text-[10px] font-bold uppercase tracking-wider block", statusFilter === "Leave of Absence" ? "text-amber-100" : "text-amber-700")}>
            Leave of Absence
          </span>
          <span className="text-xl sm:text-2xl font-extrabold mt-1 block">{loaCount}</span>
          {statusFilter === "Leave of Absence" && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" />
          )}
        </button>

        <button
          onClick={() => setStatusFilter("Terminated")}
          className={clsx(
            "text-left p-4 rounded-2xl border backdrop-blur-xl transition-all duration-200 active:scale-95 cursor-pointer relative overflow-hidden col-span-2 sm:col-span-1",
            statusFilter === "Terminated"
              ? "bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-500/40"
              : "bg-rose-50/80 border-rose-200/80 hover:border-rose-300 text-rose-950 shadow-[0_2px_12px_rgba(239,68,68,0.08)] hover:-translate-y-0.5"
          )}
        >
          <span className={clsx("text-[10px] font-bold uppercase tracking-wider block", statusFilter === "Terminated" ? "text-rose-100" : "text-rose-700")}>
            Terminated / Inactive
          </span>
          <span className="text-xl sm:text-2xl font-extrabold mt-1 block">{terminatedCount}</span>
          {statusFilter === "Terminated" && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" />
          )}
        </button>
      </div>

      {/* Filter, Search & Sorting Controls */}
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search caregivers by name, role, ID, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50/70 border border-slate-200 rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:ring-2 focus:ring-brand-teal/30"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Leave of Absence">Leave of Absence</option>
            <option value="Terminated">Terminated / Inactive</option>
          </select>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:ring-2 focus:ring-brand-teal/30 max-w-[160px] truncate"
          >
            <option value="All">All Roles</option>
            {rolesList.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent outline-none cursor-pointer text-xs font-semibold text-slate-700"
            >
              <option value="name">Sort: Name (A-Z)</option>
              <option value="status">Sort: Status</option>
              <option value="compliance">Sort: Compliance Score</option>
              <option value="payRate">Sort: Pay Rate</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-all flex items-center gap-1 cursor-pointer"
              title="Reset all filters"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Showing <strong className="text-slate-900">{filteredCaregivers.length}</strong> of {totalCount} Caregivers
          </span>
          {isFiltered && (
            <span className="text-[11px] text-brand-teal font-semibold bg-brand-teal/10 px-2.5 py-0.5 rounded-full border border-brand-teal/20">
              Filtered View Active
            </span>
          )}
        </div>

        {filteredCaregivers.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
              <UserX className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Caregivers Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
              We couldn't find any caregiver matching your current search parameters. Try adjusting or clearing your filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-brand-teal text-white rounded-full text-xs font-bold hover:bg-brand-teal/90 transition-all cursor-pointer shadow-xs"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5">Caregiver Personnel</th>
                  <th className="py-3.5 px-4">Role & Class</th>
                  <th className="py-3.5 px-4">Employment Status</th>
                  <th className="py-3.5 px-4">Compliance & Certs</th>
                  <th className="py-3.5 px-5 text-right">Actions & File</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCaregivers.map((cg) => {
                  const isTerminated = cg.status === ("Terminated" as any) || cg.status === ("Inactive" as any);
                  const isLoa = cg.status === ("Leave of Absence" as any) || cg.status === ("On Leave" as any);
                  const initials = cg.name
                    ? cg.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                    : "CG";

                  const complianceScore = cg.complianceScore ?? 95;

                  return (
                    <tr key={cg.id} className="hover:bg-slate-50/80 transition-colors group">
                      {/* Caregiver Name & Contact */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold flex items-center justify-center text-xs shrink-0 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ring-2 ring-indigo-200/60">
                            {initials}
                          </div>
                          <div>
                            <Link
                              href={`/hr/caregivers/${cg.id}`}
                              className="font-semibold text-slate-900 hover:text-brand-teal transition-colors flex items-center gap-1.5 text-sm"
                            >
                              <span>{cg.name}</span>
                              <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-regular mt-0.5">
                              <a href={`mailto:${cg.email}`} className="hover:text-slate-600 transition-colors">
                                {cg.email}
                              </a>
                              <span>•</span>
                              <span>{cg.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role & ID */}
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        <div className="font-bold text-slate-800">{cg.role}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-slate-400 uppercase font-mono font-semibold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            {cg.id}
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            {cg.employmentType || "W2"}
                          </span>
                          {cg.payRate && (
                            <span className="text-[10px] text-emerald-700 font-semibold">
                              ${cg.payRate.toFixed(2)}/hr
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Employment Status Pill */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => setSelectedCaregiverForStatus(cg)}
                          title="Click to change employment status"
                          className={clsx(
                            "font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 text-[11px] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.04)] border",
                            isTerminated
                              ? "bg-rose-100/90 text-rose-800 border-rose-200/80 hover:bg-rose-200"
                              : isLoa
                                ? "bg-amber-100/90 text-amber-800 border-amber-200/80 hover:bg-amber-200"
                                : cg.status === "Onboarding"
                                  ? "bg-blue-100/90 text-blue-800 border-blue-200/80 hover:bg-blue-200"
                                  : "bg-emerald-100/90 text-emerald-800 border-emerald-200/80 hover:bg-emerald-200"
                          )}
                        >
                          <span
                            className={clsx(
                              "w-1.5 h-1.5 rounded-full",
                              isTerminated
                                ? "bg-rose-500"
                                : isLoa
                                  ? "bg-amber-500"
                                  : cg.status === "Onboarding"
                                    ? "bg-blue-500"
                                    : "bg-emerald-500"
                            )}
                          />
                          <span>{cg.status}</span>
                        </button>
                      </td>

                      {/* Compliance & Certifications */}
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        <div className="space-y-1.5">
                          {/* Compliance Bar */}
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                              <div
                                className={clsx(
                                  "h-full rounded-full transition-all",
                                  complianceScore >= 90
                                    ? "bg-emerald-500"
                                    : complianceScore >= 70
                                      ? "bg-amber-500"
                                      : "bg-rose-500"
                                )}
                                style={{ width: `${complianceScore}%` }}
                              />
                            </div>
                            <span
                              className={clsx(
                                "text-[10px] font-extrabold",
                                complianceScore >= 90
                                  ? "text-emerald-700"
                                  : complianceScore >= 70
                                    ? "text-amber-700"
                                    : "text-rose-700"
                              )}
                            >
                              {complianceScore}% Clear
                            </span>
                          </div>

                          {/* Cert badges */}
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200/60 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>CPR Verified</span>
                            </span>
                            <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200/60 flex items-center gap-1">
                              <Check className="w-3 h-3 text-blue-600" />
                              <span>TB Clear</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* HR Actions Column */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setQuickViewCaregiver(cg)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all active:scale-95 border border-slate-200/80 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                            title="Quick View Summary"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setSelectedCaregiverForStatus(cg)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all active:scale-95 border border-slate-200/80 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                          >
                            Change Status
                          </button>
                          <Link
                            href={`/hr/caregivers/${cg.id}`}
                            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-teal hover:bg-brand-teal/90 rounded-full transition-all active:scale-95 shadow-brand-teal/20 shadow-xs inline-flex items-center gap-1"
                          >
                            <span>Personnel File</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick View Drawer */}
      <AnimatePresence>
        {quickViewCaregiver && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewCaregiver(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-l border-slate-200 overflow-y-auto custom-scrollbar flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-brand-teal" />
                  <h2 className="font-extrabold text-slate-900 text-base">Caregiver Personnel Summary</h2>
                </div>
                <button
                  onClick={() => setQuickViewCaregiver(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 space-y-6 flex-1">
                {/* Profile Overview */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-lg flex items-center justify-center shrink-0 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                    {quickViewCaregiver.name
                      ? quickViewCaregiver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                      : "CG"}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{quickViewCaregiver.name}</h3>
                    <p className="text-xs font-semibold text-brand-teal">{quickViewCaregiver.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {quickViewCaregiver.id}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {quickViewCaregiver.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block">Phone</span>
                    <span className="font-medium text-slate-800">{quickViewCaregiver.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block">Email</span>
                    <span className="font-medium text-slate-800 truncate block">{quickViewCaregiver.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block">Hire Date</span>
                    <span className="font-medium text-slate-800">{quickViewCaregiver.hireDate || "2024-01-15"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block">Pay Rate</span>
                    <span className="font-medium text-emerald-700">${quickViewCaregiver.payRate?.toFixed(2) || "24.00"}/hr</span>
                  </div>
                </div>

                {/* Active Certifications */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2.5">
                    Certifications & Licenses
                  </h4>
                  <div className="space-y-2">
                    {quickViewCaregiver.certifications && quickViewCaregiver.certifications.length > 0 ? (
                      quickViewCaregiver.certifications.map((cert) => (
                        <div
                          key={cert.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white text-xs"
                        >
                          <div>
                            <p className="font-bold text-slate-800">{cert.name}</p>
                            <p className="text-[10px] text-slate-400">Issuer: {cert.issuer}</p>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {cert.status}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                        Standard CPR & TB Test Verified
                      </div>
                    )}
                  </div>
                </div>

                {/* Policy Acknowledgments */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2.5">
                    HR Policy Acknowledgments
                  </h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50">
                      <span className="font-medium text-slate-700">HIPAA Privacy & Security Policy</span>
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" /> Signed
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50">
                      <span className="font-medium text-slate-700">Agency Code of Conduct</span>
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" /> Signed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const cg = quickViewCaregiver;
                    setQuickViewCaregiver(null);
                    setSelectedCaregiverForStatus(cg);
                  }}
                  className="flex-1 py-2.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Change Status
                </button>
                <Link
                  href={`/hr/caregivers/${quickViewCaregiver.id}`}
                  onClick={() => setQuickViewCaregiver(null)}
                  className="flex-1 py-2.5 px-4 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold rounded-xl text-xs text-center transition-all cursor-pointer shadow-md shadow-brand-teal/20 flex items-center justify-center gap-1"
                >
                  <span>Full Personnel File</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Candidate Modal */}
      <AddCandidateModal
        isOpen={isAddCandidateOpen}
        onClose={() => setIsAddCandidateOpen(false)}
        existingCandidates={[]}
        onAddCandidate={handleAddCandidate}
      />

      {/* Status Change Modal */}
      {selectedCaregiverForStatus && (
        <StatusChangeModal
          isOpen={Boolean(selectedCaregiverForStatus)}
          onClose={() => setSelectedCaregiverForStatus(null)}
          caregiverName={selectedCaregiverForStatus.name}
          currentStatus={selectedCaregiverForStatus.status}
          onConfirmStatusChange={handleStatusChangeConfirm}
        />
      )}

      {/* Exit Interview Modal */}
      <ExitInterviewModal
        isOpen={exitInterviewData.isOpen}
        onClose={() => setExitInterviewData((prev) => ({ ...prev, isOpen: false }))}
        caregiverName={exitInterviewData.caregiverName}
        reasonCode={exitInterviewData.reasonCode}
        effectiveDate={exitInterviewData.effectiveDate}
        onSubmitExitInterview={(res) => {
          showToast(`Exit interview saved for ${exitInterviewData.caregiverName}. Retention Pulse data updated.`);
        }}
      />
    </motion.div>
  );
}
