"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, User, MapPin, Clock, Calendar, CheckCircle2, ChevronRight, Save, Navigation, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function CreateVisitPage() {
  const [patientName, setPatientName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [caregiverId, setCaregiverId] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      window.location.href = "/scheduler/dispatch/visits";
    }, 1000);
  };

  return (
    <div className="w-full animate-in fade-in duration-500 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link 
            href="/scheduler/dispatch/visits"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-teal transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Visits
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Create New Visit
          </h1>
          <p className="text-sm text-slate-500 mt-1">Schedule a new dispatch instance with advanced routing & assignment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-indigo-500" />
              Patient Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">MRN / ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. MRN-8472"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-emerald-500" />
              Schedule & Assignment
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50/50 focus:bg-white"
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
                    placeholder="e.g. 9:00 AM - 1:00 PM"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Assign Caregiver</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <select
                    value={caregiverId}
                    onChange={(e) => setCaregiverId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50/50 focus:bg-white appearance-none"
                  >
                    <option value="">-- Auto-assign or select manually --</option>
                    <option value="c1">Elena Rostova (c1)</option>
                    <option value="c2">David Miller (c2)</option>
                    <option value="c3">Maria Alvarez (c3)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-amber-500" />
              Visit Notes & Instructions
            </h2>
            <div className="space-y-1.5">
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add special instructions, gate codes, or medical context..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all bg-slate-50/50 focus:bg-white resize-none"
              />
            </div>
          </Card>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <Card className="p-6 bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden relative">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-rose-500" />
              Location
            </h2>
            
            <div className="space-y-4 relative z-10">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Service Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 123 Main St, San Francisco"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all bg-white"
                />
              </div>
              
              <div className="h-48 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/1310/3166.png')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-brand-teal text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-teal/30">
                    <Navigation className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800 font-medium leading-relaxed">
                  Address will be geocoded automatically. You can adjust the pin on the map if needed.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-slate-900 border border-slate-800 shadow-xl shadow-slate-900/20 rounded-2xl text-white">
            <h3 className="font-semibold text-lg mb-4 text-white">Summary</h3>
            <ul className="space-y-3 mb-6 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Patient profile linked</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Schedule conflict check</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className={clsx("w-4 h-4 shrink-0 mt-0.5", caregiverId ? "text-emerald-400" : "text-slate-600")} />
                <span>Caregiver assigned</span>
              </li>
            </ul>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !patientName || !time || !address}
              className="w-full py-3.5 rounded-xl bg-brand-teal hover:bg-teal-600 text-white font-semibold text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-brand-teal/20 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Confirm & Create
                </>
              )}
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
