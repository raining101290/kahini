import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeadline } from "@/components/sections/hero-headline";
import { PosterWall } from "@/components/sections/poster-wall";
import { hero } from "@/content/home";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden"
    >
      <div className="relative flex min-h-0 flex-1 flex-col justify-[safe_center] px-6 pt-24 pb-8 lg:basis-[45%] lg:px-16 lg:pt-28 lg:pb-16">
        <div
          aria-hidden
          className="bg-marigold/10 pointer-events-none absolute top-1/4 -left-32 -z-10 h-96 w-96 rounded-full blur-3xl"
        />

        <div className="flex flex-col gap-6">
          <div className="relative flex items-center">
            {/* <span
              aria-hidden
              className="bg-marigold absolute top-1/2 right-full h-px w-screen -translate-y-1/2"
            /> */}
            <span className="font-sans text-marigold text-body-sm tracking-[0.15em]">
              {hero.eyebrow}
            </span>
          </div>

          <HeroHeadline />

          <p className="text-body-lg text-ivory/90 max-w-md">{hero.sub}</p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <a
                href={site.streamUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {hero.cta}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#collaboration">{hero.secondaryCta}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="h-[38vh] shrink-0 lg:h-full lg:flex-1 lg:basis-[55%]">
        <PosterWall />
      </div>
    </section>
  );
}
