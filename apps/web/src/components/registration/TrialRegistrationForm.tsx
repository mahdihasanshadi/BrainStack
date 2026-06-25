"use client";

import { useEffect, useId, useState } from "react";
import {
  ApiError,
  getClassSlotDates,
  getClassSlotTimes,
  submitRegistrationLead,
  type ClassSlotTimeOption,
  type CreateRegistrationLeadPayload,
  type Gender,
  type MediumOfInstruction,
  type PreferredLanguage,
} from "@/lib/api";
import { mapApiValidationErrors, type FieldKey } from "./map-api-errors";
import {
  CHILD_AGE_OPTIONS,
  formatDisplayDate,
  formatTimeRange,
  GENDER_OPTIONS,
  isValidEmail,
  isValidPhone,
  MEDIUM_OF_INSTRUCTION_OPTIONS,
  normalizeEmail,
  normalizePhone,
  PREFERRED_LANGUAGE_OPTIONS,
} from "./registration-utils";

type Step = 1 | 2 | 3 | "success";

type FormState = {
  email: string;
  phone: string;
  parentName: string;
  childName: string;
  childAge: number | "";
  mediumOfInstruction: MediumOfInstruction | "";
  gender: Gender | "";
  preferredLanguage: PreferredLanguage | "";
  hasDevice: boolean | "";
  parentalConsent: boolean;
  selectedDate: string;
  classSlotId: string;
};

const INITIAL_FORM: FormState = {
  email: "",
  phone: "",
  parentName: "",
  childName: "",
  childAge: "",
  mediumOfInstruction: "",
  gender: "",
  preferredLanguage: "",
  hasDevice: "",
  parentalConsent: false,
  selectedDate: "",
  classSlotId: "",
};

const STEP_LABELS = ["Contact", "Child details", "Pick a time"] as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="form-error" role="alert">
      {message}
    </p>
  );
}

export function TrialRegistrationForm() {
  const formId = useId();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>(
    {},
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [duplicateMessage, setDuplicateMessage] = useState<string | null>(null);
  const [submittedSlotLabel, setSubmittedSlotLabel] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<ClassSlotTimeOption[]>([]);
  const [datesLoading, setDatesLoading] = useState(false);
  const [timesLoading, setTimesLoading] = useState(false);
  const [datesError, setDatesError] = useState<string | null>(null);
  const [timesError, setTimesError] = useState<string | null>(null);

  const childAgeNumber =
    typeof form.childAge === "number" ? form.childAge : null;

  useEffect(() => {
    if (step !== 3 || childAgeNumber === null) {
      return;
    }

    let cancelled = false;
    setDatesLoading(true);
    setDatesError(null);
    setAvailableDates([]);
    setAvailableSlots([]);
    setForm((current) => ({ ...current, selectedDate: "", classSlotId: "" }));

    getClassSlotDates(childAgeNumber)
      .then((response) => {
        if (cancelled) {
          return;
        }

        setAvailableDates(response.dates);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setDatesError(
          "We couldn't load available dates right now. Go back, confirm your child's age, and try again.",
        );
      })
      .finally(() => {
        if (!cancelled) {
          setDatesLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [step, childAgeNumber]);

  useEffect(() => {
    if (step !== 3 || childAgeNumber === null || !form.selectedDate) {
      setAvailableSlots([]);
      setForm((current) =>
        current.classSlotId ? { ...current, classSlotId: "" } : current,
      );
      return;
    }

    let cancelled = false;
    setTimesLoading(true);
    setTimesError(null);
    setAvailableSlots([]);
    setForm((current) => ({ ...current, classSlotId: "" }));

    getClassSlotTimes(childAgeNumber, form.selectedDate)
      .then((response) => {
        if (cancelled) {
          return;
        }

        setAvailableSlots(response.slots);
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return;
        }

        const message =
          error instanceof ApiError
            ? error.message
            : "We couldn't load times for that date. Pick another date or try again.";

        setTimesError(message);
      })
      .finally(() => {
        if (!cancelled) {
          setTimesLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [step, childAgeNumber, form.selectedDate]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      if (!(key in current)) {
        return current;
      }

      const next = { ...current };
      delete next[key as FieldKey];
      return next;
    });
    setFormError(null);
    setDuplicateMessage(null);
  }

  function validateStep1(): boolean {
    const errors: Partial<Record<FieldKey, string>> = {};

    if (!form.email.trim()) {
      errors.email = "Enter your email address.";
    } else if (!isValidEmail(form.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      errors.phone = "Enter your phone number.";
    } else if (!isValidPhone(form.phone)) {
      errors.phone = "Enter a valid phone number (at least 10 digits).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validateStep2(): boolean {
    const errors: Partial<Record<FieldKey, string>> = {};

    if (!form.parentName.trim()) {
      errors.parentName = "Enter the parent or guardian name.";
    }

    if (!form.childName.trim()) {
      errors.childName = "Enter your child's name.";
    }

    if (form.childAge === "") {
      errors.childAge = "Select your child's age.";
    }

    if (!form.mediumOfInstruction) {
      errors.mediumOfInstruction = "Select a medium of instruction.";
    }

    if (!form.gender) {
      errors.gender = "Select your child's gender.";
    }

    if (!form.preferredLanguage) {
      errors.preferredLanguage = "Select a preferred language for classes.";
    }

    if (form.hasDevice === "") {
      errors.hasDevice = "Tell us whether your child has a device for class.";
    }

    if (!form.parentalConsent) {
      errors.parentalConsent =
        "You must confirm you are the parent or guardian and consent to this registration.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validateStep3(): boolean {
    const errors: Partial<Record<FieldKey, string>> = {};

    if (!form.selectedDate) {
      errors.selectedDate = "Pick a trial class date.";
    }

    if (!form.classSlotId) {
      errors.classSlotId = "Pick a trial class time.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function goToStep(nextStep: 1 | 2 | 3) {
    setStep(nextStep);
    setFormError(null);
    setDuplicateMessage(null);
  }

  function handleNextFromStep1(event: React.FormEvent) {
    event.preventDefault();
    if (validateStep1()) {
      goToStep(2);
    }
  }

  function handleNextFromStep2(event: React.FormEvent) {
    event.preventDefault();
    if (validateStep2()) {
      goToStep(3);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError(null);
    setDuplicateMessage(null);

    if (!validateStep3() || childAgeNumber === null) {
      return;
    }

    if (
      !form.mediumOfInstruction ||
      !form.gender ||
      !form.preferredLanguage ||
      form.hasDevice === ""
    ) {
      goToStep(2);
      return;
    }

    const payload: CreateRegistrationLeadPayload = {
      parentName: form.parentName.trim(),
      email: normalizeEmail(form.email),
      phone: normalizePhone(form.phone),
      childName: form.childName.trim(),
      childAge: childAgeNumber,
      mediumOfInstruction: form.mediumOfInstruction,
      gender: form.gender,
      preferredLanguage: form.preferredLanguage,
      hasDevice: form.hasDevice,
      classSlotId: form.classSlotId,
      parentalConsent: true,
    };

    setIsSubmitting(true);

    try {
      const selectedSlot = availableSlots.find(
        (slot) => slot.id === form.classSlotId,
      );
      await submitRegistrationLead(payload);
      setSubmittedSlotLabel(
        selectedSlot
          ? formatTimeRange(selectedSlot.startTime, selectedSlot.endTime)
          : null,
      );
      setStep("success");
      setFieldErrors({});
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          setDuplicateMessage(error.message);
          return;
        }

        if (error.status === 400) {
          const mapped = mapApiValidationErrors(
            error.body?.message ?? error.message,
          );
          setFieldErrors(mapped.fields);
          setStep(mapped.step);
          setFormError(mapped.general ?? null);
          return;
        }
      }

      setFormError(
        "Something went wrong while submitting your registration. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === "success") {
    return (
      <div
        className="p-8 text-center sm:p-10"
        role="status"
      >
        <span aria-hidden="true" className="text-5xl">
          🎉
        </span>
        <p className="eyebrow mx-auto mt-6">Registration received</p>
        <h2 className="mt-4 font-display text-xl font-bold text-content sm:text-2xl">
          Your free trial class is booked!
        </h2>
        <p className="mt-4 text-lg text-content-muted">
          Thanks, {form.parentName.trim()}. We&apos;ve saved your registration
          for {form.childName.trim()} and will follow up at{" "}
          {normalizeEmail(form.email)} with class details.
        </p>
        {form.selectedDate ? (
          <p className="mt-3 text-base text-content">
            Selected slot:{" "}
            <span className="font-semibold">
              {formatDisplayDate(form.selectedDate)}
            </span>
            {submittedSlotLabel ? <> at {submittedSlotLabel}</> : null}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <nav aria-label="Registration progress">
        <ol className="grid gap-3 sm:grid-cols-3">
          {STEP_LABELS.map((label, index) => {
            const stepNumber = (index + 1) as 1 | 2 | 3;
            const isActive = step === stepNumber;
            const isComplete = step > stepNumber;

            return (
              <li
                key={label}
                className={
                  isActive
                    ? "step-pill-active"
                    : isComplete
                      ? "step-pill-done"
                      : "step-pill-idle"
                }
                aria-current={isActive ? "step" : undefined}
              >
                <p className="font-display text-xs uppercase tracking-widest font-bold uppercase tracking-wider text-content-faint">
                  Step {stepNumber}
                  {isComplete ? (
                    <span aria-hidden="true" className="ml-1 text-content">
                      ✓
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 font-display text-sm font-bold text-content">
                  {label}
                </p>
              </li>
            );
          })}
        </ol>
      </nav>

      {duplicateMessage ? (
        <div
          className="mt-6 rounded-xl border border-brand-yellow-light/30 bg-brand-yellow-light/10 px-4 py-3 text-base text-content"
          role="alert"
          aria-live="polite"
        >
          {duplicateMessage}
        </div>
      ) : null}

      {formError ? (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-base text-content" role="alert">
          {formError}
        </div>
      ) : null}

      {step === 1 ? (
        <form
          id={`${formId}-step-1`}
          className="mt-8 space-y-5"
          onSubmit={handleNextFromStep1}
          noValidate
        >
          <fieldset className="space-y-5">
            <legend className="font-display text-xl font-bold text-content">
              How can we reach you? 📱
            </legend>

            <div>
              <label htmlFor={`${formId}-email`} className="form-label">
                Email address
              </label>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                className="form-input"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={
                  fieldErrors.email ? `${formId}-email-error` : undefined
                }
              />
              <FieldError
                id={`${formId}-email-error`}
                message={fieldErrors.email}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-phone`} className="form-label">
                Phone number
              </label>
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                className="form-input"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={
                  fieldErrors.phone ? `${formId}-phone-error` : undefined
                }
              />
              <FieldError
                id={`${formId}-phone-error`}
                message={fieldErrors.phone}
              />
              <p className="form-hint">
                Use the number where we can call or message you about the trial
                class.
              </p>
            </div>
          </fieldset>

          <div className="flex justify-end">
            <button type="submit" className="btn-primary w-full sm:w-auto">
              Continue to child details
            </button>
          </div>
        </form>
      ) : null}

      {step === 2 ? (
        <form
          id={`${formId}-step-2`}
          className="mt-8 space-y-5"
          onSubmit={handleNextFromStep2}
          noValidate
        >
          <fieldset className="space-y-5">
            <legend className="font-display text-xl font-bold text-content">
              Tell us about your child 🌟
            </legend>

            <div>
              <label htmlFor={`${formId}-parentName`} className="form-label">
                Parent or guardian name
              </label>
              <input
                id={`${formId}-parentName`}
                name="parentName"
                type="text"
                autoComplete="name"
                className="form-input"
                value={form.parentName}
                onChange={(event) =>
                  updateField("parentName", event.target.value)
                }
                aria-invalid={Boolean(fieldErrors.parentName)}
                aria-describedby={
                  fieldErrors.parentName
                    ? `${formId}-parentName-error`
                    : undefined
                }
              />
              <FieldError
                id={`${formId}-parentName-error`}
                message={fieldErrors.parentName}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-childName`} className="form-label">
                Child&apos;s name
              </label>
              <input
                id={`${formId}-childName`}
                name="childName"
                type="text"
                autoComplete="off"
                className="form-input"
                value={form.childName}
                onChange={(event) =>
                  updateField("childName", event.target.value)
                }
                aria-invalid={Boolean(fieldErrors.childName)}
                aria-describedby={
                  fieldErrors.childName
                    ? `${formId}-childName-error`
                    : undefined
                }
              />
              <FieldError
                id={`${formId}-childName-error`}
                message={fieldErrors.childName}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-childAge`} className="form-label">
                Child&apos;s age
              </label>
              <select
                id={`${formId}-childAge`}
                name="childAge"
                className="form-select"
                value={form.childAge === "" ? "" : String(form.childAge)}
                onChange={(event) =>
                  updateField(
                    "childAge",
                    event.target.value === ""
                      ? ""
                      : Number(event.target.value),
                  )
                }
                aria-invalid={Boolean(fieldErrors.childAge)}
                aria-describedby={
                  fieldErrors.childAge ? `${formId}-childAge-error` : undefined
                }
              >
                <option value="">Select age (6–14)</option>
                {CHILD_AGE_OPTIONS.map((age) => (
                  <option key={age} value={age}>
                    {age} years old
                  </option>
                ))}
              </select>
              <FieldError
                id={`${formId}-childAge-error`}
                message={fieldErrors.childAge}
              />
            </div>

            <div>
              <label
                htmlFor={`${formId}-mediumOfInstruction`}
                className="form-label"
              >
                Medium of instruction at school
              </label>
              <select
                id={`${formId}-mediumOfInstruction`}
                name="mediumOfInstruction"
                className="form-select"
                value={form.mediumOfInstruction}
                onChange={(event) =>
                  updateField(
                    "mediumOfInstruction",
                    event.target.value as MediumOfInstruction,
                  )
                }
                aria-invalid={Boolean(fieldErrors.mediumOfInstruction)}
                aria-describedby={
                  fieldErrors.mediumOfInstruction
                    ? `${formId}-mediumOfInstruction-error`
                    : undefined
                }
              >
                <option value="">Select medium</option>
                {MEDIUM_OF_INSTRUCTION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FieldError
                id={`${formId}-mediumOfInstruction-error`}
                message={fieldErrors.mediumOfInstruction}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${formId}-gender`} className="form-label">
                  Gender
                </label>
                <select
                  id={`${formId}-gender`}
                  name="gender"
                  className="form-select"
                  value={form.gender}
                  onChange={(event) =>
                    updateField("gender", event.target.value as Gender)
                  }
                  aria-invalid={Boolean(fieldErrors.gender)}
                  aria-describedby={
                    fieldErrors.gender ? `${formId}-gender-error` : undefined
                  }
                >
                  <option value="">Select gender</option>
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FieldError
                  id={`${formId}-gender-error`}
                  message={fieldErrors.gender}
                />
              </div>

              <div>
                <label
                  htmlFor={`${formId}-preferredLanguage`}
                  className="form-label"
                >
                  Preferred class language
                </label>
                <select
                  id={`${formId}-preferredLanguage`}
                  name="preferredLanguage"
                  className="form-select"
                  value={form.preferredLanguage}
                  onChange={(event) =>
                    updateField(
                      "preferredLanguage",
                      event.target.value as PreferredLanguage,
                    )
                  }
                  aria-invalid={Boolean(fieldErrors.preferredLanguage)}
                  aria-describedby={
                    fieldErrors.preferredLanguage
                      ? `${formId}-preferredLanguage-error`
                      : undefined
                  }
                >
                  <option value="">Select language</option>
                  {PREFERRED_LANGUAGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FieldError
                  id={`${formId}-preferredLanguage-error`}
                  message={fieldErrors.preferredLanguage}
                />
              </div>
            </div>

            <fieldset>
              <legend className="form-label">
                Does your child have a laptop, tablet, or computer for class?
              </legend>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-6">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasDevice"
                    value="yes"
                    checked={form.hasDevice === true}
                    onChange={() => updateField("hasDevice", true)}
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasDevice"
                    value="no"
                    checked={form.hasDevice === false}
                    onChange={() => updateField("hasDevice", false)}
                  />
                  <span>No</span>
                </label>
              </div>
              <FieldError
                id={`${formId}-hasDevice-error`}
                message={fieldErrors.hasDevice}
              />
              {form.hasDevice === false ? (
                <p className="form-warning" role="note">
                  Live classes need a device with a screen, keyboard or touch
                  input, and a stable internet connection. You can still book a
                  trial, but your child may not be able to participate fully
                  without one.
                </p>
              ) : null}
            </fieldset>

            <div className="rounded-xl border border-border bg-surface-muted/50 px-4 py-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="parentalConsent"
                  checked={form.parentalConsent}
                  onChange={(event) =>
                    updateField("parentalConsent", event.target.checked)
                  }
                  aria-invalid={Boolean(fieldErrors.parentalConsent)}
                  aria-describedby={
                    fieldErrors.parentalConsent
                      ? `${formId}-parentalConsent-error`
                      : `${formId}-parentalConsent-hint`
                  }
                  className="mt-1 h-4 w-4 rounded border-border text-brand-green focus-visible:ring-brand-green"
                />
                <span className="text-sm text-content">
                  I am this child&apos;s parent or legal guardian and I consent
                  to BrainStack contacting me about this trial class
                  registration.
                </span>
              </label>
              <p id={`${formId}-parentalConsent-hint`} className="sr-only">
                Required before you can submit the registration.
              </p>
              <FieldError
                id={`${formId}-parentalConsent-error`}
                message={fieldErrors.parentalConsent}
              />
            </div>
          </fieldset>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              className="btn-secondary w-full sm:w-auto"
              onClick={() => goToStep(1)}
            >
              Back
            </button>
            <button type="submit" className="btn-primary w-full sm:w-auto">
              Continue to pick a time
            </button>
          </div>
        </form>
      ) : null}

      {step === 3 ? (
        <form
          id={`${formId}-step-3`}
          className="mt-8 space-y-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset className="space-y-5">
            <legend className="font-display text-xl font-bold text-content">
              Pick a trial class time 📅
            </legend>

            <div>
              <label htmlFor={`${formId}-selectedDate`} className="form-label">
                Trial class date
              </label>
              <select
                id={`${formId}-selectedDate`}
                name="selectedDate"
                className="form-select"
                value={form.selectedDate}
                onChange={(event) =>
                  updateField("selectedDate", event.target.value)
                }
                disabled={
                  childAgeNumber === null || datesLoading || Boolean(datesError)
                }
                aria-invalid={Boolean(fieldErrors.selectedDate)}
                aria-describedby={
                  fieldErrors.selectedDate
                    ? `${formId}-selectedDate-error`
                    : `${formId}-selectedDate-hint`
                }
              >
                <option value="">
                  {childAgeNumber === null
                    ? "Enter your child's age in step 2 first"
                    : datesLoading
                      ? "Loading available dates…"
                      : datesError
                        ? "Dates unavailable"
                        : availableDates.length === 0
                          ? "No dates available for this age"
                          : "Select a date"}
                </option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {formatDisplayDate(date)}
                  </option>
                ))}
              </select>
              <p id={`${formId}-selectedDate-hint`} className="form-hint">
                Dates shown match live class schedules for age{" "}
                {childAgeNumber ?? "—"}.
              </p>
              <FieldError
                id={`${formId}-selectedDate-error`}
                message={fieldErrors.selectedDate ?? datesError ?? undefined}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-classSlotId`} className="form-label">
                Trial class time
              </label>
              <select
                id={`${formId}-classSlotId`}
                name="classSlotId"
                className="form-select"
                value={form.classSlotId}
                onChange={(event) =>
                  updateField("classSlotId", event.target.value)
                }
                disabled={
                  !form.selectedDate ||
                  timesLoading ||
                  Boolean(timesError) ||
                  availableSlots.length === 0
                }
                aria-invalid={Boolean(fieldErrors.classSlotId)}
                aria-describedby={
                  fieldErrors.classSlotId
                    ? `${formId}-classSlotId-error`
                    : `${formId}-classSlotId-hint`
                }
              >
                <option value="">
                  {!form.selectedDate
                    ? "Pick a date first"
                    : timesLoading
                      ? "Loading available times…"
                      : timesError
                        ? "Times unavailable for this date"
                        : availableSlots.length === 0
                          ? "No times available for this date"
                          : "Select a time"}
                </option>
                {availableSlots.map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {formatTimeRange(slot.startTime, slot.endTime)}
                  </option>
                ))}
              </select>
              <p id={`${formId}-classSlotId-hint`} className="form-hint">
                Times appear after you choose a date.
              </p>
              <FieldError
                id={`${formId}-classSlotId-error`}
                message={fieldErrors.classSlotId ?? timesError ?? undefined}
              />
            </div>
          </fieldset>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              className="btn-secondary w-full sm:w-auto"
              onClick={() => goToStep(2)}
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn-primary w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting…" : "Submit registration"}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
