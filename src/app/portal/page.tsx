"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import {
  portalUser,
  todaysVisit,
  quickStats,
  portalActivities,
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
  Activity,
  CheckCircle,
  FileEdit,
  AlertCircle
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
      className="max-w-7xl mx-auto space-y-4 pb-6"
    >
      {/* Warm Greeting */}
      <motion.div variants={fadeUpVariant} className="relative z-10">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-text-primary mb-1">
          Good morning, <span className="text-brand-teal">{portalUser.name.split(' ')[0]}</span>
        </h1>
        <p className="text-text-secondary text-sm max-w-2xl">
          Here is the latest on how {portalUser.relationship === "Daughter" ? "your dad" : portalUser.clientName} is doing today. Everything is looking great.
        </p>
      </motion.div>

      {/* Hero: Today's Visit Card */}
      <Link href="/portal/visits" className="block">
        <motion.div
          variants={fadeUpVariant}
          className="relative overflow-hidden bg-[var(--color-sidebar-bg)] rounded-2xl p-4 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-200"
        >
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none rounded-2xl">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-gradient-to-l from-brand-teal/10 to-transparent rotate-12 blur-2xl transform-gpu"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-xs font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-teal" />
                  <span>Today's Visit • {todaysVisit.timeWindow}</span>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md flex items-center gap-2 ${todaysVisit.status === 'In progress' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-white/10 text-white border-white/10'
                  }`}>
                  {todaysVisit.status === "In progress" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />}
                  {todaysVisit.status}
                </div>
              </div>

              <div className="mb-4">
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
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-colors w-fit">
                <div className="relative">
                  <img src={todaysVisit.caregiver.photo} alt={todaysVisit.caregiver.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
                  <div className="absolute -bottom-1 -right-1 bg-brand-teal text-white w-4 h-4 rounded-full border-2 border-[var(--color-sidebar-bg)] flex items-center justify-center">
                    <Star className="w-2.5 h-2.5 fill-current" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-white">{todaysVisit.caregiver.name}</div>
                  <div className="text-xs text-slate-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-brand-teal fill-brand-teal/20" />
                    Primary Caregiver
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* Quick Stats Grid */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: CalendarDays, label: "Next Visit", value: quickStats.nextVisit, bg: "bg-brand-teal/20", text: "text-brand-teal", href: "/portal/schedule" },
          { icon: MessageSquare, label: "Unread Messages", value: quickStats.unreadMessages, bg: "bg-amber-100", text: "text-amber-600", dot: quickStats.unreadMessages !== 0, href: "/portal/messages" },
          { icon: Receipt, label: "Balance", value: quickStats.outstandingBalance, bg: "bg-emerald-100", text: "text-emerald-600", href: "/portal/billing" }
        ].map((stat, i) => (
          <Link href={stat.href} key={i} className="block">
            <motion.div
              variants={fadeUpVariant}
              className="group bg-white p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle cursor-pointer transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 h-full"
            >
              <div className="relative z-10 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.text} transition-transform duration-200 group-hover:scale-105`}>
                  <stat.icon className="w-5 h-5" />
                  {stat.dot && (
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-text-secondary mb-0.5">{stat.label}</div>
                  <div className="text-lg font-semibold text-text-primary tracking-tight">{stat.value}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-teal group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Main Content Area (2/3 width) */}
        <motion.div variants={staggerContainer} className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-teal" />
              Recent Activity Feed
            </h2>
            {/* <button className="text-sm font-medium text-brand-teal hover:text-[var(--color-sidebar-active)] transition-colors flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button> */}
          </div>

          <div className="space-y-3">
            {portalActivities.map((activity, index) => {
              const isVisit = activity.type === "visit_completed";
              const isCarePlan = activity.type === "care_plan_updated";
              const isIncident = activity.type === "incident_reported";

              const Icon = isVisit ? CheckCircle : isCarePlan ? FileEdit : AlertCircle;

              const ActivityCard = (
                <motion.div
                  key={activity.id}
                  variants={fadeUpVariant}
                  className="bg-white p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
                      isVisit && "bg-emerald-100 border-emerald-200 text-emerald-600",
                      isCarePlan && "bg-blue-100 border-blue-200 text-blue-600",
                      isIncident && "bg-amber-100 border-amber-200 text-amber-600"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span className="font-semibold text-text-primary">{activity.title}</span>
                        <span className="text-xs font-medium text-text-secondary">{activity.timestamp}</span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">{activity.description}</p>
                      {activity.link && (
                        <div className="mt-3 flex items-center text-sm font-medium text-brand-teal">
                          View details <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );

              if (activity.link) {
                return <Link key={activity.id} href={activity.link} className="block">{ActivityCard}</Link>;
              }
              return ActivityCard;
            })}
          </div>
        </motion.div>

        {/* Sidebar Area (1/3 width) */}
        <motion.div variants={staggerContainer} className="space-y-4">
          {/* Upcoming Visits */}
          <motion.section variants={fadeUpVariant}>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-lg font-semibold text-text-primary">Upcoming</h2>
              <Link href="/portal/schedule" className="text-brand-teal hover:bg-brand-teal/10 p-1.5 rounded-full transition-colors">
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-200 overflow-hidden">
              {upcomingVisits.map((visit, idx) => (
                <Link href="/portal/schedule" key={visit.id} className={`block group p-4 transition-colors duration-200 hover:bg-slate-50 cursor-pointer ${idx !== upcomingVisits.length - 1 ? 'border-b border-slate-200' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="text-[16px] font-medium text-slate-800 transition-colors">{visit.date}</div>
                      <div className="text-[13px] text-slate-500 flex items-center gap-2">
                        <Clock className="w-[14px] h-[14px]" /> {visit.time}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <div className="w-8 h-8 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center text-[13px] font-medium border border-slate-100">
                          {visit.caregiverName.charAt(0)}
                        </div>
                        <span className="text-[14px] text-slate-700">{visit.caregiverName}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Care Team */}
          <motion.section variants={fadeUpVariant}>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-lg font-semibold text-text-primary">Care Team</h2>
            </div>
            <div className="space-y-3">
              {careTeam.map(member => (
                <Link href="/portal/messages" key={member.id} className="block group bg-white p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle flex items-center justify-between hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-200 cursor-pointer">
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
                  <div className="p-2 text-brand-teal group-hover:bg-brand-teal/10 rounded-lg transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </motion.div>
  );
}
