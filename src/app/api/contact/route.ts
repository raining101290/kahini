import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name so we know who's writing."),
  email: z
    .string()
    .trim()
    .min(1, "Enter an email address so we can reply.")
    .refine(
      (value) => z.email().safeParse(value).success,
      "That email address doesn't look right — check for typos."
    ),
  subject: z.enum(["Creator", "Brand", "Press", "Other"], {
    error: "Choose a subject so we can route your message.",
  }),
  message: z.string().trim().min(1, "Add a message so we know how to help."),
});

export async function POST(request: Request) {
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

  // TODO(email-provider): wire this up to a real transactional email service
  // (e.g. Resend, Postmark, SES) so submissions actually reach
  // hello@kahinistudios.com. For now this just logs server-side.
  console.log("[contact] new submission:", result.data);

  return NextResponse.json({ ok: true });
}
