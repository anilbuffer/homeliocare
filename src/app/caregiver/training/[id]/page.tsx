"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { INITIAL_TRAINING_COURSES, TrainingCourse } from "@/lib/caregiver/caregiverPortalData";
import { ChevronLeft, ChevronRight, CheckCircle2, Home, Check } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_PAGES = 3;

export default function CourseViewerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<TrainingCourse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const found = INITIAL_TRAINING_COURSES.find((c) => c.id === id);
    if (found) {
      setCourse(found);
      setIsCompleted(found.status === "Completed");
    }
  }, [id]);

  if (!course) return null;

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // In a real app, this would save to the backend.
    setTimeout(() => {
      router.push("/caregiver/training");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f9] flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
          <Link href="/caregiver/training" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>&gt;</span>
            <Link href="/caregiver/training" className="hover:text-gray-900 transition-colors">
              My Trainings
            </Link>
          </div>
        </div>

        {isCompleted && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" /> Completed
          </div>
        )}
      </header>

      {/* Main Viewer Area */}
      <main className="flex-1 overflow-hidden flex items-center justify-center p-6">
        <div className="w-full max-w-5xl h-[80vh] bg-[#f0ede5] rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden relative">
          
          {/* Header of the Slide */}
          <div className="px-12 pt-12 pb-8 shrink-0">
            <div className="text-xs font-bold text-brand-teal uppercase tracking-widest mb-3">
              Quick Reference
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
              {course.title}
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              {currentPage === TOTAL_PAGES 
                ? "Knowledge Check & Certification" 
                : course.description}
            </p>
          </div>

          <div className="flex-1 flex px-12 pb-12 overflow-hidden gap-12">
            
            {/* Timeline Indicator (Left) */}
            <div className="w-8 flex flex-col items-center py-4 relative shrink-0">
              <div className="absolute top-0 bottom-0 w-px bg-gray-300 left-1/2 -translate-x-1/2" />
              {[...Array(TOTAL_PAGES)].map((_, i) => {
                const pageNum = i + 1;
                const isActive = currentPage === pageNum;
                const isPast = currentPage > pageNum;
                return (
                  <div 
                    key={i}
                    className="relative z-10 flex-1 flex flex-col items-center"
                    style={{ justifyContent: i === 0 ? "flex-start" : i === TOTAL_PAGES - 1 ? "flex-end" : "center" }}
                  >
                    <div className={`w-3 h-3 rounded-full border-2 bg-[#f0ede5] ${isActive ? "border-brand-teal w-4 h-4" : isPast ? "border-brand-teal bg-brand-teal" : "border-gray-300"}`} />
                  </div>
                );
              })}
              <div className="absolute -bottom-8 text-[10px] font-bold text-gray-400 whitespace-nowrap left-1/2 -translate-x-1/2">
                {currentPage} of {TOTAL_PAGES}
              </div>
            </div>

            {/* Content Area (Right) */}
            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {currentPage === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-4 border-t border-gray-300">
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <p className="text-sm text-gray-800">Understand the core principles of {course.category} compliance.</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <p className="text-sm text-gray-800">Identify potential hazards and proper mitigation techniques.</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <p className="text-sm text-gray-800">Follow the standard operating procedures for reporting incidents.</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <p className="text-sm text-gray-800">Maintain accurate and timely documentation.</p>
                        </div>
                      </div>
                      
                      <div className="mt-12 bg-slate-900 rounded-xl p-6 text-white flex items-center justify-between shadow-lg">
                        <div>
                          <h4 className="font-bold text-lg mb-1">Mandatory Policy 2026</h4>
                          <p className="text-sm text-slate-300">Consistent application of these rules is required for all staff.</p>
                        </div>
                        <div className="text-sm font-mono text-brand-teal bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                          REF: POL-2026-HQ
                        </div>
                      </div>
                    </div>
                  )}

                  {currentPage === 2 && (
                    <div className="space-y-6 h-full flex flex-col justify-center pb-12">
                      <div className="h-56 bg-slate-900 rounded-xl relative flex items-center justify-center border border-gray-800 shadow-xl overflow-hidden">
                        <img 
                          src={course.thumbnail} 
                          alt="Video Cover" 
                          className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-3">
                          <div className="w-16 h-16 rounded-full bg-brand-teal/90 flex items-center justify-center pl-1 shadow-lg hover:bg-brand-teal cursor-pointer transition-all">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                          <span className="text-xs font-bold bg-slate-900/80 px-4 py-1.5 rounded-full border border-white/20">
                            Watch Required Video ({course.durationMinutes} mins)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentPage === 3 && (
                    <div className="space-y-6 pt-4 border-t border-gray-300 max-w-2xl">
                      <h3 className="font-bold text-xl text-gray-900 mb-4">Final Knowledge Check</h3>
                      <p className="text-sm text-gray-800 font-medium mb-4">
                        Question 1: Based on the material reviewed, what is the most critical first step?
                      </p>

                      <div className="space-y-3">
                        {[
                          "Review patient documentation before starting",
                          "Immediately proceed with the procedure",
                          "Wait for supervisor approval"
                        ].map((opt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            disabled={isCompleted}
                            onClick={() => setQuizAnswer(idx)}
                            className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${
                              quizAnswer === idx || (isCompleted && idx === 0)
                                ? "bg-brand-teal/10 border-brand-teal text-brand-teal font-bold"
                                : "bg-white/50 border-gray-200 text-gray-700 hover:bg-white"
                            } ${isCompleted ? "opacity-70 cursor-default" : "cursor-pointer"}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {isCompleted && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-sm font-bold text-emerald-900 flex items-center gap-2 mt-6"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 
                          Course Completed! Redirecting back to training center...
                        </motion.div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Internal Footer branding (Optional from design) */}
          <div className="absolute bottom-6 left-12 right-12 flex justify-between items-center text-[9px] font-bold tracking-widest text-gray-400 uppercase">
            <span>Homelio Care, Inc. • Training Standards</span>
            <span>Mandatory From Aug 2026</span>
          </div>

        </div>
      </main>

      {/* Bottom Control Bar */}
      <footer className="h-20 bg-white border-t border-gray-200 flex items-center justify-between px-8 shrink-0">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>

        <div className="text-sm font-medium text-gray-400">
          Page {currentPage} of {TOTAL_PAGES}
        </div>

        {currentPage < TOTAL_PAGES ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-brand-teal transition-colors"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={quizAnswer === null || isCompleted}
            className="flex items-center gap-2 px-6 py-2.5 bg-brand-teal text-white rounded-xl text-sm font-bold hover:bg-brand-teal/90 disabled:opacity-50 disabled:hover:bg-brand-teal transition-all shadow-md hover:shadow-lg"
          >
            {isCompleted ? "Completed ✓" : "Submit & Complete"}
          </button>
        )}
      </footer>
    </div>
  );
}