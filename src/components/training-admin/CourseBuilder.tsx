"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  PlayCircle,
  Settings,
  Plus,
  GripVertical,
  Video,
  FileText,
  Trash2,
  ShieldCheck,
  ChevronRight,
  Eye
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Module {
  id: string;
  title: string;
  type: "video" | "pdf" | "quiz";
  duration: string;
}

export function CourseBuilder() {
  const router = useRouter();
  const [courseTitle, setCourseTitle] = useState("Draft: Infection Control V4");
  const [modules, setModules] = useState<Module[]>([
    { id: "m1", title: "Introduction to Pathogens", type: "video", duration: "5 mins" },
    { id: "m2", title: "Hand Hygiene Standard Operating Procedure", type: "pdf", duration: "10 mins" },
  ]);
  const [complianceLinked, setComplianceLinked] = useState("none");
  const [versionStrategy, setVersionStrategy] = useState("grace-period");
  const [previewMode, setPreviewMode] = useState(false);

  const handleAddModule = (type: "video" | "pdf" | "quiz") => {
    setModules([
      ...modules,
      {
        id: `m${Date.now()}`,
        title: `New ${type} module`,
        type,
        duration: "0 mins"
      }
    ]);
  };

  const removeModule = (id: string) => {
    setModules(modules.filter(m => m.id !== id));
  };

  if (previewMode) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-brand-teal/20 text-brand-teal px-3 py-1.5 rounded-full text-xs font-semibold">Preview Mode</span>
            <span className="text-sm text-slate-500">Learner View</span>
          </div>
          <button
            onClick={() => setPreviewMode(false)}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Exit Preview
          </button>
        </div>

        {/* Simplified preview simulating caregiver view */}
        <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <div className="h-32 md:h-48 bg-slate-800 flex items-center justify-center p-4 lg:p-8 relative">
            <h1 className="text-lg md:text-xl font-semibold text-white relative z-10 text-center">{courseTitle}</h1>
            <div className="absolute inset-0 bg-brand-teal/20" />
          </div>
          <div className="p-4 md:p-6">
            <p className="text-slate-600 text-sm mb-3 lg:mb-6">This is how the caregiver will see the course overview and module list.</p>
            <h2 className="text-base font-semibold text-slate-800 mb-2 lg:mb-4">Course Modules</h2>
            <div className="space-y-3">
              {modules.map((m, i) => (
                <div key={m.id} className="flex items-center px-3 py-2 lg:px-4 lg:py-3 border border-slate-200 rounded-xl hover:border-brand-teal/50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 mr-3 group-hover:bg-brand-teal/10 group-hover:text-brand-teal transition-colors">
                    {m.type === 'video' ? <Video className="w-4 h-4" /> : m.type === 'pdf' ? <FileText className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-800 group-hover:text-brand-teal transition-colors">{i + 1}. {m.title}</h3>
                    <p className="text-xs text-slate-500">{m.type.toUpperCase()} • {m.duration}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-teal transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden sticky -top-4 z-20">
        <div>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="text-lg font-semibold text-slate-800 bg-transparent border-none focus:ring-0 p-0 hover:bg-slate-50 rounded"
          />
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Draft</span>
            <span>•</span>
            <span>Last saved: Just now</span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setPreviewMode(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 border border-slate-200 text-sm text-slate-700 font-medium rounded-full hover:bg-slate-50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] active:scale-95 transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
          <button onClick={() => router.push('/training-admin/courses')} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 bg-brand-teal text-sm text-white font-medium rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.04)] shadow-brand-teal/20 hover:bg-brand-teal/90 active:scale-95 transition-all">
            <Save className="w-3.5 h-3.5" /> Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content Builder */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-4">
            <h2 className="text-base font-semibold text-slate-800 mb-3">Course Content</h2>
            <div className="space-y-3 mb-3">
              {modules.map((module, index) => (
                <div key={module.id} className="group flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-2 lg:p-3 hover:border-slate-300 transition-colors relative">
                  <div className="cursor-grab text-slate-400 hover:text-slate-600">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 text-slate-500">
                    {module.type === 'video' ? <Video className="w-4 h-4" /> : module.type === 'pdf' ? <FileText className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={module.title}
                      onChange={(e) => setModules(modules.map(m => m.id === module.id ? { ...m, title: e.target.value } : m))}
                      className="w-full text-sm font-semibold text-slate-800 bg-transparent border-none focus:ring-1 focus:ring-brand-teal rounded px-1 -mx-1"
                    />
                    <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{module.type} • {module.duration}</div>
                  </div>
                  <button
                    onClick={() => removeModule(module.id)}
                    className="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleAddModule('video')}
                className="flex flex-col items-center justify-center gap-2 py-2 lg:py-4 border border-dashed border-slate-200 rounded-xl hover:border-brand-teal hover:bg-brand-teal/5 text-slate-500 hover:text-brand-teal transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-white flex items-center justify-center shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                  <Video className="w-4 h-4" />
                </div>
                <span className="text-xs lg:text-sm font-medium">Add Video</span>
              </button>
              <button
                onClick={() => handleAddModule('pdf')}
                className="flex flex-col items-center justify-center gap-2 py-2 lg:py-4 border border-dashed border-slate-200 rounded-xl hover:border-brand-teal hover:bg-brand-teal/5 text-slate-500 hover:text-brand-teal transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-white flex items-center justify-center shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs lg:text-sm font-medium">Add PDF/Doc</span>
              </button>
              <Link
                href="/training-admin/quizzes"
                className="flex flex-col items-center justify-center gap-2 py-2 lg:py-4 border border-dashed border-slate-200 rounded-xl hover:border-brand-teal hover:bg-brand-teal/5 text-slate-500 hover:text-brand-teal transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-white flex items-center justify-center shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <span className="text-xs lg:text-sm font-medium">Add Quiz</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Configuration Sidebar */}
        <div className="space-y-4">
          {/* Settings */}
          <div className="bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-3 lg:p-4">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4 text-slate-500" />
              Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <select className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-teal/50 outline-none">
                  <option>Clinical Skills</option>
                  <option>Compliance</option>
                  <option>HR & Onboarding</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Estimated Duration</label>
                <input type="text" placeholder="e.g. 45 mins" className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-teal/50 outline-none" />
              </div>
            </div>
          </div>
          {/* Compliance Mapping */}
          <div className="bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-3 lg:p-4">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-3 lg:mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Compliance Mapping
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Tag this course to satisfy a specific compliance requirement. HR/QA will see this course as fulfilling the mandate.
            </p>
            <select
              value={complianceLinked}
              onChange={(e) => setComplianceLinked(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2 text-sm focus:ring-2 focus:ring-brand-teal/50 outline-none mb-3"
            >
              <option value="none">Not linked to compliance</option>
              <option value="hipaa">Annual HIPAA Training</option>
              <option value="abuse">Abuse & Neglect Reporting</option>
              <option value="infection">Infection Control Standards</option>
            </select>
            {complianceLinked !== "none" && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-800">
                This course will now appear in the Compliance Tracking dashboard as satisfying the selected requirement.
              </div>
            )}
          </div>
          {/* Publishing Strategy */}
          <div className="bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-3 lg:p-4">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <RefreshCw className="w-4 h-4 text-indigo-500" />
              Versioning Strategy
            </h2>
            <p className="text-xs text-slate-500 mb-3">
              How should learners currently taking the older version be handled when you publish?
            </p>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="versionStrategy"
                  value="grace-period"
                  checked={versionStrategy === "grace-period"}
                  onChange={() => setVersionStrategy("grace-period")}
                  className="mt-0.5 text-brand-teal focus:ring-brand-teal"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-800">Grace Period (Recommended)</div>
                  <div className="text-xs text-slate-500 mt-0.5">New enrollees get this version. In-progress learners finish on the version they started.</div>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="versionStrategy"
                  value="force-upgrade"
                  checked={versionStrategy === "force-upgrade"}
                  onChange={() => setVersionStrategy("force-upgrade")}
                  className="mt-0.5 text-brand-teal focus:ring-brand-teal"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-800">Force Upgrade</div>
                  <div className="text-xs text-slate-500 mt-0.5">Move everyone to the new version immediately. May reset some progress.</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Temporary icon components to keep imports clean
function CheckSquare(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>;
}

function RefreshCw(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>;
}
