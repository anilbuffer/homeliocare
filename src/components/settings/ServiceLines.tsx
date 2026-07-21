"use client";

import { useState } from "react";
import { Stethoscope, Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function ServiceLines() {
  const [serviceLines, setServiceLines] = useState([
    { id: 1, code: "T1019", name: "Personal Care Services", type: "Non-Medical", billRate: "$28.00", payRate: "$18.50", status: "Active" },
    { id: 2, code: "S9122", name: "Home Health Aide", type: "Medical", billRate: "$35.00", payRate: "$22.00", status: "Active" },
    { id: 3, code: "G0156", name: "Skilled Nursing (RN)", type: "Medical", billRate: "$85.00", payRate: "$55.00", status: "Active" },
    { id: 4, code: "S5120", name: "Chore Services", type: "Non-Medical", billRate: "$25.00", payRate: "$16.00", status: "Inactive" },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      setServiceLines([{ id: Math.random(), code: "NEW01", name: "New Service Line", type: "Medical", billRate: "$0.00", payRate: "$0.00", status: "Active" }, ...serviceLines]);
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Service Lines & Rates</h3>
          <p className="text-xs text-text-secondary mt-1">Configure billable services, HCPCS codes, and default pay/bill rates.</p>
        </div>
        <button 
          onClick={handleAdd}
          disabled={isAdding}
          className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 disabled:opacity-70 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
        >
          {isAdding ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? "Adding..." : "Add Service Line"}
        </button>
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Code / Name</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold text-right">Default Bill Rate</th>
                <th className="px-6 py-4 font-semibold text-right">Default Pay Rate</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {serviceLines.map((svc) => (
                <tr key={svc.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        <Stethoscope className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{svc.code}</div>
                        <div className="text-xs text-slate-500">{svc.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full border ${
                      svc.type === "Medical" ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      {svc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-slate-900 font-medium">
                    {svc.billRate}/hr
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-slate-900 font-medium">
                    {svc.payRate}/hr
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${svc.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${svc.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                      {svc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-brand-teal hover:bg-brand-teal/10 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
