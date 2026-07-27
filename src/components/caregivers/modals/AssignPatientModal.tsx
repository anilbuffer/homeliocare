"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Users, Search, CheckCircle2, UserPlus } from "lucide-react";
import { mockPatients, Patient } from "@/lib/patients/mockData";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

interface AssignPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
  onAssignPatient: (patient: Patient) => void;
}

export function AssignPatientModal({
  isOpen,
  onClose,
  caregiverName,
  onAssignPatient,
}: AssignPatientModalProps) {
  const patientList = Object.values(mockPatients);
  const [search, setSearch] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patientList[0]?.id || "");

  const filteredPatients = patientList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleAssign = () => {
    const p = patientList.find((item) => item.id === selectedPatientId);
    if (p) {
      onAssignPatient(p);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Patient"
      description={`Select a care patient to assign to ${caregiverName}`}
      icon={<UserPlus className="w-6 h-6 text-brand-teal" />}
      maxWidth="xl"
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
            onClick={handleAssign}
            disabled={!selectedPatientId}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-emerald-600 disabled:opacity-50 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Confirm Patient Assignment
          </button>
        </>
      }
    >
      <div className="space-y-4 py-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient name or location..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
          />
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {filteredPatients.map((p) => {
            const isSelected = selectedPatientId === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? "bg-teal-50/50 border-brand-teal shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar src={p.avatarUrl} alt={p.name} fallback={p.name.substring(0, 2)} size="md" />
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{p.name}</h4>
                    <div className="text-xs text-slate-500">{p.address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={p.riskLevel === "High" ? "error" : p.riskLevel === "Medium" ? "warning" : "success"}>
                    {p.riskLevel} Risk
                  </Badge>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? "bg-brand-teal border-brand-teal text-white" : "border-slate-300"
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
