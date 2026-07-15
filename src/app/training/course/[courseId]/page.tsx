import React from "react";
import { CourseOverviewHeader } from "@/components/training/course/CourseOverviewHeader";
import { CurriculumList } from "@/components/training/course/CurriculumList";
import { MOCK_COURSE_DETAIL, MOCK_USER_PROGRESS } from "@/lib/mockCourseData";
import { Check } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// In a real app, you would fetch the course and progress based on params.courseId
export default async function CourseOverviewPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params;
  const courseId = resolvedParams.courseId;

  const course = MOCK_COURSE_DETAIL;
  
  const isCompletedCourse = ["c3", "c5", "c9", "c11"].includes(courseId);

  const progress = isCompletedCourse 
    ? {
        ...MOCK_USER_PROGRESS,
        lessons: MOCK_USER_PROGRESS.lessons.map(l => ({ ...l, status: "completed" as const })),
        quizPassed: true,
        quizScore: 100,
        quizAnswers: { "q1": 0, "q2": 1, "q3": 1 }
      }
    : MOCK_USER_PROGRESS;

  return (
    <div className="min-h-screen bg-[#F4F6F8] -mt-8">
      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-200 sticky -top-8 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto h-16 flex items-center">
          <Link href="/training" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Training Center
          </Link>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header Banner */}
        <CourseOverviewHeader course={course} progress={progress} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* What you'll learn */}
            <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">What you'll learn</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Check className="w-5 h-5 text-brand-teal" />
                    </div>
                    <span className="text-sm text-slate-700 leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <CurriculumList course={course} progress={progress} />
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">

            {/* Instructor Card */}
            <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Instructor</h3>
              <div className="flex items-center gap-4">
                <img
                  src={course.instructor.photo}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full border-2 border-slate-100 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-slate-800">{course.instructor.name}</h4>
                  <p className="text-sm text-slate-500">{course.instructor.credentials}</p>
                </div>
              </div>
            </div>

            {/* Requirements / Info */}
            <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Requirements</h3>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
                <li>Active caregiver status with Homelio Care.</li>
                <li>Internet connection for video playback.</li>
                <li>No prior HIPAA certification required.</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
