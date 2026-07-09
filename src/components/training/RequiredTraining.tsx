"use client";

import React from "react";
import { CourseCard } from "./CourseCard";
import { MOCK_COURSES, MOCK_USER_COURSES } from "@/lib/mockTrainingData";

export function RequiredTraining() {
  const requiredCourses = MOCK_USER_COURSES
    .map(uc => {
      const course = MOCK_COURSES.find(c => c.id === uc.courseId);
      return { ...course, ...uc };
    })
    .filter(c => c.required);

  return (
    <div className="space-y-6 pb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Required Training</h3>
        <p className="text-sm text-slate-500">Mandatory compliance courses you need to complete</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {requiredCourses.map((course: any) => (
          <CourseCard
            key={course.id}
            {...course}
            actionLabel={course.status === "Completed" ? "Review" : course.status === "In Progress" ? "Resume" : "Start"}
          />
        ))}
      </div>
    </div>
  );
}
