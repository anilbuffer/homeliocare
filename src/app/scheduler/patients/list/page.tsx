"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Search, MapPin, Key, ShieldAlert, ArrowUpDown, UserPlus, FileText, CheckCircle2 } from "lucide-react";
import { PatientDetailsDrawer } from "../../../../components/scheduler/PatientDetailsDrawer";
import { SchedulerPatient } from "@/types/scheduler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { mockPatients as intakePatients } from "@/lib/patients/mockData";
import { useAuth } from "@/hooks/useAuth";
import { useRBAC } from "@/lib/rbac/rbacStore";

const mockPatients: SchedulerPatient[] = [
  {
    id: "p-1",
    name: "Dorothy Vance",
    address: "123 Example Street, Suite 400, New York, NY 10001",
    accessInstructions: "Gate Code: 4829. Key lockbox on side door.",
    requiredSkills: ["HHA", "Hoyer Lift", "Dementia Care"],
    authorizedHours: 40,
    scheduledHours: 40,
    primaryCaregiver: "Maria Alvarez",
    riskFlags: ["Fall Risk"],
    status: "Admitted",
  },
  {
    id: "p-2",
    name: "Frank Delaney",
    address: "45 River Road, Apt 2B, Brooklyn, NY 11201",
    accessInstructions: "Ring buzzer #202. Front desk requires ID.",
    requiredSkills: ["CNA", "Post-op Care"],
    authorizedHours: 20,
    scheduledHours: 16,
    primaryCaregiver: "Robert Chen",
    riskFlags: [],
    status: "Admitted",
  },
  {
    id: "p-3",
    name: "Arthur Pendelton",
    address: "789 Pine Ave, Bronx, NY 10453",
    accessInstructions: "Family member always home. Knock loudly.",
    requiredSkills: ["HHA", "Oxygen-dependent"],
    authorizedHours: 84,
    scheduledHours: 84,
    primaryCaregiver: "Multiple",
    riskFlags: ["Oxygen-dependent"],
    status: "Admitted",
  },
  {
    id: intakePatients["c-1"].id,
    name: intakePatients["c-1"].name,
    address: intakePatients["c-1"].address,
    accessInstructions: "Key lockbox code: 1234.",
    requiredSkills: ["CNA", "Dementia Care"],
    authorizedHours: intakePatients["c-1"].billing?.authorization?.total || 80,
    scheduledHours: intakePatients["c-1"].billing?.authorization?.used || 72,
    primaryCaregiver: intakePatients["c-1"].careTeam.primaryCaregivers[0]?.name || "Unassigned",
    riskFlags: [
      intakePatients["c-1"].riskSummary.fallRisk.level === "High" ? "High Fall Risk" : "Fall Risk",
      ...(intakePatients["c-1"].safetyAlerts?.isolationProtocols || [])
    ],
    status: intakePatients["c-1"].intakeStatus === "Admitted" ? "Admitted" : "Pending",
  },
  {
    id: intakePatients["ref-ew-001"].id,
    name: intakePatients["ref-ew-001"].name,
    address: intakePatients["ref-ew-001"].address,
    accessInstructions: "Gate code: 1984. Beware of dog.",
    requiredSkills: ["HHA", "Pain Management", "ADL Support", "Mobility Assistance"],
    authorizedHours: intakePatients["ref-ew-001"].billing?.authorization?.total || 80,
    scheduledHours: intakePatients["ref-ew-001"].billing?.authorization?.used || 0,
    primaryCaregiver: intakePatients["ref-ew-001"].careTeam.primaryCaregivers[0]?.name || null,
    riskFlags: [
      intakePatients["ref-ew-001"].riskSummary.fallRisk.level === "High" ? "High Fall Risk" : "Fall Risk",
      `${intakePatients["ref-ew-001"].riskSummary.medicationRisk.level} Medication Risk`,
      `${intakePatients["ref-ew-001"].riskSummary.cognitiveStatus.level} Cognitive Risk`
    ],
    status: intakePatients["ref-ew-001"].intakeStatus === "Admitted" ? "Admitted" : "Pending",
  }
];

export default function PatientsListPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { permissions } = useRBAC();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Admitted">("All");
  type SortColumn = "name" | "hours" | null;
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedPatient, setSelectedPatient] = useState<SchedulerPatient | null>(null);

  const patientPerm = permissions.find(p => p.role_id === currentUser?.role_id && p.module_id === "mod_patients");
  const canEditPatient = patientPerm?.access_level === "edit" || patientPerm?.access_level === "full";

  const schedulePerm = permissions.find(p => p.role_id === currentUser?.role_id && p.module_id === "mod_scheduling");
  const canSchedule = schedulePerm?.access_level === "edit" || schedulePerm?.access_level === "full";

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  let processedPatients = mockPatients.filter(
    (p) =>
      (filterType === "All" || p.status === filterType) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.address.toLowerCase().includes(search.toLowerCase()))
  );

  if (sortColumn) {
    processedPatients.sort((a, b) => {
      if (sortColumn === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortColumn === "hours") {
        const ratioA = a.authorizedHours > 0 ? a.scheduledHours / a.authorizedHours : 0;
        const ratioB = b.authorizedHours > 0 ? b.scheduledHours / b.authorizedHours : 0;
        return sortDirection === "asc" ? ratioA - ratioB : ratioB - ratioA;
      }
      return 0;
    });
  }

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3 lg:mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Patient Census (Scheduler View)
          </h1>
          <p className="text-xs text-slate-500">
            View scheduling-relevant patient data. Clinical records are restricted.
          </p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal w-full sm:w-64 transition-all bg-white"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-4 border-b border-slate-200">
        <button
          onClick={() => setFilterType("All")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${filterType === "All"
            ? "border-brand-teal text-brand-teal"
            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
        >
          All Patients
        </button>
        <button
          onClick={() => setFilterType("Admitted")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${filterType === "Admitted"
            ? "border-brand-teal text-brand-teal"
            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
        >
          Admitted Census
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-3 lg:mb-4 flex items-start gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-amber-900">Privacy & Scope Active</h4>
          <p className="text-xs text-amber-800 mt-1">
            This view is intentionally restricted to scheduling logistics only (address, access rules, required skills, and authorized hours). Clinical documentation, diagnoses, and MAR data are hidden per RBAC configuration.
          </p>
        </div>
      </div>

      <Card noPadding className="bg-white rounded-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:text-slate-800 select-none"
                    onClick={() => handleSort("name")}
                  >
                    Patient <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3">Logistics & Access</th>
                <th className="px-4 py-3">Care Requirements</th>
                <th className="px-4 py-3">
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:text-slate-800 select-none"
                    onClick={() => handleSort("hours")}
                  >
                    Hours Auth vs Sched <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3">Primary Caregiver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {processedPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col gap-1.5">
                      <div className="font-semibold text-slate-900 text-sm">{patient.name}</div>
                      <span className={`w-max px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${patient.status === 'Admitted' ? 'bg-emerald-100 text-emerald-700' :
                        patient.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                        {patient.status}
                      </span>
                      {patient.riskFlags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {patient.riskFlags.map(flag => (
                            <span key={flag} className="px-1.5 py-1 rounded-lg bg-red-50 text-red-600 text-[10px] font-semibold border border-red-100 flex items-center gap-1">
                              <ShieldAlert className="w-2.5 h-2.5" /> {flag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top max-w-[280px]">
                    <div className="space-y-2">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-600 leading-tight">{patient.address}</span>
                      </div>
                      <div className="flex items-start gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                        <Key className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-700 font-medium leading-tight">{patient.accessInstructions}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      {patient.requiredSkills.map(skill => (
                        <span key={skill} className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-end gap-1.5">
                        <span className="text-lg font-semibold text-slate-900">{patient.scheduledHours}</span>
                        <span className="text-xs text-slate-500 font-medium pb-0.5">/ {patient.authorizedHours} hrs</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[120px]">
                        <div
                          className={`h-1.5 rounded-full ${patient.scheduledHours < patient.authorizedHours ? 'bg-amber-400' : 'bg-brand-teal'}`}
                          style={{ width: `${Math.min(100, (patient.scheduledHours / patient.authorizedHours) * 100)}%` }}
                        ></div>
                      </div>
                      {patient.scheduledHours < patient.authorizedHours && (
                        <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-1">
                          <UserPlus className="w-3 h-3" /> Action Required: Missing Shifts
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {patient.primaryCaregiver ? (
                      <div className="font-semibold text-slate-800">{patient.primaryCaregiver}</div>
                    ) : (
                      <span className="text-slate-400 italic text-xs">Unassigned</span>
                    )}
                  </td>
                </tr>
              ))}
              {processedPatients.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No patients found matching "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      <PatientDetailsDrawer
        isOpen={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
        patient={selectedPatient}
        onEdit={canEditPatient ? () => {
          toast.info(`Editing details for ${selectedPatient?.name}`);
        } : undefined}
        onSchedule={canSchedule ? () => {
          toast.success(`Opening scheduler for ${selectedPatient?.name}`);
          router.push("/scheduler/dispatch/optimizer");
        } : undefined}
      />
    </div>
  );
}
