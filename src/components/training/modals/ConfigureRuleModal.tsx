"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Sliders, ShieldCheck, Check, Plus, Trash2 } from "lucide-react";

interface ConfigureRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRule: (rule: any) => void;
}

export function ConfigureRuleModal({ isOpen, onClose, onSaveRule }: ConfigureRuleModalProps) {
  const [role, setRole] = useState("RN");
  const [gracePeriod, setGracePeriod] = useState("30");
  const [autoAssign, setAutoAssign] = useState(true);
  const [recertInterval, setRecertInterval] = useState("12");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveRule({
      role,
      gracePeriod: `${gracePeriod} Days`,
      autoAssign,
      recertInterval: `${recertInterval} Months`,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configure Required Training Rule"
      description="Define mandatory compliance courses & onboarding timelines by caregiver role"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Target Role */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Target Caregiver Role *
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-medium text-slate-800"
          >
            <option value="Registered Nurse (RN)">Registered Nurse (RN)</option>
            <option value="Certified Nursing Assistant (CNA)">Certified Nursing Assistant (CNA)</option>
            <option value="Home Health Aide (HHA)">Home Health Aide (HHA)</option>
            <option value="Licensed Practical Nurse (LPN)">Licensed Practical Nurse (LPN)</option>
            <option value="All Roles (Global Rule)">All Roles (Global Rule)</option>
          </select>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              New Hire Due Window
            </label>
            <select
              value={gracePeriod}
              onChange={(e) => setGracePeriod(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-medium text-slate-800"
            >
              <option value="14">14 Days Post-Hire</option>
              <option value="30">30 Days Post-Hire (Standard)</option>
              <option value="60">60 Days Post-Hire</option>
              <option value="90">90 Days Post-Hire</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Recertification Cycle
            </label>
            <select
              value={recertInterval}
              onChange={(e) => setRecertInterval(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-medium text-slate-800"
            >
              <option value="6">Every 6 Months</option>
              <option value="12">Annual (Every 12 Months)</option>
              <option value="24">Bi-Annual (Every 24 Months)</option>
            </select>
          </div>
        </div>

        {/* Auto Assign Toggle */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 block">Auto-Assign to New Hires</span>
            <span className="text-[11px] text-slate-500">Automatically add required modules upon account creation</span>
          </div>
          <button
            type="button"
            onClick={() => setAutoAssign(!autoAssign)}
            className={`w-11 h-6 rounded-full p-1 transition-colors relative flex items-center cursor-pointer ${autoAssign ? "bg-brand-teal" : "bg-slate-300"
              }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform ${autoAssign ? "translate-x-5" : "translate-x-0"
                }`}
            />
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold bg-brand-teal hover:bg-[#0c8a6f] text-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Save Rule Configuration
          </button>
        </div>
      </form>
    </Modal>
  );
}
