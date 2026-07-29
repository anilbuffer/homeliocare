"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Activity,
  Home,
  Users,
  Heart,
  Save,
  CheckCircle2,
  FileSignature,
  Settings,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import clsx from "clsx";

type FormSection = "physical" | "environment" | "social" | "careplan" | "signoff";

export function AssessmentForm() {
  const [activeSection, setActiveSection] = useState<FormSection>("physical");
  const [stateConfig, setStateConfig] = useState("generic"); // e.g., "generic", "NY", "CA"

  // Minimal mock state for form handling to demonstrate UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sections = [
    { id: "physical", label: "Physical & Medical", icon: Activity },
    { id: "environment", label: "Home Environment", icon: Home },
    { id: "social", label: "Social & Behavioral", icon: Users },
    { id: "careplan", label: "Care Plan Builder", icon: ClipboardList },
    { id: "signoff", label: "Review & Sign", icon: FileSignature },
  ] as const;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full min-h-[600px]">
      <div className="p-4 sm:px-4 sm:py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-teal/10 rounded-xl text-brand-teal">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-medium text-text-primary">Initial Non-Medical Assessment & Care Plan</h2>
            <p className="text-xs font-medium text-text-secondary mt-0.5">Comprehensive client evaluation and care instructions</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Settings className="w-4 h-4 text-slate-400" />
          <select
            value={stateConfig}
            onChange={(e) => setStateConfig(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
          >
            <option value="generic">Generic Template</option>
            <option value="NY">New York (DOH-xxxx)</option>
            <option value="CA">California (CDSS)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left Sidebar Navigation */}
        <div className="w-full lg:w-64 border-r border-slate-200 bg-slate-50/30 p-4 shrink-0 overflow-x-auto lg:overflow-y-auto">
          <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as FormSection)}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left cursor-pointer",
                    isActive
                      ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <Icon className={clsx("w-4 h-4 shrink-0", isActive ? "text-white" : "text-slate-400")} />
                  <span className="whitespace-nowrap">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        {/* Right Form Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-white relative">
          <form onSubmit={handleSave} className="max-w-4xl mx-auto pb-20">

            <AnimatePresence mode="wait">
              {activeSection === "physical" && (
                <motion.div key="physical" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-brand-teal" />
                    Physical & Medical Status
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Primary Diagnosis</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-teal outline-none" placeholder="e.g. Dementia, Alzheimer's type" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Secondary Diagnoses</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-teal outline-none" placeholder="e.g. Hypertension, Osteoarthritis" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700">Activities of Daily Living (ADLs) - Need level</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Bathing', 'Dressing', 'Toileting', 'Transferring', 'Continence', 'Feeding'].map(adl => (
                          <div key={adl} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <label className="text-xs font-semibold text-slate-600 block mb-2">{adl}</label>
                            <select className="w-full text-xs border border-slate-200 bg-white rounded-lg p-1.5 outline-none">
                              <option>Independent</option>
                              <option>Needs Setup</option>
                              <option>Minimal Assist</option>
                              <option>Moderate Assist</option>
                              <option>Maximal Assist / Total Care</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "environment" && (
                <motion.div key="environment" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Home className="w-5 h-5 text-brand-teal" />
                    Home Environment
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700">Safety Hazards Identified</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {['Clutter / Trip hazards', 'Poor lighting', 'No grab bars in bath', 'Loose rugs', 'Stairs without rails', 'Pest issues'].map(hazard => (
                          <label key={hazard} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="checkbox" className="text-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                            <span className="text-sm text-slate-700">{hazard}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Evacuation Plan / Notes</label>
                      <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-teal outline-none min-h-[100px]" placeholder="Detail emergency exit routes and assistance needed..."></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "social" && (
                <motion.div key="social" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-teal" />
                    Social & Behavioral
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700">Cognitive Status</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {['Alert & Oriented', 'Short-term Memory Loss', 'Confusion', 'Dementia / Alzheimer\'s'].map(status => (
                          <label key={status} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="checkbox" className="text-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                            <span className="text-sm text-slate-700">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700">Behavioral Concerns</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {['Wandering', 'Agitation / Anxiety', 'Sun-downing', 'Resistance to Care', 'Depression', 'Hallucinations'].map(behavior => (
                          <label key={behavior} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="checkbox" className="text-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                            <span className="text-sm text-slate-700">{behavior}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Additional Notes (Social / Behavioral)</label>
                      <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-teal outline-none min-h-[100px]" placeholder="Detail any specific social needs, hobbies, or behavioral interventions..."></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "careplan" && (
                <motion.div key="careplan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-brand-teal" />
                    Care Plan Builder
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <h4 className="text-sm font-semibold text-amber-800 mb-1">Medication Oversight Notice</h4>
                      <p className="text-xs text-amber-700">
                        In this non-medical care plan, caregivers may only "remind" or "observe" self-administration. Do not use the term "administer" unless assigning to a licensed nurse.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700">Task List (Assigned to Caregiver)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2 border border-slate-200 p-3 rounded-xl bg-slate-50/50">
                          <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Personal Care</h5>
                          {['Assist with Bathing', 'Oral Hygiene', 'Dressing', 'Incontinence Care'].map(t => (
                            <label key={t} className="flex items-center gap-2">
                              <input type="checkbox" className="text-brand-teal rounded" /> <span className="text-sm">{t}</span>
                            </label>
                          ))}
                        </div>
                        <div className="space-y-2 border border-slate-200 p-3 rounded-xl bg-slate-50/50">
                          <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Homemaking</h5>
                          {['Light Laundry', 'Meal Prep', 'Dusting', 'Trash Removal'].map(t => (
                            <label key={t} className="flex items-center gap-2">
                              <input type="checkbox" className="text-brand-teal rounded" /> <span className="text-sm">{t}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Tasks Caregiver Will NOT Perform</label>
                      <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-teal outline-none min-h-[80px]" placeholder="Explicit exclusions (e.g., wound care, heavy lifting, administering meds)"></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "signoff" && (
                <motion.div key="signoff" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                    <FileSignature className="w-5 h-5 text-brand-teal" />
                    Review & Sign-Off
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                        <h4 className="font-semibold text-sm text-slate-800">Clinical Supervisor Signature</h4>
                        <p className="text-xs text-slate-500 mb-2">I have reviewed this assessment and care plan.</p>
                        <input type="text" placeholder="Type name to sign..." className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm outline-none focus:border-brand-teal" />
                        <input type="date" className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm outline-none" />
                      </div>

                      <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                        <h4 className="font-semibold text-sm text-slate-800">Client / Legal Rep Signature</h4>
                        <p className="text-xs text-slate-500 mb-2">I agree to the care plan outlined above.</p>
                        <input type="text" placeholder="Type name to sign..." className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm outline-none focus:border-brand-teal" />
                        <input type="date" className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm outline-none" />
                      </div>
                    </div>

                    {stateConfig === "NY" && (
                      <div className="p-4 border border-amber-200 rounded-xl bg-amber-50 space-y-3">
                        <h4 className="font-semibold text-sm text-amber-900 flex items-center gap-2">
                          <Activity className="w-4 h-4" /> Physician Signature Required (NY)
                        </h4>
                        <p className="text-xs text-amber-800 mb-2">State config requires MD sign-off for this care plan tier.</p>
                        <div className="flex gap-2">
                          <button type="button" className="px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-bold text-amber-700">
                            Send e-Sign Request to MD
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex items-center justify-between z-10">
              <button
                type="button"
                onClick={() => {
                  const idx = sections.findIndex(s => s.id === activeSection);
                  if (idx > 0) setActiveSection(sections[idx - 1].id as FormSection);
                }}
                disabled={activeSection === "physical"}
                className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-full transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <div className="flex gap-3">
                <button type="button" className="px-4 py-2 text-sm font-semibold text-brand-teal bg-brand-teal/10 hover:bg-brand-teal/20 rounded-full transition-colors cursor-pointer">
                  Save Draft
                </button>

                {activeSection === "signoff" ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-brand-teal/90 rounded-full transition-colors flex items-center gap-2 shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : isSuccess ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isSuccess ? "Saved Successfully!" : "Finalize & Sign"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const idx = sections.findIndex(s => s.id === activeSection);
                      if (idx < sections.length - 1) setActiveSection(sections[idx + 1].id as FormSection);
                    }}
                    className="px-6 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-brand-teal/90 rounded-full transition-colors flex items-center gap-1 shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 cursor-pointer"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
