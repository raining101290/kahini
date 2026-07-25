import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { Marquee } from "@/components/motion/Marquee";
import { ScrollProgress } from "@/components/motion/scroll-progress";

const POSTERS = ["এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়"] as const;

export default function MotionTestPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="flex flex-col">
      <ScrollProgress />

      <section className="flex h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-body-sm text-marigold">motion-test</p>
        <SplitHeadline as="h1" className="text-display-xl">
          আমরা গল্পকার। আমরা কাহিনী।
        </SplitHeadline>
        <p className="text-body-md text-muted max-w-md">
          Scroll to trigger the headline split, the reveal blocks below, and
          watch the marigold progress bar fill at the top of the viewport.
        </p>
      </section>

      {Array.from({ length: 3 }).map((_, i) => (
        <section
          key={i}
          className="border-plum flex h-screen flex-col items-center justify-center gap-6 border-t px-6"
        >
          <Reveal delay={0} y={32}>
            <h2 className="text-display-md">Reveal block {i + 1}</h2>
          </Reveal>
          <Reveal delay={0.15} y={32}>
            <p className="text-body-lg text-muted max-w-md text-center">
              Fades and rises into view once, driven by the motion package —
              not GSAP.
            </p>
          </Reveal>
        </section>
      ))}

      <section className="border-plum flex min-h-screen flex-col justify-center gap-8 border-t px-6 py-24">
        <h2 className="text-display-md px-6">Poster wall marquee</h2>
        <Marquee speed={20} className="py-4">
          {POSTERS.map((label) => (
            <div
              key={label}
              className="bg-surface border-plum flex aspect-9/16 w-40 shrink-0 items-center justify-center rounded-md border"
            >
              <span className="font-display text-display-sm text-ivory">
                {label}
              </span>
            </div>
          ))}
        </Marquee>
        <Marquee speed={26} direction="right" className="py-4">
          {POSTERS.map((label) => (
            <div
              key={label}
              className="bg-surface border-plum flex aspect-9/16 w-40 shrink-0 items-center justify-center rounded-md border"
            >
              <span className="font-display text-display-sm text-ivory">
                {label}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      <div className="h-[50vh]" />
    </main>
  );
}
