import nodemailer, { type Transporter } from "nodemailer";

// SMTP delivery for transactional mail (currently just the contact form).
// Requires these env vars in production — see .env.example:
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
// Optional:
//   SMTP_SECURE ("true" for port 465/implicit TLS, otherwise STARTTLS is used)
//   SMTP_FROM   (defaults to `"Kahini Studios" <SMTP_USER>`)
//   CONTACT_TO_EMAIL (defaults to hello@kahinistudios.com)

// True once real SMTP credentials are in place. Lets the API route tell
// "not configured yet" (simulate — see route.ts) apart from "configured but
// the send itself failed" (a real error worth surfacing as a 502).
export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error(
      "SMTP is not configured — set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS."
    );
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  return cachedTransporter;
}

export type SendMailInput = {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendMail(input: SendMailInput): Promise<void> {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM ?? `"Kahini Studios" <${process.env.SMTP_USER}>`;

  await transporter.sendMail({
    from,
    to: input.to,
    replyTo: input.replyTo,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
}
