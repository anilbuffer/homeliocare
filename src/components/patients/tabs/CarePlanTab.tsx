import React from "react";
import { Card } from "@/components/ui/Card";
import { Patient } from "@/lib/patients/mockData";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function CarePlanTab({ patient }: { patient: Patient }) {
  if (!patient.carePlan) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200">
          <h3 className="text-lg font-medium text-slate-700 mb-2">No care plan yet</h3>
        </Card>
      </div>
    );
  }

  const { carePlan } = patient;

  return (
    <div className="space-y-6">
      {/* Approval Banner */}
      <div className="bg-emerald-50 text-emerald-800 text-sm font-medium px-4 py-3 rounded-lg flex items-center">
        <span className="font-semibold text-brand-teal mr-2">Care plan approved</span> 
        <span className="text-emerald-700 opacity-90">Signer: {carePlan.approval.signer} - {carePlan.approval.date}</span>
      </div>

      {/* Problems & Goals */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Problems & goals</h3>
        <Card className="divide-y divide-slate-100">
          {carePlan.problems.map((problem) => (
            <div key={problem.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 text-sm mb-1">{problem.title}</p>
                <p className="text-xs text-slate-500">Target: {problem.targetDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={problem.status === "On track" ? "success" : "warning"} className="font-medium bg-opacity-20 rounded-md">
                  {problem.status}
                </Badge>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Tasks */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Tasks</h3>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 border-b border-slate-100">Task</th>
                  <th className="px-6 py-4 border-b border-slate-100">Frequency</th>
                  <th className="px-6 py-4 border-b border-slate-100">Assigned</th>
                  <th className="px-6 py-4 border-b border-slate-100">Last Completed</th>
                  <th className="px-6 py-4 border-b border-slate-100">Next Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {carePlan.tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-800">{task.task}</td>
                    <td className="px-6 py-4">{task.frequency}</td>
                    <td className="px-6 py-4">{task.assigned}</td>
                    <td className="px-6 py-4">{task.lastCompleted}</td>
                    <td className="px-6 py-4">{task.nextDue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Version history */}
      <Card className="p-4 flex items-center justify-between mt-4">
        <h3 className="text-sm font-semibold text-slate-700">Version history</h3>
        <span className="text-sm text-slate-500">{carePlan.versionHistory.revisions} revisions</span>
      </Card>
    </div>
  );
}
