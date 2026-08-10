"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, User, ChevronDown, CheckCircle2, ShieldAlert, Eye, X, ClipboardList, Home } from "lucide-react";
import clsx from "clsx";
import { Caregiver, Visit } from "@/lib/mockTrackerData";
import { Modal } from "@/components/ui/Modal";

interface CaregiverDeckProps {
  caregivers: Caregiver[];
  visits: Visit[]; // To show assigned visits on the route
  assignedCaregiverIds: Set<string>;
  selectedCaregiverId: string | null;
  onSelectCaregiver: (id: string | null) => void;
  onHoverCaregiver?: (id: string | null) => void;
  onDragCaregiver?: (id: string | null) => void;
  onAssign?: (caregiverId: string, visitId: string) => void;
}

export function CaregiverDeck({
  caregivers,
  visits,
  assignedCaregiverIds,
  selectedCaregiverId,
  onSelectCaregiver,
  onHoverCaregiver,
  onDragCaregiver,
  onAssign
}: CaregiverDeckProps) {
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [hiddenCaregiverIds, setHiddenCaregiverIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewingCaregiverId, setViewingCaregiverId] = useState<string | null>(null);

  // We only show caregivers who are active or have a route for the deck
  // Or maybe we show all of them but sorted by Active first?
  const deckCaregivers = caregivers.filter(c => (c.status === "Active" || assignedCaregiverIds.has(c.id)) && !hiddenCaregiverIds.has(c.id));

  return (
    <div className="h-72 w-full bg-slate-50 border-t border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col shrink-0 relative z-30">
      <div className="flex items-center justify-between px-6 py-2.5 bg-white border-b border-slate-200 shrink-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10">
        <h2 className="text-[13px] font-semibold text-slate-800 tracking-wider flex items-center gap-2">
          ACTIVE CAREGIVER ROUTE CARDS (DECK VIEW)
        </h2>
      </div>
      <div className="flex-1 overflow-x-auto p-4 flex gap-4 [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar-thumb]:rounded-full items-start">
        <AnimatePresence>
          {deckCaregivers.map((cg, i) => {
            const isSelected = selectedCaregiverId === cg.id;
            const assignedVisits = visits.filter(v => v.caregiverId === cg.id);
            const isDragOver = dragOverId === cg.id;

            // Mock capacity calculation based on visits count
            const maxVisits = 6;
            const capacityPercent = Math.min(100, Math.round((assignedVisits.length / maxVisits) * 100));
            const estimatedHours = assignedVisits.length * 1.5;

            // Random sub-id for the schedule
            const scheduleId = "MA" + (Math.floor(Math.random() * 90) + 10) + "-" + (Math.floor(Math.random() * 90000) + 10000);

            const totalTasks = assignedVisits.length * 2 + 1; // mock metric

            return (
              <motion.div
                key={cg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => onSelectCaregiver(isSelected ? null : cg.id)}
                onMouseEnter={() => onHoverCaregiver?.(cg.id)}
                onMouseLeave={() => onHoverCaregiver?.(null)}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                }}
                onDragEnter={() => setDragOverId(cg.id)}
                onDragLeave={() => {
                  if (dragOverId === cg.id) setDragOverId(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverId(null);
                  const visitId = e.dataTransfer.getData("visitId");
                  if (visitId && onAssign) {
                    onAssign(cg.id, visitId);
                  }
                }}
                className={clsx(
                  "relative bg-white rounded-lg border flex-shrink-0 w-[300px] h-full max-h-[260px] flex flex-col overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer group",
                  isSelected ? "border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,1)]" : "border-slate-200",
                  isDragOver && "border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.5)] bg-blue-50/20"
                )}
              >
                {/* Header */}
                <div className="pt-4 px-4 pb-2 flex items-start justify-between shrink-0 bg-white">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2.5 h-2.5 mt-1 rounded-full bg-purple-600 shadow-[0_0_6px_rgba(147,51,234,0.6)] shrink-0"></span>
                    <div>
                      <div className="text-[13px] font-semibold text-slate-800 leading-tight">
                        {cg.currentRoute || "Schedule " + cg.id.slice(0, 3)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-medium">{scheduleId}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewingCaregiverId(cg.id);
                      }}
                      className="hover:text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors"
                      title="View full schedule"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHiddenCaregiverIds(prev => new Set(prev).add(cg.id));
                      }}
                      className="hover:text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                      title="Remove from deck"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Simplified Info */}
                <div className="px-4 py-3 flex flex-col gap-1 border-b border-slate-100 bg-white shrink-0">
                  <div className="text-[11px] font-semibold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-brand-teal" />
                    Next: {assignedVisits.length > 0 ? `${assignedVisits[0].patientName} (0.6 mi)` : "No upcoming visits"}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    Shift: 08:00 - 16:00 ({capacityPercent}% Cap)
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mt-1">
                    <div className="h-full rounded-full transition-all duration-500 bg-brand-teal" style={{ width: `${capacityPercent}%` }} />
                  </div>
                </div>

                {/* Visit Sequence List */}
                <div className="flex-1 px-4 py-2 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 bg-white">
                  <div className="space-y-1">
                    {assignedVisits.map((v, idx) => (
                      <div key={v.id} className="relative flex items-center gap-2 py-1">
                        <div className="text-[10px] font-medium text-slate-400 shrink-0 w-8">
                          {v.time.split(' ')[0]}
                        </div>
                        <div className="w-[14px] h-[14px] rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                        </div>
                        <div className="text-[11px] font-medium text-slate-700 truncate">
                          {v.patientName}
                        </div>
                      </div>
                    ))}
                    {assignedVisits.length === 0 && (
                      <div className="text-[11px] font-medium text-slate-400 mt-2 italic text-center">
                        Drag unassigned visits here
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-top-4 z-50 flex items-center gap-2 pointer-events-none">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Details Modal */}
      {viewingCaregiverId && (
        <Modal
          isOpen={true}
          onClose={() => setViewingCaregiverId(null)}
          title={`Schedule Details: ${caregivers.find(c => c.id === viewingCaregiverId)?.name || 'Caregiver'}`}
          description={`Total Assigned Visits: ${visits.filter(v => v.caregiverId === viewingCaregiverId).length}`}
          maxWidth="md"
        >
          <div className="space-y-3 mt-2">
            {visits.filter(v => v.caregiverId === viewingCaregiverId).length > 0 ? (
              visits.filter(v => v.caregiverId === viewingCaregiverId).map((v) => (
                <div key={v.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-slate-800 text-sm">{v.patientName}</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{v.status}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">{v.address}</div>
                  <div className="flex items-center gap-4 text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {v.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Visit #{v.id.replace('v-', '4570')}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-slate-500 text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                No visits scheduled for this caregiver today.
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
