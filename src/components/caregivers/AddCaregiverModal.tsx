import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Upload, X } from "lucide-react";

interface AddCaregiverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCaregiverModal({ isOpen, onClose }: AddCaregiverModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(currentSkill.trim())) {
        setSkills([...skills, currentSkill.trim()]);
      }
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Caregiver"
      description="Create a new profile and upload compliance documents."
      maxWidth="xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-teal rounded-full hover:bg-brand-teal/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Caregiver"}
          </button>
        </>
      }
    >
      <form id="add-caregiver-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
              placeholder="e.g. Sarah Connor"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Role <span className="text-red-500">*</span></label>
            <select required className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all">
              <option value="">Select role...</option>
              <option value="hha">Home Health Aide (HHA)</option>
              <option value="rn">Registered Nurse (RN)</option>
              <option value="lpn">Licensed Practical Nurse (LPN)</option>
              <option value="pt">Physical Therapist (PT)</option>
              <option value="ot">Occupational Therapist (OT)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Email Address</label>
            <input
              type="email"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
              placeholder="sarah@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Phone Number</label>
            <input
              type="tel"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Skills & Qualifications</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill) => (
              <span key={skill} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-teal/10 text-brand-teal">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)} className="hover:text-teal-700 focus:outline-none">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleAddSkill}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            placeholder="Type a skill and press Enter (e.g. Wound Care, CPR)"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Compliance Documents</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-8 w-8 text-slate-400" />
              <div className="flex text-sm text-slate-600">
                <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-brand-teal hover:text-teal-600 focus-within:outline-none">
                  Upload credentials
                </span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500">License, Background Check, TB Test (PDF, up to 10MB)</p>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
