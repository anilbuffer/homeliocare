import React from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Patient } from "@/lib/patients/mockData";
import { Calendar, ShieldAlert, MessageSquare, Edit3, MapPin } from "lucide-react";
import { cn } from "@/components/ui/Card";

interface PatientHeaderProps {
  patient: Patient;
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200 mb-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative">
          <Avatar src={patient.avatarUrl} alt={patient.name} fallback={patient.name.substring(0, 2)} size="xl" className="w-24 h-24 text-2xl" />
          <div className="absolute -bottom-2 -right-2">
            <Badge variant={
              patient.status === "Active" ? "success" :
                patient.status === "Hospitalized" ? "warning" :
                  patient.status === "Discharged" ? "neutral" : "error"
            } className={cn(
              "border-2 border-white shadow-md font-bold text-white px-3 py-1",
              patient.status === "Active" && "bg-emerald-500",
              patient.status === "Hospitalized" && "bg-amber-500",
              patient.status === "Discharged" && "bg-slate-500",
              patient.status === "Inactive" && "bg-rose-500"
            )}>{patient.status}</Badge>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">{patient.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-3">
            <span className="font-medium text-slate-700">{patient.age} years old</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {patient.address}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Diagnosis</span>
            <Badge variant="brand" className="bg-brand-teal/10 text-brand-teal border-brand-teal/20">{patient.primaryDiagnosis}</Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start md:items-end gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">Risk Level</span>
          <Badge variant={
            patient.riskLevel === "Low" ? "success" :
              patient.riskLevel === "Medium" ? "warning" : "error"
          } className="text-sm px-3 py-1">
            {patient.riskLevel}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <button className="inline-flex items-center gap-2 bg-brand-teal hover:bg-emerald-600 active:scale-95 transition-all text-white px-4 py-2 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <Calendar className="w-4 h-4" />
            Schedule Visit
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 px-4 py-2 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <ShieldAlert className="w-4 h-4 text-orange-500" />
            New Incident
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 px-4 py-2 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            Message Family
          </button>
          <button className="p-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 rounded-xl shadow-[0_6px_32px_rgba(0,0,0,0.06)]" title="Edit Profile">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
