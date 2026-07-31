"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { toast } from "sonner";
import { Calendar, User, Save, AlertTriangle, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SupervisoryVisitsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [findings, setFindings] = useState<{ description: string; severity: "minor" | "moderate" | "urgent" }[]>([]);

  const [formData, setFormData] = useState({
    clientName: "Eleanor Vance", // Mocked from context
    caregiverName: "Maria Santos, CNA",
    visitType: "Periodic",
    isUnannounced: false,

    // Evaluation answers
    followingCarePlan: "yes",
    clientCondition: "stable",
    carePlanAccurate: "yes",
    homeEnvironmentSafe: "yes",
    clientSatisfied: "yes",
    unreportedConcerns: "no",
  });

  const handleFindingAdd = () => {
    setFindings([...findings, { description: "", severity: "minor" }]);
  };

  const updateFinding = (index: number, field: string, value: string) => {
    const newFindings = [...findings];
    (newFindings[index] as any)[field] = value;
    setFindings(newFindings);
  };

  const removeFinding = (index: number) => {
    setFindings(findings.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Visit Evaluation submitted successfully");
      router.push("/field-supervisor");
    }, 1000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Header Banner */}
      <div className="bg-white/80 backdrop-blur-xl p-4 4 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight">Visit Evaluation</h1>
          <p className="text-xs text-slate-500 font-normal mt-1">Complete the supervisory visit log for your assigned client.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <Card className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <CardHeader
            title={<span className="text-sm text-slate-800">Visit Context</span>}
            className="border-b border-slate-100 bg-slate-50/50 px-4 py-3 mb-0"
          />
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Client</label>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm">
                <User className="w-4 h-4 text-slate-400" />
                {formData.clientName}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Caregiver on Shift</label>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm">
                <User className="w-4 h-4 text-slate-400" />
                {formData.caregiverName}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Visit Type</label>
              <select
                value={formData.visitType}
                onChange={(e) => setFormData({ ...formData, visitType: e.target.value })}
                className="w-full text-sm p-3 bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
              >
                <option value="Initial">Initial (Within 30 days)</option>
                <option value="Periodic">Periodic (60-90 days)</option>
                <option value="Unannounced">Unannounced (Annual)</option>
              </select>
            </div>
            <div className="space-y-2 flex flex-col justify-end">
              <label className="flex items-center gap-3 p-3 bg-white border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isUnannounced}
                  onChange={(e) => setFormData({ ...formData, isUnannounced: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal accent-brand-teal"
                />
                <span className="text-sm font-semibold text-slate-700">This visit was Unannounced</span>
              </label>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <CardHeader
            title={<span className="text-sm text-slate-800">Compliance & Quality Assessment</span>}
            className="border-b border-slate-100 bg-slate-50/50 px-4 py-3 mb-0"
          />
          <div className="p-4 pt-4 space-y-3">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-800">Is the caregiver following the care plan?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="followingCarePlan" value="yes" checked={formData.followingCarePlan === "yes"} onChange={(e) => setFormData({ ...formData, followingCarePlan: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="followingCarePlan" value="no" checked={formData.followingCarePlan === "no"} onChange={(e) => setFormData({ ...formData, followingCarePlan: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> No
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-800">Is the client's condition stable, improving, or declining?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="clientCondition" value="improving" checked={formData.clientCondition === "improving"} onChange={(e) => setFormData({ ...formData, clientCondition: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> Improving
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="clientCondition" value="stable" checked={formData.clientCondition === "stable"} onChange={(e) => setFormData({ ...formData, clientCondition: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> Stable
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="clientCondition" value="declining" checked={formData.clientCondition === "declining"} onChange={(e) => setFormData({ ...formData, clientCondition: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> Declining
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-800">Does the care plan still accurately reflect the client's needs?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="carePlanAccurate" value="yes" checked={formData.carePlanAccurate === "yes"} onChange={(e) => setFormData({ ...formData, carePlanAccurate: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="carePlanAccurate" value="no" checked={formData.carePlanAccurate === "no"} onChange={(e) => setFormData({ ...formData, carePlanAccurate: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> No
                </label>
              </div>
              {formData.carePlanAccurate === "no" && (
                <div className="mt-2 flex items-center justify-between bg-accent-amber/10 p-3 rounded-xl border border-accent-amber/20">
                  <span className="text-sm text-accent-amber font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> This will be flagged for Clinical Care Plan Review.
                  </span>
                  <button type="button" className="text-xs bg-white border border-accent-amber/50 text-accent-amber px-3 py-1.5 rounded-lg hover:bg-accent-amber hover:text-white transition-colors">
                    Flag for Review
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-800">Is the home environment safe?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="homeEnvironmentSafe" value="yes" checked={formData.homeEnvironmentSafe === "yes"} onChange={(e) => setFormData({ ...formData, homeEnvironmentSafe: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="homeEnvironmentSafe" value="no" checked={formData.homeEnvironmentSafe === "no"} onChange={(e) => setFormData({ ...formData, homeEnvironmentSafe: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> No
                </label>
              </div>
              {formData.homeEnvironmentSafe === "no" && (
                <div className="mt-2 flex items-center justify-between bg-accent-red/10 p-3 rounded-xl border border-accent-red/20">
                  <span className="text-sm text-accent-red font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Safety concerns must be documented as an Incident Report.
                  </span>
                  <button type="button" onClick={() => router.push("/field-supervisor/incidents")} className="text-xs bg-accent-red text-white px-3 py-1.5 rounded-lg hover:bg-accent-red/90 transition-colors flex items-center gap-1">
                    Create Incident Report <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-800">Is the client satisfied with the care?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="clientSatisfied" value="yes" checked={formData.clientSatisfied === "yes"} onChange={(e) => setFormData({ ...formData, clientSatisfied: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="clientSatisfied" value="no" checked={formData.clientSatisfied === "no"} onChange={(e) => setFormData({ ...formData, clientSatisfied: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> No
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-800">Are there any concerns the caregiver hasn't reported?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="unreportedConcerns" value="yes" checked={formData.unreportedConcerns === "yes"} onChange={(e) => setFormData({ ...formData, unreportedConcerns: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input type="radio" name="unreportedConcerns" value="no" checked={formData.unreportedConcerns === "no"} onChange={(e) => setFormData({ ...formData, unreportedConcerns: e.target.value })} className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" /> No
                </label>
              </div>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <CardHeader
            title={<span className="text-sm text-slate-800">Document Findings</span>}
            action={
              <button
                type="button"
                onClick={handleFindingAdd}
                className="text-sm font-semibold text-brand-teal hover:underline"
              >
                + Add Finding
              </button>
            }
            className="border-b border-slate-100 bg-slate-50/50 px-4 py-3 mb-0"
          />
          <div className="p-4 pt-4">
            {findings.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No findings documented. Any added findings will route to your Follow-up Queue.</p>
            ) : (
              <div className="space-y-4">
                {findings.map((finding, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex-1 w-full space-y-2">
                      <label className="text-xs font-semibold text-slate-700">Description</label>
                      <input
                        type="text"
                        value={finding.description}
                        onChange={(e) => updateFinding(idx, "description", e.target.value)}
                        placeholder="Describe what was observed..."
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-sm"
                        required
                      />
                    </div>
                    <div className="w-full sm:w-48 space-y-2">
                      <label className="text-xs font-semibold text-slate-700">Severity</label>
                      <select
                        value={finding.severity}
                        onChange={(e) => updateFinding(idx, "severity", e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-sm"
                      >
                        <option value="minor">Minor</option>
                        <option value="moderate">Moderate</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div className="w-full sm:w-auto pt-3 md:pt-6 lg:pt-8 flex justify-end items-end">
                      <button type="button" onClick={() => removeFinding(idx)} className="font-semibold text-sm text-accent-red hover:underline">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <div className="flex justify-end gap-3 pt-3">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 text-sm rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm rounded-xl bg-brand-teal text-white font-semibold shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:bg-brand-teal/90 transition-colors flex items-center gap-2">
            {isSubmitting ? "Saving..." : <><Save className="w-4 h-4" /> Save Evaluation</>}
          </button>
        </div>
      </form>
    </div>
  );
}
