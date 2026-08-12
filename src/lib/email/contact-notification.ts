import type { ContactSubject } from "@/lib/contact-intent";

export type ContactNotificationInput = {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
  submittedAt: Date;
};

// Bare-minimum HTML escaping — this is user-submitted text going straight
// into an HTML email body, so it must not be interpretable as markup (e.g.
// a message containing "<img src=x onerror=...>" landing in an inbox).
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Line breaks in the plain-text message need to survive into HTML as <br>,
// applied after escaping so a literal "<br>" typed by the sender can't
// smuggle in a real line break tag.
function escapeAndBreak(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

const BRAND = {
  ink: "#0a0710",
  surface: "#150d1e",
  plum: "#2e1338",
  alta: "#c32424",
  marigold: "#f0a202",
  ivory: "#f4ede2",
  muted: "#9a8fa6",
};

export function renderContactNotificationEmail(
  input: ContactNotificationInput
): { subject: string; html: string; text: string } {
  const { name, email, subject, message, submittedAt } = input;

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(submittedAt);

  const emailSubject = `[Kahini contact] ${subject} — ${name}`;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(emailSubject)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:${BRAND.ink}; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.ink}; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:${BRAND.surface}; border:1px solid ${BRAND.plum}; border-radius:12px; overflow:hidden;">
            <tr>
              <td style="padding:24px 32px; border-bottom:1px solid ${BRAND.plum};">
                <span style="font-size:12px; letter-spacing:0.15em; text-transform:uppercase; color:${BRAND.marigold}; font-weight:600;">
                  Kahini Studios
                </span>
                <h1 style="margin:8px 0 0; font-size:20px; line-height:1.3; color:${BRAND.ivory};">
                  New contact form submission
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:0 0 16px; color:${BRAND.muted}; font-size:13px; width:88px; vertical-align:top;">Name</td>
                    <td style="padding:0 0 16px; color:${BRAND.ivory}; font-size:14px; vertical-align:top;">${escapeHtml(name)}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 16px; color:${BRAND.muted}; font-size:13px; vertical-align:top;">Email</td>
                    <td style="padding:0 0 16px; font-size:14px; vertical-align:top;">
                      <a href="mailto:${escapeHtml(email)}" style="color:${BRAND.marigold}; text-decoration:none;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 16px; color:${BRAND.muted}; font-size:13px; vertical-align:top;">Subject</td>
                    <td style="padding:0 0 16px; vertical-align:top;">
                      <span style="display:inline-block; padding:4px 10px; border-radius:999px; background-color:${BRAND.alta}; color:${BRAND.ivory}; font-size:12px; font-weight:600;">
                        ${escapeHtml(subject)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 16px; color:${BRAND.muted}; font-size:13px; vertical-align:top;">Received</td>
                    <td style="padding:0 0 16px; color:${BRAND.ivory}; font-size:14px; vertical-align:top;">${escapeHtml(formattedDate)} (Dhaka time)</td>
                  </tr>
                </table>
                <div style="margin-top:8px; padding-top:20px; border-top:1px solid ${BRAND.plum};">
                  <p style="margin:0 0 8px; color:${BRAND.muted}; font-size:13px;">Message</p>
                  <p style="margin:0; color:${BRAND.ivory}; font-size:15px; line-height:1.6; white-space:pre-wrap;">${escapeAndBreak(message)}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px; background-color:${BRAND.ink}; border-top:1px solid ${BRAND.plum};">
                <p style="margin:0; color:${BRAND.muted}; font-size:12px;">
                  Sent from the contact form at kahinistudios.com. Reply directly to this email to respond to ${escapeHtml(name)}.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "New contact form submission",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    `Received: ${formattedDate} (Dhaka time)`,
    "",
    "Message:",
    message,
  ].join("\n");

  return { subject: emailSubject, html, text };
}
