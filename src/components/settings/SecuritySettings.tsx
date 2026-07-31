"use client";

import React, { useState } from "react";
import { ShieldCheck, Key, Clock, Smartphone, AlertTriangle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export function SecuritySettings() {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [autoLogoff, setAutoLogoff] = useState("15");
  const [isUpdatingPwd, setIsUpdatingPwd] = useState(false);
  const [isLockdown, setIsLockdown] = useState(false);
  const [isUpdatePwdModalOpen, setIsUpdatePwdModalOpen] = useState(false);

  const [pwdForm, setPwdForm] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdForm.new !== pwdForm.confirm) {
      setPwdError("New passwords do not match");
      return;
    }
    if (pwdForm.new.length < 12) {
      setPwdError("Password must be at least 12 characters");
      return;
    }
    setPwdError("");
    setIsUpdatingPwd(true);
    setTimeout(() => {
      setIsUpdatingPwd(false);
      setPwdSuccess(true);
      setPwdForm({ current: "", new: "", confirm: "" });
      setTimeout(() => {
        setPwdSuccess(false);
        setIsUpdatePwdModalOpen(false);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">Security Settings</h3>
        <p className="text-xs text-text-secondary mt-1">Manage HIPAA compliance, authentication, and session security.</p>
      </div>
      <div className="space-y-3">
        {/* MFA Section */}
        <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">Multi-Factor Authentication (MFA)</h4>
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
        <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col gap-4">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-text-primary">Auto-Logoff Duration</h4>
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
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative flex flex-col items-start gap-4">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <Key className="w-4 h-4 text-indigo-800" />
            </div>
            <h4 className="text-sm font-semibold text-slate-800 mb-0">Password Policy</h4>
          </div>
          <div className="w-full">
            <ul className="space-y-2 mb-3 lg:mb-4">
              <li className="flex items-center gap-3 text-xs text-slate-500">
                <ShieldCheck className="w-[16px] h-[16px] text-emerald-500 shrink-0" />
                Minimum 12 characters
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-500">
                <ShieldCheck className="w-[16px] h-[16px] text-emerald-500 shrink-0" />
                Requires uppercase, lowercase, numbers & symbols
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-500">
                <ShieldCheck className="w-[16px] h-[16px] text-emerald-500 shrink-0" />
                Enforces 90-day password rotation
              </li>
            </ul>
            <button
              onClick={() => setIsUpdatePwdModalOpen(true)}
              className="px-3 py-2 text-xs font-semibold text-indigo-800 bg-indigo-100 hover:bg-indigo-200 rounded-lg transition-colors"
            >
              Update Password
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
      <Modal
        isOpen={isUpdatePwdModalOpen}
        onClose={() => setIsUpdatePwdModalOpen(false)}
        title="Update Password"
        description="Enforces 90-day rotation and strict 12-char minimum policy."
        icon={<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0"><Key className="w-5 h-5 text-indigo-600" /></div>}
        maxWidth="lg"
      >
        <form onSubmit={handleUpdatePassword} className="space-y-2.5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Current Password</label>
            <input
              type="password"
              required
              value={pwdForm.current}
              onChange={e => setPwdForm({ ...pwdForm, current: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-colors"
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">New Password</label>
            <input
              type="password"
              required
              value={pwdForm.new}
              onChange={e => setPwdForm({ ...pwdForm, new: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-colors"
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
            <input
              type="password"
              required
              value={pwdForm.confirm}
              onChange={e => setPwdForm({ ...pwdForm, confirm: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-colors"
              placeholder="Confirm new password"
            />
          </div>

          {pwdError && <div className="text-xs text-red-600 font-medium">{pwdError}</div>}
          {pwdSuccess && <div className="text-xs text-emerald-600 font-medium flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Password updated successfully!</div>}

          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsUpdatePwdModalOpen(false)}
              className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdatingPwd || pwdSuccess}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors disabled:opacity-70 shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-indigo-600/20 flex items-center justify-center min-w-[140px]"
            >
              {isUpdatingPwd ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
