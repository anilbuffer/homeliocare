"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Navigation,
  PhoneCall,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Play,
  Square,
  CheckCircle2,
  Phone,
  RefreshCw,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Visit } from "@/lib/caregiver/caregiverPortalData";
import { Avatar } from "@/components/ui/Avatar";

interface ClockInOutCardProps {
  visit: Visit;
  isClockedIn: boolean;
  onClockIn: (method: "gps" | "ivr" | "fvv", reason?: string) => void;
  onClockOutClick: () => void;
}

export function ClockInOutCard({
  visit,
  isClockedIn,
  onClockIn,
  onClockOutClick,
}: ClockInOutCardProps) {
  const [geoStatus, setGeoStatus] = useState<"idle" | "checking" | "in_radius" | "out_of_radius" | "denied">("in_radius");
  const [distanceMiles, setDistanceMiles] = useState(visit.distanceFromClientMiles || 0.05);
  const [geofenceRadiusMeters, setGeofenceRadiusMeters] = useState(150); // Configurable tolerance
  const [showIVRModal, setShowIVRModal] = useState(false);
  const [showFVVForm, setShowFVVForm] = useState(false);
  const [fvvReason, setFvvReason] = useState("Device GPS unavailable on laptop");
  const [fvvNotes, setFvvNotes] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Simulate checking geolocation
  const handleCheckLocation = () => {
    setGeoStatus("checking");
    setTimeout(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            // Laptops use Wi-Fi positioning; demo inside/outside radius toggle
            setGeoStatus("in_radius");
            setDistanceMiles(0.04);
          },
          (err) => {
            // Fallback for laptop browser permission deny/unavailable
            setGeoStatus("out_of_radius");
            setDistanceMiles(0.4);
          },
          { enableHighAccuracy: false, timeout: 4000 }
        );
      } else {
        setGeoStatus("out_of_radius");
        setDistanceMiles(0.4);
      }
    }, 800);
  };

  const handleSimulateOutOfRadius = () => {
    setGeoStatus("out_of_radius");
    setDistanceMiles(0.4);
  };

  const handleSimulateInRadius = () => {
    setGeoStatus("in_radius");
    setDistanceMiles(0.04);
  };

  const handleFVVSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowFVVForm(false);
      onClockIn("fvv", `${fvvReason}: ${fvvNotes || "No extra note"}`);
    }, 700);
  };

  const handleIVRComplete = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowIVRModal(false);
      onClockIn("ivr", "Telephony IVR call verification from client landline");
    }, 900);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:border-brand-teal/30 transition-all duration-300 p-6 relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${isClockedIn ? "bg-brand-teal animate-pulse" : "bg-blue-600"}`} />

      {/* Card Header & Client Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar
              src={visit.clientPhoto}
              name={visit.clientName}
              size="xl"
              className="rounded-2xl border-2 border-white shadow-md ring-2 ring-gray-100"
            />
            {isClockedIn && (
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-teal text-white rounded-full flex items-center justify-center text-[10px] shadow-xs">
                ✓
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{visit.clientName}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-700">
                MRN-88491
              </span>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0" />
              <span>{visit.address}, {visit.cityStateZip}</span>
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
              <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <a href={`tel:${visit.phone}`} className="hover:underline font-medium text-gray-700">{visit.phone}</a>
            </p>
          </div>
        </div>

        {/* Time Window & Status Badge */}
        <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-2 bg-gray-50/80 p-3 sm:p-0 rounded-xl sm:bg-transparent">
          <div>
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Scheduled Window</div>
            <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5 sm:justify-end mt-0.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{visit.scheduledStartTime} - {visit.scheduledEndTime}</span>
            </div>
          </div>

          <div>
            {isClockedIn ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping" />
                In Progress (EVV Active)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
                Scheduled Today
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Geofence Tolerances & Geolocation Status Body */}
      <div className="py-5">
        {!isClockedIn ? (
          <div>
            {/* Geofence Status Banner */}
            <div className="mb-4">
              {geoStatus === "in_radius" && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900">
                  <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Location Verified ({distanceMiles.toFixed(2)} mi from home)</p>
                    <p className="text-emerald-700 mt-0.5">
                      Within acceptable {geofenceRadiusMeters}m geofence radius. Browser Wi-Fi/GPS coordinates match client address.
                    </p>
                  </div>
                </div>
              )}

              {geoStatus === "out_of_radius" && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm text-amber-950">
                        You&apos;re {distanceMiles.toFixed(1)} mi from {visit.clientName.split(" ")[0]}&apos;s home
                      </p>
                      <p className="text-amber-800 mt-0.5">
                        Move closer to client home to enable GPS clock-in, or use compliant phone/FVV fallback options below.
                      </p>
                    </div>
                  </div>

                  {/* Embedded SVG Map Snippet */}
                  <div className="h-32 w-full bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border border-amber-300/60 shadow-inner">
                    {/* Simulated Map Graphic */}
                    <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-40"></div>
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50%" cy="50%" r="38" fill="rgba(14, 163, 131, 0.15)" stroke="#0EA383" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="50%" y1="50%" x2="72%" y2="30%" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />
                    </svg>

                    {/* Pins */}
                    <div className="absolute flex flex-col items-center z-10">
                      <div className="w-7 h-7 rounded-full bg-brand-teal text-white flex items-center justify-center shadow-lg font-bold text-xs">
                        🏠
                      </div>
                      <span className="text-[10px] text-white font-semibold bg-slate-800/90 px-1.5 py-0.5 rounded mt-0.5">
                        Client Home
                      </span>
                    </div>

                    <div className="absolute top-[25%] right-[25%] flex flex-col items-center z-10">
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg font-bold text-[10px] animate-bounce">
                        📍
                      </div>
                      <span className="text-[10px] text-amber-200 font-semibold bg-slate-900/90 px-1.5 py-0.5 rounded mt-0.5">
                        Your Location ({distanceMiles} mi)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Configurable Radius & Demo Controls Bar */}
            <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-xl mb-4 border border-gray-100">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-gray-400" />
                <span>Geofence Tolerance:</span>
                <select
                  value={geofenceRadiusMeters}
                  onChange={(e) => setGeofenceRadiusMeters(Number(e.target.value))}
                  className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs font-semibold text-gray-700"
                >
                  <option value={100}>100m (Strict)</option>
                  <option value={150}>150m (Desktop Wi-Fi Standard)</option>
                  <option value={300}>300m (Loose / Rural)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={geoStatus === "in_radius" ? handleSimulateOutOfRadius : handleSimulateInRadius}
                  className="text-[11px] font-medium text-brand-teal hover:underline"
                >
                  {geoStatus === "in_radius" ? "Simulate Out of Radius" : "Simulate In Radius"}
                </button>
              </div>
            </div>

            {/* Main Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => onClockIn("gps")}
                disabled={geoStatus === "out_of_radius"}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all ${geoStatus === "out_of_radius"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-brand-teal hover:bg-brand-teal/90 shadow-brand-teal/20 hover:scale-[1.01] active:scale-[0.99]"
                  }`}
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Clock In Now (GPS Verified)</span>
              </button>

              {/* Fallback Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowIVRModal(true)}
                  className="flex-1 sm:flex-initial px-3.5 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                  <span>Clock In by Phone</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowFVVForm(true)}
                  className="flex-1 sm:flex-initial px-3.5 py-3.5 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Manual FVV Backup</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Clocked In Active State */
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Visit Active & EVV Verified</div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">
                    Clocked in via <span className="uppercase">{visit.clockInMethod || "GPS"}</span> @ {visit.clockInTime || "08:31 AM"}
                  </div>
                </div>
              </div>

              {/* Primary Clock Out Button */}
              <button
                type="button"
                onClick={onClockOutClick}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Clock Out & Complete Visit</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Telephony / IVR Fallback Modal */}
      <AnimatePresence>
        {showIVRModal && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Clock In by Telephony / IVR</h3>
              <p className="text-xs text-gray-600 mt-1">
                State-compliant IVR phone system fallback. Dial from the client&apos;s registered landline number:
              </p>

              <div className="my-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <div className="text-xs text-blue-700 font-medium uppercase">Toll-Free EVV Clock-in Line</div>
                <div className="text-xl font-mono font-bold text-blue-900 mt-1">1-800-555-EVV1 (3881)</div>
                <div className="text-xs text-blue-700 mt-2">
                  Caregiver ID Pin: <span className="font-mono font-bold text-gray-900">8842</span> • Client Pin: <span className="font-mono font-bold text-gray-900">101</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowIVRModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleIVRComplete}
                  disabled={isVerifying}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  {isVerifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Confirm IVR Call Received"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manual Fixed Visit Verification (FVV) Form Modal */}
      <AnimatePresence>
        {showFVVForm && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Fixed Visit Verification (FVV) Entry</h3>
              <p className="text-xs text-gray-600 mt-1">
                State-compliant manual backup log. Requires an explicit reason code for EVV aggregator submission.
              </p>

              <form onSubmit={handleFVVSubmit} className="my-4 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Primary Reason for Non-GPS Entry <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={fvvReason}
                    onChange={(e) => setFvvReason(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    <option value="Device GPS unavailable on laptop">Device GPS unavailable / Laptop Browser</option>
                    <option value="Cellular dead zone / No signal">Cellular dead zone at client residence</option>
                    <option value="Client Wi-Fi outage">Client Wi-Fi outage</option>
                    <option value="Emergency clock-in override">Emergency clock-in supervisor override</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Additional Explanation / Supervisor Note
                  </label>
                  <textarea
                    rows={2}
                    value={fvvNotes}
                    onChange={(e) => setFvvNotes(e.target.value)}
                    placeholder="Enter details..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-800 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
                  ⚠️ Note: Manual FVV entries are flagged for supervisor review before state aggregator submission.
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFVVForm(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-5 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    {isVerifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Log FVV Clock In"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
