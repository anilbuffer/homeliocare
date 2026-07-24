"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { BookOpen, Video, FileText, File, MonitorPlay, Plus, Save } from "lucide-react";
import { Course } from "@/lib/mockTrainingData";

interface CreateEditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseToEdit?: Course | null;
  onSave: (course: Partial<Course>) => void;
}

export function CreateEditCourseModal({
  isOpen,
  onClose,
  courseToEdit,
  onSave,
}: CreateEditCourseModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("HIPAA");
  const [format, setFormat] = useState<"Video" | "Reading" | "PDF" | "PowerPoint">("Video");
  const [duration, setDuration] = useState("45m");
  const [required, setRequired] = useState(true);
  const [passRate, setPassRate] = useState(80);
  const [attemptsAllowed, setAttemptsAllowed] = useState(3);

  useEffect(() => {
    if (courseToEdit) {
      setTitle(courseToEdit.title);
      setCategory(courseToEdit.category);
      setFormat(courseToEdit.format);
      setDuration(courseToEdit.duration);
      setRequired(courseToEdit.required);
      setPassRate(courseToEdit.passRate || 80);
      setAttemptsAllowed(courseToEdit.attemptsAllowed || 3);
    } else {
      setTitle("");
      setCategory("HIPAA");
      setFormat("Video");
      setDuration("45m");
      setRequired(true);
      setPassRate(80);
      setAttemptsAllowed(3);
    }
  }, [courseToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: courseToEdit?.id || `c_${Date.now()}`,
      title,
      category,
      format,
      duration,
      required,
      passRate,
      attemptsAllowed,
      thumbnailColor: courseToEdit?.thumbnailColor || "bg-brand-teal",
      assignedCount: courseToEdit?.assignedCount || 30,
      completionRate: courseToEdit?.completionRate || 0,
    });

    onClose();
  };

  const categories = [
    "HIPAA", "OSHA", "Infection Control", "Medication Management",
    "Incident Reporting", "Abuse Prevention", "Dementia Care",
    "CPR/First Aid", "Fire Safety", "Emergency Prep", "Documentation", "Cybersecurity"
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={courseToEdit ? "Edit LMS Course" : "Create New LMS Course"}
      description={courseToEdit ? "Update training module specs and requirements" : "Author and publish a new mandatory or elective course"}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Course Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. 2026 HIPAA Privacy & Security Refresher"
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-medium text-slate-800"
          />
        </div>

        {/* Category & Format Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-medium text-slate-800"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Media Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-medium text-slate-800"
            >
              <option value="Video">Video Course</option>
              <option value="Reading">Interactive Reading</option>
              <option value="PDF">PDF Handbook</option>
              <option value="PowerPoint">Slide Presentation</option>
            </select>
          </div>
        </div>

        {/* Duration, Pass Rate, Attempts */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Est. Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 45m"
              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Passing %
            </label>
            <input
              type="number"
              min="50"
              max="100"
              value={passRate}
              onChange={(e) => setPassRate(Number(e.target.value))}
              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Max Attempts
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={attemptsAllowed}
              onChange={(e) => setAttemptsAllowed(Number(e.target.value))}
              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-medium text-slate-800"
            />
          </div>
        </div>

        {/* Required Toggle */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 block">Mandatory Compliance Course</span>
            <span className="text-[11px] text-slate-500">Automatically assign to new hire onboarding rosters</span>
          </div>
          <button
            type="button"
            onClick={() => setRequired(!required)}
            className={`w-11 h-6 rounded-full p-1 transition-colors relative flex items-center cursor-pointer ${required ? "bg-brand-teal" : "bg-slate-300"
              }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform ${required ? "translate-x-5" : "translate-x-0"
                }`}
            />
          </button>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold bg-brand-teal hover:bg-[#0c8a6f] text-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {courseToEdit ? <Save className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {courseToEdit ? "Save Course Changes" : "Publish Course Catalog"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
