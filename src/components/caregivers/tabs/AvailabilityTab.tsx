"use client";

import React from "react";
import { Caregiver } from "@/lib/caregivers/mockData";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/components/ui/Card";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = ["Morning (6am-2pm)", "Afternoon (2pm-10pm)", "Night (10pm-6am)"];

export function AvailabilityTab({ caregiver }: { caregiver: Caregiver }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Weekly Availability Grid</h3>
            <button className="text-sm font-medium text-brand-teal hover:text-emerald-700 bg-brand-teal/10 px-3 py-1.5 rounded-lg transition-colors">
              Edit Availability
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-3 text-left font-medium text-slate-500 w-1/4">Shift</th>
                  {DAYS.map(day => (
                    <th key={day} className="p-3 text-center font-medium text-slate-800">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIMES.map((time, tIdx) => (
                  <tr key={time} className="border-t border-slate-100">
                    <td className="p-3 text-slate-600 font-medium whitespace-nowrap">{time}</td>
                    {DAYS.map((day, dIdx) => {
                      // Mocking some availability: Weekdays morning/afternoon are mostly available
                      const isAvailable = (tIdx < 2 && dIdx < 5) || (tIdx === 2 && dIdx === 5);
                      return (
                        <td key={`${time}-${day}`} className="p-1">
                          <div className={cn(
                            "w-full h-12 rounded-lg flex items-center justify-center transition-colors cursor-pointer border border-transparent",
                            isAvailable ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:border-emerald-200" : "bg-slate-50 hover:bg-slate-100 text-slate-300 hover:border-slate-200"
                          )}>
                            {isAvailable ? <CheckIcon /> : <DashIcon />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-100 border border-emerald-200 rounded-sm" /> <span className="text-slate-600">Available</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-100 border border-slate-200 rounded-sm" /> <span className="text-slate-600">Unavailable</span></div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Preferred Zones & Regions</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="brand" className="px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5"><MapPin className="w-4 h-4" /> North District</Badge>
            <Badge variant="brand" className="px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Downtown</Badge>
            <Badge variant="neutral" className="px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 border-dashed bg-transparent text-slate-500">
              + Add Region
            </Badge>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Upcoming Shifts</h3>
            <button className="text-sm font-medium text-brand-teal">View All</button>
          </div>

          <div className="space-y-4">
            {caregiver.recentShifts.filter(s => s.status === "Upcoming").map(shift => (
              <div key={shift.id} className="p-4 border border-slate-100 rounded-xl hover:border-brand-teal/30 hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-slate-800 group-hover:text-brand-teal transition-colors">{shift.patientName}</div>
                  <Badge variant="brand" className="bg-blue-50 text-blue-600 border-blue-100">{shift.status}</Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 mb-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {shift.date}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {shift.startTime} - {shift.endTime}
                </div>
              </div>
            ))}
            {caregiver.recentShifts.filter(s => s.status === "Upcoming").length === 0 && (
              <div className="text-center py-6 text-slate-500 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No upcoming shifts scheduled.
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Time-Off Requests</h3>
          <div className="space-y-3">
            <div className="p-3 border border-slate-100 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-800">Aug 15 - Aug 20, 2026</div>
                <div className="text-xs text-slate-500">Vacation</div>
              </div>
              <Badge variant="warning">Pending</Badge>
            </div>
            <div className="p-3 border border-slate-100 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-800">Jun 05, 2026</div>
                <div className="text-xs text-slate-500">Personal Day</div>
              </div>
              <Badge variant="success">Approved</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function DashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
