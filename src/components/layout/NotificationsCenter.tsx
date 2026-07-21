"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, Clock, ShieldAlert, Users, CalendarCheck, X } from "lucide-react";

export function NotificationsCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Late Clock-In Alert",
      description: "Sarah J. is 10 mins late for shift with Eleanor Vance.",
      time: "2 mins ago",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-100"
    },
    {
      id: 2,
      type: "warning",
      title: "Auth Expiry Approaching",
      description: "Auth for Robert Chen expires in 3 days. Action required.",
      time: "1 hour ago",
      icon: ShieldAlert,
      color: "text-red-500",
      bg: "bg-red-100"
    },
    {
      id: 3,
      type: "info",
      title: "Open Shift Available",
      description: "New urgent shift tomorrow 8AM-4PM. 3 caregivers notified via SMS.",
      time: "2 hours ago",
      icon: CalendarCheck,
      color: "text-blue-500",
      bg: "bg-blue-100"
    },
    {
      id: 4,
      type: "update",
      title: "Family Update Shared",
      description: "Linda Chen (Daughter) requested a schedule change for Friday.",
      time: "3 hours ago",
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-100"
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-white border border-border-subtle text-slate-500 hover:bg-slate-50 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-accent-red rounded-full border-2 border-white animate-pulse" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="font-semibold text-slate-900">Notifications</h3>
            <span className="text-xs font-medium text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full">
              4 New
            </span>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-100">
            {notifications.map(notif => {
              const Icon = notif.icon;
              return (
                <div key={notif.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 group">
                  <div className={`w-10 h-10 rounded-full ${notif.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${notif.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="text-sm font-medium text-slate-900 group-hover:text-brand-teal transition-colors">{notif.title}</h4>
                      <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{notif.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{notif.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t border-slate-100 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
            <span className="text-sm font-medium text-brand-teal">View All Notifications</span>
          </div>
        </div>
      )}
    </div>
  );
}
