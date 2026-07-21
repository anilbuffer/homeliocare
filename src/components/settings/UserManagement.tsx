"use client";

import { useState } from "react";
import { Users, UserPlus, Shield, Key, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Sarah Jenkins", email: "sarah@homeliocare.com", role: "Agency Admin", status: "Active", lastLogin: "Today, 9:42 AM" },
    { id: 2, name: "Marcus Thompson", email: "marcus@homeliocare.com", role: "HR Manager", status: "Active", lastLogin: "Yesterday" },
    { id: 3, name: "Elena Rodriguez", email: "elena@homeliocare.com", role: "Billing Specialist", status: "Active", lastLogin: "Today, 11:15 AM" },
    { id: 4, name: "David Chen", email: "david@homeliocare.com", role: "Compliance Officer", status: "Invited", lastLogin: "Never" },
  ]);

  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = () => {
    setIsInviting(true);
    setTimeout(() => {
      setUsers([...users, { id: Math.random(), name: "New User", email: "new@homeliocare.com", role: "Staff", status: "Invited", lastLogin: "Never" }]);
      setIsInviting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">User Management</h3>
          <p className="text-xs text-text-secondary mt-1">Manage back-office access, roles, and administrative permissions.</p>
        </div>
        <button 
          onClick={handleInvite}
          disabled={isInviting}
          className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 disabled:opacity-70 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
        >
          {isInviting ? <CheckCircle2 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          {isInviting ? "Inviting..." : "Invite User"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">12</div>
            <div className="text-xs text-slate-500 font-medium">Total Active Users</div>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">4</div>
            <div className="text-xs text-slate-500 font-medium">Agency Admins</div>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
            <Key className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">1</div>
            <div className="text-xs text-slate-500 font-medium">Pending Invites</div>
          </div>
        </Card>
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Last Login</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold text-xs shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md text-xs">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${user.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
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
