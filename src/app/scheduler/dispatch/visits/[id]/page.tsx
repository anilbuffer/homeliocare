"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { mockVisits } from "@/lib/mockTrackerData";
import {
  ArrowLeft, User, MapPin, Clock, Calendar, CheckCircle2,
  AlertCircle, Edit2, XCircle, Phone, Mail, Navigation, FileText, Check
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function VisitDetailsPage() {
  const params = useParams();
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Unassigned": return "bg-red-500/10 text-red-700 border-red-500/20";
      case "Completed": return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
      case "In Progress": return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      case "Assigned": return "bg-brand-teal/10 text-teal-800 border-brand-teal/20";
      default: return "bg-slate-500/10 text-slate-700 border-slate-500/20";
    }
  };

  const timelineSteps = [
    { label: "Scheduled", completed: true, time: "8:00 AM" },
    { label: "Dispatched", completed: visit.status !== "Unassigned", time: visit.status !== "Unassigned" ? "8:30 AM" : null },
    { label: "In Progress", completed: visit.status === "In Progress" || visit.status === "Completed", time: visit.status === "Completed" ? "9:15 AM" : null },
    { label: "Completed", completed: visit.status === "Completed", time: visit.status === "Completed" ? "1:00 PM" : null },
  ];

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <Link
            href="/scheduler/dispatch/visits"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-teal transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Visits
          </Link>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
              Visit Details
            </h1>
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
              {visit.id}
            </span>
            <span className={clsx("px-3 py-1 rounded-full text-xs font-semibold border", getStatusColor(visit.status))}>
              {visit.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] active:scale-95 transition-all">
            <XCircle className="w-4 h-4 text-red-500" />
            Cancel Visit
          </button>
          <Link
            href={`/scheduler/dispatch/visits/${id}/edit`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-teal hover:bg-teal-600 text-white font-semibold text-sm shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-brand-teal/25 active:scale-95 transition-all"
          >
            <Edit2 className="w-4 h-4" />
            Edit Visit
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-4">

          {/* Status Timeline Card */}
          <Card className="p-4 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-xl">
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Execution Timeline</h2>
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 rounded-full hidden sm:block"></div>
              <div className="absolute top-1/2 left-0 h-0.5 bg-brand-teal -translate-y-1/2 rounded-full hidden sm:block transition-all duration-1000"
                style={{ width: `${(timelineSteps.filter(s => s.completed).length - 1) * 33.33}%` }}>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 relative z-10">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className="flex flex-row sm:flex-col items-center gap-4 sm:gap-2 text-center group">
                    <div className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors shrink-0",
                      step.completed ? "bg-brand-teal border-white text-white shadow-md" : "bg-slate-100 border-white text-slate-300"
                    )}>
                      {step.completed ? <Check className="w-5 h-5" /> : <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />}
                    </div>
                    <div className="text-left sm:text-center">
                      <p className={clsx("text-sm font-bold", step.completed ? "text-slate-900" : "text-slate-400")}>
                        {step.label}
                      </p>
                      {step.time && (
                        <p className="text-xs text-slate-500 font-medium">{step.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Patient Info Card */}
            <Card className="p-4 bg-gradient-to-br from-indigo-50/50 to-white backdrop-blur-xl border border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                  {visit.patientName.charAt(0)}
                </div>
                <Link href="#" className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              </div>
              <h3 className="text-base font-semibold text-slate-900">{visit.patientName}</h3>
              <p className="text-xs text-slate-500 mb-3 font-medium">Primary Patient</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  (555) 123-4567
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  patient@example.com
                </div>
              </div>
            </Card>

            {/* Caregiver Info Card */}
            <Card className="p-4 bg-gradient-to-br from-emerald-50/50 to-white backdrop-blur-xl border border-emerald-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-semibold text-xl">
                  {visit.caregiverId ? visit.caregiverId.replace('c', '') : '?'}
                </div>
                {visit.caregiverId && (
                  <Link href="#" className="p-2 text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                    <User className="w-5 h-5" />
                  </Link>
                )}
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                {visit.caregiverId ? `Caregiver (${visit.caregiverId})` : 'Unassigned'}
              </h3>
              <p className="text-xs text-slate-500 mb-4 font-medium">Assigned Resource</p>

              {visit.caregiverId ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    (555) 987-6543
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    staff@homeliocare.com
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Requires assignment before dispatch.
                </div>
              )}
            </Card>
          </div>

          <Card className="p-4 bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-amber-500" />
              Service Notes
            </h2>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-700 leading-relaxed min-h-[100px]">
              Routine checkup and vitals monitoring requested. Patient prefers early morning if possible. Gate code for the community is #1234. Please ensure all medications are logged in the chart.
            </div>
          </Card>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-4">
          <Card className="p-4 bg-slate-900 border border-slate-800 shadow-xl shadow-slate-900/20 rounded-2xl text-white">
            <h3 className="font-semibold text-base mb-4 text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-teal" />
              Schedule Details
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 font-normal mb-1">Date</p>
                <div className="text-sm flex items-center gap-2 text-slate-100">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  Today
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-normal mb-1">Time Window</p>
                <div className="text-sm flex items-center gap-2 text-slate-100">
                  <Clock className="w-4 h-4 text-slate-500" />
                  {visit.time}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-400 font-normal mb-1">Duration Estimate</p>
                <div className="text-sm text-slate-100 font-medium">4 Hours</div>
              </div>
            </div>
          </Card>

          <Card className="p-0 bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                Location
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                {visit.address || "123 Main St, San Francisco, CA"}
              </p>
            </div>
            <div className="h-48 bg-slate-100 relative group">
              <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/1310/3166.png')] bg-cover bg-center opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-30"></div>
                  <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-rose-500/40 relative z-10 border-2 border-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <a href="#" className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm hover:bg-white transition-colors flex items-center gap-1.5">
                <Navigation className="w-3 h-3 text-brand-teal" />
                Get Directions
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
