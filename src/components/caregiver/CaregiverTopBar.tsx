"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  Bell,
  Wifi,
  WifiOff,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";

interface CaregiverTopBarProps {
  onMenuClick: () => void;
  isClockedIn?: boolean;
  activeClientName?: string;
  isOffline?: boolean;
  onToggleOffline?: () => void;
  pendingSyncCount?: number;
}

export function CaregiverTopBar({
  onMenuClick,
  isClockedIn = false,
  activeClientName = "Eleanor Vance",
  isOffline = false,
  onToggleOffline,
  pendingSyncCount = 0,
}: CaregiverTopBarProps) {
  const { currentUser } = useAuth();
  const [timerSeconds, setTimerSeconds] = useState(2535); // ~42 mins
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isClockedIn) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn]);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200/80 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 min-[1120px]:hidden transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Active Clock-in Status Pill */}
        {isClockedIn ? (
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-teal"></span>
            </span>
            <span>Clocked In: <span className="font-bold">{activeClientName}</span></span>
            <span className="hidden sm:inline text-emerald-300">|</span>
            <span className="font-mono bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded text-[11px]">
              {formatTimer(timerSeconds)}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Next Visit: <span className="font-semibold">{activeClientName}</span> @ 08:30 AM</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Offline Toggle & Sync Badge */}
        <button
          onClick={onToggleOffline}
          title={isOffline ? "Currently in Offline Mode (Click to connect)" : "Online (Click to simulate rural offline)"}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${isOffline
              ? "bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100"
              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
        >
          {isOffline ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>Offline</span>
              {pendingSyncCount > 0 && (
                <span className="ml-1 bg-rose-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {pendingSyncCount}
                </span>
              )}
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Online Sync Active</span>
            </>
          )}
        </button>

        {/* Notifications Center */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-4"
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <h4 className="font-semibold text-sm text-gray-900">Caregiver Alerts</h4>
                  <span className="text-xs bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-full font-medium">2 New</span>
                </div>
                <div className="space-y-3">
                  <Link
                    href="/caregiver/training"
                    onClick={() => setShowNotifications(false)}
                    className="flex items-start gap-3 p-2 rounded-xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-100 text-xs transition-colors cursor-pointer block"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900">CPR Certification Expiring</p>
                      <p className="text-amber-700 mt-0.5">Expires in 12 days. Complete your LMS renewal course.</p>
                    </div>
                  </Link>
                  <Link
                    href="/caregiver/schedule"
                    onClick={() => setShowNotifications(false)}
                    className="flex items-start gap-3 p-2 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-100 text-xs transition-colors cursor-pointer block"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900">Open Shift Available</p>
                      <p className="text-blue-700 mt-0.5">Arthur Pendelton tomorrow morning — +$2/hr premium.</p>
                    </div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Caregiver Mini Badge */}
        {/* <Link
          href="/caregiver/profile"
          className="flex items-center gap-2 pl-2 border-l border-gray-200 hover:opacity-80 transition-opacity"
        >
          <Avatar
            src={currentUser?.avatarUrl}
            name={currentUser?.name || "Maria Santos"}
            size="sm"
          />
          <span className="hidden md:inline text-xs font-semibold text-gray-800">
            {currentUser?.name?.split(",")[0] || "Maria Santos"}
          </span>
        </Link> */}
      </div>
    </header>
  );
}
