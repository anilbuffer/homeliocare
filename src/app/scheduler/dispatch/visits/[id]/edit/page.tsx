"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { mockVisits } from "@/lib/mockTrackerData";
import {
  ArrowLeft, User, MapPin, Clock, Calendar, CheckCircle2,
  ChevronRight, Save, Navigation, FileText, AlertCircle, X
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function EditVisitPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const visit = mockVisits.find((v) => v.id === id) || {
    id: id || "v-1234",
    patientName: "John Doe",
    time: "9:00 AM - 1:00 PM",
    status: "Assigned",
    location: { x: 50, y: 50 },
    caregiverId: "c1",
    address: "123 Main St, San Francisco, CA"
  };

  const [time, setTime] = useState(visit.time);
  const [caregiverId, setCaregiverId] = useState(visit.caregiverId || "");
  const [notes, setNotes] = useState("Routine checkup and vitals monitoring requested.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      router.push(`/scheduler/dispatch/visits/${id}`);
    }, 1000);
  };

  return (
    <div className="w-full animate-in fade-in duration-500 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link
            href={`/scheduler/dispatch/visits/${id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-teal transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Visit Details
          </Link>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
              Edit Visit
            </h1>
            <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
              {visit.id}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Patient info is read-only in Edit view usually, to avoid mistakes */}
          <Card className="p-4 bg-slate-50 border border-slate-200/60 shadow-none rounded-2xl">
            <h2 className="text-sm font-bold text-slate-500 flex items-center gap-2 mb-4 uppercase tracking-wider">
              <User className="w-4 h-4" />
              Patient Information (Read-Only)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Patient Name</p>
                <p className="text-sm font-medium text-slate-900">{visit.patientName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Service Address</p>
                <p className="text-sm font-medium text-slate-900">{visit.address}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-xl border border-brand-teal/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-teal"></div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-brand-teal" />
              Schedule & Assignment
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Time Window</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all bg-slate-50/50 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Reassign Caregiver</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <select
                    value={caregiverId}
                    onChange={(e) => setCaregiverId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all bg-slate-50/50 focus:bg-white appearance-none font-medium"
                  >
                    <option value="">-- Unassigned --</option>
                    <option value="c1">Elena Rostova (c1)</option>
                    <option value="c2">David Miller (c2)</option>
                    <option value="c3">Maria Alvarez (c3)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                  </div>
                </div>
                {visit.caregiverId !== caregiverId && (
                  <p className="text-xs text-amber-600 font-medium flex items-center gap-1 mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Caregiver reassignment will trigger a notification.
                  </p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-amber-500" />
              Visit Notes & Instructions
            </h2>
            <div className="space-y-1.5">
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all bg-slate-50/50 focus:bg-white resize-none"
              />
            </div>
          </Card>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-4">
          <Card className="p-4 bg-slate-900 border border-slate-800 shadow-xl shadow-slate-900/20 rounded-2xl text-white sticky top-6">
            <h3 className="font-semibold text-lg mb-4 text-white">Save Changes</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Review your changes carefully. Updating this visit may affect the caregiver's route and schedule for the day.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !time}
                className="w-full py-3.5 rounded-xl bg-brand-teal hover:bg-teal-600 text-white font-semibold text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-brand-teal/20 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update Visit
                  </>
                )}
              </button>

              <button
                onClick={() => router.push(`/scheduler/dispatch/visits/${id}`)}
                className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Discard Changes
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
