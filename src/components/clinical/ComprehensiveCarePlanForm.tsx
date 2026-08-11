"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList, Activity, Home, Users, Heart, Save, Settings, User,
  FileText, Pill, Accessibility, Brain, Utensils, AlertTriangle,
  ListTodo, Flag, Stethoscope, Calendar, Clock, LineChart, Phone,
  CheckCircle2, Mic, Check, ArrowLeft
} from "lucide-react";
import clsx from "clsx";

type ConfidenceLevel = "high" | "review" | "missing";

interface ComprehensiveCarePlanFormProps {
  isHybridMode?: boolean;
  hoveredFieldId?: string | null;
  showDictationMics?: boolean;
  onFieldHover?: (fieldId: string) => void;
  onFieldLeave?: () => void;
  onComplete?: () => void;
  onBack?: () => void;
}

type FormSectionId =
  | "id" | "overview" | "clinical" | "meds" | "adls" | "iadls"
  | "psychosocial" | "nutrition" | "safety" | "needs" | "goals"
  | "interventions" | "caregiver" | "team" | "schedule"
  | "monitoring" | "preferences" | "summary";

export function ComprehensiveCarePlanForm({
  isHybridMode = false,
  hoveredFieldId = null,
  showDictationMics = false,
  onFieldHover,
  onFieldLeave,
  onComplete,
  onBack
}: ComprehensiveCarePlanFormProps = {}) {
  const [activeSection, setActiveSection] = useState<FormSectionId>("id");
  const [stateConfig, setStateConfig] = useState("generic");

  const [adlsList, setAdlsList] = useState(['Bathing', 'Dressing', 'Grooming', 'Toileting', 'Eating / Feeding', 'Mobility / Ambulation', 'Transfers', 'Continence', 'Positioning']);
  const [iadlsList, setIadlsList] = useState(['Meal Preparation', 'Housekeeping', 'Laundry', 'Shopping', 'Transportation', 'Finances', 'Medication Management', 'Phone / Communication', 'Appointments']);
  const [psychosocialDomains, setPsychosocialDomains] = useState(['Orientation', 'Memory', 'Judgment / Decision-Making', 'Communication', 'Mood / Affect', 'Anxiety / Distress', 'Behavioral Concerns', 'Sleep', 'Social Engagement', 'Safety Awareness', 'Coping / Adjustment']);
  const [nutritionAreas, setNutritionAreas] = useState(['Diet / Meal Pattern', 'Appetite', 'Weight / Weight Change', 'Hydration / Fluid Intake', 'Swallowing / Aspiration Concerns', 'Feeding Assistance', 'Dietary Restrictions / Preferences', 'Bowel Function', 'Bladder / Continence']);
  const [safetyRisks, setSafetyRisks] = useState(['Falls', 'Skin Integrity', 'Medication Safety', 'Infection', 'Wandering / Elopement', 'Home Safety', 'Nutrition / Dehydration', 'Other']);
  const [needsList, setNeedsList] = useState([1, 2, 3, 4, 5]);
  const [goalsList, setGoalsList] = useState(['Eleanor ambulates safely with walker and one-person assist within 4 weeks', 'Zero fall incidents during care hours (Ongoing)', 'Medication adherence 100% via caregiver reminder system']);
  const [interventionsList, setInterventionsList] = useState(['Personal Care', 'Mobility', 'Nutrition', 'Medication', 'Safety']);
  const [caregiverInstructions, setCaregiverInstructions] = useState(['Morning Routine: Assist with transfer from bed. Do NOT allow ambulation without walker + caregiver at arm\'s length.', 'Assist with bathing (shower chair in place by day 3).', 'Medication Support: Administer medication reminder only — caregiver does not administer Eliquis.']);
  const [teamRoles, setTeamRoles] = useState(['Primary Care Provider', 'Specialist', 'Nurse / Clinician', 'Care Coordinator', 'Caregiver', 'Therapist', 'Family / Representative', 'Other']);
  const [scheduleTimes, setScheduleTimes] = useState(['Morning', 'Midday', 'Afternoon', 'Evening', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Weekend', 'As Needed']);
  const [outcomeAreas, setOutcomeAreas] = useState(['Functional Status', 'Health / Symptoms', 'Safety', 'Goal Achievement', 'Caregiver Capacity']);
  const [preferencesList, setPreferencesList] = useState(['Daily Routine', 'Care Preferences', 'Food / Dietary Preferences', 'Communication Preferences', 'Personal / Cultural Preferences', 'Activities / Interests', 'Family Involvement', 'Privacy / Dignity', 'Other']);
  const [approvalsList, setApprovalsList] = useState(['Patient / Representative', 'Caregiver', 'Care Coordinator', 'Nurse / Clinician', 'Other']);
  const [selectedPatient, setSelectedPatient] = useState("p1");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sections = [
    { id: "id", label: "Patient Identification", icon: User },
    { id: "overview", label: "Overview & Background", icon: FileText },
    { id: "clinical", label: "Conditions & History", icon: Activity },
    { id: "meds", label: "Medication Management", icon: Pill },
    { id: "adls", label: "Functional - ADLs", icon: Accessibility },
    { id: "iadls", label: "Functional - IADLs", icon: Home },
    { id: "psychosocial", label: "Cognitive & Psychosocial", icon: Brain },
    { id: "nutrition", label: "Nutrition & Hydration", icon: Utensils },
    { id: "safety", label: "Safety & Risk", icon: AlertTriangle },
    { id: "needs", label: "Care Needs & Priorities", icon: ListTodo },
    { id: "goals", label: "Goals & Expected Outcomes", icon: Flag },
    { id: "interventions", label: "Care Interventions", icon: Stethoscope },
    { id: "caregiver", label: "Caregiver Instructions", icon: Users },
    { id: "team", label: "Care Team & Appointments", icon: Calendar },
    { id: "schedule", label: "Daily / Weekly Schedule", icon: Clock },
    { id: "monitoring", label: "Monitoring & Progress", icon: LineChart },
    { id: "preferences", label: "Preferences & Support", icon: Heart },
    { id: "summary", label: "Emergency & Summary", icon: Phone },
  ] as const;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        if (onComplete) onComplete();
      }, 1000);
    }, 1000);
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full min-h-[700px]">

      {/* Header */}
      <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-teal/10 rounded-xl text-brand-teal">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">Comprehensive Care Plan</h2>
            <p className="text-xs font-medium text-text-secondary mt-0.5">Professional Clinical & Care Coordination Template (v1.0)</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 self-start sm:self-auto">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-white text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-semibold">Back</span>
            </button>
          )}
          <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
            <User className="w-4 h-4" />
            <span className="text-xs font-medium">Evelyn Harper</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
            <FileText className="w-4 h-4" />
            <span className="text-xs font-medium">Comprehensive Initial</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden h-[calc(100vh-200px)]">

        {/* Left Sidebar Navigation / Compact Rail */}
        <div className={clsx("border-r border-slate-200 bg-slate-50/30 shrink-0 overflow-x-auto lg:overflow-y-auto custom-scrollbar", isHybridMode ? "w-full lg:w-16 p-2 lg:pb-24" : "w-full lg:w-72 p-4 lg:pb-24")}>
          <div className={clsx("flex lg:flex-col min-w-max lg:min-w-0", isHybridMode ? "gap-4 items-center mt-2" : "gap-1.5")}>
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              const hasError = isHybridMode && section.id === "id"; // Mock unmapped indicator

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id as FormSectionId)}
                  className={clsx(
                    "flex items-center transition-all duration-200 text-left cursor-pointer relative",
                    isHybridMode ? "justify-center p-2 rounded-xl" : "gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                    isActive
                      ? "bg-brand-teal text-white shadow-[0_6px_32px_rgba(239,68,68,0.04)] shadow-brand-teal/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                  title={isHybridMode ? section.label : undefined}
                >
                  <Icon className={clsx("shrink-0", isHybridMode ? "w-5 h-5" : "w-4 h-4", isActive ? "text-white" : "text-slate-400")} />
                  {!isHybridMode && <span className="whitespace-nowrap truncate">{section.label}</span>}

                  {/* Error Dot */}
                  {hasError && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Form Content */}
        <div className={clsx("flex-1 overflow-y-auto bg-white relative custom-scrollbar", isHybridMode ? "p-3 sm:p-6" : "p-4 sm:p-6 lg:p-8")}>
          <form onSubmit={handleSave} className={clsx("mx-auto pb-24", isHybridMode ? "max-w-full" : "max-w-4xl")}>

            <AnimatePresence mode="wait">
              {activeSection === "id" && (
                <SectionWrapper key="id" title="1. Patient / Client Identification" icon={<User className="w-5 h-5 text-brand-teal" />} showMic={isHybridMode || showDictationMics}>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <InputField
                      label="Full Name"
                      fieldId="id-fullname"
                      confidence={isHybridMode ? "high" : undefined}
                      isHovered={hoveredFieldId === "id-fullname"}
                      onHover={() => onFieldHover?.("id-fullname")}
                      onLeave={onFieldLeave}
                      defaultValue="Evelyn Harper"
                    />
                    <InputField label="Preferred Name" defaultValue="Evelyn" confidence={isHybridMode ? "high" : undefined} />
                    <InputField
                      label="Date of Birth"
                      type="date"
                      fieldId="id-dob"
                      confidence={isHybridMode ? "high" : undefined}
                      isHovered={hoveredFieldId === "id-dob"}
                      onHover={() => onFieldHover?.("id-dob")}
                      onLeave={onFieldLeave}
                      defaultValue="1952-04-12"
                    />
                    <InputField label="Age" type="number" defaultValue="74" confidence={isHybridMode ? "high" : undefined} />
                    <InputField label="Address" className="md:col-span-2" confidence={isHybridMode ? "missing" : undefined} defaultValue={isHybridMode ? "" : undefined} />
                    <InputField label="Emergency Contact" confidence={isHybridMode ? "missing" : undefined} defaultValue={isHybridMode ? "" : undefined} />
                    <InputField label="Phone" type="tel" defaultValue="(214) 555-0148" confidence={isHybridMode ? "high" : undefined} />
                    <InputField label="Email" type="email" />
                    <InputField label="Preferred Language" />
                    <InputField label="Primary Provider" />
                    <InputField label="Emergency Contact Name" />
                    <InputField label="Emergency Contact Relationship" />
                    <InputField label="Emergency Phone" type="tel" />
                    <InputField label="Insurance / ID" />
                    <InputField label="Care Plan ID" />
                    <InputField label="Plan Start Date" type="date" />
                    <InputField label="Review Date" type="date" />
                    <InputField label="Care Coordinator" />
                    <InputField label="Primary Caregiver" />
                  </div>
                </SectionWrapper>
              )}

              {activeSection === "overview" && (
                <SectionWrapper key="overview" title="2. Patient Overview & Background" icon={<FileText className="w-5 h-5 text-brand-teal" />} showMic={isHybridMode || showDictationMics}>
                  <div className="space-y-2">
                    <TextAreaField label="Reason for Care / Referral" />
                    <TextAreaField label="Current Health Status" />
                    <TextAreaField label="Relevant Medical History" />
                    <TextAreaField label="Surgical / Hospitalization History" />
                    <TextAreaField label="Living Situation" />
                    <TextAreaField label="Family / Social Support" />
                    <TextAreaField label="Baseline Functioning" />
                    <TextAreaField label="Patient Strengths" />
                    <TextAreaField label="Current Challenges" />
                    <TextAreaField label="Patient Preferences" />
                    <TextAreaField label="Communication Needs" />
                    <TextAreaField label="Other Relevant Background" />
                  </div>
                </SectionWrapper>
              )}

              {activeSection === "clinical" && (
                <SectionWrapper key="clinical" title="3. Clinical Conditions & Health History" icon={<Activity className="w-5 h-5 text-brand-teal" />} showMic={isHybridMode || showDictationMics}>
                  <TableInput
                    columns={["Condition / Diagnosis", "Status", "Onset / Date", "Current Symptoms / Impact", "Treatment / Management", "Provider / Notes"]}
                    rows={3}
                    addLabel="condition"
                  />
                  <h4 className="text-sm font-semibold text-slate-800 mt-6 mb-3">Recent Clinical Events</h4>
                  <TableInput
                    columns={["Date", "Event / Hospitalization / ER", "Reason", "Outcome", "Follow-up Required"]}
                    rows={2}
                    addLabel="event"
                  />
                </SectionWrapper>
              )}

              {activeSection === "meds" && (
                <SectionWrapper key="meds" title="4. Medication Management" icon={<Pill className="w-5 h-5 text-brand-teal" />} showMic={isHybridMode || showDictationMics}>
                  <TableInput
                    columns={["Medication", "Dose", "Route", "Frequency", "Purpose", "Special Instructions", "Monitoring / Side Effects"]}
                    rows={4}
                    addLabel="medication"
                    rowStates={[
                      {
                        fieldId: "meds-1",
                        confidence: isHybridMode ? "high" : undefined,
                        isHovered: hoveredFieldId === "meds-1",
                        defaultValues: ["Lisinopril", "10mg", "Oral", "Daily", "Hypertension", "", ""]
                      }
                    ]}
                    onRowHover={(idx, fieldId) => fieldId && onFieldHover?.(fieldId)}
                    onRowLeave={onFieldLeave}
                  />
                  <h4 className="text-sm font-semibold text-slate-800 mt-6 mb-3">Medication Safety Notes</h4>
                  <div className="space-y-3">
                    <TextAreaField label="Allergies / Adverse Reactions" />
                    <TextAreaField label="Medication Assistance Required" />
                    <TextAreaField label="Refill / Adherence Concerns" />
                    <TextAreaField label="Medication Reconciliation Notes" />
                  </div>
                </SectionWrapper>
              )}

              {activeSection === "adls" && (
                <SectionWrapper key="adls" title="5. Functional Assessment – ADLs" icon={<Accessibility className="w-5 h-5 text-brand-teal" />} showMic={isHybridMode || showDictationMics}>
                  <div className="space-y-3">
                    {adlsList.map((item, idx) => {
                      const fieldId = `adls-${item.toLowerCase().replace(/[\s\/]+/g, '-')}`;
                      const isHovered = hoveredFieldId === fieldId;
                      let confidence: ConfidenceLevel | undefined;
                      if (isHybridMode) {
                        if (item === 'Dressing') confidence = 'review';
                        if (item === 'Bathing') confidence = 'review';
                      }

                      return (
                        <div
                          key={item}
                          onMouseEnter={() => onFieldHover?.(fieldId)}
                          onMouseLeave={onFieldLeave}
                          className={clsx(
                            "grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl border items-center transition-colors",
                            isHovered ? "bg-brand-teal/5 border-brand-teal/30 shadow-[0_6px_32px_rgba(0,0,0,0.06)]" : "bg-slate-50 border-slate-100"
                          )}
                        >
                          <div className="font-medium text-sm text-slate-800 flex flex-col gap-1">
                            {item}
                            {confidence && <ConfidenceBadge level={confidence} />}
                          </div>
                          <div className="md:col-span-2 flex gap-4">
                            <label className="flex items-center gap-2 text-sm text-slate-600"><input type="radio" name={item} className="text-brand-teal focus:ring-brand-teal" /> Independent</label>
                            <label className="flex items-center gap-2 text-sm text-slate-600"><input type="radio" name={item} className="text-brand-teal focus:ring-brand-teal" defaultChecked={item === 'Bathing' || item === 'Dressing'} /> Needs Assistance</label>
                            <label className="flex items-center gap-2 text-sm text-slate-600"><input type="radio" name={item} className="text-brand-teal focus:ring-brand-teal" /> Dependent</label>
                          </div>
                          <div>
                            <input type="text" placeholder="Details / Needs..." defaultValue={item === 'Dressing' ? "right hip stiffness" : (item === 'Bathing' ? "1 person assist" : "")} className={clsx("w-full text-xs p-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-teal", isHovered ? "bg-white border-brand-teal/50" : "border-slate-200 bg-white")} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <button type="button" onClick={() => setAdlsList([...adlsList, `Custom ADL ${adlsList.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add ADL
                  </button>
                </SectionWrapper>
              )}

              {activeSection === "iadls" && (
                <SectionWrapper key="iadls" title="6. Instrumental Activities of Daily Living" icon={<Home className="w-5 h-5 text-brand-teal" />} showMic={isHybridMode || showDictationMics}>
                  <div className="space-y-3">
                    {iadlsList.map((item, idx) => (
                      <div key={`${item}-${idx}`} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 items-center">
                        <div className="font-medium text-sm text-slate-800">{item.startsWith('Custom') ? <input type="text" defaultValue={item} className="bg-transparent border-b border-dashed border-slate-300 outline-none w-full" /> : item}</div>
                        <div className="md:col-span-2 flex gap-4">
                          <label className="flex items-center gap-2 text-sm text-slate-600"><input type="radio" name={item} className="text-brand-teal focus:ring-brand-teal" /> Independent</label>
                          <label className="flex items-center gap-2 text-sm text-slate-600"><input type="radio" name={item} className="text-brand-teal focus:ring-brand-teal" /> Needs Assistance</label>
                          <label className="flex items-center gap-2 text-sm text-slate-600"><input type="radio" name={item} className="text-brand-teal focus:ring-brand-teal" /> Dependent</label>
                        </div>
                        <div>
                          <input type="text" placeholder="Limitations..." className="w-full text-xs p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-teal" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setIadlsList([...iadlsList, `Custom IADL ${iadlsList.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add IADL
                  </button>
                  <h4 className="text-sm font-semibold text-slate-800 mt-8 mb-3">Assistive Devices / Equipment</h4>
                  <TableInput columns={["Equipment / Device", "Purpose", "Current Condition", "Training / Assistance Needed", "Notes"]} rows={2} addLabel="device" />
                </SectionWrapper>
              )}

              {activeSection === "psychosocial" && (
                <SectionWrapper key="psychosocial" title="7. Cognitive, Behavioral & Psychosocial" icon={<Brain className="w-5 h-5 text-brand-teal" />} showMic={isHybridMode || showDictationMics}>
                  <TableInput
                    columns={["Domain", "Assessment / Findings", "Support Required", "Monitoring / Notes"]}
                    rows={0}
                    addLabel="finding"
                  />
                  <div className="space-y-3 mt-3">
                    {psychosocialDomains.map((domain, idx) => (
                      <div key={`${domain}-${idx}`} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div className="p-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg flex items-center border border-slate-100">{domain.startsWith('Custom') ? <input type="text" defaultValue={domain} className="bg-transparent border-b border-dashed border-slate-300 outline-none w-full" /> : domain}</div>
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Assessment..." />
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Support Required..." />
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Monitoring Notes..." />
                      </div>
                    ))}
                  </div>
                </SectionWrapper>
              )}

              {activeSection === "nutrition" && (
                <SectionWrapper key="nutrition" title="8. Nutrition, Hydration & Elimination" icon={<Utensils className="w-5 h-5 text-brand-teal" />} showMic={isHybridMode || showDictationMics}>
                  <div className="space-y-3 mt-3">
                    {nutritionAreas.map((area, idx) => (
                      <div key={`${area}-${idx}`} className="grid grid-cols-1 md:grid-cols-5 gap-2">
                        <div className="p-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg flex items-center border border-slate-100 md:col-span-2">{area.startsWith('Custom') ? <input type="text" defaultValue={area} className="bg-transparent border-b border-dashed border-slate-300 outline-none w-full" /> : area}</div>
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Risk / Concern..." />
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Intervention..." />
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Monitoring..." />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setNutritionAreas([...nutritionAreas, `Custom Area ${nutritionAreas.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add entry
                  </button>
                </SectionWrapper>
              )}

              {activeSection === "safety" && (
                <SectionWrapper key="safety" title="9. Safety & Risk Assessment" icon={<AlertTriangle className="w-5 h-5 text-brand-teal" />} showMic={isHybridMode || showDictationMics}>
                  <div className="space-y-3">
                    {safetyRisks.map((risk, idx) => {
                      const fieldId = `safety-${risk.toLowerCase().replace(/[\s\/]+/g, '-')}`;
                      const isHovered = hoveredFieldId === fieldId;
                      const confidence = isHybridMode && risk === 'Falls' ? 'high' : undefined;

                      return (
                        <div
                          key={risk}
                          onMouseEnter={() => onFieldHover?.(fieldId)}
                          onMouseLeave={onFieldLeave}
                          className={clsx(
                            "grid grid-cols-1 md:grid-cols-6 gap-3 items-center p-3 rounded-xl border transition-colors",
                            isHovered ? "bg-brand-teal/5 border-brand-teal/30 shadow-[0_6px_32px_rgba(0,0,0,0.06)]" : "bg-slate-50 border-slate-100"
                          )}
                        >
                          <div className="font-medium text-sm text-slate-800 md:col-span-1 flex flex-col gap-1">
                            {risk.startsWith('Custom') ? <input type="text" defaultValue={risk} className="bg-transparent border-b border-dashed border-slate-300 outline-none w-full" /> : risk}
                            {confidence && <ConfidenceBadge level={confidence} />}
                          </div>
                          <div className="md:col-span-1">
                            <select className="w-full text-xs p-2 border border-slate-200 rounded-lg" defaultValue={risk === 'Falls' ? 'high' : ''}>
                              <option value="">Risk Level</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                          <input type="text" className="md:col-span-1 p-2 text-xs border border-slate-200 rounded-lg" placeholder="Identified Risk" defaultValue={risk === 'Falls' ? 'Morse Score 65' : ''} />
                          <input type="text" className="md:col-span-2 p-2 text-xs border border-slate-200 rounded-lg" placeholder="Prevention / Intervention" />
                          <input type="text" className="md:col-span-1 p-2 text-xs border border-slate-200 rounded-lg" placeholder="Escalation" />
                        </div>
                      )
                    })}
                  </div>
                  <button type="button" onClick={() => setSafetyRisks([...safetyRisks, `Custom Risk ${safetyRisks.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add risk
                  </button>
                  <h4 className="text-sm font-semibold text-slate-800 mt-8 mb-3">Safety Equipment / Environmental Needs</h4>
                  <TableInput columns={["Item / Modification", "Need", "Status", "Notes"]} rows={2} addLabel="modification" />
                </SectionWrapper>
              )}

              {activeSection === "needs" && (
                <SectionWrapper key="needs" title="10. Care Needs / Problems & Priorities" icon={<ListTodo className="w-5 h-5 text-brand-teal" />} showMic={isHybridMode || showDictationMics}>
                  <p className="text-xs text-slate-500 mb-4">Priority should reflect urgency, safety impact, patient preference, and potential for meaningful improvement.</p>
                  <div className="space-y-3">
                    {needsList.map((priority, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0">{priority}</div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg" placeholder="Problem / Care Need" />
                          <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg" placeholder="Supporting Evidence" />
                          <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg" placeholder="Goal / Expected Outcome" />
                          <div className="flex gap-2">
                            <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg flex-1" placeholder="Responsible Person" />
                            <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg w-24" placeholder="Frequency" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setNeedsList([...needsList, needsList.length + 1])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add care need
                  </button>
                </SectionWrapper>
              )}

              {activeSection === "goals" && (
                <SectionWrapper key="goals" title="11. Goals & Expected Outcomes" icon={<Flag className="w-5 h-5 text-brand-teal" />} showMic={isHybridMode || showDictationMics}>
                  <div className="space-y-3">
                    {goalsList.map((goalId, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="font-bold text-sm text-slate-400 mt-2 w-6">{goalId}</div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                          <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg md:col-span-3" placeholder="Goal Statement" />
                          <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg" placeholder="Baseline" />
                          <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg" placeholder="Target Outcome" />
                          <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg" placeholder="Timeframe" />
                          <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg md:col-span-2" placeholder="Success Measure" />
                          <select className="p-2 text-xs border border-slate-200 rounded-lg">
                            <option>Not Started</option>
                            <option>In Progress</option>
                            <option>Achieved</option>
                            <option>Modified</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setGoalsList([...goalsList, `G${goalsList.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add goal
                  </button>
                </SectionWrapper>
              )}

              {activeSection === "interventions" && (
                <SectionWrapper key="interventions" title="12. Care Interventions & Instructions" icon={<Stethoscope className="w-5 h-5 text-brand-teal" />}>
                  <div className="space-y-3">
                    {interventionsList.map((area, idx) => (
                      <div key={`${area}-${idx}`} className="grid grid-cols-1 md:grid-cols-6 gap-2">
                        <div className="p-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg flex items-center border border-slate-100">{area.startsWith('Custom') ? <input type="text" defaultValue={area} className="bg-transparent border-b border-dashed border-slate-300 outline-none w-full" /> : area}</div>
                        <input type="text" className="md:col-span-2 p-2 text-sm border border-slate-200 rounded-lg" placeholder="Intervention / Action" />
                        <input type="text" className="md:col-span-3 p-2 text-sm border border-slate-200 rounded-lg" placeholder="Detailed Instructions" />
                        <div className="md:col-start-2 md:col-span-5 flex gap-2">
                          <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg w-1/4" placeholder="Frequency" />
                          <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg w-1/4" placeholder="Responsible" />
                          <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg flex-1" placeholder="Expected Outcome" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setInterventionsList([...interventionsList, `Custom Intervention ${interventionsList.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add intervention
                  </button>
                </SectionWrapper>
              )}

              {activeSection === "caregiver" && (
                <SectionWrapper key="caregiver" title="13. Caregiver Instructions & Daily Support" icon={<Users className="w-5 h-5 text-brand-teal" />}>
                  <div className="space-y-3 mt-3">
                    {caregiverInstructions.map((area, idx) => (
                      <div key={`${area}-${idx}`} className="grid grid-cols-1 md:grid-cols-5 gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <div className="p-2 text-sm font-medium text-brand-teal flex items-center">{area.startsWith('Custom') ? <input type="text" defaultValue={area} className="bg-transparent border-b border-dashed border-slate-300 outline-none w-full" /> : area}</div>
                        <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg" placeholder="Caregiver Instructions" />
                        <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg" placeholder="What to Monitor" />
                        <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg" placeholder="When to Escalate" />
                        <input type="text" className="p-2 text-xs border border-slate-200 rounded-lg" placeholder="Doc Required" />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setCaregiverInstructions([...caregiverInstructions, `Custom Instruction ${caregiverInstructions.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add instruction
                  </button>
                </SectionWrapper>
              )}

              {activeSection === "team" && (
                <SectionWrapper key="team" title="14. Care Team, Providers & Appointments" icon={<Calendar className="w-5 h-5 text-brand-teal" />}>
                  <div className="space-y-3 mt-3">
                    {teamRoles.map((role, idx) => (
                      <div key={`${role}-${idx}`} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div className="p-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg flex items-center border border-slate-100">{role.startsWith('Custom') ? <input type="text" defaultValue={role} className="bg-transparent border-b border-dashed border-slate-300 outline-none w-full" /> : role}</div>
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Name" />
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Organization" />
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Phone / Contact" />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setTeamRoles([...teamRoles, `Custom Role ${teamRoles.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add team member
                  </button>
                  <h4 className="text-sm font-semibold text-slate-800 mt-8 mb-3">Appointments & Follow-up</h4>
                  <TableInput columns={["Date", "Provider", "Appt Type / Reason", "Preparation Needed", "Outcome"]} rows={2} addLabel="appointment" />
                </SectionWrapper>
              )}

              {activeSection === "schedule" && (
                <SectionWrapper key="schedule" title="15. Daily / Weekly Care Schedule" icon={<Clock className="w-5 h-5 text-brand-teal" />}>
                  <div className="space-y-3">
                    {scheduleTimes.map((time, idx) => (
                      <div key={`${time}-${idx}`} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
                        <div className="p-2 text-sm font-medium text-slate-700">{time.startsWith('Custom') ? <input type="text" defaultValue={time} className="bg-transparent border-b border-dashed border-slate-300 outline-none w-full" /> : time}</div>
                        <input type="text" className="md:col-span-2 p-2 text-sm border border-slate-200 rounded-lg bg-slate-50" placeholder="Activity / Task" />
                        <input type="text" className="md:col-span-2 p-2 text-sm border border-slate-200 rounded-lg bg-slate-50" placeholder="Instructions & Responsibility" />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setScheduleTimes([...scheduleTimes, `Custom Time ${scheduleTimes.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add schedule entry
                  </button>
                </SectionWrapper>
              )}

              {activeSection === "monitoring" && (
                <SectionWrapper key="monitoring" title="16. Monitoring, Progress & Evaluation" icon={<LineChart className="w-5 h-5 text-brand-teal" />}>
                  <TableInput
                    columns={["Review Date", "Goal / Need", "Current Status", "Progress / Evidence", "Barriers", "Next Review"]}
                    rows={3}
                    addLabel="review"
                  />
                  <h4 className="text-sm font-semibold text-slate-800 mt-8 mb-3">Outcome Summary</h4>
                  <div className="space-y-3">
                    {outcomeAreas.map((area, idx) => (
                      <div key={`${area}-${idx}`} className="grid grid-cols-1 md:grid-cols-5 gap-2">
                        <div className="p-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg flex items-center border border-slate-100">{area.startsWith('Custom') ? <input type="text" defaultValue={area} className="bg-transparent border-b border-dashed border-slate-300 outline-none w-full" /> : area}</div>
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Baseline" />
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Current Status" />
                        <select className="p-2 text-sm border border-slate-200 rounded-lg text-slate-500">
                          <option>Trend</option>
                          <option>Improving</option>
                          <option>Stable</option>
                          <option>Declining</option>
                        </select>
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Notes" />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setOutcomeAreas([...outcomeAreas, `Custom Area ${outcomeAreas.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add summary entry
                  </button>
                </SectionWrapper>
              )}

              {activeSection === "preferences" && (
                <SectionWrapper key="preferences" title="17. Patient / Family Preferences & Support Plan" icon={<Heart className="w-5 h-5 text-brand-teal" />}>
                  <div className="space-y-3">
                    {preferencesList.map((cat, idx) => (
                      <div key={`${cat}-${idx}`} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg flex items-center border border-slate-100">{cat.startsWith('Custom') ? <input type="text" defaultValue={cat} className="bg-transparent border-b border-dashed border-slate-300 outline-none w-full" /> : cat}</div>
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Preference / Requirement" />
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="How Plan Accommodates It" />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setPreferencesList([...preferencesList, `Custom Preference ${preferencesList.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add preference
                  </button>
                  <h4 className="text-sm font-semibold text-slate-800 mt-8 mb-3">Education & Training Provided</h4>
                  <TableInput columns={["Topic", "Provided To", "Date", "Method", "Understanding / Follow-up"]} rows={2} addLabel="training" />
                </SectionWrapper>
              )}

              {activeSection === "summary" && (
                <SectionWrapper key="summary" title="18. Emergency, Escalation & Final Care Summary" icon={<Phone className="w-5 h-5 text-brand-teal" />}>

                  <h4 className="text-sm font-semibold text-slate-800 mb-3 text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Warning Signs & Escalation
                  </h4>
                  <TableInput columns={["Warning Sign / Situation", "Immediate Action", "Notify", "Urgency", "Documentation"]} rows={3} addLabel="warning" />

                  <h4 className="text-sm font-semibold text-slate-800 mt-8 mb-3 border-t border-slate-200 pt-6">Final Care Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextAreaField label="Overall Status" />
                    <TextAreaField label="Primary Care Needs" />
                    <TextAreaField label="Highest-Priority Risks" />
                    <TextAreaField label="Key Interventions" />
                    <TextAreaField label="Patient Goals" />
                    <TextAreaField label="Caregiver Priorities" />
                    <TextAreaField label="Immediate Actions" />
                    <TextAreaField label="Long-Term Plan" />
                    <TextAreaField label="Follow-up Requirements" className="md:col-span-2" />
                  </div>
                  <button type="button" className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center gap-1.5">
                    + Add version entry
                  </button>

                  <h4 className="text-sm font-semibold text-slate-800 mt-8 mb-3 border-t border-slate-200 pt-6">Approvals / Sign-Off</h4>
                  <div className="space-y-4">
                    {approvalsList.map((role, idx) => (
                      <div key={`${role}-${idx}`} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                        <div className="p-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg border border-slate-100">{role.startsWith('Custom') ? <input type="text" defaultValue={role} className="bg-transparent border-b border-dashed border-slate-300 outline-none w-full" /> : role}</div>
                        <input type="text" className="p-2 text-sm border border-slate-200 rounded-lg" placeholder="Name" />
                        <div className="p-2 text-sm border border-slate-200 border-dashed rounded-lg text-slate-400 text-center cursor-pointer hover:bg-slate-50">Click to Sign</div>
                        <input type="date" className="p-2 text-sm border border-slate-200 rounded-lg" />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setApprovalsList([...approvalsList, `Custom Signatory ${approvalsList.length + 1}`])} className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5">
                    + Add signatory
                  </button>

                </SectionWrapper>
              )}

            </AnimatePresence>

          </form>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex justify-between items-center z-10 px-4">
        <div className="text-sm text-slate-500 font-medium hidden sm:block">
          All changes are saved locally.
        </div>
        <div className="flex gap-3 ml-auto">
          <button
            type="button"
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" /> Save Draft
          </button>
          <button
            type="submit"
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-semibold text-white bg-brand-teal rounded-xl hover:bg-brand-teal/90 transition-all shadow-[0_6px_32px_rgba(239,68,68,0.04)] shadow-brand-teal/20 flex items-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved!
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                Finalize & Submit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionWrapper({ title, icon, children, showMic = false }: { title: string, icon: React.ReactNode, children: React.ReactNode, showMic?: boolean }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }
    setIsRecording(true);
    // Simulate short listening state
    setTimeout(() => {
      setIsRecording(false);
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 800);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className={clsx("transition-all duration-500 rounded-2xl", isFlashing && "bg-brand-teal/10 shadow-[0_0_20px_rgba(20,184,166,0.3)] p-4 -m-4")}
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        {showMic && (
          <button
            type="button"
            onClick={handleMicClick}
            className={clsx(
              "px-3 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-[0_6px_32px_rgba(0,0,0,0.06)] border",
              isRecording
                ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                : "bg-brand-teal/5 text-brand-teal border-brand-teal/10 hover:bg-brand-teal hover:text-white"
            )}
            title={isRecording ? "Stop dictating" : "Dictate section"}
          >
            <div className="relative">
              {isRecording && <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>}
              <Mic className={clsx("w-4 h-4 relative", isRecording && "animate-pulse")} />
            </div>
            <span className="text-xs font-semibold hidden sm:inline">
              {isRecording ? "Listening..." : "Dictate"}
            </span>
          </button>
        )}
      </div>
      <div className={clsx("transition-opacity duration-300", isRecording && "opacity-60 pointer-events-none")}>
        {children}
      </div>
    </motion.div>
  );
}

function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  if (level === "high") {
    return <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded shadow-[0_6px_32px_rgba(0,0,0,0.06)] w-fit"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> High Conf</span>;
  }
  if (level === "review") {
    return <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-yellow-700 bg-yellow-50 border border-yellow-200 px-1.5 py-0.5 rounded shadow-[0_6px_32px_rgba(0,0,0,0.06)] w-fit"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400" /> Review</span>;
  }
  return <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded shadow-[0_6px_32px_rgba(0,0,0,0.06)] w-fit"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Missing</span>;
}

function InputField({
  label, type = "text", className = "",
  fieldId, confidence, isHovered, onHover, onLeave, defaultValue
}: {
  label: string, type?: string, className?: string,
  fieldId?: string, confidence?: ConfidenceLevel, isHovered?: boolean,
  onHover?: () => void, onLeave?: () => void, defaultValue?: string
}) {
  return (
    <div
      className={clsx(`space-y-1.5 p-2 rounded-xl border transition-colors ${className}`, isHovered ? 'bg-brand-teal/5 border-brand-teal/30 shadow-[0_6px_32px_rgba(0,0,0,0.06)]' : 'border-transparent')}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        {confidence && <ConfidenceBadge level={confidence} />}
      </div>
      <input
        type={type}
        defaultValue={defaultValue}
        className={clsx(
          "w-full px-3 py-2 border rounded-xl text-sm outline-none transition-shadow",
          confidence === "missing"
            ? "bg-red-50 border-red-200 text-red-900 focus:ring-2 focus:ring-red-400 placeholder:text-red-400"
            : clsx(
              "bg-white focus:ring-2 focus:ring-brand-teal",
              isHovered ? "border-brand-teal/50" : "border-slate-200"
            )
        )}
        placeholder={confidence === "missing" ? "Not captured in audio — enter manually" : `Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

function TextAreaField({ label, className = "" }: { label: string, className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <textarea
        rows={3}
        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-teal outline-none transition-shadow bg-slate-50/50 focus:bg-white resize-y"
        placeholder={`Enter details for ${label.toLowerCase()}`}
      />
    </div>
  );
}

function TableInput({
  columns, rows = 3, rowStates, onRowHover, onRowLeave, addLabel
}: {
  columns: string[], rows?: number,
  rowStates?: { fieldId?: string, confidence?: ConfidenceLevel, isHovered?: boolean, defaultValues?: string[] }[],
  onRowHover?: (idx: number, fieldId?: string) => void,
  onRowLeave?: () => void,
  addLabel?: string
}) {
  const [rowCount, setRowCount] = useState(rows);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-700 uppercase">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 whitespace-nowrap">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(1, rowCount) }).map((_, rIdx) => {
              const state = rowStates?.[rIdx];
              return (
                <tr
                  key={rIdx}
                  className={clsx("border-t transition-colors", state?.isHovered ? "bg-brand-teal/5 border-brand-teal/20" : "border-slate-100")}
                  onMouseEnter={() => onRowHover?.(rIdx, state?.fieldId)}
                  onMouseLeave={onRowLeave}
                >
                  {columns.map((_, cIdx) => (
                    <td key={cIdx} className="p-0 relative">
                      {cIdx === 0 && state?.confidence && (
                        <div className="absolute left-1 top-1">
                          <div className={clsx("w-1.5 h-1.5 rounded-full shadow-[0_6px_32px_rgba(0,0,0,0.06)]", state.confidence === "high" ? "bg-green-500" : "bg-yellow-400")} />
                        </div>
                      )}
                      <input
                        type="text"
                        defaultValue={state?.defaultValues?.[cIdx] || ""}
                        className="w-full px-4 py-3 outline-none focus:bg-brand-teal/5 focus:ring-inset focus:ring-1 focus:ring-brand-teal bg-transparent"
                        placeholder="..."
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {addLabel && (
        <button
          type="button"
          onClick={() => setRowCount(r => r + 1)}
          className="self-start px-3 py-1.5 text-xs font-semibold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 border-dashed rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors shadow-[0_6px_32px_rgba(239,68,68,0.04)] flex items-center gap-1.5"
        >
          + Add {addLabel}
        </button>
      )}
    </div>
  );
}
