"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Search,
  BookOpen,
  Info,
  Calendar,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

const MOCK_REQUIREMENTS = [
  {
    id: "req_1",
    title: "Annual HIPAA & Privacy Training",
    regulatoryBasis: "Health Insurance Portability and Accountability Act (HIPAA) - 45 CFR Part 160",
    frequency: "Annual",
    status: "compliant",
    satisfyingCourses: [
      { id: "c_1", title: "Annual HIPAA & Privacy Update V3.1", status: "published" }
    ],
    nextReview: "2026-10-01"
  },
  {
    id: "req_2",
    title: "Abuse & Neglect Reporting",
    regulatoryBasis: "State Mandate - Elder Abuse Reporting Act",
    frequency: "Annual",
    status: "review-needed",
    satisfyingCourses: [
      { id: "c_2", title: "Recognizing & Reporting Abuse", status: "archived" }
    ],
    nextReview: "Overdue"
  },
  {
    id: "req_3",
    title: "Infection Control Standards",
    regulatoryBasis: "OSHA Bloodborne Pathogens Standard 1910.1030",
    frequency: "Annual",
    status: "compliant",
    satisfyingCourses: [
      { id: "c_3", title: "Infection Control V4.0", status: "published" },
      { id: "c_3b", title: "PPE Deep Dive", status: "published" }
    ],
    nextReview: "2027-01-15"
  },
  {
    id: "req_4",
    title: "Dementia Care Basics",
    regulatoryBasis: "State Dept. of Health - Dementia Training Requirements",
    frequency: "One-time at hire",
    status: "in-progress",
    satisfyingCourses: [
      { id: "c_4", title: "Dementia Care Basics V2.0-draft", status: "draft" }
    ],
    nextReview: "2026-12-01"
  }
];

export function TrainingComplianceTracker() {
  const [search, setSearch] = useState("");

  const filteredRequirements = MOCK_REQUIREMENTS.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.regulatoryBasis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Compliance Tracking</h1>
          <p className="text-slate-500 mt-1 text-xs">Read-only view of training-related regulatory requirements.</p>
        </div>
      </div>
      <div className="bg-amber-100 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800">
          <strong>View-Only Scope:</strong> As a Trainer/Training Admin, you can see which courses satisfy which requirements.
          The broader compliance framework, regulatory tracking, and requirement creation is managed by the QA/Compliance Officer.
        </div>
      </div>
      <div className="bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-4">
        <div className="relative max-w-md mb-4 lg:mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search requirements or regulations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          />
        </div>
        <div className="space-y-3">
          {filteredRequirements.map(req => (
            <div key={req.id} className="border border-slate-200 rounded-xl px-3 py-3 hover:border-slate-300 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Info block */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800 text-sm">{req.title}</h3>
                    {req.status === "compliant" && <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">Satisfied</span>}
                    {req.status === "review-needed" && <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium">Gap / Action Needed</span>}
                    {req.status === "in-progress" && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">Building Course</span>}
                  </div>

                  <p className="text-xs text-slate-600 mb-2">{req.regulatoryBasis}</p>

                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {req.frequency}</span>
                    <span className="flex items-center gap-1">
                      Next Regulatory Review:
                      <span className={req.nextReview === "Overdue" ? "text-red-500 font-semibold" : ""}>{req.nextReview}</span>
                    </span>
                  </div>
                </div>

                {/* Courses block */}
                <div className="lg:w-1/3 bg-slate-100 rounded-xl px-3 py-2 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Linked Courses
                  </h4>
                  <div className="space-y-2">
                    {req.satisfyingCourses.map(course => (
                      <div key={course.id} className="flex justify-between items-center text-sm bg-white p-2 border border-slate-100 rounded-lg shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                        <span className="font-medium text-slate-700 text-xs truncate mr-2" title={course.title}>{course.title}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${course.status === 'published' ? 'bg-brand-teal/10 text-brand-teal' :
                            course.status === 'draft' ? 'bg-blue-100 text-blue-600' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                            {course.status}
                          </span>
                          <Link href={`/training-admin/courses/builder?id=${course.id}`} className="text-slate-400 hover:text-brand-teal transition-colors" title="View Course">
                            <ExternalLink className="w-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                    {req.satisfyingCourses.filter(c => c.status === 'published').length === 0 && (
                      <div className="text-xs text-red-500 font-medium flex items-center gap-1.5 mt-2">
                        <AlertTriangle className="w-3.5 w-3.5" /> No published courses satisfy this requirement.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
          {filteredRequirements.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              No requirements found matching "{search}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
