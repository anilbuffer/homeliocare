"use client";

import React, { useState } from "react";
import {
  User,
  Users,
  Bell,
  Lock,
  Globe,
  Save,
  Sliders,
  CheckCircle2,
  Upload,
  ShieldCheck,
  Key,
  Eye,
  EyeOff,
  Smartphone,
  Laptop,
  Plus,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Heart,
  MoreVertical,
  Check,
  X,
} from "lucide-react";
import { familyMembers } from "@/lib/portalMockData";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/Avatar";

export default function SettingsPage() {
  const { currentUser } = useAuth();

  // Active Category Tab
  const [activeTab, setActiveTab] = useState<"profile" | "family" | "notifications" | "security" | "preferences">("profile");

  // Success Toast state
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile Form State
  const [name, setName] = useState(currentUser?.name || "Sarah Jenkins");
  const [email, setEmail] = useState(currentUser?.email || "sarah.jenkins@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("742 Evergreen Terrace, Springfield, IL 62704");
  const [emergencyContact, setEmergencyContact] = useState("Mark Jenkins (Son) - (555) 987-6543");
  const [primaryDoctor, setPrimaryDoctor] = useState("Dr. Aris Thorne, MD - (555) 234-5678");

  // Family Members Access State
  const [members, setMembers] = useState(familyMembers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRelationship, setInviteRelationship] = useState("Daughter");
  const [inviteAccess, setInviteAccess] = useState("Read Only");

  // Notification Settings State
  const [pushVisitReminders, setPushVisitReminders] = useState(true);
  const [pushCarePlan, setPushCarePlan] = useState(true);
  const [pushSupervisorNotes, setPushSupervisorNotes] = useState(true);
  const [smsShiftAlerts, setSmsShiftAlerts] = useState(true);
  const [smsEmergency, setSmsEmergency] = useState(true);
  const [emailStatements, setEmailStatements] = useState(true);
  const [emailCareSummary, setEmailCareSummary] = useState(true);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Active Device Sessions State
  const [sessions, setSessions] = useState([
    { id: "s-1", device: "Chrome / Windows 11 (This Device)", location: "Springfield, IL", lastActive: "Active Now", isCurrent: true },
    { id: "s-2", device: "Homelio Client Portal App (iPad Air)", location: "Springfield West", lastActive: "4 hours ago", isCurrent: false },
  ]);

  // Preferences State
  const [language, setLanguage] = useState("English (US)");
  const [fontSize, setFontSize] = useState("Medium (Standard)");
  const [highContrast, setHighContrast] = useState(false);
  const [timezone, setTimezone] = useState("Central Time (CT)");

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

  const handleAccessChange = (id: string, newAccess: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, accessLevel: newAccess } : m))
    );
  };

  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    const newMember = {
      id: `fam-${Date.now()}`,
      name: inviteName,
      relationship: inviteRelationship,
      email: inviteEmail,
      accessLevel: inviteAccess,
      lastActive: "Pending Invitation",
    };

    setMembers((prev) => [...prev, newMember]);
    setInviteName("");
    setInviteEmail("");
    setShowInviteModal(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header Banner matching Caregiver Settings style */}
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" /> Client & Family Portal Settings
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Account & Preferences</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your personal details, family access permissions, security credentials, and portal notification alerts.
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
            { id: "profile", label: "Personal Profile", icon: User, desc: "Avatar, contact info & address" },
            { id: "family", label: "Family Access", icon: Users, desc: "Care plan permissions & members" },
            { id: "notifications", label: "Notifications & Alerts", icon: Bell, desc: "SMS, push & email alerts" },
            { id: "security", label: "Security & Password", icon: Lock, desc: "Password, 2FA & sessions" },
            { id: "preferences", label: "Preferences & Display", icon: Globe, desc: "Language, font size & theme" },
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
                  <h3 className="text-base font-bold text-gray-900">Client Profile Information</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Your official account profile registered with Homelio Care Team.</p>
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
                <Avatar src={currentUser?.avatarUrl} name={name} size="xl" className="w-16 h-16 rounded-2xl border-2 border-white shadow-md ring-2 ring-brand-teal/30" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Client ID: CLI-9042 • Active Care Plan: Level 3 Nursing</p>
                  <button
                    type="button"
                    onClick={() => alert("Upload photo dialog opened. Please select a JPG or PNG file (Max 5MB).")}
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
                  <label className="font-bold text-gray-800">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Primary Contact Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Primary Physician / Doctor</label>
                  <input
                    type="text"
                    value={primaryDoctor}
                    onChange={(e) => setPrimaryDoctor(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div className="space-y-1.5 text-xs md:col-span-2">
                  <label className="font-bold text-gray-800">Home Residence Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div className="space-y-1.5 text-xs md:col-span-2">
                  <label className="font-bold text-gray-800">Emergency Contact Person & Phone</label>
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

          {/* TAB 2: FAMILY ACCESS */}
          {activeTab === "family" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Family & Caregiver Access Permissions</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Control who can view care notes, shift schedules, and billing statements.</p>
                </div>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Invite Family Member
                </button>
              </div>

              {/* Family Members List Grid */}
              <div className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <Avatar name={member.name} size="md" className="w-10 h-10 rounded-full font-bold shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-gray-900">{member.name}</span>
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-200 text-slate-700 rounded-full">
                            {member.relationship}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                          <span>{member.email}</span>
                          <span>•</span>
                          <span>Last active: {member.lastActive}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <select
                        value={member.accessLevel}
                        onChange={(e) => handleAccessChange(member.id, e.target.value)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-teal cursor-pointer"
                      >
                        <option value="Full Access">Full Access</option>
                        <option value="Read Only">Read Only</option>
                        <option value="Billing Only">Billing Only</option>
                      </select>

                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove Access"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Invite Family Member Modal */}
              {showInviteModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                        <Users className="w-4 h-4 text-brand-teal" /> Invite Family Member
                      </h4>
                      <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleInviteSubmit} className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-gray-800">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Eleanor Vance"
                          value={inviteName}
                          onChange={(e) => setInviteName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-800">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="eleanor@example.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-800">Relationship</label>
                        <select
                          value={inviteRelationship}
                          onChange={(e) => setInviteRelationship(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium cursor-pointer"
                        >
                          <option value="Daughter">Daughter</option>
                          <option value="Son">Son</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Sibling">Sibling</option>
                          <option value="Legal Guardian">Legal Guardian</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-800">Portal Access Level</label>
                        <select
                          value={inviteAccess}
                          onChange={(e) => setInviteAccess(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium cursor-pointer"
                        >
                          <option value="Full Access">Full Access (Schedules, Notes & Billing)</option>
                          <option value="Read Only">Read Only (View Care Notes & Schedule)</option>
                          <option value="Billing Only">Billing Only (View & Pay Invoices)</option>
                        </select>
                      </div>

                      <div className="pt-3 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowInviteModal(false)}
                          className="px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-xs font-bold text-white bg-brand-teal hover:bg-brand-teal/90 rounded-xl transition-colors shadow-xs cursor-pointer"
                        >
                          Send Invitation
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS & ALERTS */}
          {activeTab === "notifications" && (
            <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Notification & Alert Preferences</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Customize how you receive care updates, visit reminders, and billing receipts.</p>
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
                    <span className="font-bold text-gray-900 block">Caregiver Visit Reminders</span>
                    <span className="text-gray-500 text-[11px]">Receive push notification 30 minutes before a caregiver's scheduled arrival.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={pushVisitReminders}
                    onChange={(e) => setPushVisitReminders(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Care Plan & Daily Visit Notes Updates</span>
                    <span className="text-gray-500 text-[11px]">Instant alerts when the nurse or caregiver logs daily care notes.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={pushCarePlan}
                    onChange={(e) => setPushCarePlan(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Nurse Supervisor Clinical Alerts</span>
                    <span className="text-gray-500 text-[11px]">High priority notifications for vital sign flags or medication log updates.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={pushSupervisorNotes}
                    onChange={(e) => setPushSupervisorNotes(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal cursor-pointer"
                  />
                </div>

                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-3">SMS Text Alerts</h4>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Schedule Changes & Shift Confirmations</span>
                    <span className="text-gray-500 text-[11px]">Automated SMS alerts when a caregiver is reassigned or shift time changes.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsShiftAlerts}
                    onChange={(e) => setSmsShiftAlerts(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Emergency & On-Call Nurse Dispatch Alerts</span>
                    <span className="text-gray-500 text-[11px]">Urgent SMS notifications regarding immediate care adjustments.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsEmergency}
                    onChange={(e) => setSmsEmergency(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal cursor-pointer"
                  />
                </div>

                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-3">Email Communications</h4>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Monthly Invoices & Billing Statements</span>
                    <span className="text-gray-500 text-[11px]">Receive monthly PDF invoices and payment receipts directly via email.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailStatements}
                    onChange={(e) => setEmailStatements(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Weekly Caregiver Summary Digest</span>
                    <span className="text-gray-500 text-[11px]">Weekly email digest summarizing all completed visits, tasks, and notes.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailCareSummary}
                    onChange={(e) => setEmailCareSummary(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal cursor-pointer"
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
                      <span className="text-[11px] text-emerald-800">Verification code sent to {phone} when logging in from new devices.</span>
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
                          {s.device.includes("App") || s.device.includes("iPad") ? (
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

          {/* TAB 5: PREFERENCES & DISPLAY */}
          {activeTab === "preferences" && (
            <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Display & Localization Preferences</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Customize interface language, font scaling, time zone, and contrast.</p>
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
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium cursor-pointer"
                  >
                    <option value="English (US)">English (United States)</option>
                    <option value="Spanish (ES)">Español (Spanish)</option>
                    <option value="French (FR)">Français (French)</option>
                    <option value="Tagalog">Tagalog (Filipino)</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Display Time Zone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium cursor-pointer"
                  >
                    <option value="Central Time (CT)">Central Time (CT)</option>
                    <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                    <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                    <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Interface Font Scaling</label>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium cursor-pointer"
                  >
                    <option value="Medium (Standard)">Medium (Standard Desktop & Tablet)</option>
                    <option value="Large (High Readability)">Large (High Readability)</option>
                    <option value="Extra Large">Extra Large (Maximum Readability)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">High Contrast Mode</span>
                    <span className="text-gray-500 text-[11px]">Enhance outlines and contrast for higher legibility.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(e) => setHighContrast(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal cursor-pointer"
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
