"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Star, MessageSquare, Filter } from "lucide-react";

interface PatientFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
}

const mockAllReviews = [
  {
    id: 1,
    rating: 5,
    date: "2 days ago",
    patient: "Family of Robert Hayes",
    comment: "Elena is wonderful with my husband. She is patient and always on time. We couldn't ask for better care.",
    tag: "Punctual & Patient",
  },
  {
    id: 2,
    rating: 4,
    date: "Last week",
    patient: "Mary Johnson",
    comment: "Very professional and knowledgeable. Helped with medication organization perfectly.",
    tag: "Medication Mgmt",
  },
  {
    id: 3,
    rating: 5,
    date: "Jun 24, 2026",
    patient: "Albert Davis",
    comment: "Always arrives with a bright smile and treats my mother with absolute respect and kindness.",
    tag: "Dementia Care Specialist",
  },
  {
    id: 4,
    rating: 5,
    date: "Jun 12, 2026",
    patient: "Sarah Connor",
    comment: "Went above and beyond helping with light meal prep and physical mobility exercises.",
    tag: "Mobility Assistance",
  },
  {
    id: 5,
    rating: 4,
    date: "May 28, 2026",
    patient: "James Wilson",
    comment: "Great communication and detailed shift notes left after every visit.",
    tag: "Documentation",
  },
];

export function PatientFeedbackModal({ isOpen, onClose, caregiverName }: PatientFeedbackModalProps) {
  const [filterRating, setFilterRating] = useState<number | "All">("All");

  const filteredReviews = mockAllReviews.filter((r) =>
    filterRating === "All" ? true : r.rating === filterRating
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Patient Feedback & Reviews"
      description={`Full history of patient and family evaluation scores for ${caregiverName}`}
      icon={<Star className="w-6 h-6 text-amber-400" />}
      maxWidth="2xl"
      footer={
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          Close Feedback View
        </button>
      }
    >
      <div className="space-y-4 py-2">
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Filter className="w-4 h-4 text-slate-400" />
            Filter by Rating:
          </div>
          <div className="flex gap-1.5">
            {["All", 5, 4].map((val) => (
              <button
                key={String(val)}
                type="button"
                onClick={() => setFilterRating(val as any)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${filterRating === val
                    ? "bg-brand-teal text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
              >
                {val === "All" ? "All Reviews" : `${val} Stars`}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-100"
                        }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">{rev.rating}.0</span>
                </div>
                <span className="text-xs text-slate-400">{rev.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic">"{rev.comment}"</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-semibold text-slate-700">- {rev.patient}</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium text-[10px]">
                  {rev.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
