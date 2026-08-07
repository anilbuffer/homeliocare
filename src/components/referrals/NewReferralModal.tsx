import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { UploadCloud, Upload, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/components/ui/Card";

interface NewReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (referral: any) => void;
}

const SectionBadge = ({ number, title, optional = false }: { number: number; title: string; optional?: boolean }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-teal text-white text-sm font-semibold shrink-0">
      {number}
    </div>
    <h3 className="text-sm font-semibold text-slate-800">
      {title}
      {optional && <span className="text-slate-400 font-normal ml-2">(If known)</span>}
    </h3>
  </div>
);

export function NewReferralModal({ isOpen, onClose, onSubmit }: NewReferralModalProps) {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [authStatus, setAuthStatus] = useState("Not Started");

  // Determine if the current user has permission to set Clinical Review Approval
  const canApproveClinicalReview = currentUser?.role === "CLINICAL_SUPERVISOR_RN";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = document.getElementById('new-referral-form') as HTMLFormElement;
    let formData = new FormData();
    if(form) formData = new FormData(form);

    const clientName = formData.get('clientName') as string || 'Unknown Patient';
    const clientInitials = clientName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

    const newReferral: any = {
      id: 'ref-' + Math.random().toString(36).substring(2, 9),
      workflowType: 'Referral',
      clientName,
      clientInitials,
      dob: formData.get('dob') as string,
      phone: formData.get('phone') as string,
      source: 'Hospital',
      dateReceived: new Date().toISOString(),
      stage: 'Referral Received',
      daysInStage: 0,
      assignedCoordinator: { name: 'Sarah Johnson' },
      serviceZoneStatus: 'in-zone',
      documents: [],
      consents: [],
      communications: [],
      demographics: {
        gender: formData.get('gender') as string,
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        zip: formData.get('zip') as string,
        email: formData.get('email') as string,
      }
    };

    setTimeout(() => {
      if (onSubmit) onSubmit(newReferral);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const handleDraft = () => {
    setIsDrafting(true);
    setTimeout(() => {
      setIsDrafting(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Referral"
      maxWidth="5xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDraft}
              disabled={isDrafting || isSubmitting}
              className="px-6 py-2.5 text-sm font-medium text-brand-teal bg-white border border-brand-teal rounded-xl hover:bg-teal-50 transition-colors disabled:opacity-70"
            >
              {isDrafting ? "Saving..." : "Save as Draft"}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || isDrafting}
              className="px-6 py-2.5 text-sm font-medium text-white bg-brand-teal rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit Referral"}
            </button>
          </div>
        </div>
      }
    >
      <form id="new-referral-form" className="space-y-4">

        {/* 1. Referral Header */}
        <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <SectionBadge number={1} title="Referral Header" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Referral ID</label>
              <input type="text" readOnly value="REF-2025-000123" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 focus:outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Date Received</label>
              <input type="datetime-local" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Priority</label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                <option>Routine</option>
                <option>Urgent</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Referral Status</label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                <option>New</option>
                <option>In Review</option>
                <option>Pending Documents</option>
                <option>Accepted</option>
                <option>Declined</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Referring Provider / Facility Details */}
        <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <SectionBadge number={2} title="Referring Provider / Facility Details" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-slate-700">Hospital / Facility Name</label>
              <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="General Hospital" />
            </div>
            <div className="space-y-1.5 md:col-span-3">
              <label className="text-xs font-medium text-slate-700">Referring Physician</label>
              <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Dr. Jane Smith" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-slate-700">Discharge Planner Name</label>
              <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Mark Doe" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-slate-700">Contact Details (Phone / Email)</label>
              <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="(555) 123-4567 / mark@hospital.org" />
            </div>
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs font-medium text-slate-700">NPI Number</label>
              <input type="text" pattern="\d{10}" title="Must be a 10-digit number" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="1234567890" />
            </div>
          </div>
        </div>

        {/* 3. Clinical Patient Profile */}
        <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <SectionBadge number={3} title="Clinical Patient Profile" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Patient Name</label>
              <input name="clientName" required type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="John Doe" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Date of Birth</label>
              <input name="dob" type="date" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 block mb-2">Gender</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer"><input type="radio" name="gender" value="Male" className="accent-brand-teal" defaultChecked /> Male</label>
                <label className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer"><input type="radio" name="gender" value="Female" className="accent-brand-teal" /> Female</label>
                <label className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer"><input type="radio" name="gender" value="Other" className="accent-brand-teal" /> Other</label>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Phone Number</label>
              <input name="phone" type="tel" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="(555) 123-4567" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs font-medium text-slate-700">Email Address</label>
              <input name="email" type="email" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="johndoe@email.com" />
            </div>
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs font-medium text-slate-700">Address</label>
              <input name="address" type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="123 Maple Street" />
            </div>
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs font-medium text-slate-700">City</label>
              <input name="city" type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Chicago" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-1">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">State</label>
                <select name="state" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>IL</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">ZIP Code</label>
                <input name="zip" type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="60601" />
              </div>
            </div>
          </div>

          {/* Clinical specific fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Primary Diagnosis / ICD Code(s)</label>
              <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="E11.9 - Type 2 diabetes mellitus" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Allergies</label>
              <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Penicillin, Peanuts" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Medical History</label>
              <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none" placeholder="History of hypertension..." />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Current Medications</label>
              <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none" placeholder="Lisinopril 10mg daily..." />
            </div>
          </div>
        </div>

        {/* 4. Requested Services & Clinical Orders */}
        <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <SectionBadge number={4} title="Requested Services & Clinical Orders" />
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-700 mb-3">Drag & drop files here or</p>
              <button type="button" className="bg-brand-teal text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-teal-600 transition-colors">
                Upload Files
              </button>
              <p className="text-[10px] text-slate-400 mt-2">PNG, JPG, PDF up to 10MB</p>
            </div>
            <div className="w-full md:w-2/3">
              <label className="text-xs font-medium text-slate-700 block mb-3">Required Clinical Documents</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Signed Physician Orders', 'Plan of Care / POC', 'Discharge Summary', 'Face-to-Face Encounter Notes'].map(doc => (
                  <button key={doc} type="button" className="flex items-center justify-between px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                    <span className="truncate mr-2">{doc}</span>
                    <Upload className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Payor & Authorization Details */}
        <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <SectionBadge number={5} title="Payor & Authorization Details" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Primary Insurance</label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                <option>Medicare</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Member ID</label>
              <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="1234 56789A" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Secondary Insurance</label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                <option>Select</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Member ID</label>
              <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Enter Member ID" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Pre-Authorization Status</label>
              <select
                value={authStatus}
                onChange={(e) => setAuthStatus(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
              >
                <option>Not Started</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Denied</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Authorization Number</label>
              <input
                type="text"
                disabled={authStatus !== "Approved"}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal disabled:opacity-50 disabled:bg-slate-50"
                placeholder="Required if Approved"
              />
            </div>
          </div>
        </div>

        {/* 6. Clinical Intake Action & Disposition */}
        <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <SectionBadge number={6} title="Clinical Intake Action & Disposition" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Triage Priority</label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                <option>Standard</option>
                <option>Routine</option>
                <option>Urgent</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Insurance Verification Status</label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Verified</option>
                <option>Issue Found</option>
              </select>
            </div>
            <div className="space-y-1.5 relative">
              <label className="text-xs font-medium text-slate-700 flex items-center justify-between">
                Clinical Review Approval
                {!canApproveClinicalReview && (
                  <span title="Only Clinical Supervisors or RNs can change this" className="flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  </span>
                )}
              </label>
              <select
                disabled={!canApproveClinicalReview}
                className={cn(
                  "w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all",
                  canApproveClinicalReview ? "border-slate-200 focus:ring-brand-teal/20 focus:border-brand-teal" : "border-slate-200 bg-slate-50 cursor-not-allowed opacity-70"
                )}
              >
                <option>Pending</option>
                <option>Approved</option>
                <option>Denied</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Assignment to Care Team</label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                <option>Select Clinical Supervisor / RN</option>
                <option>Jane Smith, RN</option>
                <option>Mike Davis, RN</option>
              </select>
            </div>
          </div>
        </div>

      </form>
    </Modal>
  );
}
