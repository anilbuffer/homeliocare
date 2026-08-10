"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CaregiverDeck } from "@/components/tracker/CaregiverDeck";
import { LiveMap } from "@/components/tracker/LiveMap";
import { VisitQueue } from "@/components/tracker/VisitQueue";
import { RouteComparisonModal } from "@/components/tracker/RouteComparisonModal";
import { ProposedPathModal } from "@/components/tracker/ProposedPathModal";
import { VisitDetailsDrawer } from "@/components/dispatch/VisitDetailsDrawer";
import { EditVisitModal } from "@/components/dispatch/EditVisitModal";
import { ContactCaregiverModal } from "@/components/dispatch/ContactCaregiverModal";
import { mockCaregivers, mockVisits, type Visit } from "@/lib/mockTrackerData";
import { AlertTriangle, RefreshCw, Navigation, CheckCircle2, Search, Calendar, Bell, ChevronDown, SlidersHorizontal, Users, Eye, Save, X, Loader2 } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";

export default function SchedulerTrackerPage() {
  const [caregivers, setCaregivers] = useState(mockCaregivers);
  const [visits, setVisits] = useState(mockVisits);
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [globalSearchTerm, setGlobalSearchTerm] = useState("");

  const [hoveredCaregiverId, setHoveredCaregiverId] = useState<string | null>(null);
  const [draggedCaregiverId, setDraggedCaregiverId] = useState<string | null>(null);
  const [dragOverVisitId, setDragOverVisitId] = useState<string | null>(null);
  const [showAICard, setShowAICard] = useState(true);
  const [showDelayBanner, setShowDelayBanner] = useState(true);
  const [comparingVisitId, setComparingVisitId] = useState<string | null>(null);
  const [showProposedPathModal, setShowProposedPathModal] = useState(false);

  const [isEditingVisit, setIsEditingVisit] = useState(false);
  const [isContactingCaregiver, setIsContactingCaregiver] = useState(false);

  const activeCaregiverId = draggedCaregiverId || hoveredCaregiverId;
  const activeCaregiver = caregivers.find((c) => c.id === activeCaregiverId);

  const assignedCaregiverIds = new Set(
    visits
      .filter((v) => v.status === "Assigned" || v.status === "In Progress")
      .map((v) => v.caregiverId)
      .filter(Boolean) as string[]
  );

  const handleSelectCaregiver = (id: string | null) => {
    setSelectedCaregiverId(id);
    if (id) {
      const visit = visits.find((v) => v.id === selectedVisitId);
      if (visit && visit.caregiverId !== id) {
        setSelectedVisitId(null);
      }
    }
  };

  const handleSelectVisit = (id: string | null) => {
    setSelectedVisitId(id);
    if (id) {
      const visit = visits.find((v) => v.id === id);
      if (visit && visit.caregiverId) {
        setSelectedCaregiverId(visit.caregiverId);
      }
    }
  };

  const handleAssignCaregiver = (caregiverId: string, visitId: string) => {
    const caregiver = caregivers.find((c) => c.id === caregiverId);
    const visit = visits.find((v) => v.id === visitId);

    if (caregiver && visit) {
      setVisits((prev) =>
        prev.map((v) => (v.id === visitId ? { ...v, status: "Assigned", caregiverId } : v))
      );

      toast.success(
        `${caregiver.name} assigned to ${visit.patientName} — Visit #${visit.id.replace("v-", "4570")}`
      );
    }
  };

  const [isOptimizing, setIsOptimizing] = useState(false);
  const handleReOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      toast.success("Schedules re-optimized successfully!");
    }, 1500);
  };

  const handleSavePlan = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Plan saved successfully!");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] min-h-[700px] w-full overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans relative">

      {/* Top Bar - Tier 1 */}
      <div className="flex items-center justify-between px-6 py-3 bg-white shrink-0 z-20 border-b border-slate-200">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          TOP CONTROLS:
          <input
            type="date"
            defaultValue="2026-08-01"
            className="border border-slate-200 rounded-md px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none"
            onChange={(e) => {
              toast.info(`Date changed to ${e.target.value}`);
            }}
          />
          <span className="flex items-center gap-1"><Users className="w-4 h-4 text-slate-400" /> Staff ({caregivers.filter(c => c.status === "Active").length} Active)</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReOptimize}
            className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors"
          >
            {isOptimizing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span className="text-yellow-400">⚡</span>}
            AI Auto-Optimize All Routes
          </button>
          <button
            onClick={handleSavePlan}
            disabled={isSaving}
            className="flex items-center gap-2 border border-brand-teal px-3 py-2 rounded-lg text-xs font-semibold text-brand-teal hover:bg-brand-teal hover:text-white transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {isSaving ? "Saving..." : "Save Plan"}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative p-4 gap-4 bg-white">

        {/* Left Column (Map + Deck) */}
        <div className="flex flex-col flex-1 gap-4 min-w-0">
          <div className="flex-[3] rounded-2xl overflow-hidden border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative min-h-0">
            <LiveMap
              caregivers={caregivers}
              visits={visits}
              selectedCaregiverId={selectedCaregiverId}
              selectedVisitId={selectedVisitId}
              onSelectCaregiver={handleSelectCaregiver}
              onSelectVisit={handleSelectVisit}
              activeCaregiverId={activeCaregiverId}
              dragOverVisitId={dragOverVisitId}
            />
            {/* Predictive Delay Banner */}
            <AnimatePresence>
              {showDelayBanner && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600/95 backdrop-blur-md text-white px-4 py-2.5 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-40 flex items-center gap-3 text-sm font-medium border border-red-500"
                >
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-200" />
                  Heavy traffic simulated on Sunset Blvd. Expect 15-20 min delays for Maria Santos.
                  <button
                    onClick={() => setShowDelayBanner(false)}
                    className="ml-2 p-1 hover:bg-red-700 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            {/* AI Recommendation Floating Card */}
            <AnimatePresence>
              {showAICard && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0f172a]/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl z-40 flex flex-col gap-3 max-w-[500px] w-full"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                      <span className="text-xl">🤖</span>
                    </div>
                    <div className="text-sm font-medium text-slate-200 leading-snug">
                      <strong className="text-white">AI Recommendation:</strong> Re-ordering Priya Patel's 2nd & 3rd visit saves 18 mins of transit and avoids rush-hour traffic on Sunset Blvd.
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-1">
                    <button
                      onClick={() => setShowProposedPathModal(true)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
                    >
                      View Proposed Path
                    </button>
                    <button
                      onClick={() => {
                        setShowAICard(false);
                        toast.success("Optimization applied to Priya Patel's route.");
                      }}
                      className="px-3 py-1.5 text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 hover:bg-yellow-500 hover:text-slate-900 rounded transition-all flex items-center gap-1.5"
                    >
                      <span>⚡</span> Apply Optimization
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="shrink-0 rounded-2xl overflow-hidden border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
            <CaregiverDeck
              caregivers={caregivers}
              visits={visits}
              assignedCaregiverIds={assignedCaregiverIds}
              selectedCaregiverId={selectedCaregiverId}
              onSelectCaregiver={handleSelectCaregiver}
              onHoverCaregiver={setHoveredCaregiverId}
              onDragCaregiver={setDraggedCaregiverId}
              onAssign={handleAssignCaregiver}
            />
          </div>
        </div>

        {/* Right Column (Queue) */}
        <div className="w-[380px] shrink-0 h-full flex flex-col">
          <VisitQueue
            visits={visits}
            selectedVisitId={selectedVisitId}
            onSelectVisit={handleSelectVisit}
            onAssign={handleAssignCaregiver}
            activeCaregiver={activeCaregiver}
            onDragOverVisit={setDragOverVisitId}
            onCompareRoutes={setComparingVisitId}
            caregivers={caregivers}
          />
        </div>
      </div>

      {/* Details View Drawer */}
      <VisitDetailsDrawer
        isOpen={!!selectedVisitId}
        onClose={() => setSelectedVisitId(null)}
        visit={visits.find(v => v.id === selectedVisitId) || null}
        onEdit={() => setIsEditingVisit(true)}
        onContact={() => setIsContactingCaregiver(true)}
      />

      {/* Route Comparison Modal */}
      <RouteComparisonModal
        isOpen={!!comparingVisitId}
        onClose={() => setComparingVisitId(null)}
        visit={visits.find(v => v.id === comparingVisitId) || null}
        caregivers={caregivers}
        onAssign={handleAssignCaregiver}
      />

      {/* Edit Visit Modal */}
      <EditVisitModal
        isOpen={isEditingVisit}
        onClose={() => setIsEditingVisit(false)}
        visit={visits.find(v => v.id === selectedVisitId) || null}
        onSave={(updatedVisit: Visit) => {
          setVisits(prev => prev.map(v => v.id === updatedVisit.id ? updatedVisit : v));
          setIsEditingVisit(false);
          toast.success(`Visit #${updatedVisit.id.replace('v-', '4570')} updated successfully.`);
        }}
      />

      {/* Contact Caregiver Modal */}
      <ContactCaregiverModal
        isOpen={isContactingCaregiver}
        onClose={() => setIsContactingCaregiver(false)}
        visit={visits.find(v => v.id === selectedVisitId) || null}
        onSend={(message) => {
          setIsContactingCaregiver(false);
          toast.success(`Message sent successfully.`);
        }}
      />

      {/* Proposed Path Modal */}
      <ProposedPathModal
        isOpen={showProposedPathModal}
        onClose={() => setShowProposedPathModal(false)}
        onApply={() => {
          setShowProposedPathModal(false);
          setShowAICard(false);
          toast.success("Optimization applied to Priya Patel's route.");
        }}
      />
    </div>
  );
}
