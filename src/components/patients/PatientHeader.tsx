"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Patient } from "@/lib/patients/mockData";
import { Calendar, ShieldAlert, MessageSquare, Edit3, MapPin, UserCheck, RefreshCw } from "lucide-react";
import { cn } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { toast } from "sonner";

interface PatientHeaderProps {
  patient: Patient;
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  const [modalState, setModalState] = useState<"none" | "schedule" | "requestDocs" | "message" | "edit" | "handover">("none");
  const [isSyncing, setIsSyncing] = useState(false);

  const handleHandover = () => {
    setIsSyncing(true);
    // Simulate syncing to clinical system
    setTimeout(() => {
      setIsSyncing(false);
      setModalState("none");
      toast.success(`Successfully handed over ${patient.name} and synced to clinical systems.`);
    }, 1500);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200 mb-4 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <Avatar src={patient.avatarUrl} alt={patient.name} fallback={patient.name.substring(0, 2)} size="xl" className="w-24 h-24 text-2xl" />
            <div className="absolute -bottom-2 -right-2">
              <Badge variant={
                patient.intakeStatus === "Ready to Admit" ? "success" :
                  patient.intakeStatus === "Onboarding Hold" ? "error" : "warning"
              } className={cn(
                "border-2 border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] font-semibold text-white whitespace-nowrap px-3 py-1",
                patient.intakeStatus === "Ready to Admit" ? "bg-emerald-500" :
                patient.intakeStatus === "Onboarding Hold" ? "bg-rose-500" : "bg-amber-500"
              )}>{patient.intakeStatus || "New Referral"}</Badge>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold text-text-primary mb-2">{patient.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-3">
              <span className="font-medium text-slate-700">{patient.age} years old</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {patient.address}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Diagnosis</span>
              <Badge variant="brand" className="bg-brand-teal/10 text-brand-teal border-brand-teal/20">{patient.primaryDiagnosis}</Badge>
            </div>
            {/* High-Alert Emergency Header */}
            <div className="flex flex-wrap items-center gap-2">
              {patient.safetyAlerts?.dnr && (
                <Badge className={cn("text-[10px] uppercase font-bold px-2 py-0.5 border", 
                  patient.safetyAlerts.dnr === "DNR" ? "bg-red-50 text-red-700 border-red-200" : 
                  patient.safetyAlerts.dnr === "Full Code" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  "bg-slate-100 text-slate-700 border-slate-200"
                )}>
                  {patient.safetyAlerts.dnr}
                </Badge>
              )}
              {patient.riskSummary?.fallRisk?.level && (
                <Badge className={cn("text-[10px] uppercase font-bold px-2 py-0.5 border", 
                  patient.riskSummary.fallRisk.level === "High" ? "bg-orange-50 text-orange-700 border-orange-200" : 
                  "bg-slate-100 text-slate-700 border-slate-200"
                )}>
                  {patient.riskSummary.fallRisk.level} Fall Risk
                </Badge>
              )}
              {patient.demographics?.preferredLanguage && (
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] uppercase font-bold px-2 py-0.5 border">
                  Lang: {patient.demographics.preferredLanguage}
                </Badge>
              )}
              {patient.safetyAlerts?.isolationProtocols && patient.safetyAlerts.isolationProtocols.length > 0 && (
                <Badge className="bg-purple-50 text-purple-700 border-purple-200 text-[10px] uppercase font-bold px-2 py-0.5 border flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  {patient.safetyAlerts.isolationProtocols.join(", ")}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end justify-between gap-3 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">Missing Docs</span>
            {patient.missingDocuments && patient.missingDocuments.length > 0 ? (
              <Badge variant="error" className="text-xs px-3 py-1 bg-rose-100 text-rose-700 border-rose-100 font-semibold">
                {patient.missingDocuments.length} Missing
              </Badge>
            ) : (
              <Badge variant="success" className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 border-emerald-100 font-semibold">
                Complete
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 mt-1 w-full sm:w-auto">
            {(!patient.missingDocuments || patient.missingDocuments.length === 0) && (
              <button
                onClick={() => setModalState("handover")}
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-[0_6px_32px_rgba(79,70,229,0.2)] hover:shadow-[0_6px_32px_rgba(79,70,229,0.3)] col-span-2 sm:col-span-1">
                <UserCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">Handover to Clinical</span>
              </button>
            )}
            <button
              onClick={() => setModalState("schedule")}
              className="inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-emerald-600 active:scale-95 transition-all text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="truncate">Schedule Assessment</span>
            </button>
            <button
              onClick={() => setModalState("requestDocs")}
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200/90 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              <ShieldAlert className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="truncate">Request Docs</span>
            </button>
            <button
              onClick={() => setModalState("message")}
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200/90 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] col-span-1">
              <MessageSquare className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="truncate">Message Family</span>
            </button>
            <button
              onClick={() => setModalState("edit")}
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200/90 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] col-span-1" title="Edit Profile">
              <Edit3 className="w-4 h-4 shrink-0 text-slate-600" />
              <span className="sm:hidden text-xs">Edit</span>
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState === "schedule"}
        onClose={() => setModalState("none")}
        title="Schedule Assessment"
        description={`Schedule an intake assessment for ${patient.name}`}
        footer={
          <>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200/90 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium bg-brand-teal text-white rounded-xl hover:bg-emerald-600 transition-colors">Confirm Schedule</button>
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
        isOpen={modalState === "requestDocs"}
        onClose={() => setModalState("none")}
        title="Request Missing Documents"
        description="Send a request for missing intake documents."
        footer={
          <>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200/90 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium bg-brand-teal text-white rounded-xl hover:bg-emerald-600 transition-colors">Send Request</button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Document Types</label>
            <div className="flex flex-col gap-2 mt-2">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="text-brand-teal" /> Insurance Card</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="text-brand-teal" /> Primary Care Orders</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="text-brand-teal" /> Consent Form</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" rows={3} placeholder="Please provide the following..."></textarea>
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
            <button onClick={() => setModalState("none")} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200/90 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
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

      <Modal
        isOpen={modalState === "handover"}
        onClose={() => !isSyncing && setModalState("none")}
        title="Clinical Handover & Sync"
        description={`Hand over ${patient.name} to a Clinical Supervisor or RN. This will sync the patient's intake data to the clinical management system.`}
        footer={
          <>
            <button onClick={() => setModalState("none")} disabled={isSyncing} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200/90 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-50">Cancel</button>
            <button onClick={handleHandover} disabled={isSyncing} className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-sm">
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  Confirm Handover
                </>
              )}
            </button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assign To</label>
            <select disabled={isSyncing} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white disabled:opacity-50">
              <option>Select Clinical Supervisor or RN...</option>
              <option>Sarah Jenkins (RN)</option>
              <option>Michael Chang (Clinical Supervisor)</option>
              <option>Unassigned (Queue)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Handover Notes</label>
            <textarea disabled={isSyncing} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-50" rows={4} placeholder="Add any clinical notes, priority level, or specific instructions..."></textarea>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div className="text-sm text-indigo-800">
              <span className="font-semibold block mb-0.5">System Sync</span>
              This action will securely transmit the completed intake packet (demographics, initial assessment, insurance) to the main clinical record system.
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
