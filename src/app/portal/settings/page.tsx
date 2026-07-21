"use client";

import React, { useState } from "react";
import { Bell, Lock, Shield, User, Globe, Save, Mail, Phone, Briefcase, Camera, Edit2, Users, MoreVertical, Plus, Check } from "lucide-react";
import { familyMembers } from "@/lib/portalMockData";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [saveStatus, setSaveStatus] = useState<Record<string, boolean>>({});

  const handleSave = (section: string) => {
    setSaveStatus(prev => ({ ...prev, [section]: true }));
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, [section]: false }));
    }, 2000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "general", label: "General Settings", icon: Save },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "family", label: "Family Access", icon: Users },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Settings</h2>
        <p className="text-xs text-text-secondary mt-1">Manage your account preferences and personal information.</p>
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 p-4 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50 space-y-2 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${activeTab === tab.id
                  ? "bg-brand-teal/10 text-brand-teal"
                  : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="w-full h-full pb-8">
                {/* Header Cover */}
                <div className="h-32 bg-gradient-to-r from-brand-teal/80 to-teal-600/80"></div>
        
                {/* Profile Info */}
                <div className="px-4 sm:px-8">
                  <div className="relative flex justify-between items-end -mt-12 mb-6">
                    <div className="relative group">
                      <div className="w-24 h-24 bg-white rounded-full p-1 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                        <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden relative">
                          {currentUser?.avatarUrl ? (
                            <img src={currentUser.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-3xl">
                              {currentUser?.name?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center cursor-pointer transition-all">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleSave('profile')} className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 active:scale-95 transition-all text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                      {saveStatus['profile'] ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                      {saveStatus['profile'] ? 'Saved!' : 'Edit Profile'}
                    </button>
                  </div>
        
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-xl font-bold text-text-primary">{currentUser?.name || "Sarah Jenkins"}</h1>
                      <p className="text-sm text-text-secondary font-medium">{currentUser?.role || "Agency Admin"}</p>
                    </div>
        
                    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary">Email Address</p>
                          <p className="text-sm font-medium text-text-primary">{currentUser?.email || "sarah.jenkins@example.com"}</p>
                        </div>
                      </div>
        
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary">Phone Number</p>
                          <p className="text-sm font-medium text-text-primary">+1 (555) 123-4567</p>
                        </div>
                      </div>
        
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-secondary">Department</p>
                          <p className="text-sm font-medium text-text-primary">Administration</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "general" && (
              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">General Information</h3>
                  <p className="text-xs text-text-secondary mt-1">Update your basic profile details.</p>
                </div>
                <form className="space-y-4 max-w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-primary">First Name</label>
                      <input
                        type="text"
                        defaultValue={currentUser?.name?.split(' ')[0] || "Sarah"}
                        className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-primary">Last Name</label>
                      <input
                        type="text"
                        defaultValue={currentUser?.name?.split(' ')[1] || "Jenkins"}
                        className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Email Address</label>
                    <input
                      type="email"
                      defaultValue={currentUser?.email || "sarah.jenkins@example.com"}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Timezone</label>
                    <select className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors appearance-none text-sm">
                      <option>Pacific Time (PT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                    </select>
                  </div>

                  <div className="pt-5 border-t border-slate-100 flex justify-end gap-3">
                    <button type="button" className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                      Cancel
                    </button>
                    <button type="button" onClick={() => handleSave('general')} className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 active:scale-95 transition-all text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                      {saveStatus['general'] ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {saveStatus['general'] ? 'Saved!' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "family" && (
              <div className="p-4 sm:p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Family Access</h3>
                    <p className="text-xs text-text-secondary mt-1">Manage who can view the care plan, schedule, and billing.</p>
                  </div>
                  <button onClick={() => handleSave('family')} className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 active:scale-95 transition-all text-white px-4 py-2.5 rounded-xl text-sm font-medium">
                    {saveStatus['family'] ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {saveStatus['family'] ? 'Sent!' : 'Invite Member'}
                  </button>
                </div>
                
                <div className="space-y-4">
                  {familyMembers.map(member => (
                    <div key={member.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-text-primary">{member.name}</span>
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{member.relationship}</span>
                          </div>
                          <div className="text-xs text-text-secondary flex gap-3">
                            <span>{member.email}</span>
                            <span>•</span>
                            <span>Last active: {member.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <select 
                          className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                          defaultValue={member.accessLevel}
                        >
                          <option value="Full Access">Full Access</option>
                          <option value="Read Only">Read Only</option>
                          <option value="Billing Only">Billing Only</option>
                        </select>
                        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="p-4 sm:p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Security Settings</h3>
                  <p className="text-xs text-text-secondary mt-1">Manage your password and authentication methods.</p>
                </div>
                
                <div className="space-y-4 max-w-lg">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors text-sm" />
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-text-primary">Two-Factor Authentication</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Add an extra layer of security to your account.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal"></div>
                    </label>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 flex justify-end gap-3 max-w-lg">
                  <button type="button" onClick={() => handleSave('security')} className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 active:scale-95 transition-all text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                    {saveStatus['security'] ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saveStatus['security'] ? 'Saved!' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="p-4 sm:p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Notification Preferences</h3>
                  <p className="text-xs text-text-secondary mt-1">Choose what updates you want to receive and how.</p>
                </div>

                <div className="space-y-6 max-w-2xl">
                  {[
                    { title: 'Visit Reminders', desc: 'Get notified before a scheduled visit starts.' },
                    { title: 'Care Plan Updates', desc: 'Alerts when the care team updates the active plan.' },
                    { title: 'Billing & Invoices', desc: 'Monthly statements and payment confirmations.' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white">
                      <div>
                        <h4 className="text-sm font-medium text-text-primary">{item.title}</h4>
                        <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                          Email
                        </label>
                        <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <input type="checkbox" defaultChecked={i === 0} className="w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                          SMS
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-5 border-t border-slate-100 flex justify-end gap-3 max-w-2xl">
                  <button type="button" onClick={() => handleSave('notifications')} className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 active:scale-95 transition-all text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                    {saveStatus['notifications'] ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saveStatus['notifications'] ? 'Saved!' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="p-4 sm:p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">System Preferences</h3>
                  <p className="text-xs text-text-secondary mt-1">Customize your portal experience.</p>
                </div>

                <div className="space-y-4 max-w-lg">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Language</label>
                    <select className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors appearance-none text-sm">
                      <option>English (US)</option>
                      <option>Spanish (ES)</option>
                      <option>French (FR)</option>
                    </select>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-text-primary">High Contrast Mode</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Increase UI contrast for better readability.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal"></div>
                    </label>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 flex justify-end gap-3 max-w-lg">
                  <button type="button" onClick={() => handleSave('preferences')} className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 active:scale-95 transition-all text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                    {saveStatus['preferences'] ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saveStatus['preferences'] ? 'Saved!' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
