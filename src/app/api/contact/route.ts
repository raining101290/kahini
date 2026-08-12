import { NextResponse } from "next/server";
import { z } from "zod";
import { renderContactNotificationEmail } from "@/lib/email/contact-notification";
import { sendMail } from "@/lib/email/mailer";
import { rateLimit } from "@/lib/rate-limit";

// nodemailer needs Node APIs (net/tls) that aren't available on the Edge
// runtime — pin this route to Node.js explicitly.
export const runtime = "nodejs";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "hello@kahinistudios.com";

const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name so we know who's writing.")
    .max(200, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Enter an email address so we can reply.")
    .max(320, "That email address is too long.")
    .refine(
      (value) => z.email().safeParse(value).success,
      "That email address doesn't look right."
    ),
  subject: z.enum(["Creator", "Brand", "Press", "Other"], {
    error: "Choose a subject so we can route your message.",
  }),
  message: z
    .string()
    .trim()
    .min(1, "Add a message so we know how to help.")
    .max(5000, "That message is too long — please keep it under 5000 characters."),
  // Honeypot: a field real users never see or fill in (hidden off-screen in
  // the form, see contact-form.tsx). Bots that blindly fill every field
  // trip it. Deliberately unconstrained here — rejecting a non-empty value
  // at the schema level would surface a distinct validation error a bot
  // could use to detect and route around the honeypot. Instead it's left to
  // parse successfully and checked after, so a tripped honeypot and a
  // normal submission look identical from the outside (see below).
  company: z.string().optional(),
});

function getClientIp(request: Request): string {
  // Behind a reverse proxy / CDN, the real client IP is in a forwarded
  // header (list, client first) rather than the (proxy's) socket address,
  // which this runtime doesn't expose directly on `Request` anyway.
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSeconds } = rateLimit(ip, {
    limit: 5,
    windowMs: 10 * 60 * 1000, // 5 submissions per 10 minutes per IP
  });

  if (!allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many messages sent from this connection. Please try again shortly.",
      },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't read that submission. Please try again." },
      { status: 400 }
    );
  }

  const result = ContactSchema.safeParse(body);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form and try again.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  // Honeypot tripped — a bot filled in a field real users never see. Report
  // success without sending anything, so scripted submitters have no signal
  // to distinguish this from a real send and adapt around it.
  if (result.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, subject, message } = result.data;

  try {
    const rendered = renderContactNotificationEmail({
      name,
      email,
      subject,
      message,
      submittedAt: new Date(),
    });

    await sendMail({
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });
  } catch (error) {
    console.error("[contact] failed to send notification email:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong sending your message. Please try again shortly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
