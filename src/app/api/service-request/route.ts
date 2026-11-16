import { NextResponse } from "next/server";
import { SERVICE_FORMS, isServiceKind, servicePayload, validateService, type ServiceValues } from "@/lib/service-request";
import { emailSubmission, staffRecipients, type Rows } from "@/lib/mail";

export const runtime = "nodejs";

const LEAD_KINDS = new Set(["apply", "eligibility", "scholarship", "question"]);
const str = (v: unknown, max = 300) => (typeof v === "string" ? v.slice(0, max) : "");

/**
 * Receives every student-service form on the site (apply, eligibility, scholarship, certificate verification,
 * questions) and forwards it to the same webhook as programme enquiries, tagged with `service`.
 * With Resend configured (src/lib/mail.ts), staff also get an email copy, and the student gets a receipt
 * when the Admin Portal (which sends its own emails) is not handling the request.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || !isServiceKind(body.service)) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const kind = body.service;

  // Honeypot filled → silently accept and drop (bot).
  if (typeof body.company === "string" && body.company) return NextResponse.json({ ok: true });

  const values: ServiceValues = {};
  for (const f of SERVICE_FORMS[kind].fields) {
    const v = body[f.name];
    values[f.name] = typeof v === "string" ? v.slice(0, 2000) : "";
  }

  const errors = validateService(kind, values);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const payload = {
    service: kind,
    serviceName: SERVICE_FORMS[kind].title,
    ...servicePayload(kind, values),
    source: "Lincoln Online website",
    submittedAt: new Date().toISOString(),
  };

  const apiUrl = process.env.LEADS_API_URL;
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  // Student requests become leads in the Admin Portal. Certificate verification is not a lead (and has no
  // phone number), so it only goes to the webhook.
  const toPortal = !!apiUrl && LEAD_KINDS.has(kind);
  const toEmail = staffRecipients(kind).length > 0;

  if (!toPortal && !webhook && !toEmail) {
    if (process.env.NODE_ENV === "production") {
      console.error(`[service-request] No destination for "${kind}" (set LEADS_API_URL, ENQUIRY_WEBHOOK_URL or RESEND_*).`);
      return NextResponse.json({ ok: false, error: "This service is temporarily unavailable." }, { status: 503 });
    }
    console.info("[service-request] (dev, no destination configured)", payload);
    return NextResponse.json({ ok: true });
  }

  if (toPortal) {
    const p = payload as Record<string, string | undefined>;
    const skip = new Set(["fullName", "email", "country", "whatsapp", "programme"]);
    const details = SERVICE_FORMS[kind].fields
      .filter((f) => !skip.has(f.name) && (values[f.name] ?? "").trim())
      .map((f) => `${f.label}: ${values[f.name]!.trim()}`);
    const lead = {
      fullName: p.fullName,
      email: p.email,
      country: p.country,
      countryCode: values.country,
      whatsappNumber: p.whatsapp,
      programmeId: values.programme || undefined,
      source: `website-${kind}`,
      utm_source: str(body.utm_source, 120) || undefined,
      utm_medium: str(body.utm_medium, 120) || undefined,
      utm_campaign: str(body.utm_campaign, 160) || undefined,
      pageUrl: str(body.pageUrl, 500) || req.headers.get("referer") || undefined,
      // The form states that submitting lets us use these details to handle the request (Privacy Policy).
      consent: true,
      message: [SERVICE_FORMS[kind].title, ...details].join("\n"),
    };
    try {
      const res = await fetch(apiUrl!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.LEADS_API_KEY ? { "x-api-key": process.env.LEADS_API_KEY } : {}),
          "x-client-ip": req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
        },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(10_000),
      });
      if (res.status === 429) return NextResponse.json({ ok: false, error: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
      if (res.status === 422) {
        console.warn("[service-request] portal rejected", await res.json().catch(() => null));
        return NextResponse.json({ ok: false, error: "Please check your details and try again." }, { status: 422 });
      }
      if (!res.ok) throw new Error(`Lead API responded ${res.status}`);
    } catch (err) {
      console.error("[service-request] sending to the admin portal failed", err);
      return NextResponse.json({ ok: false, error: "We couldn't send your request." }, { status: 502 });
    }
  }

  let webhookOk = false;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      webhookOk = true;
    } catch (err) {
      console.error("[service-request] webhook failed", err);
    }
  }

  const form = SERVICE_FORMS[kind];
  const p = payload as Record<string, string | undefined>;
  const rows: Rows = form.fields.map((f) => [f.label, p[f.name]]);
  const emailed = await emailSubmission({
    kind,
    title: form.title,
    email: p.email,
    fullName: p.fullName,
    rows,
    // The portal already emails students about leads, so only send our own receipt when it isn't involved.
    recordedElsewhere: toPortal || webhookOk,
    receipt: toPortal
      ? undefined
      : { message: form.success, rows: rows.filter(([label]) => !/IC \/ Passport/i.test(label)) },
  });

  // Fail only when nothing received the request; otherwise it is safely recorded somewhere.
  if (!toPortal && !webhookOk && !emailed) {
    return NextResponse.json({ ok: false, error: "We couldn't send your request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
