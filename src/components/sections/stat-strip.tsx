import { CountUp } from "@/components/motion/CountUp";
import { stats } from "@/content/home";

export function StatStrip() {
  return (
    <div className="bg-plum w-full">
      <div className="divide-marigold mx-auto grid max-h-[140px] max-w-6xl grid-cols-4 divide-x">
        {stats.map((stat) => (
          <div
            key={stat.suffix}
            className="flex items-center justify-center px-3 py-6 text-center sm:px-6"
          >
            <CountUp
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              className="font-mono text-ivory text-body-sm font-medium sm:text-body-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
