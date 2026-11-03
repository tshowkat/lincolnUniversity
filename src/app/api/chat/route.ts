import Anthropic from "@anthropic-ai/sdk";
import { waitUntil } from "@vercel/functions";
import { SYSTEM_PROMPT } from "@/lib/chat-knowledge";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "claude-opus-5-5";
const MAX_TURNS = 20; // messages kept from the conversation
const MAX_CHARS = 1000; // per student message

// Best-effort per-IP limit (per server instance) so the public endpoint can't be used to run up the API bill.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const text = (body: string, status: number) =>
  new Response(body, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });

let client: Anthropic | null = null;

/** Admin portal endpoint that stores chats: CHAT_LOG_URL, or LEADS_API_URL with /api/leads → /api/chats. */
function chatLogUrl() {
  if (process.env.CHAT_LOG_URL) return process.env.CHAT_LOG_URL;
  const leads = process.env.LEADS_API_URL;
  return leads && /\/api\/leads\/?$/.test(leads) ? leads.replace(/\/api\/leads\/?$/, "/api/chats") : null;
}

/** Sends one finished question/answer pair to the admin portal. Never throws: logging must not break the chat. */
async function logExchange(entry: { sessionId: string; question: string; answer: string; pageUrl?: string; countryCode?: string }) {
  const url = chatLogUrl();
  const key = process.env.LEADS_API_KEY;
  if (!url || !key) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify(entry),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) console.error(`[chat] admin portal rejected chat log: ${res.status}`);
  } catch (err) {
    console.error("[chat] sending chat log to the admin portal failed", err);
  }
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return text("The chat assistant isn't set up yet. Please use the enquiry form and a counsellor will reply.", 503);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return text("You've sent a lot of messages in a short time. Please wait a few minutes, or talk to a counsellor.", 429);
  }

  const body = (await req.json().catch(() => null)) as { messages?: unknown; sessionId?: unknown; pageUrl?: unknown } | null;
  const sessionId = typeof body?.sessionId === "string" && /^[A-Za-z0-9-]{8,64}$/.test(body.sessionId) ? body.sessionId : null;
  const pageUrl = typeof body?.pageUrl === "string" ? body.pageUrl.slice(0, 500) : undefined;
  const raw = Array.isArray(body?.messages) ? body.messages : [];
  const messages: Anthropic.Beta.BetaMessageParam[] = raw
    .slice(-MAX_TURNS)
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        !!m &&
        typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, m.role === "user" ? MAX_CHARS : 4000) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return text("Please type a question.", 400);
  }

  client ??= new Anthropic();
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 2000, // replies are meant to be short
    output_config: { effort: "low" },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sent = false;
      let answer = "";
      const emit = (t: string) => {
        answer += t;
        controller.enqueue(encoder.encode(t));
      };
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            emit(event.delta.text);
            sent = true;
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !sent) {
          emit("Sorry, I can't help with that. A counsellor can: [talk to a counsellor](/#admissions).");
        }
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError) console.error("[chat] rate limited by API");
        else if (err instanceof Anthropic.APIError) console.error(`[chat] API error ${err.status}:`, err.message);
        else console.error("[chat]", err);
        emit((sent ? "\n\n" : "") + "Sorry, something went wrong on our side. Please try again, or [talk to a counsellor](/#admissions).");
      } finally {
        try {
          controller.close();
        } catch {
          /* the student closed the chat mid-reply */
        }
        if (sessionId && answer) {
          // Runs after the reply has reached the student; Vercel keeps the function alive until it finishes.
          waitUntil(
            logExchange({
              sessionId,
              question: messages[messages.length - 1]!.content as string,
              answer,
              pageUrl,
              countryCode: req.headers.get("x-vercel-ip-country") ?? undefined,
            }),
          );
        }
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
