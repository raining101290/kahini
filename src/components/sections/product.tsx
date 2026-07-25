import { ChevronsUp, Unlock, Repeat } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProductPhone } from "@/components/sections/product-phone";
import { productFeatures, payment } from "@/content/home";

const ICONS = {
  swipe: ChevronsUp,
  unlock: Unlock,
  subscribe: Repeat,
} as const;

export function Product() {
  return (
    <section id="product" className="bg-ink px-6 py-24 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <ProductPhone />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            {productFeatures.map((feature, i) => {
              const Icon = ICONS[feature.icon];
              return (
                <Reveal key={feature.label} delay={i * 0.12} y={24}>
                  <div className="flex items-center gap-4">
                    <span className="border-plum bg-surface flex size-11 shrink-0 items-center justify-center rounded-full border">
                      <Icon className="text-marigold size-5" />
                    </span>
                    <p className="text-body-lg text-ivory">{feature.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="border-plum flex flex-col gap-4 rounded-md border px-6 py-5">
            <p className="text-body-sm text-muted">{payment.label}</p>
            <div className="flex flex-wrap items-center gap-4">
              {payment.methods.map((method) => (
                // Small vector wordmarks — next/image requires
                // dangerouslyAllowSVG for local SVGs and gains nothing
                // optimizing them.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={method.name}
                  src={method.logo}
                  alt={method.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
