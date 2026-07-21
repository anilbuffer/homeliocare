"use client";

import { useState } from "react";

import { Building2, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function AgencyProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">Agency Profile</h3>
        <p className="text-xs text-text-secondary mt-1">Manage core agency details, identifiers, and primary contact information.</p>
      </div>

      <form className="space-y-4 max-w-full">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-brand-teal" />
            </div>
            <h4 className="font-semibold text-slate-800">Basic Information</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Agency Legal Name</label>
              <input type="text" defaultValue="Homelio Care LLC" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Doing Business As (DBA)</label>
              <input type="text" defaultValue="Homelio Care" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">National Provider Identifier (NPI)</label>
              <input type="text" defaultValue="1234567890" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm font-mono transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Tax ID / EIN</label>
              <input type="password" defaultValue="12-3456789" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm font-mono transition-colors" />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <h4 className="font-semibold text-slate-800">Primary Location</h4>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Street Address</label>
              <input type="text" defaultValue="100 Healthcare Blvd, Suite 200" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">City</label>
                <input type="text" defaultValue="Seattle" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">State</label>
                <input type="text" defaultValue="WA" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">ZIP Code</label>
                <input type="text" defaultValue="98101" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button 
            type="button" 
            onClick={handleSave}
            disabled={isSaving || isSaved}
            className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : isSaved ? "Saved!" : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
