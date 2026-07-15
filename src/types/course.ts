export type LessonFormat = "Video" | "Reading" | "PDF" | "PowerPoint";

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "scenario";
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  format: LessonFormat;
  contentUrl?: string; // e.g. placeholder video url
  textContent?: string; // for reading lesson
  isRequired: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseDetail {
  id: string;
  title: string;
  category: string;
  format: LessonFormat;
  duration: string;
  description: string;
  learningOutcomes: string[];
  totalLessons: number;
  passRateRequired: number;
  caregiversCompleted: number;
  averageRating: number;
  required?: boolean;
  instructor: {
    name: string;
    credentials: string;
    photo: string;
  };
  modules: Module[];
  quiz: {
    title: string;
    passPercentage: number;
    timeLimit?: number; // minutes
    attemptsAllowed: number;
    questions: QuizQuestion[];
  };
}

export interface UserLessonProgress {
  lessonId: string;
  status: "not-started" | "in-progress" | "completed";
}

export interface UserCourseProgress {
  courseId: string;
  status: "not-started" | "in-progress" | "completed";
  lessons: UserLessonProgress[];
  quizPassed: boolean;
  quizScore?: number;
  quizAnswers?: Record<string, number>;
}
