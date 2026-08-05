"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Applicant } from "./ApplicantCard";
import { Avatar } from "@/components/ui/Avatar";
import { Clock, Briefcase, FileText, CheckCircle2, User, Phone, Mail, Award, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ApplicantDetailsModalProps {
  applicant: Applicant | null;
  onClose: () => void;
}

export function ApplicantDetailsModal({ applicant, onClose }: ApplicantDetailsModalProps) {
  if (!applicant) return null;

  return (
    <Modal
      isOpen={!!applicant}
      onClose={onClose}
      title="Applicant Details"
      description={`Reviewing application for ${applicant.name}`}
      maxWidth="xl"
      icon={<div className="p-2 bg-brand-teal/10 rounded-full text-brand-teal"><User className="w-5 h-5" /></div>}
      footer={
        <div className="flex w-full justify-between items-center">
          <button
            onClick={() => {
              // Simulate downloading resume
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-brand-teal bg-brand-teal/5 hover:bg-brand-teal/10 text-sm font-semibold transition-colors"
          >
            <FileText className="w-4 h-4" />
            Download Resume
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-sm font-semibold transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                // Simulate moving to next stage
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-brand-teal text-white text-sm font-semibold hover:bg-brand-teal/90 transition-colors shadow-sm"
            >
              Move to Next Stage
            </button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6 py-2">
        {/* Header Profile */}
        <div className="flex items-start gap-4">
          <Avatar
            src={applicant.avatarUrl}
            alt={applicant.name}
            fallback={applicant.name.substring(0, 2)}
            size="xl"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-slate-900">{applicant.name}</h2>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="flex items-center gap-1.5 font-medium"><Briefcase className="w-4 h-4 text-slate-400" /> {applicant.role}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> Applied {applicant.appliedDate}</span>
            </div>
          </div>
          <div className="ml-auto">
            <Badge variant={applicant.matchScore >= 80 ? "success" : applicant.matchScore >= 60 ? "warning" : "default"} className="px-3 py-1.5 text-sm rounded-full">
              {applicant.matchScore}% Match
            </Badge>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2.5 text-sm text-slate-700">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="truncate">{applicant.name.toLowerCase().replace(' ', '.')}@example.com</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-700">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>(555) 123-4567</span>
          </div>
        </div>

        {/* Skills & Qualifications */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-brand-teal" />
            Skills & Qualifications
          </h4>
          <div className="flex flex-wrap gap-2">
            {applicant.tags.map((tag, i) => (
              <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Requirements Checklist */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-brand-teal" />
            Basic Requirements
          </h4>
          <div className="space-y-2.5 bg-white border border-slate-100 rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Background Check Cleared</span>
              <span className="text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-md text-xs border border-amber-100">Pending</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Valid Certification</span>
              <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-md text-xs border border-emerald-100">Verified</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Available to Start</span>
              <span className="text-slate-700 font-medium bg-slate-100 px-2 py-0.5 rounded-md text-xs border border-slate-200 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Within 2 weeks
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
