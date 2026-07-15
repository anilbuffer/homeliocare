"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Search, Filter, MoreVertical, ArrowRight } from "lucide-react";
import { mockClients } from "@/lib/clients/mockData";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";

export default function ClientsPage() {
  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Clients</h2>
          <p className="text-sm text-text-secondary mt-1">Manage and view all client records.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search clients..."
              className="pl-9 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all w-64"
            />
          </div>
          <button className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="inline-flex items-center gap-2 bg-brand-teal hover:bg-emerald-600 active:scale-95 transition-all text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-md">
            <Users className="w-4 h-4" />
            New Client
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.values(mockClients).map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/clients/${client.id}`} className="block h-full group">
              <Card className="h-full hover:border-brand-teal/30 hover:shadow-md transition-all group-hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar src={client.avatarUrl} alt={client.name} fallback={client.name.substring(0, 2)} size="lg" />
                    <div>
                      <h3 className="font-semibold text-text-primary group-hover:text-brand-teal transition-colors">{client.name}</h3>
                      <p className="text-sm text-text-secondary">{client.age} yrs • {client.demographics.gender}</p>
                    </div>
                  </div>
                  <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Status</span>
                    <Badge variant={
                      client.status === "Active" ? "success" :
                        client.status === "Hospitalized" ? "warning" :
                          client.status === "Discharged" ? "default" : "error"
                    }>{client.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Risk Level</span>
                    <Badge variant={
                      client.riskLevel === "Low" ? "success" :
                        client.riskLevel === "Medium" ? "warning" : "error"
                    }>{client.riskLevel} Risk</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Diagnosis</span>
                    <span className="font-medium text-slate-700 truncate max-w-[140px] text-right" title={client.primaryDiagnosis}>{client.primaryDiagnosis}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-brand-teal text-sm font-medium">
                  View Client Profile
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
