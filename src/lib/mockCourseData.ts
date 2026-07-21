import { CourseDetail, UserCourseProgress } from "@/types/course";

export const MOCK_COURSE_DETAIL: CourseDetail = {
  id: "c1",
  title: "HIPAA Privacy Essentials 2026",
  category: "HIPAA",
  format: "Video",
  duration: "45m",
  description: "Learn the fundamentals of HIPAA privacy rules, protecting PHI, and secure communication for home care providers.",
  learningOutcomes: [
    "Understand the definition of Protected Health Information (PHI)",
    "Identify common HIPAA violations in home care settings",
    "Learn best practices for secure documentation and communication",
    "Know how to properly report a suspected privacy breach"
  ],
  totalLessons: 4,
  passRateRequired: 80,
  caregiversCompleted: 154,
  averageRating: 4.8,
  instructor: {
    name: "Dr. Sarah Jenkins",
    credentials: "Chief Compliance Officer",
    photo: ""
  },
  modules: [
    {
      id: "m1",
      title: "Introduction to HIPAA",
      lessons: [
        {
          id: "l1",
          title: "What is HIPAA and PHI?",
          duration: "10m",
          format: "Video",
          contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          isRequired: true
        },
        {
          id: "l2",
          title: "HIPAA Glossary and Terms",
          duration: "5m",
          format: "Reading",
          textContent: "<h1>HIPAA Glossary</h1><p>Welcome to the glossary. Here you will learn about PHI (Protected Health Information), Covered Entities, and Business Associates. It is critical to memorize these definitions...</p><p>Scroll to the bottom to mark as complete.</p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><p>End of document.</p>",
          isRequired: true
        }
      ]
    },
    {
      id: "m2",
      title: "Applying Rules in the Field",
      lessons: [
        {
          id: "l3",
          title: "Common Scenarios in Home Care",
          duration: "15m",
          format: "Video",
          contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          isRequired: true
        },
        {
          id: "l4",
          title: "Incident Reporting Procedures",
          duration: "15m",
          format: "PDF",
          contentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          isRequired: true
        }
      ]
    }
  ],
  quiz: {
    title: "HIPAA Final Certification Quiz",
    passPercentage: 80,
    attemptsAllowed: 3,
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "Which of the following is considered PHI?",
        options: [
          "A patient's name and address",
          "A generic description of a medical condition without identifiers",
          "The color of the caregiver's uniform",
          "An anonymized statistical report"
        ],
        correctAnswerIndex: 0
      },
      {
        id: "q2",
        type: "scenario",
        question: "Scenario: You are at a coffee shop and your friend asks how your patient Mrs. Smith is doing. What should you do?",
        options: [
          "Share details quietly so nobody else hears",
          "Explain that you cannot discuss patient information to protect privacy",
          "Only share her first name and general condition",
          "Say she is fine but don't mention her medical condition"
        ],
        correctAnswerIndex: 1
      },
      {
        id: "q3",
        type: "multiple-choice",
        question: "How should you dispose of physical notes containing a patient's medical history?",
        options: [
          "Throw them in the regular trash",
          "Shred them using an approved shredder",
          "Keep them in your car for future reference",
          "Cross out the name with a pen and recycle them"
        ],
        correctAnswerIndex: 1
      }
    ]
  }
};

export const MOCK_USER_PROGRESS: UserCourseProgress = {
  courseId: "c1",
  status: "in-progress",
  lessons: [
    { lessonId: "l1", status: "completed" },
    { lessonId: "l2", status: "completed" },
    { lessonId: "l3", status: "in-progress" },
    { lessonId: "l4", status: "not-started" }
  ],
  quizPassed: false
};
