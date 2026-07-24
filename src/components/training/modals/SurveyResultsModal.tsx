"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Star, ThumbsUp, MessageSquare, Users, CheckCircle2 } from "lucide-react";

interface SurveyResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  survey: {
    name: string;
    responseRate: number;
  } | null;
}

export function SurveyResultsModal({ isOpen, onClose, survey }: SurveyResultsModalProps) {
  if (!survey) return null;

  const mockFeedback = [
    { caregiver: "Sofia R. (CNA)", rating: 5, comment: "The HIPAA refresher was super clear and easy to complete on mobile!", date: "2 days ago" },
    { caregiver: "James O. (RN)", rating: 4, comment: "Good video content, would appreciate more real clinical case studies.", date: "4 days ago" },
    { caregiver: "Aisha W. (HHA)", rating: 5, comment: "Loved the CPR recertification steps update.", date: "1 week ago" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${survey.name} - Results & Feedback`}
      description={`Caregiver pulse survey breakdown • ${survey.responseRate}% response rate`}
      maxWidth="xl"
    >
      <div className="space-y-4 pt-1">
        {/* Overview banner */}
        <div className="p-4 bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-teal-300">Overall Satisfaction</span>
            <div className="text-2xl font-extrabold text-white flex items-center gap-2 mt-0.5">
              4.8 / 5.0
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10">
              {survey.responseRate}% Responded
            </span>
          </div>
        </div>

        {/* Feedback List */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-brand-teal" /> Recent Caregiver Comments
          </h4>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {mockFeedback.map((fb, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">{fb.caregiver}</span>
                  <span className="text-[10px] text-slate-400">{fb.date}</span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(fb.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-[11px] pt-1">{fb.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close Survey
          </button>
        </div>
      </div>
    </Modal>
  );
}
