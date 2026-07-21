import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { ChevronRight, ChevronLeft, CheckCircle2, FileText, Download } from "lucide-react";
import { cn } from "@/components/ui/Card";

interface NewReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, name: "Basic Details" },
  { id: 2, name: "Assessment" },
  { id: 3, name: "Documents" },
];

export function NewReferralModal({ isOpen, onClose }: NewReferralModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [docsGenerated, setDocsGenerated] = useState(false);

  // Reset state when opened
  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setDocsGenerated(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const generateDocs = () => {
    setDocsGenerated(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Referral"
      description="Complete the intake pipeline for a new referral."
      maxWidth="2xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-colors",
                  currentStep === step.id
                    ? "bg-brand-teal"
                    : currentStep > step.id
                    ? "bg-brand-teal/50"
                    : "bg-slate-200"
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-teal rounded-full hover:bg-brand-teal/90 transition-colors flex items-center gap-1.5"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-teal rounded-full hover:bg-brand-teal/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {isSubmitting ? "Submitting..." : "Complete Intake"}
                {!isSubmitting && <CheckCircle2 className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      }
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">{steps[currentStep - 1].name}</h3>
        <div className="h-px w-full bg-slate-100 mt-3" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="min-h-[300px]"
        >
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Patient Full Name</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all" placeholder="Jane Doe" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Referral Source</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all">
                    <option>Select source...</option>
                    <option>Hospital Discharge</option>
                    <option>Primary Care Physician</option>
                    <option>Family Member</option>
                    <option>Online Portal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Requested Service Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Primary Service Needed</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all">
                    <option>Personal Care</option>
                    <option>Skilled Nursing</option>
                    <option>Physical Therapy</option>
                    <option>Companionship</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Initial Notes</label>
                <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all resize-none" placeholder="Any special instructions or notes from the referral source..." />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl mb-4">
                <p className="text-sm text-blue-800">Initial assessment to determine level of care and required compliance forms.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Level of Care Needs</h4>
                  <div className="space-y-2">
                    {["Assistance with ADLs (Bathing, Dressing)", "Medication Administration", "Mobility Assistance", "Wound Care"].map((item) => (
                      <label key={item} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                        <input type="checkbox" className="w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                        <span className="text-sm text-slate-700 font-medium">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Cognitive Status</h4>
                  <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all">
                    <option>Independent/Intact</option>
                    <option>Mild Impairment</option>
                    <option>Moderate Impairment</option>
                    <option>Severe Impairment</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-5">
              <p className="text-sm text-slate-600">Based on the assessment, the following documents are required for intake. Generate them now to proceed.</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-teal/10 text-brand-teal rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-900">Consent Packet</h4>
                      <p className="text-xs text-slate-500">HIPAA, Release of Info, Bill of Rights</p>
                    </div>
                  </div>
                  {docsGenerated ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Generated
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">Pending...</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-teal/10 text-brand-teal rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-900">Service Agreement</h4>
                      <p className="text-xs text-slate-500">Care Plan and Financial Responsibility</p>
                    </div>
                  </div>
                  {docsGenerated ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Generated
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">Pending...</span>
                  )}
                </div>
              </div>

              {!docsGenerated ? (
                <button
                  onClick={generateDocs}
                  className="w-full py-2.5 mt-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                >
                  <FileText className="w-4 h-4" />
                  Generate Assessment & Forms
                </button>
              ) : (
                <div className="flex items-center justify-center p-3 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl border border-emerald-100">
                  Forms generated successfully. They will be sent via e-signature.
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
}
