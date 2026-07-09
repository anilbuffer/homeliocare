import React from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Client } from "@/lib/clients/mockData";
import { Calendar, ShieldAlert, MessageSquare, Edit3, MapPin } from "lucide-react";

interface ClientHeaderProps {
  client: Client;
}

export function ClientHeader({ client }: ClientHeaderProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative">
          <Avatar src={client.avatarUrl} alt={client.name} fallback={client.name.substring(0, 2)} size="xl" className="w-24 h-24 text-2xl" />
          <div className="absolute -bottom-2 -right-2">
             <Badge variant={
                client.status === "Active" ? "success" :
                client.status === "Hospitalized" ? "warning" :
                client.status === "Discharged" ? "neutral" : "error"
              } className="border-2 border-white shadow-sm">{client.status}</Badge>
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">{client.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-3">
            <span className="font-medium text-slate-700">{client.age} years old</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {client.address}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
             <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Diagnosis</span>
             <Badge variant="brand" className="bg-brand-teal/10 text-brand-teal border-brand-teal/20">{client.primaryDiagnosis}</Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start md:items-end gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">Risk Level</span>
          <Badge variant={
              client.riskLevel === "Low" ? "success" :
              client.riskLevel === "Medium" ? "warning" : "error"
            } className="text-base px-3 py-1">
            {client.riskLevel}
          </Badge>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <button className="inline-flex items-center gap-2 bg-brand-teal hover:bg-emerald-600 active:scale-95 transition-all text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
            <Calendar className="w-4 h-4" />
            Schedule Visit
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
            <ShieldAlert className="w-4 h-4 text-orange-500" />
            New Incident
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            Message Family
          </button>
          <button className="p-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 rounded-xl shadow-sm" title="Edit Profile">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
