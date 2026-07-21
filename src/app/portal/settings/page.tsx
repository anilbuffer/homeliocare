"use client";

import React, { useState } from "react";
import { Bell, Lock, Shield, User, Globe, Save, Mail, Phone, Briefcase, Camera, Edit2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "general", label: "General Settings", icon: Save },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
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
                <div className="h-32 bg-gradient-to-r from-brand-teal/80 to-blue-600/80"></div>
        
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
                    <button className="inline-flex items-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] active:scale-95 transition-all text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
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
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
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
                    <button type="button" className="inline-flex items-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] active:scale-95 transition-all text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab !== "profile" && activeTab !== "general" && (
              <div className="p-4 sm:p-6 h-full flex flex-col items-center justify-center text-text-secondary space-y-4 pt-12">
                <Shield className="w-12 h-12 text-slate-200" />
                <p>This section is under construction.</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
