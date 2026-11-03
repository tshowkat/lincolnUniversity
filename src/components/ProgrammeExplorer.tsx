"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, RotateCcw, Search, SearchX, X } from "lucide-react";
import { FIELDS, LEVELS, programmes, type Field, type Level } from "@/data/programmes";
import { CERT_DOMAINS, certifications, type Certification } from "@/data/certifications";
import { cn } from "@/lib/utils";
import { ProgrammeCard } from "./ProgrammeCard";
import { CertificationCard } from "./CertificationCard";
import { SectionHeading } from "./SectionHeading";

const CERT = "Certification" as const;
type LevelFilter = Level | typeof CERT | "All";

const LEVEL_TABS: { value: LevelFilter; label: string }[] = [
  { value: "All", label: "All" },
  ...LEVELS.map((l) => ({ value: l, label: l })),
  { value: CERT, label: "Certifications" },
];

/** Which degree "field of study" a certification domain falls under. */
const certField = (c: Certification): Field => (c.domain.id === "computer-science-it" ? "IT & Computing" : "Engineering & Science");

type Item =
  | { kind: "programme"; id: string; level: LevelFilter; field: Field; group: string; text: string; programme: (typeof programmes)[number] }
  | { kind: "cert"; id: string; level: LevelFilter; field: Field; group: string; text: string; certification: Certification };

const ITEMS: Item[] = [
  ...programmes.map((p): Item => ({
    kind: "programme",
    id: p.id,
    level: p.level,
    field: p.field,
    group: p.field,
    text: `${p.title} ${p.level} ${p.field}`.toLowerCase(),
    programme: p,
  })),
  ...certifications.map((c): Item => ({
    kind: "cert",
    id: c.id,
    level: CERT,
    field: certField(c),
    group: c.domain.id,
    text: `certification certificate ${c.title} ${c.focus} ${c.domain.name}`.toLowerCase(),
    certification: c,
  })),
];

const PAGE = 24;

export function ProgrammeExplorer() {
  const [level, setLevel] = useState<LevelFilter>("All");
  /** A field of study, or a certification domain id when the Certifications tab is active. */
  const [field, setField] = useState("All");
  const [visible, setVisible] = useState(PAGE);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: ITEMS.length };
    for (const i of ITEMS) c[i.level] = (c[i.level] ?? 0) + 1;
    return c;
  }, []);

  const results = useMemo(() => {
    const tokens = deferredQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return ITEMS.filter((i) => {
      if (level !== "All" && i.level !== level) return false;
      if (field !== "All" && (level === CERT ? i.group !== field : i.field !== field)) return false;
      if (!tokens.length) return true;
      return tokens.every((t) => i.text.includes(t));
    });
  }, [level, field, deferredQuery]);

  // Start from the first page whenever the filters change.
  useEffect(() => setVisible(PAGE), [level, field, deferredQuery]);

  const chooseLevel = (l: LevelFilter) => {
    // Fields and certification domains are different lists, so clear the dropdown when switching between them.
    if ((l === CERT) !== (level === CERT)) setField("All");
    setLevel(l);
  };
  const shown = results.slice(0, visible);

  const filtered = level !== "All" || field !== "All" || query.trim() !== "";
  const reset = () => {
    setLevel("All");
    setField("All");
    setQuery("");
  };
  const isCert = level === CERT;

  return (
    <section id="programmes" aria-labelledby="programmes-title" className="section bg-neutral-50/70">
      <div className="container-x">
        <SectionHeading
          id="programmes-title"
          eyebrow="Programme Explorer"
          title={
            <>
              Find your <span className="text-gradient">Lincoln Online programme</span>
            </>
          }
          description={`${programmes.length} degree programmes and ${certifications.length} engineering certification programmes delivered by Lincoln Online. Filter by level or field, then view full details and enquire.`}
        />

        {/* Controls */}
        <div className="mt-12 rounded-3xl bg-white p-3 shadow-soft ring-1 ring-neutral-900/5 sm:p-4">
          <div role="group" aria-label="Filter by study level" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
            {LEVEL_TABS.map((t) => {
              const active = level === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseLevel(t.value)}
                  className={cn(
                    "relative inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors",
                    active ? "text-white" : "text-neutral-700 hover:bg-brand-light hover:text-brand-deep",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="level-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-brand-primary shadow-glow"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                  <span
                    className={cn(
                      "relative rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums",
                      active ? "bg-brand-deep text-white" : "bg-neutral-100 text-neutral-600",
                    )}
                  >
                    {counts[t.value] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 grid gap-3 border-t border-neutral-100 pt-3 sm:grid-cols-[1fr_auto]">
            <div className="relative">
              <label htmlFor="programme-search" className="sr-only">
                Search programmes
              </label>
              <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
              <input
                id="programme-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search e.g. MBA, nursing, data science, robotics…"
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
            <div className="flex items-center gap-3">
              <label htmlFor="field-filter" className="sr-only">
                {isCert ? "Certification domain" : "Field of study"}
              </label>
              <select
                id="field-filter"
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="field-input cursor-pointer pr-10 sm:w-64"
              >
                {isCert ? (
                  <>
                    <option value="All">All engineering domains</option>
                    {CERT_DOMAINS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value="All">All fields of study</option>
                    {FIELDS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex min-h-[44px] items-center justify-between gap-4">
          <p aria-live="polite" className="text-sm font-medium text-neutral-600">
            Showing <strong className="text-brand-dark">{results.length}</strong> of {ITEMS.length} programmes &amp; certifications
          </p>
          {filtered && (
            <button type="button" onClick={reset} className="btn btn-sm px-3 text-brand-deep hover:bg-brand-light">
              <RotateCcw aria-hidden className="h-4 w-4" />
              Reset filters
            </button>
          )}
        </div>

        <motion.ul layout className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {item.kind === "programme" ? (
                  <ProgrammeCard programme={item.programme} />
                ) : (
                  <CertificationCard certification={item.certification} />
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {results.length > visible && (
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn btn-secondary h-14 px-8 text-base">
              Show more
              <ChevronDown aria-hidden className="h-5 w-5 text-brand-primary" />
            </button>
            <p className="text-sm text-neutral-600">
              {results.length - visible} more to see
              {level !== CERT && (
                <>
                  {" "}·{" "}
                  <button type="button" onClick={() => chooseLevel(CERT)} className="font-semibold text-brand-deep underline-offset-4 hover:underline">
                    Jump to certifications
                  </button>
                </>
              )}
            </p>
          </div>
        )}

        {results.length === 0 && (
          <div className="card mx-auto mt-4 flex max-w-lg flex-col items-center px-6 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand-primary">
              <SearchX aria-hidden className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-xl font-bold">No programmes match your filters</h3>
            <p className="mt-2 text-neutral-600">Try a different keyword, level or field of study.</p>
            <button type="button" onClick={reset} className="btn btn-primary btn-sm mt-6">
              Show all programmes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
