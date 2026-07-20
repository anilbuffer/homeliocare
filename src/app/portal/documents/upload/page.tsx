"use client";

import React from "react";
import { ArrowLeft, UploadCloud, File, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function UploadDocumentPage() {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploaded, setIsUploaded] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setIsUploaded(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/portal/documents" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-brand-teal transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back to Documents
      </Link>

      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Upload Document</h1>
        <p className="text-sm text-text-secondary mt-1">Share files securely with your care team.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border-subtle overflow-hidden p-8">
        {!isUploaded ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              isDragging ? "border-brand-teal bg-brand-teal/5" : "border-slate-300 hover:border-brand-teal hover:bg-slate-50"
            }`}
          >
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UploadCloud className={`w-8 h-8 ${isDragging ? "text-brand-teal" : "text-slate-400"}`} />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              Drag and drop your files here
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Supported formats: PDF, JPG, PNG, DOCX (Max size: 10MB)
            </p>
            <button 
              onClick={() => setIsUploaded(true)}
              className="px-6 py-2.5 bg-brand-teal hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
            >
              Browse Files
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#E6F7F1] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-brand-teal" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Upload Successful</h3>
            <p className="text-text-secondary mb-8">Your document has been securely shared with the care team.</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setIsUploaded(false)}
                className="px-6 py-2.5 bg-white border border-border-subtle hover:bg-slate-50 text-text-primary rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                Upload Another
              </button>
              <Link 
                href="/portal/documents"
                className="px-6 py-2.5 bg-brand-teal hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                Return to Documents
              </Link>
            </div>
          </div>
        )}

        {!isUploaded && (
          <div className="mt-8 pt-8 border-t border-border-subtle">
            <h4 className="text-sm font-medium text-text-primary mb-4">Upload Guidelines</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <File className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Ensure documents are clear and legible before uploading.</span>
              </li>
              <li className="flex items-start gap-2">
                <File className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Do not upload documents containing highly sensitive financial information unless requested.</span>
              </li>
              <li className="flex items-start gap-2">
                <File className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Files are automatically encrypted and securely stored.</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
