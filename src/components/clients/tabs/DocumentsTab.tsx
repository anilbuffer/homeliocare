import React from "react";
import { Card } from "@/components/ui/Card";
import { Client } from "@/lib/clients/mockData";
import { FolderOpen } from "lucide-react";

export function DocumentsTab({ client }: { client: Client }) {
  return (
    <div className="space-y-6">
      <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200">
        <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-700 mb-2">No documents uploaded</h3>
        <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">Upload intake forms, consents, clinical records, or insurance documents here.</p>
        <button className="bg-brand-teal hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm">
          Upload Document
        </button>
      </Card>
    </div>
  );
}
