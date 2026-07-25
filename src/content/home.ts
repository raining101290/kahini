export const hero = {
  eyebrow: "BANGLADESH'S FIRST MICRO DRAMA OTT PLATFORM",
  headline: "One-minute story.",
  cta: "Stream Now",
  secondaryCta: "Partner with us",
  sub: "1–2 minute vertical drama episodes. Unlock a full series for Tk 10. Paid with bKash, Nagad, Rocket.",
} as const;

export type Stat = {
  readonly value: number;
  readonly prefix?: string;
  readonly suffix: string;
};

export const stats = [
  { value: 2, prefix: "1–", suffix: " min episodes" },
  { value: 10, prefix: "৳", suffix: " per series" },
  { value: 50, prefix: "৳", suffix: " /month" },
  { value: 300, prefix: "", suffix: "M Bangla speakers" },
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

export type PricingPlan = {
  readonly name: string;
  readonly price: string;
  readonly period?: string;
  readonly description: string;
  readonly cta: string;
  readonly emphasis?: boolean;
};

export const pricingPlans = [
  {
    name: "Per series",
    price: "৳10",
    period: "",
    description: "Unlock one full series, keep it forever, no subscription.",
    cta: "Unlock Now",
    emphasis: false,
  },
  {
    name: "Monthly",
    price: "৳50",
    period: "/month",
    description: "Everything, always.",
    cta: "Subscribe Now",
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
  { name: "Brand One", logo: "/brands/brand-1.png" },
  { name: "Brand Two", logo: "/brands/brand-2.png" },
  { name: "Brand Three", logo: "/brands/brand-3.png" },
  { name: "Brand Four", logo: "/brands/brand-4.png" },
  { name: "Brand Five", logo: "/brands/brand-5.png" },
  { name: "Brand Six", logo: "/brands/brand-6.png" },
  { name: "Brand Seven", logo: "/brands/brand-7.png" },
  { name: "Brand Eight", logo: "/brands/brand-8.png" },
  { name: "Brand Nine", logo: "/brands/brand-9.png" },
  { name: "Brand Ten", logo: "/brands/brand-10.png" },
] as const satisfies readonly BrandLogo[];
