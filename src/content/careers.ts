export type CareerRole = {
  readonly slug: string;
  readonly title: string;
  readonly type: string;
  readonly location: string;
  readonly description: string;
};

export const careers = [
  {
    slug: "creator-partnerships-manager",
    title: "Creator Partnerships Manager",
    type: "Full-time",
    location: "Dhaka, Bangladesh (on-site)",
    description:
      "Find and onboard the creators who'll shoot our next hit series. You'll scout talent, pitch the pipeline, and negotiate revenue-share deals — the first voice most creators hear from Kahini.",
  },
  {
    slug: "vertical-video-editor",
    title: "Video Editor — Vertical Format",
    type: "Full-time",
    location: "Dhaka, Bangladesh (on-site)",
    description:
      "Cut episode-one hooks that stop the scroll in the first three seconds. You'll work directly with creators to shape raw footage into the 1–2 minute format the whole platform is built around.",
  },
  {
    slug: "growth-marketer",
    title: "Growth Marketer",
    type: "Full-time",
    location: "Dhaka, Bangladesh (on-site)",
    description:
      "Own acquisition across creators' own social audiences — no paid ads. You'll figure out what makes a hook convert to a Tk 10 unlock, and repeat it.",
  },
  {
    slug: "backend-engineer",
    title: "Backend Engineer",
    type: "Full-time",
    location: "Dhaka, Bangladesh (on-site) or remote",
    description:
      "Build the systems behind unlocks, subscriptions, and bKash/Nagad/Rocket payments at scale. You care about correctness with real money moving through the system.",
  },
  {
    slug: "community-moderator",
    title: "Community Moderator",
    type: "Part-time",
    location: "Remote",
    description:
      "Keep the comments section a good place to be. You'll moderate creator and viewer interactions across the platform and flag issues before they become problems.",
  },
] as const satisfies readonly CareerRole[];
