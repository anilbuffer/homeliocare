"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MoreVertical,
  BookOpen,
  Archive,
  ShieldCheck,
  Copy,
  Tag,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileEdit,
  Plus
} from "lucide-react";
import Link from "next/link";

const MOCK_COURSES = [
  {
    id: "c_1",
    title: "Annual HIPAA & Privacy Update",
    category: "Compliance",
    status: "published",
    lastUpdated: "2025-10-12",
    enrollments: 142,
    complianceLinked: true,
    version: "v3.1",
  },
  {
    id: "c_2",
    title: "Dementia Care Basics",
    category: "Clinical Skills",
    status: "draft",
    lastUpdated: "2 hours ago",
    enrollments: 0,
    complianceLinked: false,
    version: "v2.0-draft",
  },
  {
    id: "c_3",
    title: "Infection Control",
    category: "Compliance",
    status: "published",
    lastUpdated: "2026-01-05",
    enrollments: 89,
    complianceLinked: true,
    version: "v4.0",
  },
  {
    id: "c_4",
    title: "Old Employee Handbook",
    category: "HR",
    status: "archived",
    lastUpdated: "2024-05-10",
    enrollments: 12,
    complianceLinked: false,
    version: "v1.5",
  },
];

export function CourseLibrary() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [courses, setCourses] = useState(MOCK_COURSES);

  // Modals state
  const [archiveModalOpen, setArchiveModalOpen] = useState<string | null>(null);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelect = (id: string) => {
    setSelectedCourses(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleArchiveRequest = (courseId: string) => {
    setArchiveModalOpen(courseId);
  };

  const confirmArchive = () => {
    if (!archiveModalOpen) return;
    // Perform archive logic
    setCourses(prev => prev.map(c => c.id === archiveModalOpen ? { ...c, status: "archived" } : c));
    setArchiveModalOpen(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Course Library</h1>
          <p className="text-slate-500 mt-1 text-xs">Manage all training modules and content.</p>
        </div>
        <Link
          href="/training-admin/courses/builder"
          className="flex items-center gap-2 bg-brand-teal text-white text-sm px-4 py-2.5 rounded-full font-medium shadow-[0_4px_24px_rgba(0,0,0,0.04)] shadow-brand-teal/20 hover:bg-brand-teal/90 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Create New Course
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-4 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border-none bg-transparent text-sm font-medium text-slate-600 focus:outline-none focus:ring-0 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        <AnimatePresence>
          {selectedCourses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              <span className="text-xs font-semibold text-slate-500 mr-2">
                {selectedCourses.length} Selected
              </span>
              <button className="p-1.5 text-slate-400 hover:text-brand-teal transition-colors rounded-md hover:bg-white tooltip-trigger" title="Bulk tag compliance">
                <Tag className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors rounded-md hover:bg-white tooltip-trigger" title="Duplicate selected">
                <Copy className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Data Table */}
      <div className="bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500 uppercase">
                <th className="px-4 py-3 w-12 text-center">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-brand-teal focus:ring-brand-teal"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCourses(filteredCourses.map(c => c.id));
                      } else {
                        setSelectedCourses([]);
                      }
                    }}
                    checked={selectedCourses.length === filteredCourses.length && filteredCourses.length > 0}
                  />
                </th>
                <th className="px-4 py-3">Course Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Compliance</th>
                <th className="px-4 py-3">Enrollments</th>
                <th className="px-4 py-3">Last Updated</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-brand-teal focus:ring-brand-teal"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => handleSelect(course.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{course.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{course.category} • {course.version}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${course.status === "published" ? "bg-brand-teal/10 text-brand-teal" :
                      course.status === "draft" ? "bg-blue-100 text-blue-600" :
                        "bg-slate-100 text-slate-600"
                      }`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {course.complianceLinked ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-full w-fit">
                        <ShieldCheck className="w-3.5 h-3.5" /> Linked
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-medium">
                    {course.enrollments}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {course.lastUpdated}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/training-admin/courses/builder?id=${course.id}`}
                        className="text-slate-400 hover:text-brand-teal transition-colors"
                        title="Edit Course"
                      >
                        <FileEdit className="w-4 h-4" />
                      </Link>
                      {course.status !== "archived" && (
                        <button
                          onClick={() => handleArchiveRequest(course.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                          title="Archive Course"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-slate-500">
                    No courses found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Archive Modal */}
      <AnimatePresence>
        {archiveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setArchiveModalOpen(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Retire Course?</h3>
                <p className="text-sm text-slate-600 mb-4">
                  This course currently has <span className="font-bold text-slate-800">{courses.find(c => c.id === archiveModalOpen)?.enrollments} active enrollments</span>.
                  Archiving it will initiate a sunset period. In-progress learners will have 14 days to complete it, and no new enrollments will be allowed.
                </p>
                {courses.find(c => c.id === archiveModalOpen)?.complianceLinked && (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-6 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-xs text-red-800">
                      <strong>Warning:</strong> This course fulfills an active compliance requirement. Ensure another course is linked to prevent a compliance gap before archiving.
                    </p>
                  </div>
                )}
                <div className="flex gap-3 justify-end mt-6">
                  <button
                    onClick={() => setArchiveModalOpen(null)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmArchive}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 transition-colors"
                  >
                    Initiate Sunset & Archive
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
