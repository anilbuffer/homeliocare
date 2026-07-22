import React from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Caregiver } from "@/lib/caregivers/mockData";
import { Calendar, MessageSquare, Edit3, Phone, Mail, Star } from "lucide-react";
import { cn } from "@/components/ui/Card";

interface CaregiverHeaderProps {
  caregiver: Caregiver;
}

export function CaregiverHeader({ caregiver }: CaregiverHeaderProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200 mb-4 flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative">
          <Avatar src={caregiver.avatarUrl} alt={caregiver.name} fallback={caregiver.name.substring(0, 2)} size="xl" className="w-24 h-24 text-2xl" />
          <div className="absolute -bottom-2 -right-2">
            <Badge variant={
              caregiver.status === "Active" ? "success" :
                caregiver.status === "On Leave" ? "warning" :
                  caregiver.status === "Inactive" ? "error" : "default"
            } className={cn(
              "border-2 border-white shadow-md font-bold text-white px-3 py-1",
              caregiver.status === "Active" && "bg-emerald-500",
              caregiver.status === "Onboarding" && "bg-purple-500",
              caregiver.status === "On Leave" && "bg-amber-500",
              caregiver.status === "Inactive" && "bg-rose-500"
            )}>{caregiver.status}</Badge>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">{caregiver.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-3">
            <span className="font-medium text-slate-700">{caregiver.role}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1 font-medium">
              <Star className={cn("w-4 h-4", caregiver.rating > 0 ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")} />
              {caregiver.rating > 0 ? `${caregiver.rating.toFixed(1)} Rating` : "No Ratings"}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>{caregiver.yearsWithAgency} years with agency</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-sm text-slate-600">
              <Phone className="w-4 h-4 text-slate-400" />
              {caregiver.phone}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-600">
              <Mail className="w-4 h-4 text-slate-400" />
              {caregiver.email}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start md:items-end gap-4 mt-4 md:mt-0">
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 bg-brand-teal hover:bg-emerald-600 active:scale-95 transition-all text-white px-4 py-2 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <Calendar className="w-4 h-4" />
            Schedule Shift
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 px-4 py-2 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            Send Message
          </button>
          <button className="p-2 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-700 rounded-xl shadow-[0_6px_32px_rgba(0,0,0,0.06)]" title="Edit Profile">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
