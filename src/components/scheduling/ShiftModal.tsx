import React from "react";
import { X, MapPin, Clock, Calendar, Shield, PhoneOff, UserPlus, CheckCircle2 } from "lucide-react";
import type { Shift, Caregiver } from "@/lib/scheduling/mockData";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface ShiftModalProps {
  shift: Shift | null;
  isOpen: boolean;
  onClose: () => void;
  suggestedCaregivers: Caregiver[];
  onAssignCaregiver: (shiftId: string, caregiverId: string) => void;
  onCallOff: (shiftId: string) => void;
}

export function ShiftModal({
  shift,
  isOpen,
  onClose,
  suggestedCaregivers,
  onAssignCaregiver,
  onCallOff,
}: ShiftModalProps) {
  if (!shift) return null;

  const isUnfilled = shift.status === "Unfilled";
  
  const formatTime = (iso: string) => {
    try {
      return format(parseISO(iso), "h:mm a");
    } catch {
      return "";
    }
  };

  const formatDate = (iso: string) => {
    try {
      return format(parseISO(iso), "EEEE, MMM d, yyyy");
    } catch {
      return "";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white/90 backdrop-blur-xl shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-50 flex flex-col border-l border-white/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Shift Details</h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Status Banner */}
              <div className={clsx(
                "p-4 rounded-xl border flex items-center justify-between",
                isUnfilled ? "bg-red-50 border-red-200 text-red-700" : "bg-brand-teal/5 border-brand-teal/20 text-brand-teal"
              )}>
                <div className="font-semibold text-sm">
                  Status: {shift.status}
                </div>
                <div className="text-sm font-mono opacity-80">{shift.shiftNumber}</div>
              </div>

              {/* Client Info */}
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Client</h3>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="font-semibold text-slate-800 text-lg mb-2">{shift.clientName}</div>
                  <div className="flex items-start gap-2 text-slate-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
                    <span>{shift.clientAddress}</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mt-3 hover:underline cursor-pointer">
                    View Care Plan &rarr;
                  </div>
                </div>
              </section>

              {/* Schedule Info */}
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Schedule</h3>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <span className="font-medium">{formatDate(shift.startTime)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <span className="font-medium">
                      {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                    </span>
                  </div>
                </div>
              </section>

              {/* Requirements */}
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  {shift.requiredSkills.map(skill => (
                    <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                      <Shield className="w-3.5 h-3.5" />
                      {skill}
                    </div>
                  ))}
                </div>
              </section>

              {/* Assignment / Suggestions */}
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  {isUnfilled ? "Smart Match Suggestions" : "Assigned Caregiver"}
                </h3>
                
                {isUnfilled ? (
                  <div className="space-y-3">
                    {suggestedCaregivers.map((cg, idx) => (
                      <div key={cg.id} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between hover:border-brand-teal/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                            {cg.name.substring(0,2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-slate-800 text-sm flex items-center gap-2">
                              {cg.name}
                              {idx === 0 && (
                                <span className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Best Match</span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {cg.distanceMiles} mi • {cg.rating} ★
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            onAssignCaregiver(shift.id, cg.id);
                            onClose();
                          }}
                          className="bg-brand-teal/10 hover:bg-brand-teal text-brand-teal hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center font-bold text-brand-teal text-lg">
                        {shift.assignedCaregiverName?.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{shift.assignedCaregiverName}</div>
                        <div className="text-xs text-emerald-600 flex items-center gap-1 mt-0.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Confirmed
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
              {!isUnfilled && (
                <>
                  <button
                    onClick={() => {
                      onCallOff(shift.id);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
                  >
                    <PhoneOff className="w-4 h-4" />
                    Mark Call-Off
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">
                    <UserPlus className="w-4 h-4" />
                    Reassign
                  </button>
                </>
              )}
              {isUnfilled && (
                <button className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">
                  Edit Shift
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
