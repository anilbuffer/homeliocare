"use client";

import React from "react";
import { PlayCircle, FileText, File, MonitorPlay, CheckCircle2, Clock, BarChart, ShieldCheck, ShieldAlert } from "lucide-react";
import { CourseDetail, UserCourseProgress } from "@/types/course";
import { useRouter } from "next/navigation";

interface CourseOverviewHeaderProps {
  course: CourseDetail;
  progress: UserCourseProgress | null;
}

export function CourseOverviewHeader({ course, progress }: CourseOverviewHeaderProps) {
  const router = useRouter();

  const getFormatIcon = (className: string = "w-5 h-5") => {
    switch (course.format) {
      case "Video": return <PlayCircle className={className} />;
      case "Reading": return <FileText className={className} />;
      case "PDF": return <File className={className} />;
      case "PowerPoint": return <MonitorPlay className={className} />;
      default: return <PlayCircle className={className} />;
    }
  };

  const getButtonState = () => {
    if (!progress || progress.status === "not-started") return { label: "Start Course", action: "start", icon: <PlayCircle className="w-5 h-5" /> };
    if (progress.status === "in-progress") return { label: "Continue Course", action: "continue", icon: <PlayCircle className="w-5 h-5" /> };
    return { label: "Review Course", action: "review", icon: <CheckCircle2 className="w-5 h-5" /> };
  };

  const buttonState = getButtonState();

  const completedLessons = progress ? progress.lessons.filter(l => l.status === "completed").length : 0;
  const totalItems = course.totalLessons + 1; // lessons + 1 quiz
  let percentComplete = 0;
  if (progress) {
    if (progress.status === "completed") {
      percentComplete = 100;
    } else {
      percentComplete = Math.round((completedLessons / totalItems) * 100);
    }
  }

  const handleAction = () => {
    router.push(`/training/course/${course.id}/learn`);
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row group">

      {/* Banner / Thumbnail */}
      <div className="relative w-full md:w-2/5 min-h-[240px] md:min-h-full overflow-hidden flex flex-col justify-center items-center p-8 bg-gradient-to-br from-brand-teal to-[#098065]">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_2px_2px,_white_1px,_transparent_0)]" style={{ backgroundSize: '32px 32px' }}></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
        <div className="absolute top-4 left-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-110"></div>

        {/* Main Icon */}
        <div className="relative z-10 w-28 h-28 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20">
          <div className="text-white drop-shadow-lg">
            {getFormatIcon("w-12 h-12")}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-brand-teal/10 text-brand-teal text-xs font-bold px-3 py-1.5 rounded-full border border-brand-teal/20">
              {course.category}
            </span>
            <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-200">
              {getFormatIcon("w-3.5 h-3.5")} {course.format}
            </span>
            {course.required && (
              <span className="bg-red-50 text-red-600 text-xs font-bold uppercase px-3 py-1.5 rounded-full border border-red-100 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> REQUIRED
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight leading-tight group-hover:text-brand-teal transition-colors duration-300">
            {course.title}
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
            {course.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between border-t border-slate-100 pt-6 mt-auto">
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                <BarChart className="w-4 h-4 text-slate-400" />
              </div>
              <span>{course.passRateRequired}% to pass</span>
            </div>
            <div className="flex items-center gap-2 hidden sm:flex">
              <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
              </div>
              <span>{course.caregiversCompleted} completed</span>
            </div>
          </div>

          <div className="flex items-center gap-5 w-full sm:w-auto">
            {percentComplete > 0 && percentComplete < 100 && (
              <div className="relative w-12 h-12 flex items-center justify-center hidden sm:flex shrink-0">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * percentComplete) / 100} className="text-brand-teal transition-all duration-1000 ease-out" />
                </svg>
                <span className="absolute text-xs font-bold text-slate-700">{percentComplete}%</span>
              </div>
            )}
            {percentComplete === 100 && (
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center hidden sm:flex shrink-0 border border-green-200">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            )}
            <button
              onClick={handleAction}
              className="cursor-pointer w-full sm:w-auto bg-brand-teal text-white font-bold py-3.5 px-8 rounded-xl hover:bg-[#0b8a6f] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 shrink-0"
            >
              {buttonState.label}
              {buttonState.icon}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
