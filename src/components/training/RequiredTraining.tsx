"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CourseCard } from "./CourseCard";
import { MOCK_COURSES, MOCK_USER_COURSES } from "@/lib/mockTrainingData";
import { ConfigureRuleModal } from "./modals/ConfigureRuleModal";
import {
  ShieldCheck, Clock, Plus, Sliders, Users, CheckCircle2,
  AlertTriangle, Filter, Sparkles, Settings
} from "lucide-react";

export function RequiredTraining() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("All");
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [activeRules, setActiveRules] = useState([
    { role: "RN (Registered Nurse)", count: "6 Mandatory Courses", window: "30-Day Onboarding", status: "Active Rule" },
    { role: "CNA (Certified Nursing Assistant)", count: "8 Mandatory Courses", window: "30-Day Onboarding", status: "Active Rule" },
    { role: "HHA (Home Health Aide)", count: "5 Mandatory Courses", window: "14-Day Onboarding", status: "Active Rule" },
    { role: "LPN (Licensed Practical Nurse)", count: "7 Mandatory Courses", window: "30-Day Onboarding", status: "Active Rule" },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const roles = ["All", "RN", "CNA", "HHA", "LPN"];

  const requiredCourses = MOCK_USER_COURSES.map((uc) => {
    const course = MOCK_COURSES.find((c) => c.id === uc.courseId);
    return { ...course, ...uc };
  }).filter((c) => c.required);

  const filteredCourses = requiredCourses.filter((course) => {
    const cat = course.category || "";
    if (selectedRole === "All") return true;
    if (selectedRole === "RN") return ["HIPAA", "Medication Management", "CPR/First Aid"].includes(cat);
    if (selectedRole === "CNA") return ["OSHA", "Infection Control", "Dementia Care", "Fire Safety"].includes(cat);
    if (selectedRole === "HHA") return ["Abuse Prevention", "Emergency Prep", "Documentation"].includes(cat);
    return true;
  });

  const handleSaveRule = (newRule: any) => {
    setActiveRules([
      ...activeRules,
      {
        role: newRule.role,
        count: "6 Mandatory Courses",
        window: `${newRule.gracePeriod} Window`,
        status: "Active Rule",
      },
    ]);
    showToast(`Saved required training rule configuration for ${newRule.role}.`);
  };

  return (
    <div className="space-y-6 pb-6 relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-brand-teal" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Rule Configuration Studio */}
      <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">Mandatory Role Rules & Requirements Studio</h3>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-brand-teal/10 text-brand-teal rounded-full border border-brand-teal/20">
                Rule Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Configure mandatory LMS compliance rules assigned automatically to caregivers based on role and hire date.
            </p>
          </div>

          <button
            onClick={() => setRuleModalOpen(true)}
            className="px-4 py-2.5 bg-brand-teal hover:bg-[#0c8a6f] text-white rounded-2xl text-xs font-bold shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all flex items-center gap-2 shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Configure New Rule
          </button>
        </div>

        {/* Active Rules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeRules.map((rule, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2 hover:bg-white hover:border-brand-teal/40 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            >
              <div className="flex justify-between items-start">
                <span className="font-extrabold text-slate-900 text-xs">{rule.role}</span>
                <span className="w-2 h-2 rounded-full bg-brand-teal" />
              </div>
              <p className="text-xs font-bold text-brand-teal">{rule.count}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{rule.window}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Filter & Catalog */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Mandatory Assigned Courses</h3>
            <p className="text-xs text-slate-500">Filtered view of required compliance modules</p>
          </div>

          {/* Role Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Role Filter:
            </span>
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${selectedRole === r
                  ? "bg-slate-900 text-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] scale-105"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
              >
                {r === "All" ? "All Roles" : r}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCourses.map((course: any) => (
            <CourseCard
              key={course.id}
              {...course}
              actionLabel={course.status === "Completed" ? "Review Module" : course.status === "In Progress" ? "Resume" : "Start Course"}
              onAction={() => router.push(`/training/course/${course.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      <ConfigureRuleModal
        isOpen={ruleModalOpen}
        onClose={() => setRuleModalOpen(false)}
        onSaveRule={handleSaveRule}
      />
    </div>
  );
}
