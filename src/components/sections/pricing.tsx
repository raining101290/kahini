import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { pricingPlans } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section className="bg-ink px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.12} y={24}>
              <div
                className={cn(
                  "bg-surface relative flex h-full flex-col gap-4 rounded-md border p-8",
                  plan.emphasis ? "border-alta" : "border-plum"
                )}
              >
                {plan.emphasis && (
                  <span className="bg-marigold text-ink absolute -top-3 right-8 rounded-full px-3 py-1 text-body-sm font-bold">
                    Most popular
                  </span>
                )}
                <p className="text-body-md text-muted">{plan.name}</p>
                <p className="font-mono text-ivory text-display-md">
                  {plan.price}
                  {plan.period && (
                    <span className="text-body-lg text-muted">
                      {plan.period}
                    </span>
                  )}
                </p>
                <p className="text-body-md text-ivory/80">
                  {plan.description}
                </p>
                <Button
                  asChild
                  size="lg"
                  variant={plan.emphasis ? "primary" : "outline"}
                  className="mt-auto"
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
          ))}
        </div>
      </div>
    </section>
  );
}
