"use client";

import React, { useState } from "react";
import { mockVisits, type Visit } from "@/lib/mockTrackerData";
import { Card } from "@/components/ui/Card";
import { format, parseISO } from "date-fns";
import clsx from "clsx";
import { Plus, MapPin, User, Repeat, Eye, Edit2, ArrowUpDown, Clock } from "lucide-react";
import Link from "next/link";

export default function DispatchVisitsPage() {
  const [visits, setVisits] = useState<Visit[]>(mockVisits);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Unassigned": return "bg-red-100 text-red-700";
      case "Completed": return "bg-emerald-100 text-emerald-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Assigned": return "bg-teal-100 text-teal-900";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3 lg:mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Repeat className="w-5 h-5 text-brand-teal" />
            Dispatch & Visits
          </h1>
          <p className="text-xs text-slate-500">Track and manage individual execution instances of shifts.</p>
        </div>
        <Link
          href="/scheduler/dispatch/visits/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-brand-teal hover:bg-teal-600 text-white font-semibold text-sm shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-brand-teal/25 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Manual Visit</span>
        </Link>
      </div>

      <Card noPadding className="bg-white rounded-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3"><div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">Time <ArrowUpDown className="w-3 h-3" /></div></th>
                <th className="px-4 py-3"><div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">Patient <ArrowUpDown className="w-3 h-3" /></div></th>
                <th className="px-4 py-3"><div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">Caregiver <ArrowUpDown className="w-3 h-3" /></div></th>
                <th className="px-4 py-3"><div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">Status <ArrowUpDown className="w-3 h-3" /></div></th>
                <th className="px-4 py-3"><div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">Location <ArrowUpDown className="w-3 h-3" /></div></th>
                <th className="px-4 py-3"><div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">Actions</div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {visits.map((visit) => (
                <tr
                  key={visit.id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-teal transition-colors" />
                      {visit.time}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                      {visit.patientName.charAt(0)}
                    </div>
                    {visit.patientName}
                  </td>
                  <td className="px-4 py-3">
                    {visit.caregiverId ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-[10px]">
                          {visit.caregiverId.replace('c', '')}
                        </div>
                        <span className="font-medium text-slate-800">{visit.caregiverId}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic flex items-center gap-1">
                        <User className="w-3 h-3" /> Unassigned
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={clsx("px-2.5 py-1 rounded-full text-[11px] font-bold", getStatusColor(visit.status))}>
                      {visit.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      ({visit.location.x}, {visit.location.y})
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/scheduler/dispatch/visits/${visit.id}`}
                        className="inline-flex items-center gap-1 text-[12px] font-semibold bg-brand-teal/10 text-brand-teal hover:text-brand-teal bg-brand-teal-10 hover:bg-brand-teal-20 px-3 py-2 rounded-lg transition-colors"
                      >
                        <Eye className="w-3 h-3" /> View Details
                      </Link>
                      <Link
                        href={`/scheduler/dispatch/visits/${visit.id}/edit`}
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-slate-600 bg-slate-50 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {visits.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No visits found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
