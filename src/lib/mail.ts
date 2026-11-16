/**
 * Transactional email through Resend (https://resend.com), called over its REST API so no SDK is needed.
 *
 * RESEND_API_KEY   API key from resend.com/api-keys.
 * RESEND_FROM      Sender on a domain verified in Resend, e.g. "Lincoln Online <no-reply@odl.lincoln.edu.my>".
 * RESEND_NOTIFY_TO Staff inbox(es) that get a copy of every form submission (comma-separated).
 * RESEND_VERIFY_TO Optional: inbox(es) for certificate verification requests (defaults to RESEND_NOTIFY_TO).
 */
import { CONTACT } from "@/data/site";

const list = (v?: string) => (v ?? "").split(",").map((s) => s.trim()).filter(Boolean);

export const mailConfigured = () => !!process.env.RESEND_API_KEY && !!process.env.RESEND_FROM;

/** Staff recipients for a form, or [] when Resend is not set up. */
export function staffRecipients(kind?: string): string[] {
  if (!mailConfigured()) return [];
  const verify = kind === "verify" ? list(process.env.RESEND_VERIFY_TO) : [];
  return verify.length ? verify : list(process.env.RESEND_NOTIFY_TO);
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

interface Mail {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export async function sendMail(mail: Mail): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM,
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
}

export type Rows = [label: string, value: string | undefined][];

const layout = (heading: string, intro: string, rows: Rows, footer = "") => {
  const filled = rows.filter(([, v]) => v && v.trim());
  const table = filled
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top;white-space:nowrap">${esc(k)}</td>` +
        `<td style="padding:6px 0;white-space:pre-wrap">${esc(v!)}</td></tr>`,
    )
    .join("");
  const html =
    `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a;max-width:600px">` +
    `<h2 style="margin:0 0 12px;font-size:20px">${esc(heading)}</h2><p style="margin:0 0 16px">${esc(intro)}</p>` +
    (table ? `<table style="border-collapse:collapse">${table}</table>` : "") +
    (footer ? `<p style="margin:20px 0 0;color:#555;font-size:13px">${esc(footer)}</p>` : "") +
    `</div>`;
  const text = [heading, "", intro, "", ...filled.map(([k, v]) => `${k}: ${v}`), ...(footer ? ["", footer] : [])].join("\n");
  return { html, text };
};

/** Copy of a submission for staff; replies go straight to the student. */
export function staffNotification(title: string, studentEmail: string | undefined, rows: Rows) {
  const name = rows.find(([k]) => /name/i.test(k))?.[1];
  return {
    subject: `New ${title.toLowerCase()}${name ? ` from ${name}` : ""}`,
    replyTo: studentEmail,
    ...layout(title, "A new submission arrived from the Lincoln Online website. Reply to this email to answer the student.", rows),
  };
}

/** Receipt for the person who submitted the form. */
export function studentReceipt(title: string, fullName: string | undefined, message: string, rows: Rows) {
  return {
    subject: `We've received your ${title.toLowerCase()} | Lincoln Online`,
    replyTo: CONTACT.email.label,
    ...layout(
      `Hello${fullName ? ` ${fullName}` : ""},`,
      message,
      rows,
      `Questions? Reply to this email or contact ${CONTACT.email.label} / ${CONTACT.hotline.label}. Lincoln University College, ${CONTACT.address}.`,
    ),
  };
}

/**
 * Sends the staff copy, then (when `receipt` is given) the student receipt, but only if the submission was
 * recorded somewhere (`recordedElsewhere` or the staff copy), so a student never gets a receipt for a failed
 * request. Returns whether the staff copy went out. Never throws; failures are logged.
 */
export async function emailSubmission(opts: {
  kind?: string;
  title: string;
  email?: string;
  fullName?: string;
  rows: Rows;
  recordedElsewhere: boolean;
  /** Message for the student receipt; omit when another system already emails the student. */
  receipt?: { message: string; rows: Rows };
}): Promise<boolean> {
  const staff = staffRecipients(opts.kind);
  let staffOk = false;
  if (staff.length) {
    try {
      await sendMail({ to: staff, ...staffNotification(opts.title, opts.email, opts.rows) });
      staffOk = true;
    } catch (err) {
      console.error("[mail] staff notification failed", err);
    }
  }
  if (mailConfigured() && opts.receipt && opts.email && (staffOk || opts.recordedElsewhere)) {
    try {
      await sendMail({ to: [opts.email], ...studentReceipt(opts.title, opts.fullName, opts.receipt.message, opts.receipt.rows) });
    } catch (err) {
      console.error("[mail] student receipt failed", err);
    }
  }
  return staffOk;
}
