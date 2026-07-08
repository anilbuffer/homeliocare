"use client";

import React from "react";
import { Menu, Search, Bell } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-20 px-6 flex items-center justify-between bg-page-bg sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-200 lg:hidden transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-text-primary hidden sm:block">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients, caregivers..."
            className="w-[280px] h-10 pl-10 pr-4 bg-white border border-border-subtle rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-shadow shadow-sm"
          />
        </div>

        <button className="relative p-2 rounded-full bg-white border border-border-subtle text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-accent-red rounded-full border-2 border-white animate-pulse" />
        </button>
      </div>
    </header>
  );
}
