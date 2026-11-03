import type { Metadata } from "next";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  ClipboardCheck,
  FileText,
  HelpCircle,
  LayoutGrid,
  LifeBuoy,
  LogIn,
  Mail,
  Phone,
  ScrollText,
  Send,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CONTACT, LINKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Lincoln Online Portal",
  description:
    "The Lincoln Online learning portal: student services for Lincoln University College online learners in one place.",
  alternates: { canonical: "/portal" },
  openGraph: { url: "/portal", title: "Lincoln Online Portal" },
};

/** Every student service is served on the Lincoln Online site itself: no links to outside websites. */
const SERVICES: { icon: LucideIcon; title: string; body: string; href: string; cta: string }[] = [
  {
    icon: LogIn,
    title: "Learning Portal",
    body: "Access your courses, learning materials and coursework.",
    href: LINKS.learningPortal,
    cta: "Sign in",
  },
  {
    icon: ScrollText,
    title: "Examination Rules",
    body: "Read the examination rules and regulations before your assessments.",
    href: LINKS.examRules,
    cta: "Read the rules",
  },
  {
    icon: Send,
    title: "Apply Online",
    body: "Start your application for a Lincoln Online programme.",
    href: LINKS.apply,
    cta: "Apply online",
  },
  {
    icon: ClipboardCheck,
    title: "Check Eligibility",
    body: "Find out whether your qualifications meet a programme's entry requirements.",
    href: LINKS.eligibility,
    cta: "Check eligibility",
  },
  {
    icon: Award,
    title: "Scholarships",
    body: "Apply for a Lincoln University College scholarship.",
    href: LINKS.scholarships,
    cta: "Apply for a scholarship",
  },
  {
    icon: BadgeCheck,
    title: "Verify Result / Certificate",
    body: "Request confirmation that a Lincoln University College result or certificate is genuine.",
    href: LINKS.verifyCertificate,
    cta: "Request verification",
  },
  {
    icon: BookOpen,
    title: "Programmes",
    body: "Browse every Lincoln Online programme, from Foundation to PhD.",
    href: "/#programmes",
    cta: "Explore programmes",
  },
  {
    icon: HelpCircle,
    title: "FAQs",
    body: "Answers to common questions, and a form to ask your own.",
    href: LINKS.faqs,
    cta: "Browse FAQs",
  },
  {
    icon: FileText,
    title: "Policies",
    body: "Privacy policy, refund policy and terms and conditions.",
    href: LINKS.terms,
    cta: "Read the policies",
  },
];

export default function PortalPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {/* Hero / sign-in */}
        <section aria-labelledby="portal-title" className="on-dark relative isolate overflow-hidden bg-brand-secondary text-white">
          <div aria-hidden className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-brand-primary/25 blur-3xl" />
          <div aria-hidden className="absolute -bottom-48 -left-40 -z-10 h-[460px] w-[460px] rounded-full bg-brand-accent/10 blur-3xl" />

          <div className="container-x grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:py-24">
            <div className="hero-in lg:col-span-7">
              <p className="eyebrow bg-white/10 text-brand-accent">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                Student Portal
              </p>
              <h1 id="portal-title" className="mt-6 text-[40px] font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[56px]">
                Lincoln Online <span className="text-brand-accent">Portal</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
                Everything you need as a Lincoln Online learner in one place: courses, examinations, admissions,
                scholarships and support.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={LINKS.learningPortal} className="btn btn-white h-14 px-8 text-base">
                  <LogIn aria-hidden className="h-5 w-5 text-brand-primary" />
                  Sign in to Learning Portal
                </a>
                <a href="#services" className="btn btn-ghost-light h-14 px-8 text-base">
                  <LayoutGrid aria-hidden className="h-5 w-5" />
                  All student services
                </a>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-white/75">
                <ShieldCheck aria-hidden className="h-4 w-4 shrink-0 text-brand-accent" />
                All Lincoln Online student services are available right here on this site.
              </p>
            </div>

            <div className="hero-in [animation-delay:100ms] lg:col-span-5">
              <div className="rounded-4xl bg-white p-6 text-brand-dark shadow-lift sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-600">Quick access</p>
                <ul className="mt-4 divide-y divide-neutral-100">
                  {SERVICES.slice(0, 4).map(({ icon: Icon, title, href }) => (
                    <li key={title}>
                      <a
                        href={href}
                        className="group flex min-h-[56px] items-center gap-4 rounded-xl px-2 py-2 transition-colors hover:bg-brand-light"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand-primary">
                          <Icon aria-hidden className="h-5 w-5" />
                        </span>
                        <span className="flex-1 font-semibold">{title}</span>
                        <ArrowRight aria-hidden className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-primary" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* All services */}
        <section id="services" aria-labelledby="services-title" className="section bg-white">
          <div className="container-x">
            <SectionHeading
              id="services-title"
              eyebrow="Student Services"
              title={
                <>
                  All your <span className="text-gradient">student services</span>
                </>
              }
              description="Everything a Lincoln Online learner needs, on the Lincoln Online website."
            />
            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(({ icon: Icon, title, body, href, cta }, i) => (
                <li key={title}>
                  <Reveal delay={(i % 3) * 0.08} className="h-full">
                    <a
                      href={href}
                      className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-neutral-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-brand-primary/20"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                        <Icon aria-hidden className="h-6 w-6" />
                      </span>
                      <h3 className="mt-6 text-xl font-bold">{title}</h3>
                      <p className="mt-2 flex-1 leading-relaxed text-neutral-600">{body}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-brand-primary">
                        {cta}
                        <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  </Reveal>
                </li>
              ))}
              <li>
                <Reveal delay={0.16} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl bg-brand-light p-7 ring-1 ring-brand-primary/10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-white">
                      <LifeBuoy aria-hidden className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 text-xl font-bold">Need help?</h3>
                    <p className="mt-2 leading-relaxed text-neutral-600">Contact the university for help with access or your studies.</p>
                    <div className="mt-4 flex flex-col">
                      <a href={CONTACT.email.href} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand-deep hover:underline">
                        <Mail aria-hidden className="h-4 w-4" />
                        {CONTACT.email.label}
                      </a>
                      <a href={CONTACT.hotline.href} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand-deep hover:underline">
                        <Phone aria-hidden className="h-4 w-4" />
                        {CONTACT.hotline.label}
                      </a>
                    </div>
                  </div>
                </Reveal>
              </li>
            </ul>
          </div>
        </section>

        {/* Back to programmes */}
        <section aria-labelledby="explore-title" className="pb-20 lg:pb-28">
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-6 rounded-4xl bg-brand-dark p-8 text-white on-dark sm:p-12 lg:flex-row lg:items-center">
              <div>
                <h2 id="explore-title" className="text-2xl font-extrabold text-white sm:text-3xl">
                  Not enrolled yet?
                </h2>
                <p className="mt-2 text-white/80">Explore the Lincoln Online programmes, from Foundation to PhD.</p>
              </div>
              <a href="/#programmes" className="btn btn-primary h-14 px-8 text-base">
                Explore Programmes
                <ArrowRight aria-hidden className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
