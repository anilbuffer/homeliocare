"use client";

import React, { useState } from "react";
import { WifiOff, RefreshCw, AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OfflineSyncBannerProps {
  isOffline: boolean;
  pendingSyncCount: number;
  onSyncCompleted?: () => void;
}

export function OfflineSyncBanner({
  isOffline,
  pendingSyncCount,
  onSyncCompleted,
}: OfflineSyncBannerProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [syncedSuccess, setSyncedSuccess] = useState(false);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      // Randomly show conflict resolution demo or clean success
      if (pendingSyncCount > 2) {
        setShowConflictModal(true);
      } else {
        setSyncedSuccess(true);
        if (onSyncCompleted) onSyncCompleted();
        setTimeout(() => setSyncedSuccess(false), 3000);
      }
    }, 1200);
  };

  if (!isOffline && pendingSyncCount === 0 && !syncedSuccess && !showConflictModal) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {(isOffline || pendingSyncCount > 0 || syncedSuccess) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`px-4 py-2.5 text-xs font-semibold border-b flex items-center justify-between transition-colors ${syncedSuccess
                ? "bg-emerald-600 text-white border-emerald-700"
                : isOffline
                  ? "bg-amber-500 text-slate-900 border-amber-600"
                  : "bg-blue-600 text-white border-blue-700"
              }`}
          >
            <div className="flex items-center gap-2 max-w-4xl mx-auto flex-1">
              {syncedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>All offline visit data, EVV logs, and notes synced successfully to Homelio Core!</span>
                </>
              ) : isOffline ? (
                <>
                  <WifiOff className="w-4 h-4 text-slate-900 shrink-0 animate-pulse" />
                  <span>
                    Working offline — {pendingSyncCount} item{pendingSyncCount === 1 ? "" : "s"} saved locally. Will auto-sync when Wi-Fi/Cellular reconnects.
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-white shrink-0" />
                  <span>
                    Connection restored! {pendingSyncCount} pending change{pendingSyncCount === 1 ? "" : "s"} ready to upload.
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {pendingSyncCount > 0 && !syncedSuccess && (
                <button
                  onClick={handleManualSync}
                  disabled={isSyncing}
                  className="flex items-center gap-1.5 bg-slate-900/20 hover:bg-slate-900/40 text-current px-3 py-1 rounded-lg border border-current/20 transition-all font-medium active:scale-95"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                  <span>{isSyncing ? "Syncing..." : "Sync Now"}</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sync Conflict Resolution Prompt Modal */}
      <AnimatePresence>
        {showConflictModal && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-gray-900">Sync Conflict Detected</h3>
              <p className="text-xs text-gray-600 mt-1">
                Office Dispatch modified Eleanor Vance&apos;s scheduled shift duration while you were offline.
              </p>

              <div className="my-4 p-3 rounded-xl bg-gray-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-500 font-medium">Your Local Recorded Time:</span>
                  <span className="font-semibold text-gray-900">08:30 AM - 12:30 PM (4.0 hrs)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Office Updated Schedule:</span>
                  <span className="font-semibold text-brand-teal">08:30 AM - 01:00 PM (4.5 hrs)</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowConflictModal(false);
                    setSyncedSuccess(true);
                    if (onSyncCompleted) onSyncCompleted();
                    setTimeout(() => setSyncedSuccess(false), 3000);
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Keep My Local Record
                </button>
                <button
                  onClick={() => {
                    setShowConflictModal(false);
                    setSyncedSuccess(true);
                    if (onSyncCompleted) onSyncCompleted();
                    setTimeout(() => setSyncedSuccess(false), 3000);
                  }}
                  className="px-4 py-2 bg-brand-teal hover:bg-brand-teal/90 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  Accept Office Update (4.5 hrs)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
