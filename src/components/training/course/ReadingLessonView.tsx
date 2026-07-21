"use client";

import React, { useRef, useEffect, useState } from "react";
import { Lesson } from "@/types/course";
import { CheckCircle2 } from "lucide-react";

interface ReadingLessonViewProps {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
}

export function ReadingLessonView({ lesson, isCompleted, onComplete }: ReadingLessonViewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const totalScroll = scrollHeight - clientHeight;
      const currentProgress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 100;
      setScrollProgress(currentProgress);

      if (!isCompleted && currentProgress > 95) {
        onComplete();
      }
    };

    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      // Trigger initially in case content is small
      handleScroll();
    }

    return () => {
      if (currentRef) currentRef.removeEventListener("scroll", handleScroll);
    };
  }, [isCompleted, onComplete, lesson.id]);

  return (
    <div className="relative h-full flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 z-10">
        <div
          className="h-full bg-brand-teal transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto p-6 md:p-8 prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-brand-teal"
        dangerouslySetInnerHTML={{ __html: lesson.textContent || "<p>No content provided.</p>" }}
      />

      <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
        <div className="text-sm text-slate-500">
          {isCompleted ? "You have completed this reading." : "Scroll to the bottom to complete."}
        </div>
        <button
          onClick={onComplete}
          disabled={isCompleted || scrollProgress < 95}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${isCompleted
            ? "bg-brand-teal/10 text-brand-teal border border-brand-teal/20"
            : scrollProgress >= 95
              ? "bg-brand-teal text-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:bg-brand-teal/90 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
        >
          {isCompleted && <CheckCircle2 className="w-5 h-5" />}
          {isCompleted ? "Completed" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
}
