# LUC Centre of Open & Distance Learning: Website

A conversion-focused, responsive landing site for the **Centre of Open & Distance Learning (ODL)** at
**Lincoln University College (LUC), Malaysia**. It lists the 30 official ODL programmes, each with its own page, and hosts **every student service on
this site** with no links to outside websites.

### Student service pages

| Route | Service |
| --- | --- |
| `/portal` | Lincoln Online Portal: hub for all student services |
| `/portal/sign-in` | Learning portal. **[CLIENT TO PROVIDE]** Connect the learning system (SSO) to enable sign-in |
| `/apply`, `/eligibility`, `/scholarships`, `/verify-certificate` | Request forms (one shared form, `src/lib/service-request.ts`) |
| `/faqs` | FAQs + "Ask a question" form |
| `/examination-rules` | Examination Rules & Regulations (`src/data/exam-rules.ts`) |
| `/privacy-policy`, `/refund-policy`, `/terms-and-conditions` | Policies (`src/data/policies.ts`). Sections LUC has not yet published are marked **[CLIENT TO PROVIDE]** |
| `/programmes/[id]` | One page per programme, generated from `src/data/programmes.ts` |
| `/certifications`, `/certifications/[id]` | 72 engineering certification programmes in 12 domains, generated from `src/data/certifications.ts`. Certifications appear in the Apply / Eligibility / Enquiry programme dropdowns (ids prefixed `cert-`) |

All service forms post to `/api/service-request`, which validates them and forwards them to the same
`ENQUIRY_WEBHOOK_URL` as programme enquiries. Each payload carries `service` (`apply`, `eligibility`,
`scholarship`, `verify`, `question`) so the receiving system can route it.

**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide icons.

---

## 1. Setup

Requirements: **Node.js 18.17+** (Node 20 LTS recommended) and npm.

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL used for Open Graph, sitemap and robots, e.g. `https://odl.example.edu.my` |
| `ENQUIRY_WEBHOOK_URL` | **Production** | **[CLIENT TO PROVIDE]** Endpoint that receives enquiry form submissions as JSON (CRM, Zapier, Make, n8n, Google Apps Script…) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | **[CLIENT TO PROVIDE]** WhatsApp number, digits only (e.g. `60123456789`). If empty, the floating button opens the enquiry form instead |

> In production, if `ENQUIRY_WEBHOOK_URL` is not set, the form shows an error and asks the visitor to
> email `info@lincoln.edu.my` instead, so no lead is silently lost. In development, submissions are
> written to the server console.

Webhook payload:

```json
{
  "fullName": "…", "email": "…", "country": "Malaysia", "whatsapp": "+60123456789",
  "programmeId": "mba", "programme": "Master of Business Administration",
  "programmeUrl": "https://www.lincoln.edu.my/master-of-business-administration-2/",
  "source": "LUC Centre of ODL website", "submittedAt": "2026-11-02T08:00:00.000Z"
}
```

## 2. Scripts

```bash
npm run dev        # local development
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (next/core-web-vitals)
npm run typecheck  # TypeScript, no emit
```

## 3. Deploy to Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project**, import the repo, and keep the defaults (Framework: Next.js).
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL`, `ENQUIRY_WEBHOOK_URL`
   and (optionally) `NEXT_PUBLIC_WHATSAPP_NUMBER`.
4. Deploy. Add the custom domain under **Settings → Domains** and update `NEXT_PUBLIC_SITE_URL` to match.

CLI alternative: `npm i -g vercel && vercel && vercel --prod`.

Programme images are served from `www.lincoln.edu.my` and optimised by `next/image` (AVIF/WebP, responsive
sizes, lazy-loaded below the fold). The allowed host is set in `next.config.mjs`.

## 4. Folder structure

```
.
├── next.config.mjs           # image domains, security headers
├── tailwind.config.ts        # brand colours (from CSS variables), fonts, shadows
├── .env.example
└── src
    ├── app
    │   ├── layout.tsx         # fonts, SEO metadata, Open Graph, skip link
    │   ├── page.tsx           # page composition + JSON-LD (Organisation + Course list)
    │   ├── globals.css        # brand tokens, base styles, buttons, focus states
    │   ├── opengraph-image.tsx# generated 1200×630 social share image
    │   ├── robots.ts / sitemap.ts
    │   └── api/enquiry/route.ts  # validates and forwards enquiries to the webhook
    ├── components
    │   ├── Header.tsx          # sticky, shrinks with glass blur on scroll, mobile menu
    │   ├── Hero.tsx            # headline, CTAs, animated counters, image collage
    │   ├── ProgrammeExplorer.tsx / ProgrammeCard.tsx
    │   ├── WhyODL.tsx · HowItWorks.tsx · Testimonials.tsx · FAQ.tsx
    │   ├── EnquirySection.tsx / EnquiryForm.tsx
    │   ├── CTABanner.tsx · Footer.tsx · FloatingActions.tsx
    │   └── Reveal.tsx · Counter.tsx · SectionHeading.tsx · Providers.tsx
    ├── data
    │   ├── programmes.ts       # ← all 30 programmes (single source of truth)
    │   ├── site.ts             # official URLs, contact details, navigation
    │   ├── content.ts          # testimonials + FAQs ([CLIENT TO PROVIDE] placeholders)
    │   └── countries.ts        # country list with dial codes
    └── lib
        ├── enquiry.ts          # shared client/server form validation
        ├── levels.ts           # level badge colours, field icons
        └── utils.ts
```

## 5. Editing content

### Add or edit a programme
Edit `src/data/programmes.ts` and append an object:

```ts
{
  id: "unique-slug",
  title: "Exact title from lincoln.edu.my",
  level: "Master's",             // PhD | Master's | Bachelor's | Diploma | Foundation
  field: "Business",             // one of FIELDS
  image: "https://www.lincoln.edu.my/wp-content/uploads/…",
  link: "https://www.lincoln.edu.my/…-odl/",
}
```

The explorer, filter counts, hero counter, enquiry dropdown, structured data and OG image all update
automatically. Images must be hosted on `www.lincoln.edu.my`. To use another host, add it to
`images.remotePatterns` in `next.config.mjs`.

### Placeholders to replace before launch: `[CLIENT TO PROVIDE]`
- **Testimonials:** `src/data/content.ts → TESTIMONIALS` (quote, name, programme, country; add a photo if desired)
- **FAQ answers:** `src/data/content.ts → FAQS`
- **Enquiry webhook:** `ENQUIRY_WEBHOOK_URL`
- **WhatsApp number:** `NEXT_PUBLIC_WHATSAPP_NUMBER`

The **field** assigned to each programme (used by the field filter) is an editorial grouping and is not
taken from the official site. Please review it in `programmes.ts`.

## 6. Brand

Colours were sampled from the live site's logo and its Elementor global colour tokens. They are defined
once in `src/app/globals.css`:

| Token | Hex | Source / use |
| --- | --- | --- |
| `--brand-primary` | `#DF1B22` | Logo red; primary buttons, links, Bachelor's badge |
| `--brand-secondary` | `#0F2D5E` | LUC navy; utility bar, How It Works, PhD badge |
| `--brand-accent` | `#FFD93D` | LUC gold; highlights on dark backgrounds, Diploma badge |
| `--brand-dark` | `#1F1F1F` | Headings, footer |
| `--brand-light` | `#FFF3F3` | Tinted backgrounds, Foundation badge |
| `--brand-deep` | `#A10F14` | Hover states, gradients, Master's badge |

Fonts: Plus Jakarta Sans (body) and Manrope (headings), self-hosted via `next/font`.

## 7. Accessibility & performance notes

- Semantic landmarks, skip link, one `h1`, labelled sections, visible focus rings (navy on light backgrounds, gold on dark).
- Text and UI colour pairs meet WCAG 2.1 AA (≥ 4.5:1 for body text). Gold is never used for text on white.
- All tap targets are ≥ 44px. The mobile sticky "Apply Now" bar respects the iOS safe area.
- Animations respect `prefers-reduced-motion` (CSS and Framer Motion `MotionConfig reducedMotion="user"`).
- The form uses labels, `aria-invalid`, `aria-describedby` errors, focuses the first invalid field on submit, and announces the success state.
- Only the hero images and logo load eagerly. Everything else is lazy-loaded at responsive sizes.
- After deploying, run Lighthouse against the production URL. Scores depend on hosting and on how fast the images load from `lincoln.edu.my`.
