"use client";

import { useState } from "react";
import Link from "next/link";
import { ApiError, submitParentMeetingLead } from "@/lib/api";
import {
  CHILD_AGE_OPTIONS,
  isValidEmail,
  isValidPhone,
  normalizeEmail,
  normalizePhone,
} from "./registration-utils";

type FormState = {
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: number | "";
  questions: string;
  consent: boolean;
};

const INITIAL: FormState = {
  parentName: "",
  email: "",
  phone: "",
  childName: "",
  childAge: "",
  questions: "",
  consent: false,
};

export function ParentMeetingForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.parentName.trim()) next.parentName = "Your name is required.";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (!isValidPhone(form.phone)) next.phone = "Enter a valid phone number.";
    if (form.childAge === "") next.childAge = "Select your child's age.";
    if (!form.consent) next.consent = "Please confirm to register.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setSubmitting(true);

    try {
      await submitParentMeetingLead({
        parentName: form.parentName.trim(),
        email: normalizeEmail(form.email),
        phone: normalizePhone(form.phone),
        childName: form.childName.trim() || undefined,
        childAge: form.childAge as number,
        questions: form.questions.trim() || undefined,
        consent: true,
      });
      setSuccess(true);
    } catch (error) {
      setApiError(
        error instanceof ApiError
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/15 text-3xl">
          ✓
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold text-content">
          You&apos;re registered!
        </h2>
        <p className="mt-3 text-content-muted">
          We&apos;ll email you before each monthly parent meeting with the link,
          agenda, and Q&amp;A details.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/assessment" className="btn-primary">
            Take kid readiness quiz
          </Link>
          <Link href="/programs" className="btn-secondary">
            View our course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {apiError ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {apiError}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="parentName" className="form-label">
            Parent / guardian name
          </label>
          <input
            id="parentName"
            className="form-input"
            value={form.parentName}
            onChange={(e) => setForm({ ...form, parentName: e.target.value })}
            autoComplete="name"
          />
          {errors.parentName ? <p className="form-error">{errors.parentName}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
          />
          {errors.email ? <p className="form-error">{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="phone" className="form-label">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            className="form-input"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone ? <p className="form-error">{errors.phone}</p> : null}
        </div>

        <div>
          <label htmlFor="childName" className="form-label">
            Child&apos;s name <span className="text-content-faint">(optional)</span>
          </label>
          <input
            id="childName"
            className="form-input"
            value={form.childName}
            onChange={(e) => setForm({ ...form, childName: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="childAge" className="form-label">
            Child&apos;s age
          </label>
          <select
            id="childAge"
            className="form-select"
            value={form.childAge}
            onChange={(e) =>
              setForm({
                ...form,
                childAge: e.target.value ? Number(e.target.value) : "",
              })
            }
          >
            <option value="">Select age</option>
            {CHILD_AGE_OPTIONS.map((age) => (
              <option key={age} value={age}>
                {age} years
              </option>
            ))}
          </select>
          {errors.childAge ? <p className="form-error">{errors.childAge}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="questions" className="form-label">
            Questions for the Q&amp;A <span className="text-content-faint">(optional)</span>
          </label>
          <textarea
            id="questions"
            rows={3}
            className="form-input resize-none"
            value={form.questions}
            onChange={(e) => setForm({ ...form, questions: e.target.value })}
            placeholder="What would you like us to cover in the monthly meeting?"
          />
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-border bg-surface-muted/50 p-4">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-1 h-4 w-4 rounded border-border text-brand-green focus:ring-brand-green"
        />
        <span className="text-sm text-content-muted">
          I agree to receive monthly parent meeting invitations and updates from
          BrainStack. Free registration — no payment required.
        </span>
      </label>
      {errors.consent ? <p className="form-error">{errors.consent}</p> : null}

      <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base">
        {submitting ? "Registering…" : "Register for free parent meeting"}
      </button>
    </form>
  );
}
