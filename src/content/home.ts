export const hero = {
  eyebrow: "A micro drama streaming platform.",
  headline: "One-minute story.",
  cta: "Stream Now",
  secondaryCta: "Partner with us",
  sub: "1–2 minute vertical drama episodes. Unlock a full series for Tk 10. Paid with bKash, Nagad, Rocket.",
} as const;

export type Stat = {
  readonly value: number;
  readonly prefix: string;
  readonly suffix: string;
  readonly label: string;
  readonly description: string;
  readonly icon: "projects" | "followers" | "views" | "partnerships";
};

export const stats = [
  {
    value: 50,
    prefix: "",
    suffix: "+",
    label: "Projects Delivered",
    description:
      "Delivered 50+ content and production projects across brands and platforms—each crafted with a clear narrative and strategic intent.",
    icon: "projects",
  },
  {
    value: 600,
    prefix: "",
    suffix: "K",
    label: "Followers Across Social Platforms",
    description:
      "Built and engaged a combined audience of 600K+ across platforms through consistent, story-driven content.",
    icon: "followers",
  },
  {
    value: 50,
    prefix: "",
    suffix: "+",
    label: "Million Views",
    description:
      "Generated over 50 million views by creating content that blends storytelling with measurable audience impact.",
    icon: "views",
  },
  {
    value: 50,
    prefix: "",
    suffix: "+",
    label: "Brand Partnerships",
    description:
      "Partnered with 50+ brands to translate marketing objectives into compelling, audience-first content.",
    icon: "partnerships",
  },
] as const satisfies readonly Stat[];

export type WhatWeDoItem = {
  readonly title: string;
  readonly body: string;
};

export const whatWeDo = [
  {
    title: "Empowering creators",
    body: "We finance production. Creators publish through our pipeline and build franchises — not just view counts.",
  },
  {
    title: "Connecting creators & audiences",
    body: "Our platform brings together cultures, perspectives, and stories from across the globe.",
  },
  {
    title: "Micro Drama OTT",
    body: "kahinireels.com — Bangladesh's first micro drama streaming platform. Swipe through episode-one hooks, unlock full series for Tk 10, subscribe for Tk 50/month.",
  },
] as const satisfies readonly WhatWeDoItem[];

export type Pillar = {
  readonly number: string;
  readonly title: string;
  readonly body: string;
};

export const pillars = [
  {
    number: "01",
    title: "Digital Native",
    body: "Internet-born, made for 18–35, vertical-first. Built for the generation that already left TV.",
  },
  {
    number: "02",
    title: "IP Centric",
    body: "A viral video dies in the feed; a franchise compounds. We own the IP — every hit becomes a season two, a re-run format, or a licensing deal.",
  },
  {
    number: "03",
    title: "Scalable Quality",
    body: "Every creator becomes a production node — shooting in their own voice, publishing through our pipeline, earning a share. Output scales with the network.",
  },
  {
    number: "04",
    title: "Value Stays Home",
    body: "No 45% leaking to Big Tech. Payments via bKash, Nagad, Rocket — money stays in Bangladesh. 300M Bangla speakers abroad pay in dollars.",
  },
] as const satisfies readonly Pillar[];

export const product = {
  eyebrow: "Product",
  heading: "One app. Every story.",
} as const;

export type ProductFeature = {
  readonly icon: "swipe" | "unlock" | "subscribe";
  readonly label: string;
};

export const productFeatures = [
  { icon: "swipe", label: "Swipe through episode-one hooks" },
  { icon: "unlock", label: "Unlock a full series for Tk 10" },
  { icon: "subscribe", label: "Subscribe for Tk 50/month" },
] as const satisfies readonly ProductFeature[];

export type PaymentMethod = {
  readonly name: string;
  readonly logo: string;
};

export const payment = {
  label: "Pay the way you already pay.",
  methods: [
    { name: "bKash", logo: "/payments/bkash.svg" },
    { name: "Nagad", logo: "/payments/nagad.svg" },
    { name: "Rocket", logo: "/payments/rocket.svg" },
  ],
} satisfies { label: string; methods: readonly PaymentMethod[] };

export const pricing = {
  eyebrow: "Pricing",
  heading: "Pay for what you watch.",
} as const;

export type PricingPlan = {
  readonly name: string;
  readonly price: string;
  readonly period?: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly cta: string;
  readonly icon: "ticket" | "crown";
  readonly emphasis?: boolean;
};

export const pricingPlans = [
  {
    name: "Per series",
    price: "৳10",
    period: "",
    description: "Unlock one full series, keep it forever, no subscription.",
    features: [
      "One full series, unlocked",
      "Yours to watch forever",
      "Pay with bKash, Nagad, or Rocket",
    ],
    cta: "Unlock Now",
    icon: "ticket",
    emphasis: false,
  },
  {
    name: "Monthly",
    price: "৳50",
    period: "/month",
    description: "Everything, always.",
    features: [
      "Every series, unlocked",
      "New drops included as they release",
      "Cancel anytime",
    ],
    cta: "Subscribe Now",
    icon: "crown",
    emphasis: true,
  },
] as const satisfies readonly PricingPlan[];

export const collaboration = {
  heading: "Brand Collaboration",
  body: "Collaborate with brands to deliver impactful messages through compelling storytelling.",
  trustedByLabel: "TRUSTED BY LEADING BRANDS",
} as const;

export type CollaborationSubject = "Creator" | "Brand";

export type CollaborationCard = {
  readonly question: string;
  readonly body: string;
  readonly cta: string;
  readonly subject: CollaborationSubject;
};

export const collaborationCards = [
  {
    question: "Are you a creator?",
    body: "Shoot in your own voice. Publish through our pipeline. Own a share of what you make.",
    cta: "Apply as a creator",
    subject: "Creator",
  },
  {
    question: "Looking for a brand partnership?",
    body: collaboration.body,
    cta: "Start a conversation",
    subject: "Brand",
  },
] as const satisfies readonly CollaborationCard[];

export type BrandLogo = {
  readonly name: string;
  readonly logo: string;
};

export const brandLogos = [
  { name: "Hamdard", logo: "/brands/brand-1.png" },
  { name: "British Council", logo: "/brands/brand-2.png" },
  { name: "Dabur", logo: "/brands/brand-3.png" },
  { name: "Haier", logo: "/brands/brand-4.png" },
  { name: "Sunquick", logo: "/brands/brand-5.png" },
  { name: "1Screen", logo: "/brands/brand-6.png" },
  { name: "Rise", logo: "/brands/brand-7.png" },
  { name: "Ispahani", logo: "/brands/brand-8.png" },
  { name: "Samsung", logo: "/brands/brand-9.png" },
  { name: "Yellow", logo: "/brands/brand-10.png" },
] as const satisfies readonly BrandLogo[];
