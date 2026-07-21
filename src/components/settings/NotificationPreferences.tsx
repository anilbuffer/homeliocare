"use client";

import { useState } from "react";
import { Bell, Smartphone, Mail, AlertCircle, Save, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function NotificationPreferences() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Notification Preferences</h3>
          <p className="text-xs text-text-secondary mt-1">Configure how and when you receive operational alerts.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving || isSaved}
          className="inline-flex items-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] disabled:opacity-70 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : isSaved ? "Saved!" : "Save Preferences"}
        </button>
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-slate-500" />
            <h4 className="font-semibold text-slate-800">Operational Alerts</h4>
          </div>
          <div className="flex items-center gap-6 pr-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" /> Email
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" /> SMS
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {/* Scheduling */}
          <div className="p-6">
            <h5 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider text-brand-teal">Scheduling & Visits</h5>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Late Clock-In Alerts</div>
                  <div className="text-xs text-slate-500 mt-0.5">Notify when a caregiver is late by more than 15 minutes.</div>
                </div>
                <div className="flex items-center gap-8 pr-4">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-teal accent-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-teal accent-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Missed Visits</div>
                  <div className="text-xs text-slate-500 mt-0.5">Notify when a scheduled visit is missed entirely.</div>
                </div>
                <div className="flex items-center gap-8 pr-4">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-teal accent-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-teal accent-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Overtime Warning</div>
                  <div className="text-xs text-slate-500 mt-0.5">Notify when a caregiver approaches 40 hours/week.</div>
                </div>
                <div className="flex items-center gap-8 pr-4">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-teal accent-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                  <input type="checkbox" className="w-4 h-4 text-brand-teal accent-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                </div>
              </div>
            </div>
          </div>

          {/* Compliance */}
          <div className="p-6">
            <h5 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider text-purple-600">Compliance & Authorizations</h5>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Authorization Expiry</div>
                  <div className="text-xs text-slate-500 mt-0.5">Notify 30 days before a patient's prior authorization expires.</div>
                </div>
                <div className="flex items-center gap-8 pr-4">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-teal accent-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                  <input type="checkbox" className="w-4 h-4 text-brand-teal accent-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Caregiver Credentials</div>
                  <div className="text-xs text-slate-500 mt-0.5">Notify when a caregiver's license or certification is expiring soon.</div>
                </div>
                <div className="flex items-center gap-8 pr-4">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
