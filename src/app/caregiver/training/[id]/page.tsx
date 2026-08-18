import React from "react";
import CourseViewerClient from "./CourseViewerClient";
import { INITIAL_TRAINING_COURSES } from "@/lib/caregiver/caregiverPortalData";

export function generateStaticParams() {
  const ids = INITIAL_TRAINING_COURSES.map(c => ({ id: c.id }));
  // include some default ones just in case
  return [...ids, { id: "1" }, { id: "2" }, { id: "3" }, { id: "cg-001" }, { id: "pt-001" }, { id: "c-1" }, { id: "c-2" }, { id: "c-3" }];
}

export default function CourseViewerPage() {
  return <CourseViewerClient />;
}