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
  required = false,
}: CourseCardProps) {
  const getFormatIcon = () => {
    switch (format) {
      case "Video":
        return <PlayCircle className="w-9 h-9 text-white/90" />;
      case "Reading":
        return <FileText className="w-9 h-9 text-white/90" />;
      case "PDF":
        return <File className="w-9 h-9 text-white/90" />;
      case "PowerPoint":
        return <MonitorPlay className="w-9 h-9 text-white/90" />;
      default:
        return <PlayCircle className="w-9 h-9 text-white/90" />;
    }
  };

  return (
    <div
      onClick={onAction}
      className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden hover:shadow-xl hover:border-brand-teal/50 hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className={`h-36 ${thumbnailColor} relative flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-slate-900/40" />

        <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
          {getFormatIcon()}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          <span className="bg-slate-900/40 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
            {format}
          </span>
          <span className="bg-slate-900/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
            {duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4.5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1.5">
            <h4 className="font-extrabold text-slate-900 text-sm line-clamp-2 leading-snug group-hover:text-brand-teal transition-colors flex-1">
              {title}
            </h4>
            {required && (
              <span className="bg-rose-100 text-rose-700 border border-rose-200 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full flex-shrink-0">
                Mandatory
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold text-slate-400 block">{category}</span>
        </div>

        <div className="space-y-3 pt-1">
          {typeof progress === "number" && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                <span>Progress</span>
                <span className="text-slate-900 font-extrabold">{progress}%</span>
              </div>
              <ComplianceProgressBar progress={progress} />
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAction?.();
            }}
            className={`w-full py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer shadow-sm ${
              progress && progress > 0
                ? "bg-brand-teal text-white hover:bg-[#0c8a6f]"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

