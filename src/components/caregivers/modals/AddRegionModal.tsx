"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { MapPin, Plus, CheckCircle2 } from "lucide-react";

interface AddRegionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRegion: (regionName: string) => void;
}

export function AddRegionModal({ isOpen, onClose, onAddRegion }: AddRegionModalProps) {
  const [regionName, setRegionName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regionName.trim()) return;
    onAddRegion(regionName.trim());
    setRegionName("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Coverage Region"
      description="Specify a preferred geographic zone or district for caregiver matching"
      icon={<MapPin className="w-6 h-6 text-brand-teal" />}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!regionName.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-emerald-600 disabled:opacity-50 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Add Region
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Region or District Name
          </label>
          <input
            type="text"
            value={regionName}
            onChange={(e) => setRegionName(e.target.value)}
            placeholder="e.g. West Suburbs, East Metro, North County"
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
            autoFocus
            required
          />
        </div>
      </form>
    </Modal>
  );
}
