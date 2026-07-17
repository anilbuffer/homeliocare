"use client";

import React, { useState } from "react";
import { Lesson } from "@/types/course";
import { CheckCircle2 } from "lucide-react";

interface PDFLessonViewerProps {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
}

export function PDFLessonViewer({ lesson, isCompleted, onComplete }: PDFLessonViewerProps) {
  const [hasScrolled, setHasScrolled] = useState(false);

  // Since we can't easily detect iframe scroll to bottom due to cross-origin policies
  // in a real PDF viewer, we typically provide a button they must click, or use a PDF library.
  // For the mockup, we will just allow marking complete immediately or after a simulated delay.

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
      <div className="flex-1 bg-slate-100 flex flex-col">
        {lesson.contentUrl ? (
          <iframe
            src={lesson.contentUrl}
            className="w-full h-full border-none"
            title={lesson.title}
            onLoad={() => setHasScrolled(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            No document source provided.
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
        <div className="text-sm text-slate-500">
          {isCompleted ? "You have completed this document." : "Review the document to complete."}
        </div>
        <button
          onClick={onComplete}
          disabled={isCompleted}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${isCompleted
            ? "bg-brand-teal/10 text-brand-teal border border-brand-teal/20"
            : "bg-brand-teal text-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:bg-brand-teal/90 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
            }`}
        >
          {isCompleted && <CheckCircle2 className="w-5 h-5" />}
          {isCompleted ? "Completed" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
}
