import { ArrowRight, ClipboardCheck, GraduationCap, MousePointerClick, Send, type LucideIcon } from "lucide-react";
import { LINKS } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const STEPS: { icon: LucideIcon; title: string; body: string; cta: string; href: string }[] = [
  {
    icon: MousePointerClick,
    title: "Choose Programme",
    body: "Browse the Lincoln Online programmes and open a programme page to see how to apply.",
    cta: "Browse programmes",
    href: "/#programmes",
  },
  {
    icon: ClipboardCheck,
    title: "Check Eligibility",
    body: "Send your qualifications and an admissions officer will confirm you meet the programme requirements.",
    cta: "Check eligibility",
    href: LINKS.eligibility,
  },
  {
    icon: Send,
    title: "Apply Online",
    body: "Complete the online application form. The admissions team will tell you which documents to send.",
    cta: "Apply online",
    href: LINKS.apply,
  },
  {
    icon: GraduationCap,
    title: "Start Learning",
    body: "Once enrolled, log in to the Lincoln Online Portal to access your course and begin studying.",
    cta: "Lincoln Online Portal",
    href: LINKS.portal,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section bg-brand-secondary text-white on-dark relative overflow-hidden">
      <div aria-hidden className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-primary/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -right-40 h-[480px] w-[480px] rounded-full bg-brand-accent/10 blur-3xl" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow bg-white/10 text-brand-accent">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            How It Works
          </p>
          <h2 id="how-title" className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[44px]">
            From enquiry to enrolment in <span className="text-brand-accent">4 steps</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/80">
            A simple, fully online admissions journey.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Connector line (desktop: horizontal, mobile: vertical) */}
          <div aria-hidden className="absolute left-7 top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-brand-accent/70 via-white/25 to-transparent lg:right-0 lg:top-7 lg:h-px lg:w-auto lg:bg-gradient-to-r" />
        <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
          {STEPS.map(({ icon: Icon, title, body, cta, href }, i) => (
            <li key={title} className="relative pl-20 lg:pl-0">
              <Reveal delay={i * 0.1}>
                <div className="absolute left-0 top-0 lg:static">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-[0_0_0_6px_rgb(var(--brand-secondary-rgb))]">
                    <Icon aria-hidden className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent text-xs font-extrabold text-brand-dark">
                      {i + 1}
                    </span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white lg:mt-7">
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-white/80">{body}</p>
                <a
                  href={href}
                  className="group mt-4 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-brand-accent hover:underline hover:underline-offset-4"
                >
                  {cta}
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Reveal>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
