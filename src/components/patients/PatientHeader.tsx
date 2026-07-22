"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Patient } from "@/lib/patients/mockData";
import { Calendar, ShieldAlert, MessageSquare, Edit3, MapPin } from "lucide-react";
import { cn } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

interface PatientHeaderProps {
  patient: Patient;
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  const [modalState, setModalState] = useState<"none" | "schedule" | "incident" | "message" | "edit">("none");

  return (
    <>
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200 mb-4 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
            <h1 className="text-2xl font-bold text-text-primary mb-2">{patient.name}</h1>
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
            } className="text-sm px-3 py-1 bg-rose-50 text-rose-600 border-rose-100">
              {patient.riskLevel}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <button
              onClick={() => setModalState("schedule")}
              className="inline-flex items-center gap-2 bg-brand-teal hover:bg-emerald-600 active:scale-95 transition-all text-white px-4 py-2 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              <Calendar className="w-4 h-4" />
              Schedule Visit
            </button>
            <button
              onClick={() => setModalState("incident")}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 px-4 py-2 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              <ShieldAlert className="w-4 h-4 text-orange-500" />
              New Incident
            </button>
            <button
              onClick={() => setModalState("message")}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 px-4 py-2 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              Message Family
            </button>
            <button
              onClick={() => setModalState("edit")}
              className="p-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 rounded-xl shadow-[0_6px_32px_rgba(0,0,0,0.06)]" title="Edit Profile">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState === "schedule"}
        onClose={() => setModalState("none")}
        title="Schedule Visit"
        description={`Schedule a new visit for ${patient.name}`}
        footer={
          <>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium bg-brand-teal text-white rounded-lg hover:bg-emerald-600 transition-colors">Confirm Schedule</button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input type="date" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
            <input type="time" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Caregiver / Staff</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white">
              <option>Select caregiver...</option>
              <option>Sarah Jenkins (RN)</option>
              <option>Marcus T. (HHA)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" rows={3} placeholder="Add any special instructions..."></textarea>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalState === "incident"}
        onClose={() => setModalState("none")}
        title="Report New Incident"
        description="Log a new incident or adverse event."
        footer={
          <>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">Submit Report</button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Incident Type</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white">
              <option>Fall / Injury</option>
              <option>Medication Error</option>
              <option>Behavioral Issue</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
            <div className="flex gap-3 mt-2">
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="sev" className="text-brand-teal" /> Low</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="sev" className="text-amber-500" /> Medium</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="sev" className="text-rose-500" /> High</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" rows={4} placeholder="Describe what happened in detail..."></textarea>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalState === "message"}
        onClose={() => setModalState("none")}
        title="Message Family"
        description="Send a secure message to the primary contacts."
        footer={
          <>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium bg-brand-teal text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2">
              Send Message
            </button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
            <input type="text" readOnly value={`${patient.demographics?.emergencyContacts?.[0]?.name || 'No contact'} (${patient.demographics?.emergencyContacts?.[0]?.relation || 'N/A'})`} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-600 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" rows={5} placeholder="Type your message here..."></textarea>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalState === "edit"}
        onClose={() => setModalState("none")}
        title="Edit Profile"
        description={`Update details for ${patient.name}`}
        footer={
          <>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium bg-brand-teal text-white rounded-lg hover:bg-emerald-600 transition-colors">Save Changes</button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" defaultValue={patient.name} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
              <input type="number" defaultValue={patient.age} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <input type="text" defaultValue={patient.address} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Primary Diagnosis</label>
            <input type="text" defaultValue={patient.primaryDiagnosis} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
          </div>
        </div>
      </Modal>
    </>
  );
}
