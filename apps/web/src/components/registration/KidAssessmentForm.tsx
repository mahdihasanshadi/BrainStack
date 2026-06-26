"use client";

import { useState } from "react";
import Link from "next/link";
import { ApiError, submitKidAssessment, type KidAssessmentResult } from "@/lib/api";
import { CHILD_AGE_OPTIONS } from "./registration-utils";

const QUESTIONS = [
  {
    id: "q1",
    question: "Does your child enjoy solving puzzles or brain teasers?",
    options: [
      { value: "yes", label: "Yes, loves them" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "Not really" },
    ],
  },
  {
    id: "q2",
    question: "Can they follow step-by-step instructions?",
    options: [
      { value: "confident", label: "Very well" },
      { value: "neutral", label: "With help" },
      { value: "no", label: "Struggles often" },
    ],
  },
  {
    id: "q3",
    question: "Do they use a tablet or computer comfortably?",
    options: [
      { value: "yes", label: "Yes, confidently" },
      { value: "sometimes", label: "Basic use" },
      { value: "no", label: "Rarely" },
    ],
  },
  {
    id: "q4",
    question: "Are they curious about how games or apps work?",
    options: [
      { value: "often", label: "Very curious" },
      { value: "sometimes", label: "A little" },
      { value: "no", label: "Not yet" },
    ],
  },
  {
    id: "q5",
    question: "Can they stick with a fun activity for 20–30 minutes?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "Short attention span" },
    ],
  },
] as const;

export function KidAssessmentForm() {
  const [childAge, setChildAge] = useState<number | "">("");
  const [parentEmail, setParentEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<KidAssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  async function handleNext() {
    if (!answers[currentQuestion.id]) {
      setError("Please select an answer.");
      return;
    }
    setError(null);

    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }

    if (childAge === "") {
      setError("Select your child's age.");
      return;
    }

    setSubmitting(true);
    try {
      const assessment = await submitKidAssessment({
        parentEmail: parentEmail.trim() || undefined,
        childAge: childAge as number,
        answers,
      });
      setResult(assessment);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to submit assessment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    const levelLabel = {
      developing: "Building foundations",
      ready: "Ready to start",
      advanced: "Excellent fit",
    }[result.readinessLevel];

    return (
      <div className="text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/15 text-2xl font-bold text-brand-green">
          {result.score}/{result.maxScore}
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold text-content">
          {levelLabel}
        </h2>
        <p className="mt-4 text-content-muted">{result.recommendation}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/checkout/${result.suggestedCourseSlug}`}
            className="btn-primary"
          >
            Enroll in course
          </Link>
          <Link href="/webinar" className="btn-secondary">
            Join parent meeting
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {step === 0 ? (
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="assessmentAge" className="form-label">
              Child&apos;s age
            </label>
            <select
              id="assessmentAge"
              className="form-select"
              value={childAge}
              onChange={(e) =>
                setChildAge(e.target.value ? Number(e.target.value) : "")
              }
            >
              <option value="">Select age</option>
              {CHILD_AGE_OPTIONS.map((age) => (
                <option key={age} value={age}>
                  {age} years
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="assessmentEmail" className="form-label">
              Parent email <span className="text-content-faint">(optional)</span>
            </label>
            <input
              id="assessmentEmail"
              type="email"
              className="form-input"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
            />
          </div>
        </div>
      ) : null}

      <div className="mb-4 flex gap-2">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-pill ${
              i <= step ? "bg-brand-green" : "bg-border"
            }`}
          />
        ))}
      </div>

      <h2 className="font-display text-xl font-bold text-content">
        {currentQuestion.question}
      </h2>

      <div className="mt-6 space-y-3">
        {currentQuestion.options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
              answers[currentQuestion.id] === option.value
                ? "border-brand-green bg-brand-green/5"
                : "border-border hover:border-brand-green/30"
            }`}
          >
            <input
              type="radio"
              name={currentQuestion.id}
              value={option.value}
              checked={answers[currentQuestion.id] === option.value}
              onChange={() =>
                setAnswers({ ...answers, [currentQuestion.id]: option.value })
              }
              className="h-4 w-4 text-brand-green"
            />
            <span className="text-sm font-medium text-content">{option.label}</span>
          </label>
        ))}
      </div>

      {error ? <p className="form-error mt-4">{error}</p> : null}

      <div className="mt-8 flex gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="btn-secondary"
          >
            Back
          </button>
        ) : null}
        <button
          type="button"
          onClick={handleNext}
          disabled={submitting}
          className="btn-primary flex-1"
        >
          {submitting ? "Analyzing…" : isLast ? "See results" : "Next"}
        </button>
      </div>
    </div>
  );
}
