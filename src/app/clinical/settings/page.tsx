"use client";

import React, { useState } from "react";
import {
  Stethoscope,
  ShieldCheck,
  Activity,
  Users,
  Bell,
  Save,
  CheckCircle2,
  Sliders,
  AlertTriangle
} from "lucide-react";

export default function ClinicalSettingsPage() {
  // Active Category Tab
  const [activeTab, setActiveTab] = useState<"general" | "compliance" | "vitals" | "permissions" | "notifications">("general");

  // Success Toast state
  const [savedSuccess, setSavedSuccess] = useState(false);

  // General Clinical State
  const [defaultAssessmentFreq, setDefaultAssessmentFreq] = useState("60 Days");
  const [requireCarePlanSig, setRequireCarePlanSig] = useState(true);
  const [autoSaveNotes, setAutoSaveNotes] = useState(true);

  // Compliance & QA State
  const [incidentRouting, setIncidentRouting] = useState("qa_director");
  const [requireSupervisorSignoff, setRequireSupervisorSignoff] = useState(true);
  const [auditFrequency, setAuditFrequency] = useState("Quarterly");

  // Vitals & Alerts State
  const [enableCriticalAlerts, setEnableCriticalAlerts] = useState(true);
  const [bpHighSystolic, setBpHighSystolic] = useState("160");
  const [bpLowSystolic, setBpLowSystolic] = useState("90");

  // Caregiver Permissions State
  const [allowMedAdmin, setAllowMedAdmin] = useState(false);
  const [allowAssessmentEdit, setAllowAssessmentEdit] = useState(false);

  // Notification Settings State
  const [emailNewIncidents, setEmailNewIncidents] = useState(true);
  const [emailMissedVisits, setEmailMissedVisits] = useState(true);
  const [emailCriticalVitals, setEmailCriticalVitals] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header Banner */}
      <div className="bg-white/80 backdrop-blur-xl p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" /> Clinical Settings
          </div>
          <h1 className="text-xl font-bold text-gray-900 mt-0.5">Configuration & Preferences</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your clinical defaults, compliance rules, vitals alerts, and caregiver permissions.
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Left Vertical Tab Navigation (1/4 width) */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-1 self-start">
          {[
            { id: "general", label: "General Clinical", icon: Stethoscope, desc: "Assessments & Notes" },
            { id: "compliance", label: "Compliance & QA", icon: ShieldCheck, desc: "Signoffs & Audits" },
            { id: "vitals", label: "Vitals & Alerts", icon: Activity, desc: "Critical Thresholds" },
            { id: "permissions", label: "Role Permissions", icon: Users, desc: "Caregiver Capabilities" },
            { id: "notifications", label: "Clinical Alerts", icon: Bell, desc: "Incidents & Vitals" },
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
          {/* TAB 1: GENERAL CLINICAL */}
          {activeTab === "general" && (
            <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">General Clinical</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Configure default behaviors for assessments and clinical documentation.</p>
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold text-xs rounded-lg shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-xs text-gray-900 block">Default Assessment Frequency</span>
                      <span className="text-[11px] text-gray-500 inline-block mt-0.5">Standard interval for patient reassessments.</span>
                    </div>
                    <select
                      value={defaultAssessmentFreq}
                      onChange={(e) => setDefaultAssessmentFreq(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="30 Days">Every 30 Days</option>
                      <option value="60 Days">Every 60 Days</option>
                      <option value="90 Days">Every 90 Days</option>
                      <option value="Annually">Annually</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-gray-900 block">Require E-Signature on Care Plans</span>
                    <span className="text-[11px] text-gray-500 inline-block mt-0.5">Force signature capture before finalizing any care plan.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={requireCarePlanSig}
                    onChange={(e) => setRequireCarePlanSig(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-gray-900 block">Auto-Save Clinical Notes</span>
                    <span className="text-[11px] text-gray-500 inline-block mt-0.5">Automatically save draft notes every 60 seconds.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoSaveNotes}
                    onChange={(e) => setAutoSaveNotes(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: COMPLIANCE & QA */}
          {activeTab === "compliance" && (
            <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Compliance & QA</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Manage audit frequencies and supervisory signoffs.</p>
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold text-xs rounded-lg shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Compliance
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Incident Routing Destination</span>
                      <span className="text-[11px] text-gray-500 inline-block mt-0.5">Who receives newly submitted incident reports.</span>
                    </div>
                    <select
                      value={incidentRouting}
                      onChange={(e) => setIncidentRouting(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="qa_director">QA Director</option>
                      <option value="clinical_manager">Clinical Manager</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Chart Audit Frequency</span>
                      <span className="text-[11px] text-gray-500 inline-block mt-0.5">Target frequency for internal QA chart audits.</span>
                    </div>
                    <select
                      value={auditFrequency}
                      onChange={(e) => setAuditFrequency(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Annually">Annually</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-gray-900 block">Require RN Supervisor Sign-off</span>
                    <span className="text-[11px] text-gray-500 inline-block mt-0.5">Require an RN supervisor to co-sign LPN/Aide notes.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={requireSupervisorSignoff}
                    onChange={(e) => setRequireSupervisorSignoff(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: VITALS & ALERTS */}
          {activeTab === "vitals" && (
            <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Vitals & Alerts</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Define thresholds for abnormal vitals and automated alerts.</p>
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold text-xs rounded-lg shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Thresholds
                </button>
              </div>

              <div className="space-y-4">
                <div className="px-4 py-3 rounded-xl border border-red-200 bg-red-50/50 flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-xs text-red-950 block">Enable Critical Alerts</span>
                      <span className="text-[11px] text-red-800">Immediately notify on-call nurse when critical thresholds are breached.</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableCriticalAlerts}
                    onChange={(e) => setEnableCriticalAlerts(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded accent-red-600"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="font-semibold text-gray-800">Systolic Blood Pressure (High Alert)</label>
                    <input
                      type="number"
                      value={bpHighSystolic}
                      onChange={(e) => setBpHighSystolic(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="font-semibold text-gray-800">Systolic Blood Pressure (Low Alert)</label>
                    <input
                      type="number"
                      value={bpLowSystolic}
                      onChange={(e) => setBpLowSystolic(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* TAB 4: PERMISSIONS */}
          {activeTab === "permissions" && (
            <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Role Permissions</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Control clinical capabilities for standard caregiver roles.</p>
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-lg shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Permissions
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Allow HHA/Aide Medication Administration</span>
                    <span className="text-gray-500 text-[11px]">Permit aides to log medication administration (if state allows).</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowMedAdmin}
                    onChange={(e) => setAllowMedAdmin(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Allow Standard Caregivers to Edit Assessments</span>
                    <span className="text-gray-500 text-[11px]">By default, only RNs and Therapists can edit full assessments.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowAssessmentEdit}
                    onChange={(e) => setAllowAssessmentEdit(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 5: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Clinical Alerts & Notifications</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Configure which clinical events trigger system or email alerts.</p>
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold text-xs rounded-lg shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Alerts
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">New Incident Reports</span>
                    <span className="text-gray-500 text-[11px]">Send an email when a new incident is filed.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNewIncidents}
                    onChange={(e) => setEmailNewIncidents(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Missed Visits Alert</span>
                    <span className="text-gray-500 text-[11px]">Notify clinical managers of missed scheduled visits.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailMissedVisits}
                    onChange={(e) => setEmailMissedVisits(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Critical Vitals Alert</span>
                    <span className="text-gray-500 text-[11px]">Immediately alert when vitals cross defined critical thresholds.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailCriticalVitals}
                    onChange={(e) => setEmailCriticalVitals(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
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
