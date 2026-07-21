"use client";

import React, { useState } from "react";
import { CourseDetail, UserCourseProgress } from "@/types/course";
import { ChevronDown, ChevronUp, PlayCircle, FileText, File, MonitorPlay, Lock, CheckCircle2, Circle } from "lucide-react";

interface CurriculumListProps {
  course: CourseDetail;
  progress: UserCourseProgress | null;
}

export function CurriculumList({ course, progress }: CurriculumListProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    // Expand first module by default
    const state: Record<string, boolean> = {};
    if (course.modules.length > 0) {
      state[course.modules[0].id] = true;
    }
    return state;
  });

  const [isQuizExpanded, setIsQuizExpanded] = useState(false);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Video": return <PlayCircle className="w-5 h-5" />;
      case "Reading": return <FileText className="w-5 h-5" />;
      case "PDF": return <File className="w-5 h-5" />;
      case "PowerPoint": return <MonitorPlay className="w-5 h-5" />;
      default: return <Circle className="w-5 h-5" />;
    }
  };

  const allLessons = course.modules.flatMap(m => m.lessons);
  const lastLesson = allLessons[allLessons.length - 1];
  const isAllLessonsCompleted = lastLesson ? progress?.lessons.find(l => l.lessonId === lastLesson.id)?.status === "completed" : true;

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">Course Curriculum</h3>
        <span className="text-sm font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
          {course.totalLessons} lessons • {course.duration}
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {course.modules.map((module, mIdx) => {
          const isExpanded = !!expandedModules[module.id];

          return (
            <div key={module.id} className="flex flex-col group/module">
              <button
                onClick={() => toggleModule(module.id)}
                className={`w-full flex items-center justify-between p-4 transition-all duration-300 text-left ${isExpanded ? 'bg-slate-50' : 'hover:bg-slate-50/80'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-colors duration-300 ${isExpanded ? 'bg-brand-teal text-white shadow-md' : 'bg-slate-100 text-slate-500 group-hover/module:bg-brand-teal/10 group-hover/module:text-brand-teal'}`}>
                    {mIdx + 1}
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg transition-colors duration-300 ${isExpanded ? 'text-brand-teal' : 'text-slate-800'}`}>
                      {module.title}
                    </h4>
                    <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                      <span>{module.lessons.length} lessons</span>
                    </div>
                  </div>
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${isExpanded ? 'bg-brand-teal/10 text-brand-teal' : 'bg-slate-50 text-slate-400 group-hover/module:bg-slate-200'}`}>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="bg-slate-50/50 pb-6 px-6 pt-2">
                    <div className="relative border-l-2 border-slate-200 space-y-4">
                      {module.lessons.map((lesson) => {
                        const lessonIndex = allLessons.findIndex(l => l.id === lesson.id);
                        const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
                        const isPreviousCompleted = prevLesson ? progress?.lessons.find(l => l.lessonId === prevLesson.id)?.status === "completed" : true;
                        
                        const lessonProgress = progress?.lessons.find(l => l.lessonId === lesson.id);
                        const isCompleted = lessonProgress?.status === "completed";
                        const isLocked = !isPreviousCompleted && !!progress;

                        return (
                          <div key={lesson.id} className="relative pl-8 group/lesson">
                            {/* Timeline node */}
                            <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-slate-200 group-hover/lesson:border-brand-teal transition-colors flex items-center justify-center z-10">
                              {isCompleted && <div className="w-2 h-2 rounded-full bg-brand-teal" />}
                            </div>

                            {/* Card */}
                            <div className="flex items-center justify-between pl-4 pr-4 py-3 bg-white rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all cursor-pointer">
                              <div className="flex items-center gap-4">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isLocked ? 'bg-slate-50' : 'bg-brand-teal/10'}`}>
                                  {isCompleted ? (
                                    <>
                                      <CheckCircle2 className="w-5 h-5 text-brand-teal group-hover/lesson:hidden" />
                                      <CheckCircle2 className="w-5 h-5 text-white fill-brand-teal hidden group-hover/lesson:block" />
                                    </>
                                  ) : isLocked ? (
                                    <Lock className="w-5 h-5 text-slate-400" />
                                  ) : (
                                    <div className="text-brand-teal">
                                      {getFormatIcon(lesson.format)}
                                    </div>
                                  )}
                                </div>
                                <span className={`text-sm font-semibold transition-colors ${isLocked ? 'text-slate-400' : 'text-slate-700 group-hover/lesson:text-brand-teal'}`}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span className={`text-xs font-medium px-3 py-1 rounded-full ${isLocked ? 'bg-slate-50 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                                {lesson.duration}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Final Quiz Item */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100">
          <div className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all overflow-hidden group/quiz">
            <div
              onClick={() => progress?.quizPassed && setIsQuizExpanded(!isQuizExpanded)}
              className={`flex items-center justify-between px-4 py-4 transition-all ${progress?.quizPassed ? 'cursor-pointer hover:bg-slate-50/50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${progress?.quizPassed ? 'bg-brand-teal/10' : isAllLessonsCompleted ? 'bg-brand-teal/5 group-hover/quiz:bg-brand-teal/10' : 'bg-slate-50'}`}>
                  {progress?.quizPassed ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-brand-teal group-hover/quiz:hidden" />
                      <CheckCircle2 className="w-6 h-6 text-white fill-brand-teal hidden group-hover/quiz:block" />
                    </>
                  ) : isAllLessonsCompleted ? (
                    <FileText className="w-6 h-6 text-brand-teal group-hover/quiz:scale-110 transition-transform" />
                  ) : (
                    <Lock className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className={`font-bold text-base lg:text-lg transition-colors ${isAllLessonsCompleted ? 'text-slate-800 group-hover/quiz:text-brand-teal' : 'text-slate-400'}`}>
                    {course.quiz.title}
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">Requires {course.quiz.passPercentage}% to pass • Certification Badge</p>
                </div>
              </div>

              {isAllLessonsCompleted && !progress?.quizPassed && (
                <button className="px-6 py-2.5 bg-brand-teal text-white text-sm font-semibold rounded-xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:bg-[#0c8c70] transition-all active:scale-95">
                  Take Quiz
                </button>
              )}
              {progress?.quizPassed && (
                <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 bg-green-50 text-green-700 text-sm font-bold rounded-xl border border-green-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 fill-green-600 text-white" />
                    Score: {progress.quizScore}%
                  </span>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isQuizExpanded ? 'bg-brand-teal/10 text-brand-teal' : 'bg-slate-50 text-slate-400 group-hover/quiz:bg-slate-200'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isQuizExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              )}
            </div>

            {/* Quiz Review Accordion */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${isQuizExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-6">
                  <h4 className="font-semibold text-slate-800">Quiz Review</h4>
                  <div className="space-y-6">
                    {course.quiz.questions.map((q, qIdx) => {
                      const userAnswer = progress?.quizAnswers?.[q.id];
                      const isCorrect = userAnswer === q.correctAnswerIndex;

                      return (
                        <div key={q.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                          <div className="flex items-start gap-3 mb-4">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold mt-0.5">
                              {qIdx + 1}
                            </span>
                            <p className="font-medium text-slate-800 leading-relaxed">{q.question}</p>
                          </div>

                          <div className="space-y-2 pl-9">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = userAnswer === optIdx;
                              const isActuallyCorrect = q.correctAnswerIndex === optIdx;

                              let optionClass = "border-slate-100 bg-slate-50/50 text-slate-600";
                              let icon = <Circle className="w-4 h-4 text-slate-300" />;

                              if (isSelected && isCorrect) {
                                optionClass = "border-green-200 bg-green-50 text-green-800";
                                icon = <CheckCircle2 className="w-4 h-4 text-green-600" />;
                              } else if (isSelected && !isCorrect) {
                                optionClass = "border-red-200 bg-red-50 text-red-800";
                                icon = <Circle className="w-4 h-4 text-red-500 fill-red-100" />;
                              } else if (isActuallyCorrect) {
                                optionClass = "border-green-200 bg-green-50/50 text-green-700";
                                icon = <CheckCircle2 className="w-4 h-4 text-green-600" />;
                              }

                              return (
                                <div key={optIdx} className={`flex items-center gap-3 p-3 rounded-lg border ${optionClass}`}>
                                  {icon}
                                  <span className="text-sm font-medium">{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
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
