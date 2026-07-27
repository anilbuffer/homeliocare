"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, Plus, Search, Calendar, ChevronRight } from "lucide-react";
import { mockPatients } from "@/lib/patients/mockData";

export default function IntakeSchedulingPage() {
  const router = useRouter();
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const handleSetDate = (daysToAdd: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysToAdd);
    setDate(d.toLocaleDateString());
  };

  return (
    <div className="max-w-full mx-auto space-y-6">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Assessment & Initial Visit Scheduling
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Book initial RN assessments and assign the very first care visit.
          </p>
        </div>

        <button
          onClick={() => router.push('/intake/patients')}
          className="flex items-center gap-2 bg-brand-teal hover:bg-brand-teal/90 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-sm shadow-brand-teal/20 transition-all active:scale-95 cursor-pointer">
          <Plus className="w-4 h-4" />
          Book Assessment
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client or assessor..."
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {date}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => handleSetDate(0)}
              className="px-3 py-1.5 bg-brand-teal text-white text-xs font-semibold rounded-full shadow-[0_6px_32px_rgba(0,0,0,0.04)]">Today</button>
            <button
              onClick={() => handleSetDate(1)}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-full hover:bg-slate-50">Tomorrow</button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-brand-teal" />
            Upcoming Initial Assessments
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {Object.values(mockPatients).map((patient, i) => (
            <div
              key={patient.id}
              onClick={() => router.push(`/intake/patients/${patient.id}?tab=care-plan`)}
              className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 font-bold rounded-xl flex flex-col items-center justify-center border border-blue-100">
                  <span className="text-[10px] uppercase leading-none">Oct</span>
                  <span className="text-lg leading-tight">2{i + 1}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-teal transition-colors">{patient.name} Initial Assessment</h4>
                  <p className="text-xs text-slate-500 mt-1">Assigned to: {patient.careTeam.caseManager.name || "RN Assessor"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200">
                  Confirmed
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
