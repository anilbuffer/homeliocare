"use client";

import React from "react";
import { documentsData } from "@/lib/portalMockData";
import { FileText, Download, ExternalLink } from "lucide-react";

export default function PortalDocumentsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Documents</h1>
        <p className="text-sm text-text-secondary mt-1">View and download important care plans, agreements, and agency documents.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle overflow-hidden">
        <div className="divide-y divide-border-subtle">
          {documentsData.map(doc => (
            <div key={doc.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary text-sm sm:text-base">{doc.name}</h3>
                  <div className="text-xs text-text-secondary mt-0.5">Added {doc.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded mr-2">
                  {doc.type}
                </span>
                <button className="p-2 text-slate-400 hover:text-brand-teal hover:bg-[#E6F7F1] rounded-lg transition-colors" title="View Document">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-brand-teal hover:bg-[#E6F7F1] rounded-lg transition-colors" title="Download Document">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {documentsData.length === 0 && (
          <div className="p-8 text-center text-text-secondary">
            <FileText className="w-8 h-8 mx-auto mb-3 text-slate-300" />
            <p>No documents shared yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
