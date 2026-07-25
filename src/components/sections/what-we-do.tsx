import { Rocket, Globe, Play } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { whatWeDo } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const ICONS = [Rocket, Globe, Play] as const;
const OFFSETS = ["", "min-[900px]:mt-16", "min-[900px]:mt-32"] as const;
const LINK_TEXT = "kahinireels.com";

function renderBody(body: string, isEmphasis: boolean) {
  if (!isEmphasis) return body;

  const idx = body.indexOf(LINK_TEXT);
  if (idx === -1) return body;

  const before = body.slice(0, idx);
  const after = body.slice(idx + LINK_TEXT.length);

  return (
    <>
      {before}
      <a
        href={site.streamUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-linear-to-r from-marigold to-marigold text-marigold bg-left-bottom bg-[length:0%_1px] bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_1px]"
      >
        {LINK_TEXT}
      </a>
      {after}
    </>
  );
}

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-ink px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-marigold text-body-sm tracking-[0.15em] uppercase">
          What We Do
        </p>
        <h2 className="text-display-lg text-ivory mt-3 max-w-2xl">
          The New Anatomy of Entertainment
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 min-[900px]:grid-cols-3">
          {whatWeDo.map((item, i) => {
            const Icon = ICONS[i];
            const isEmphasis = i === 2;

            return (
              <Reveal
                key={item.title}
                delay={i * 0.12}
                y={32}
                className={OFFSETS[i]}
              >
                <div
                  className={cn(
                    "bg-surface flex h-full flex-col gap-4 rounded-md border p-8",
                    isEmphasis ? "border-alta" : "border-plum"
                  )}
                >
                  <Icon className="text-marigold size-8" />
                  <h3 className="text-display-sm text-ivory">{item.title}</h3>
                  <p className="text-body-md text-ivory/80">
                    {renderBody(item.body, isEmphasis)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
