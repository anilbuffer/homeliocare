"use client";

import React from "react";
import { Caregiver } from "@/lib/caregivers/mockData";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Phone, Mail, MapPin, Activity, CalendarCheck, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";

export function OverviewTab({ caregiver }: { caregiver: Caregiver }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact & Personal */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Contact & Personal</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-slate-700">Phone</div>
                  <div className="text-sm text-slate-600">{caregiver.phone}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-slate-700">Email</div>
                  <div className="text-sm text-slate-600">{caregiver.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-slate-700">Address</div>
                  <div className="text-sm text-slate-600">{caregiver.address}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="text-sm font-medium text-slate-700 mb-1">Emergency Contact</div>
                <div className="text-sm text-slate-600">{caregiver.emergencyContact}</div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="text-sm font-medium text-slate-700 mb-2">Languages Spoken</div>
                <div className="flex flex-wrap gap-2">
                  {caregiver.languages.map((lang, idx) => (
                    <Badge key={idx} variant="neutral">{lang}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Employment */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Employment Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Hire Date</span>
                <span className="text-sm font-medium text-slate-800">{caregiver.hireDate}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Employment Type</span>
                <Badge variant={caregiver.employmentType === "W2" ? "brand" : "neutral"}>
                  {caregiver.employmentType}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Pay Rate</span>
                <span className="text-sm font-medium text-slate-800">${caregiver.payRate.toFixed(2)}/hr</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Assigned Clients</span>
                <span className="text-sm font-medium text-slate-800">{caregiver.assignedClientsCount}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Skills */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Skills & Specializations</h3>
          <div className="flex flex-wrap gap-2.5">
            {caregiver.skills.map((skill, idx) => {
              // Color code some common skills
              const isMedical = skill.includes("IV") || skill.includes("Wound") || skill.includes("Vital");
              const isMemory = skill.includes("Dementia") || skill.includes("Alzheimer");
              return (
                <span key={idx} className={`px-3 py-1.5 rounded-xl text-sm font-medium border ${
                  isMedical ? "bg-rose-50 text-rose-700 border-rose-100" :
                  isMemory ? "bg-purple-50 text-purple-700 border-purple-100" :
                  "bg-slate-50 text-slate-700 border-slate-200"
                }`}>
                  {skill}
                </span>
              );
            })}
          </div>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-slate-100 pb-2">
              <div className="absolute w-3 h-3 bg-brand-teal rounded-full -left-[7px] top-1 ring-4 ring-white" />
              <div className="text-sm font-medium text-slate-800">Completed Shift</div>
              <div className="text-xs text-slate-500 mt-0.5">Today, 1:00 PM • Client: Robert Hayes</div>
            </div>
            <div className="relative pl-6 border-l-2 border-slate-100 pb-2">
              <div className="absolute w-3 h-3 bg-amber-400 rounded-full -left-[7px] top-1 ring-4 ring-white" />
              <div className="text-sm font-medium text-slate-800">Schedule Change Request</div>
              <div className="text-xs text-slate-500 mt-0.5">Yesterday, 9:30 AM • Requested swap for July 20</div>
            </div>
            <div className="relative pl-6 border-l-2 border-slate-100 pb-2">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1 ring-4 ring-white" />
              <div className="text-sm font-medium text-slate-800">Completed Training Module</div>
              <div className="text-xs text-slate-500 mt-0.5">July 12 • Advanced Dementia Care</div>
            </div>
            <div className="relative pl-6 pb-2">
              <div className="absolute w-3 h-3 bg-slate-300 rounded-full -left-[7px] top-1 ring-4 ring-white" />
              <div className="text-sm font-medium text-slate-800">Profile Updated</div>
              <div className="text-xs text-slate-500 mt-0.5">July 10 • Added new certification (CPR)</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Compliance Snapshot */}
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-lg font-semibold text-white/90 mb-4">Compliance Snapshot</h3>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-20 h-20 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke={caregiver.complianceScore === 100 ? "#10b981" : "#f59e0b"} 
                  strokeWidth="8" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 - (251.2 * caregiver.complianceScore) / 100}
                  strokeLinecap="round" 
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{caregiver.complianceScore}%</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-white/80">Overall Score</div>
              <div className="text-xs text-white/60 mt-1">
                {caregiver.complianceScore === 100 ? "Fully compliant and up to date." : "Action required for upcoming expirations."}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-white/90">Background Check</div>
                <div className="text-xs text-white/60">Cleared • Renew 2027</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-white/90">TB Screening</div>
                <div className="text-xs text-white/60">Negative • Renew Dec 2026</div>
              </div>
            </div>
            {caregiver.complianceScore < 100 && (
              <div className="flex items-center gap-3 bg-amber-500/20 border border-amber-500/30 p-3 rounded-xl">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-amber-100">CPR Certification</div>
                  <div className="text-xs text-amber-200">Expiring in 14 days</div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
