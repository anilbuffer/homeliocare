"use client";

import React, { useState } from "react";
import {
  Bell,
  Lock,
  CheckCircle2,
  Save,
  Key,
  Smartphone,
  Eye,
  EyeOff,
  Laptop,
  UserCheck,
  Settings,
  Filter,
  CalendarCheck,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function IntakeSettingsPage() {
  const { currentUser } = useAuth();

  // Active Category Tab
  const [activeTab, setActiveTab] = useState<"pipeline" | "alerts" | "assessments" | "profile" | "security">("pipeline");

  // Success Toast state
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Pipeline & Triage Form State
  const [autoTriage, setAutoTriage] = useState("Enabled");
  const [defaultAssignee, setDefaultAssignee] = useState("Round Robin");
  const [pipelineUrgency, setPipelineUrgency] = useState("24");

  // Alerts & Notifications Form State
  const [newReferralSms, setNewReferralSms] = useState(true);
  const [missingDocAlert, setMissingDocAlert] = useState(true);
  const [assessmentReminderHours, setAssessmentReminderHours] = useState("24");

  // Assessments Form State
  const [defaultAssessmentDuration, setDefaultAssessmentDuration] = useState("60");
  const [autoAssignRN, setAutoAssignRN] = useState("Yes");

  // Profile Form State
  const [name, setName] = useState("Sarah Jenkins");
  const [title, setTitle] = useState("Lead Intake Coordinator");
  const [email, setEmail] = useState("sarah.jenkins@homeliocare.com");
  const [phone, setPhone] = useState("(555) 321-9876");

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sessions State
  const [sessions, setSessions] = useState([
    { id: "s-1", device: "Chrome / Windows 11 (Intake Station)", location: "New York HQ", lastActive: "Active Now", isCurrent: true },
    { id: "s-2", device: "Homelio Mobile (iPhone 14)", location: "Brooklyn Branch", lastActive: "2 hours ago", isCurrent: false },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const handleRevokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6 animate-in fade-in duration-300">
      {/* Top Header Banner */}
      <div className="bg-white/80 backdrop-blur-xl p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-teal text-xs font-semibold uppercase">
            <Settings className="w-4 h-4" /> Intake Coordinator Portal Settings
          </div>
          <h1 className="text-xl font-bold text-gray-900 mt-0.5">Workflow & Account Preferences</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your referral pipelines, triage workflows, assessment defaults, and account security.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
            <span>Settings updated successfully!</span>
          </div>
        )}
      </div>

      {/* Desktop 2-Column Symmetric Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Left Vertical Tab Navigation (1/4 width) */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-1 self-start">
          {[
            { id: "pipeline", label: "Pipeline & Triage", icon: Filter, desc: "Auto-assign & referral routing" },
            { id: "alerts", label: "Notifications & Alerts", icon: Bell, desc: "New referrals & missing docs" },
            { id: "assessments", label: "Clinical Assessments", icon: CalendarCheck, desc: "Default durations & RN matching" },
            { id: "profile", label: "Coordinator Profile", icon: UserCheck, desc: "Personal info & contact details" },
            { id: "security", label: "Security & Passwords", icon: Lock, desc: "Password, 2FA & active sessions" },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${isActive
                  ? "bg-brand-teal text-white shadow-xs font-bold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium"
                  }`}
              >
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${isActive ? "text-white" : "text-brand-teal"}`} />
                <div>
                  <div className="text-xs font-bold leading-tight">{t.label}</div>
                  <div className={`text-[11px] mt-0.5 ${isActive ? "text-teal-100" : "text-gray-400 font-normal"}`}>
                    {t.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Main Form Container (3/4 width) */}
        <div className="lg:col-span-3">
          {/* TAB 1: PIPELINE & TRIAGE RULES */}
          {activeTab === "pipeline" && (
            <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Pipeline & Triage Preferences</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Controls how new incoming referrals are routed and prioritized.</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Automated Referral Triage</span>
                      <span className="text-[11px] text-gray-500 leading-tight inline-block">Automatically classify referral urgency based on source and diagnosis.</span>
                    </div>
                    <select
                      value={autoTriage}
                      onChange={(e) => setAutoTriage(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="Enabled">Enabled (Smart Triage)</option>
                      <option value="Disabled">Disabled (Manual Review Only)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Default Referral Assignee</span>
                      <span className="text-[11px] text-gray-500 leading-tight inline-block">Determine who gets assigned to new inbound referrals by default.</span>
                    </div>
                    <select
                      value={defaultAssignee}
                      onChange={(e) => setDefaultAssignee(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="Round Robin">Round Robin (Distribute Evenly)</option>
                      <option value="Assign to Me">Assign to Me</option>
                      <option value="Unassigned">Leave Unassigned (Queue)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Pipeline Urgency SLA Window</span>
                      <span className="text-[11px] text-gray-500 leading-tight inline-block">Highlight referrals that haven't been contacted within this timeframe.</span>
                    </div>
                    <select
                      value={pipelineUrgency}
                      onChange={(e) => setPipelineUrgency(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="12">12 Hours</option>
                      <option value="24">24 Hours (Standard)</option>
                      <option value="48">48 Hours</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          )
          }

          {/* TAB 2: NOTIFICATIONS & ALERTS */}
          {
            activeTab === "alerts" && (
              <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Intake Notifications & Alerts</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Configure desktop and SMS alerts for new referrals and missing documents.</p>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Alerts
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Referral & Document Alerts</h4>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs gap-3 sm:gap-0">
                    <div>
                      <span className="font-bold text-gray-900 block">Instant SMS for VIP / Urgent Referrals</span>
                      <span className="text-gray-500 text-[11px]">Receive an SMS immediately when a high-priority referral is submitted.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={newReferralSms}
                      onChange={(e) => setNewReferralSms(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs gap-3 sm:gap-0">
                    <div>
                      <span className="font-bold text-gray-900 block">Missing Documentation Alerts</span>
                      <span className="text-gray-500 text-[11px]">Show persistent dashboard banners for patients with pending Medicaid authorizations.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={missingDocAlert}
                      onChange={(e) => setMissingDocAlert(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>

                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-3">Assessment Reminders</h4>

                  <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">Assessment Follow-Up Reminder</span>
                        <span className="text-[11px] text-gray-500 lh-0.6 inline-block">Alert me if an RN assessment is completed but intake is not finalized after X hours.</span>
                      </div>
                      <select
                        value={assessmentReminderHours}
                        onChange={(e) => setAssessmentReminderHours(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                      >
                        <option value="12">12 Hours</option>
                        <option value="24">24 Hours</option>
                        <option value="48">48 Hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form >
            )
          }

          {/* TAB 3: CLINICAL ASSESSMENTS */}
          {
            activeTab === "assessments" && (
              <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Clinical Assessment Setup</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Configure defaults for RN assessments and scheduling buffers.</p>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Defaults
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">Default Assessment Duration</span>
                        <span className="text-[11px] text-gray-500 lh-0.6 inline-block">The standard calendar block booked for an initial RN assessment.</span>
                      </div>
                      <select
                        value={defaultAssessmentDuration}
                        onChange={(e) => setDefaultAssessmentDuration(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                      >
                        <option value="45">45 Minutes</option>
                        <option value="60">60 Minutes</option>
                        <option value="90">90 Minutes</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">Auto-Assign RN by Territory</span>
                        <span className="text-[11px] text-gray-500 lh-0.6 inline-block">Automatically map the patient's zip code to the nearest available RN.</span>
                      </div>
                      <select
                        value={autoAssignRN}
                        onChange={(e) => setAutoAssignRN(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                      >
                        <option value="Yes">Yes (Smart Map)</option>
                        <option value="No">No (Manual Assignment)</option>
                      </select>
                    </div>
                  </div>
                </div >
              </form >
            )
          }

          {/* TAB 4: COORDINATOR PROFILE */}
          {
            activeTab === "profile" && (
              <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Coordinator Profile Information</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Your official employee profile registered with Homelio Intake Operations.</p>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Profile
                  </button>
                </div>

                {/* Avatar Photo Section */}
                <div className="flex items-center gap-5 p-4 rounded-xl bg-gray-50/70 border border-slate-200">
                  <div className="w-16 h-16 rounded-2xl bg-teal-600 border-2 border-white shadow-md ring-2 ring-brand-teal/30 text-white font-black text-xl flex items-center justify-center">
                    SJ
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Employee ID: INT-2088 • Role: Lead Intake Coordinator</p>
                    <span className="mt-1.5 inline-block text-[10px] font-bold text-brand-teal bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                      Full-Time Intake (09:00 - 17:30)
                    </span>
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-gray-800">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-gray-800">Title / Role</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-gray-800">Direct Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-gray-800">Work Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>
                </div>
              </form>
            )
          }

          {/* TAB 5: SECURITY & PASSWORDS */}
          {
            activeTab === "security" && (
              <div className="space-y-6">
                <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Change Password</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Passwords must be at least 8 characters long with numbers and special symbols.</p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Key className="w-4 h-4" /> Update Password
                    </button>
                  </div>

                  <div className="space-y-4 max-w-md">
                    <div className="space-y-1.5 text-xs">
                      <label className="font-bold text-gray-800">Current Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      />
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <label className="font-bold text-gray-800">New Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      />
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <label className="font-bold text-gray-800">Confirm New Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1.5 font-medium cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showPassword ? "Hide Passwords" : "Show Passwords"}
                    </button>
                  </div>
                </form>

                {/* 2FA & Active Sessions Container */}
                <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Two-Factor Authentication (2FA) & Active Sessions</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Manage two-step verification codes and active device logins.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-xs text-emerald-950 block">2-Factor Authentication via SMS is Active</span>
                        <span className="text-[11px] text-emerald-800">Verification code sent to (555) 321-9876 when logging in from new devices.</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert("2FA settings updated.")}
                      className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-900 text-xs font-bold rounded-lg hover:bg-emerald-100/60 cursor-pointer"
                    >
                      Configure
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Device Sessions ({sessions.length})</h4>
                    <div className="divide-y divide-gray-100 border border-slate-200 rounded-xl overflow-hidden">
                      {sessions.map((s) => (
                        <div key={s.id} className="p-3.5 bg-white flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            {s.device.includes("Mobile") || s.device.includes("iPad") || s.device.includes("iPhone") ? (
                              <Smartphone className="w-4 h-4 text-brand-teal shrink-0" />
                            ) : (
                              <Laptop className="w-4 h-4 text-blue-600 shrink-0" />
                            )}
                            <div>
                              <span className="font-bold text-gray-900 block">{s.device}</span>
                              <span className="text-[11px] text-gray-500 lh-0.6 inline-block">{s.location} • {s.lastActive}</span>
                            </div>
                          </div>

                          {
                            s.isCurrent ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-teal/10 text-brand-teal">
                                Current Device
                              </span>
                            ) : (
                              <button
                                onClick={() => handleRevokeSession(s.id)}
                                className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                              >
                                Revoke Session
                              </button>
                            )
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div >
            )
          }
        </div >
      </div >
    </div >
  );
}
