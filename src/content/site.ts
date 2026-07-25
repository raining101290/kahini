export const site = {
  brand: "Kahini",
  legal: "Kahini Studios Ltd",
  tagline: "We are storytellers. We are KAHINI.",
  taglineBn: "আমরা গল্পকার। আমরা কাহিনী।",
  streamUrl: "https://kahinireels.com",
} as const;

export type SocialLink = {
  readonly label: string;
  readonly href: string;
};

// Handles inferred from the brand name — confirm with the client before
// launch, these are not verified profile URLs.
export const social = [
  { label: "Facebook", href: "https://facebook.com/kahinistudios" },
  { label: "Instagram", href: "https://instagram.com/kahinistudios" },
  { label: "X", href: "https://x.com/kahinistudios" },
  { label: "YouTube", href: "https://youtube.com/@kahinistudios" },
] as const satisfies readonly SocialLink[];

export type NavItem = {
  readonly label: string;
  readonly href: string;
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Product", href: "#product" },
  { label: "Our Content", href: "#content" },
  { label: "Collaboration", href: "#collaboration" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly NavItem[];

export const contact = {
  email: "hello@kahinistudios.com",
  phone: "+8801913319032",
  address: "House-90, Road-02, Block-A, Niketon, Dhaka",
} as const;

export const siteMetadata = {
  title: "KAHINI — We are storytellers. We are KAHINI.",
  description:
    "Bangladesh's first micro-drama OTT platform. Stream vertical drama series for Tk 10, or subscribe for Tk 50/month.",
} as const;
