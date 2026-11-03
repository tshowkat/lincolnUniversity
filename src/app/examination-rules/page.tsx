import type { Metadata } from "next";
import {
  ArrowLeft,
  CalendarClock,
  ClipboardCheck,
  IdCard,
  LifeBuoy,
  Mail,
  Phone,
  PhoneOff,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { EXAM_DAY_CHECKLIST, EXAM_RULE_SECTIONS, EXAM_RULES_UPDATED } from "@/data/exam-rules";
import { CONTACT, LINKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Examination Rules & Regulations",
  description:
    "Examination rules and regulations for Lincoln Online students at Lincoln University College: conduct in the examination room, identification, supplementary and missed examinations.",
  alternates: { canonical: LINKS.examRules },
  openGraph: { url: LINKS.examRules, title: "Examination Rules & Regulations | Lincoln Online" },
};

const CHECK_ICONS: LucideIcon[] = [CalendarClock, IdCard, ClipboardCheck, PhoneOff];

const updatedLabel = new Date(EXAM_RULES_UPDATED).toLocaleDateString("en-MY", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function ExaminationRulesPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {/* Hero */}
        <section aria-labelledby="rules-title" className="on-dark relative isolate overflow-hidden bg-brand-secondary text-white">
          <div aria-hidden className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-brand-primary/25 blur-3xl" />
          <div className="container-x py-14 sm:py-16 lg:py-20">
            <nav aria-label="Breadcrumb" className="hero-in text-sm text-white/75">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a href="/" className="hover:text-white">Home</a>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <a href={LINKS.portal} className="hover:text-white">Lincoln Online Portal</a>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="font-semibold text-white">Examination Rules</li>
              </ol>
            </nav>
            <div className="hero-in mt-8 max-w-3xl [animation-delay:60ms]">
              <p className="eyebrow bg-white/10 text-brand-accent">
                <ScrollText aria-hidden className="h-3.5 w-3.5" />
                Student Services
              </p>
              <h1 id="rules-title" className="mt-6 text-[36px] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[52px]">
                Examination Rules <span className="text-brand-accent">&amp; Regulations</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/85">
                These rules apply to every Lincoln Online candidate sitting an examination at Lincoln University
                College. Please read them before your examination.
              </p>
              <p className="mt-4 text-sm text-white/70">Last reviewed {updatedLabel}</p>
            </div>
          </div>
        </section>

        {/* Exam-day checklist */}
        <section aria-labelledby="checklist-title" className="relative -mt-px bg-white pt-12 sm:pt-16">
          <div className="container-x">
            <h2 id="checklist-title" className="text-2xl font-extrabold sm:text-3xl">
              Exam-day checklist
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {EXAM_DAY_CHECKLIST.map((item, i) => {
                const Icon = CHECK_ICONS[i];
                return (
                  <li key={item.ref}>
                    <Reveal delay={i * 0.06} className="h-full">
                      <a
                        href={`#rule-${item.ref}`}
                        className="group flex h-full gap-4 rounded-3xl bg-brand-light p-5 ring-1 ring-brand-primary/10 transition-colors hover:ring-brand-primary/30"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary text-white">
                          <Icon aria-hidden className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block font-bold text-brand-dark">{item.title}</span>
                          <span className="mt-1 block text-sm leading-relaxed text-neutral-600">{item.body}</span>
                          <span className="mt-2 block text-xs font-semibold text-brand-deep group-hover:underline">
                            Rule {item.ref}
                          </span>
                        </span>
                      </a>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Rules */}
        <section aria-label="Rules and regulations" className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-28">
                <nav aria-labelledby="toc-title" className="card p-6">
                  <h2 id="toc-title" className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-600">
                    On this page
                  </h2>
                  <ol className="mt-3 space-y-1">
                    {EXAM_RULE_SECTIONS.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="flex min-h-[44px] items-center gap-3 rounded-xl px-2 font-semibold text-brand-dark/85 transition-colors hover:bg-brand-light hover:text-brand-deep"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-light text-sm text-brand-deep">
                            {s.no}
                          </span>
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="rounded-3xl bg-brand-dark p-6 text-white on-dark">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-brand-accent">
                    <LifeBuoy aria-hidden className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 text-lg font-bold text-white">Questions about an examination?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    For special arrangements, missed examinations or supplementary fees, contact the Examination Unit
                    through Lincoln Online.
                  </p>
                  <div className="mt-3 flex flex-col">
                    <a href={CONTACT.email.href} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-white hover:text-brand-accent">
                      <Mail aria-hidden className="h-4 w-4 text-brand-accent" />
                      {CONTACT.email.label}
                    </a>
                    <a href={CONTACT.hotline.href} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-white hover:text-brand-accent">
                      <Phone aria-hidden className="h-4 w-4 text-brand-accent" />
                      {CONTACT.hotline.label}
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            <div className="space-y-12 lg:col-span-8">
              {EXAM_RULE_SECTIONS.map((s) => (
                <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28">
                  <p className="eyebrow">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                    Section {s.no}
                  </p>
                  <h2 id={`${s.id}-title`} className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
                    {s.title}
                  </h2>
                  {s.intro && <p className="mt-4 text-lg leading-relaxed text-neutral-700">{s.intro}</p>}
                  <ol className="mt-6 divide-y divide-neutral-100 overflow-hidden rounded-3xl ring-1 ring-neutral-900/5">
                    {s.rules.map((r) => (
                      <li key={r.no} id={`rule-${r.no}`} className="flex scroll-mt-28 gap-4 bg-white p-5 target:bg-brand-light sm:gap-5 sm:p-6">
                        <span className="mt-0.5 inline-flex h-8 min-w-[3rem] shrink-0 items-center justify-center rounded-full bg-brand-secondary/5 px-2 text-sm font-bold text-brand-secondary">
                          {r.no}
                        </span>
                        <p className="leading-relaxed text-ink">{r.text}</p>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}

              <p className="rounded-2xl border border-dashed border-neutral-300 p-5 text-sm leading-relaxed text-neutral-600">
                Lincoln University College may update these rules. The version published on Lincoln Online applies to
                your examination.
              </p>

              <a href={LINKS.portal} className="btn btn-outline">
                <ArrowLeft aria-hidden className="h-4 w-4" />
                Back to Lincoln Online Portal
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
