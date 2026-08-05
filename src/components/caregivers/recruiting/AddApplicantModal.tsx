"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { UserPlus } from "lucide-react";

interface AddApplicantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddApplicantModal({ isOpen, onClose }: AddApplicantModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    source: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    onClose();
    // Usually a toast would be triggered here in the parent, or here if we pass a callback
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Applicant"
      description="Enter candidate details to add them to the recruiting pipeline."
      maxWidth="md"
      icon={<div className="p-2 bg-brand-teal/10 rounded-full text-brand-teal"><UserPlus className="w-5 h-5" /></div>}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl bg-brand-teal text-white text-sm font-semibold hover:bg-brand-teal/90 transition-colors shadow-sm"
          >
            Add Applicant
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700 block">Full Name</label>
          <input
            type="text"
            placeholder="e.g. Jane Doe"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal/40 transition-colors"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700 block">Role Applying For</label>
          <select
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal/40 transition-colors"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="">Select a role...</option>
            <option value="RN">Registered Nurse (RN)</option>
            <option value="LPN">Licensed Practical Nurse (LPN)</option>
            <option value="CNA">Certified Nursing Assistant (CNA)</option>
            <option value="HHA">Home Health Aide (HHA)</option>
            <option value="Companion">Companion</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 block">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal/40 transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 block">Phone Number</label>
            <input
              type="tel"
              placeholder="(555) 000-0000"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal/40 transition-colors"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700 block">Application Source</label>
          <select
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal/40 transition-colors"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
          >
            <option value="">Select source...</option>
            <option value="Indeed">Indeed</option>
            <option value="Website">Company Website</option>
            <option value="Referral">Employee Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </form>
    </Modal>
  );
}
