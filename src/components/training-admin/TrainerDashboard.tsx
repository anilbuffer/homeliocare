"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  FileEdit,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  BookOpen,
  Clock,
  TrendingUp,
  TrendingDown,
  PlayCircle,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// Mock Data
const MOCK_REVIEW_QUEUE = [
  {
    id: "rev_1",
    courseId: "c_1",
    title: "Annual HIPAA & Privacy Update",
    trigger: "Federal guideline update (March 2026)",
    status: "pending",
    category: "Compliance",
    dateFlagged: "2026-03-01T08:00:00Z"
  },
  {
    id: "rev_2",
    courseId: "c_2",
    title: "Abuse & Neglect Reporting",
    trigger: "Annual review due",
    status: "pending",
    category: "Compliance",
    dateFlagged: "2026-04-15T08:00:00Z"
  }
];

const MOCK_DRAFTS = [
  {
    id: "d_1",
    title: "Dementia Care Basics (V2)",
    lastModified: "2 hours ago",
    progress: 75,
    modulesTotal: 4,
    modulesComplete: 3
  },
  {
    id: "d_2",
    title: "New Hire Orientation: 2026",
    lastModified: "1 day ago",
    progress: 25,
    modulesTotal: 8,
    modulesComplete: 2
  }
];

const MOCK_QUIZ_ALERTS = [
  {
    id: "qa_1",
    course: "Infection Control V3",
    quiz: "Final Assessment",
    issue: "Question 4 has a 42% pass rate",
    suggestion: "Consider revising for clarity or updating course content."
  },
  {
    id: "qa_2",
    course: "Fall Prevention",
    quiz: "Module 2 Quiz",
    issue: "Overall pass rate dropped to 68%",
    suggestion: "Content may need visual aids."
  }
];

interface KpiCardProps {
  title: string;
  value: number | string;
  subtext: string;
  icon: React.ElementType;
  colorTheme?: "teal" | "blue" | "amber" | "red";
  delay?: number;
}

function KpiCard({ title, value, subtext, icon: Icon, colorTheme = "teal", delay = 0 }: KpiCardProps) {
  const [count, setCount] = useState(0);
  const numericValue = typeof value === "number" ? value : parseInt(value as string) || 0;

  useEffect(() => {
    let startTime: number;
    const duration = 1000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * numericValue));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), delay * 100);
    return () => clearTimeout(timer);
  }, [numericValue, delay]);

  const displayValue = typeof value === "string" && isNaN(parseInt(value)) ? value : (typeof value === "string" ? value.replace(/[0-9]/g, '') + count : count);

  const themeClasses = {
    teal: "text-brand-teal bg-brand-teal/20",
    blue: "text-blue-500 bg-blue-500/20",
    amber: "text-amber-500 bg-amber-500/20",
    red: "text-red-500 bg-red-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="p-4 bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/20 transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-normal text-slate-500 mb-1">{title}</p>
          <div className="text-xl font-bold text-slate-800 tracking-tight">
            {displayValue}
            {typeof value === "string" && value.includes("%") && "%"}
          </div>
        </div>
        <div className={`p-2 rounded-full ${themeClasses[colorTheme]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-2 flex items-center text-xs text-slate-500">
        {subtext}
      </div>
    </motion.div>
  );
}

export function TrainerDashboard() {
  const { currentUser } = useAuth();
  const [reviewQueue, setReviewQueue] = useState(MOCK_REVIEW_QUEUE);

  const handleStartReview = (id: string) => {
    // Optimistic UI update for demo
    setReviewQueue(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-slate-800"
          >
            Good morning, {currentUser?.name?.split(' ')[0] || "Trainer"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-1 text-xs"
          >
            You have <span className="font-semibold text-blue-600">{MOCK_DRAFTS.length} courses</span> in draft and <span className="font-semibold text-amber-600">{reviewQueue.length} compliance reviews</span> pending.
          </motion.p>
        </div>
      </div>

      {/* KPI Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Published Courses"
          value={42}
          subtext="Active in library"
          icon={BookOpen}
          colorTheme="teal"
          delay={1}
        />
        <KpiCard
          title="Courses in Draft"
          value={MOCK_DRAFTS.length}
          subtext="Currently building"
          icon={FileEdit}
          colorTheme="blue"
          delay={2}
        />
        <KpiCard
          title="Avg. Quiz Pass Rate"
          value="88%"
          subtext="+2% this month"
          icon={BarChart3}
          colorTheme="teal"
          delay={3}
        />
        <KpiCard
          title="Compliance Reviews"
          value={reviewQueue.length}
          subtext="Updates required"
          icon={ShieldAlert}
          colorTheme="amber"
          delay={4}
        />
      </div>

      {/* KPI Row 2 - Secondary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-normal text-slate-500">Total Enrollments This Month</p>
            <p className="text-xl font-bold text-slate-800 mt-1">1,248</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">
            <TrendingUp className="w-4 h-4" />
            +12%
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-normal text-slate-500">Cert. Courses Due for Content Review</p>
            <p className="text-xl font-bold text-slate-800 mt-1">3</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            Within 30 Days
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Compliance-Linked Course Review Queue */}
          <div className="flex-1 flex flex-col bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden max-h-[340px]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  Compliance-Linked Course Review
                </h2>
                <p className="text-xs text-slate-500">Triggered by QA/Compliance updates.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
              <AnimatePresence mode="popLayout">
                {reviewQueue.length > 0 ? (
                  reviewQueue.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -20, backgroundColor: "#fef3c7" }}
                      animate={{ opacity: 1, x: 0, backgroundColor: "#ffffff" }}
                      exit={{ opacity: 0, x: 20, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      key={item.id}
                      className="p-4 hover:bg-slate-50 transition-colors group flex flex-col sm:flex-row gap-4 justify-between sm:items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-normal bg-amber-100 text-amber-700">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-slate-400">Flagged: {item.dateFlagged.split('T')[0]}</span>
                        </div>
                        <h3 className="font-semibold text-slate-800 text-sm">{item.title}</h3>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                          {item.trigger}
                        </p>
                      </div>
                      <button
                        onClick={() => handleStartReview(item.id)}
                        className="shrink-0 bg-white text-slate-700 text-sm hover:text-brand-teal hover:border-brand-teal font-medium border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] px-4 py-2 rounded-xl transition-colors flex items-center gap-2 justify-center"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Start Review
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center text-slate-500"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-50" />
                    <p className="font-medium text-slate-700">All caught up!</p>
                    <p className="text-sm mt-1">No compliance-linked reviews are pending.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Draft Courses in Progress */}
          <div className="flex-1 flex flex-col bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-4 max-h-[340px]">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <FileEdit className="w-3.5 h-3.5 text-blue-500" />
              Draft Courses in Progress
            </h2>
            <div className="space-y-3 flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
              {MOCK_DRAFTS.length > 0 ? (
                MOCK_DRAFTS.map(draft => (
                  <div key={draft.id} className="border border-slate-200 rounded-xl px-3 py-2 hover:border-blue-200 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{draft.title}</h3>
                      <span className="text-xs font-normal text-slate-400">Modified {draft.lastModified}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                      <span>{draft.modulesComplete} of {draft.modulesTotal} modules built</span>
                      <span className="font-semibold text-slate-700">{draft.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-teal rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${draft.progress}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 text-sm">No courses currently in draft.</div>
              )}
            </div>
          </div>
        </div>
        {/* Side Column */}
        <div className="flex flex-col gap-4">
          {/* Quiz Performance Snapshot */}
          <div className="flex-1 flex flex-col bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-5 max-h-[340px]">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-2">
              <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
              Quiz Performance
            </h2>
            <p className="text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
              Low pass rates often signal content ambiguity rather than learner underperformance.
            </p>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
              {MOCK_QUIZ_ALERTS.map(alert => (
                <div key={alert.id} className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-100/50">
                  <div className="flex items-center gap-2 text-[10px] font-normal text-indigo-700 mb-1">
                    {alert.course} <span className="rounded-full px-2 py-0.5 bg-red-100 text-red-700 font-semibold">Low pass rate</span>
                  </div>
                  <h4 className="font-medium text-slate-800 text-sm mb-1">{alert.issue}</h4>
                  <p className="text-[10px] text-slate-600">{alert.suggestion}</p>
                  <button className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                    Review Quiz Questions <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Course Library Health */}
          <div className="flex-1 flex flex-col bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-5 max-h-[340px]">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-brand-teal" />
              Course Library Health
            </h2>
            <div className="space-y-2 flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Total Active Courses</span>
                <span className="text-sm font-semibold text-slate-800">42</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Avg. Time Since Update</span>
                <span className="text-sm font-semibold text-slate-800">8.4 Months</span>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <div className="bg-red-50 rounded-xl px-3 py-2 border border-red-100 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800 text-sm">Aging Content Alert</h4>
                    <p className="text-[10px] text-red-600">2 courses haven't been updated in over 24 months. Consider reviewing them.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
