"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, FileText, Printer, Share2, PenTool } from "lucide-react";
import Link from "next/link";
import { documentsData } from "@/lib/portalMockData";
import { motion } from "framer-motion";
import { ESignatureFlow } from "@/components/documents/ESignatureFlow";

export default function DocumentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [isSignModalOpen, setIsSignModalOpen] = React.useState(false);

  const document = documentsData.find(d => d.id === id);

  if (!document) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-semibold text-text-primary mb-4">Document Not Found</h1>
        <button onClick={() => router.back()} className="text-brand-teal hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Link href="/portal/documents" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-brand-teal transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back to Documents
      </Link>

      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-border-subtle bg-slate-50/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-teal/20 text-brand-teal flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text-primary">{document.name}</h1>
                <div className="flex items-center text-xs text-text-secondary gap-2">
                  <span>{document.category}</span>
                  <span>•</span>
                  <span>Shared {document.date}</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded">
                    {document.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {document.needsSignature && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsSignModalOpen(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-sm font-semibold transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                >
                  <PenTool className="w-4 h-4" />
                  Sign Now
                </motion.button>
              )}
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border-subtle hover:bg-slate-50 text-text-primary rounded-xl text-sm font-medium transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-brand-teal hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 min-h-[500px] flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Document Preview Content</p>
            <p className="text-sm text-slate-400 mt-2">This is a placeholder for the actual document viewer.</p>
          </div>
        </div>
      </div>
      <ESignatureFlow 
        isOpen={isSignModalOpen} 
        onClose={() => setIsSignModalOpen(false)} 
        documentName={document.name}
        onSuccess={() => {
          setIsSignModalOpen(false);
          // In real app, we'd update document status here
        }}
      />
    </div>
  );
}
