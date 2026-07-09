import React from "react";
import { Card } from "@/components/ui/Card";
import { Client } from "@/lib/clients/mockData";
import { MessageSquare } from "lucide-react";

export function CommunicationTab({ client }: { client: Client }) {
  return (
    <div className="space-y-6">
      <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200">
        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-700 mb-2">No active communications</h3>
        <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">Send a message to the family portal, log a call, or add internal care-team notes.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-brand-teal hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm">
            Message Family
          </button>
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm">
            Add Internal Note
          </button>
        </div>
      </Card>
    </div>
  );
}
