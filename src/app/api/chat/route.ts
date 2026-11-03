import Anthropic from "@anthropic-ai/sdk";
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

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return text("The chat assistant isn't set up yet. Please use the enquiry form and a counsellor will reply.", 503);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return text("You've sent a lot of messages in a short time. Please wait a few minutes, or talk to a counsellor.", 429);
  }

  const body = (await req.json().catch(() => null)) as { messages?: unknown } | null;
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
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
            sent = true;
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !sent) {
          controller.enqueue(encoder.encode("Sorry, I can't help with that. A counsellor can: [talk to a counsellor](/#admissions)."));
        }
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError) console.error("[chat] rate limited by API");
        else if (err instanceof Anthropic.APIError) console.error(`[chat] API error ${err.status}:`, err.message);
        else console.error("[chat]", err);
        controller.enqueue(
          encoder.encode(
            (sent ? "\n\n" : "") +
              "Sorry, something went wrong on our side. Please try again, or [talk to a counsellor](/#admissions).",
          ),
        );
      } finally {
        controller.close();
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
