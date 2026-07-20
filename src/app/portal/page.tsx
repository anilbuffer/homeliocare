"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  portalUser,
  todaysVisit,
  quickStats,
  recentUpdates,
  upcomingVisits,
  careTeam
} from "@/lib/portalMockData";
import {
  CalendarDays,
  MessageSquare,
  Receipt,
  Clock,
  ChevronRight,
  Heart,
  Star,
  Activity
} from "lucide-react";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

export default function PortalOverviewPage() {
  const getStatusProgress = (status: string) => {
    switch (status) {
      case "Scheduled": return 25;
      case "On the way": return 50;
      case "In progress": return 75;
      case "Completed": return 100;
      default: return 0;
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-7xl mx-auto space-y-6 pb-8"
    >
      {/* Warm Greeting */}
      <motion.div variants={fadeUpVariant} className="relative z-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary mb-1.5">
          Good morning, <span className="text-brand-teal">{portalUser.name.split(' ')[0]}</span>
        </h1>
        <p className="text-text-secondary text-base max-w-2xl">
          Here is the latest on how {portalUser.relationship === "Daughter" ? "your dad" : portalUser.clientName} is doing today. Everything is looking great.
        </p>
      </motion.div>

      {/* Hero: Today's Visit Card */}
      <motion.div
        variants={fadeUpVariant}
        className="relative overflow-hidden bg-[var(--color-sidebar-bg)] rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none rounded-2xl">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-gradient-to-l from-brand-teal/10 to-transparent rotate-12 blur-2xl transform-gpu"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-teal" />
                <span>Today's Visit • {todaysVisit.timeWindow}</span>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-md flex items-center gap-2 ${
                todaysVisit.status === 'In progress' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-white/10 text-white border-white/10'
              }`}>
                {todaysVisit.status === "In progress" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />}
                {todaysVisit.status}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-2 px-1">
                <span>Scheduled</span>
                <span>En Route</span>
                <span className="text-white">In Progress</span>
                <span>Completed</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getStatusProgress(todaysVisit.status)}%` }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-brand-teal to-emerald-400 rounded-full relative"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors w-fit">
              <div className="relative">
                <img src={todaysVisit.caregiver.photo} alt={todaysVisit.caregiver.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
                <div className="absolute -bottom-1 -right-1 bg-brand-teal text-white w-5 h-5 rounded-full border-2 border-[var(--color-sidebar-bg)] flex items-center justify-center">
                  <Star className="w-2.5 h-2.5 fill-current" />
                </div>
              </div>
              <div>
                <div className="font-semibold text-white">{todaysVisit.caregiver.name}</div>
                <div className="text-sm text-slate-300 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-brand-teal fill-brand-teal/20" />
                  Primary Caregiver
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: CalendarDays, label: "Next Visit", value: quickStats.nextVisit, bg: "bg-blue-50/80", text: "text-blue-600" },
          { icon: MessageSquare, label: "Unread Messages", value: quickStats.unreadMessages, bg: "bg-amber-50/80", text: "text-amber-600", dot: quickStats.unreadMessages !== 0 },
          { icon: Receipt, label: "Balance", value: quickStats.outstandingBalance, bg: "bg-emerald-50/80", text: "text-emerald-600" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUpVariant}
            className="group bg-white p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle cursor-pointer transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-200"
          >
            <div className="relative z-10 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.text} transition-transform duration-200 group-hover:scale-105`}>
                <stat.icon className="w-6 h-6" />
                {stat.dot && (
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm text-text-secondary mb-0.5">{stat.label}</div>
                <div className="text-xl font-semibold text-text-primary tracking-tight">{stat.value}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-teal group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Content Area (2/3 width) */}
        <motion.div variants={staggerContainer} className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-teal" />
              Care Timeline
            </h2>
            <button className="text-sm font-medium text-brand-teal hover:text-[var(--color-sidebar-active)] transition-colors flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-5 relative before:absolute before:inset-0 before:ml-[1.75rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-border-subtle">
            {recentUpdates.map((update, index) => (
              <motion.div
                key={update.id}
                variants={fadeUpVariant}
                className="relative flex items-start gap-4 group"
              >
                {/* Timeline Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-white bg-brand-teal shadow-sm shrink-0 z-10 transition-transform duration-200 group-hover:scale-105">
                  <img src={update.caregiverPhoto} alt={update.caregiverName} className="w-full h-full rounded-full object-cover p-0.5 bg-white" />
                </div>
                
                {/* Timeline Content */}
                <div className="flex-1 p-5 rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle transition-all duration-200 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] group-hover:border-slate-200 mt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="font-semibold text-text-primary">{update.caregiverName}</span>
                    <span className="text-xs font-medium text-text-secondary">{update.timestamp}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">{update.note}</p>
                  
                  {update.photos && (
                    <div className="flex gap-3 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                      {update.photos.map((photo, i) => (
                        <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 cursor-pointer shadow-sm border border-slate-100 group/photo">
                          <img src={photo} alt="Care update" className="w-full h-full object-cover transition-transform duration-300 group-hover/photo:scale-105" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar Area (1/3 width) */}
        <motion.div variants={staggerContainer} className="space-y-6">
          {/* Upcoming Visits */}
          <motion.section variants={fadeUpVariant}>
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-lg font-semibold text-text-primary">Upcoming</h2>
              <button className="text-brand-teal hover:bg-brand-teal/10 p-1 rounded-full transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle overflow-hidden">
              {upcomingVisits.map((visit, idx) => (
                <div key={visit.id} className={`group p-4 transition-colors duration-200 hover:bg-slate-50 cursor-pointer ${idx !== upcomingVisits.length - 1 ? 'border-b border-border-subtle' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-text-primary mb-1 group-hover:text-brand-teal transition-colors">{visit.date}</div>
                      <div className="text-xs text-text-secondary flex items-center gap-1.5 mb-2.5">
                        <Clock className="w-3.5 h-3.5" /> {visit.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                          {visit.caregiverName.charAt(0)}
                        </div>
                        <span className="text-sm text-text-primary">{visit.caregiverName}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0" />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Care Team */}
          <motion.section variants={fadeUpVariant}>
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-lg font-semibold text-text-primary">Care Team</h2>
            </div>
            <div className="space-y-3">
              {careTeam.map(member => (
                <div key={member.id} className="group bg-white p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle flex items-center justify-between hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={member.photo} alt={member.name} className="w-10 h-10 rounded-full object-cover transition-transform duration-200 group-hover:scale-105" />
                      {member.isPrimaryContact && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-brand-teal rounded-full border-2 border-white flex items-center justify-center">
                          <Star className="w-2 h-2 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-text-primary flex items-center gap-2 mb-0.5 group-hover:text-brand-teal transition-colors">
                        {member.name}
                      </div>
                      <div className="text-xs text-text-secondary">{member.role}</div>
                    </div>
                  </div>
                  <button className="p-2 text-brand-teal hover:bg-brand-teal/10 rounded-lg transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </motion.div>
  );
}

