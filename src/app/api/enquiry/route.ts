import { NextResponse } from "next/server";
import { countryByCode } from "@/data/countries";
import { courseById } from "@/lib/courses";
import { SITE_URL } from "@/data/site";
import { fullWhatsappNumber, validateEnquiry, type EnquiryInput } from "@/lib/enquiry";

export const runtime = "nodejs";

const absolute = (link?: string) => (link?.startsWith("/") ? `${SITE_URL}${link}` : link);
const str = (v: unknown, max = 300) => (typeof v === "string" ? v.slice(0, max) : "");

/**
 * Enquiry form endpoint. Validates, then sends the lead to the LUC ODL Admin Portal
 * (LEADS_API_URL + LEADS_API_KEY), which de-duplicates, assigns a counsellor and emails the student.
 * ENQUIRY_WEBHOOK_URL is optional: if set, a copy is also posted there (e.g. a Google Sheet / Zapier).
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });

  const input: EnquiryInput = {
    fullName: str(body.fullName),
    email: str(body.email),
    country: str(body.country),
    whatsapp: str(body.whatsapp),
    programme: str(body.programme),
    consent: body.consent === true,
    company: str(body.company),
  };

  // Honeypot filled → silently accept and drop (bot).
  if (input.company) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const course = courseById(input.programme);
  const lead = {
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    country: countryByCode(input.country)?.name ?? input.country,
    countryCode: input.country,
    whatsappNumber: fullWhatsappNumber(input),
    programmeId: input.programme,
    source: "website",
    utm_source: str(body.utm_source, 120) || undefined,
    utm_medium: str(body.utm_medium, 120) || undefined,
    utm_campaign: str(body.utm_campaign, 160) || undefined,
    pageUrl: str(body.pageUrl, 500) || req.headers.get("referer") || undefined,
    consent: input.consent,
  };

  const apiUrl = process.env.LEADS_API_URL;
  const apiKey = process.env.LEADS_API_KEY;
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  if (!apiUrl && !webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("[enquiry] LEADS_API_URL is not set — enquiry rejected so it is not lost silently.");
      return NextResponse.json({ ok: false, error: "Our enquiry service is temporarily unavailable." }, { status: 503 });
    }
    console.info("[enquiry] (dev, no LEADS_API_URL configured)", lead);
    return NextResponse.json({ ok: true });
  }

  if (apiUrl) {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
          // So the portal rate-limits per visitor, not per website server.
          "x-client-ip": req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
        },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(10_000),
      });
      if (res.status === 422) {
        // Shouldn't happen (same rules here), but show the portal's message rather than a generic failure.
        const data = (await res.json().catch(() => ({}))) as { errors?: Record<string, string> };
        console.warn("[enquiry] portal rejected lead", data.errors);
        return NextResponse.json({ ok: false, error: "Please check your details and try again." }, { status: 422 });
      }
      if (res.status === 429) {
        return NextResponse.json({ ok: false, error: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
      }
      if (!res.ok) throw new Error(`Lead API responded ${res.status}`);
    } catch (err) {
      console.error("[enquiry] sending to the admin portal failed", err);
      return NextResponse.json({ ok: false, error: "We couldn't send your enquiry." }, { status: 502 });
    }
  }

  if (webhook) {
    const copy = { ...lead, whatsapp: lead.whatsappNumber, programme: course?.title, programmeUrl: absolute(course?.link), submittedAt: new Date().toISOString() };
    try {
      const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(copy), signal: AbortSignal.timeout(10_000) });
      if (!r.ok) throw new Error(`Webhook responded ${r.status}`);
    } catch (err) {
      console.error("[enquiry] webhook failed", err);
      // Only fatal when the webhook is the sole destination; otherwise the portal already has the lead.
      if (!apiUrl) return NextResponse.json({ ok: false, error: "We couldn't send your enquiry." }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
