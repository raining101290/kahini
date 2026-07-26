import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

const BANGLA_SAMPLE = "আমরা গল্পকার। আমরা কাহিনী।";

const PALETTE = [
  { name: "ink", hex: "#0A0710", swatch: "bg-ink", note: "page base" },
  { name: "surface", hex: "#150D1E", swatch: "bg-surface", note: "cards, raised panels" },
  { name: "plum", hex: "#2E1338", swatch: "bg-plum", note: "section bands, dividers" },
  { name: "alta", hex: "#C32424", swatch: "bg-alta", note: "primary CTAs, active states" },
  { name: "marigold", hex: "#F0A202", swatch: "bg-marigold", note: "eyebrows, focus, hover glow" },
  { name: "ivory", hex: "#F4EDE2", swatch: "bg-ivory", note: "primary text" },
  { name: "muted", hex: "#9A8FA6", swatch: "bg-muted", note: "secondary text" },
] as const;

const TYPE_SCALE = [
  {
    step: "display-xl",
    meta: "52 / 1.05 / -0.02em / 800",
    className: "text-display-xl",
    family: "display" as const,
    sample: "Stream Now",
  },
  {
    step: "display-lg",
    meta: "40 / 1.08 / -0.02em / 800",
    className: "text-display-lg",
    family: "display" as const,
    sample: "We are storytellers",
  },
  {
    step: "display-md",
    meta: "32 / 1.15 / -0.02em / 700",
    className: "text-display-md",
    family: "display" as const,
    sample: "Our Content",
  },
  {
    step: "display-sm",
    meta: "24 / 1.2 / -0.02em / 700",
    className: "text-display-sm",
    family: "display" as const,
    sample: "Tk 10 to unlock",
  },
  {
    step: "body-lg",
    meta: "18 / 1.6 / 0em / 400",
    className: "text-body-lg",
    family: "sans" as const,
    sample: "One to two minute vertical drama episodes.",
  },
  {
    step: "body-md",
    meta: "16 / 1.6 / 0em / 400",
    className: "text-body-md",
    family: "sans" as const,
    sample: "Paid via bKash, Nagad, or Rocket.",
  },
  {
    step: "body-sm",
    meta: "14 / 1.5 / 0em / 400",
    className: "text-body-sm",
    family: "sans" as const,
    sample: "Distribution runs through creators' own audiences.",
  },
] as const;

const BUTTON_VARIANTS = ["primary", "outline", "ghost"] as const;

export default function StyleGuidePage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-body-sm text-marigold">design system</p>
        <h1 className="text-display-lg">Poster wall after dark</h1>
        <p className="text-body-md text-muted">
          Every color and type decision on this page derives from the 7
          tokens defined in globals.css. Dev-only route, 404s in production.
        </p>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="text-display-sm">Palette</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {PALETTE.map((color) => (
            <div key={color.name} className="flex flex-col gap-2">
              <div
                className={`h-20 w-full rounded-md border border-plum ${color.swatch}`}
              />
              <div className="flex flex-col">
                <span className="text-body-md">{color.name}</span>
                <span className="font-mono text-body-sm text-muted">
                  {color.hex}
                </span>
                <span className="text-body-sm text-muted">{color.note}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-display-sm">Type scale</h2>
        {TYPE_SCALE.map((step) => (
          <div
            key={step.step}
            className="flex flex-col gap-2 border-b border-plum pb-8 last:border-b-0"
          >
            <p className="font-mono text-body-sm text-marigold">
              {step.step} — {step.meta}
            </p>
            <p
              className={`${step.className} ${
                step.family === "display" ? "font-display" : "font-sans"
              }`}
              style={step.family === "display" ? { fontStretch: "85%" } : undefined}
            >
              {step.sample}
            </p>
            <p className={`${step.className} font-display`} style={{ fontStretch: "85%" }}>
              {BANGLA_SAMPLE}
            </p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-display-sm">Buttons</h2>
        <div className="flex flex-col gap-8">
          {BUTTON_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              <p className="font-mono text-body-sm text-muted">{variant}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant={variant}>Stream Now</Button>
                <Button variant={variant} disabled>
                  Stream Now
                </Button>
                <Button variant={variant} size="sm">
                  Stream Now
                </Button>
                <Button variant={variant} size="lg">
                  Stream Now
                </Button>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-body-sm text-muted">
              focus-visible (marigold ring, 2px, offset 2)
            </p>
            <Button
              variant="primary"
              className="ring-2 ring-marigold ring-offset-2 ring-offset-ink"
            >
              Stream Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
