"use client";

import React, { useState } from "react";
import { ShieldCheck, Key, Clock, Smartphone, AlertTriangle } from "lucide-react";

export function SecuritySettings() {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [autoLogoff, setAutoLogoff] = useState("15");
  const [isUpdatingPwd, setIsUpdatingPwd] = useState(false);
  const [isLockdown, setIsLockdown] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">Security Settings</h3>
        <p className="text-xs text-text-secondary mt-1">Manage HIPAA compliance, authentication, and session security.</p>
      </div>

      <div className="space-y-4">
        {/* MFA Section */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary">Multi-Factor Authentication (MFA)</h4>
              <p className="text-xs text-text-secondary mt-0.5">Require an extra step during login to verify identity.</p>
            </div>
          </div>
          <button
            onClick={() => setMfaEnabled(!mfaEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${mfaEnabled ? 'bg-brand-teal' : 'bg-slate-300'
              }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mfaEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
          </button>
        </div>

        {/* Session Management */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col gap-4">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-text-primary">Auto-Logoff Duration</h4>
              <p className="text-xs text-text-secondary mt-0.5 mb-3">
                Automatically log users out after a period of inactivity. This is a strict HIPAA requirement.
              </p>
              <select
                value={autoLogoff}
                onChange={(e) => setAutoLogoff(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-teal/20 focus:outline-none"
              >
                <option value="5">5 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes (Not Recommended)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="bg-white p-4 rounded-xl   border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <Key className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-text-primary">Password Policy</h4>
            <div className="text-xs text-text-secondary mt-1 space-y-1">
              <div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Minimum 12 characters</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Requires uppercase, lowercase, numbers & symbols</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Enforces 90-day password rotation</div>
            </div>
            <button
              onClick={() => {
                setIsUpdatingPwd(true);
                setTimeout(() => setIsUpdatingPwd(false), 1500);
              }}
              disabled={isUpdatingPwd}
              className="mt-4 px-4 py-2 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors disabled:opacity-70"
            >
              {isUpdatingPwd ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>

        {/* Security Breach Workflow */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col lg:flex-row gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-red-900">Security Breach Workflow</h4>
            <p className="text-xs text-red-700 mt-0.5 mb-3">
              Initiate an immediate lockdown and audit process in the event of a suspected PHI breach.
            </p>
            <button
              onClick={() => {
                setIsLockdown(true);
                setTimeout(() => setIsLockdown(false), 2000);
              }}
              disabled={isLockdown}
              className="px-4 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:bg-red-800 disabled:opacity-70"
            >
              {isLockdown ? "Initiating Lockdown..." : "Simulate Breach Lockdown"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
