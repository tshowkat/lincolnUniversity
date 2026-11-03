"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LogIn, Menu, X } from "lucide-react";
import { BRAND_ASSETS, LINKS, NAV_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-neutral-900/5 bg-white/80 shadow-[0_8px_30px_-12px_rgb(15_23_42/0.15)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-white",
      )}
    >
      <div
        className={cn(
          "container-x flex items-center justify-between gap-6 transition-[height] duration-300",
          scrolled ? "h-16 lg:h-[72px]" : "h-20 lg:h-24",
        )}
      >
        <a href="/" className="shrink-0 rounded-lg" aria-label="Lincoln Online home">
          <Image
            src={BRAND_ASSETS.logo}
            alt="Lincoln University College"
            width={BRAND_ASSETS.logoWidth}
            height={BRAND_ASSETS.logoHeight}
            priority
            sizes="160px"
            className={cn("w-auto transition-[height] duration-300", scrolled ? "h-10 lg:h-11" : "h-12 lg:h-14")}
          />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative inline-flex min-h-[44px] items-center rounded-full px-2.5 text-[14px] font-semibold xl:px-4 xl:text-[15px] text-brand-dark/80 transition-colors hover:bg-brand-light hover:text-brand-deep"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={LINKS.adminLogin} rel="nofollow" className="btn btn-secondary btn-sm hidden sm:inline-flex">
            <LogIn aria-hidden className="h-4 w-4 text-brand-primary" />
            Admin Login
          </a>
          <a href={LINKS.apply} className="btn btn-primary btn-sm hidden sm:inline-flex">
            Apply Now
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-dark ring-1 ring-neutral-200 transition hover:bg-brand-light active:scale-95 lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-neutral-900/5 bg-white shadow-lift lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x py-4">
              <ul className="space-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[48px] items-center rounded-xl px-4 text-lg font-semibold text-brand-dark hover:bg-brand-light hover:text-brand-deep"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href={LINKS.adminLogin} rel="nofollow" onClick={() => setOpen(false)} className="btn btn-secondary mt-4 w-full">
                <LogIn aria-hidden className="h-4 w-4 text-brand-primary" />
                Admin Login
              </a>
              <a href={LINKS.apply} className="btn btn-primary mt-3 w-full">
                Apply Now
                <ArrowRight aria-hidden className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
