"use client";

import React, { useState } from "react";
import { CourseDetail } from "@/types/course";
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, Trophy, Download } from "lucide-react";
import Link from "next/link";

interface QuizSectionProps {
  course: CourseDetail;
  onPass: (score: number) => void;
}

type QuizState = "intro" | "questions" | "results";

export function QuizSection({ course, onPass }: QuizSectionProps) {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const quiz = course.quiz;
  const currentQuestion = quiz.questions[currentQuestionIdx];

  const handleStart = () => setQuizState("questions");

  const handleAnswer = (optionIdx: number) => {
    setAnswers({ ...answers, [currentQuestionIdx]: optionIdx });
  };

  const handleNext = () => {
    if (currentQuestionIdx < quiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Calculate score
      let correct = 0;
      quiz.questions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswerIndex) correct++;
      });
      const finalScore = Math.round((correct / quiz.questions.length) * 100);
      setScore(finalScore);
      setQuizState("results");
      if (finalScore >= quiz.passPercentage) {
        onPass(finalScore);
      }
    }
  };

  const handleRetake = () => {
    setQuizState("intro");
    setCurrentQuestionIdx(0);
    setAnswers({});
    setScore(null);
  };

  if (quizState === "intro") {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-8 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-accent-purple/10 rounded-full flex items-center justify-center mb-6">
          <Trophy className="w-10 h-10 text-accent-purple" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">{quiz.title}</h2>
        <p className="text-slate-600 mb-8 text-lg">
          You've completed all the lessons. It's time to test your knowledge.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-sm">
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-slate-800">{quiz.questions.length}</div>
            <div className="text-sm text-slate-500">Questions</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-slate-800">{quiz.passPercentage}%</div>
            <div className="text-sm text-slate-500">To Pass</div>
          </div>
        </div>
        <button
          onClick={handleStart}
          className="bg-brand-teal text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-brand-teal/90 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizState === "questions") {
    const isAnswered = answers[currentQuestionIdx] !== undefined;

    return (
      <div className="max-w-3xl mx-auto h-full flex flex-col p-4 md:p-8">
        <div className="mb-8">
          <div className="flex justify-between text-sm font-semibold text-slate-500 mb-2">
            <span>Question {currentQuestionIdx + 1} of {quiz.questions.length}</span>
            <span>{Math.round(((currentQuestionIdx) / quiz.questions.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-teal transition-all duration-300"
              style={{ width: `${((currentQuestionIdx) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-snug">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentQuestionIdx] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    isSelected
                      ? "border-brand-teal bg-brand-teal/5 scale-[1.01] shadow-sm"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? "border-brand-teal" : "border-slate-300"
                  }`}>
                    {isSelected && <div className="w-3 h-3 bg-brand-teal rounded-full" />}
                  </div>
                  <span className={`text-lg ${isSelected ? "text-slate-900 font-medium" : "text-slate-700"}`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
            disabled={currentQuestionIdx === 0}
            className="flex items-center gap-2 px-6 py-3 font-semibold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex items-center gap-2 px-8 py-3 font-bold text-white bg-brand-teal disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            {currentQuestionIdx === quiz.questions.length - 1 ? "Submit Quiz" : "Next"} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Results state
  const passed = score !== null && score >= quiz.passPercentage;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-8 text-center animate-in fade-in zoom-in duration-500">
      {passed ? (
        <>
          <div className="w-24 h-24 bg-brand-teal/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-brand-teal" />
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-2">Congratulations!</h2>
          <p className="text-xl text-slate-600 mb-8">You passed with a score of <span className="font-bold text-brand-teal">{score}%</span></p>
          
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 w-full max-w-md mb-8 shadow-sm relative overflow-hidden">
             {/* Certificate Mockup inside card */}
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Trophy className="w-24 h-24" />
             </div>
             <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Certificate of Completion</h4>
             <h3 className="text-2xl font-serif text-slate-800 mb-1">{course.title}</h3>
             <p className="text-slate-500 text-sm mb-6">Completed on {new Date().toLocaleDateString()}</p>
             
             <button className="w-full flex items-center justify-center gap-2 bg-accent-purple text-white font-semibold py-3 rounded-xl hover:bg-accent-purple/90 transition-colors">
               <Download className="w-5 h-5" /> Download Certificate
             </button>
          </div>

          <Link href="/training" className="text-brand-teal font-semibold hover:underline">
            Back to Training Center
          </Link>
        </>
      ) : (
        <>
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-2">Keep trying!</h2>
          <p className="text-xl text-slate-600 mb-2">You scored <span className="font-bold text-red-500">{score}%</span>.</p>
          <p className="text-slate-500 mb-8">{quiz.passPercentage}% is required to pass.</p>

          <div className="flex gap-4">
            <button
              onClick={handleRetake}
              className="bg-brand-teal text-white font-bold px-8 py-3 rounded-xl hover:bg-brand-teal/90 transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              Retake Quiz
            </button>
            <Link 
              href={`/training/course/${course.id}`}
              className="px-8 py-3 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 bg-white"
            >
              Review Lessons
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
