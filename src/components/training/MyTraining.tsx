"use client";

import React, { useState, useRef, useEffect } from "react";
import { CheckCircle2, ShieldAlert, Award, AlertTriangle, AlertCircle, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { MOCK_COURSES, MOCK_USER_COURSES } from "@/lib/mockTrainingData";

export function MyTraining() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Slider state and refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < maxScroll - 1); // -1 for rounding errors

      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -336 : 336;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filter courses logic
  const inProgressCourses = MOCK_USER_COURSES.filter(c => c.status === "In Progress")
    .map(uc => {
      const course = MOCK_COURSES.find(c => c.id === uc.courseId);
      return { ...course, ...uc };
    })
    .filter(Boolean) as any[];



  const catalogCourses = MOCK_COURSES.filter(c => activeCategory === "All" || c.category === activeCategory);

  const categories = ["All", "HIPAA", "OSHA", "Infection Control", "Medication Management", "Incident Reporting", "Abuse Prevention", "Dementia Care", "CPR/First Aid"];

  return (
    <div className="space-y-6 pb-6">
      {/* 1. KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "COURSES COMPLETED", value: "4/17", icon: CheckCircle2, color: "text-brand-teal", bg: "bg-teal-100" },
          { label: "COMPLIANCE SCORE", value: "27%", icon: ShieldAlert, color: "text-brand-teal", bg: "bg-teal-100" },
          { label: "CERTIFICATIONS ACTIVE", value: "3", icon: Award, color: "text-slate-600", bg: "bg-slate-100" },
          { label: "EXPIRING SOON", value: "2", subtext: "within 60 days", icon: AlertTriangle, color: "text-accent-amber", bg: "bg-amber-100" },
          { label: "OVERDUE", value: "1", icon: AlertCircle, color: "text-accent-red", bg: "bg-red-100" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">{kpi.label}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${kpi.bg}`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <div className="text-xl font-bold text-slate-800">{kpi.value}</div>
            {kpi.subtext && <div className="text-[10px] text-slate-400 mt-1">{kpi.subtext}</div>}
          </div>
        ))}
      </div>

      {/* 2. Continue Learning */}
      <section>
        <div className="mb-3">
          <h3 className="text-base font-semibold text-slate-800">Continue Learning</h3>
          <p className="text-xs text-slate-500">Pick up where you left off</p>
        </div>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          >
            {inProgressCourses.map((course) => (
              <div key={course.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
                <CourseCard
                  title={course.title}
                  category={course.category}
                  format={course.format}
                  duration={course.duration}
                  progress={course.progress}
                  thumbnailColor={course.thumbnailColor}
                  actionLabel="Resume"
                  onAction={() => window.location.href = `/training/course/${course.id}`}
                />
              </div>
            ))}
          </div>
          {/* Scroll indicators */}
          <div className="flex items-center justify-between mt-2 px-2 text-slate-400">
            <ChevronLeft
              className={`w-5 h-5 transition-colors ${canScrollLeft ? 'cursor-pointer hover:text-slate-700 text-slate-500' : 'opacity-30 cursor-not-allowed'}`}
              onClick={() => scroll('left')}
            />
            <div className="h-1 flex-1 mx-4 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="w-1/3 h-full bg-slate-400 rounded-full transition-transform duration-100 ease-out"
                style={{ transform: `translateX(${scrollProgress * 2}%)` }}
              ></div>
            </div>
            <ChevronRight
              className={`w-5 h-5 transition-colors ${canScrollRight ? 'cursor-pointer hover:text-slate-700 text-slate-500' : 'opacity-30 cursor-not-allowed'}`}
              onClick={() => scroll('right')}
            />
          </div>
        </div>
      </section>



      {/* 5. Course Library */}
      <section>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-800">Course Library</h3>
          <p className="text-xs text-slate-500">Browse and enroll in additional training</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]  rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all "
            />
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-wrap gap-2 md:justify-end lg:justify-start">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ease-in-out ${activeCategory === cat
                    ? "bg-brand-teal text-white shadow-[0_4px_12px_rgba(20,184,166,0.3)] scale-105"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                >
                  {cat}
                </button>
              ))}
              <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out flex items-center gap-1.5">
                <Filter className="w-3 h-3" /> More
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {catalogCourses.map(course => (
            <CourseCard
              key={course.id}
              {...course}
              actionLabel={course.required ? "Start" : "Enroll"}
              onAction={() => window.location.href = `/training/course/${course.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
