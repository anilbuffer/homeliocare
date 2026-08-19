"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Search, MapPin, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FieldClientsPage() {
  const router = useRouter();

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Client Roster</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage clients assigned to your field territory.
          </p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clients..."
            className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal w-full sm:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Client 1 */}
        <Card 
          className="p-4 shadow-sm border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => router.push('/patients/p-1')}
        >
          <div className="flex items-start gap-4">
            <UserCircle className="w-10 h-10 text-slate-400" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">Dorothy Vance</h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3"/> New York, NY</p>
              <div className="mt-3">
                <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">Primary Caregiver: Maria Alvarez</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Client 2 */}
        <Card 
          className="p-4 shadow-sm border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => router.push('/patients/p-2')}
        >
          <div className="flex items-start gap-4">
            <UserCircle className="w-10 h-10 text-slate-400" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">Frank Delaney</h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3"/> Brooklyn, NY</p>
              <div className="mt-3">
                <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">Primary Caregiver: Robert Chen</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
