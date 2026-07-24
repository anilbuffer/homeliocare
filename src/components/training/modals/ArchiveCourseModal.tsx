"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Archive, AlertTriangle } from "lucide-react";
import { Course } from "@/lib/mockTrainingData";

interface ArchiveCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onArchive: (courseId: string) => void;
}

export function ArchiveCourseModal({
  isOpen,
  onClose,
  course,
  onArchive,
}: ArchiveCourseModalProps) {
  if (!course) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Archive Course Catalog Entry"
      description="Deactivate this module from active caregiver assignments"
      maxWidth="md"
    >
      <div className="space-y-4 pt-1">
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900 text-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Are you sure you want to archive this course?</p>
            <p className="text-[11px] text-amber-800 mt-0.5">
              Caregivers currently assigned to <span className="font-bold">"{course.title}"</span> will retain their completion records, but uncompleted enrollments will be hidden.
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1">
          <p className="font-bold text-slate-800">{course.title}</p>
          <p className="text-slate-500">{course.category} • {course.assignedCount} Active Enrollments</p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onArchive(course.id);
              onClose();
            }}
            className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Archive className="w-3.5 h-3.5" />
            Archive Course Now
          </button>
        </div>
      </div>
    </Modal>
  );
}
