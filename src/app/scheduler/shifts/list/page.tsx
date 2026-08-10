"use client";

import React, { useState } from "react";
import { mockShifts, type Shift, type ShiftStatus } from "@/lib/scheduling/mockData";
import { FilterBar } from "@/components/scheduling/FilterBar";
import { CreateShiftModal } from "@/components/scheduling/CreateShiftModal";
import { Card } from "@/components/ui/Card";
import { format, parseISO } from "date-fns";
import clsx from "clsx";
import { ArrowUpDown, ArrowUp, ArrowDown, Clock, Plus } from "lucide-react";

type SortField = "startTime" | "patientName" | "assignedCaregiverName" | "status" | "region" | "";

export default function ScheduledShiftsListPage() {
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [activeFilter, setActiveFilter] = useState("All Shifts");
  const [caregiverFilter, setCaregiverFilter] = useState("");
  const [patientFilter, setPatientFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [sortField, setSortField] = useState<SortField>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredShifts = shifts.filter((s) => {
    if (activeFilter === "Call-Offs") {
      if (s.status !== "Call-Off") return false;
    } else if (activeFilter !== "All Shifts") {
      if (s.status !== activeFilter) return false;
    }

    if (caregiverFilter && s.assignedCaregiverName !== caregiverFilter) return false;
    if (patientFilter && s.patientName !== patientFilter) return false;
    if (regionFilter && s.region !== regionFilter) return false;

    return true;
  });

  const sortedAndFilteredShifts = [...filteredShifts].sort((a, b) => {
    if (!sortField) return 0;
    
    let aVal = a[sortField] || "";
    let bVal = b[sortField] || "";

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const uniqueCaregivers = Array.from(new Set(shifts.map((s) => s.assignedCaregiverName).filter(Boolean))) as string[];
  const uniquePatients = Array.from(new Set(shifts.map((s) => s.patientName).filter(Boolean)));
  const uniqueRegions = Array.from(new Set(shifts.map((s) => s.region).filter(Boolean)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Unfilled": return "bg-red-100 text-red-700";
      case "Completed": return "bg-emerald-100 text-emerald-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending Confirmation": return "bg-amber-100 text-amber-800";
      case "Confirmed": return "bg-teal-100 text-teal-900";
      case "Call-Off": return "bg-rose-100 text-rose-800";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleShiftStatusChange = (shiftId: string, newStatus: ShiftStatus) => {
    setShifts((prev) =>
      prev.map((s) => (s.id === shiftId ? { ...s, status: newStatus } : s))
    );
  };

  const handleShiftClick = (shift: Shift) => {
    console.log("Shift clicked:", shift);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 text-slate-400" />;
    return sortOrder === "asc" ? <ArrowUp className="w-3 h-3 text-slate-800" /> : <ArrowDown className="w-3 h-3 text-slate-800" />;
  };

  return (
    <div className="w-full animate-in fade-in duration-500 max-w-full">
      <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Scheduled Shifts List
          </h1>
          <p className="text-xs text-slate-500">Tabular view of all scheduled shifts for export and scanning.</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-teal text-white text-sm font-semibold rounded-xl hover:bg-brand-teal/90 transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20"
        >
          <Plus className="w-4 h-4" />
          Create Shift
        </button>
      </div>

      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        caregiverFilter={caregiverFilter}
        setCaregiverFilter={setCaregiverFilter}
        patientFilter={patientFilter}
        setPatientFilter={setPatientFilter}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
        uniqueCaregivers={uniqueCaregivers}
        uniquePatients={uniquePatients}
        uniqueRegions={uniqueRegions}
      />

      <Card noPadding className="mt-4 bg-white rounded-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800 select-none" onClick={() => handleSort("startTime")}>
                      Date & Time <SortIcon field="startTime" />
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800 select-none" onClick={() => handleSort("patientName")}>
                      Patient <SortIcon field="patientName" />
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800 select-none" onClick={() => handleSort("assignedCaregiverName")}>
                      Caregiver <SortIcon field="assignedCaregiverName" />
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800 select-none" onClick={() => handleSort("status")}>
                      Status <SortIcon field="status" />
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800 select-none" onClick={() => handleSort("region")}>
                      Region <SortIcon field="region" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {sortedAndFilteredShifts.map((shift) => (
                  <tr key={shift.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => handleShiftClick(shift)}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900 flex items-center gap-1.5 whitespace-nowrap">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {format(parseISO(shift.startTime), "MMM d, h:mm a")} - {format(parseISO(shift.endTime), "h:mm a")}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">{shift.patientName}</td>
                    <td className="px-4 py-3">
                      {shift.assignedCaregiverName ? (
                        <span className="font-medium text-slate-800 whitespace-nowrap">{shift.assignedCaregiverName}</span>
                      ) : (
                        <span className="text-slate-400 italic whitespace-nowrap">Unassigned</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={clsx("px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap", getStatusColor(shift.status))}>
                        {shift.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{shift.region}</td>
                  </tr>
                ))}
                {sortedAndFilteredShifts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                      No shifts found matching your filters.
                    </td>
                                   </tr>
                )}
              </tbody>
          </table>
        </div>
      </Card>

      <CreateShiftModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(newShift) => setShifts([newShift, ...shifts])}
      />
    </div>
  );
}
