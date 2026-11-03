"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { COUNTRIES, countryByCode } from "@/data/countries";
import { courseById } from "@/lib/courses";
import { CourseOptions } from "./CourseOptions";
import { CONTACT, LINKS } from "@/data/site";
import {
  SERVICE_FORMS,
  validateService,
  validateServiceField,
  type ServiceErrors,
  type ServiceField,
  type ServiceKind,
  type ServiceValues,
} from "@/lib/service-request";
import { cn } from "@/lib/utils";
import { postJson } from "@/lib/post-json";
import { captureUtm } from "@/lib/enquiry";

type Status = "idle" | "submitting" | "success" | "error";

function initialValues(kind: ServiceKind): ServiceValues {
  const v: ServiceValues = { company: "" };
  for (const f of SERVICE_FORMS[kind].fields) v[f.name] = f.type === "country" ? "MY" : "";
  return v;
}

/** One form component for every student service. Fields come from `SERVICE_FORMS[kind]`. */
export function ServiceForm({ kind }: { kind: ServiceKind }) {
  const form = SERVICE_FORMS[kind];
  const [values, setValues] = useState<ServiceValues>(() => initialValues(kind));
  const [errors, setErrors] = useState<ServiceErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const refs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>({});
  const successRef = useRef<HTMLDivElement>(null);
  const idp = `svc-${kind}`;

  // Pre-select a programme from ?programme=<id> (used by programme pages).
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("programme");
    if (id && courseById(id) && form.fields.some((f) => f.type === "programme")) {
      setValues((v) => ({ ...v, programme: id }));
    }
  }, [form.fields]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update = (f: ServiceField, value: string) => {
    const next = { ...values, [f.name]: value };
    setValues(next);
    if (touched[f.name]) setErrors((er) => ({ ...er, [f.name]: validateServiceField(f, next) }));
  };

  const blur = (f: ServiceField) => {
    setTouched((t) => ({ ...t, [f.name]: true }));
    setErrors((er) => ({ ...er, [f.name]: validateServiceField(f, values) }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateService(kind, values);
    setErrors(errs);
    setTouched(Object.fromEntries(form.fields.map((f) => [f.name, true])));
    const firstInvalid = form.fields.find((f) => errs[f.name]);
    if (firstInvalid) {
      refs.current[firstInvalid.name]?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const { res, data } = await postJson<{ ok: boolean; error: string; errors: ServiceErrors }>("/api/service-request", {
        service: kind,
        ...values,
        ...captureUtm(),
        pageUrl: window.location.href,
      });
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error ?? "Something went wrong.");
      }
      setStatus("success");
      setValues(initialValues(kind));
      setTouched({});
      setErrors({});
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const dial = countryByCode(values.country ?? "")?.dial ?? "";

  const common = (f: ServiceField) => ({
    id: `${idp}-${f.name}`,
    name: f.name,
    required: f.required,
    "aria-invalid": Boolean(errors[f.name]),
    "aria-describedby": errors[f.name] ? `${idp}-${f.name}-error` : f.hint ? `${idp}-${f.name}-hint` : undefined,
    onBlur: () => blur(f),
    ref: (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null) => {
      refs.current[f.name] = el;
    },
  });

  const control = (f: ServiceField) => {
    const value = values[f.name] ?? "";
    switch (f.type) {
      case "country":
        return (
          <SelectWrap>
            <select {...common(f)} autoComplete="country" value={value} onChange={(e) => update(f, e.target.value)} className="field-input cursor-pointer appearance-none pr-10">
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                  {c.dial ? ` (${c.dial})` : ""}
                </option>
              ))}
            </select>
          </SelectWrap>
        );
      case "programme":
        return (
          <SelectWrap>
            <select {...common(f)} value={value} onChange={(e) => update(f, e.target.value)} className={cn("field-input cursor-pointer appearance-none pr-10", !value && "text-neutral-500")}>
              <CourseOptions />
            </select>
          </SelectWrap>
        );
      case "select":
        return (
          <SelectWrap>
            <select {...common(f)} value={value} onChange={(e) => update(f, e.target.value)} className={cn("field-input cursor-pointer appearance-none pr-10", !value && "text-neutral-500")}>
              <option value="" disabled>
                Select an option
              </option>
              {f.options?.map((o) => (
                <option key={o} value={o} className="text-brand-dark">
                  {o}
                </option>
              ))}
            </select>
          </SelectWrap>
        );
      case "textarea":
        return (
          <textarea
            {...common(f)}
            rows={4}
            maxLength={f.maxLength}
            value={value}
            placeholder={f.placeholder}
            onChange={(e) => update(f, e.target.value)}
            className="field-input min-h-[120px] py-3"
          />
        );
      case "phone":
        return (
          <div className="flex">
            <span aria-hidden className="inline-flex min-w-[64px] items-center justify-center rounded-l-xl border border-r-0 border-neutral-300 bg-neutral-50 px-3 text-[15px] font-semibold text-neutral-700">
              {dial || "+"}
            </span>
            <input
              {...common(f)}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              aria-label={`${f.label}${dial ? `, country code ${dial}` : ", include country code"}`}
              value={value}
              onChange={(e) => update(f, e.target.value)}
              placeholder={dial ? "12 345 6789" : "Country code + number"}
              className="field-input rounded-l-none"
            />
          </div>
        );
      default:
        return (
          <input
            {...common(f)}
            type={f.type === "email" ? "email" : "text"}
            inputMode={f.type === "email" ? "email" : f.type === "year" ? "numeric" : undefined}
            autoComplete={f.autoComplete ?? "off"}
            maxLength={f.type === "year" ? 4 : f.maxLength}
            value={value}
            placeholder={f.placeholder}
            onChange={(e) => update(f, e.target.value)}
            className="field-input"
          />
        );
    }
  };

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
            className="flex min-h-[420px] flex-col items-center justify-center text-center focus:outline-none"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary text-white shadow-glow">
              <CheckCircle2 aria-hidden className="h-10 w-10" />
            </span>
            <h3 className="mt-6 text-2xl font-extrabold sm:text-3xl">Thank you!</h3>
            <p className="mt-3 max-w-md leading-relaxed text-neutral-600">{form.success}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={LINKS.portal} className="btn btn-primary btn-sm">
                Back to Lincoln Online Portal
                <ArrowRight aria-hidden className="h-4 w-4" />
              </a>
              <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary btn-sm">
                Submit another
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-labelledby={`${idp}-title`}>
            <h2 id={`${idp}-title`} className="text-2xl font-extrabold">
              {form.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{form.intro}</p>
            <p className="mt-2 text-sm text-neutral-600">
              Fields marked <span className="font-bold text-brand-deep">*</span> are required.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {form.fields.map((f) => (
                <div key={f.name} className={cn(f.wide && "sm:col-span-2")}>
                  <label htmlFor={`${idp}-${f.name}`} className="mb-2 block text-sm font-semibold text-brand-dark">
                    {f.label}
                    {f.required && (
                      <span aria-hidden className="ml-0.5 text-brand-deep">
                        *
                      </span>
                    )}
                  </label>
                  {control(f)}
                  {f.hint && !errors[f.name] && (
                    <p id={`${idp}-${f.name}-hint`} className="pt-2 text-sm text-neutral-600">
                      {f.hint}
                    </p>
                  )}
                  {errors[f.name] && (
                    <p id={`${idp}-${f.name}-error`} className="flex items-center gap-1.5 pt-2 text-sm font-medium text-brand-deep">
                      <AlertCircle aria-hidden className="h-4 w-4 shrink-0" />
                      {errors[f.name]}
                    </p>
                  )}
                </div>
              ))}

              {/* Honeypot — hidden from people and assistive tech */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={`${idp}-company`}>Company</label>
                <input id={`${idp}-company`} name="company" tabIndex={-1} autoComplete="off" value={values.company ?? ""} onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))} />
              </div>
            </div>

            {status === "error" && (
              <p role="alert" className="mt-6 flex items-start gap-3 rounded-xl bg-brand-light p-4 text-sm text-brand-deep">
                <AlertCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  {serverError} Please try again, or email us at{" "}
                  <a href={CONTACT.email.href} className="font-semibold underline underline-offset-2">
                    {CONTACT.email.label}
                  </a>
                  .
                </span>
              </p>
            )}

            <button type="submit" disabled={status === "submitting"} className="btn btn-primary mt-8 h-14 w-full text-base">
              {status === "submitting" ? (
                <>
                  <Loader2 aria-hidden className="h-5 w-5 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  {form.submit}
                  <Send aria-hidden className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-4 text-center text-xs leading-relaxed text-neutral-600">
              By submitting, you agree that Lincoln University College may use these details to handle your request, in
              line with our{" "}
              <a href={LINKS.privacy} className="font-semibold text-brand-deep underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </p>
          </motion.form>
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
