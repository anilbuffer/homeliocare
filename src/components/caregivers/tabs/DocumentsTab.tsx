"use client";

import React from "react";
import { Caregiver } from "@/lib/caregivers/mockData";
import { Card } from "@/components/ui/Card";
import { FileText, Download, Eye, UploadCloud, Folder } from "lucide-react";
import { cn } from "@/components/ui/Card";

const documentGroups = [
  {
    title: "Onboarding & Contracts",
    files: [
      { name: "Employment_Agreement_Signed.pdf", date: "Jan 15, 2023", size: "2.4 MB" },
      { name: "Code_of_Conduct_Ack.pdf", date: "Jan 16, 2023", size: "1.1 MB" },
    ]
  },
  {
    title: "Tax & Financial",
    files: [
      { name: "W4_2026.pdf", date: "Jan 05, 2026", size: "0.8 MB" },
      { name: "Direct_Deposit_Form.pdf", date: "Jan 15, 2023", size: "1.2 MB" },
    ]
  },
  {
    title: "Licenses & Identifications",
    files: [
      { name: "RN_License_Copy.jpg", date: "May 02, 2022", size: "3.5 MB" },
      { name: "Driver_License.pdf", date: "Jan 15, 2023", size: "1.5 MB" },
    ]
  }
];

export function DocumentsTab({ caregiver }: { caregiver: Caregiver }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Caregiver Documents</h3>
        <button className="text-sm font-medium bg-brand-teal text-white hover:bg-emerald-600 px-4 py-2 rounded-xl transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex items-center gap-2">
          <UploadCloud className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentGroups.map((group, idx) => (
          <Card key={idx} className="p-0 overflow-hidden flex flex-col h-full">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
              <Folder className="w-5 h-5 text-brand-teal" />
              <h4 className="font-semibold text-slate-800">{group.title}</h4>
            </div>
            <div className="flex-1">
              {group.files.map((file, fIdx) => (
                <div key={fIdx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group/file">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      file.name.endsWith('.pdf') ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
                    )}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-800 line-clamp-1 group-hover/file:text-brand-teal transition-colors">
                        {file.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {file.date} • {file.size}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover/file:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-brand-teal hover:bg-teal-50 rounded-lg transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-brand-teal hover:bg-teal-50 rounded-lg transition-colors" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
