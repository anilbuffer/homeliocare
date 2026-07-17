"use client";

import React, { useRef, useEffect } from "react";
import { Lesson } from "@/types/course";
import { CheckCircle2 } from "lucide-react";

interface VideoLessonPlayerProps {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
}

export function VideoLessonPlayer({ lesson, isCompleted, onComplete }: VideoLessonPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock auto-complete when video nears the end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!isCompleted && video.currentTime / video.duration > 0.9) {
        onComplete();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isCompleted, onComplete]);

  return (
    <div className="w-full aspect-video max-h-[80vh] flex flex-col items-center bg-black/5 rounded-2xl overflow-hidden relative shadow-2xl ring-1 ring-slate-900/10 group/player">
      {lesson.contentUrl ? (
        <video 
          ref={videoRef}
          src={lesson.contentUrl} 
          controls 
          className="w-full h-full object-contain bg-black"
          controlsList="nodownload"
        />
      ) : (
        <div className="text-white flex items-center justify-center h-full w-full bg-slate-900">
          <p>No video source provided.</p>
        </div>
      )}
      {isCompleted && (
        <div className="absolute top-5 right-5 bg-green-500/90 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl border border-white/20 animate-in fade-in zoom-in duration-500">
          <CheckCircle2 className="w-5 h-5" />
          Completed
        </div>
      )}
    </div>
  );
}
