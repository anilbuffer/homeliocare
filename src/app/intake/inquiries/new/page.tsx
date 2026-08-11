"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Upload, Mic, MapPin, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";
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

export default function NewInquiryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'cancel' | 'draft' | 'submit' | null>(null);

  // AI & Smart Features State
  const [isDictating, setIsDictating] = useState(false);
  const [addressStatus, setAddressStatus] = useState<'idle' | 'in-zone' | 'out-of-zone'>('idle');
  const [highlightFields, setHighlightFields] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
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
  };

  const handleDictate = () => {
    setIsDictating(true);
    setTimeout(() => {
      setIsDictating(false);
      setFormData(prev => ({
        ...prev,
        clientName: 'Mary Reynolds',
        dob: '1955-08-22',
        phone: '(312) 555-1234',
        email: 'mary.r@email.com',
        address: '789 South Street',
        city: 'Chicago',
        zip: '60616',
        gender: 'Female',
      }));
      setAddressStatus('out-of-zone');
      triggerHighlight(['clientName', 'dob', 'phone', 'email', 'address', 'city', 'zip']);
    }, 2500);
  };

  const triggerHighlight = (fields: string[]) => {
    const newHighlights: Record<string, boolean> = {};
    fields.forEach(f => newHighlights[f] = true);
    setHighlightFields(newHighlights);
    setTimeout(() => {
      setHighlightFields({});
    }, 2000);
  };

  const executeSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Inquiry created successfully");
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
            <h1 className="text-xl font-bold text-slate-900">Create New Inquiry</h1>
            <p className="text-sm text-slate-500">Log a new patient inquiry into the system</p>
          </div>
        </div>

        <form id="new-inquiry-form" className="space-y-4">
          {/* AI Action Bar */}
          <div className="bg-gradient-to-r from-brand-teal/5 to-blue-50/50 backdrop-blur-xl rounded-2xl p-4 border border-brand-teal/10 flex items-center justify-between shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-full", isDictating ? "bg-red-100 text-red-600 animate-pulse" : "bg-brand-teal/10 text-brand-teal")}>
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">AI Voice Dictation</h3>
                <p className="text-xs text-slate-500">Speak naturally to log the patient inquiry</p>
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
              {isDictating ? "Recording..." : "Dictate Inquiry"}
            </button>
          </div>

          {/* 1. Inquiry Information */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={1} title="Inquiry Information" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Inquiry ID</label>
                <input type="text" readOnly value="INQ-2025-000123" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Date & Time</label>
                <input type="datetime-local" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Intake Coordinator</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Sarah Johnson</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Priority</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Routine</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Inquiry Status</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>New</option>
                  <option>In Progress</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Source of Inquiry */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={2} title="Source of Inquiry" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Source Type *</label>
                <select required className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Website</option>
                  <option>Phone</option>
                  <option>Walk-in</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Communication Channel *</label>
                <select required className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Website Form</option>
                  <option>Direct Call</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">How did you hear about us?</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Search Engine (Google)</option>
                  <option>Friend/Family</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Campaign / Source (Optional)</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Home Care Services Ad" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Additional Source Details (Optional)</label>
              <textarea rows={2} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none" placeholder="Website landing page - Home Care Services" />
            </div>
          </div>

          {/* 3. Patient Information */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={3} title="Patient Information" optional />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Patient Name</label>
                <input name="clientName" value={formData.clientName} onChange={handleInputChange} required type="text" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['clientName'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="John Doe" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Date of Birth</label>
                <input name="dob" value={formData.dob} onChange={handleInputChange} type="date" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['dob'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 block mb-2">Gender</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer"><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleInputChange} className="accent-brand-teal" /> Male</label>
                  <label className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer"><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleInputChange} className="accent-brand-teal" /> Female</label>
                  <label className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer"><input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleInputChange} className="accent-brand-teal" /> Other</label>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className={cn("w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-colors", highlightFields['phone'] ? "bg-brand-teal/5 border-brand-teal" : "border-slate-200")} placeholder="(555) 123-4567" />
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
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer w-fit">
              <input type="checkbox" className="rounded text-brand-teal focus:ring-brand-teal border-slate-300" />
              Patient address unknown
            </label>
          </div>

          {/* 4. Primary Contact Information */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={4} title="Primary Contact Information" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input name="primaryContactName" type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Jane Doe" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Relationship to Patient</label>
                <select name="primaryContactRelationship" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Daughter</option>
                  <option>Spouse</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input name="primaryContactPhone" type="tel" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="(555) 987-6543" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input name="primaryContactEmail" type="email" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="janedoe@email.com" />
              </div>
            </div>
          </div>

          {/* 5. Inquiry Details */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={5} title="Inquiry Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
              <div>
                <div className="space-y-1.5 mb-6">
                  <label className="text-sm font-medium text-slate-700">Nature of Inquiry *</label>
                  <select required className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                    <option>General Question</option>
                    <option>Service Request</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 block">Services Interested In (Select all that apply)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Skilled Nursing', 'Physical Therapy', 'Occupational Therapy', 'Speech Therapy', 'Home Health Aide', 'Medical Social Worker', 'Hospice Care', 'Other'].map(service => (
                      <label key={service} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <input type="checkbox" defaultChecked={['Skilled Nursing', 'Physical Therapy'].includes(service)} className="rounded text-brand-teal focus:ring-brand-teal border-slate-300" />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 block">Preferred Contact Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"><input type="radio" name="contactMethod" className="accent-brand-teal" defaultChecked /> Phone Call</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"><input type="radio" name="contactMethod" className="accent-brand-teal" /> Email</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"><input type="radio" name="contactMethod" className="accent-brand-teal" /> Text Message</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"><input type="radio" name="contactMethod" className="accent-brand-teal" /> WhatsApp</label>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Best Time to Contact</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                    <option>Afternoon (12 PM - 5 PM)</option>
                    <option>Morning (8 AM - 12 PM)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Additional Notes / Comments</label>
              <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none" placeholder="Patient is looking for information about post-surgery home care services." />
            </div>
          </div>

          {/* 6. Insurance Information */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={6} title="Insurance Information" optional />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Primary Insurance</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Medicare</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Member ID (Optional)</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="1234 56789A" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Secondary Insurance</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Select</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Member ID (Optional)</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" placeholder="Enter Member ID" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer w-fit">
              <input type="checkbox" className="rounded text-brand-teal focus:ring-brand-teal border-slate-300" />
              Insurance information not available
            </label>
          </div>

          {/* 7. Documents */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={7} title="Documents" optional />
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
                <label className="text-sm font-medium text-slate-700 block mb-3">Suggested Documents (If available)</label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {['Insurance Card (Front)', 'Insurance Card (Back)', 'ID Proof', 'Discharge Summary', 'Referral/Physician Order', 'Other Documents'].map(doc => (
                    <button key={doc} type="button" className="flex items-center justify-between px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                      <span className="truncate mr-2">{doc}</span>
                      <Upload className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 8. Internal Notes & Follow-up */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={8} title="Internal Notes & Follow-up" />
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Intake Notes (Internal use only)</label>
                <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none" placeholder="Add internal notes here..." />
                <div className="text-[10px] text-slate-400 text-right">0 / 1000 characters</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <div className="space-y-1.5 flex-1">
                  <label className="text-sm font-medium text-slate-700 block mb-2">Follow-up Required</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer"><input type="radio" name="followup" className="accent-brand-teal" defaultChecked /> Yes</label>
                    <label className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer"><input type="radio" name="followup" className="accent-brand-teal" /> No</label>
                  </div>
                </div>
                <div className="space-y-1.5 flex-1">
                  <label className="text-sm font-medium text-slate-700">Follow-up Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <label className="text-sm font-medium text-slate-700">Assigned To</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                    <option>Select Coordinator</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 9. Outcome */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <SectionBadge number={9} title="Outcome & Next Actions" />
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Current Outcome</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Need More Information</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Next Action</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal">
                  <option>Call Patient for More Details</option>
                </select>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Comments</label>
                <textarea rows={2} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none" placeholder="Will call the patient to gather more details about services needed and insurance." />
              </div>
            </div>
          </div>

        </form>
      </div>

      {/* Sticky Action Bar at Bottom */}
      <div className="sticky -bottom-8 -mb-6 mt-8 py-4 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-5xl mx-auto gap-2 flex flex-col md:flex-row items-center justify-between">
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
              className="w-full md:w-auto px-4 py-2 text-sm font-medium text-brand-teal bg-white border border-brand-teal rounded-xl hover:bg-teal-50 transition-colors disabled:opacity-70"
            >
              {isDrafting ? "Saving..." : "Save as Draft"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmAction('submit')}
              disabled={isSubmitting || isDrafting}
              className="w-full md:w-auto px-6 py-2 text-sm font-medium text-white bg-brand-teal rounded-xl hover:bg-teal-700 transition-colors shadow-[0_6px_20px_rgba(13,148,136,0.3)] disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit Inquiry"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Modal
        isOpen={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
        title={
          confirmAction === 'cancel' ? "Cancel Inquiry?" :
            confirmAction === 'draft' ? "Save as Draft?" :
              "Submit Inquiry?"
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
          {confirmAction === 'draft' && "Are you sure you want to save this inquiry as a draft? You can continue editing later."}
          {confirmAction === 'submit' && "Are you sure you want to submit this inquiry? This action will process the form."}
        </p>
      </Modal>
    </>
  );
}
