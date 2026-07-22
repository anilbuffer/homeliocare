"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Search, Filter, MoreVertical, ArrowRight, LayoutGrid, List } from "lucide-react";
import { mockPatients } from "@/lib/patients/mockData";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { NewPatientModal } from "@/components/patients/NewPatientModal";

export default function PatientsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
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

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Patients</h2>
          <p className="text-sm text-text-secondary mt-1">Showing {Object.values(mockPatients).length} of 247 patients.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-9 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all w-64"
            />
          </div>

          <div className="flex items-center bg-white p-1 rounded-full border border-slate-200">
            <button
              onClick={() => handleViewChange("list")}
              className={`p-1.5 rounded-full transition-colors ${viewMode === "list" ? "bg-brand-teal/20 text-brand-teal shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "text-slate-500 hover:text-slate-700"}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleViewChange("grid")}
              className={`p-1.5 rounded-full transition-colors ${viewMode === "grid" ? "bg-brand-teal/20 text-brand-teal shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "text-slate-500 hover:text-slate-700"}`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsNewPatientModalOpen(true)}
            className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap"
          >
            <Users className="w-4 h-4" />
            New Patient
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "list" ? (
        <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 font-medium">Patient</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Status</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Risk Level</th>
                  <th className="px-4 py-3 font-medium hidden lg:table-cell">Diagnosis</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.values(mockPatients).map((patient) => (
                  <tr
                    key={patient.id}
                    className="even:bg-slate-50/40 hover:bg-slate-100/60 transition-colors group cursor-pointer"
                    onClick={() => router.push(`/patients/${patient.id}`)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar src={patient.avatarUrl} alt={patient.name} fallback={patient.name.substring(0, 2)} size="sm" />
                        <div>
                          <div className="font-medium text-slate-900 group-hover:text-brand-teal transition-colors">{patient.name}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{patient.age} yrs • {patient.demographics.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <Badge variant={
                        patient.status === "Active" ? "success" :
                          patient.status === "Hospitalized" ? "warning" :
                            patient.status === "Discharged" ? "default" : "error"
                      }>{patient.status}</Badge>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Badge variant={
                        patient.riskLevel === "Low" ? "success" :
                          patient.riskLevel === "Medium" ? "warning" : "error"
                      }>{patient.riskLevel} Risk</Badge>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-slate-700 max-w-[200px] truncate block" title={patient.primaryDiagnosis}>{patient.primaryDiagnosis}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-1.5 text-brand-teal hover:bg-brand-teal/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="View Profile"
                          onClick={(e) => { e.stopPropagation(); router.push(`/patients/${patient.id}`); }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-lg transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.values(mockPatients).map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/patients/${patient.id}`} className="block h-full group">
                <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar src={patient.avatarUrl} alt={patient.name} fallback={patient.name.substring(0, 2)} size="lg" />
                      <div>
                        <h3 className="font-semibold text-text-primary group-hover:text-brand-teal transition-colors">{patient.name}</h3>
                        <p className="text-sm text-text-secondary">{patient.age} yrs • {patient.demographics.gender}</p>
                      </div>
                    </div>
                    <button
                      className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Status</span>
                      <Badge variant={
                        patient.status === "Active" ? "success" :
                          patient.status === "Hospitalized" ? "warning" :
                            patient.status === "Discharged" ? "default" : "error"
                      }>{patient.status}</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Risk Level</span>
                      <Badge variant={
                        patient.riskLevel === "Low" ? "success" :
                          patient.riskLevel === "Medium" ? "warning" : "error"
                      }>{patient.riskLevel} Risk</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Diagnosis</span>
                      <span className="font-medium text-slate-700 truncate max-w-[140px] text-right" title={patient.primaryDiagnosis}>{patient.primaryDiagnosis}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-brand-teal text-sm font-medium">
                    View Patient Profile
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <NewPatientModal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
      />
    </div>
  );
}

