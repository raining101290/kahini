import { Users, Handshake } from "lucide-react";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { CollaborationCta } from "@/components/sections/collaboration-cta";
import { collaboration, collaborationCards, brandLogos } from "@/content/home";

const CARD_ICONS = {
  Creator: Users,
  Brand: Handshake,
} as const;

export function Collaboration() {
  return (
    <section
      id="collaboration"
      className="bg-plum relative overflow-hidden px-6 py-24 lg:px-16"
    >
      <div
        aria-hidden
        className="bg-marigold/10 pointer-events-none absolute top-0 right-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="font-sans text-marigold text-body-sm tracking-[0.15em] uppercase">
          {collaboration.trustedByLabel}
        </p>
        <h2 className="text-display-lg text-ivory mt-3 max-w-2xl">
          {collaboration.heading}
        </h2>

        <div className="relative mt-10 mask-[linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)]">
          <Marquee speed={40}>
            {brandLogos.map((brand) => (
              <div
                key={brand.name}
                className="group border-plum/60 bg-surface/50 hover:border-marigold/60 hover:bg-surface/80 hover:shadow-marigold/10 flex h-28 w-48 shrink-0 items-center justify-center rounded-xl border px-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- small
                vector wordmarks; next/image requires dangerouslyAllowSVG for
                local SVGs and gains nothing optimizing them. */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  width={240}
                  height={98}
                  className="h-12 w-auto max-w-full object-contain opacity-90 transition-[opacity,transform] duration-300 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
            ))}
          </Marquee>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {collaborationCards.map((card, i) => {
            const Icon = CARD_ICONS[card.subject];
            return (
              <Reveal key={card.question} delay={i * 0.12} y={24}>
                <div className="group border-plum bg-ink hover:border-marigold/40 relative flex h-full flex-col gap-4 overflow-hidden rounded-md border p-8 transition-colors duration-300">
                  <div
                    aria-hidden
                    className="bg-marigold/10 group-hover:bg-marigold/20 pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl transition-colors duration-300"
                  />
                  <span className="border-plum bg-surface group-hover:border-marigold/50 relative flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300">
                    <Icon className="text-marigold size-5" />
                  </span>
                  <h3 className="text-display-sm text-ivory relative">
                    {card.question}
                  </h3>
                  <p className="text-body-md text-ivory/80 relative">
                    {card.body}
                  </p>
                  <div className="relative mt-auto pt-2">
                    <CollaborationCta label={card.cta} subject={card.subject} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
