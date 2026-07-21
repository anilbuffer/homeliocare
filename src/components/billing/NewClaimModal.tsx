import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Upload } from "lucide-react";

interface NewClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewClaimModal({ isOpen, onClose }: NewClaimModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      title="Create New Claim"
      description="Enter claim details to generate an 837/CMS-1500 format claim."
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
            {isSubmitting ? "Generating..." : "Generate Claim"}
          </button>
        </>
      }
    >
      <form id="new-claim-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Patient <span className="text-red-500">*</span></label>
            <select required className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all">
              <option value="">Search patient...</option>
              <option value="1">Eleanor Rigby</option>
              <option value="2">James Sullivan</option>
              <option value="3">Martha Jones</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Payer <span className="text-red-500">*</span></label>
            <select required className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all">
              <option value="">Select payer...</option>
              <option value="medicare">Medicare</option>
              <option value="medicaid">Medicaid</option>
              <option value="private">Private Insurance</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Date of Service</label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Service Code (CPT/HCPCS)</label>
            <input
              type="text"
              required
              placeholder="e.g. T1019"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Total Billed Amount ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              placeholder="0.00"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Provider NPI</label>
            <input
              type="text"
              placeholder="10-digit NPI"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Attach Supporting Documents</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-8 w-8 text-slate-400" />
              <div className="flex text-sm text-slate-600">
                <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-brand-teal hover:text-teal-600 focus-within:outline-none">
                  Upload a file
                </span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500">PDF, PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
