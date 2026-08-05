"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CaregiverLayout } from "@/components/caregiver/CaregiverLayout";
import { INITIAL_TRAINING_COURSES, TrainingCourse } from "@/lib/caregiver/caregiverPortalData";
import {
  GraduationCap,
  Award,
  Clock,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CaregiverTrainingPage() {
  const [courses, setCourses] = useState<TrainingCourse[]>(INITIAL_TRAINING_COURSES);

  return (
    <CaregiverLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header & Expiring Certification Alert */}
        <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" /> Training & Certification Center
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">LMS Learning Portal</h1>
            <p className="text-xs text-gray-500 mt-1">
              Complete mandatory annual compliance courses, earn Continuing Education (CE) credits, and maintain state licensure.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-amber-950 block">BLS / CPR License Expiring</span>
                <span className="text-amber-800">Expires in 12 days (Aug 04). Complete renewal module.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => {
            const isCompleted = course.status === "Completed";
            const isExpiring = course.status === "Expiring";
            const isInProgress = course.status === "In Progress";

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:border-brand-teal/30 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-36 relative overflow-hidden bg-slate-900">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-gray-800">
                      {course.category}
                    </span>

                    {isCompleted && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-teal text-white flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    )}

                    {isExpiring && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Action Due
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2">{course.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{course.description}</p>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium pt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-500" /> {course.durationMinutes} mins
                      </span>
                      <span className="flex items-center gap-1 font-bold text-gray-700">
                        <Award className="w-3.5 h-3.5 text-brand-teal" /> {course.ceUnits} CE Units
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="pt-2">
                      <div className="flex justify-between text-[10px] font-semibold text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{course.progressPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-teal rounded-full"
                          style={{ width: `${course.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    href={`/caregiver/training/${course.id}`}
                    className="w-full py-2.5 px-4 bg-brand-teal hover:bg-brand-teal/90 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{isCompleted ? "Review Course Content" : "Launch Course & Quiz"}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </CaregiverLayout>
  );
}
