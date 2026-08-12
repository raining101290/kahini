import { Check, Ticket, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { pricing, pricingPlans } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const ICONS = {
  ticket: Ticket,
  crown: Crown,
} as const;

export function Pricing() {
  return (
    <section className="bg-ink relative overflow-hidden px-6 py-24 lg:px-16">
      <div
        aria-hidden
        className="bg-marigold/10 pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl">
        <p className="font-sans text-marigold text-body-sm tracking-[0.15em] uppercase">
          {pricing.eyebrow}
        </p>
        <h2 className="text-display-lg text-ivory mt-3 max-w-2xl">
          {pricing.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {pricingPlans.map((plan, i) => {
            const Icon = ICONS[plan.icon];
            return (
              <Reveal
                key={plan.name}
                delay={i * 0.12}
                y={24}
                className="relative h-full"
              >
                {plan.emphasis && (
                  <span className="bg-marigold text-ink absolute -top-3 right-8 z-10 rounded-full px-3 py-1 text-body-sm font-bold">
                    Most popular
                  </span>
                )}

                <div
                  className={cn(
                    "group relative flex h-full flex-col gap-5 overflow-hidden rounded-xl border p-8 transition-all duration-300",
                    plan.emphasis
                      ? "border-alta bg-surface"
                      : "border-plum bg-surface hover:border-marigold/40"
                  )}
                >
                  {plan.emphasis && (
                    <div
                      aria-hidden
                      className="bg-marigold/15 pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl"
                    />
                  )}

                  <span className="border-plum bg-ink group-hover:border-marigold/50 relative flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300">
                    <Icon className="text-marigold size-5" />
                  </span>

                  <div className="relative flex flex-col gap-1">
                    <p className="text-body-md text-muted">{plan.name}</p>
                    <p className="font-mono text-ivory text-display-md">
                      {plan.price}
                      {plan.period && (
                        <span className="text-body-lg text-muted">
                          {plan.period}
                        </span>
                      )}
                    </p>
                  </div>

                  <p className="text-body-md text-ivory/80 relative">
                    {plan.description}
                  </p>

                  <ul className="relative flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-body-sm text-ivory/80 flex items-start gap-2.5"
                      >
                        <Check className="text-marigold mt-0.5 size-4 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    size="lg"
                    variant={plan.emphasis ? "primary" : "outline"}
                    className="relative mt-auto"
                  >
                    <a
                      href={site.streamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.cta}
                    </a>
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
