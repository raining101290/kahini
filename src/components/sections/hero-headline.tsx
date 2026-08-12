import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { hero } from "@/content/home";
import { site } from "@/content/site";

export function HeroHeadline() {
  return (
    <div className="flex flex-col gap-2">
      <SplitHeadline
        as="h1"
        stagger={0.06}
        className="font-display text-ivory text-[clamp(2.75rem,6vw,6rem)] leading-[1.05] font-extrabold"
      >
        {hero.headline}
      </SplitHeadline>
      {/* Renders at full opacity immediately rather than waiting on the
          headline's word-reveal to finish — that gate made this text (the
          largest above-the-fold content block) the page's LCP element with
          a ~1.9s render delay. */}
      <p
        lang="bn"
        className="font-display text-ivory/60 text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.15] font-extrabold"
        style={{ fontStretch: "85%" }}
      >
        {site.taglineBn}
      </p>
    </div>
  );
}
