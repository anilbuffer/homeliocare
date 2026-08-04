"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Settings,
  Plus,
  GripVertical,
  Trash2,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Shuffle,
  AlertTriangle
} from "lucide-react";

interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "scenario";
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export function QuizBuilder() {
  const [quizTitle, setQuizTitle] = useState("Final Assessment: Infection Control");
  const [passingThreshold, setPassingThreshold] = useState(80);
  const [randomize, setRandomize] = useState(true);
  const [poolSize, setPoolSize] = useState(10);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      type: "multiple-choice",
      text: "Which of the following is the most effective way to prevent the spread of infection?",
      options: ["Wearing gloves at all times", "Hand hygiene", "Wearing a mask", "Isolation of all patients"],
      correctAnswerIndex: 1
    },
    {
      id: "q2",
      type: "true-false",
      text: "Alcohol-based hand rubs are effective against all types of pathogens, including C. difficile spores.",
      options: ["True", "False"],
      correctAnswerIndex: 1
    }
  ]);

  const [expandedQuestion, setExpandedQuestion] = useState<string | null>("q1");

  const handleAddQuestion = (type: "multiple-choice" | "true-false" | "scenario") => {
    const newQ: Question = {
      id: `q${Date.now()}`,
      type,
      text: "",
      options: type === "true-false" ? ["True", "False"] : ["", ""],
      correctAnswerIndex: 0
    };
    setQuestions([...questions, newQ]);
    setExpandedQuestion(newQ.id);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    if (expandedQuestion === id) setExpandedQuestion(null);
  };

  const updateQuestionText = (id: string, text: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
  };

  const updateOption = (qId: string, index: number, text: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions[index] = text;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const setCorrectAnswer = (qId: string, index: number) => {
    setQuestions(questions.map(q => q.id === qId ? { ...q, correctAnswerIndex: index } : q));
  };

  const addOption = (qId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return { ...q, options: [...q.options, ""] };
      }
      return q;
    }));
  };

  const removeOption = (qId: string, index: number) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOptions = q.options.filter((_, i) => i !== index);
        const newCorrect = q.correctAnswerIndex === index ? 0 : (q.correctAnswerIndex > index ? q.correctAnswerIndex - 1 : q.correctAnswerIndex);
        return { ...q, options: newOptions, correctAnswerIndex: newCorrect };
      }
      return q;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 py-3 bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden sticky -top-5 z-20">
        <div>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="text-lg font-semibold text-slate-800 bg-transparent border-none focus:ring-0 p-0 hover:bg-slate-50 rounded"
          />
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
            <span>Linked to: <span className="font-medium text-slate-700">Infection Control V4</span></span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-brand-teal text-white font-semibold rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.04)] shadow-brand-teal/20 hover:bg-brand-teal/90 active:scale-95 transition-all">
            <Save className="w-4 h-4" /> Save Quiz
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content Builder */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-800">Question Bank ({questions.length})</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddQuestion('multiple-choice')}
                  className="px-3 py-2 text-xs font-medium text-brand-teal bg-brand-teal/10 rounded-lg hover:bg-brand-teal/20 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Multiple Choice
                </button>
                <button
                  onClick={() => handleAddQuestion('true-false')}
                  className="px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> True/False
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((q, index) => {
                const isExpanded = expandedQuestion === q.id;
                return (
                  <div key={q.id} className={`border ${isExpanded ? 'border-brand-teal shadow-[0_6px_32px_rgba(0,0,0,0.06)]' : 'border-slate-200 hover:border-slate-300'} rounded-xl bg-white transition-all overflow-hidden`}>

                    {/* Header */}
                    <div
                      className={`flex items-start gap-2 px-4 py-3 cursor-pointer ${isExpanded ? 'bg-slate-50 border-b border-slate-100' : ''}`}
                      onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                    >
                      <div className="mt-1 cursor-grab text-slate-400 hover:text-slate-600" onClick={(e) => e.stopPropagation()}>
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <div className="w-6 h-6 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-semibold shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-800 line-clamp-2">{q.text || "New Question..."}</div>
                        <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{q.type.replace("-", " ")}</div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRemoveQuestion(q.id); }}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="p-1.5 text-slate-400">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    {isExpanded && (
                      <div className="p-4 bg-white">
                        <div className="mb-2 lg:mb-4">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Question Text</label>
                          <textarea
                            value={q.text}
                            onChange={(e) => updateQuestionText(q.id, e.target.value)}
                            placeholder="Enter question prompt..."
                            className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-teal/50 outline-none resize-none min-h-[80px]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Answers</label>
                          <div className="space-y-2">
                            {q.options.map((opt, optIndex) => (
                              <div key={optIndex} className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name={`correct-${q.id}`}
                                  checked={q.correctAnswerIndex === optIndex}
                                  onChange={() => setCorrectAnswer(q.id, optIndex)}
                                  className="w-4 h-4 text-brand-teal focus:ring-brand-teal mt-0.5"
                                  title="Mark as correct answer"
                                />
                                <div className="flex-1 flex items-center relative">
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                                    placeholder={`Option ${optIndex + 1}`}
                                    disabled={q.type === 'true-false'}
                                    className={`w-full border ${q.correctAnswerIndex === optIndex ? 'border-brand-teal bg-brand-teal/5' : 'border-slate-200'} rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-teal/50 outline-none pr-10`}
                                  />
                                  {q.type !== 'true-false' && q.options.length > 2 && (
                                    <button
                                      onClick={() => removeOption(q.id, optIndex)}
                                      className="absolute right-2 p-1 text-slate-400 hover:text-red-500 rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                                {q.correctAnswerIndex === optIndex && (
                                  <span className="text-xs font-bold text-brand-teal uppercase shrink-0">Correct</span>
                                )}
                              </div>
                            ))}
                          </div>

                          {q.type !== 'true-false' && (
                            <button
                              onClick={() => addOption(q.id)}
                              className="mt-3 text-sm font-medium text-brand-teal hover:text-teal-700 flex items-center gap-1"
                            >
                              <Plus className="w-4 h-4" /> Add Option
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Configuration Sidebar */}
        <div className="space-y-4">
          {/* Settings */}
          <div className="bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-4">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4 text-slate-500" />
              Quiz Settings
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Passing Threshold</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="50" max="100" step="5"
                    value={passingThreshold}
                    onChange={(e) => setPassingThreshold(parseInt(e.target.value))}
                    className="flex-1 accent-brand-teal"
                  />
                  <span className="text-sm font-bold text-slate-800 w-12 text-right">{passingThreshold}%</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Learners scoring below this threshold will be required to retake the quiz.</p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={randomize}
                    onChange={(e) => setRandomize(e.target.checked)}
                    className="mt-0.5 rounded text-brand-teal focus:ring-brand-teal"
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      <Shuffle className="w-4 h-4 text-slate-500" /> Randomize Questions
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">Reduces answer-sharing by pulling a random subset from the pool for each learner.</div>
                  </div>
                </label>

                {randomize && (
                  <div className="mt-3 ml-7">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Questions to present (Pool Size)</label>
                    <input
                      type="number"
                      min="1" max={Math.max(questions.length, 10)}
                      value={poolSize}
                      onChange={(e) => setPoolSize(parseInt(e.target.value))}
                      className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-teal/50 outline-none"
                    />
                    {poolSize > questions.length && (
                      <div className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Warning: Pool size exceeds available questions ({questions.length}).
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Analytics Snapshot */}
          <div className="bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden p-4">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              Current Analytics
            </h2>
            <p className="text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
              Historical performance data for this quiz version.
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Average Score</span>
                <span className="text-xs font-semibold text-slate-800">84%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Pass Rate</span>
                <span className="text-xs font-semibold text-emerald-600">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Attempts / Learner</span>
                <span className="text-xs font-semibold text-slate-800">1.2</span>
              </div>

              <div className="pt-3">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">High-Failure Questions</h4>
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                  <p className="text-xs text-slate-700 font-medium line-clamp-2">"Alcohol-based hand rubs are effective against all types of..."</p>
                  <div className="flex justify-between items-center mt-2 text-xs">
                    <span className="text-amber-700 font-semibold">42% Fail Rate</span>
                    <button className="text-amber-600 hover:underline">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
