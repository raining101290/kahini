import type { LegalDocument } from "@/content/legal";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm";

export function LegalLayout({ doc }: { doc: LegalDocument }) {
  return (
    <main className="bg-ink px-6 py-32 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[240px_1fr]">
        <nav
          aria-label="Sections"
          className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start"
        >
          <p className="font-mono text-marigold text-body-sm tracking-[0.15em] uppercase">
            On this page
          </p>
          <ul className="flex flex-col gap-3">
            {doc.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`text-body-sm text-ivory/70 hover:text-ivory ${focusRing}`}
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-4">
            <h1 className="text-display-lg text-ivory">{doc.title}</h1>
            <p className="font-mono text-body-sm text-muted">
              {doc.updatedLabel}
            </p>
            <p className="border-marigold/40 bg-surface text-body-md text-marigold rounded-md border p-4">
              {doc.notice}
            </p>
          </div>

          {doc.sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="flex scroll-mt-28 flex-col gap-3"
            >
              <h2 className="text-display-sm text-ivory">
                {section.heading}
              </h2>
              <p className="text-body-md text-ivory/80">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
