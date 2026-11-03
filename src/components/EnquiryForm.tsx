"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { COUNTRIES, countryByCode } from "@/data/countries";
import { courseById } from "@/lib/courses";
import { CourseOptions } from "./CourseOptions";
import { CONTACT, LINKS } from "@/data/site";
import {
  ENQUIRY_FIELDS,
  captureUtm,
  validateEnquiry,
  validateField,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryInput,
} from "@/lib/enquiry";
import { ENQUIRE_EVENT, cn } from "@/lib/utils";
import { postJson } from "@/lib/post-json";

const INITIAL: EnquiryInput = { fullName: "", email: "", country: "MY", whatsapp: "", programme: "", consent: false, company: "" };

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryInput>(INITIAL);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedProgramme, setSubmittedProgramme] = useState("");
  const refs = useRef<Partial<Record<EnquiryField, HTMLInputElement | HTMLSelectElement | null>>>({});
  const successRef = useRef<HTMLDivElement>(null);

  // "Enquire" buttons on programme cards pre-select the programme.
  useEffect(() => {
    const onEnquire = (e: Event) => {
      const id = (e as CustomEvent<string | undefined>).detail;
      setStatus((s) => (s === "success" ? "idle" : s));
      if (id && courseById(id)) {
        setValues((v) => ({ ...v, programme: id }));
        setErrors((er) => ({ ...er, programme: undefined }));
      }
      window.setTimeout(() => refs.current.fullName?.focus({ preventScroll: true }), 450);
    };
    window.addEventListener(ENQUIRE_EVENT, onEnquire);
    return () => window.removeEventListener(ENQUIRE_EVENT, onEnquire);
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  // Remember campaign tags from the landing page so they reach the admissions portal.
  useEffect(() => {
    captureUtm();
  }, []);

  const update = (field: Exclude<keyof EnquiryInput, "consent">, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (field !== "company" && touched[field]) {
      setErrors((er) => ({ ...er, [field]: validateField(field, next) }));
    }
  };

  const blur = (field: EnquiryField) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((er) => ({ ...er, [field]: validateField(field, values) }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateEnquiry(values);
    setErrors(errs);
    setTouched(Object.fromEntries(ENQUIRY_FIELDS.map((f) => [f, true])));
    const firstInvalid = ENQUIRY_FIELDS.find((f) => errs[f]);
    if (firstInvalid) {
      refs.current[firstInvalid]?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const { res, data } = await postJson<{ ok: boolean; error: string; errors: EnquiryErrors }>("/api/enquiry", {
        ...values,
        ...captureUtm(),
        pageUrl: window.location.href,
      });
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error ?? "Something went wrong.");
      }
      setSubmittedName(values.fullName.trim().split(/\s+/)[0] ?? "");
      setSubmittedProgramme(courseById(values.programme)?.title ?? "");
      setStatus("success");
      setValues(INITIAL);
      setTouched({});
      setErrors({});
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const dial = countryByCode(values.country)?.dial ?? "";

  const fieldProps = (field: EnquiryField) => ({
    id: `enq-${field}`,
    name: field,
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `enq-${field}-error` : undefined,
    onBlur: () => blur(field),
  });

  return (
    <div className="card relative overflow-hidden p-6 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            ref={successRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[520px] flex-col items-center justify-center text-center focus:outline-none"
          >
            <motion.span
              initial={{ scale: 0.4, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary text-white shadow-glow"
            >
              <CheckCircle2 aria-hidden className="h-10 w-10" />
            </motion.span>
            <h3 className="mt-6 text-2xl font-extrabold sm:text-3xl">
              Thank you{submittedName ? `, ${submittedName}` : ""}!
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-neutral-600">
              We&apos;ve received your enquiry
              {submittedProgramme ? (
                <>
                  {" "}about <strong className="text-brand-dark">{submittedProgramme}</strong>
                </>
              ) : null}
              . Our admissions team will be in touch by email or WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={LINKS.eligibility} className="btn btn-primary btn-sm">
                Check Eligibility
                <ArrowRight aria-hidden className="h-4 w-4" />
              </a>
              <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary btn-sm">
                Send another enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-labelledby="enquiry-form-title"
          >
            <h3 id="enquiry-form-title" className="text-2xl font-extrabold">
              Request programme information
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              All fields are required.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" htmlFor="enq-fullName" error={errors.fullName} className="sm:col-span-2">
                <input
                  {...fieldProps("fullName")}
                  ref={(el) => {
                    refs.current.fullName = el;
                  }}
                  type="text"
                  autoComplete="name"
                  value={values.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="As per your IC / passport"
                  className="field-input"
                />
              </Field>

              <Field label="Email" htmlFor="enq-email" error={errors.email} className="sm:col-span-2">
                <input
                  {...fieldProps("email")}
                  ref={(el) => {
                    refs.current.email = el;
                  }}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="name@example.com"
                  className="field-input"
                />
              </Field>

              <Field label="Country" htmlFor="enq-country" error={errors.country}>
                <SelectWrap>
                  <select
                    {...fieldProps("country")}
                    ref={(el) => {
                      refs.current.country = el;
                    }}
                    autoComplete="country"
                    value={values.country}
                    onChange={(e) => update("country", e.target.value)}
                    className="field-input cursor-pointer appearance-none pr-10"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                        {c.dial ? ` (${c.dial})` : ""}
                      </option>
                    ))}
                  </select>
                </SelectWrap>
              </Field>

              <Field label="WhatsApp Number" htmlFor="enq-whatsapp" error={errors.whatsapp}>
                <div className="flex">
                  <span
                    aria-hidden
                    className="inline-flex min-w-[64px] items-center justify-center rounded-l-xl border border-r-0 border-neutral-300 bg-neutral-50 px-3 text-[15px] font-semibold text-neutral-700"
                  >
                    {dial || "+"}
                  </span>
                  <input
                    {...fieldProps("whatsapp")}
                    ref={(el) => {
                      refs.current.whatsapp = el;
                    }}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    aria-label={`WhatsApp Number${dial ? `, country code ${dial}` : ", include country code"}`}
                    value={values.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                    placeholder={dial ? "12 345 6789" : "Country code + number"}
                    className="field-input rounded-l-none"
                  />
                </div>
              </Field>

              <Field label="Programme of Interest" htmlFor="enq-programme" error={errors.programme} className="sm:col-span-2">
                <SelectWrap>
                  <select
                    {...fieldProps("programme")}
                    ref={(el) => {
                      refs.current.programme = el;
                    }}
                    value={values.programme}
                    onChange={(e) => update("programme", e.target.value)}
                    className={cn("field-input cursor-pointer appearance-none pr-10", !values.programme && "text-neutral-500")}
                  >
                    <CourseOptions />
                  </select>
                </SelectWrap>
              </Field>

              <div className="sm:col-span-2">
                <label htmlFor="enq-consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-neutral-700">
                  <input
                    id="enq-consent"
                    name="consent"
                    type="checkbox"
                    ref={(el) => {
                      refs.current.consent = el;
                    }}
                    checked={values.consent}
                    onChange={(e) => {
                      const next = { ...values, consent: e.target.checked };
                      setValues(next);
                      setTouched((t) => ({ ...t, consent: true }));
                      setErrors((er) => ({ ...er, consent: validateField("consent", next) }));
                    }}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? "enq-consent-error" : undefined}
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-neutral-300 accent-brand-primary"
                  />
                  <span>
                    I agree to Lincoln University College contacting me by email, phone or WhatsApp about my enquiry, and to the processing of my
                    personal data under the{" "}
                    <a href={LINKS.privacy} className="font-semibold text-brand-deep underline underline-offset-2">
                      Privacy Policy
                    </a>{" "}
                    (PDPA 2010).
                  </span>
                </label>
                <AnimatePresence initial={false}>
                  {errors.consent && (
                    <motion.p
                      id="enq-consent-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-1.5 pl-8 pt-2 text-sm font-medium text-brand-deep"
                    >
                      <AlertCircle aria-hidden className="h-4 w-4 shrink-0" />
                      {errors.consent}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Honeypot — hidden from people and assistive tech */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="enq-company">Company</label>
                <input
                  id="enq-company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </div>
            </div>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 flex items-start gap-3 rounded-xl bg-brand-light p-4 text-sm text-brand-deep"
                >
                  <AlertCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    {serverError} Please try again, or email us at{" "}
                    <a href={CONTACT.email.href} className="font-semibold underline underline-offset-2">
                      {CONTACT.email.label}
                    </a>
                    .
                  </span>
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit" disabled={status === "submitting"} className="btn btn-primary mt-8 h-14 w-full text-base">
              {status === "submitting" ? (
                <>
                  <Loader2 aria-hidden className="h-5 w-5 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Submit Enquiry
                  <Send aria-hidden className="h-4 w-4" />
                </>
              )}
            </button>

          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-brand-dark">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${htmlFor}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 pt-2 text-sm font-medium text-brand-deep"
          >
            <AlertCircle aria-hidden className="h-4 w-4 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
    </div>
  );
}
