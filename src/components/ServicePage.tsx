import { LifeBuoy, Mail, Phone, type LucideIcon } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CONTACT, LINKS } from "@/data/site";

interface Props {
  eyebrow: string;
  icon: LucideIcon;
  title: React.ReactNode;
  description: React.ReactNode;
  /** Breadcrumb label for this page. */
  crumb: string;
  children: React.ReactNode;
}

/** Shared shell for every Lincoln Online student-service page: header, breadcrumb hero, footer. */
export function ServicePage({ eyebrow, icon: Icon, title, description, crumb, children }: Props) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section aria-labelledby="page-title" className="on-dark relative isolate overflow-hidden bg-brand-secondary text-white">
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
                <li aria-current="page" className="font-semibold text-white">{crumb}</li>
              </ol>
            </nav>
            <div className="hero-in mt-8 max-w-3xl [animation-delay:60ms]">
              <p className="eyebrow bg-white/10 text-brand-accent">
                <Icon aria-hidden className="h-3.5 w-3.5" />
                {eyebrow}
              </p>
              <h1 id="page-title" className="mt-6 text-[36px] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[52px]">
                {title}
              </h1>
              <div className="mt-6 text-lg leading-relaxed text-white/85">{description}</div>
            </div>
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </>
  );
}

/** Contact card used in page sidebars. */
export function HelpCard({ title = "Need help?", body }: { title?: string; body: string }) {
  return (
    <div className="rounded-3xl bg-brand-dark p-6 text-white on-dark">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-brand-accent">
        <LifeBuoy aria-hidden className="h-5 w-5" />
      </span>
      <h2 className="mt-4 text-lg font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
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
  );
}

/** Numbered "what happens next" list for the sidebar. */
export function StepsCard({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="card p-6">
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-600">{title}</h2>
      <ol className="mt-4 space-y-4">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-brand-deep">{i + 1}</span>
            <span className="pt-0.5 leading-relaxed text-ink">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Two-column body: form/content on the left, sidebar on the right. */
export function ServiceBody({ children, aside }: { children: React.ReactNode; aside: React.ReactNode }) {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">{children}</div>
        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">{aside}</div>
        </aside>
      </div>
    </section>
  );
}
