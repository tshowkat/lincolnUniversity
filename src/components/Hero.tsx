import Image from "next/image";
import { ArrowRight, CheckCircle2, MonitorSmartphone } from "lucide-react";
import { LEVELS, programmeById, programmes, type Programme } from "@/data/programmes";
import { LINKS } from "@/data/site";
import { LEVEL_BADGE } from "@/lib/levels";
import { cn } from "@/lib/utils";
import { Counter } from "./Counter";

const heroPicks = ["mba", "master-nursing-public-health", "bachelor-information-technology"]
  .map(programmeById)
  .filter((p): p is Programme => Boolean(p));

export function Hero() {
  const [main, second, third] = heroPicks;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Decorative background — brand tints only */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-light via-white to-white" />
      <div aria-hidden className="absolute -right-48 -top-48 -z-10 h-[560px] w-[560px] rounded-full bg-brand-primary/10 blur-3xl" />
      <div aria-hidden className="absolute -left-40 top-1/2 -z-10 h-[420px] w-[420px] rounded-full bg-brand-secondary/5 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(rgb(var(--brand-secondary-rgb)/0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />

      <div className="container-x grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-28 lg:pt-20">
        <div className="lg:col-span-7">
          <div className="hero-in">
            <p className="eyebrow bg-white shadow-soft ring-1 ring-brand-primary/10">
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
              </span>
              Lincoln Online
            </p>
          </div>

          <h1
              id="hero-title"
              className="mt-6 text-[40px] font-extrabold leading-[1.05] sm:text-6xl lg:text-[56px] xl:text-[64px]"
            >
              Earn a Recognised Degree —{" "}
              <span className="text-gradient">Anywhere, Anytime</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
              Study fully online with Lincoln University College, Malaysia. Choose from {programmes.length} Lincoln Online
              programmes, from Foundation to PhD, and learn on a schedule that fits your work and life.
            </p>

          <div className="hero-in mt-9 flex flex-col gap-3 [animation-delay:120ms] sm:flex-row">
            <a href="#programmes" className="btn btn-primary h-14 px-8 text-base">
              Explore Programmes
              <ArrowRight aria-hidden className="h-5 w-5" />
            </a>
            <a
              href={LINKS.eligibility}
              className="btn btn-secondary h-14 px-8 text-base"
            >
              <CheckCircle2 aria-hidden className="h-5 w-5 text-brand-primary" />
              Check Eligibility
            </a>
          </div>

          <div className="hero-in [animation-delay:200ms]">
            <dl className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-neutral-200 rounded-3xl bg-white/80 py-5 shadow-soft ring-1 ring-neutral-900/5 backdrop-blur">
              <div className="flex flex-col-reverse px-3 text-center sm:px-5">
                <dt className="mt-1 text-xs font-medium text-neutral-600 sm:text-sm">Programmes</dt>
                <dd className="font-display text-3xl font-extrabold text-brand-primary sm:text-4xl">
                  <Counter to={programmes.length} />
                </dd>
              </div>
              <div className="flex flex-col-reverse px-3 text-center sm:px-5">
                <dt className="mt-1 text-xs font-medium text-neutral-600 sm:text-sm">PhD to Foundation</dt>
                <dd className="font-display text-3xl font-extrabold text-brand-primary sm:text-4xl">
                  <Counter to={LEVELS.length} />
                  <span className="ml-1 align-middle text-sm font-bold text-brand-dark sm:text-base">levels</span>
                </dd>
              </div>
              <div className="flex flex-col-reverse px-3 text-center sm:px-5">
                <dt className="mt-1 text-xs font-medium text-neutral-600 sm:text-sm">Online Learning</dt>
                <dd className="font-display text-3xl font-extrabold text-brand-primary sm:text-4xl">
                  <Counter to={100} suffix="%" />
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Image collage */}
        <div className="hero-in relative [animation-delay:100ms] lg:col-span-5">
          <div className="relative mx-auto grid max-w-xl grid-cols-5 grid-rows-6 gap-4 sm:gap-5 lg:max-w-none" style={{ aspectRatio: "1 / 1" }}>
            {main && (
              <figure className="relative col-span-3 row-span-6 overflow-hidden rounded-4xl shadow-lift">
                <Image
                  src={main.image}
                  alt={`${main.title} — online study at Lincoln University College`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 300px, 60vw"
                  className="object-cover"
                />
              </figure>
            )}
            {[second, third].map(
              (p, i) =>
                p && (
                  <figure key={p.id} className={cn("relative col-span-2 row-span-3 overflow-hidden rounded-3xl shadow-soft", i === 0 && "mt-6")}>
                    <Image
                      src={p.image}
                      alt={`${p.title} — online study at Lincoln University College`}
                      fill
                      sizes="(min-width: 1024px) 200px, 40vw"
                      className="object-cover"
                    />
                  </figure>
                ),
            )}
          </div>

          {/* Floating glass cards */}
          <div className="absolute -left-2 top-8 hidden animate-float items-center gap-3 rounded-2xl bg-white/90 p-3 pr-5 shadow-lift ring-1 ring-neutral-900/5 backdrop-blur sm:flex lg:-left-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary text-white">
              <MonitorSmartphone aria-hidden className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold text-brand-dark">100% online</span>
              <span className="block text-xs text-neutral-600">via the Lincoln Online Portal</span>
            </span>
          </div>
          <div className="absolute -bottom-6 right-2 hidden rounded-2xl bg-white/90 p-4 shadow-lift ring-1 ring-neutral-900/5 backdrop-blur sm:block lg:-right-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-600">Study levels</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {LEVELS.map((l) => (
                <li key={l} className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", LEVEL_BADGE[l])}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
