import { Clock, Unlock, Repeat, Globe2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { stats } from "@/content/home";

const ICONS = {
  duration: Clock,
  unlock: Unlock,
  subscribe: Repeat,
  reach: Globe2,
} as const;

export function StatStrip() {
  return (
    <div className="bg-plum relative w-full overflow-hidden py-16 sm:py-24">
      {/* Film-grain texture — a nod to the "drama" in a drama platform, and
          the one thing that made every earlier flat/minimal pass here read
          as generic rather than considered. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden
        className="bg-marigold/10 pointer-events-none absolute top-1/2 left-1/2 h-72 w-xl -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 sm:grid-cols-4 sm:gap-5 lg:px-16">
        {stats.map((stat, i) => {
          const Icon = ICONS[stat.icon];
          return (
            <Reveal key={stat.label} delay={i * 0.08} className="h-full">
              <div className="group border-ivory/10 bg-ink/25 hover:border-marigold/40 hover:bg-ink/35 flex h-full flex-col gap-5 rounded-2xl border p-5 backdrop-blur-sm transition-colors duration-300 sm:gap-6 sm:p-6">
                <span className="border-plum bg-surface/80 group-hover:border-marigold/50 flex size-10 items-center justify-center rounded-full border transition-colors duration-300">
                  <Icon className="text-marigold size-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="font-display text-display-sm sm:text-display-md text-ivory tabular-nums"
                  />
                  <span className="text-muted text-body-sm">{stat.label}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
