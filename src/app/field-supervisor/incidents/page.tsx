"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { toast } from "sonner";
import { Save, ShieldAlert, CheckCircle } from "lucide-react";
import { RecentIncidentsFiled } from "@/components/supervisor/RecentIncidentsFiled";
import { useRouter } from "next/navigation";

export default function IncidentsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    client: "",
    caregiver: "",
    description: "",
    actionTaken: "",
    notifiedRN: false,
    notifiedFamily: false,
    notifiedPhysician: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      toast.success("Incident Report submitted successfully");

      // Reset after a delay
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          date: "", time: "", location: "", client: "", caregiver: "",
          description: "", actionTaken: "", notifiedRN: false, notifiedFamily: false, notifiedPhysician: false
        });
        router.push("/field-supervisor");
      }, 3000);
    }, 1000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Header Banner */}
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight">Report an Incident</h1>
          <p className="text-xs text-slate-500 font-normal mt-1">Document a safety concern, hazard, or critical event. This will alert QA and Clinical immediately.</p>
        </div>
      </div>
      {showSuccess ? (
        <Card className="flex flex-col bg-emerald-50/50 backdrop-blur-xl rounded-2xl border border-emerald-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Report Submitted</h2>
              <p className="text-slate-600 mt-1">Your incident report has been securely routed to the Clinical Supervisor and QA team.</p>
            </div>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
            <CardHeader
              title={<span className="text-base text-slate-800 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-accent-red" /> Intake Form</span>}
              className="border-b border-slate-100 bg-slate-50/50 px-4 py-3 mb-0"
            />
            <div className="p-4 pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Date of Incident</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Time of Incident</label>
                  <input type="time" required value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Location (e.g., Bedroom, Hallway)</label>
                  <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Client Involved</label>
                  <input type="text" required value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} className="w-full text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Caregiver Involved</label>
                  <input type="text" required value={formData.caregiver} onChange={(e) => setFormData({ ...formData, caregiver: e.target.value })} className="w-full text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Factual Description of the Event</label>
                <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent resize-none" placeholder="Describe exactly what happened, objectively..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Immediate Action Taken</label>
                <textarea required rows={3} value={formData.actionTaken} onChange={(e) => setFormData({ ...formData, actionTaken: e.target.value })} className="w-full text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent resize-none" placeholder="What did you do immediately to ensure safety?" />
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100">
                <label className="text-sm font-semibold text-slate-700">Notification Chain</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 px-3 py-2 bg-white border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="checkbox" checked={formData.notifiedRN} onChange={(e) => setFormData({ ...formData, notifiedRN: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal accent-brand-teal" />
                    <span className="text-xs font-semibold text-slate-700">Clinical Supervisor (RN) notified</span>
                  </label>
                  <label className="flex items-center gap-3 px-3 py-2 bg-white border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="checkbox" checked={formData.notifiedFamily} onChange={(e) => setFormData({ ...formData, notifiedFamily: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal accent-brand-teal" />
                    <span className="text-xs font-semibold text-slate-700">Client's Family / Emergency Contact notified</span>
                  </label>
                  <label className="flex items-center gap-3 px-3 py-2 bg-white border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="checkbox" checked={formData.notifiedPhysician} onChange={(e) => setFormData({ ...formData, notifiedPhysician: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal accent-brand-teal" />
                    <span className="text-xs font-semibold text-slate-700">Physician / EMS notified (if applicable)</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={() => router.back()} className="px-4 py-2 text-sm rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm rounded-xl bg-accent-red text-white font-semibold shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:bg-accent-red/90 transition-colors flex items-center gap-2">
              {isSubmitting ? "Submitting..." : <><Save className="w-4 h-4" /> Submit Report</>}
            </button>
          </div>
        </form>
      )}

      {/* Reusing the RecentIncidentsFiled component to show only those filed by this supervisor */}
      <div className="pt-4 border-t border-slate-200">
        <RecentIncidentsFiled />
      </div>
    </div>
  );
}
