import React from "react";
import { CourseDetail, UserCourseProgress } from "@/types/course";
import { CheckCircle2, Circle, Lock, PlayCircle, FileText, File, MonitorPlay, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface CourseSidebarProps {
  course: CourseDetail;
  progress: UserCourseProgress | null;
  activeLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  isQuizActive: boolean;
  onSelectQuiz: () => void;
}

export function CourseSidebar({ course, progress, activeLessonId, onSelectLesson, isQuizActive, onSelectQuiz }: CourseSidebarProps) {

  const completedCount = progress?.lessons.filter(l => l.status === "completed").length || 0;
  const totalCount = course.totalLessons;
  const percentComplete = Math.round((completedCount / totalCount) * 100) || 0;

  let isPreviousCompleted = true; // For simple sequential unlock logic

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Video": return <PlayCircle className="w-4 h-4" />;
      case "Reading": return <FileText className="w-4 h-4" />;
      case "PDF": return <File className="w-4 h-4" />;
      case "PowerPoint": return <MonitorPlay className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full lg:w-80 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden z-20 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 bg-white">
        <Link href={`/training/course/${course.id}`} className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-brand-teal transition-colors mb-4">
          <ChevronLeft className="w-3.5 h-3.5" />
          Course Overview
        </Link>
        <h2 className="font-extrabold text-slate-800 text-lg leading-snug mb-4 line-clamp-2">{course.title}</h2>

        <div className="space-y-2">
          <div className="flex justify-between text-[11px] text-slate-500 font-bold uppercase tracking-wider">
            <span>{percentComplete}% Complete</span>
            <span>{completedCount}/{totalCount} lessons</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-brand-teal to-[#0c8c70] transition-all duration-700 ease-out" style={{ width: `${percentComplete}%` }} />
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
        {course.modules.map((module, mIdx) => (
          <div key={module.id} className="mb-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Section {mIdx + 1}: {module.title}
            </h3>
            <ul className="space-y-0.5">
              {module.lessons.map(lesson => {
                const lessonProgress = progress?.lessons.find(l => l.lessonId === lesson.id);
                const isCompleted = lessonProgress?.status === "completed";
                const isActive = lesson.id === activeLessonId && !isQuizActive;

                // Locked if prev not complete
                const isLocked = !isPreviousCompleted && !!progress;
                isPreviousCompleted = isCompleted;

                return (
                  <li key={lesson.id}>
                    <button
                      onClick={() => !isLocked && onSelectLesson(lesson.id)}
                      disabled={isLocked}
                      className={`w-full text-left px-3 py-3 rounded-xl flex items-start gap-3 transition-all ${isActive
                        ? "bg-brand-teal/5 border border-brand-teal/20 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden"
                        : isLocked
                          ? "opacity-50 border border-slate-50 cursor-not-allowed"
                          : "hover:bg-slate-50 border border-slate-50"
                        }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-brand-teal" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-slate-300" />
                        ) : isActive ? (
                          <PlayCircle className="w-5 h-5 text-brand-teal" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold leading-snug line-clamp-2 ${isActive ? "text-brand-teal" : isLocked ? "text-slate-400" : "text-slate-700"}`}>
                          {lesson.title}
                        </p>
                        <div className={`flex items-center gap-1.5 mt-1.5 text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-brand-teal/70" : "text-slate-400"}`}>
                          {getFormatIcon(lesson.format)}
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Final Quiz Item */}
        <div className="mt-4 pt-4 border-t border-slate-100 px-1">
          <button
            onClick={() => isPreviousCompleted && onSelectQuiz()}
            disabled={!isPreviousCompleted}
            className={`w-full text-left px-4 py-3.5 rounded-xl border-2 flex items-center gap-4 transition-all ${isQuizActive
              ? "border-brand-teal bg-brand-teal/5 shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
              : isPreviousCompleted
                ? "border-slate-200 hover:border-brand-teal/30 hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] bg-white"
                : "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
              }`}
          >
            <div className={`p-2 rounded-full ${isQuizActive ? "bg-brand-teal text-white" : isPreviousCompleted ? "bg-slate-100 text-slate-600" : "bg-slate-100 text-slate-400"}`}>
              {progress?.quizPassed ? <CheckCircle2 className="w-5 h-5 text-brand-teal" /> : !isPreviousCompleted ? <Lock className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <p className={`font-bold text-sm ${isQuizActive ? "text-brand-teal" : isPreviousCompleted ? "text-slate-800" : "text-slate-400"}`}>
                Final Certification
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Quiz • {course.quiz.passPercentage}% to pass</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
