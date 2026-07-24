"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UserPlus,
  AlertTriangle,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Check,
  BadgeCheck,
  Car,
  HeartPulse,
  UserCheck
} from "lucide-react";
import { Candidate, CandidateSource, CandidateStage } from "@/types/hr";

interface AddCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingCandidates: Candidate[];
  onAddCandidate: (newCandidate: Candidate) => void;
}

type TabType = "personal" | "role" | "credentials" | "pipeline";

export function AddCandidateModal({
  isOpen,
  onClose,
  existingCandidates,
  onAddCandidate
}: AddCandidateModalProps) {
  // Form State
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  // Personal Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("Austin, TX");
  const [preferredContact, setPreferredContact] = useState<"Phone" | "SMS" | "Email">("Phone");

  // Role & Experience
  const [positionApplied, setPositionApplied] = useState("Certified Nursing Assistant (CNA)");
  const [source, setSource] = useState<CandidateSource>("Indeed");
  const [experienceYears, setExperienceYears] = useState(2);
  const [desiredPay, setDesiredPay] = useState("$19.50 / hr");
  const [availability, setAvailability] = useState("Full-Time (Days & Weekends)");
  const [assignedRecruiter, setAssignedRecruiter] = useState("Sarah Jenkins (HR)");

  // Credentials & Certifications
  const [licenseType, setLicenseType] = useState<"CNA" | "HHA" | "RN" | "LPN" | "Companion">("CNA");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [cprCertified, setCprCertified] = useState(true);
  const [hasDriverLicense, setHasDriverLicense] = useState(true);
  const [tbStatus, setTbStatus] = useState<"Pending" | "Negative" | "Chest X-Ray Required" | "Completed">("Negative");

  // Pipeline & Notes
  const [stage, setStage] = useState<CandidateStage>("Applied");
  const [autoTriggerBackground, setAutoTriggerBackground] = useState(true);
  const [initialNotes, setInitialNotes] = useState("");

  // Override duplicate flag
  const [overrideDuplicate, setOverrideDuplicate] = useState(false);

  // Real-time duplicate candidate detection
  const duplicateMatch = useMemo(() => {
    if (!name && !email && !phone) return null;

    const lowerName = name.toLowerCase().trim();
    const lowerEmail = email.toLowerCase().trim();
    const cleanPhone = phone.replace(/\D/g, "");

    return (
      existingCandidates.find((c) => {
        const matchName = lowerName.length > 3 && c.name.toLowerCase().includes(lowerName);
        const matchEmail = lowerEmail.length > 3 && c.email.toLowerCase() === lowerEmail;
        const matchPhone = cleanPhone.length > 5 && c.phone.replace(/\D/g, "") === cleanPhone;
        return matchName || matchEmail || matchPhone;
      }) || null
    );
  }, [name, email, phone, existingCandidates]);

  if (!isOpen) return null;

  const getInitials = (fullName: string) => {
    if (!fullName.trim()) return "NC";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleQuickPreset = (exp: number) => {
    setExperienceYears(exp);
  };

  const handleAddQuickNoteTag = (tag: string) => {
    setInitialNotes((prev) => (prev ? `${prev} | ${tag}` : tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (duplicateMatch && !overrideDuplicate) {
      return;
    }

    const newCand: Candidate = {
      id: `cand-${Date.now()}`,
      name: name.trim() || "New Candidate",
      email: email.trim() || "candidate@example.com",
      phone: phone.trim() || "(555) 000-0000",
      positionApplied,
      source,
      dateApplied: new Date().toISOString().split("T")[0],
      assignedRecruiter,
      statusTag: stage === "Applied" ? "New Applicant" : stage === "Phone Screen" ? "Screening Needed" : "Interview Ready",
      stage,
      experienceYears,
      backgroundCheck: {
        status: autoTriggerBackground ? "Pending" : "Not Started",
        provider: "Checkr"
      },
      sexOffenderCheck: { status: "Not Started" },
      oigSamCheck: { status: "Not Started" },
      tbTest: { result: tbStatus },
      credentialVerification: {
        licenseType,
        licenseNumber: licenseNumber.trim() || "PENDING",
        status: licenseNumber.trim() ? "Verified" : "Pending Verification",
        cprCertified
      },
      offerLetter: { status: "Not Sent" },
      onboardingChecklist: {
        policyAcknowledged: false,
        hipaaTrainingCompleted: false,
        abuseReportingCompleted: false,
        i9Submitted: false,
        w4Submitted: false
      },
      notes: initialNotes.trim()
        ? [
          {
            id: `note-${Date.now()}`,
            interviewerName: assignedRecruiter,
            interviewerRole: "Recruiter Intake",
            date: new Date().toISOString().split("T")[0],
            rating: 5,
            text: initialNotes.trim()
          }
        ]
        : []
    };

    onAddCandidate(newCand);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setLocation("Austin, TX");
    setPositionApplied("Certified Nursing Assistant (CNA)");
    setSource("Indeed");
    setExperienceYears(2);
    setDesiredPay("$19.50 / hr");
    setAvailability("Full-Time (Days & Weekends)");
    setAssignedRecruiter("Sarah Jenkins (HR)");
    setLicenseType("CNA");
    setLicenseNumber("");
    setCprCertified(true);
    setHasDriverLicense(true);
    setTbStatus("Negative");
    setStage("Applied");
    setAutoTriggerBackground(true);
    setInitialNotes("");
    setOverrideDuplicate(false);
    setActiveTab("personal");
  };

  const tabs = [
    { id: "personal", label: "1. Personal", icon: User },
    { id: "role", label: "2. Role & Schedule", icon: Briefcase },
    { id: "credentials", label: "3. Credentials", icon: Award },
    { id: "pipeline", label: "4. Pipeline & Notes", icon: ShieldCheck }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-2xl max-w-6xl w-full shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-200/80 relative max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* Top Modal Title Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] shadow-teal-600/20">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg tracking-tight flex items-center gap-2">
                  Add New Candidate
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold border border-teal-200">
                    Caregiver Intake
                  </span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Complete candidate profile to initiate recruitment & background verification
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Modal Body - Symmetric 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
            {/* LEFT COLUMN: Real-Time Candidate ID Preview Sidebar (5 cols) */}
            <div className="lg:col-span-4 bg-slate-900 text-white p-6 flex flex-col justify-between overflow-y-auto border-r border-slate-800 space-y-4">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-teal-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Live Profile Card
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                    {stage}
                  </span>
                </div>

                {/* Candidate Avatar Badge */}
                <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.06)] shrink-0">
                    {getInitials(name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-white text-base truncate">
                      {name.trim() || "Candidate Name"}
                    </h4>
                    <p className="text-xs text-teal-300 font-medium truncate mt-0.5">
                      {positionApplied}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        {location || "Location"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Candidate Details Summary */}
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-teal-400" /> Email
                    </span>
                    <span className="font-semibold text-slate-200 truncate max-w-[150px]">
                      {email || "Not entered"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-teal-400" /> Phone
                    </span>
                    <span className="font-semibold text-slate-200">
                      {phone || "Not entered"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-teal-400" /> Caregiving Exp
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {experienceYears} {experienceYears === 1 ? "Year" : "Years"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-teal-400" /> Desired Pay
                    </span>
                    <span className="font-semibold text-slate-200">{desiredPay}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <BadgeCheck className="w-3.5 h-3.5 text-teal-400" /> License
                    </span>
                    <span className="font-semibold text-slate-200">
                      {licenseType} {licenseNumber ? `(#${licenseNumber})` : ""}
                    </span>
                  </div>
                </div>

                {/* Certifications Badge Badges */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Verification Readiness
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span
                      className={`text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold border ${cprCertified
                        ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/60"
                        : "bg-slate-800/60 text-slate-400 border-slate-700"
                        }`}
                    >
                      <HeartPulse className="w-3 h-3 text-emerald-400" /> CPR Certified
                    </span>
                    <span
                      className={`text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold border ${hasDriverLicense
                        ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/60"
                        : "bg-slate-800/60 text-slate-400 border-slate-700"
                        }`}
                    >
                      <Car className="w-3 h-3 text-emerald-400" /> Valid Transport
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold bg-slate-800/60 text-slate-300 border border-slate-700">
                      <ShieldCheck className="w-3 h-3 text-teal-400" /> TB: {tbStatus}
                    </span>
                  </div>
                </div>

                {/* Duplicate Alert in Sidebar */}
                {duplicateMatch && (
                  <div className="bg-amber-950/80 border-2 border-amber-500/80 rounded-2xl p-3.5 space-y-2 text-amber-200 text-xs">
                    <div className="flex items-start gap-2 font-bold text-amber-300">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        Duplicate Match!
                        <p className="text-[11px] font-normal text-amber-200 mt-0.5">
                          Matches <strong>{duplicateMatch.name}</strong> ({duplicateMatch.positionApplied}).
                        </p>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-[11px] text-amber-300 pt-1 border-t border-amber-800/60">
                      <input
                        type="checkbox"
                        checked={overrideDuplicate}
                        onChange={(e) => setOverrideDuplicate(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-amber-400 bg-slate-900 border-amber-600"
                      />
                      Allow re-application
                    </label>
                  </div>
                )}
              </div>

              {/* Bottom Recruiter Note Footprint */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-teal-400" /> Recruiter:
                </span>
                <span className="font-semibold text-slate-200">{assignedRecruiter}</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Tabbed Form (8 cols) */}
            <div className="lg:col-span-8 flex flex-col justify-between p-6 overflow-y-auto bg-slate-50/40 space-y-4">
              {/* Tab Navigation */}
              <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${isActive
                        ? "bg-white text-slate-900 shadow-md shadow-slate-200/80 border border-slate-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                        }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-teal-600" : "text-slate-400"}`} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-4">
                {/* TAB 1: PERSONAL DETAILS */}
                {activeTab === "personal" && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="border-b border-slate-200/80 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">Personal & Contact Information</h4>
                      <p className="text-xs text-slate-500">
                        Enter basic contact details for communication and application tracking.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="font-bold text-slate-700 block mb-1">Full Legal Name *</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Jessica M. Smith"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none font-medium bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="email"
                            required
                            placeholder="jessica@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none font-medium bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="text"
                            required
                            placeholder="(555) 234-5678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none font-medium bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">City / Location</label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="text"
                            placeholder="e.g. Austin, TX"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none font-medium bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Preferred Contact Method</label>
                        <select
                          value={preferredContact}
                          onChange={(e) => setPreferredContact(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none bg-white font-medium"
                        >
                          <option value="Phone">Phone Call</option>
                          <option value="SMS">SMS Text Message</option>
                          <option value="Email">Email</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: ROLE & EXPERIENCE */}
                {activeTab === "role" && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="border-b border-slate-200/80 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">Role, Experience & Schedule</h4>
                      <p className="text-xs text-slate-500">
                        Specify target role, sourcing details, pay expectations, and work shift preferences.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Position Applied *</label>
                        <select
                          value={positionApplied}
                          onChange={(e) => setPositionApplied(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none bg-white font-medium"
                        >
                          <option value="Certified Nursing Assistant (CNA)">Certified Nursing Assistant (CNA)</option>
                          <option value="Home Health Aide (HHA)">Home Health Aide (HHA)</option>
                          <option value="RN Charge Nurse">RN Charge Nurse</option>
                          <option value="Licensed Practical Nurse (LPN)">Licensed Practical Nurse (LPN)</option>
                          <option value="Companion / Homemaker">Companion / Homemaker</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Recruitment Source *</label>
                        <select
                          value={source}
                          onChange={(e) => setSource(e.target.value as CandidateSource)}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none bg-white font-medium"
                        >
                          <option value="Indeed">Indeed</option>
                          <option value="ZipRecruiter">ZipRecruiter</option>
                          <option value="Facebook">Facebook</option>
                          <option value="Employee Referral">Employee Referral</option>
                          <option value="CNA Program">CNA Program</option>
                          <option value="Walk-in">Walk-in</option>
                          <option value="Staffing Agency">Staffing Agency</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Years of Caregiving Experience
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            max={40}
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none font-medium bg-white"
                          />
                          {/* Quick Preset Buttons */}
                          <div className="flex items-center gap-1 shrink-0">
                            {[1, 3, 5, 10].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => handleQuickPreset(num)}
                                className={`px-2.5 py-2 rounded-lg font-semibold text-[11px] border transition-all ${experienceYears === num
                                  ? "bg-teal-600 text-white border-teal-600"
                                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                                  }`}
                              >
                                {num}y
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Desired Pay Rate</label>
                        <input
                          type="text"
                          placeholder="e.g. $19.50 / hr"
                          value={desiredPay}
                          onChange={(e) => setDesiredPay(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none font-medium bg-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Shift & Availability Preference</label>
                        <select
                          value={availability}
                          onChange={(e) => setAvailability(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none bg-white font-medium"
                        >
                          <option value="Full-Time (Days & Weekends)">Full-Time (Days & Weekends)</option>
                          <option value="Part-Time (Flexible Shifts)">Part-Time (Flexible Shifts)</option>
                          <option value="Night Shifts / Overnights">Night Shifts / Overnights</option>
                          <option value="Weekend Shifts Only">Weekend Shifts Only</option>
                          <option value="Live-In Caregiver">Live-In Caregiver</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Assigned Recruiter</label>
                        <select
                          value={assignedRecruiter}
                          onChange={(e) => setAssignedRecruiter(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none bg-white font-medium"
                        >
                          <option value="Sarah Jenkins (HR)">Sarah Jenkins (HR)</option>
                          <option value="Marcus Vance (Recruiting)">Marcus Vance (Recruiting)</option>
                          <option value="Elena Rostova (HR Lead)">Elena Rostova (HR Lead)</option>
                          <option value="Unassigned Pool">Unassigned Pool</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: CREDENTIALS & LICENSING */}
                {activeTab === "credentials" && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="border-b border-slate-200/80 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">Credentials, Licensing & Health Checks</h4>
                      <p className="text-xs text-slate-500">
                        Record state nursing certifications, CPR readiness, transportation status, and TB test records.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">License / Cert Type</label>
                        <select
                          value={licenseType}
                          onChange={(e) => setLicenseType(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none bg-white font-medium"
                        >
                          <option value="CNA">CNA (Certified Nursing Assistant)</option>
                          <option value="HHA">HHA (Home Health Aide)</option>
                          <option value="RN">RN (Registered Nurse)</option>
                          <option value="LPN">LPN (Licensed Practical Nurse)</option>
                          <option value="Companion">Companion / Unlicensed Caregiver</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">State License Number</label>
                        <input
                          type="text"
                          placeholder="e.g. CNA-982341 (or PENDING)"
                          value={licenseNumber}
                          onChange={(e) => setLicenseNumber(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none font-medium bg-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">TB Test Status</label>
                        <select
                          value={tbStatus}
                          onChange={(e) => setTbStatus(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none bg-white font-medium"
                        >
                          <option value="Negative">Negative (Clear - Passed)</option>
                          <option value="Pending">Pending Test / Result</option>
                          <option value="Chest X-Ray Required">Chest X-Ray Required</option>
                          <option value="Completed">Completed & Verified</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {/* CPR Certified Toggle Card */}
                        <div
                          onClick={() => setCprCertified(!cprCertified)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${cprCertified
                            ? "bg-teal-50/80 border-teal-300 text-teal-900 shadow-sm"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-xl ${cprCertified ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-400"
                                }`}
                            >
                              <HeartPulse className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold block text-xs">Active CPR / First Aid</span>
                              <span className="text-[11px] text-slate-500 font-normal">
                                Cardiopulmonary Resuscitation
                              </span>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border ${cprCertified ? "bg-teal-600 border-teal-600 text-white" : "border-slate-300 bg-white"
                              }`}
                          >
                            {cprCertified && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        {/* Driver License & Transportation Card */}
                        <div
                          onClick={() => setHasDriverLicense(!hasDriverLicense)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${hasDriverLicense
                            ? "bg-teal-50/80 border-teal-300 text-teal-900 shadow-sm"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-xl ${hasDriverLicense ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-400"
                                }`}
                            >
                              <Car className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold block text-xs">Driver&apos;s License & Vehicle</span>
                              <span className="text-[11px] text-slate-500 font-normal">
                                Reliable client transportation
                              </span>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border ${hasDriverLicense ? "bg-teal-600 border-teal-600 text-white" : "border-slate-300 bg-white"
                              }`}
                          >
                            {hasDriverLicense && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: PIPELINE SETUP & NOTES */}
                {activeTab === "pipeline" && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="border-b border-slate-200/80 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">Pipeline Stage & Recruiter Screening Notes</h4>
                      <p className="text-xs text-slate-500">
                        Set candidate intake stage, trigger automated screening checks, and record initial recruiter notes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Initial Pipeline Stage</label>
                        <select
                          value={stage}
                          onChange={(e) => setStage(e.target.value as CandidateStage)}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none bg-white font-medium"
                        >
                          <option value="Applied">Applied (New Candidate Pool)</option>
                          <option value="Phone Screen">Phone Screen (Initial Contact)</option>
                          <option value="Interview Scheduled">Interview Scheduled</option>
                          <option value="Background Check">Background Check (In Progress)</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <div
                          onClick={() => setAutoTriggerBackground(!autoTriggerBackground)}
                          className={`w-full p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${autoTriggerBackground
                            ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                            : "bg-white border-slate-200 text-slate-600"
                            }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <ShieldCheck className={`w-4 h-4 ${autoTriggerBackground ? "text-emerald-600" : "text-slate-400"}`} />
                            <div>
                              <span className="font-bold block text-xs">Auto-Trigger Checkr Scan</span>
                              <span className="text-[11px] text-slate-500 font-normal">Initiate background check</span>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border ${autoTriggerBackground ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-white"
                              }`}
                          >
                            {autoTriggerBackground && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <div className="flex items-center justify-between mb-1">
                          <label className="font-bold text-slate-700">Initial Recruiter Intake Notes</label>
                          <span className="text-[11px] text-slate-400">Quick Tags:</span>
                        </div>

                        {/* Quick Note Preset Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {[
                            "Bilingual (Spanish)",
                            "Immediate Availability",
                            "Dementia / Alzheimer Certified",
                            "Prefers Hoyer Lift Patients",
                            "Passed Phone Screen"
                          ].map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleAddQuickNoteTag(tag)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 text-[11px] font-medium transition-colors border border-slate-200"
                            >
                              + {tag}
                            </button>
                          ))}
                        </div>

                        <textarea
                          rows={3}
                          placeholder="Type initial screening remarks, candidate strengths, or special patient preferences..."
                          value={initialNotes}
                          onChange={(e) => setInitialNotes(e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none font-medium bg-white text-xs"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Form Footer Action Bar */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {activeTab !== "personal" && (
                      <button
                        type="button"
                        onClick={() => {
                          if (activeTab === "role") setActiveTab("personal");
                          if (activeTab === "credentials") setActiveTab("role");
                          if (activeTab === "pipeline") setActiveTab("credentials");
                        }}
                        className="px-3.5 py-2 text-slate-600 font-bold hover:bg-slate-200/60 rounded-xl transition-colors flex items-center gap-1.5 text-xs"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-200/60 rounded-xl transition-colors text-xs"
                    >
                      Cancel
                    </button>

                    {activeTab !== "pipeline" ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (activeTab === "personal") setActiveTab("role");
                          if (activeTab === "role") setActiveTab("credentials");
                          if (activeTab === "credentials") setActiveTab("pipeline");
                        }}
                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 text-xs"
                      >
                        Next Step <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={Boolean(duplicateMatch && !overrideDuplicate)}
                        className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-600/25 active:scale-95 flex items-center gap-2 text-xs"
                      >
                        <BadgeCheck className="w-4 h-4" /> Create Candidate Profile
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
