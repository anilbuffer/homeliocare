"use client";

import React from "react";
import { PlayCircle, FileText, File, MonitorPlay } from "lucide-react";
import { ComplianceProgressBar } from "./ComplianceProgressBar";

interface CourseCardProps {
  title: string;
  category: string;
  format: "Video" | "Reading" | "PDF" | "PowerPoint";
  duration: string;
  progress?: number;
  thumbnailColor?: string;
  actionLabel?: string;
  onAction?: () => void;
  required?: boolean;
}

export function CourseCard({
  title,
  category,
  format,
  duration,
  progress,
  thumbnailColor = "bg-brand-teal",
  actionLabel = "Start",
  onAction,
  required = false
}: CourseCardProps) {

  const getFormatIcon = () => {
    switch (format) {
      case "Video": return <PlayCircle className="w-8 h-8 text-white/80" />;
      case "Reading": return <FileText className="w-8 h-8 text-white/80" />;
      case "PDF": return <File className="w-8 h-8 text-white/80" />;
      case "PowerPoint": return <MonitorPlay className="w-8 h-8 text-white/80" />;
      default: return <PlayCircle className="w-8 h-8 text-white/80" />;
    }
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer" onClick={onAction}>
      {/* Thumbnail */}
      <div className={`h-32 ${thumbnailColor} relative flex items-center justify-center`}>
        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20" />

        {/* Format Icon */}
        <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
          {getFormatIcon()}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded">
            {format}
          </span>
          <span className="bg-black/30 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded">
            {duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h4 className="font-semibold text-slate-800 text-sm line-clamp-2 leading-tight flex-1">
            {title}
          </h4>
          {required && (
            <span className="bg-red-50 text-red-600 border border-red-100 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0">
              Required
            </span>
          )}
        </div>

        <div className="text-xs text-slate-500 mb-4">{category}</div>

        <div className="mt-auto pt-2 space-y-3">
          {typeof progress === "number" && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span>{progress}% complete</span>
              </div>
              <ComplianceProgressBar progress={progress} />
            </div>
          )}

          <button
            className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${progress && progress > 0
              ? "bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
