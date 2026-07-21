"use client";

import React from "react";
import { Mail, Phone, Briefcase, Camera, Edit2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";

export default function ProfilePage() {
  const { currentUser } = useAuth();

  return (
    <div className="w-full mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">My Profile</h2>
        <p className="text-sm text-text-secondary mt-1">Manage your personal information and preferences.</p>
      </div>

      <Card noPadding className="overflow-hidden">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-brand-teal/80 to-blue-600/80"></div>
        
        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="relative group">
              <div className="w-24 h-24 bg-white rounded-full p-1 shadow-sm">
                <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden relative">
                  {currentUser?.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-3xl">
                      {currentUser?.name?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center cursor-pointer transition-all">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] active:scale-95 transition-all text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-text-primary">{currentUser?.name || "Sarah Jenkins"}</h1>
              <p className="text-sm text-text-secondary font-medium">{currentUser?.role || "Agency Admin"}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary">Email Address</p>
                  <p className="text-sm font-medium text-text-primary">{currentUser?.email || "sarah.jenkins@example.com"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary">Phone Number</p>
                  <p className="text-sm font-medium text-text-primary">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary">Department</p>
                  <p className="text-sm font-medium text-text-primary">Administration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
