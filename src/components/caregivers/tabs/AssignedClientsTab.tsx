"use client";

import React from "react";
import Link from "next/link";
import { Caregiver } from "@/lib/caregivers/mockData";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Users, Calendar, ArrowRight, Activity } from "lucide-react";
import { mockClients } from "@/lib/clients/mockData";

export function AssignedClientsTab({ caregiver }: { caregiver: Caregiver }) {
  // Mock grabbing assigned clients from the existing client mock data
  // In a real app, this would be a filtered array based on assignments
  const assignedClients = Object.values(mockClients).slice(0, caregiver.assignedClientsCount || 2);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Assigned Clients ({assignedClients.length})</h3>
        <button className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap">
          Assign New Client
        </button>
      </div>

      {assignedClients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedClients.map((client) => (
            <Card key={client.id} className="p-0 overflow-hidden hover:border-brand-teal/30 hover:shadow-md transition-all group">
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar src={client.avatarUrl} alt={client.name} fallback={client.name.substring(0, 2)} size="lg" />
                    <div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-brand-teal transition-colors">{client.name}</h4>
                      <div className="text-xs text-slate-500 mt-0.5">{client.address}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Schedule</span>
                    <span className="font-medium text-slate-700">3x / week</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5"><Activity className="w-4 h-4" /> Risk Level</span>
                    <Badge variant={client.riskLevel === "High" ? "error" : client.riskLevel === "Medium" ? "warning" : "success"}>
                      {client.riskLevel}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Since</span>
                    <span className="font-medium text-slate-700">Jan 2026</span>
                  </div>
                </div>
              </div>
              <Link href={`/clients/${client.id}`} className="block w-full text-center py-3 bg-slate-50 hover:bg-brand-teal text-brand-teal hover:text-white font-medium text-sm transition-colors border-t border-slate-100 group-hover:border-transparent flex items-center justify-center gap-2">
                View Client Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 flex flex-col items-center justify-center text-center border-dashed border-2">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No Clients Assigned</h3>
          <p className="text-slate-500 max-w-md">
            This caregiver does not currently have any active client assignments. They are ready for scheduling.
          </p>
          <button className="mt-6 bg-brand-teal text-white px-6 py-2.5 rounded-xl font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-md transition-all active:scale-95">
            Find Matching Clients
          </button>
        </Card>
      )}

      {/* Visit History Summary */}
      <Card className="p-6 mt-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Visit History Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-sm font-medium text-slate-500 mb-1">Total Visits Completed</div>
            <div className="text-3xl font-bold text-slate-800">142</div>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="text-sm font-medium text-emerald-700 mb-1">On-Time Arrival Rate</div>
            <div className="text-3xl font-bold text-emerald-600">98%</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-sm font-medium text-slate-500 mb-1">Missed/Cancelled</div>
            <div className="text-3xl font-bold text-slate-800">3</div>
            <div className="text-xs text-slate-500 mt-1">In the last 90 days</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
