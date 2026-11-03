"use client";

import Image from "next/image";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { ArrowRight, RotateCcw, Search, SearchX, Send, X } from "lucide-react";
import { CERT_DOMAINS, certifications } from "@/data/certifications";
import { LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

/** Searchable, domain-filtered list of every engineering certification. */
export function CertificationExplorer() {
  const [domain, setDomain] = useState("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  // Deep link: /certifications#<domain-id> opens that domain.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (CERT_DOMAINS.some((d) => d.id === hash)) setDomain(hash);
  }, []);

  const results = useMemo(() => {
    const tokens = deferredQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return certifications.filter((c) => {
      if (domain !== "All" && c.domain.id !== domain) return false;
      if (!tokens.length) return true;
      const hay = `${c.title} ${c.focus} ${c.domain.name}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [domain, deferredQuery]);

  const groups = CERT_DOMAINS.map((d) => ({ domain: d, items: results.filter((c) => c.domain.id === d.id) })).filter(
    (g) => g.items.length,
  );

  const filtered = domain !== "All" || query.trim() !== "";
  const reset = () => {
    setDomain("All");
    setQuery("");
  };

  const chips = [{ id: "All", name: "All domains", count: certifications.length }].concat(
    CERT_DOMAINS.map((d) => ({ id: d.id, name: d.name, count: certifications.filter((c) => c.domain.id === d.id).length })),
  );

  return (
    <section aria-label="Certification programmes" className="bg-neutral-50/70 py-12 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="rounded-3xl bg-white p-3 shadow-soft ring-1 ring-neutral-900/5 sm:p-4">
          <div className="relative">
            <label htmlFor="cert-search" className="sr-only">
              Search certifications
            </label>
            <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
            <input
              id="cert-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. data science, robotics, civil…"
              autoComplete="off"
              className="field-input pl-12 pr-12 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-1.5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-brand-dark"
              >
                <X aria-hidden className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>
          <div role="group" aria-label="Filter by domain" className="mt-3 flex flex-wrap gap-2 border-t border-neutral-100 pt-3">
            {chips.map((c) => {
              const active = domain === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setDomain(c.id)}
                  className={cn(
                    "inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
                    active ? "bg-brand-primary text-white shadow-glow" : "bg-neutral-100 text-neutral-700 hover:bg-brand-light hover:text-brand-deep",
                  )}
                >
                  {c.name}
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums",
                      active ? "bg-brand-deep text-white" : "bg-white text-neutral-600",
                    )}
                  >
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex min-h-[44px] items-center justify-between gap-4">
          <p aria-live="polite" className="text-sm font-medium text-neutral-600">
            Showing <strong className="text-brand-dark">{results.length}</strong> of {certifications.length} certifications
          </p>
          {filtered && (
            <button type="button" onClick={reset} className="btn btn-sm px-3 text-brand-deep hover:bg-brand-light">
              <RotateCcw aria-hidden className="h-4 w-4" />
              Reset filters
            </button>
          )}
        </div>

        <div className="mt-6 space-y-14">
          {groups.map(({ domain: d, items }) => {
            const Icon = d.icon;
            return (
              <section key={d.id} id={d.id} aria-labelledby={`${d.id}-title`}>
                <h2 id={`${d.id}-title`} className="flex items-center gap-3 text-2xl font-extrabold sm:text-3xl">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-primary">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  {d.name}
                </h2>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((c) => (
                    <li key={c.id}>
                      <article className="card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
                        <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-brand-secondary">
                          {c.image ? (
                            <Image
                              src={c.image}
                              alt={`Certification in ${c.title}, Lincoln Online`}
                              fill
                              sizes="(min-width: 1024px) 400px, (min-width: 640px) 48vw, 100vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                            />
                          ) : (
                            <Icon aria-hidden className="h-14 w-14 text-white/85" strokeWidth={1.4} />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-primary">Certification</p>
                        <h3 className="mt-2 text-lg font-bold leading-snug">{c.title}</h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{c.focus}</p>
                        <div className="mt-auto flex gap-3 pt-6">
                          <a href={`/certifications/${c.id}`} aria-label={`View details: ${c.title} certification`} className="btn btn-primary btn-sm flex-1">
                            View Details
                            <ArrowRight aria-hidden className="h-4 w-4" />
                          </a>
                          <a
                            href={`${LINKS.apply}?programme=${encodeURIComponent(c.id)}`}
                            aria-label={`Apply for ${c.title} certification`}
                            className="btn btn-outline btn-sm"
                          >
                            <Send aria-hidden className="h-4 w-4" />
                            Apply
                          </a>
                        </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        {results.length === 0 && (
          <div className="card mx-auto mt-4 flex max-w-lg flex-col items-center px-6 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand-primary">
              <SearchX aria-hidden className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-xl font-bold">No certifications match your search</h3>
            <p className="mt-2 text-neutral-600">Try a different keyword or domain.</p>
            <button type="button" onClick={reset} className="btn btn-primary btn-sm mt-6">
              Show all certifications
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
