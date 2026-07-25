import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { CollaborationCta } from "@/components/sections/collaboration-cta";
import { collaboration, collaborationCards, brandLogos } from "@/content/home";

export function Collaboration() {
  return (
    <section id="collaboration" className="bg-plum px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-marigold text-body-sm tracking-[0.15em] uppercase">
          {collaboration.trustedByLabel}
        </p>
        <h2 className="text-display-lg text-ivory mt-3 max-w-2xl">
          {collaboration.heading}
        </h2>

        <Marquee speed={24} className="mt-10">
          {brandLogos.map((brand) => (
            <div
              key={brand.name}
              className="transition-[filter] duration-300 hover:grayscale-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small
              vector wordmarks; next/image requires dangerouslyAllowSVG for
              local SVGs and gains nothing optimizing them. */}
              <img
                src={brand.logo}
                alt={brand.name}
                width={240}
                height={98}
                className="h-10 w-auto"
              />
            </div>
          ))}
        </Marquee>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {collaborationCards.map((card, i) => (
            <Reveal key={card.question} delay={i * 0.12} y={24}>
              <div className="bg-ink border-plum flex h-full flex-col gap-4 rounded-md border p-8">
                <h3 className="text-display-sm text-ivory">
                  {card.question}
                </h3>
                <p className="text-body-md text-ivory/80">{card.body}</p>
                <CollaborationCta label={card.cta} subject={card.subject} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
