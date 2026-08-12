// Minimal in-memory sliding-window rate limiter, keyed by caller-supplied
// key (typically an IP address).
//
// Caveat: this state lives in the Node.js process's memory. It resets on
// redeploy/restart and is NOT shared across multiple instances (e.g. a
// multi-replica/serverless deployment) — each instance enforces its own
// limit independently, so the effective global limit scales with instance
// count. That's an acceptable trade-off for a low-traffic contact form and
// needs no extra infrastructure; if this app moves to a multi-instance
// deployment and abuse becomes a real problem, swap this for a shared store
// (e.g. Upstash Redis) without changing the call site.
const hits = new Map<string, number[]>();

// Sweep old entries occasionally so `hits` doesn't grow unbounded under
// sustained traffic from many distinct IPs.
let lastSweep = 0;
const SWEEP_INTERVAL_MS = 5 * 60 * 1000;

function sweep(windowMs: number, now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, timestamps] of hits) {
    const fresh = timestamps.filter((t) => now - t < windowMs);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  sweep(windowMs, now);

  const timestamps = (hits.get(key) ?? []).filter(
    (t) => now - t < windowMs
  );

  if (timestamps.length >= limit) {
    const oldest = timestamps[0];
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((windowMs - (now - oldest)) / 1000),
    };
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return { allowed: true, retryAfterSeconds: 0 };
}
