"use client";

import React, { useState } from "react";
import { Bell, Lock, Shield, User, Globe, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  return (
    <div className="w-full mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Account Settings</h2>
        <p className="text-sm text-text-secondary mt-1">Manage your account preferences and security settings.</p>
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 p-6 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50 space-y-2 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  activeTab === tab.id
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
          <div className="flex-1 p-6 sm:p-8 space-y-8">
            {activeTab === "general" && (
              <>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">General Information</h3>
                  <p className="text-sm text-text-secondary mt-1">Update your basic profile details.</p>
                </div>

                <form className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                  <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                    <button type="button" className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
                      Cancel
                    </button>
                    <button type="button" className="inline-flex items-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] active:scale-95 transition-all text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab !== "general" && (
              <div className="flex flex-col items-center justify-center h-full text-text-secondary space-y-4 pt-12">
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
