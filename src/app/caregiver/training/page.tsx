"use client";

import React, { useState } from "react";
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
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleLaunchCourse = (course: TrainingCourse) => {
    setSelectedCourse(course);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handleCompleteQuiz = () => {
    setQuizSubmitted(true);
    setTimeout(() => {
      if (selectedCourse) {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === selectedCourse.id
              ? { ...c, progressPercent: 100, status: "Completed" }
              : c
          )
        );
      }
    }, 800);
  };

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
                  <button
                    onClick={() => handleLaunchCourse(course)}
                    className="w-full py-2.5 px-4 bg-brand-teal hover:bg-brand-teal/90 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{isCompleted ? "Review Course Content" : "Launch Course & Quiz"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Course Player & Quiz Simulator Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
            >
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-brand-teal uppercase tracking-wider">
                    {selectedCourse.category} Module
                  </span>
                  <h2 className="text-lg font-bold text-gray-900">{selectedCourse.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5">
                {/* Simulated Video Player Box */}
                <div className="h-56 bg-slate-900 rounded-2xl relative flex items-center justify-center border border-gray-800 shadow-inner overflow-hidden">
                  <img
                    src={selectedCourse.thumbnail}
                    alt={selectedCourse.title}
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-2">
                    <PlayCircle className="w-16 h-16 text-brand-teal animate-pulse" />
                    <span className="text-xs font-bold bg-slate-900/80 px-3 py-1 rounded-full border border-white/20">
                      Module Video Stream (45 mins)
                    </span>
                  </div>
                </div>

                {/* Knowledge Check Quiz Section */}
                <div className="space-y-3 p-4 bg-gray-50 border border-slate-200 rounded-2xl">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-brand-teal" /> Interactive Knowledge Check Quiz
                  </h4>
                  <p className="text-xs text-gray-800 font-semibold">
                    Question 1: When assisting a client with mobility transfer using a gait belt, where should the caregiver position themselves?
                  </p>

                  <div className="space-y-2 pt-1 text-xs">
                    {[
                      "Slightly behind and to the client's weaker side, holding the belt with an underhand grip",
                      "Directly in front of the client, pulling by their arms",
                      "Beside the client's stronger side only",
                    ].map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setQuizAnswer(idx)}
                        className={`w-full text-left p-3 rounded-xl border font-medium transition-all ${quizAnswer === idx
                          ? "bg-brand-teal/10 border-brand-teal text-brand-teal font-bold shadow-2xs"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-teal" /> Quiz Passed with 100%! Course completed & CE credit logged.
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleCompleteQuiz}
                  disabled={quizAnswer === null || quizSubmitted}
                  className="px-5 py-2 bg-brand-teal text-white rounded-xl text-xs font-bold shadow-xs hover:bg-brand-teal/90 disabled:opacity-50"
                >
                  {quizSubmitted ? "Completed ✓" : "Submit Quiz Answer"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CaregiverLayout>
  );
}
