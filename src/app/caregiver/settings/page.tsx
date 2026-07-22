"use client";

import React, { useState } from "react";
import { CaregiverLayout } from "@/components/caregiver/CaregiverLayout";
import { INITIAL_CAREGIVER_PROFILE, CaregiverProfileData } from "@/lib/caregiver/caregiverPortalData";
import { Avatar } from "@/components/ui/Avatar";
import {
  User,
  ShieldCheck,
  Bell,
  Lock,
  Globe,
  CreditCard,
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
  Radio,
  Sliders,
  Laptop,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function CaregiverSettingsPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  // Active Category Tab
  const [activeTab, setActiveTab] = useState<"profile" | "evv" | "notifications" | "security" | "preferences" | "payroll">("profile");

  // Success Toast state
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile Form State
  const [name, setName] = useState("Maria Santos");
  const [title, setTitle] = useState("Certified Nursing Assistant (CNA)");
  const [phone, setPhone] = useState("(555) 382-9102");
  const [email, setEmail] = useState("maria.santos@homeliocare.com");
  const [address, setAddress] = useState("412 Oakwood Ave, Apt 3B, North Branch");
  const [maxTravelRadius, setMaxTravelRadius] = useState("20");
  const [emergencyContact, setEmergencyContact] = useState("Carlos Santos (Husband) - (555) 881-2099");

  // EVV Settings State
  const [gpsAccuracy, setGpsAccuracy] = useState("high");
  const [geofenceRadius, setGeofenceRadius] = useState("150");
  const [autoOfflineSync, setAutoOfflineSync] = useState(true);
  const [biometricPin, setBiometricPin] = useState(true);
  const [quickPin, setQuickPin] = useState("4891");

  // Notification Settings State
  const [pushUrgent, setPushUrgent] = useState(true);
  const [pushNotes, setPushNotes] = useState(true);
  const [smsShiftReminders, setSmsShiftReminders] = useState(true);
  const [smsOpenShifts, setSmsOpenShifts] = useState(true);
  const [emailPaystubs, setEmailPaystubs] = useState(true);
  const [emailLmsExpiry, setEmailLmsExpiry] = useState(true);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Preferences State
  const [language, setLanguage] = useState("English");
  const [fontSize, setFontSize] = useState("Medium (Standard)");
  const [highContrast, setHighContrast] = useState(false);

  // Sessions State
  const [sessions, setSessions] = useState([
    { id: "s-1", device: "Chrome / Windows 11 (This Device)", location: "Springfield, IL", lastActive: "Active Now", isCurrent: true },
    { id: "s-2", device: "Homelio Caregiver Mobile App (iPhone 14 Pro)", location: "Springfield North", lastActive: "2 hours ago", isCurrent: false },
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
    <CaregiverLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Banner */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider">
              <Sliders className="w-4 h-4" /> Caregiver Portal Settings
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Account & Preferences</h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage your personal details, EVV location preferences, security credentials, and mobile notification alerts.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
              <span>Settings updated successfully!</span>
            </div>
          )}
        </div>

        {/* Desktop 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Vertical Tab Navigation (1/4 width) */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-1 self-start">
            {[
              { id: "profile", label: "Personal Profile", icon: User, desc: "Avatar, contact info & emergency" },
              { id: "evv", label: "EVV & Geofencing", icon: MapPin, desc: "GPS tolerance & auto-sync" },
              { id: "notifications", label: "Notifications & Alerts", icon: Bell, desc: "SMS, push & email alerts" },
              { id: "security", label: "Security & Password", icon: Lock, desc: "Password, 2FA & sessions" },
              { id: "preferences", label: "Preferences & Display", icon: Globe, desc: "Language, font size & theme" },
              { id: "payroll", label: "Direct Deposit & Tax", icon: CreditCard, desc: "Bank account & W-4 status" },
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
            {/* TAB 1: PERSONAL PROFILE */}
            {activeTab === "profile" && (
              <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Caregiver Profile Information</h3>
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
                  <Avatar src={INITIAL_CAREGIVER_PROFILE.avatarUrl} name={name} size="xl" className="w-16 h-16 rounded-2xl border-2 border-white shadow-md ring-2 ring-brand-teal/30" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Employee ID: EMP-8842 • CNA Lic# State-8821</p>
                    <button
                      type="button"
                      onClick={() => alert("Upload dialog opened. Please select a PNG or JPG profile photo (Max 5MB).")}
                      className="mt-2 text-xs text-brand-teal font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload New Photo
                    </button>
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
                    <label className="font-bold text-gray-800">Title / Credentials</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-gray-800">Primary Mobile Phone (SMS Verified)</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-gray-800">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs md:col-span-2">
                    <label className="font-bold text-gray-800">Home Base Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-gray-800">Max Preferred Travel Radius (Miles)</label>
                    <select
                      value={maxTravelRadius}
                      onChange={(e) => setMaxTravelRadius(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium"
                    >
                      <option value="10">10 miles</option>
                      <option value="15">15 miles</option>
                      <option value="20">20 miles (Recommended)</option>
                      <option value="30">30 miles</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-gray-800">Emergency Contact Person</label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* TAB 2: EVV & GEOFENCING */}
            {activeTab === "evv" && (
              <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">EVV Location & Offline Queue Settings</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Configure Electronic Visit Verification GPS tolerance and offline sync matrix.</p>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save EVV Config
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">GPS Location Accuracy Mode</span>
                        <span className="text-[11px] text-gray-500">High accuracy uses combined Wi-Fi, Cell Tower & GPS sensors for state matrix verification.</span>
                      </div>
                      <select
                        value={gpsAccuracy}
                        onChange={(e) => setGpsAccuracy(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                      >
                        <option value="high">High Precision (Recommended)</option>
                        <option value="standard">Standard Cellular</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">Geofence Proximity Radius Limit</span>
                        <span className="text-[11px] text-gray-500">Maximum distance allowed from client coordinates to clock in without manual FVV exception log.</span>
                      </div>
                      <select
                        value={geofenceRadius}
                        onChange={(e) => setGeofenceRadius(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                      >
                        <option value="100">100 Meters (Strict Urban)</option>
                        <option value="150">150 Meters (State Standard)</option>
                        <option value="300">300 Meters (Rural Zone)</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Automatic Offline Queue Synchronization</span>
                      <span className="text-[11px] text-gray-500">Automatically sync pending offline visit logs as soon as Wi-Fi or LTE connection is restored.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoOfflineSync}
                      onChange={(e) => setAutoOfflineSync(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">Caregiver Mobile Quick Passcode / PIN</span>
                        <span className="text-[11px] text-gray-500">4-digit PIN for rapid clock-in unlocking on field devices.</span>
                      </div>
                      <input
                        type="password"
                        maxLength={4}
                        value={quickPin}
                        onChange={(e) => setQuickPin(e.target.value)}
                        className="w-24 text-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-mono font-bold text-gray-900 tracking-widest"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 3: NOTIFICATIONS & ALERTS */}
            {activeTab === "notifications" && (
              <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Notification Preferences</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Control how and when Supervisors and Dispatch contact you for urgent shifts and visit updates.</p>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Preferences
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Browser & Mobile Push Notifications</h4>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block">Urgent Supervisor Care Plan & Vital Sign Alerts</span>
                      <span className="text-gray-500 text-[11px]">Receive push alerts when a Nurse Supervisor drops an urgent note on an active client.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={pushUrgent}
                      onChange={(e) => setPushUrgent(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block">Caregiver Team Chat Messages</span>
                      <span className="text-gray-500 text-[11px]">Instant notifications for new HIPAA-secure team messaging threads.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={pushNotes}
                      onChange={(e) => setPushNotes(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>

                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-3">SMS Text Message Alerts</h4>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block">Visit Shift Reminders (1 Hour Prior)</span>
                      <span className="text-gray-500 text-[11px]">Automated SMS reminder sent 60 mins before your scheduled shift start time.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsShiftReminders}
                      onChange={(e) => setSmsShiftReminders(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block">Open Shift Pickup Bonus Broadcasts</span>
                      <span className="text-gray-500 text-[11px]">Receive SMS notifications when high-paying bonus shifts become available in your branch zone.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsOpenShifts}
                      onChange={(e) => setSmsOpenShifts(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>

                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-3">Email Communications</h4>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block">Bi-Weekly Pay Stub PDFs & Payroll Summaries</span>
                      <span className="text-gray-500 text-[11px]">Receive direct email attachments of your pay stubs on payroll release dates.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailPaystubs}
                      onChange={(e) => setEmailPaystubs(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block">LMS Course & CPR License Expiry Alerts</span>
                      <span className="text-gray-500 text-[11px]">30-day advance email warnings before mandatory certifications or TB tests expire.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailLmsExpiry}
                      onChange={(e) => setEmailLmsExpiry(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* TAB 4: SECURITY & PASSWORD */}
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
                      className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1.5 font-medium"
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
                        <span className="text-[11px] text-emerald-800">Verification code sent to (555) 382-9102 when logging in from new devices.</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert("2FA settings updated.")}
                      className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-900 text-xs font-bold rounded-lg hover:bg-emerald-100/60"
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
                            {s.device.includes("Mobile") ? (
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
                              className="text-xs text-rose-600 font-bold hover:underline"
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

            {/* TAB 5: PREFERENCES & ACCESSIBILITY */}
            {activeTab === "preferences" && (
              <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Display & Localization Preferences</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Customize interface language, font scaling for outdoor readability, and color themes.</p>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Preferences
                  </button>
                </div>

                <div className="space-y-4 max-w-lg">
                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-gray-800">Preferred Interface Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium"
                    >
                      <option value="English">English (United States)</option>
                      <option value="Spanish">Español (Spanish)</option>
                      <option value="French">Français (French)</option>
                      <option value="Tagalog">Tagalog (Filipino)</option>
                      <option value="Vietnamese">Tiếng Việt (Vietnamese)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-gray-800">Field Font Scaling</label>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium"
                    >
                      <option value="Medium (Standard)">Medium (Standard Desktop & Mobile)</option>
                      <option value="Large (High Readability)">Large (Outdoor Sunlight Readability)</option>
                      <option value="Extra Large">Extra Large (Maximum Contrast)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block">High Contrast Mode</span>
                      <span className="text-gray-500 text-[11px]">Enhance border outlines and button text for high glare outdoor environments.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* TAB 6: DIRECT DEPOSIT & TAX */}
            {activeTab === "payroll" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Direct Deposit & W-4 Tax Status</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Read-only payroll account details managed by Homelio Regional HR.</p>
                  </div>
                  <button
                    onClick={() => router.push("/caregiver/profile?tab=payroll")}
                    className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors"
                  >
                    View Pay Stubs History
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-gray-900">Direct Deposit Bank Account</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">VERIFIED</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-700">
                      <p><strong>Bank Name:</strong> Wells Fargo Bank, N.A.</p>
                      <p><strong>Account Number:</strong> ********4819 (Checking)</p>
                      <p><strong>Routing Number:</strong> *****0812</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-gray-900">Federal W-4 Tax Withholding</span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">W-2 ACTIVE</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-700">
                      <p><strong>Filing Status:</strong> Single or Married filing separately</p>
                      <p><strong>Allowances:</strong> 0 Allowances</p>
                      <p><strong>State Tax:</strong> Illinois Department of Revenue (IL-W-4)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CaregiverLayout>
  );
}
