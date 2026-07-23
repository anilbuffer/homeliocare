"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import {
  User,
  ShieldCheck,
  Bell,
  Lock,
  Globe,
  CheckCircle2,
  Save,
  Key,
  Smartphone,
  MapPin,
  Clock,
  Eye,
  EyeOff,
  AlertTriangle,
  Upload,
  Sliders,
  Laptop,
  UserCheck,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function SchedulerSettingsPage() {
  const { currentUser } = useAuth();

  // Active Category Tab
  const [activeTab, setActiveTab] = useState<"dispatch" | "alerts" | "regional" | "profile" | "security">("dispatch");

  // Success Toast state
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Dispatch & Smart-Match Rules Form State
  const [maxTravelRadius, setMaxTravelRadius] = useState("10");
  const [skillWeight, setSkillWeight] = useState("Strict");
  const [rankingWeight, setRankingWeight] = useState("Proximity");
  const [overtimeWarning, setOvertimeWarning] = useState("38");

  // Alerts & Notifications Form State
  const [callOffSms, setCallOffSms] = useState(true);
  const [callOffSound, setCallOffSound] = useState(true);
  const [unfilledUrgencyHours, setUnfilledUrgencyHours] = useState("4");
  const [availabilityReminders, setAvailabilityReminders] = useState(true);

  // Regional Form State
  const [primaryRegion, setPrimaryRegion] = useState("All Regions");
  const [crossTerritoryApproval, setCrossTerritoryApproval] = useState("Auto-Approve");

  // Profile Form State
  const [name, setName] = useState("Alex Rivera");
  const [title, setTitle] = useState("Lead Scheduler / Dispatcher");
  const [email, setEmail] = useState("alex.rivera@homeliocare.com");
  const [phone, setPhone] = useState("(555) 492-1088");

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sessions State
  const [sessions, setSessions] = useState([
    { id: "s-1", device: "Chrome / Windows 11 (Dispatch Station)", location: "New York HQ", lastActive: "Active Now", isCurrent: true },
    { id: "s-2", device: "Homelio Dispatch Mobile (iPad Pro)", location: "Queens Branch", lastActive: "1 hour ago", isCurrent: false },
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
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header Banner */}
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" /> Scheduler Portal Settings
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Account & Dispatch Preferences</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your smart-match algorithms, call-off urgency alerts, territory coverage, and security credentials.
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Vertical Tab Navigation (1/4 width) */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-1 self-start">
          {[
            { id: "dispatch", label: "Smart-Match & Dispatch", icon: Sliders, desc: "Proximity, skill strictness & auto-rank" },
            { id: "alerts", label: "Notifications & Alerts", icon: Bell, desc: "Call-off SMS, push & urgency alerts" },
            { id: "regional", label: "Territory Coverage", icon: MapPin, desc: "Primary dispatch zones & region scope" },
            { id: "profile", label: "Dispatcher Profile", icon: UserCheck, desc: "Personal info & contact details" },
            { id: "security", label: "Security & Passwords", icon: Lock, desc: "Password, 2FA & active sessions" },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                  isActive
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
          {/* TAB 1: SMART-MATCH & DISPATCH RULES */}
          {activeTab === "dispatch" && (
            <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Smart-Match & Dispatch Parameters</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Controls how caregivers are ranked in the inline assignment queue on your dashboard.</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Dispatch Config
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Maximum Caregiver Travel Radius Limit</span>
                      <span className="text-[11px] text-gray-500">Maximum distance allowed when matching caregivers to open shifts.</span>
                    </div>
                    <select
                      value={maxTravelRadius}
                      onChange={(e) => setMaxTravelRadius(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="5">Within 5 Miles (Strict Proximity)</option>
                      <option value="10">Within 10 Miles (Recommended)</option>
                      <option value="15">Within 15 Miles (Extended)</option>
                      <option value="25">Within 25 Miles (Any Region)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Required Skill Matching Strictness</span>
                      <span className="text-[11px] text-gray-500">Strict mode requires 100% skill overlap (Hoyer, Dementia, Post-op) before suggesting assignment.</span>
                    </div>
                    <select
                      value={skillWeight}
                      onChange={(e) => setSkillWeight(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="Strict">Strict (Must match 100% required skills)</option>
                      <option value="Flexible">Flexible (Match primary credential CNA/HHA)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Smart-Rank Sorting Algorithm Focus</span>
                      <span className="text-[11px] text-gray-500">Determines which caregiver appears at the top of the 1-click inline assign panel.</span>
                    </div>
                    <select
                      value={rankingWeight}
                      onChange={(e) => setRankingWeight(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="Proximity">Proximity First (Closest distance)</option>
                      <option value="Rating">Rating First (Highest patient rating ★)</option>
                      <option value="Balanced">Balanced (Equal Proximity & Rating)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Caregiver Weekly Overtime Alert Buffer</span>
                      <span className="text-[11px] text-gray-500">Flag assignment warnings when assigning a shift puts a caregiver above weekly hours limit.</span>
                    </div>
                    <select
                      value={overtimeWarning}
                      onChange={(e) => setOvertimeWarning(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="38">Alert at 38 Hours/Week</option>
                      <option value="40">Alert at 40 Hours/Week (Standard Overtime)</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: NOTIFICATIONS & ALERTS */}
          {activeTab === "alerts" && (
            <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Real-Time Dispatch & Urgency Alerts</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Configure desktop audio chimes and SMS broadcasts for open shifts and call-offs.</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Alerts
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Call-Off & Urgent Dispatch Alerts</h4>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Instant Call-Off Desktop Push & SMS Alerts</span>
                    <span className="text-gray-500 text-[11px]">Receive real-time pop-ups the moment a field caregiver submits a call-off.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={callOffSms}
                    onChange={(e) => setCallOffSms(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">High-Priority Audio Chime for Call-Off Queue</span>
                    <span className="text-gray-500 text-[11px]">Play audio alert when a new call-off arrives in your dispatch queue.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={callOffSound}
                    onChange={(e) => setCallOffSound(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>

                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-3">Unfilled Shift Thresholds</h4>

                <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Unfilled Shift Urgency Window (Hours)</span>
                      <span className="text-[11px] text-gray-500">Shifts starting within this window get highlighted in red with priority badge.</span>
                    </div>
                    <select
                      value={unfilledUrgencyHours}
                      onChange={(e) => setUnfilledUrgencyHours(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="2">&lt; 2 Hours (Urgent Red Alert)</option>
                      <option value="4">&lt; 4 Hours (Standard Amber Alert)</option>
                      <option value="6">&lt; 6 Hours (Early Warning)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Automated Caregiver Availability Response Reminders</span>
                    <span className="text-gray-500 text-[11px]">Send automated SMS pings to under-scheduled caregivers for unassigned shifts.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={availabilityReminders}
                    onChange={(e) => setAvailabilityReminders(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: REGIONAL COVERAGE */}
          {activeTab === "regional" && (
            <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Regional Coverage & Territory Scope</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Filter dashboard queues and caregiver matches by your assigned dispatch territory.</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Territory
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Primary Territory Focus</span>
                      <span className="text-[11px] text-gray-500">Your primary dispatch zone for shift queue filtering.</span>
                    </div>
                    <select
                      value={primaryRegion}
                      onChange={(e) => setPrimaryRegion(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="All Regions">All Agency Regions (Queens, Brooklyn, Manhattan, Bronx)</option>
                      <option value="Queens">Queens Division</option>
                      <option value="Brooklyn">Brooklyn Division</option>
                      <option value="Manhattan">Manhattan Division</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Cross-Territory Dispatch Assignment</span>
                      <span className="text-[11px] text-gray-500">Allow assigning caregivers across adjacent borough boundaries for urgent call-offs.</span>
                    </div>
                    <select
                      value={crossTerritoryApproval}
                      onChange={(e) => setCrossTerritoryApproval(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="Auto-Approve">Auto-Approve Cross-Territory</option>
                      <option value="Require Sign-off">Require Supervisor Approval</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* TAB 4: DISPATCHER PROFILE */}
          {activeTab === "profile" && (
            <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Dispatcher Profile Information</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Your official employee profile registered with Homelio Regional Operations.</p>
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
                  AR
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Employee ID: SCH-4091 • Role: Scheduler / Dispatcher</p>
                  <span className="mt-1.5 inline-block text-[10px] font-bold text-brand-teal bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                    Morning Dispatch Shift (07:00 - 15:30)
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
                  <label className="font-bold text-gray-800">Direct Dispatch Phone</label>
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
          )}

          {/* TAB 5: SECURITY & PASSWORDS */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
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
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Two-Factor Authentication (2FA) & Active Sessions</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Manage two-step verification codes and active device logins.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-emerald-950 block">2-Factor Authentication via SMS is Active</span>
                      <span className="text-[11px] text-emerald-800">Verification code sent to (555) 492-1088 when logging in from new devices.</span>
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
                          {s.device.includes("Mobile") || s.device.includes("iPad") ? (
                            <Smartphone className="w-4 h-4 text-brand-teal shrink-0" />
                          ) : (
                            <Laptop className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                          <div>
                            <span className="font-bold text-gray-900 block">{s.device}</span>
                            <span className="text-[11px] text-gray-500">{s.location} • {s.lastActive}</span>
                          </div>
                        </div>

                        {s.isCurrent ? (
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
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
