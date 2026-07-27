"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Edit3, CheckCircle2, User, Phone, Mail, MapPin, DollarSign, Briefcase } from "lucide-react";
import { Caregiver } from "@/lib/caregivers/mockData";

interface EditCaregiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiver: Caregiver;
  onSave: (updated: Partial<Caregiver>) => void;
}

export function EditCaregiverModal({
  isOpen,
  onClose,
  caregiver,
  onSave,
}: EditCaregiverModalProps) {
  const [formData, setFormData] = useState({
    name: caregiver.name,
    role: caregiver.role,
    phone: caregiver.phone,
    email: caregiver.email,
    address: caregiver.address,
    payRate: caregiver.payRate,
    employmentType: caregiver.employmentType,
    emergencyContact: caregiver.emergencyContact,
    languages: caregiver.languages.join(", "),
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      role: formData.role,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      payRate: parseFloat(formData.payRate as any) || caregiver.payRate,
      employmentType: formData.employmentType,
      emergencyContact: formData.emergencyContact,
      languages: formData.languages.split(",").map((s) => s.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Caregiver Profile"
      description={`Update HR file and contact information for ${caregiver.name}`}
      icon={<Edit3 className="w-6 h-6 text-brand-teal" />}
      maxWidth="2xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-emerald-600 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Save Profile Changes
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Job Title / Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white"
            >
              <option value="Registered Nurse (RN)">Registered Nurse (RN)</option>
              <option value="Licensed Practical Nurse (LPN)">Licensed Practical Nurse (LPN)</option>
              <option value="Certified Nursing Assistant (CNA)">Certified Nursing Assistant (CNA)</option>
              <option value="Home Health Aide (HHA)">Home Health Aide (HHA)</option>
              <option value="Personal Care Assistant (PCA)">Personal Care Assistant (PCA)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Physical Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Pay Rate ($/hr)
            </label>
            <input
              type="number"
              step="0.50"
              value={formData.payRate}
              onChange={(e) => handleChange("payRate", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Employment Type
            </label>
            <select
              value={formData.employmentType}
              onChange={(e) => handleChange("employmentType", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white"
            >
              <option value="W2">W2 Employee</option>
              <option value="1099">1099 Contractor</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Emergency Contact
            </label>
            <input
              type="text"
              value={formData.emergencyContact}
              onChange={(e) => handleChange("emergencyContact", e.target.value)}
              placeholder="Name & Relationship (Phone)"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Languages Spoken (comma separated)
            </label>
            <input
              type="text"
              value={formData.languages}
              onChange={(e) => handleChange("languages", e.target.value)}
              placeholder="English, Spanish, Creole"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
