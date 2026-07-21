"use client";

import React from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Clock, Briefcase, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/components/ui/Card";

export interface Applicant {
  id: string;
  name: string;
  role: string;
  appliedDate: string;
  avatarUrl?: string;
  matchScore: number;
  tags: string[];
}

interface ApplicantCardProps {
  applicant: Applicant;
}

export function ApplicantCard({ applicant }: ApplicantCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-brand-teal/30 transition-all duration-300 cursor-pointer flex flex-col gap-3 group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar 
            src={applicant.avatarUrl} 
            alt={applicant.name} 
            fallback={applicant.name.substring(0, 2)} 
            size="md" 
          />
          <div>
            <h4 className="font-semibold text-text-primary text-sm group-hover:text-brand-teal transition-colors">
              {applicant.name}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-0.5">
              <Briefcase className="w-3 h-3 text-slate-400" />
              {applicant.role}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Applied {applicant.appliedDate}
          </div>
          <Badge variant={applicant.matchScore >= 80 ? "success" : applicant.matchScore >= 60 ? "warning" : "default"}>
            {applicant.matchScore}% Match
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-1.5 pt-1">
          {applicant.tags.map((tag, i) => (
            <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="pt-3 border-t border-slate-100 mt-1 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-brand-teal font-medium hover:text-emerald-700 transition-colors">
          <FileText className="w-3.5 h-3.5" />
          View Resume
        </div>
      </div>
    </div>
  );
}
