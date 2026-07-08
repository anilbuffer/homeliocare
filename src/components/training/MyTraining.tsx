"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldAlert, Award, AlertTriangle, AlertCircle, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { CertificateCard } from "./CertificateCard";
import { MOCK_COURSES, MOCK_USER_COURSES, MOCK_CERTIFICATIONS } from "@/lib/mockTrainingData";

export function MyTraining() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter courses logic
  const inProgressCourses = MOCK_USER_COURSES.filter(c => c.status === "In Progress")
    .map(uc => {
      const course = MOCK_COURSES.find(c => c.id === uc.courseId);
      return { ...course, ...uc };
    })
    .filter(Boolean) as any[];

  const requiredCourses = MOCK_USER_COURSES
    .map(uc => {
      const course = MOCK_COURSES.find(c => c.id === uc.courseId);
      return { ...course, ...uc };
    })
    .filter(c => c.required);

  const catalogCourses = MOCK_COURSES.filter(c => activeCategory === "All" || c.category === activeCategory);

  const categories = ["All", "HIPAA", "OSHA", "Infection Control", "Medication Management", "Incident Reporting", "Abuse Prevention", "Dementia Care", "CPR/First Aid"];

  return (
    <div className="space-y-6 pb-6">
      {/* 1. KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "COURSES COMPLETED", value: "4/17", icon: CheckCircle2, color: "text-brand-teal", bg: "bg-teal-50" },
          { label: "COMPLIANCE SCORE", value: "27%", icon: ShieldAlert, color: "text-brand-teal", bg: "bg-teal-50" },
          { label: "CERTIFICATIONS ACTIVE", value: "3", icon: Award, color: "text-slate-600", bg: "bg-slate-100" },
          { label: "EXPIRING SOON", value: "2", subtext: "within 60 days", icon: AlertTriangle, color: "text-accent-amber", bg: "bg-amber-50" },
          { label: "OVERDUE", value: "1", icon: AlertCircle, color: "text-accent-red", bg: "bg-red-50" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">{kpi.label}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${kpi.bg}`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <div className="text-xl font-bold text-slate-800">{kpi.value}</div>
            {kpi.subtext && <div className="text-[10px] text-slate-400 mt-1">{kpi.subtext}</div>}
          </div>
        ))}
      </div>

      {/* 2. Continue Learning */}
      <section>
        <div className="mb-3">
          <h3 className="text-base font-semibold text-slate-800">Continue Learning</h3>
          <p className="text-xs text-slate-500">Pick up where you left off</p>
        </div>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
            {inProgressCourses.map((course) => (
              <div key={course.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
                <CourseCard
                  title={course.title}
                  category={course.category}
                  format={course.format}
                  duration={course.duration}
                  progress={course.progress}
                  thumbnailColor={course.thumbnailColor}
                  actionLabel="Resume"
                />
              </div>
            ))}
          </div>
          {/* Scroll indicators */}
          <div className="flex items-center justify-between mt-2 px-2 text-slate-400">
            <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-slate-700" />
            <div className="h-1 flex-1 mx-4 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-slate-400 rounded-full"></div>
            </div>
            <ChevronRight className="w-5 h-5 cursor-pointer hover:text-slate-700" />
          </div>
        </div>
      </section>

      {/* 3. Required Training */}
      <section>
        <div className="mb-3">
          <h3 className="text-base font-semibold text-slate-800">Required Training</h3>
          <p className="text-xs text-slate-500">Mandatory compliance courses</p>
        </div>
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-slate-50/50 text-[10px] uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Course</th>
                  <th className="px-4 py-2.5">Category</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5">Due</th>
                  <th className="px-4 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requiredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${course.thumbnailColor}`}>
                          <CheckCircle2 className="w-4 h-4 text-white/80" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{course.title}</div>
                          <div className="text-[10px] text-slate-500">{course.duration} • {course.format}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{course.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${course.status === "Completed" ? "bg-teal-50 text-brand-teal" :
                        course.status === "In Progress" ? "bg-blue-50 text-accent-blue" :
                          course.status === "Expired" ? "bg-red-50 text-accent-red" :
                            "bg-slate-100 text-slate-500"
                        }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-[10px]">
                      {course.dueDate || "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className={`px-3 py-1 rounded-lg text-[10px] font-semibold border transition-colors ${course.status === "Completed" ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-50" :
                        "bg-brand-teal/10 border-transparent text-brand-teal hover:bg-brand-teal/20"
                        }`}>
                        {course.status === "Completed" ? "Review" : course.status === "In Progress" ? "Resume" : "Start"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. My Certifications */}
      <section>
        <div className="mb-3">
          <h3 className="text-base font-semibold text-slate-800">My Certifications</h3>
          <p className="text-xs text-slate-500">Downloadable proof of training</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_CERTIFICATIONS.map(cert => (
            <CertificateCard key={cert.id} {...cert} />
          ))}
        </div>
      </section>

      {/* 5. Course Library */}
      <section>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-800">Course Library</h3>
          <p className="text-xs text-slate-500">Browse and enroll in additional training</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>
          <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 min-w-max">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === cat
                    ? "bg-brand-teal text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  {cat}
                </button>
              ))}
              <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1">
                <Filter className="w-3 h-3" /> More
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {catalogCourses.map(course => (
            <CourseCard
              key={course.id}
              {...course}
              actionLabel={course.required ? "Start" : "Enroll"}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
