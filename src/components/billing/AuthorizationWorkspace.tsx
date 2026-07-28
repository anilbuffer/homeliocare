"use client";

import React, { useState } from "react";
import { Search, Plus, ShieldCheck, Filter, MoreVertical, Calendar, Activity, CheckCircle2, AlertTriangle, ArrowRight, FileSignature, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { Modal } from "@/components/ui/Modal";

interface AuthorizationRecord {
  id: string;
  clientName: string;
  payer: string;
  serviceType: string;
  billingCodes: string[];
  startDate: string;
  endDate: string;
  unitsAuthorized: number;
  unitsConsumed: number;
  status: "ACTIVE" | "EXPIRING" | "EXPIRED" | "PENDING";
}

const mockRecords: AuthorizationRecord[] = [
  { id: "AUTH-992140", clientName: "Mary Smith", payer: "Medicaid", serviceType: "Personal Care", billingCodes: ["T1019"], startDate: "2026-01-01", endDate: "2026-08-15", unitsAuthorized: 480, unitsConsumed: 450, status: "EXPIRING" },
  { id: "AUTH-110294", clientName: "Robert Chen", payer: "BlueCross", serviceType: "Physical Therapy", billingCodes: ["97110", "97140"], startDate: "2026-05-01", endDate: "2026-08-05", unitsAuthorized: 120, unitsConsumed: 110, status: "EXPIRING" },
  { id: "AUTH-774129", clientName: "James Wilson", payer: "Medicaid", serviceType: "Respite", billingCodes: ["S5150"], startDate: "2026-02-01", endDate: "2026-12-31", unitsAuthorized: 600, unitsConsumed: 200, status: "ACTIVE" },
  { id: "AUTH-441290", clientName: "Eleanor Vance", payer: "Aetna", serviceType: "Skilled Nursing", billingCodes: ["G0299"], startDate: "2026-07-01", endDate: "2026-09-30", unitsAuthorized: 150, unitsConsumed: 150, status: "EXPIRED" },
  { id: "AUTH-552199", clientName: "Sarah Jenkins", payer: "Medicare", serviceType: "Home Health Aide", billingCodes: ["G0156"], startDate: "2026-08-01", endDate: "2026-10-31", unitsAuthorized: 300, unitsConsumed: 0, status: "PENDING" },
];

export function AuthorizationWorkspace() {
  const [records, setRecords] = useState<AuthorizationRecord[]>(mockRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewAuthModalOpen, setIsNewAuthModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AuthorizationRecord | null>(null);

  const filteredRecords = records.filter(r =>
    r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.payer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      {/* Header and Controls */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-teal" />
            Authorization Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track and renew payer authorizations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search clients or payers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50 transition-shadow"
            />
          </div>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 p-2.5 rounded-xl transition-colors"
          >
            <Filter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsNewAuthModalOpen(true)}
            className="bg-brand-teal hover:bg-brand-teal/90 text-white px-3 py-2 rounded-xl text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Auth
          </button>
        </div>
      </div>

      {/* Main Table View */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client & Payer</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service & Codes</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Validity Period</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Units Consumed</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredRecords.map(record => {
              const unitPercentage = Math.round((record.unitsConsumed / record.unitsAuthorized) * 100);
              const isOverLimit = unitPercentage >= 100;

              return (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-sm text-slate-900">{record.clientName}</div>
                    <div className="text-xs font-normal text-slate-500 mt-0.5">{record.payer} • {record.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-sm text-slate-700">{record.serviceType}</div>
                    <div className="flex gap-1 mt-1">
                      {record.billingCodes.map(code => (
                        <span key={code} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full uppercase">{code}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-1 text-sm text-slate-600">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-500" /> {record.startDate}</div>
                      <div className="flex items-center gap-1.5 text-xs"><ArrowRight className="w-3.5 h-3.5 text-slate-500" /> {record.endDate}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                      <span className={isOverLimit ? "text-rose-600 font-semibold" : "text-slate-600"}>{record.unitsConsumed} / {record.unitsAuthorized}</span>
                      <span className={isOverLimit ? "text-rose-600" : "text-slate-400"}>{unitPercentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          "h-full rounded-full transition-all duration-500",
                          unitPercentage < 75 ? "bg-brand-teal" : unitPercentage < 95 ? "bg-amber-400" : "bg-rose-500"
                        )}
                        style={{ width: `${Math.min(unitPercentage, 100)}%` }}
                      />
                    </div>
                    {isOverLimit && (
                      <div className="flex items-center gap-1 mt-1 text-[10px] font-semibold text-rose-600">
                        <AlertTriangle className="w-2 h-2" /> Hard Block on Scheduling
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className={clsx(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                      record.status === "ACTIVE" ? "bg-teal-100 text-brand-teal" :
                        record.status === "EXPIRING" ? "bg-amber-100 text-amber-600" :
                          record.status === "EXPIRED" ? "bg-rose-100 text-rose-600" :
                            "bg-blue-100 text-blue-600"
                    )}>
                      {record.status === "ACTIVE" && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {record.status === "EXPIRING" && <AlertTriangle className="w-3.5 h-3.5" />}
                      {record.status === "EXPIRED" && <AlertTriangle className="w-3.5 h-3.5" />}
                      {record.status === "PENDING" && <Activity className="w-3.5 h-3.5" />}
                      {record.status}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="p-2 text-slate-400 hover:text-brand-teal hover:bg-teal-50 rounded-xl transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* New Auth Modal */}
      <Modal
        isOpen={isNewAuthModalOpen}
        onClose={() => setIsNewAuthModalOpen(false)}
        title="New Authorization"
        description="Create a new authorization record"
        icon={<div className="p-2 bg-brand-teal/10 rounded-xl"><Plus className="w-5 h-5 text-brand-teal" /></div>}
        footer={
          <>
            <button
              onClick={() => setIsNewAuthModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsNewAuthModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-brand-teal/90 rounded-xl transition-colors shadow-sm shadow-brand-teal/20"
            >
              Create Authorization
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Client Name</label>
              <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50" placeholder="e.g. John Doe" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Payer</label>
              <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50" placeholder="e.g. Medicare" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Service Type</label>
            <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50" placeholder="e.g. Physical Therapy" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Start Date</label>
              <input type="date" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">End Date</label>
              <input type="date" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Units Authorized</label>
            <input type="number" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50" placeholder="0" />
          </div>
        </div>
      </Modal>

      {/* Filter Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter Authorizations"
        description="Filter records by status and payer"
        icon={<div className="p-2 bg-slate-100 rounded-xl"><Filter className="w-5 h-5 text-slate-600" /></div>}
        footer={
          <>
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-brand-teal/90 rounded-xl transition-colors shadow-sm shadow-brand-teal/20"
            >
              Apply Filters
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">Status</h4>
            <div className="flex flex-wrap gap-2">
              {["ACTIVE", "EXPIRING", "EXPIRED", "PENDING"].map((status) => (
                <label key={status} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                  <input type="checkbox" className="rounded text-brand-teal focus:ring-brand-teal/50" defaultChecked={true} />
                  <span className="text-sm font-medium text-slate-700 capitalize">{status.toLowerCase()}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">Payer</h4>
            <div className="space-y-2">
              {["Medicaid", "Medicare", "BlueCross", "Aetna"].map((payer) => (
                <label key={payer} className="flex items-center gap-3">
                  <input type="checkbox" className="rounded text-brand-teal focus:ring-brand-teal/50 w-4 h-4" defaultChecked={true} />
                  <span className="text-sm text-slate-700">{payer}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Record Details Modal */}
      <Modal
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        title="Authorization Details"
        description={selectedRecord ? `ID: ${selectedRecord.id}` : ""}
        icon={<div className="p-2 bg-blue-100 rounded-xl"><FileSignature className="w-5 h-5 text-blue-600" /></div>}
        footer={
          <>
            <button
              onClick={() => setSelectedRecord(null)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => setSelectedRecord(null)}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-brand-teal/90 rounded-xl transition-colors shadow-sm shadow-brand-teal/20"
            >
              Edit Details
            </button>
          </>
        }
      >
        {selectedRecord && (
          <div className="space-y-4">
            <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{selectedRecord.clientName}</h4>
                <p className="text-xs text-slate-500 font-medium">{selectedRecord.payer}</p>
              </div>
              <div className={clsx(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium capitalize",
                selectedRecord.status === "ACTIVE" ? "bg-teal-100 text-brand-teal" :
                  selectedRecord.status === "EXPIRING" ? "bg-amber-100 text-amber-600" :
                    selectedRecord.status === "EXPIRED" ? "bg-rose-100 text-rose-600" :
                      "bg-blue-100 text-blue-600"
              )}>
                {selectedRecord.status}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-normal text-slate-500 mb-1">Service Type</div>
                <div className="text-sm font-medium text-slate-900">{selectedRecord.serviceType}</div>
              </div>
              <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-normal text-slate-500 mb-1">Billing Codes</div>
                <div className="flex flex-wrap gap-1">
                  {selectedRecord.billingCodes.map(code => (
                    <span key={code} className="bg-white border border-slate-200 text-slate-700 text-xs font-medium px-2 py-0.5 rounded-full">{code}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">Validity Period</h4>
              <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">Start Date</div>
                  <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {selectedRecord.startDate}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">End Date</div>
                  <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {selectedRecord.endDate}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">Utilization</h4>
              <div>
                <div className="flex items-center justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-600">Consumed: {selectedRecord.unitsConsumed} / {selectedRecord.unitsAuthorized} units</span>
                  <span className="text-brand-teal">{Math.round((selectedRecord.unitsConsumed / selectedRecord.unitsAuthorized) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={clsx(
                      "h-full rounded-full transition-all duration-500",
                      (selectedRecord.unitsConsumed / selectedRecord.unitsAuthorized) < 0.75 ? "bg-brand-teal" : (selectedRecord.unitsConsumed / selectedRecord.unitsAuthorized) < 0.95 ? "bg-amber-400" : "bg-rose-500"
                    )}
                    style={{ width: `${Math.min((selectedRecord.unitsConsumed / selectedRecord.unitsAuthorized) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
