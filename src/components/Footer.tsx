import Image from "next/image";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { ADDITIONAL_INFO_LINKS, BRAND_ASSETS, CONTACT, LINKS, NAV_LINKS } from "@/data/site";

const QUICK_LINKS = [
  // The footer also links to certifications, which the header menu does not list.
  ...NAV_LINKS.filter((l) => l.href !== "/#contact").flatMap((l) =>
    l.href === "/#programmes" ? [l, { label: "Certifications", href: "/certifications" }] : [l],
  ),
  { label: "Apply Online", href: LINKS.apply },
  { label: "Scholarships", href: LINKS.scholarships },
  { label: "FAQs", href: LINKS.faqs },
  { label: "Lincoln Online Portal", href: LINKS.portal },
];

const linkCls = "inline-flex min-h-[40px] items-center gap-1.5 text-white/75 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer id="contact" aria-labelledby="footer-title" className="on-dark relative overflow-hidden bg-brand-dark pb-24 text-white md:pb-0">
      <div aria-hidden className="h-1 bg-brand-gradient" />
      <h2 id="footer-title" className="sr-only">
        Contact and site information
      </h2>
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Image
            src={BRAND_ASSETS.logo}
            alt="Lincoln University College"
            width={BRAND_ASSETS.logoWidth}
            height={BRAND_ASSETS.logoHeight}
            sizes="160px"
            className="h-14 w-auto rounded-md"
          />
          <p className="mt-6 max-w-sm leading-relaxed text-white/75">
            Lincoln Online, Lincoln University College. Flexible online study from Foundation to PhD.
          </p>
          <a href={LINKS.apply} className="btn btn-primary btn-sm mt-8">
            Apply Now
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
        </div>

        <nav aria-labelledby="footer-quick" className="lg:col-span-2">
          <h3 id="footer-quick" className="text-sm font-bold uppercase tracking-[0.14em] text-white">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-1">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-info" className="lg:col-span-2">
          <h3 id="footer-info" className="text-sm font-bold uppercase tracking-[0.14em] text-white">
            Additional Info
          </h3>
          <ul className="mt-5 space-y-1">
            {ADDITIONAL_INFO_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Contact Us</h3>
          <address className="mt-5 space-y-4 not-italic">
            <p className="flex gap-3 text-white/75">
              <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
              <span>
                <span className="block font-semibold text-white">{CONTACT.legalName}</span>
                {CONTACT.address}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden className="mt-2.5 h-5 w-5 shrink-0 text-brand-accent" />
              <span className="flex flex-col">
                <a href={CONTACT.hotline.href} className={linkCls}>
                  {CONTACT.hotline.label} <span className="text-white/60">(Hotline)</span>
                </a>
                <a href={CONTACT.tollFree.href} className={linkCls}>
                  {CONTACT.tollFree.label} <span className="text-white/60">(Malaysia Toll Free)</span>
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden className="mt-2.5 h-5 w-5 shrink-0 text-brand-accent" />
              <a href={CONTACT.email.href} className={linkCls}>
                {CONTACT.email.label}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-sm text-white/70 sm:flex-row">
          <p>© 2026 Lincoln University College. All rights reserved.</p>
          <a href={LINKS.portal} className="inline-flex min-h-[44px] items-center hover:text-white">
            Lincoln Online Portal
          </a>
        </div>
      </div>
    </footer>
  );
}
