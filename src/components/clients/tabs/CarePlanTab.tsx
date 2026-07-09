import React from "react";
import { Card } from "@/components/ui/Card";
import { Client } from "@/lib/clients/mockData";
import { FileText } from "lucide-react";

export function CarePlanTab({ client }: { client: Client }) {
  return (
    <div className="space-y-6">
      <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-700 mb-2">No care plan yet</h3>
        <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">Create a comprehensive care plan to track problems, goals, and interventions for {client.name}.</p>
        <button className="bg-brand-teal hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm">
          Create Care Plan
        </button>
      </Card>
    </div>
  );
}
