"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Upload, ShieldCheck, Mic, MapPin, CheckCircle2, AlertTriangle, Search, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/components/ui/Card";
import { toast } from "sonner";
import { Modal } from "@/components/ui/Modal";

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

export default function NewReferralPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'cancel' | 'draft' | 'submit' | null>(null);
  const [authStatus, setAuthStatus] = useState("Not Started");

  // AI & Smart Features State
  const [isDictating, setIsDictating] = useState(false);
  const [addressStatus, setAddressStatus] = useState<'idle' | 'in-zone' | 'out-of-zone'>('idle');
  const [showProviderSuggestions, setShowProviderSuggestions] = useState(false);
  const [highlightFields, setHighlightFields] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    facilityName: '',
    physicianName: '',
    plannerName: '',
    contactDetails: '',
    npi: '',
    clientName: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'IL',
    zip: '',
    gender: 'Male',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'address') {
      if (value.length > 5) {
        if (value.toLowerCase().includes('chicago') || value.toLowerCase().includes('north')) {
          setAddressStatus('in-zone');
        } else if (value.toLowerCase().includes('south')) {
          setAddressStatus('out-of-zone');
        } else {
          setAddressStatus('idle');
        }
      } else {
        setAddressStatus('idle');
      }
    }

    if (name === 'facilityName' || name === 'physicianName') {
      if (value.length > 2) setShowProviderSuggestions(true);
      else setShowProviderSuggestions(false);
    }
  };

  const applyProviderAutoFill = () => {
    setFormData(prev => ({
      ...prev,
      facilityName: 'General Hospital',
      physicianName: 'Dr. Jane Smith',
      plannerName: 'Mark Doe',
      contactDetails: '(555) 123-4567 / mark@hospital.org',
      npi: '1234567890'
    }));
    setShowProviderSuggestions(false);
    triggerHighlight(['facilityName', 'physicianName', 'plannerName', 'contactDetails', 'npi']);
  };

  const handleDictate = () => {
    setIsDictating(true);
    setTimeout(() => {
      setIsDictating(false);
      setFormData(prev => ({
        ...prev,
        clientName: 'Robert Williams',
        dob: '1945-05-12',
        phone: '(312) 555-9876',
        email: 'robert.w@email.com',
        address: '456 North Avenue',
        city: 'Chicago',
        zip: '60614',
        gender: 'Male',
        facilityName: 'Northwestern Memorial',
        physicianName: 'Dr. Alan Grant',
        npi: '9876543210',
        contactDetails: '(312) 926-2000'
      }));
      setAddressStatus('in-zone');
      triggerHighlight(['clientName', 'dob', 'phone', 'email', 'address', 'city', 'zip', 'facilityName', 'physicianName', 'npi', 'contactDetails']);
    }, 3000);
  };

  const triggerHighlight = (fields: string[]) => {
    const newHighlights: Record<string, boolean> = {};
    fields.forEach(f => newHighlights[f] = true);
    setHighlightFields(newHighlights);
    setTimeout(() => {
      setHighlightFields({});
    }, 2000);
  };

  const canApproveClinicalReview = currentUser?.role === "CLINICAL_SUPERVISOR_RN";

  const executeSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Referral created successfully");
      router.back();
    }, 600);
  };

  const executeConfirmAction = () => {
    if (confirmAction === 'cancel') {
      router.back();
    } else if (confirmAction === 'draft') {
      setIsDrafting(true);
      setTimeout(() => {
        setIsDrafting(false);
        toast.success("Draft saved successfully");
        router.back();
      }, 1000);
    } else if (confirmAction === 'submit') {
      executeSubmit();
    }
    setConfirmAction(null);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6 pb-6 pt-2">
        {/* Header */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200">
          <button
            onClick={() => router.back()}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Create New Referral</h1>
            <p className="text-sm text-slate-500">Log a new patient referral into the system</p>
          </div>
        </div>

        <form id="new-referral-form" className="space-y-4">
          {/* AI Action Bar */}
          <div className="bg-gradient-to-r from-brand-teal/5 to-blue-50/50 backdrop-blur-xl rounded-2xl p-4 border border-brand-teal/10 flex items-center justify-between shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-full", isDictating ? "bg-red-100 text-red-600 animate-pulse" : "bg-brand-teal/10 text-brand-teal")}>
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">AI Voice Dictation</h3>
                <p className="text-xs text-slate-500">Speak naturally to auto-fill the referral form</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDictate}
              disabled={isDictating}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-xl transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] border",
                isDictating
                  ? "bg-red-50 text-red-600 border-red-200"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              )}
            >
              {isDictating ? "Recording..." : "Start Dictation"}
            </button>
          </div>

          {/* 1. Referral Header */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={1} title="Referral Header" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Referral ID</label>
                <input type="text" readOnly value="REF-2025-000123" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Date Received</label>
                <input type="datetime-local" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Priority</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Routine</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Referral Status</label>
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
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={2} title="Referring Provider / Facility Details" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-1.5 md:col-span-2 relative">
                <label className="text-sm font-medium text-slate-700">Hospital / Facility Name</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="facilityName" value={formData.facilityName} onChange={handleInputChange} type="text" className={cn("w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['facilityName'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="General Hospital" />
                </div>
                {showProviderSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
                    <button type="button" onClick={applyProviderAutoFill} className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between group transition-colors">
                      <div>
                        <div className="text-sm font-medium text-slate-800 group-hover:text-brand-teal transition-colors">General Hospital</div>
                        <div className="text-xs text-slate-500">NPI: 1234567890 • Dr. Jane Smith</div>
                      </div>
                      <div className="text-xs font-medium text-brand-teal bg-brand-teal/10 px-2 py-1 rounded-md">Auto-fill</div>
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-1.5 md:col-span-3">
                <label className="text-sm font-medium text-slate-700">Referring Physician</label>
                <input name="physicianName" value={formData.physicianName} onChange={handleInputChange} type="text" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['physicianName'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="Dr. Jane Smith" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Discharge Planner Name</label>
                <input name="plannerName" value={formData.plannerName} onChange={handleInputChange} type="text" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['plannerName'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="Mark Doe" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Contact Details (Phone / Email)</label>
                <input name="contactDetails" value={formData.contactDetails} onChange={handleInputChange} type="text" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['contactDetails'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="(555) 123-4567 / mark@hospital.org" />
              </div>
              <div className="space-y-1.5 md:col-span-1">
                <label className="text-sm font-medium text-slate-700 flex items-center justify-between">NPI Number <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" /></label>
                <input name="npi" value={formData.npi} onChange={handleInputChange} type="text" pattern="\d{10}" title="Must be a 10-digit number" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['npi'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="1234567890" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="space-y-1.5 md:col-span-1">
                <label className="text-sm font-medium text-slate-700">Referral Source Type</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Select</option>
                  <option>Hospital Discharge</option>
                  <option>Physician Office</option>
                  <option>ALF / SNF</option>
                  <option>Insurance Case Manager</option>
                  <option>Self-Referral / Family</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1.5 md:col-span-1">
                <label className="text-sm font-medium text-slate-700">Discharge Date (if applicable)</label>
                <input type="date" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Reason for Referral</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="e.g. Needs post-op wound care and PT" />
              </div>
            </div>
          </div>

          {/* 3. Clinical Patient Profile */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={3} title="Clinical Patient Profile" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Patient Name</label>
                <input name="clientName" value={formData.clientName} onChange={handleInputChange} required type="text" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['clientName'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="John Doe" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Preferred Name</label>
                <input name="preferredName" type="text" className="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal border-slate-200" placeholder="Johnny" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Date of Birth</label>
                <input name="dob" value={formData.dob} onChange={handleInputChange} type="date" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['dob'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">SSN / MBI</label>
                <input name="ssn" type="text" className="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal border-slate-200" placeholder="XXX-XX-XXXX" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 block mb-2">Gender</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer"><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleInputChange} className="accent-brand-teal" /> Male</label>
                  <label className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer"><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleInputChange} className="accent-brand-teal" /> Female</label>
                  <label className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer"><input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleInputChange} className="accent-brand-teal" /> Other</label>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Race / Ethnicity</label>
                <select name="race" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Select</option>
                  <option>American Indian / Alaska Native</option>
                  <option>Asian</option>
                  <option>Black / African American</option>
                  <option>Hispanic or Latino</option>
                  <option>Native Hawaiian / Pacific Islander</option>
                  <option>White</option>
                  <option>Decline to specify</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Preferred Language</label>
                <div className="flex items-center gap-2">
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="English" />
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 shrink-0 cursor-pointer">
                    <input type="checkbox" className="rounded text-brand-teal focus:ring-brand-teal border-slate-300" />
                    Interpreter?
                  </label>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Marital Status</label>
                <select name="maritalStatus" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Select</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['phone'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Living Situation</label>
                <select name="livingSituation" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Select</option>
                  <option>Lives Alone</option>
                  <option>Lives with Family/Spouse</option>
                  <option>Assisted Living Facility</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Primary Caregiver at Home</label>
                <input name="primaryCaregiver" type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Name and Relationship (if any)" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1.5 md:col-span-1">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input name="email" value={formData.email} onChange={handleInputChange} type="email" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['email'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="johndoe@email.com" />
              </div>
              <div className="space-y-1.5 md:col-span-1">
                <label className="text-sm font-medium text-slate-700 flex items-center justify-between">
                  Address
                  {addressStatus === 'in-zone' && <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shadow-sm border border-emerald-200"><CheckCircle2 className="w-3 h-3" /> In-Zone (North)</span>}
                  {addressStatus === 'out-of-zone' && <span className="flex items-center gap-1 text-[10px] font-medium text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded shadow-sm border border-rose-200"><AlertTriangle className="w-3 h-3" /> Out-of-Service Area</span>}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="address" value={formData.address} onChange={handleInputChange} type="text" className={cn("w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['address'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="123 Maple Street" />
                </div>
              </div>
              <div className="space-y-1.5 md:col-span-1">
                <label className="text-sm font-medium text-slate-700">City</label>
                <input name="city" value={formData.city} onChange={handleInputChange} type="text" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['city'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="Chicago" />
              </div>
              <div className="grid grid-cols-2 gap-4 md:col-span-1">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">State</label>
                  <select name="state" value={formData.state} onChange={handleInputChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                    <option>IL</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">ZIP Code</label>
                  <input name="zip" value={formData.zip} onChange={handleInputChange} type="text" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['zip'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="60601" />
                </div>
              </div>
            </div>

            <hr className="border-slate-100 my-6" />

            {/* Clinical specific fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Primary Diagnosis (ICD-10 Code)</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="E11.9 - Type 2 diabetes mellitus" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Secondary Diagnoses</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="I10 - Essential hypertension" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Allergies (with reaction type)</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Penicillin (Rash), Peanuts" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Advance Directive Status</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Select</option>
                  <option>Full Code</option>
                  <option>DNR (Do Not Resuscitate)</option>
                  <option>DNI (Do Not Intubate)</option>
                  <option>Living Will / Healthcare Proxy</option>
                  <option>Unknown</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Current Medications (drug, dose, freq)</label>
                <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none" placeholder="Lisinopril 10mg daily..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Recent Hospitalizations (dates, reason)</label>
                <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none" placeholder="Jan 12-15: Pneumonia" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Past Medical/Surgical History</label>
                <textarea rows={2} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none" placeholder="Appendectomy 2010, History of hypertension..." />
              </div>
            </div>
          </div>

          {/* 4. Functional & Risk Assessment */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={4} title="Functional & Risk Assessment" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Mobility Status / Ambulation Aids</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="e.g. Uses walker, wheelchair" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Fall Risk Score / History</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="e.g. High risk, 2 falls in last month" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">ADL / IADL Needs</label>
                <textarea rows={2} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none" placeholder="Needs help with bathing, meal prep..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Cognitive Status Screening</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Select</option>
                  <option>Alert and oriented</option>
                  <option>Mild cognitive impairment</option>
                  <option>Dementia / Alzheimer's</option>
                  <option>Confusion</option>
                </select>
              </div>
            </div>
          </div>

          {/* 5. Services Requested */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={5} title="Services Requested & Preferences" />
            <div className="space-y-3 mb-6">
              <label className="text-sm font-medium text-slate-700 block">Type of Care Needed (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Skilled Nursing', 'PT / OT / ST', 'Home Health Aide', 'Personal Care', 'Companion Care', 'Medical Social Worker'].map(service => (
                  <label key={service} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded text-brand-teal focus:ring-brand-teal border-slate-300" />
                    {service}
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Requested Start-of-Care Date</label>
                <input type="date" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Requested Frequency</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="e.g. 3 visits/week" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Special Skill Requirements</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="e.g. Wound care certified, ventilator" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Caregiver Preferences (Language/Gender)</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="e.g. Female, Spanish speaking" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Access Instructions & Pet Notes</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="e.g. Gate code: 1234, friendly dog" />
              </div>
            </div>
          </div>

          {/* 6. Clinical Orders & Documents */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={6} title="Clinical Orders & Documents" />
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
                <label className="text-sm font-medium text-slate-700 block mb-3">Required Clinical Documents</label>
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

          {/* 7. Emergency Contacts & Family/Responsible Party */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={7} title="Emergency Contacts & Family/Responsible Party" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Primary/Emergency Contact Name</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Jane Doe" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Relationship</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="e.g. Daughter" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input type="tel" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="janedoe@email.com" />
              </div>
            </div>
            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded w-4 h-4 text-brand-teal focus:ring-brand-teal border-slate-300" />
                Responsible Party / Legal Guardian / POA
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded w-4 h-4 text-brand-teal focus:ring-brand-teal border-slate-300" />
                Consent for Family Portal Access
              </label>
            </div>
          </div>

          {/* 8. Payor & Authorization Details */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={8} title="Payor & Authorization Details" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Primary Insurance</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Medicare</option>
                  <option>Medicaid</option>
                  <option>Private Insurance</option>
                  <option>Private Pay</option>
                  <option>VA</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Member ID</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="1234 56789A" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Group Number</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="e.g. GRP12345" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Insurance Phone</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="For eligibility check" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Secondary Insurance</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Select</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Member ID</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Enter Member ID" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Group Number</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="e.g. GRP67890" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Policyholder Name/Rel</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="If not patient" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Pre-Authorization Status</label>
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
                <label className="text-sm font-medium text-slate-700">Authorization Number</label>
                <input
                  type="text"
                  disabled={authStatus !== "Approved"}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal disabled:opacity-50 disabled:bg-slate-50"
                  placeholder="Required if Approved"
                />
              </div>
            </div>
          </div>

          {/* 9. Consents & Legal Documentation */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={9} title="Consents & Legal Documentation" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {[
                'Consent to Treat (Signed & Dated)',
                'HIPAA Notice of Privacy Practices',
                'Financial Responsibility Agreement',
                'Advance Directive Acknowledgment',
                'Photo/Video Consent (Optional)',
                'Release of Medical Records'
              ].map(consent => (
                <label key={consent} className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <input type="checkbox" className="rounded w-4 h-4 text-brand-teal focus:ring-brand-teal border-slate-300" />
                  {consent}
                </label>
              ))}
            </div>
          </div>

          {/* 10. Clinical Intake Action & Disposition */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={10} title="Clinical Intake Action & Disposition" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Triage Priority</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Standard</option>
                  <option>Routine</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Insurance Verification Status</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Verified</option>
                  <option>Issue Found</option>
                </select>
              </div>
              <div className="space-y-1.5 relative">
                <label className="text-sm font-medium text-slate-700 flex items-center justify-between">
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
                <label className="text-sm font-medium text-slate-700">Assignment to Care Team</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Select Clinical Supervisor / RN</option>
                  <option>Jane Smith, RN</option>
                  <option>Mike Davis, RN</option>
                </select>
              </div>
            </div>
          </div>

        </form>
      </div>

      {/* Sticky Action Bar at Bottom */}
      <div className="sticky -bottom-8 -mb-6 mt-8 py-4 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <button
            type="button"
            onClick={() => setConfirmAction('cancel')}
            className="w-full md:w-auto px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <div className="w-full md:w-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => setConfirmAction('draft')}
              disabled={isDrafting || isSubmitting}
              className="px-4 py-2 text-sm font-medium text-brand-teal bg-white border border-brand-teal rounded-xl hover:bg-teal-50 transition-colors disabled:opacity-70"
            >
              {isDrafting ? "Saving..." : "Save as Draft"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmAction('submit')}
              disabled={isSubmitting || isDrafting}
              className="w-full md:w-auto px-6 py-2 text-sm font-medium text-white bg-brand-teal rounded-xl hover:bg-teal-700 transition-colors shadow-[0_6px_20px_rgba(13,148,136,0.3)] disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit Referral"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Modal
        isOpen={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
        title={
          confirmAction === 'cancel' ? "Cancel Referral?" :
            confirmAction === 'draft' ? "Save as Draft?" :
              "Submit Referral?"
        }
        maxWidth="sm"
        footer={
          <div className="flex w-full justify-end gap-3">
            <button
              onClick={() => setConfirmAction(null)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              No, go back
            </button>
            <button
              onClick={executeConfirmAction}
              className={cn(
                "px-4 py-2 text-sm font-medium text-white rounded-lg",
                confirmAction === 'cancel' ? "bg-red-600 hover:bg-red-700" : "bg-brand-teal hover:bg-teal-700"
              )}
            >
              Yes, {confirmAction === 'cancel' ? 'cancel' : confirmAction === 'draft' ? 'save draft' : 'submit'}
            </button>
          </div>
        }
      >
        <p className="text-sm text-slate-600">
          {confirmAction === 'cancel' && "Are you sure you want to cancel? Any unsaved changes will be lost."}
          {confirmAction === 'draft' && "Are you sure you want to save this referral as a draft? You can continue editing later."}
          {confirmAction === 'submit' && "Are you sure you want to submit this referral? This action will process the form."}
        </p>
      </Modal>
    </>
  );
}
