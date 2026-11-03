export const NETWORK_ERROR = "We couldn't reach our server — your connection may have dropped. Your details are still filled in.";

/**
 * POSTs JSON and returns the parsed reply. If the request never gets a response (Safari: "Load failed",
 * Chrome: "Failed to fetch"), it waits briefly and tries once more. Repeat submissions are safe: the admin
 * portal merges duplicates by email / WhatsApp number.
 */
export async function postJson<T extends object>(url: string, body: unknown): Promise<{ res: Response; data: Partial<T> }> {
  const send = () =>
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  let res: Response;
  try {
    res = await send();
  } catch {
    await new Promise((r) => setTimeout(r, 1500));
    try {
      res = await send();
    } catch {
      throw new Error(NETWORK_ERROR);
    }
  }
  const data = (await res.json().catch(() => ({}))) as Partial<T>;
  return { res, data };
}
