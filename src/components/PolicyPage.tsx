import { FileText } from "lucide-react";
import { HelpCard, ServicePage } from "./ServicePage";
import { PLACEHOLDER } from "@/data/content";
import type { Policy } from "@/data/policies";

/** Renders a policy (privacy, refund, terms) with a contents sidebar. */
export function PolicyPage({ policy }: { policy: Policy }) {
  const hasPending = policy.sections.some((s) => s.blocks.some((b) => b.type === "pending"));

  return (
    <ServicePage crumb={policy.title} eyebrow="Policies" icon={FileText} title={policy.title} description={policy.summary}>
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <nav aria-labelledby="toc-title" className="card p-6">
                <h2 id="toc-title" className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-600">
                  On this page
                </h2>
                <ol className="mt-3 space-y-1">
                  {policy.sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="flex min-h-[40px] items-center gap-3 rounded-xl px-2 font-semibold text-brand-dark/85 transition-colors hover:bg-brand-light hover:text-brand-deep">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-light text-sm text-brand-deep">{i + 1}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <HelpCard title="Questions about this policy?" body="Contact Lincoln University College and we'll help." />
            </div>
          </aside>

          <div className="space-y-10 lg:col-span-8">
            {hasPending && (
              <p>
                <span className="placeholder-tag">{PLACEHOLDER} Sections marked below need the approved wording from LUC.</span>
              </p>
            )}
            {policy.sections.map((s, i) => (
              <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28">
                <h2 id={`${s.id}-title`} className="text-2xl font-extrabold leading-tight sm:text-[28px]">
                  <span className="mr-2 text-brand-primary">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-ink">
                  {s.blocks.map((b, j) => {
                    switch (b.type) {
                      case "p":
                        return <p key={j}>{b.text}</p>;
                      case "list":
                        return (
                          <ul key={j} className="list-disc space-y-2 pl-6 marker:text-brand-primary">
                            {b.items.map((it) => (
                              <li key={it}>{it}</li>
                            ))}
                          </ul>
                        );
                      case "note":
                        return (
                          <p key={j} className="rounded-2xl bg-brand-light px-5 py-4 font-semibold text-brand-deep">
                            {b.text}
                          </p>
                        );
                      case "pending":
                        return (
                          <div key={j} className="rounded-2xl border border-dashed border-neutral-300 p-5">
                            <span className="placeholder-tag">{PLACEHOLDER}</span>
                            <p className="mt-3 text-sm font-semibold text-neutral-700">This section will cover:</p>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-600">
                              {b.covers.map((c) => (
                                <li key={c}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        );
                    }
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ServicePage>
  );
}
