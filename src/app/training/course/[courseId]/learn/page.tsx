"use client";

import React, { useState, use } from "react";
import { CourseSidebar } from "@/components/training/course/CourseSidebar";
import { VideoLessonPlayer } from "@/components/training/course/VideoLessonPlayer";
import { ReadingLessonView } from "@/components/training/course/ReadingLessonView";
import { PDFLessonViewer } from "@/components/training/course/PDFLessonViewer";
import { QuizSection } from "@/components/training/course/QuizSection";
import { MOCK_COURSE_DETAIL, MOCK_USER_PROGRESS } from "@/lib/mockCourseData";
import { UserCourseProgress, Lesson } from "@/types/course";
import { Menu, X } from "lucide-react";

export default function CoursePlayerPage({ params }: { params: Promise<{ courseId: string }> }) {
  // const resolvedParams = use(params);
  const course = MOCK_COURSE_DETAIL;
  const [progress, setProgress] = useState<UserCourseProgress>(MOCK_USER_PROGRESS);
  const [activeLessonId, setActiveLessonId] = useState<string>(course.modules[0]?.lessons[0]?.id || "");
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Flatten lessons for easy navigation
  const allLessons: Lesson[] = course.modules.flatMap(m => m.lessons);
  const activeLessonIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const activeLesson = allLessons[activeLessonIndex];

  const isCompleted = (lessonId: string) => {
    return progress.lessons.find(l => l.lessonId === lessonId)?.status === "completed" || false;
  };

  const handleCompleteLesson = () => {
    setProgress(prev => {
      const newLessons = [...prev.lessons];
      const existingIdx = newLessons.findIndex(l => l.lessonId === activeLessonId);
      if (existingIdx >= 0) {
        newLessons[existingIdx] = { ...newLessons[existingIdx], status: "completed" };
      } else {
        newLessons.push({ lessonId: activeLessonId, status: "completed" });
      }
      return { ...prev, lessons: newLessons };
    });
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < allLessons.length - 1) {
      setActiveLessonId(allLessons[activeLessonIndex + 1].id);
    } else {
      setIsQuizActive(true);
    }
  };

  const handleQuizPass = (score: number) => {
    setProgress(prev => ({ ...prev, quizPassed: true, quizScore: score }));
  };

  const renderContent = () => {
    if (isQuizActive) {
      return <QuizSection course={course} onPass={handleQuizPass} />;
    }

    if (!activeLesson) return <div>Lesson not found</div>;

    const lessonCompleted = isCompleted(activeLesson.id);

    return (
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Lesson Header */}
        <div className="flex-shrink-0 px-6 py-5 md:px-10 md:py-8 flex justify-between items-center z-10">
          <div>
            <span className="inline-block px-3 py-1 bg-brand-teal/10 text-brand-teal text-[11px] font-bold uppercase tracking-wider rounded-full mb-3 border border-brand-teal/20">
              Current Lesson
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">{activeLesson.title}</h1>
          </div>
        </div>

        {/* Lesson Content Area */}
        <div className="flex-1 overflow-hidden px-6 pb-6 md:px-10 md:pb-10 flex flex-col max-w-6xl mx-auto w-full">
          <div className="flex-1 w-full h-full min-h-0">
            {activeLesson.format === "Video" && (
              <VideoLessonPlayer lesson={activeLesson} isCompleted={lessonCompleted} onComplete={handleCompleteLesson} />
            )}
            {activeLesson.format === "Reading" && (
              <ReadingLessonView lesson={activeLesson} isCompleted={lessonCompleted} onComplete={handleCompleteLesson} />
            )}
            {(activeLesson.format === "PDF" || activeLesson.format === "PowerPoint") && (
              <PDFLessonViewer lesson={activeLesson} isCompleted={lessonCompleted} onComplete={handleCompleteLesson} />
            )}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex justify-between items-center shrink-0">
            <button
              onClick={() => setActiveLessonId(allLessons[activeLessonIndex - 1].id)}
              disabled={activeLessonIndex === 0}
              className="px-6 py-3 font-semibold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] rounded-xl transition-all border border-slate-200 shadow-[0_6px_16px_rgba(0,0,0,0.06)] hover:border-slate-200"
            >
              Previous Lesson
            </button>
            <button
              onClick={handleNextLesson}
              disabled={!lessonCompleted && activeLesson.isRequired}
              className="px-8 py-3 font-semibold text-white bg-brand-teal disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-[0_4px_12px_rgba(12,140,112,0.3)] hover:shadow-[0_6px_20px_rgba(12,140,112,0.4)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {activeLessonIndex === allLessons.length - 1 ? "Go to Final Quiz" : "Next Lesson"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#F4F6F8] overflow-hidden backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-slate-900 text-white p-4 rounded-full shadow-xl"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-40 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <CourseSidebar
          course={course}
          progress={progress}
          activeLessonId={activeLessonId}
          onSelectLesson={(id) => {
            setActiveLessonId(id);
            setIsQuizActive(false);
            setSidebarOpen(false);
          }}
          isQuizActive={isQuizActive}
          onSelectQuiz={() => {
            setIsQuizActive(true);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}
