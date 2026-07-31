"use client";

import { useState, useRef } from "react";
import { User, Save, Upload, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function UserProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "sarah.jenkins@homeliocare.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Apt 4B",
    city: "Seattle",
    state: "WA",
    zip: "98101"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">Personal Profile</h3>
        <p className="text-xs text-text-secondary">Manage your personal information, avatar, and contact details.</p>
      </div>

      <form className="space-y-4 max-w-full">
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-brand-teal" />
            </div>
            <h4 className="font-semibold text-slate-800">Basic Information</h4>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex flex-col items-center space-y-3 shrink-0">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
                <User className="w-10 h-10 text-slate-400" />
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-brand-teal flex items-center gap-1.5 hover:text-teal-700 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Change Photo
              </button>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">First Name</label>
                <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Last Name</label>
                <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" name="email" value={profile.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input type="tel" name="phone" value={profile.phone} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-brand-teal" />
            </div>
            <h4 className="font-semibold text-slate-800">Address</h4>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Street Address</label>
              <input type="text" name="address" value={profile.address} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">City</label>
                <input type="text" name="city" value={profile.city} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">State</label>
                <input type="text" name="state" value={profile.state} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">ZIP Code</label>
                <input type="text" name="zip" value={profile.zip} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-colors" />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => {
              setProfile({
                firstName: "Sarah",
                lastName: "Jenkins",
                email: "sarah.jenkins@homeliocare.com",
                phone: "(555) 123-4567",
                address: "123 Main St, Apt 4B",
                city: "Seattle",
                state: "WA",
                zip: "98101"
              });
            }}
            className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
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
