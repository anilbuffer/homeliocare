"use client";

import React, { useState } from "react";
import { CaregiverLayout } from "@/components/caregiver/CaregiverLayout";
import { INITIAL_CAREGIVER_PROFILE, CaregiverProfileData } from "@/lib/caregiver/caregiverPortalData";
import {
  User,
  ShieldCheck,
  Award,
  DollarSign,
  FileCheck,
  Settings,
  Mail,
  Phone,
  MapPin,
  Clock,
  Navigation,
  Download,
  CheckCircle2,
  AlertTriangle,
  Star,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";

export default function CaregiverProfilePage() {
  const profile: CaregiverProfileData = INITIAL_CAREGIVER_PROFILE;
  const { logout } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"overview" | "performance" | "payroll" | "compliance" | "settings">("overview");

  // Settings State
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [language, setLanguage] = useState("English");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <CaregiverLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Caregiver Identity Banner */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar
              src={profile.avatarUrl}
              name={profile.name}
              size="xl"
              className="w-20 h-20 rounded-2xl border-2 border-white shadow-md ring-2 ring-brand-teal/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Active W2 Employee
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {profile.title} • {profile.employeeId} • {profile.branch}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-brand-teal" /> {profile.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-blue-500" /> {profile.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> {profile.address}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-slate-200 shrink-0">
            <div className="text-center px-3 border-r border-gray-200">
              <span className="text-xs text-gray-400 font-medium block">EVV Score</span>
              <span className="text-base font-bold text-brand-teal">{profile.complianceScore}%</span>
            </div>
            <div className="text-center px-3 border-r border-gray-200">
              <span className="text-xs text-gray-400 font-medium block">Rating</span>
              <span className="text-base font-bold text-amber-500 flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 inline" /> {profile.clientRating}
              </span>
            </div>
            <div className="text-center px-3">
              <span className="text-xs text-gray-400 font-medium block">Pay Rate</span>
              <span className="text-base font-bold text-gray-900">${profile.payRate.toFixed(2)}/hr</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {[
            { id: "overview", label: "Overview", icon: User },
            { id: "performance", label: "Performance", icon: Star },
            { id: "payroll", label: "Payroll & Hours", icon: DollarSign },
            { id: "compliance", label: "Compliance & Docs", icon: FileCheck },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isActive
                  ? "bg-brand-teal text-white shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assigned Clients */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4 text-brand-teal" /> Assigned Clients Caseload ({profile.assignedClients.length})
              </h3>

              <div className="space-y-3">
                {profile.assignedClients.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-xl border border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <Avatar src={c.image} name={c.name} size="md" className="rounded-xl" />
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{c.name}</h4>
                        <span className="text-xs text-gray-500 font-mono">{c.mrn}</span>
                      </div>
                    </div>
                    <span className="text-xs bg-white text-gray-700 font-medium px-2.5 py-1 rounded-full border border-slate-200">
                      Primary CNA
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Summary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-teal" /> Certifications & Licensure
              </h3>

              <div className="space-y-3">
                {profile.certifications.map((cert) => (
                  <div key={cert.id} className="p-3.5 rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{cert.name}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Issuer: {cert.issuer} • Exp: {cert.expiryDate}</p>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${cert.status === "Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-900"
                        }`}
                    >
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PERFORMANCE */}
        {activeTab === "performance" && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
            <h3 className="text-base font-bold text-gray-900">Caregiver Performance Analytics</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-xs font-semibold text-emerald-800 block">On-Time Clock-in Rate</span>
                <span className="text-2xl font-bold text-emerald-950 mt-1 block">{profile.onTimeClockInRate}%</span>
                <span className="text-[10px] text-emerald-700 font-medium">Top 5% across branch</span>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                <span className="text-xs font-semibold text-blue-800 block">Visits Completed</span>
                <span className="text-2xl font-bold text-blue-950 mt-1 block">{profile.completedVisitsTotal}</span>
                <span className="text-[10px] text-blue-700 font-medium">Zero missed shifts</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <span className="text-xs font-semibold text-amber-800 block">Client Feedback Rating</span>
                <span className="text-2xl font-bold text-amber-950 mt-1 block">{profile.clientRating} / 5.0</span>
                <span className="text-[10px] text-amber-700 font-medium">100% 5-star reviews</span>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center">
                <span className="text-xs font-semibold text-purple-800 block">EVV Compliance Score</span>
                <span className="text-2xl font-bold text-purple-950 mt-1 block">{profile.complianceScore}%</span>
                <span className="text-[10px] text-purple-700 font-medium">State Matrix Verified</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PAYROLL */}
        {activeTab === "payroll" && (
          <div className="bg-white lg:p-6 p-3 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Payroll Hours & Pay Stubs</h3>
                <p className="text-xs text-gray-500 mt-0.5">Self-view hours breakdown, OT rate, mileage reimbursement, and pay stubs.</p>
              </div>

              <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
                Current Period: 76.5 Reg / 4.0 OT
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
                  <tr>
                    <th className="p-3">Pay Period</th>
                    <th className="p-3">Pay Date</th>
                    <th className="p-3">Reg Hours</th>
                    <th className="p-3">OT Hours</th>
                    <th className="p-3">Gross Pay</th>
                    <th className="p-3">Mileage Amt</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {profile.paystubs.map((stub) => (
                    <tr key={stub.id} className="hover:bg-gray-50/60 font-medium">
                      <td className="p-3 font-bold text-gray-900">{stub.payPeriod}</td>
                      <td className="p-3 text-gray-600">{stub.payDate}</td>
                      <td className="p-3 text-gray-800">{stub.regularHours} hrs</td>
                      <td className="p-3 text-amber-700 font-bold">{stub.otHours} hrs</td>
                      <td className="p-3 font-bold text-brand-teal">${stub.grossPay.toFixed(2)}</td>
                      <td className="p-3 text-gray-700">${stub.mileageAmount.toFixed(2)}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          {stub.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => alert(`Downloading official pay stub PDF for ${stub.payPeriod}...`)}
                          className="text-xs text-brand-teal font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: COMPLIANCE */}
        {activeTab === "compliance" && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
            <h3 className="text-base font-bold text-gray-900">Background Checks & Document Clearance</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-gray-900">State & Federal FBI Background Check</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">CLEARED</span>
                </div>
                <p className="text-xs text-gray-500">Screened on Mar 15, 2024. Next renewal Mar 2027.</p>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-950">Annual TB Screening Clear Clearance</span>
                  <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">ACTION REQUIRED</span>
                </div>
                <p className="text-xs text-amber-800">Expiring in 5 days. Please upload updated TB result document.</p>
                <button
                  onClick={() => alert("TB Clearance document uploaded successfully! Submitted for HR compliance audit.")}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Upload Updated Clearance PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
            <h3 className="text-base font-bold text-gray-900">Caregiver Account Settings</h3>

            <div className="space-y-4 max-w-lg">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-semibold text-gray-800">SMS Visit Reminders & Shift Alerts</span>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="w-4 h-4 text-brand-teal rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-semibold text-gray-800">Email Notifications for LMS & Pay Stubs</span>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-brand-teal rounded"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <label className="font-semibold text-gray-800 block">Preferred Interface Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg font-medium bg-white"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish (Español)</option>
                  <option value="French">French (Français)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Caregiver Portal</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CaregiverLayout>
  );
}
