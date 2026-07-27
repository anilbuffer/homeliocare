"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { UploadCloud, CheckCircle2, FileText } from "lucide-react";

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
  onUploadDocument: (doc: {
    name: string;
    category: string;
    date: string;
    size: string;
  }) => void;
}

export function UploadDocumentModal({
  isOpen,
  onClose,
  caregiverName,
  onUploadDocument,
}: UploadDocumentModalProps) {
  const [docName, setDocName] = useState("");
  const [category, setCategory] = useState("Onboarding & Contracts");
  const [fileName, setFileName] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFileName(f.name);
      if (!docName) {
        setDocName(f.name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = docName.trim() || fileName || "New_Uploaded_Document.pdf";
    onUploadDocument({
      name: finalTitle.endsWith(".pdf") || finalTitle.endsWith(".jpg") ? finalTitle : `${finalTitle}.pdf`,
      category,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      size: "1.8 MB",
    });
    setDocName("");
    setFileName("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Caregiver Document"
      description={`Add a new personnel file, certification copy, or tax document for ${caregiverName}`}
      icon={<UploadCloud className="w-6 h-6 text-brand-teal" />}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-emerald-600 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Upload Document
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Document Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white"
          >
            <option value="Onboarding & Contracts">Onboarding & Contracts</option>
            <option value="Tax & Financial">Tax & Financial</option>
            <option value="Licenses & Identifications">Licenses & Identifications</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Document Title / Display Name
          </label>
          <input
            type="text"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            placeholder="e.g. Annual_TB_Screening_2026.pdf"
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Choose File
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-brand-teal/50 transition-colors bg-slate-50/50">
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload-input"
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
            />
            <label htmlFor="file-upload-input" className="cursor-pointer flex flex-col items-center">
              <FileText className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-xs font-bold text-brand-teal hover:underline">Click to browse file</span>
              <span className="text-[11px] text-slate-400 mt-1">PDF, PNG, JPG, or DOCX (Max 15MB)</span>
            </label>
            {fileName && (
              <div className="mt-3 text-xs font-semibold text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                Selected: {fileName}
              </div>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
