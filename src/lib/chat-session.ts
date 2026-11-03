/**
 * Random id for this browser tab's "Ask us" conversation. The admin portal stores the chat under it, and
 * the enquiry form sends it along so counsellors see what the student asked before enquiring.
 * Kept in sessionStorage (one per tab, gone when the tab closes); falls back to memory if storage is blocked.
 */
const KEY = "luc-chat-session";
let memory: string | null = null;

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** The id if this tab has used the chat, otherwise null. */
export function peekChatSessionId(): string | null {
  try {
    return sessionStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}

/** The id for this tab, created on first use. */
export function chatSessionId(): string {
  const existing = peekChatSessionId();
  if (existing) return existing;
  memory = newId();
  try {
    sessionStorage.setItem(KEY, memory);
  } catch {
    /* storage blocked: keep it in memory */
  }
  return memory;
}
