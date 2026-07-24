"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ComplianceProgressBar } from "../ComplianceProgressBar";
import {
  User, CheckCircle2, AlertTriangle, AlertCircle, Award, BookOpen,
  Calendar, Clock, ShieldCheck, Mail, Send
} from "lucide-react";
import { StaffTrainingStatus } from "@/lib/mockTrainingData";

interface CaregiverProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: StaffTrainingStatus | null;
  onSendReminder: (staff: StaffTrainingStatus) => void;
}

export function CaregiverProfileModal({
  isOpen,
  onClose,
  staff,
  onSendReminder,
}: CaregiverProfileModalProps) {
  const [activeTab, setActiveTab] = useState<"courses" | "certs">("courses");

  if (!staff) return null;

  const mockAssigned = [
    { title: "HIPAA Privacy Essentials 2026", category: "HIPAA", status: "Completed", score: "100%", date: "Jul 10, 2026" },
    { title: "Bloodborne Pathogens & OSHA", category: "OSHA", status: staff.status === "Overdue" ? "Overdue" : "Completed", score: staff.status === "Overdue" ? "15%" : "95%", date: "Due Jul 25, 2026" },
    { title: "Hand Hygiene & Infection Control", category: "Infection Control", status: "Completed", score: "100%", date: "Jul 14, 2026" },
    { title: "Medication Administration Safety", category: "Medication", status: "In Progress", score: "45%", date: "Due Aug 02, 2026" },
    { title: "Fire Safety in the Home", category: "Fire Safety", status: "Completed", score: "92%", date: "Jun 30, 2026" },
  ];

  const mockCerts = [
    { name: "Certified Nursing Assistant (CNA)", status: "Active", expires: "Mar 12, 2027", badge: "bg-emerald-100 text-emerald-800" },
    { name: "CPR & AED Provider", status: staff.certificationsExpiring > 0 ? "Expiring Soon" : "Active", expires: "Aug 04, 2026", badge: "bg-amber-100 text-amber-800" },
    { name: "HIPAA Compliance Certification", status: "Active", expires: "Jul 20, 2027", badge: "bg-emerald-100 text-emerald-800" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Caregiver Compliance & LMS Record"
      description={`Detailed training status for ${staff.name}`}
      icon={
        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] shrink-0">
          <User className="w-5 h-5 text-brand-teal" />
        </div>
      }
      footer={
        <button
          onClick={onClose}
          className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full sm:w-auto"
        >
          Close Profile
        </button>
      }
    >
      <div className="space-y-5">
        {/* Header Profile Card */}
        <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-teal text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
              {staff.avatar}
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {staff.name}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-brand-teal border border-white/10">
                  {staff.role}
                </span>
              </h3>
              <p className="text-xs text-slate-300 flex items-center gap-3 mt-0.5">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> Active {staff.lastActivity}</span>
                <span>•</span>
                <span>LMS ID: {staff.id}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onSendReminder(staff);
              }}
              className="px-3.5 py-2 bg-brand-teal hover:bg-[#0c8a6f] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Direct Reminder
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Compliance</span>
            <span className={`text-xl font-extrabold ${staff.complianceScore >= 80 ? "text-brand-teal" : staff.complianceScore >= 60 ? "text-amber-600" : "text-rose-600"}`}>
              {staff.complianceScore}%
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Courses Done</span>
            <span className="text-xl font-extrabold text-slate-900">
              {staff.coursesCompleted}/{staff.coursesTotal}
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Status</span>
            <span className={`text-xs font-bold px-2 py-0.5 inline-block rounded-full mt-1 ${
              staff.status === "On track" ? "bg-emerald-100 text-emerald-800" : staff.status === "At risk" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
            }`}>
              {staff.status}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab("courses")}
            className={`pb-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "courses" ? "border-brand-teal text-brand-teal" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Assigned Courses ({mockAssigned.length})
          </button>
          <button
            onClick={() => setActiveTab("certs")}
            className={`pb-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "certs" ? "border-brand-teal text-brand-teal" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Active Certifications ({mockCerts.length})
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === "courses" ? (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {mockAssigned.map((item, idx) => (
              <div key={idx} className="p-3 border border-slate-200/80 rounded-xl bg-white flex items-center justify-between text-xs hover:border-slate-300 transition-all">
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-[11px] text-slate-500">{item.category} • {item.date}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1 ${
                    item.status === "Completed" ? "bg-emerald-100 text-emerald-800" : item.status === "Overdue" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600">Score: {item.score}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {mockCerts.map((cert, idx) => (
              <div key={idx} className="p-3 border border-slate-200/80 rounded-xl bg-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-brand-teal" />
                  <div>
                    <p className="font-semibold text-slate-900">{cert.name}</p>
                    <p className="text-[11px] text-slate-500">Expires: {cert.expires}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cert.badge}`}>
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </Modal>
  );
}
