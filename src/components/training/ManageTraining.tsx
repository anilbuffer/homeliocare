"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp, CheckCircle2, AlertCircle, AlertTriangle, BarChart3,
  BellRing, Plus, Edit2, Archive, ChevronDown, Search, Filter,
  User, Check, X, Sparkles, ExternalLink, ArrowRight
} from "lucide-react";
import { ComplianceProgressBar } from "./ComplianceProgressBar";
import {
  MOCK_STAFF_STATUS, MOCK_COURSES, MOCK_QUIZ_STATS, MOCK_SURVEYS,
  StaffTrainingStatus, Course
} from "@/lib/mockTrainingData";

import { SendReminderModal } from "./modals/SendReminderModal";
import { CaregiverProfileModal } from "./modals/CaregiverProfileModal";
import { CreateEditCourseModal } from "./modals/CreateEditCourseModal";
import { ArchiveCourseModal } from "./modals/ArchiveCourseModal";
import { QuizAnalyticsModal } from "./modals/QuizAnalyticsModal";
import { SurveyResultsModal } from "./modals/SurveyResultsModal";

export function ManageTraining() {
  const router = useRouter();

  // State
  const [remindersOn, setRemindersOn] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Staff Table State
  const [staffFilter, setStaffFilter] = useState<"all" | "compliant" | "overdue" | "expiring">("all");
  const [staffSort, setStaffSort] = useState<"compliance" | "name" | "expiring">("compliance");
  const [staffSearch, setStaffSearch] = useState("");

  // Course Library State
  const [coursesList, setCoursesList] = useState<Course[]>(MOCK_COURSES);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseCategoryFilter, setCourseCategoryFilter] = useState("All");

  // Modals state
  const [reminderModalStaff, setReminderModalStaff] = useState<StaffTrainingStatus | null>(null);
  const [profileModalStaff, setProfileModalStaff] = useState<StaffTrainingStatus | null>(null);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [archiveModalCourse, setArchiveModalCourse] = useState<Course | null>(null);
  const [quizAnalyticsOpen, setQuizAnalyticsOpen] = useState(false);
  const [surveyModalData, setSurveyModalData] = useState<{ name: string; responseRate: number } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Staff logic
  const filteredStaff = MOCK_STAFF_STATUS.filter((s) => {
    if (staffFilter === "compliant" && s.status !== "On track") return false;
    if (staffFilter === "overdue" && !s.daysOverdue) return false;
    if (staffFilter === "expiring" && s.certificationsExpiring === 0) return false;

    if (staffSearch.trim()) {
      const q = staffSearch.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q);
    }
    return true;
  }).sort((a, b) => {
    if (staffSort === "compliance") return b.complianceScore - a.complianceScore;
    if (staffSort === "name") return a.name.localeCompare(b.name);
    if (staffSort === "expiring") return b.certificationsExpiring - a.certificationsExpiring;
    return 0;
  });

  // Course logic
  const filteredCourses = coursesList.filter((c) => {
    if (courseCategoryFilter !== "All" && c.category !== courseCategoryFilter) return false;
    if (courseSearch.trim()) {
      return c.title.toLowerCase().includes(courseSearch.toLowerCase()) || c.category.toLowerCase().includes(courseSearch.toLowerCase());
    }
    return true;
  });

  // Category stats
  const categories = [
    { name: "HIPAA", score: 96, color: "bg-brand-teal" },
    { name: "OSHA", score: 88, color: "bg-amber-500" },
    { name: "Infection Control", score: 92, color: "bg-brand-teal" },
    { name: "Medicaid Compliance", score: 84, color: "bg-amber-500" },
    { name: "Medicare Compliance", score: 79, color: "bg-amber-500" },
    { name: "Medication Mgmt", score: 71, color: "bg-amber-500" },
    { name: "CPR/First Aid", score: 68, color: "bg-rose-500" },
    { name: "Fire Safety", score: 94, color: "bg-brand-teal" },
    { name: "Abuse Prevention", score: 82, color: "bg-amber-500" },
    { name: "Documentation", score: 65, color: "bg-rose-500" },
    { name: "Cybersecurity", score: 74, color: "bg-amber-500" },
    { name: "Dementia Care", score: 62, color: "bg-rose-500" },
  ];

  const handleSaveCourse = (updatedCourse: Partial<Course>) => {
    if (editingCourse) {
      setCoursesList(coursesList.map((c) => (c.id === updatedCourse.id ? ({ ...c, ...updatedCourse } as Course) : c)));
      showToast(`Updated course "${updatedCourse.title}" successfully.`);
    } else {
      const newCourse: Course = {
        id: updatedCourse.id || `c_${Date.now()}`,
        title: updatedCourse.title || "Untitled Course",
        category: updatedCourse.category || "General",
        format: updatedCourse.format || "Video",
        duration: updatedCourse.duration || "30m",
        required: updatedCourse.required ?? true,
        thumbnailColor: updatedCourse.thumbnailColor || "bg-brand-teal",
        passRate: updatedCourse.passRate || 80,
        attemptsAllowed: updatedCourse.attemptsAllowed || 3,
        assignedCount: updatedCourse.assignedCount || 20,
        completionRate: updatedCourse.completionRate || 0,
      };
      setCoursesList([newCourse, ...coursesList]);
      showToast(`Created new course "${newCourse.title}".`);
    }
  };

  const handleArchiveCourse = (courseId: string) => {
    const target = coursesList.find((c) => c.id === courseId);
    setCoursesList(coursesList.filter((c) => c.id !== courseId));
    showToast(`Archived course "${target?.title || "selected course"}".`);
  };

  return (
    <div className="space-y-6 pb-6 relative">
      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-brand-teal" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. KPI Strip (Interactive Filters) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main Hero Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 border border-slate-700/80 shadow-[0_6px_32px_rgba(0,0,0,0.12)] relative overflow-hidden flex flex-col col-span-1">
          <div className="text-[10px] font-extrabold text-teal-400 tracking-wider uppercase mb-1">
            AGENCY COMPLIANCE INDEX
          </div>
          <div className="text-2xl font-bold text-white flex items-end gap-3">
            82%
            <span className="text-xs font-bold text-teal-400 flex items-center mb-1 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
              <TrendingUp className="w-3 h-3 mr-1" /> +4.2% MoM
            </span>
          </div>
          <div className="text-[10px] text-slate-300 mt-auto pt-3 border-t border-white/10">
            Weighted across all 17 mandatory courses & certifications.
          </div>
        </div>

        {/* Interactive KPI Filter Cards */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Fully Compliant Staff */}
          <div
            onClick={() => setStaffFilter(staffFilter === "compliant" ? "all" : "compliant")}
            className={`rounded-2xl p-4 border transition-all duration-300 relative overflow-hidden cursor-pointer ${staffFilter === "compliant"
              ? "bg-brand-teal/10 border-brand-teal shadow-md ring-2 ring-brand-teal/20"
              : "bg-white border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:border-brand-teal/50"
              }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-600 tracking-wider uppercase">FULLY COMPLIANT</span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-teal-100/80 border border-teal-200">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900">4 Staff</div>
            <div className="text-[10px] text-slate-400 font-medium">Click to filter table</div>
          </div>

          {/* Overdue Training */}
          <div
            onClick={() => setStaffFilter(staffFilter === "overdue" ? "all" : "overdue")}
            className={`rounded-2xl p-4 border transition-all duration-300 relative overflow-hidden cursor-pointer ${staffFilter === "overdue"
              ? "bg-rose-50 border-rose-400 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ring-2 ring-rose-400/20"
              : "bg-white border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:border-rose-400/50"
              }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-rose-700">OVERDUE COURSES</span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-rose-100 border border-rose-200">
                <AlertCircle className="w-4 h-4 text-rose-600" />
              </div>
            </div>
            <div className="text-xl font-bold text-rose-950">2 Overdue</div>
            <div className="text-[10px] text-rose-600/80 font-medium">Click to filter table</div>
          </div>

          {/* Certs Expiring */}
          <div
            onClick={() => setStaffFilter(staffFilter === "expiring" ? "all" : "expiring")}
            className={`rounded-2xl p-4 border transition-all duration-300 relative overflow-hidden cursor-pointer ${staffFilter === "expiring"
              ? "bg-amber-50 border-amber-400 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ring-2 ring-amber-400/20"
              : "bg-white border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:border-amber-400/50"
              }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-amber-800 ">EXPIRING (30D)</span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-100 border border-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="text-xl font-bold text-amber-950">4 Caregivers</div>
            <div className="text-[10px] text-amber-700/80 font-medium">Click to filter table</div>
          </div>

          {/* Avg Completion Rate */}
          <div
            onClick={() => setStaffFilter("all")}
            className={`rounded-2xl p-4 border transition-all duration-300 relative overflow-hidden cursor-pointer ${staffFilter === "all"
              ? "bg-slate-50 border-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              : "bg-white border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1"
              }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-600">ALL ROSTER</span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-100 border border-blue-200">
                <BarChart3 className="w-4 h-4 text-blue-700" />
              </div>
            </div>
            <div className="text-xl font-bold text-slate-900">8 Total</div>
            <div className="text-[10px] text-slate-400 font-medium">Show all caregivers</div>
          </div>
        </div>
      </div>

      {/* 2. Compliance by Category */}
      <section className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Compliance by Category</h3>
          <p className="text-xs text-slate-500">Percent of active staff fully up to date by compliance module</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                setCourseCategoryFilter(cat.name);
                showToast(`Filtered Course Library by category "${cat.name}".`);
              }}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all cursor-pointer space-y-2"
            >
              <div className="flex justify-between items-end text-xs">
                <span className="font-bold text-slate-800 truncate pr-2">{cat.name}</span>
                <span className={`font-semibold ${cat.score >= 90 ? "text-brand-teal" : cat.score >= 70 ? "text-amber-600" : "text-rose-600"}`}>
                  {cat.score}%
                </span>
              </div>
              <ComplianceProgressBar progress={cat.score} colorClass={cat.color} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Staff Training Status Table */}
      <section className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Staff Training Roster</h3>
              {staffFilter !== "all" && (
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-brand-teal/10 text-brand-teal rounded-full border border-brand-teal/20 capitalize">
                  Filter: {staffFilter}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">Click any row to open full caregiver compliance record & credentials</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 w-full md:w-auto mt-3 md:mt-0">
            {/* Search Input */}
            <div className="relative w-full sm:w-auto sm:min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={staffSearch}
                onChange={(e) => setStaffSearch(e.target.value)}
                placeholder="Search caregiver or role..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-medium text-slate-800"
              />
            </div>

            {/* Sort Buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              <span className="text-slate-400 font-bold px-2 text-[10px] uppercase">Sort:</span>
              <button
                onClick={() => setStaffSort("compliance")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${staffSort === "compliance" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                Compliance
              </button>
              <button
                onClick={() => setStaffSort("name")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${staffSort === "name" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                Name
              </button>
              <button
                onClick={() => setStaffSort("expiring")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${staffSort === "expiring" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                Expiring
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 text-xs text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Caregiver</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Courses Completed</th>
                <th className="px-4 py-3 w-48">Compliance Score</th>
                <th className="px-4 py-3 text-center">Expiring Certs</th>
                <th className="px-4 py-3">Last LMS Activity</th>
                <th className="px-4 py-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredStaff.map((staff) => (
                <tr
                  key={staff.id}
                  onClick={() => setProfileModalStaff(staff)}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-extrabold shrink-0 shadow-sm">
                        {staff.avatar}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 group-hover:text-brand-teal transition-colors block">
                          {staff.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">ID: {staff.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">{staff.role}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {staff.coursesCompleted} / {staff.coursesTotal}
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span
                          className={`font-medium ${staff.status === "On track" ? "text-brand-teal" : staff.status === "At risk" ? "text-amber-600" : "text-rose-600"
                            }`}
                        >
                          {staff.status}
                        </span>
                        <span className="text-slate-700 font-extrabold">{staff.complianceScore}%</span>
                      </div>
                      <ComplianceProgressBar
                        progress={staff.complianceScore}
                        colorClass={staff.status === "On track" ? "bg-brand-teal" : staff.status === "At risk" ? "bg-amber-500" : "bg-rose-500"}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {staff.certificationsExpiring > 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> {staff.certificationsExpiring}
                      </span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs font-medium">{staff.lastActivity}</td>
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setReminderModalStaff(staff)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all shadow-[0_4px_24px_rgba(0,0,0,0.04)] cursor-pointer"
                    >
                      <BellRing className="w-3.5 h-3.5" /> Remind
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Row 4: Expiring & Overdue | Quiz Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Expiring & Overdue Items */}
        <section className="lg:col-span-2 bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Expiring & Overdue Alerts</h3>
              <p className="text-xs text-slate-500">Caregivers requiring immediate compliance attention</p>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="text-xs font-bold text-slate-600">Auto Reminders:</span>
              <button
                onClick={() => {
                  const nextState = !remindersOn;
                  setRemindersOn(nextState);
                  showToast(nextState ? "Automated SMS/Email reminders ENABLED." : "Automated reminders PAUSED.");
                }}
                className={`w-12 h-6 rounded-full p-1 transition-colors relative flex items-center cursor-pointer ${remindersOn ? "bg-brand-teal" : "bg-slate-300"
                  }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${remindersOn ? "translate-x-6" : "translate-x-0"
                    }`}
                />
              </button>
              <span className={`text-xs font-extrabold ${remindersOn ? "text-brand-teal" : "text-slate-400"}`}>
                {remindersOn ? "ON" : "OFF"}
              </span>
            </div>
          </div>

          <div className="p-4 flex-1 overflow-y-auto max-h-[320px] space-y-2.5">
            {MOCK_STAFF_STATUS.filter((s) => s.status !== "On track").map((staff) => (
              <div
                key={staff.id}
                className="flex items-center justify-between gap-3 p-3.5 bg-slate-50/80 border border-slate-200 rounded-2xl hover:bg-white hover:border-slate-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {staff.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{staff.name}</div>
                    <div className="text-xs text-slate-500 font-regular">
                      {staff.role} • {staff.daysOverdue ? "Bloodborne Pathogens & OSHA" : "CPR & AED Provider"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${staff.daysOverdue
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                  >
                    {staff.daysOverdue ? `${staff.daysOverdue}d overdue` : `${staff.daysLeft}d left`}
                  </span>
                  <button
                    onClick={() => setReminderModalStaff(staff)}
                    className="px-3 py-1.5 bg-brand-teal text-white hover:bg-[#0a7d62] rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                  >
                    Remind
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz & Assessments */}
        <section className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h3 className="text-base font-extrabold text-slate-900">Quiz & Assessments</h3>
              <p className="text-xs text-slate-500 font-medium">Last 30 days performance metrics</p>
            </div>
            <div className="mb-5 p-3.5 bg-brand-teal/10 border border-brand-teal/20 rounded-2xl">
              <span className="text-[10px] font-extrabold text-brand-teal block mb-1">
                AVERAGE PASS RATE
              </span>
              <span className="text-xl font-bold text-brand-teal">{MOCK_QUIZ_STATS.averagePassRate}%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block mb-2.5">
                Highest Friction Questions
              </span>
              <div className="space-y-2">
                {MOCK_QUIZ_STATS.mostFailedQuestions.map((q, i) => (
                  <div key={i} className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-800 font-medium truncate pr-2">{q.question}</span>
                    <span className="font-extrabold text-rose-600 shrink-0">{q.passRate}% pass</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => setQuizAnalyticsOpen(true)}
            className="w-full mt-4 py-3 rounded-2xl border border-slate-200 hover:border-brand-teal hover:bg-brand-teal/5 text-xs font-bold text-slate-800 hover:text-brand-teal transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex items-center justify-center gap-1.5"
          >
            <BarChart3 className="w-4 h-4" /> View Detailed Analytics
          </button>
        </section>
      </div>

      {/* Row 5: Course Library Catalog */}
      <section className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Course Library Catalog</h3>
            <p className="text-xs text-slate-500">Author, edit, and publish LMS modules for caregiver training</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 w-full md:w-auto mt-3 md:mt-0">
            {/* Search */}
            <div className="relative w-full sm:w-auto sm:min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-medium text-slate-800"
              />
            </div>

            <button
              onClick={() => {
                setEditingCourse(null);
                setCourseModalOpen(true);
              }}
              className="inline-flex justify-center items-center gap-2 bg-brand-teal hover:bg-[#0c8a6f] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all cursor-pointer w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" /> Create Course
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3">Pass %</th>
                <th className="px-4 py-3">Attempts</th>
                <th className="px-4 py-3">Assigned</th>
                <th className="px-4 py-3 w-48">Agency Completion</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td
                    onClick={() => router.push(`/training/course/${course.id}`)}
                    className="px-4 py-3 font-extrabold text-slate-900 group-hover:text-brand-teal cursor-pointer flex items-center gap-2"
                  >
                    <span>{course.title}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-brand-teal transition-opacity" />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-600">{course.format}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{course.passRate}%</td>
                  <td className="px-4 py-3 font-semibold text-slate-600">{course.attemptsAllowed}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{course.assignedCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <ComplianceProgressBar
                        progress={course.completionRate}
                        colorClass={course.completionRate > 80 ? "bg-brand-teal" : course.completionRate > 60 ? "bg-amber-500" : "bg-rose-500"}
                      />
                      <span className="text-xs font-extrabold text-slate-700">{course.completionRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingCourse(course);
                          setCourseModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-brand-teal hover:bg-brand-teal/10 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        title="Edit course details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setArchiveModalCourse(course)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        title="Archive course"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Row 6: Surveys */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Caregiver Feedback & Surveys</h3>
          <p className="text-xs text-slate-500">Pulse surveys and course ratings from staff</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_SURVEYS.map((survey) => (
            <div
              key={survey.name}
              className="flex flex-col bg-white backdrop-blur-xl rounded-xl p-4 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:[0_4px_20px_rgba(0,0,0,0.06)] hover:border-brand-teal/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-slate-900 text-xs">{survey.name}</h4>
                <div className="w-7 h-7 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-xl font-semibold text-slate-900 mb-1">{survey.responseRate}%</div>
              <div className="text-[10px] text-slate-400 mb-3 uppercase font-bold tracking-wider">Response Rate</div>
              <ComplianceProgressBar
                progress={survey.responseRate}
                colorClass={survey.responseRate > 80 ? "bg-brand-teal" : survey.responseRate > 60 ? "bg-amber-500" : "bg-rose-500"}
              />
              <button
                onClick={() => setSurveyModalData(survey)}
                className="mt-4 text-xs font-semibold text-brand-teal hover:underline inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                View results →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MODALS */}
      <SendReminderModal
        isOpen={!!reminderModalStaff}
        onClose={() => setReminderModalStaff(null)}
        staff={reminderModalStaff}
        onSend={(msg, channels) => {
          showToast(`Dispatched compliance reminder to ${reminderModalStaff?.name}.`);
        }}
      />

      <CaregiverProfileModal
        isOpen={!!profileModalStaff}
        onClose={() => setProfileModalStaff(null)}
        staff={profileModalStaff}
        onSendReminder={(staff) => setReminderModalStaff(staff)}
      />

      <CreateEditCourseModal
        isOpen={courseModalOpen}
        onClose={() => {
          setCourseModalOpen(false);
          setEditingCourse(null);
        }}
        courseToEdit={editingCourse}
        onSave={handleSaveCourse}
      />

      <ArchiveCourseModal
        isOpen={!!archiveModalCourse}
        onClose={() => setArchiveModalCourse(null)}
        course={archiveModalCourse}
        onArchive={handleArchiveCourse}
      />

      <QuizAnalyticsModal
        isOpen={quizAnalyticsOpen}
        onClose={() => setQuizAnalyticsOpen(false)}
      />

      <SurveyResultsModal
        isOpen={!!surveyModalData}
        onClose={() => setSurveyModalData(null)}
        survey={surveyModalData}
      />
    </div>
  );
}
