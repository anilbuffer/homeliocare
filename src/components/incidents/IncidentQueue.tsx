"use client";

import React, { useState } from "react";
import { Search, Filter, Lock, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Incident } from "@/types/incidents";
import { cn } from "@/components/ui/Card";
import { format } from "date-fns";

interface IncidentQueueProps {
  incidents: Incident[];
  onRowClick: (incident: Incident) => void;
  selectedCategory: string | null;
}

export function IncidentQueue({ incidents, onRowClick, selectedCategory }: IncidentQueueProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inc.peopleInvolved.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          inc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? inc.type === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="flex flex-col h-full" noPadding>
      <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4">
        <h2 className="font-semibold text-slate-800">Incident Queue</h2>
        
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, name, or type..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
        {filteredIncidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-500 text-sm">
            <ShieldAlert className="w-8 h-8 text-slate-300 mb-2" />
            <p>No open incidents match your filters.</p>
            <p className="text-xs mt-1">Great work!</p>
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const isHighSeverity = incident.severity === "High" || incident.severity === "Critical";
            const needsSupervisorAlert = incident.supervisorAlert;
            
            return (
              <div 
                key={incident.id}
                onClick={() => onRowClick(incident)}
                className={cn(
                  "group flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:border-brand-teal/40 transition-all cursor-pointer relative overflow-hidden",
                  (isHighSeverity || needsSupervisorAlert) && "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-accent-red before:shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                )}
              >
                {/* ID & Type */}
                <div className="w-[140px] shrink-0">
                  <div className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
                    {incident.id}
                    {incident.isRestricted && (
                      <div className="group/lock relative">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-max px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/lock:opacity-100 pointer-events-none transition-opacity">
                          Restricted: Visible to Compliance/Supervisor only
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 truncate">
                    {incident.type}
                  </div>
                </div>

                {/* People */}
                <div className="flex-1 min-w-0 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {incident.peopleInvolved.slice(0, 3).map((person, i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 overflow-hidden relative z-10"
                        title={`${person.role}: ${person.name}`}
                      >
                        {person.avatar ? (
                          <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          person.name.charAt(0)
                        )}
                      </div>
                    ))}
                    {incident.peopleInvolved.length > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 z-0">
                        +{incident.peopleInvolved.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 truncate hidden sm:block">
                    {incident.peopleInvolved.map(p => p.name).join(", ")}
                  </div>
                </div>

                {/* Date */}
                <div className="w-[120px] shrink-0 text-xs text-slate-500 hidden md:block">
                  {format(new Date(incident.reportedDate), "MMM d, h:mm a")}
                </div>

                {/* Status Badge */}
                <div className="w-[130px] shrink-0 flex justify-end">
                  <Badge variant={
                    incident.status === "Closed" ? "success" : 
                    incident.status === "Corrective Action" ? "warning" :
                    incident.status === "Reported" ? "error" : "default"
                  }>
                    {incident.status}
                  </Badge>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
