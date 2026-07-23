"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { 
  FileCheck, 
  FileWarning, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Clock, 
  Plus, 
  Check, 
  X, 
  Upload, 
  FileText, 
  AlertCircle, 
  ChevronDown, 
  ExternalLink,
  Send,
  UserCheck,
  Trash2,
  User,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/components/ui/Card";

export type DocStatus = "completed" | "missing" | "pending";

export interface DocDetail {
  status: DocStatus;
  fileName?: string;
  updatedAt?: string;
}

export interface OnboardingHire {
  id: string;
  name: string;
  role: string;
  startDate: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  progress: number; // 0 to 100
  lastReminderSent?: string;
  documents: {
    i9: DocDetail;
    w4: DocDetail;
    backgroundCheck: DocDetail;
    cprCert: DocDetail;
  };
}

const initialNewHires: OnboardingHire[] = [
  {
    id: "1",
    name: "Amanda Riley",
    role: "Registered Nurse (RN)",
    startDate: "Oct 15, 2026",
    email: "amanda.riley@homeliocare.com",
    phone: "(555) 234-5678",
    progress: 75,
    lastReminderSent: "Yesterday, 3:45 PM",
    documents: {
      i9: { status: "completed", fileName: "I-9_Verification_Form.pdf", updatedAt: "Oct 02, 2026" },
      w4: { status: "completed", fileName: "W-4_Tax_Allowance.pdf", updatedAt: "Oct 03, 2026" },
      backgroundCheck: { status: "completed", fileName: "Background_Check_Clearance.pdf", updatedAt: "Oct 05, 2026" },
      cprCert: { status: "missing" },
    }
  },
  {
    id: "2",
    name: "James Wilson",
    role: "Home Health Aide",
    startDate: "Oct 22, 2026",
    email: "j.wilson@homeliocare.com",
    phone: "(555) 876-5432",
    progress: 25,
    documents: {
      i9: { status: "pending", fileName: "I-9_Draft_Scan.jpg", updatedAt: "Oct 10, 2026" },
      w4: { status: "missing" },
      backgroundCheck: { status: "pending", fileName: "State_Police_Check_Pending.pdf", updatedAt: "Oct 12, 2026" },
      cprCert: { status: "completed", fileName: "AHA_CPR_Card_2026.pdf", updatedAt: "Oct 08, 2026" },
    }
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Certified Nursing Assistant",
    startDate: "Nov 01, 2026",
    email: "elena.r@homeliocare.com",
    phone: "(555) 345-6789",
    progress: 100,
    lastReminderSent: "Oct 01, 2026",
    documents: {
      i9: { status: "completed", fileName: "I-9_Signed_Verification.pdf", updatedAt: "Sep 28, 2026" },
      w4: { status: "completed", fileName: "W-4_2026_Federal.pdf", updatedAt: "Sep 28, 2026" },
      backgroundCheck: { status: "completed", fileName: "BGC_Full_Pass.pdf", updatedAt: "Sep 30, 2026" },
      cprCert: { status: "completed", fileName: "BLS_CPR_Certification.pdf", updatedAt: "Oct 01, 2026" },
    }
  },
  {
    id: "4",
    name: "Marcus Vance",
    role: "Physical Therapist",
    startDate: "Nov 10, 2026",
    email: "marcus.v@homeliocare.com",
    phone: "(555) 901-2345",
    progress: 50,
    documents: {
      i9: { status: "completed", fileName: "I-9_Form_Signed.pdf", updatedAt: "Oct 11, 2026" },
      w4: { status: "missing" },
      backgroundCheck: { status: "completed", fileName: "State_Check_Clear.pdf", updatedAt: "Oct 14, 2026" },
      cprCert: { status: "missing" },
    }
  }
];

const docLabels: Record<string, string> = {
  i9: "I-9 Form",
  w4: "W-4 Form",
  backgroundCheck: "BGC (Background Check)",
  cprCert: "CPR Certification",
};

function calculateProgress(docs: OnboardingHire["documents"]): number {
  const keys: (keyof OnboardingHire["documents"])[] = ["i9", "w4", "backgroundCheck", "cprCert"];
  const completedCount = keys.filter((k) => docs[k].status === "completed").length;
  return Math.round((completedCount / keys.length) * 100);
}

interface OnboardingListProps {
  activeKpiFilter?: "all" | "completed" | "missing";
  onSelectKpiFilter?: (filter: "all" | "completed" | "missing") => void;
}

export function OnboardingList({ activeKpiFilter = "all", onSelectKpiFilter }: OnboardingListProps) {
  const [hires, setHires] = useState<OnboardingHire[]>(initialNewHires);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "missing" | "pending">("all");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Active Dropdown Action Menu State
  const [activeMenuHireId, setActiveMenuHireId] = useState<string | null>(null);

  // Modal States
  const [selectedHireForDossier, setSelectedHireForDossier] = useState<OnboardingHire | null>(null);
  const [reminderHire, setReminderHire] = useState<OnboardingHire | null>(null);
  const [docModalInfo, setDocModalInfo] = useState<{ hire: OnboardingHire; docKey: keyof OnboardingHire["documents"] } | null>(null);
  const [isAddHireModalOpen, setIsAddHireModalOpen] = useState(false);

  // New Hire Form State
  const [newHireData, setNewHireData] = useState({
    name: "",
    role: "Registered Nurse (RN)",
    startDate: "",
    email: "",
    phone: "",
  });

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Synchronize KPI Filter from Props
  useEffect(() => {
    if (activeKpiFilter === "completed") {
      setStatusFilter("completed");
    } else if (activeKpiFilter === "missing") {
      setStatusFilter("missing");
    } else {
      setStatusFilter("all");
    }
  }, [activeKpiFilter]);

  // Click outside listener for action dropdown menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".action-menu-container")) {
        setActiveMenuHireId(null);
      }
      if (!(e.target as HTMLElement).closest(".filter-dropdown-container")) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update document status for a hire
  const handleUpdateDocStatus = (hireId: string, docKey: keyof OnboardingHire["documents"], newStatus: DocStatus, fileName?: string) => {
    setHires((prev) =>
      prev.map((hire) => {
        if (hire.id !== hireId) return hire;
        const updatedDocs = {
          ...hire.documents,
          [docKey]: {
            ...hire.documents[docKey],
            status: newStatus,
            fileName: fileName || hire.documents[docKey].fileName || `${docLabels[docKey].replace(/\s+/g, "_")}_Uploaded.pdf`,
            updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          },
        };
        const newProgress = calculateProgress(updatedDocs);
        return {
          ...hire,
          documents: updatedDocs,
          progress: newProgress,
        };
      })
    );
    showToast(`Updated ${docLabels[docKey]} status to ${newStatus.toUpperCase()}`);
  };

  // Mark all documents completed for a hire
  const handleApproveAllDocs = (hireId: string) => {
    setHires((prev) =>
      prev.map((h) => {
        if (h.id !== hireId) return h;
        const updatedDocs = {
          i9: { status: "completed" as DocStatus, fileName: h.documents.i9.fileName || "I-9_Approved.pdf", updatedAt: "Today" },
          w4: { status: "completed" as DocStatus, fileName: h.documents.w4.fileName || "W-4_Approved.pdf", updatedAt: "Today" },
          backgroundCheck: { status: "completed" as DocStatus, fileName: h.documents.backgroundCheck.fileName || "BGC_Pass.pdf", updatedAt: "Today" },
          cprCert: { status: "completed" as DocStatus, fileName: h.documents.cprCert.fileName || "CPR_Valid.pdf", updatedAt: "Today" },
        };
        return {
          ...h,
          documents: updatedDocs,
          progress: 100,
        };
      })
    );
    showToast("All documents marked 100% completed & verified!");
    if (selectedHireForDossier?.id === hireId) {
      setSelectedHireForDossier(null);
    }
  };

  // Send Reminder Handler
  const handleSendReminder = (hireId: string, customNote?: string) => {
    const hire = hires.find((h) => h.id === hireId);
    if (!hire) return;
    const nowStr = "Just now (" + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + ")";
    setHires((prev) =>
      prev.map((h) => (h.id === hireId ? { ...h, lastReminderSent: nowStr } : h))
    );
    setReminderHire(null);
    showToast(`Reminder email & SMS sent to ${hire.name}`);
  };

  // Add New Hire Handler
  const handleAddHire = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHireData.name.trim()) return;

    const createdHire: OnboardingHire = {
      id: String(Date.now()),
      name: newHireData.name,
      role: newHireData.role,
      startDate: newHireData.startDate || "Nov 15, 2026",
      email: newHireData.email || `${newHireData.name.toLowerCase().replace(/\s+/g, ".")}@homeliocare.com`,
      phone: newHireData.phone || "(555) 000-1234",
      progress: 0,
      documents: {
        i9: { status: "missing" },
        w4: { status: "missing" },
        backgroundCheck: { status: "missing" },
        cprCert: { status: "missing" },
      },
    };

    setHires([createdHire, ...hires]);
    setIsAddHireModalOpen(false);
    setNewHireData({ name: "", role: "Registered Nurse (RN)", startDate: "", email: "", phone: "" });
    showToast(`Added ${createdHire.name} to Onboarding Roster`);
  };

  // Delete / Archive Hire
  const handleDeleteHire = (hireId: string, name: string) => {
    setHires((prev) => prev.filter((h) => h.id !== hireId));
    setActiveMenuHireId(null);
    showToast(`Removed ${name} from Onboarding list`);
  };

  // Filtering Logic
  const filteredHires = hires.filter((hire) => {
    // Search matching
    const matchesSearch =
      hire.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hire.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hire.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Role filter
    const matchesRole = roleFilter === "all" || hire.role.toLowerCase().includes(roleFilter.toLowerCase());

    // Status filter
    let matchesStatus = true;
    if (statusFilter === "completed") {
      matchesStatus = hire.progress === 100;
    } else if (statusFilter === "missing") {
      matchesStatus =
        hire.progress < 100 ||
        Object.values(hire.documents).some((d) => d.status === "missing");
    } else if (statusFilter === "pending") {
      matchesStatus = Object.values(hire.documents).some((d) => d.status === "pending");
    }

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col relative">
      {/* Controls Bar */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex flex-1 items-center gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search new hires by name, role, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white rounded-full border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Dropdown Toggle */}
          <div className="relative filter-dropdown-container">
            <button
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className={cn(
                "px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium",
                (statusFilter !== "all" || roleFilter !== "all") && "border-brand-teal text-brand-teal bg-teal-50/40"
              )}
            >
              <Filter className="w-4 h-4" />
              Filter
              {(statusFilter !== "all" || roleFilter !== "all") && (
                <span className="w-2 h-2 rounded-full bg-brand-teal" />
              )}
              <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400" />
            </button>

            {/* Filter Menu Popover */}
            {isFilterDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 p-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                    Onboarding Status
                  </label>
                  <div className="space-y-1">
                    {[
                      { id: "all", label: "All Statuses" },
                      { id: "missing", label: "Missing Documents" },
                      { id: "pending", label: "Pending Review" },
                      { id: "completed", label: "100% Completed" },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          setStatusFilter(st.id as any);
                          if (onSelectKpiFilter) {
                            onSelectKpiFilter(st.id === "completed" ? "completed" : st.id === "missing" ? "missing" : "all");
                          }
                        }}
                        className={cn(
                          "w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between",
                          statusFilter === st.id
                            ? "bg-brand-teal/10 text-brand-teal"
                            : "text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        {st.label}
                        {statusFilter === st.id && <Check className="w-4 h-4 text-brand-teal" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                    Role Category
                  </label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                  >
                    <option value="all">All Roles</option>
                    <option value="nurse">Registered Nurse (RN)</option>
                    <option value="aide">Home Health Aide (HHA)</option>
                    <option value="assistant">Certified Nursing Assistant (CNA)</option>
                    <option value="therapist">Physical Therapist (PT)</option>
                  </select>
                </div>

                {(statusFilter !== "all" || roleFilter !== "all") && (
                  <button
                    onClick={() => {
                      setStatusFilter("all");
                      setRoleFilter("all");
                      if (onSelectKpiFilter) onSelectKpiFilter("all");
                    }}
                    className="w-full text-center text-xs font-semibold text-rose-500 hover:underline pt-1"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Button: Add New Hire */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddHireModalOpen(true)}
            className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add New Hire
          </button>
        </div>
      </div>

      {/* Filter indicator bar if active */}
      {(statusFilter !== "all" || roleFilter !== "all" || searchQuery) && (
        <div className="bg-teal-50/60 border-b border-teal-100 px-6 py-2 flex items-center justify-between text-xs text-brand-teal font-medium">
          <span>
            Showing filtered results ({filteredHires.length} of {hires.length} hires)
          </span>
          <button
            onClick={() => {
              setStatusFilter("all");
              setRoleFilter("all");
              setSearchQuery("");
              if (onSelectKpiFilter) onSelectKpiFilter("all");
            }}
            className="hover:underline flex items-center gap-1 font-semibold"
          >
            Clear Filters <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4">New Hire</th>
              <th className="px-6 py-4">Start Date</th>
              <th className="px-6 py-4">Onboarding Progress</th>
              <th className="px-6 py-4 text-center">Required Documents</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredHires.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  <FileWarning className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="font-medium text-slate-600">No new hires found matching criteria</p>
                  <p className="text-xs text-slate-400 mt-1">Try adjusting your search terms or filter selections.</p>
                </td>
              </tr>
            ) : (
              filteredHires.map((hire) => (
                <tr key={hire.id} className="hover:bg-slate-50/50 transition-colors group">
                  {/* Candidate Name & Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedHireForDossier(hire)}
                        className="relative group/avatar focus:outline-none"
                        title="View Onboarding Dossier"
                      >
                        <Avatar src={hire.avatarUrl} alt={hire.name} fallback={hire.name.substring(0, 2)} size="sm" />
                        <span className="absolute inset-0 rounded-full ring-2 ring-brand-teal ring-offset-1 opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                      </button>
                      <div>
                        <button
                          onClick={() => setSelectedHireForDossier(hire)}
                          className="font-semibold text-slate-900 group-hover:text-brand-teal transition-colors text-left focus:outline-none flex items-center gap-1.5"
                        >
                          {hire.name}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-brand-teal transition-opacity" />
                        </button>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                          <span>{hire.role}</span>
                          {hire.lastReminderSent && (
                            <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                              <Mail className="w-2.5 h-2.5" /> Sent
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Start Date */}
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {hire.startDate}
                    </div>
                  </td>

                  {/* Progress Bar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 w-48">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            hire.progress === 100 ? "bg-emerald-500" : hire.progress >= 50 ? "bg-brand-teal" : "bg-amber-500"
                          )}
                          style={{ width: `${hire.progress}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-xs font-semibold w-9 text-right",
                          hire.progress === 100 ? "text-emerald-600" : "text-slate-600"
                        )}
                      >
                        {hire.progress}%
                      </span>
                    </div>
                  </td>

                  {/* Required Documents Interactive Badges */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-5">
                      {(["i9", "w4", "backgroundCheck", "cprCert"] as const).map((docKey) => {
                        const doc = hire.documents[docKey];
                        const label = docKey === "i9" ? "I-9" : docKey === "w4" ? "W-4" : docKey === "backgroundCheck" ? "BGC" : "CPR";
                        return (
                          <button
                            key={docKey}
                            onClick={() => setDocModalInfo({ hire, docKey })}
                            className="group/doc border border-transparent hover:border-slate-200 p-1.5 rounded-xl hover:bg-white hover:shadow-sm transition-all flex flex-col items-center gap-1 focus:outline-none"
                            title={`Click to review ${docLabels[docKey]}`}
                          >
                            <div className="relative">
                              {doc.status === "completed" ? (
                                <FileCheck className="w-4 h-4 text-emerald-500 group-hover/doc:scale-110 transition-transform" />
                              ) : doc.status === "missing" ? (
                                <FileWarning className="w-4 h-4 text-rose-500 group-hover/doc:scale-110 transition-transform" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                              )}
                            </div>
                            <span
                              className={cn(
                                "text-[10px] font-semibold tracking-tight transition-colors",
                                doc.status === "completed"
                                  ? "text-emerald-700"
                                  : doc.status === "missing"
                                  ? "text-rose-600"
                                  : "text-amber-600"
                              )}
                            >
                              {label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 relative action-menu-container">
                      {/* Send Reminder Button */}
                      {hire.progress < 100 && (
                        <button
                          onClick={() => setReminderHire(hire)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                          title="Send Onboarding Reminder Email/SMS"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      )}

                      {/* Review Dossier Button */}
                      <button
                        onClick={() => setSelectedHireForDossier(hire)}
                        className="text-brand-teal font-semibold hover:text-emerald-700 transition-colors text-sm px-3.5 py-1.5 rounded-lg bg-teal-50/70 hover:bg-teal-100/70 border border-teal-100/80"
                      >
                        Review
                      </button>

                      {/* Three Dots Menu Button */}
                      <button
                        onClick={() => setActiveMenuHireId(activeMenuHireId === hire.id ? null : hire.id)}
                        className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors"
                        aria-label="More actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Floating Dropdown Action Menu */}
                      {activeMenuHireId === hire.id && (
                        <div className="absolute right-0 top-10 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl z-40 py-2 text-left space-y-0.5">
                          <button
                            onClick={() => {
                              setSelectedHireForDossier(hire);
                              setActiveMenuHireId(null);
                            }}
                            className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                          >
                            <FileText className="w-4 h-4 text-brand-teal" />
                            Review Dossier
                          </button>

                          <button
                            onClick={() => {
                              setReminderHire(hire);
                              setActiveMenuHireId(null);
                            }}
                            className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                          >
                            <Send className="w-4 h-4 text-blue-500" />
                            Send Reminder
                          </button>

                          <button
                            onClick={() => {
                              setDocModalInfo({ hire, docKey: "i9" });
                              setActiveMenuHireId(null);
                            }}
                            className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                          >
                            <Upload className="w-4 h-4 text-emerald-600" />
                            Upload Document
                          </button>

                          <button
                            onClick={() => {
                              handleApproveAllDocs(hire.id);
                              setActiveMenuHireId(null);
                            }}
                            className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            Approve All Docs
                          </button>

                          <Link
                            href={`/caregivers/${hire.id}`}
                            className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                          >
                            <User className="w-4 h-4 text-slate-500" />
                            View Roster Profile
                          </Link>

                          <div className="border-t border-slate-100 my-1" />

                          <button
                            onClick={() => handleDeleteHire(hire.id, hire.name)}
                            className="w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-medium"
                          >
                            <Trash2 className="w-4 h-4 text-rose-500" />
                            Remove from List
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MODAL 1: Document Quick Review & Status Modal */}
      {/* ---------------------------------------------------- */}
      {docModalInfo && (
        <Modal
          isOpen={!!docModalInfo}
          onClose={() => setDocModalInfo(null)}
          title={`Document Verification — ${docLabels[docModalInfo.docKey]}`}
          description={`Reviewing ${docModalInfo.hire.name}'s ${docLabels[docModalInfo.docKey]} compliance file.`}
          maxWidth="md"
        >
          <div className="space-y-5 py-2">
            {/* Document Details Header */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-brand-teal" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{docLabels[docModalInfo.docKey]}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Candidate: <span className="font-medium text-slate-700">{docModalInfo.hire.name}</span>
                  </p>
                </div>
              </div>

              <Badge
                variant={
                  docModalInfo.hire.documents[docModalInfo.docKey].status === "completed"
                    ? "success"
                    : docModalInfo.hire.documents[docModalInfo.docKey].status === "missing"
                    ? "error"
                    : "warning"
                }
              >
                {docModalInfo.hire.documents[docModalInfo.docKey].status.toUpperCase()}
              </Badge>
            </div>

            {/* Document Preview / File Info */}
            <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Uploaded Document File
                </span>
                {docModalInfo.hire.documents[docModalInfo.docKey].updatedAt && (
                  <span className="text-xs text-slate-400">
                    Updated {docModalInfo.hire.documents[docModalInfo.docKey].updatedAt}
                  </span>
                )}
              </div>

              {docModalInfo.hire.documents[docModalInfo.docKey].fileName ? (
                <div className="flex items-center justify-between p-3 bg-teal-50/50 rounded-lg border border-teal-100">
                  <div className="flex items-center gap-2 truncate">
                    <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs font-medium text-slate-800 truncate">
                      {docModalInfo.hire.documents[docModalInfo.docKey].fileName}
                    </span>
                  </div>
                  <span className="text-xs text-brand-teal font-semibold hover:underline cursor-pointer">
                    Preview
                  </span>
                </div>
              ) : (
                <div className="py-4 text-center text-xs text-slate-400">
                  No file uploaded yet for this requirement.
                </div>
              )}

              {/* Upload simulated button */}
              <label className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer text-xs font-semibold transition-colors">
                <Upload className="w-3.5 h-3.5" />
                Upload / Replace Document PDF
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUpdateDocStatus(
                        docModalInfo.hire.id,
                        docModalInfo.docKey,
                        "completed",
                        e.target.files[0].name
                      );
                      setDocModalInfo(null);
                    }
                  }}
                />
              </label>
            </div>

            {/* Quick Status Action Buttons */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Update Document Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    handleUpdateDocStatus(docModalInfo.hire.id, docModalInfo.docKey, "completed");
                    setDocModalInfo(null);
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" /> Approve
                </button>
                <button
                  onClick={() => {
                    handleUpdateDocStatus(docModalInfo.hire.id, docModalInfo.docKey, "pending");
                    setDocModalInfo(null);
                  }}
                  className="px-3 py-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Clock className="w-3.5 h-3.5" /> Pending
                </button>
                <button
                  onClick={() => {
                    handleUpdateDocStatus(docModalInfo.hire.id, docModalInfo.docKey, "missing");
                    setDocModalInfo(null);
                  }}
                  className="px-3 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Mark Missing
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL 2: Send Onboarding Reminder Modal */}
      {/* ---------------------------------------------------- */}
      {reminderHire && (
        <Modal
          isOpen={!!reminderHire}
          onClose={() => setReminderHire(null)}
          title={`Send Reminder — ${reminderHire.name}`}
          description={`Send automated notification for outstanding onboarding documents.`}
          maxWidth="md"
        >
          <div className="space-y-4 py-2">
            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs space-y-1">
              <div className="font-semibold text-blue-900 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                Recipient Information
              </div>
              <p className="text-blue-700">Email: {reminderHire.email}</p>
              <p className="text-blue-700">Phone (SMS): {reminderHire.phone}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 block">Reminder Template</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800">
                <option>Standard Missing Document Alert (I-9 / W-4 / CPR)</option>
                <option>Welcome & Orientation Schedule Notice</option>
                <option>Urgent Compliance Deadline Warning</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 block">Custom Message Note (Optional)</label>
              <textarea
                rows={3}
                placeholder="Hi Amanda, please upload your CPR certificate at your earliest convenience to start your first shift!"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => setReminderHire(null)}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSendReminder(reminderHire.id)}
              className="px-4 py-2 rounded-xl bg-brand-teal text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-brand-teal/90 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Send Email & SMS
            </button>
          </div>
        </Modal>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL 3: Full Onboarding Dossier & Compliance Modal */}
      {/* ---------------------------------------------------- */}
      {selectedHireForDossier && (
        <Modal
          isOpen={!!selectedHireForDossier}
          onClose={() => setSelectedHireForDossier(null)}
          title={`Onboarding Dossier — ${selectedHireForDossier.name}`}
          description={`Comprehensive document audit and clearance status.`}
          maxWidth="2xl"
        >
          <div className="space-y-6 py-2">
            {/* Header Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
              <div className="flex items-center gap-3">
                <Avatar
                  src={selectedHireForDossier.avatarUrl}
                  alt={selectedHireForDossier.name}
                  fallback={selectedHireForDossier.name.substring(0, 2)}
                  size="md"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedHireForDossier.name}</h3>
                  <p className="text-xs text-slate-500">{selectedHireForDossier.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Start Date: {selectedHireForDossier.startDate}</p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-xs text-slate-500 font-medium mb-1">Overall Progress</div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        selectedHireForDossier.progress === 100 ? "bg-emerald-500" : "bg-brand-teal"
                      )}
                      style={{ width: `${selectedHireForDossier.progress}%` }}
                    />
                  </div>
                  <span className="font-bold text-sm text-slate-800">{selectedHireForDossier.progress}%</span>
                </div>
              </div>
            </div>

            {/* Document Requirements Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Document Clearance Checklist (4 Required)
              </h4>

              <div className="space-y-2">
                {(["i9", "w4", "backgroundCheck", "cprCert"] as const).map((docKey) => {
                  const doc = selectedHireForDossier.documents[docKey];
                  return (
                    <div
                      key={docKey}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {doc.status === "completed" ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        ) : doc.status === "missing" ? (
                          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                            <AlertCircle className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                            <Clock className="w-5 h-5" />
                          </div>
                        )}

                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{docLabels[docKey]}</div>
                          <div className="text-xs text-slate-500">
                            {doc.fileName ? (
                              <span className="text-emerald-700 font-medium">{doc.fileName}</span>
                            ) : (
                              "No file uploaded"
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {doc.status !== "completed" ? (
                          <button
                            onClick={() => handleUpdateDocStatus(selectedHireForDossier.id, docKey, "completed")}
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateDocStatus(selectedHireForDossier.id, docKey, "missing")}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600 text-xs font-medium transition-colors"
                          >
                            Re-open
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions Footer inside Dossier */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/caregivers/${selectedHireForDossier.id}`}
                className="text-xs font-semibold text-brand-teal hover:underline flex items-center gap-1"
              >
                Go to Caregiver Full Roster Profile <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-2">
                {selectedHireForDossier.progress < 100 && (
                  <button
                    onClick={() => handleApproveAllDocs(selectedHireForDossier.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve All Documents
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL 4: Add New Hire Modal */}
      {/* ---------------------------------------------------- */}
      {isAddHireModalOpen && (
        <Modal
          isOpen={isAddHireModalOpen}
          onClose={() => setIsAddHireModalOpen(false)}
          title="Add New Hire to Onboarding"
          description="Enter candidate details to initiate onboarding checklist."
          maxWidth="md"
        >
          <form onSubmit={handleAddHire} className="space-y-4 py-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Samantha Vance"
                value={newHireData.name}
                onChange={(e) => setNewHireData({ ...newHireData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Role Title</label>
                <select
                  value={newHireData.role}
                  onChange={(e) => setNewHireData({ ...newHireData, role: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                >
                  <option value="Registered Nurse (RN)">Registered Nurse (RN)</option>
                  <option value="Home Health Aide (HHA)">Home Health Aide (HHA)</option>
                  <option value="Certified Nursing Assistant (CNA)">Certified Nursing Assistant (CNA)</option>
                  <option value="Physical Therapist (PT)">Physical Therapist (PT)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Target Start Date</label>
                <input
                  type="text"
                  placeholder="e.g. Nov 15, 2026"
                  value={newHireData.startDate}
                  onChange={(e) => setNewHireData({ ...newHireData, startDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Email Address</label>
                <input
                  type="email"
                  placeholder="name@homeliocare.com"
                  value={newHireData.email}
                  onChange={(e) => setNewHireData({ ...newHireData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Phone Number</label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={newHireData.phone}
                  onChange={(e) => setNewHireData({ ...newHireData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddHireModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-brand-teal text-white text-xs font-semibold hover:bg-brand-teal/90 transition-colors shadow-sm"
              >
                Create Onboarding Hire
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
