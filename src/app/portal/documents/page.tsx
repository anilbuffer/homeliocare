"use client";

import React from "react";
import { documentsData } from "@/lib/portalMockData";
import { FileText, Download, ExternalLink, Upload, PenTool, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PortalDocumentsPage() {
  const categories = [
    "Care Plan Summary",
    "Signed Agreements",
    "Invoices & Receipts",
    "Insurance Information",
    "Other Documents"
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Documents</h1>
          <p className="text-xs text-text-secondary mt-1">View and download important care plans, agreements, and agency documents.</p>
        </div>
        <Link href="/portal/documents/upload" className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-teal hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm w-full sm:w-auto">
          <Upload className="w-4 h-4" />
          Upload Document
        </Link>
      </div>

      <div className="space-y-8">
        {categories.map((category) => {
          const docsInCategory = documentsData.filter(d => d.category === category);

          if (docsInCategory.length === 0) return null;

          return (
            <div key={category}>
              <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 pl-1 border-b border-border-subtle pb-2">
                {category}
              </h2>
              <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle overflow-hidden">
                <div className="divide-y divide-border-subtle">
                  {docsInCategory.map(doc => (
                    <div key={doc.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-colors gap-4 sm:gap-0">
                      <div className="flex items-start sm:items-center gap-4">
                        <Link href={`/portal/documents/${doc.id}`} className="w-10 h-10 rounded-xl bg-brand-teal/20 text-brand-teal flex items-center justify-center shrink-0 mt-1 sm:mt-0 hover:bg-brand-teal/30 transition-colors">
                          {doc.type === "IMG" ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                        </Link>
                        <div>
                          <Link href={`/portal/documents/${doc.id}`} className="font-medium text-text-primary text-sm sm:text-base hover:text-brand-teal transition-colors">
                            {doc.name}
                          </Link>
                          <div className="text-xs text-text-secondary mt-0.5">Shared {doc.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pl-14 sm:pl-0">
                        {doc.needsSignature && (
                          <Link href={`/portal/documents/${doc.id}`}>
                            <motion.div
                              animate={{ scale: [1, 1.02, 1] }}
                              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-lg text-xs font-semibold transition-colors shrink-0"
                            >
                              <PenTool className="w-3.5 h-3.5" /> Review & Sign
                            </motion.div>
                          </Link>
                        )}

                        <div className="flex items-center gap-1">
                          <span className="hidden sm:inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded mr-2">
                            {doc.type}
                          </span>
                          <Link href={`/portal/documents/${doc.id}`} className="p-2 text-slate-400 hover:text-brand-teal hover:bg-[#E6F7F1] rounded-lg transition-colors block" title="View Document">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <Link href={`/portal/documents/${doc.id}`} className="p-2 text-slate-400 hover:text-brand-teal hover:bg-[#E6F7F1] rounded-lg transition-colors block" title="Download Document">
                            <Download className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {documentsData.length === 0 && (
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle p-8 text-center text-text-secondary">
            <FileText className="w-8 h-8 mx-auto mb-3 text-slate-300" />
            <p>No documents yet — anything your care team shares will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
