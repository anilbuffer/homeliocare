"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  ArrowRight,
  LayoutGrid,
  List,
  X,
  HeartPulse,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Plus,
  ChevronRight,
  UserPlus
} from "lucide-react";
import { mockPatients, Patient } from "@/lib/patients/mockData";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { NewPatientModal } from "@/components/patients/NewPatientModal";

type FilterStatus = "ALL" | "Active" | "High Risk" | "Hospitalized" | "Discharged";

export default function PatientsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("ALL");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedView = localStorage.getItem("patientViewMode") as "list" | "grid";
    if (savedView) {
      setViewMode(savedView);
    }
  }, []);

  const handleViewChange = (mode: "list" | "grid") => {
    setViewMode(mode);
    localStorage.setItem("patientViewMode", mode);
  };

  const allPatientsList = useMemo(() => Object.values(mockPatients), []);

  // Filtered patients calculation
  const filteredPatients = useMemo(() => {
    return allPatientsList.filter((patient) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.primaryDiagnosis.toLowerCase().includes(query) ||
        patient.status.toLowerCase().includes(query) ||
        patient.riskLevel.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query);

      // Status / Risk match
      let matchesFilter = true;
      if (activeFilter === "Active") matchesFilter = patient.status === "Active";
      else if (activeFilter === "High Risk") matchesFilter = patient.riskLevel === "High";
      else if (activeFilter === "Hospitalized") matchesFilter = patient.status === "Hospitalized";
      else if (activeFilter === "Discharged") matchesFilter = patient.status === "Discharged";

      return matchesSearch && matchesFilter;
    });
  }, [allPatientsList, searchQuery, activeFilter]);

  // Dynamic Stats
  const stats = useMemo(() => {
    const total = 247; // Database total representation
    const activeCount = allPatientsList.filter(p => p.status === "Active").length;
    const highRiskCount = allPatientsList.filter(p => p.riskLevel === "High").length;
    const hospitalizedCount = allPatientsList.filter(p => p.status === "Hospitalized").length;

    return [
      {
        id: "ALL" as FilterStatus,
        title: "Total Patients",
        count: total,
        subtitle: `${allPatientsList.length} loaded in view`,
        icon: Users,
        badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
        activeBorder: "border-slate-400 ring-2 ring-slate-400/20",
        accentGlow: "group-hover:border-slate-300"
      },
      {
        id: "Active" as FilterStatus,
        title: "Active Care",
        count: activeCount,
        subtitle: "Receiving daily/weekly care",
        icon: HeartPulse,
        badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        activeBorder: "border-emerald-500 ring-2 ring-emerald-500/20",
        accentGlow: "group-hover:border-emerald-300"
      },
      {
        id: "High Risk" as FilterStatus,
        title: "High Risk Alert",
        count: highRiskCount,
        subtitle: "Requires priority monitoring",
        icon: AlertTriangle,
        badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
        activeBorder: "border-rose-500 ring-2 ring-rose-500/20",
        accentGlow: "group-hover:border-rose-300"
      },
      {
        id: "Hospitalized" as FilterStatus,
        title: "Hospitalized",
        count: hospitalizedCount,
        subtitle: "Inpatient / Temp Hold",
        icon: Building2,
        badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
        activeBorder: "border-amber-500 ring-2 ring-amber-500/20",
        accentGlow: "group-hover:border-amber-300"
      }
    ];
  }, [allPatientsList]);

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            Patients Directory
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
              {filteredPatients.length} shown
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage patient records, clinical risk levels, and care plans across all locations.
          </p>
        </div>

        <button
          onClick={() => setIsNewPatientModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-brand-teal hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-[0_6px_20px_rgba(13,148,136,0.25)] transition-all active:scale-95 whitespace-nowrap self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>New Patient</span>
        </button>
      </div>

      {/* KPI Stats Strip - Clickable Quick Filters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          const isActive = activeFilter === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveFilter(item.id)}
              className={`group cursor-pointer bg-white rounded-2xl p-3.5 sm:p-4 border transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden ${isActive ? item.activeBorder : "border-slate-200/80 hover:border-slate-300"
                }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors truncate">
                  {item.title}
                </span>
                <div className={`p-2 rounded-xl border ${item.badgeBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {item.count}
                </span>
                {isActive && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full">
                    Active Filter
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 truncate">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Responsive Filter & Search Toolbar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input - Expands fully on mobile */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name, diagnosis, ID, or risk status..."
              className="w-full pl-9 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200/60 transition-colors"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Toolbar Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${activeFilter !== "ALL" || isFilterPanelOpen
                ? "bg-brand-teal/10 text-brand-teal border-brand-teal/30 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilter !== "ALL" && (
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
              )}
            </button>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
              <button
                onClick={() => handleViewChange("list")}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === "list"
                  ? "bg-white text-brand-teal shadow-[0_6px_32px_rgba(0,0,0,0.04)] font-bold"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
                title="List View"
              >
                <List className="w-4 h-4" />
                <span className="hidden xs:inline">List</span>
              </button>
              <button
                onClick={() => handleViewChange("grid")}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === "grid"
                  ? "bg-white text-brand-teal shadow-[0_6px_32px_rgba(0,0,0,0.04)] font-bold"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
                title="Card Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden xs:inline">Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills Row */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5 no-scrollbar">
          <span className="text-xs font-medium text-slate-400 shrink-0 mr-1">Status:</span>
          {(["ALL", "Active", "High Risk", "Hospitalized", "Discharged"] as FilterStatus[]).map((filterVal) => {
            const isSelected = activeFilter === filterVal;
            return (
              <button
                key={filterVal}
                onClick={() => setActiveFilter(filterVal)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${isSelected
                  ? "bg-slate-900 text-white shadow-[0_6px_32px_rgba(0,0,0,0.04)] font-semibold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                  }`}
              >
                {filterVal === "ALL" ? "All Patients" : filterVal}
              </button>
            );
          })}

          {(searchQuery || activeFilter !== "ALL") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("ALL");
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 underline underline-offset-2 ml-auto shrink-0"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Zero Results State */}
      {filteredPatients.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] my-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No matching patients found</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
            We couldn't find any patients matching "{searchQuery || activeFilter}". Try adjusting your search term or clearing active filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("ALL");
            }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {filteredPatients.length > 0 && (
        <>
          {viewMode === "list" ? (
            <div className="w-full bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              {/* Desktop / Tablet Table View (sm and up) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200/80 sticky top-0 z-10 font-semibold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 sm:px-6 py-3.5">Patient Details</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5">Risk Level</th>
                      <th className="px-4 py-3.5">Primary Diagnosis</th>
                      <th className="px-4 sm:px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                        onClick={() => router.push(`/patients/${patient.id}`)}
                      >
                        <td className="px-4 sm:px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={patient.avatarUrl}
                              alt={patient.name}
                              fallback={patient.name.substring(0, 2)}
                              size="md"
                            />
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-brand-teal transition-colors flex items-center gap-2">
                                {patient.name}
                              </div>
                              <div className="text-slate-500 text-xs mt-0.5 font-medium">
                                {patient.age} yrs • {patient.demographics.gender}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <Badge
                            variant={
                              patient.status === "Active"
                                ? "success"
                                : patient.status === "Hospitalized"
                                  ? "warning"
                                  : patient.status === "Discharged"
                                    ? "default"
                                    : "error"
                            }
                          >
                            {patient.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3.5">
                          <Badge
                            variant={
                              patient.riskLevel === "Low"
                                ? "success"
                                : patient.riskLevel === "Medium"
                                  ? "warning"
                                  : "error"
                            }
                          >
                            {patient.riskLevel} Risk
                          </Badge>
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className="font-medium text-slate-800 max-w-[240px] truncate block"
                            title={patient.primaryDiagnosis}
                          >
                            {patient.primaryDiagnosis}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-teal hover:text-emerald-700 bg-brand-teal/10 hover:bg-brand-teal/20 px-3 py-1.5 rounded-lg transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/patients/${patient.id}`);
                              }}
                            >
                              View Profile
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Mobile List Card Layout (< sm viewport) */}
              <div className="block sm:hidden divide-y divide-slate-100">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-4 hover:bg-slate-50/80 transition-colors cursor-pointer active:bg-slate-100/60"
                    onClick={() => router.push(`/patients/${patient.id}`)}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={patient.avatarUrl}
                          alt={patient.name}
                          fallback={patient.name.substring(0, 2)}
                          size="md"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-base leading-tight">
                            {patient.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {patient.age} yrs • {patient.demographics.gender}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 self-center" />
                    </div>

                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge
                        variant={
                          patient.status === "Active"
                            ? "success"
                            : patient.status === "Hospitalized"
                              ? "warning"
                              : patient.status === "Discharged"
                                ? "default"
                                : "error"
                        }
                      >
                        {patient.status}
                      </Badge>
                      <Badge
                        variant={
                          patient.riskLevel === "Low"
                            ? "success"
                            : patient.riskLevel === "Medium"
                              ? "warning"
                              : "error"
                        }
                      >
                        {patient.riskLevel} Risk
                      </Badge>
                    </div>

                    <div className="text-xs text-slate-600 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-400 shrink-0 mr-2">Diagnosis:</span>
                      <span className="font-semibold text-slate-800 truncate text-right">
                        {patient.primaryDiagnosis}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Grid View (Responsive Multi-Column Cards) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
              {filteredPatients.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                >
                  <Link href={`/patients/${patient.id}`} className="block h-full group">
                    <Card className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] hover:border-brand-teal/50 transition-all duration-200 relative overflow-hidden flex flex-col justify-between h-full">
                      <div>
                        {/* Top Row: Avatar & Name */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <Avatar
                              src={patient.avatarUrl}
                              alt={patient.name}
                              fallback={patient.name.substring(0, 2)}
                              size="lg"
                              className="shrink-0"
                            />
                            <div className="min-w-0">
                              <h3 className="font-bold text-slate-900 group-hover:text-brand-teal transition-colors truncate text-base">
                                {patient.name}
                              </h3>
                              <p className="text-xs font-medium text-slate-500 mt-0.5">
                                {patient.age} yrs • {patient.demographics.gender}
                              </p>
                            </div>
                          </div>
                          <button
                            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
                            onClick={(e) => e.preventDefault()}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Details Table */}
                        <div className="space-y-2.5 mb-5 text-xs sm:text-sm">
                          <div className="flex justify-between items-center bg-slate-50/70 px-3 py-1.5 rounded-xl border border-slate-100">
                            <span className="text-slate-500 font-medium">Status</span>
                            <Badge
                              variant={
                                patient.status === "Active"
                                  ? "success"
                                  : patient.status === "Hospitalized"
                                    ? "warning"
                                    : patient.status === "Discharged"
                                      ? "default"
                                      : "error"
                              }
                            >
                              {patient.status}
                            </Badge>
                          </div>

                          <div className="flex justify-between items-center bg-slate-50/70 px-3 py-1.5 rounded-xl border border-slate-100">
                            <span className="text-slate-500 font-medium">Risk Level</span>
                            <Badge
                              variant={
                                patient.riskLevel === "Low"
                                  ? "success"
                                  : patient.riskLevel === "Medium"
                                    ? "warning"
                                    : "error"
                              }
                            >
                              {patient.riskLevel} Risk
                            </Badge>
                          </div>

                          <div className="flex justify-between items-start bg-slate-50/70 px-3 py-2 rounded-xl border border-slate-100 gap-2">
                            <span className="text-slate-500 font-medium shrink-0">Diagnosis</span>
                            <span
                              className="font-semibold text-slate-800 text-right leading-tight break-words min-w-0"
                              title={patient.primaryDiagnosis}
                            >
                              {patient.primaryDiagnosis}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Link */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-brand-teal text-xs sm:text-sm font-bold tracking-tight">
                        <span>View Profile</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {/* New Patient Modal */}
      <NewPatientModal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
      />
    </div>
  );
}


