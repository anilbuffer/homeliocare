"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  MapPin, 
  DollarSign, 
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommandCenterPage() {
  const router = useRouter();

  return (
    <div className="w-full animate-in fade-in duration-500 max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Agency Command Center</h1>
          <p className="text-sm text-slate-500 mt-1">
            Top-down synchronization of all role workflows. Identify bottlenecks and navigate directly to queues.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Intake Workflow Sync */}
        <Card className="p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-slate-200 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Intake Pipeline</h2>
                <p className="text-xs text-slate-500">Lead to Admission Tracking</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">New Referrals</span>
                <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md font-bold">3</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Ready for Admission</span>
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold">2</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/intake/pipeline')}
            className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 text-blue-600 border border-slate-200 hover:border-blue-200 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Jump to Intake Pipeline <ArrowRight className="w-4 h-4" />
          </button>
        </Card>

        {/* Clinical Workflow Sync */}
        <Card className="p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-slate-200 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-brand-teal/10 text-brand-teal rounded-xl">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Clinical Queue</h2>
                <p className="text-xs text-slate-500">Assessments & Supervisory Visits</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Pending Initial Assessments</span>
                <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> 2 Overdue
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Supervisory Visits Due Soon</span>
                <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md font-bold">1</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => router.push('/clinical/pending-assessments')}
              className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-brand-teal/5 text-brand-teal border border-slate-200 hover:border-brand-teal/20 py-2.5 rounded-xl text-xs font-semibold transition-colors"
            >
              Pending Assessments
            </button>
            <button 
              onClick={() => router.push('/clinical/supervisory-visits')}
              className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-brand-teal/5 text-brand-teal border border-slate-200 hover:border-brand-teal/20 py-2.5 rounded-xl text-xs font-semibold transition-colors"
            >
              Supervisory Visits
            </button>
          </div>
        </Card>

        {/* Scheduling Workflow Sync */}
        <Card className="p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-slate-200 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Scheduling Queue</h2>
                <p className="text-xs text-slate-500">Unstaffed Requirements & Open Shifts</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">New Requirements (Unstaffed)</span>
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-bold">1</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Open Shifts (Call-offs)</span>
                <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md font-bold">3</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/scheduler/requirements')}
            className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-indigo-50 text-indigo-600 border border-slate-200 hover:border-indigo-200 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Jump to Scheduling Requirements <ArrowRight className="w-4 h-4" />
          </button>
        </Card>

        {/* Field Ops Workflow Sync */}
        <Card className="p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-slate-200 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Field Operations</h2>
                <p className="text-xs text-slate-500">EVV Exceptions & Live Tracking</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Late Clock-Ins</span>
                <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md font-bold">1</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">GPS Mismatches</span>
                <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-bold">1</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/field-supervisor/evv-exceptions')}
            className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-amber-50 text-amber-700 border border-slate-200 hover:border-amber-200 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Jump to EVV Exceptions <ArrowRight className="w-4 h-4" />
          </button>
        </Card>

        {/* Billing Workflow Sync */}
        <Card className="p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-slate-200 hover:shadow-md transition-all flex flex-col justify-between lg:col-span-2 xl:col-span-1">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Billing & QA</h2>
                <p className="text-xs text-slate-500">Pre-Billing Scrub & Denials</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Visits Pending QA Scrub</span>
                <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md font-bold">2</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Active Denials</span>
                <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> 1 Action Required
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Expiring Authorizations</span>
                <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> 1 Due Soon
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button 
              onClick={() => router.push('/billing/qa-scrub')}
              className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-emerald-50 text-emerald-700 border border-slate-200 hover:border-emerald-200 py-2.5 rounded-xl text-xs font-semibold transition-colors"
            >
              QA Scrub
            </button>
            <button 
              onClick={() => router.push('/billing/denials')}
              className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-emerald-50 text-emerald-700 border border-slate-200 hover:border-emerald-200 py-2.5 rounded-xl text-xs font-semibold transition-colors"
            >
              Denials
            </button>
            <button 
              onClick={() => router.push('/billing/authorizations/alerts')}
              className="col-span-2 md:col-span-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-emerald-50 text-emerald-700 border border-slate-200 hover:border-emerald-200 py-2.5 rounded-xl text-xs font-semibold transition-colors"
            >
              Auth Alerts
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
}
