"use client";

import React, { useState, useEffect } from "react";
import { mockTeamMembers } from "@/lib/partner/mockData";
import { Users, UserPlus, MoreVertical, ShieldAlert, X, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function OrgTeamManagement() {
  const [members, setMembers] = useState(mockTeamMembers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if ((e.target as Element).closest('.dropdown-trigger') || (e.target as Element).closest('.dropdown-menu')) {
        return;
      }
      setOpenDropdownId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("New member added successfully.");
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative h-full flex flex-col">
        <div className="px-3 py-2 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-base">Team Access Management</h3>
              <p className="text-xs text-slate-500">Manage who can access referrals for your organization.</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-brand-teal text-white hover:bg-brand-teal/90 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-[0_4px_12px_rgba(13,148,136,0.2)] hover:shadow-[0_6px_16px_rgba(13,148,136,0.3)] w-full sm:w-auto">
            <UserPlus className="w-4 h-4" />
            Add Member
          </button>
        </div>
        <div className="bg-blue-50/50 px-4 py-2 border-b border-slate-100 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-slate-800">Organization-wide Visibility</h4>
            <p className="text-xs text-slate-600 mt-1">
              All active team members can view the full referral history for the organization. Please ensure only authorized personnel are granted access.
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-x-auto pb-10 lg:pb-24">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-3 py-2 text-xs font-semibold text-slate-500">Member</th>
                <th className="px-3 py-2 text-xs font-semibold text-slate-500">Role</th>
                <th className="px-3 py-2 text-xs font-semibold text-slate-500">Status</th>
                <th className="px-3 py-2 text-xs font-semibold text-slate-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                        {member.name.split(" ", 2).map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-800">{member.name}</div>
                        <div className="text-[10px] text-slate-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-xs text-slate-600 whitespace-nowrap">{member.role}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${member.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => {
                          setOpenDropdownId(openDropdownId === member.id ? null : member.id);
                        }}
                        className={`dropdown-trigger p-1.5 rounded-lg transition-colors relative z-10 ${openDropdownId === member.id ? 'bg-teal-50 text-brand-teal' : 'text-slate-400 hover:text-brand-teal hover:bg-teal-50'}`}>
                        <MoreVertical className="w-4 h-4 pointer-events-none" />
                      </button>
                      <AnimatePresence>
                        {openDropdownId === member.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="dropdown-menu absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 py-1 z-[100] overflow-hidden"
                          >
                            <button
                              onClick={() => {
                                toast.info(`Editing ${member.name}`);
                                setOpenDropdownId(null);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-teal transition-colors flex items-center gap-2"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              Edit Role
                            </button>
                            <button
                              onClick={() => {
                                toast.error(`Removing ${member.name}`);
                                setOpenDropdownId(null);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-semibold text-slate-800 text-lg flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-brand-teal" />
                  Add Team Member
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleAddMember} className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full rounded-xl border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2.5 px-3 border outline-none text-slate-700" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                  <input required type="email" placeholder="john@example.com" className="w-full rounded-xl border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2.5 px-3 border outline-none text-slate-700" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Role</label>
                  <select required className="w-full rounded-xl border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:border-brand-teal focus:ring-brand-teal text-sm py-2.5 px-3 border outline-none text-slate-700 bg-white">
                    <option value="">Select a role...</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white rounded-xl text-sm font-medium transition-colors shadow-[0_4px_12px_rgba(13,148,136,0.2)] hover:shadow-[0_6px_16px_rgba(13,148,136,0.3)]"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}