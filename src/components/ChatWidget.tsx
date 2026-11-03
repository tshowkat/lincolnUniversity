"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { chatSessionId } from "@/lib/chat-session";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm the Lincoln Online assistant. Ask me about our programmes, certifications, how to apply, exams or student services.",
};

const SUGGESTIONS = [
  "Which MBA or business programmes do you offer?",
  "How do I apply?",
  "Am I eligible for a Master's?",
  "What should I bring to an exam?",
];

/** Renders the small markdown subset the assistant uses: [links](/path), **bold**, and "- " bullet lists. */
function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      const href = m[2];
      const safe = href.startsWith("/") || href.startsWith("https://");
      parts.push(
        safe ? (
          <a
            key={m.index}
            href={href}
            className="font-semibold text-brand-primary underline underline-offset-2 hover:text-brand-deep"
            {...(href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {m[1]}
          </a>
        ) : (
          m[1]
        ),
      );
    } else {
      parts.push(<strong key={m.index}>{m[3]}</strong>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function Markdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((l) => /^\s*[-*•]\s+/.test(l))) {
          return (
            <ul key={i} className="my-1 list-disc space-y-1 pl-5">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\s*[-*•]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="my-1">
            {lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {inline(l.replace(/^#+\s*/, ""))}
              </Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setInput("");
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);

    const update = (content: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI-only; the API expects the conversation to start with the student.
        body: JSON.stringify({ messages: history.slice(1), sessionId: chatSessionId(), pageUrl: window.location.href }),
      });
      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        update(answer);
      }
      if (!answer.trim()) update("Sorry, I didn't get a reply. Please try again.");
    } catch {
      update("I couldn't reach the server. Check your connection and try again, or [talk to a counsellor](/#admissions).");
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  const waiting = busy && messages[messages.length - 1]?.content === "";

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed bottom-24 right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-brand-secondary pl-4 pr-5 text-sm font-semibold text-white shadow-glow ring-4 ring-white transition hover:bg-brand-deep active:scale-95 md:bottom-6 md:right-6"
            aria-label="Ask a question: open chat assistant"
          >
            <Sparkles aria-hidden className="h-5 w-5" />
            Ask us
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Lincoln Online chat assistant"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-x-2 bottom-2 top-16 z-50 flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-neutral-900/10 md:inset-x-auto md:bottom-6 md:right-6 md:top-auto md:h-[min(600px,calc(100vh-6rem))] md:w-[400px]"
          >
            <header className="flex items-center gap-3 bg-brand-secondary px-4 py-3 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Bot aria-hidden className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-tight">Lincoln Online assistant</p>
                <p className="text-xs text-white/75">AI answers. A counsellor can confirm details.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/15"
                aria-label="Close chat"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-neutral-50 px-4 py-4" aria-live="polite">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="ml-10 rounded-2xl rounded-br-sm bg-brand-primary px-4 py-2.5 text-[15px] text-white">
                    {m.content}
                  </div>
                ) : m.content ? (
                  <div key={i} className="mr-6 rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-[15px] leading-relaxed text-ink shadow-sm ring-1 ring-neutral-900/5">
                    <Markdown text={m.content} />
                  </div>
                ) : null,
              )}
              {waiting && (
                <div className="mr-6 inline-flex gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-neutral-900/5" aria-label="Assistant is typing">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" style={{ animationDelay: `${d * 150}ms` }} />
                  ))}
                </div>
              )}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-brand-primary/30 bg-white px-3 py-1.5 text-left text-sm text-brand-primary hover:bg-brand-primary/5"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2 border-t border-neutral-900/10 bg-white p-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Your question
              </label>
              <textarea
                id="chat-input"
                ref={inputRef}
                rows={1}
                maxLength={1000}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Type your question…"
                className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-neutral-300 px-3 py-2.5 text-[15px] focus:border-brand-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white transition hover:bg-brand-deep disabled:opacity-40"
                aria-label="Send"
              >
                <Send aria-hidden className="h-5 w-5" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
