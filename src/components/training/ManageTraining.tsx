"use client";

import React, { useState } from "react";
import {
  TrendingUp, CheckCircle2, AlertCircle, AlertTriangle, BarChart3,
  BellRing, Plus, Edit2, Archive, ChevronDown
} from "lucide-react";
import { ComplianceProgressBar } from "./ComplianceProgressBar";
import {
  MOCK_STAFF_STATUS, MOCK_COURSES, MOCK_QUIZ_STATS, MOCK_SURVEYS
} from "@/lib/mockTrainingData";

export function ManageTraining() {
  const [remindersOn, setRemindersOn] = useState(true);

  // Stats for the categories
  const categories = [
    { name: "HIPAA", score: 96, color: "bg-brand-teal" },
    { name: "OSHA", score: 88, color: "bg-accent-amber" },
    { name: "Infection Control", score: 92, color: "bg-brand-teal" },
    { name: "Medicaid Compliance", score: 84, color: "bg-accent-amber" },
    { name: "Medicare Compliance", score: 79, color: "bg-accent-amber" },
    { name: "Medication Mgmt", score: 71, color: "bg-accent-amber" },
    { name: "CPR/First Aid", score: 68, color: "bg-accent-red" },
    { name: "Fire Safety", score: 94, color: "bg-brand-teal" },
    { name: "Abuse Prevention", score: 82, color: "bg-accent-amber" },
    { name: "Documentation", score: 65, color: "bg-accent-red" },
    { name: "Cybersecurity", score: 74, color: "bg-accent-amber" },
    { name: "Dementia Care", score: 62, color: "bg-accent-red" },
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* 1. KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main Hero Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col col-span-1 md:col-span-1">
          <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">AGENCY COMPLIANCE</div>
          <div className="text-3xl font-bold text-slate-800 flex items-end gap-3">
            82%
            <span className="text-xs font-semibold text-brand-teal flex items-center mb-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +4.2 vs last mo
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mt-auto pt-2 border-t border-slate-50/50">
            Weighted across all required courses & active certifications.
          </div>
        </div>

        {/* Other KPIs */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">FULLY COMPLIANT STAFF</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-teal-50">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-800">2</div>
              <div className="text-[10px] text-slate-400">8 total</div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">OVERDUE TRAINING</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50">
                <AlertCircle className="w-4 h-4 text-accent-red" />
              </div>
            </div>
            <div className="text-xl font-bold text-slate-800">2</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">CERTS EXPIRING (30D)</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50">
                <AlertTriangle className="w-4 h-4 text-accent-amber" />
              </div>
            </div>
            <div className="text-xl font-bold text-slate-800">4</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">AVG COMPLETION RATE</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50">
                <BarChart3 className="w-4 h-4 text-accent-blue" />
              </div>
            </div>
            <div className="text-xl font-bold text-slate-800">78%</div>
          </div>
        </div>
      </div>

      {/* 2. Compliance by Category */}
      <section className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-800">Compliance by Category</h3>
          <p className="text-xs text-slate-500">Percent of staff current on each category</p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
          {categories.map(cat => (
            <div key={cat.name} className="space-y-2">
              <div className="flex justify-between items-end text-sm">
                <span className="font-medium text-slate-700">{cat.name}</span>
                <span className={`font-bold ${cat.score >= 90 ? "text-brand-teal" : cat.score >= 70 ? "text-accent-amber" : "text-accent-red"
                  }`}>{cat.score}%</span>
              </div>
              <ComplianceProgressBar progress={cat.score} colorClass={cat.color} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Staff Training Status */}
      <section className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-800">Staff Training Status</h3>
            <p className="text-xs text-slate-500">Sortable roster with per-caregiver compliance</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Sort:</span>
            <button className="px-2 py-1 bg-slate-800 text-white rounded-md font-medium">Compliance</button>
            <button className="px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded-md font-medium hover:bg-slate-50">Name</button>
            <button className="px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded-md font-medium hover:bg-slate-50">Expiring</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50/50 text-[10px] uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-4 py-3">Caregiver</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Courses</th>
                <th className="px-4 py-3 w-48">Compliance</th>
                <th className="px-4 py-3 text-center">Expiring</th>
                <th className="px-4 py-3">Last Activity</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_STAFF_STATUS.map(staff => (
                <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {staff.avatar}
                      </div>
                      <span className="font-semibold text-slate-800">{staff.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{staff.role}</td>
                  <td className="px-4 py-3 text-slate-600">{staff.coursesCompleted}/{staff.coursesTotal}</td>
                  <td className="px-4 py-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className={`font-semibold ${staff.status === "On track" ? "text-brand-teal" :
                          staff.status === "At risk" ? "text-accent-amber" : "text-accent-red"
                          }`}>{staff.status}</span>
                        <span className="text-slate-500 font-medium">{staff.complianceScore}%</span>
                      </div>
                      <ComplianceProgressBar
                        progress={staff.complianceScore}
                        colorClass={staff.status === "On track" ? "bg-brand-teal" : staff.status === "At risk" ? "bg-accent-amber" : "bg-accent-red"}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {staff.certificationsExpiring > 0 ? (
                      <span className="inline-flex items-center gap-1 text-accent-amber font-semibold text-xs">
                        <AlertTriangle className="w-3 h-3" /> {staff.certificationsExpiring}
                      </span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[10px]">{staff.lastActivity}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-teal hover:border-brand-teal/30 transition-all opacity-0 group-hover:opacity-100">
                      <BellRing className="w-3 h-3" /> Remind
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Row 4: Expiring & Overdue | Quiz Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expiring & Overdue */}
        <section className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Expiring & Overdue</h3>
              <p className="text-xs text-slate-500">Credentials needing attention</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-500">Automated reminders:</span>
              <button
                onClick={() => setRemindersOn(!remindersOn)}
                className={`w-12 h-6 rounded-full p-1 transition-colors relative flex items-center ${remindersOn ? "bg-brand-teal" : "bg-slate-300"}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-transform absolute ${remindersOn ? "translate-x-6" : "translate-x-0"}`} />
              </button>
              <span className={`text-xs font-bold ${remindersOn ? "text-brand-teal" : "text-slate-400"}`}>{remindersOn ? "ON" : "OFF"}</span>
            </div>
          </div>
          <div className="p-2 flex-1">
            {MOCK_STAFF_STATUS.filter(s => s.status !== "On track").map(staff => (
              <div key={staff.id} className="flex items-center justify-between gap-3 p-4 border border-slate-100 rounded-lg hover:bg-slate-100 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                    {staff.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{staff.name}</div>
                    <div className="text-xs text-slate-500">
                      {staff.daysOverdue ? "Bloodborne Pathogens" : "CPR & AED Provider"} {/* Mocking the specific cert for brevity */}
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${staff.daysOverdue ? "bg-red-50 text-accent-red border border-red-100" : "bg-amber-50 text-accent-amber border border-amber-100"
                    }`}>
                    {staff.daysOverdue ? `${staff.daysOverdue}d overdue` : `${staff.daysLeft}d left`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz & Assessments */}
        <section className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col p-4">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-800">Quiz & Assessments</h3>
            <p className="text-xs text-slate-500">Last 30 days</p>
          </div>
          <div className="mb-6">
            <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wide mb-1">Average pass rate</div>
            <div className="text-3xl font-bold text-brand-teal">{MOCK_QUIZ_STATS.averagePassRate}%</div>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wide mb-3">Most-failed questions</div>
            <div className="space-y-3">
              {MOCK_QUIZ_STATS.mostFailedQuestions.map((q, i) => (
                <div key={i} className="flex justify-between items-center text-xs border border-slate-100 p-2 rounded-lg">
                  <span className="text-slate-700 truncate pr-4">{q.question}</span>
                  <span className="font-semibold text-accent-red shrink-0">{q.passRate}% pass</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            View detailed analytics
          </button>
        </section>
      </div>

      {/* Row 5: Course Builder */}
      <section className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-800">Course Library</h3>
            <p className="text-xs text-slate-500">Author and manage the course catalog</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-brand-teal hover:bg-[#0c8a6f] text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow transition-all">
            <Plus className="w-3 h-3" /> Create Course
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50/50 text-[10px] uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3">Pass %</th>
                <th className="px-4 py-3">Attempts</th>
                <th className="px-4 py-3">Assigned</th>
                <th className="px-4 py-3 w-48">Completion</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_COURSES.slice(0, 8).map(course => (
                <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-3 font-semibold text-slate-800">{course.title}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{course.category}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-[10px]">{course.format}</td>
                  <td className="px-4 py-3 text-slate-600">{course.passRate}%</td>
                  <td className="px-4 py-3 text-slate-600">{course.attemptsAllowed}</td>
                  <td className="px-4 py-3 text-slate-600">{course.assignedCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <ComplianceProgressBar
                        progress={course.completionRate}
                        colorClass={course.completionRate > 80 ? "bg-brand-teal" : course.completionRate > 60 ? "bg-accent-amber" : "bg-accent-red"}
                      />
                      <span className="text-xs font-semibold text-slate-600">{course.completionRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-slate-400 hover:text-brand-teal text-xs font-medium flex items-center gap-1">
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button className="text-slate-400 hover:text-slate-700 text-xs font-medium flex items-center gap-1 ml-2">
                        <Archive className="w-3 h-3" /> Archive
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
      <section>
        <div className="mb-3">
          <h3 className="text-base font-semibold text-slate-800">Surveys</h3>
          <p className="text-xs text-slate-500">Feedback and knowledge pulse</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_SURVEYS.map(survey => (
            <div key={survey.name} className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-slate-800 text-xs">{survey.name}</h4>
                <div className="text-slate-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{survey.responseRate}%</div>
              <div className="text-[10px] text-slate-500 mb-4 uppercase tracking-wide">Response rate</div>
              <ComplianceProgressBar
                progress={survey.responseRate}
                colorClass={survey.responseRate > 80 ? "bg-brand-teal" : survey.responseRate > 60 ? "bg-accent-amber" : "bg-accent-red"}
              />
              <a href={survey.link} className="mt-4 text-xs font-semibold text-brand-teal hover:text-[#0c8a6f] inline-flex items-center gap-1 transition-colors">
                View results &rarr;
              </a>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
