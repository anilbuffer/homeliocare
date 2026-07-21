import React from "react";
import { Card } from "@/components/ui/Card";
import { Patient } from "@/lib/patients/mockData";
import { Avatar } from "@/components/ui/Avatar";
import { Phone, Mail, Globe, Users, Activity, Pill, Brain, Clock, Shield, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";

export function OverviewTab({ patient }: { patient: Patient }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 flex flex-col gap-4">
        {/* Demographics & Insurance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-teal" /> Demographics
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-y-3 text-xs">
                <span className="text-slate-500">DOB</span>
                <span className="font-medium">{patient.demographics.dob}</span>
                <span className="text-slate-500">Gender</span>
                <span className="font-medium">{patient.demographics.gender}</span>
                <span className="text-slate-500">Language</span>
                <span className="font-medium flex items-center gap-1"><Globe className="w-4 h-4 text-slate-400" /> {patient.demographics.preferredLanguage}</span>
                <span className="text-slate-500">Phone</span>
                <span className="font-medium flex items-center gap-1"><Phone className="w-4 h-4 text-slate-400" /> {patient.demographics.phone}</span>
                <span className="text-slate-500">Email</span>
                <span className="font-medium flex items-center gap-1 truncate"><Mail className="w-4 h-4 text-slate-400" /> {patient.demographics.email}</span>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Emergency Contacts</h4>
                <div className="space-y-3">
                  {patient.demographics.emergencyContacts.map((contact, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <div>
                        <p className="font-medium text-slate-800">{contact.name}</p>
                        <p className="text-xs text-slate-500">{contact.relation}</p>
                      </div>
                      <a href={`tel:${contact.phone}`} className="text-brand-teal font-medium hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-teal" /> Insurance
            </h3>
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Primary Payer</p>
                <p className="text-sm font-medium text-slate-800">{patient.insurance.primary}</p>
              </div>
              {patient.insurance.secondary && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Secondary Payer</p>
                  <p className="text-sm font-medium text-slate-800">{patient.insurance.secondary}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-y-3 text-xs pt-2">
                <span className="text-slate-500">Policy Number</span>
                <span className="font-medium text-right">{patient.insurance.policyNumber}</span>
                <span className="text-slate-500">Group Number</span>
                <span className="font-medium text-right">{patient.insurance.groupNumber}</span>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Authorization Status</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium text-emerald-700">{patient.insurance.authorizationStatus}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Risk Summary */}
        <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Risk Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Fall Risk", risk: patient.riskSummary.fallRisk, icon: Activity },
              { label: "Medication Risk", risk: patient.riskSummary.medicationRisk, icon: Pill },
              { label: "Cognitive Status", risk: patient.riskSummary.cognitiveStatus, icon: Brain },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-2xl border border-slate-100 bg-slate-50 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${item.risk.level === "High" ? "bg-red-100 text-red-600" :
                  item.risk.level === "Medium" ? "bg-orange-100 text-orange-600" :
                    "bg-emerald-100 text-emerald-600"
                  }`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-medium text-slate-800 mb-1">{item.label}</h4>
                <p className={`text-lg font-bold ${item.risk.level === "High" ? "text-red-600" :
                  item.risk.level === "Medium" ? "text-orange-600" :
                    "text-emerald-600"
                  }`}>{item.risk.level}</p>
                <p className="text-xs text-slate-500 mt-2">Last Assessed: {item.risk.lastAssessment}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        {/* Care Team */}
        <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Care Team</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar fallback="PP" size="sm" />
              <div>
                <p className="text-sm font-medium text-slate-800">{patient.careTeam.pcp}</p>
                <p className="text-xs text-slate-500">Primary Care Physician</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar src={patient.careTeam.caseManager.avatarUrl} fallback="CM" size="sm" />
              <div>
                <p className="text-sm font-medium text-slate-800">{patient.careTeam.caseManager.name}</p>
                <p className="text-xs text-slate-500">Case Manager</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Primary Caregivers</h4>
              <div className="space-y-3">
                {patient.careTeam.primaryCaregivers.length > 0 ? (
                  patient.careTeam.primaryCaregivers.map((cg, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Avatar src={cg.avatarUrl} fallback={cg.name.substring(0, 2)} size="sm" />
                      <p className="text-sm font-medium text-slate-700">{cg.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No primary caregivers assigned.</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-teal" /> Recent Activity
          </h3>
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
            {patient.recentActivity.map((activity) => {
              const Icon = activity.type === "visit" ? Clock :
                activity.type === "medication" ? Pill :
                  activity.type === "incident" ? ShieldAlert : FileText;

              const iconColor = activity.type === "visit" ? "bg-blue-100 text-blue-600 border-blue-200" :
                activity.type === "medication" ? "bg-purple-100 text-purple-600 border-purple-200" :
                  activity.type === "incident" ? "bg-orange-100 text-orange-600 border-orange-200" :
                    "bg-emerald-100 text-emerald-600 border-emerald-200";

              return (
                <div key={activity.id} className="relative pl-6">
                  <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center ${iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(activity.timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
