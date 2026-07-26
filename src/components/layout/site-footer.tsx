import Link from "next/link";
import { X } from "lucide-react";
import { nav, site, contact, social } from "@/content/site";
import { HashLink } from "@/components/layout/hash-link";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M15 3h-2a5 5 0 0 0-5 5v2H6v4h2v7h4v-7h2.5l.5-4H12V8a1 1 0 0 1 1-1h2z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l6 3-6 3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialIcons = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  X: X,
  YouTube: YoutubeIcon,
} as const;

export function SiteFooter() {
  return (
    <footer className="border-plum bg-ink border-t">
      <div className="overflow-hidden">
        <p
          className="font-display text-ivory px-4 leading-none font-extrabold whitespace-nowrap sm:px-6"
          style={{
            fontSize: "clamp(2rem, 7vw, 7.5rem)",
            fontStretch: "85%",
            height: "0.72em",
          }}
        >
          Entertainment, one minute at a time.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-12 px-6 py-16 lg:grid-cols-4">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
          <span className="font-display text-ivory text-2xl font-extrabold">
            {site.brand}
          </span>
          <p className="text-body-sm text-muted">{site.tagline}</p>
          <p lang="bn" className="font-display text-body-sm text-muted">
            {site.taglineBn}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-body-sm text-marigold">Pages</h3>
          <ul className="flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <HashLink
                  href={item.href}
                  className={`text-body-sm text-ivory/90 hover:text-ivory ${focusRing}`}
                >
                  {item.label}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-body-sm text-marigold">Legal</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/privacy-policy"
                className={`text-body-sm text-ivory/90 hover:text-ivory ${focusRing}`}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className={`text-body-sm text-ivory/90 hover:text-ivory ${focusRing}`}
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className={`text-body-sm text-ivory/90 hover:text-ivory ${focusRing}`}
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-body-sm text-marigold">Contact</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className={`text-body-sm text-ivory/90 hover:text-ivory ${focusRing}`}
              >
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${contact.phone}`}
                className={`text-body-sm text-ivory/90 hover:text-ivory ${focusRing}`}
              >
                {contact.phone}
              </a>
            </li>
            <li className="text-body-sm text-muted">{contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl gap-5 px-6 pb-10">
        {social.map((item) => {
          const Icon = socialIcons[item.label];
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={`text-ivory hover:text-marigold p-1 transition-colors ${focusRing}`}
            >
              <Icon className="size-5" />
            </a>
          );
        })}
      </div>

      <div className="border-plum border-t px-6 py-6">
        <p className="text-body-sm text-muted mx-auto max-w-6xl">
          © {site.legal} — all rights reserved.
        </p>
      </div>
    </footer>
  );
}
