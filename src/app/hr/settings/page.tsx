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
  Eye,
  EyeOff,
  Upload,
  Sliders,
  Laptop,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function HrSettingsPage() {
  const { currentUser } = useAuth();

  // Active Category Tab
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "security" | "preferences">("profile");

  // Success Toast state
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile Form State
  const [name, setName] = useState(currentUser?.name || "Sarah Jenkins");
  const [title, setTitle] = useState(currentUser?.role === "HR" ? "HR Recruiter" : currentUser?.role || "HR Staff");
  const [phone, setPhone] = useState("(555) 923-4122");
  const [email, setEmail] = useState(currentUser?.email || "sarah.jenkins@homelio.com");
  const [department, setDepartment] = useState("Human Resources");
  const [officeLocation, setOfficeLocation] = useState("Headquarters - Chicago, IL");

  // Notification Settings State
  const [emailApplicants, setEmailApplicants] = useState(true);
  const [emailPayroll, setEmailPayroll] = useState(true);
  const [pushUrgent, setPushUrgent] = useState(true);
  const [pushMessages, setPushMessages] = useState(true);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Preferences State
  const [language, setLanguage] = useState("English");
  const [timeZone, setTimeZone] = useState("Central Time (US & Canada)");
  const [theme, setTheme] = useState("System Default");

  // Sessions State
  const [sessions, setSessions] = useState([
    { id: "s-1", device: "Chrome / Windows 11 (This Device)", location: "Chicago, IL", lastActive: "Active Now", isCurrent: true },
    { id: "s-2", device: "Homelio HR Mobile App (iPhone 14 Pro)", location: "Chicago, IL", lastActive: "2 hours ago", isCurrent: false },
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
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header Banner */}
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" /> HR Portal Settings
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Account & Preferences</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your personal details, security credentials, notification alerts, and display preferences.
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
            { id: "profile", label: "Personal Profile", icon: User, desc: "Avatar & contact info" },
            { id: "notifications", label: "Notifications & Alerts", icon: Bell, desc: "Email & push alerts" },
            { id: "security", label: "Security & Password", icon: Lock, desc: "Password, 2FA & sessions" },
            { id: "preferences", label: "Preferences & Display", icon: Globe, desc: "Language & time zone" },
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
                  <h3 className="text-base font-bold text-gray-900">HR Profile Information</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Your official corporate profile details.</p>
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
                <Avatar name={name} size="xl" className="w-16 h-16 rounded-2xl border-2 border-white shadow-md ring-2 ring-purple-400/30 bg-purple-600 text-white" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Role: {title} • Dept: {department}</p>
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
                  <label className="font-bold text-gray-800">Job Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Work Phone</label>
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

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Office Location</label>
                  <input
                    type="text"
                    value={officeLocation}
                    onChange={(e) => setOfficeLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: NOTIFICATIONS & ALERTS */}
          {activeTab === "notifications" && (
            <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Notification Preferences</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Control how and when you receive system alerts.</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Communications</h4>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">New Applicant Alerts</span>
                    <span className="text-gray-500 text-[11px]">Receive an email digest when new candidates apply to open roles.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailApplicants}
                    onChange={(e) => setEmailApplicants(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Payroll Discrepancy Alerts</span>
                    <span className="text-gray-500 text-[11px]">Get notified when timesheets have exceptions requiring approval.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailPayroll}
                    onChange={(e) => setEmailPayroll(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>

                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-3">Browser & Mobile Push</h4>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Urgent Action Items</span>
                    <span className="text-gray-500 text-[11px]">Receive push alerts for expiring credentials or critical compliance issues.</span>
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
                    <span className="font-bold text-gray-900 block">Team Messages</span>
                    <span className="text-gray-500 text-[11px]">Instant notifications for internal HR and Caregiver communications.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={pushMessages}
                    onChange={(e) => setPushMessages(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: SECURITY & PASSWORD */}
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
                      <span className="font-bold text-xs text-emerald-950 block">2-Factor Authentication via App is Active</span>
                      <span className="text-[11px] text-emerald-800">Verification code required when logging in from new devices.</span>
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

          {/* TAB 4: PREFERENCES */}
          {activeTab === "preferences" && (
            <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Display & Regional Preferences</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Customize interface language, timezone, and appearance.</p>
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
                  <label className="font-bold text-gray-800">Interface Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium"
                  >
                    <option value="English">English (United States)</option>
                    <option value="Spanish">Español (Spanish)</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Time Zone</label>
                  <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium"
                  >
                    <option value="Eastern Time (US & Canada)">Eastern Time (US & Canada)</option>
                    <option value="Central Time (US & Canada)">Central Time (US & Canada)</option>
                    <option value="Mountain Time (US & Canada)">Mountain Time (US & Canada)</option>
                    <option value="Pacific Time (US & Canada)">Pacific Time (US & Canada)</option>
                  </select>
                </div>
                
                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium"
                  >
                    <option value="System Default">System Default</option>
                    <option value="Light Mode">Light Mode</option>
                    <option value="Dark Mode">Dark Mode</option>
                  </select>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
