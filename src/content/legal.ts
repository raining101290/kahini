export type LegalSection = {
  readonly id: string;
  readonly heading: string;
  readonly body: string;
};

export type LegalDocument = {
  readonly title: string;
  readonly updatedLabel: string;
  readonly notice: string;
  readonly sections: readonly LegalSection[];
};

// Every section body below describes what that clause should cover, not
// binding legal terms — none of this has been drafted or reviewed by a
// lawyer, and it must not be treated as the real policy.
const NOTICE =
  "Placeholder — legal counsel must draft and review every clause on this page before it is published. Nothing below is a binding term.";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  updatedLabel: "Last updated: [date]",
  notice: NOTICE,
  sections: [
    {
      id: "information-we-collect",
      heading: "Information We Collect",
      body: "[Placeholder] Outline the categories of personal data collected across kahinireels.com and this marketing site — account and profile details, payment identifiers passed through bKash, Nagad, and Rocket, device and usage data, and any data collected from creators during onboarding.",
    },
    {
      id: "how-we-use-information",
      heading: "How We Use Information",
      body: "[Placeholder] Describe the purposes data is used for — operating the streaming service, processing payments and subscriptions, communicating with users, and improving the product.",
    },
    {
      id: "payment-processing",
      heading: "Payment Processing",
      body: "[Placeholder] Explain the relationship with bKash, Nagad, and Rocket as payment processors, what transaction data is shared with them, and that Kahini Studios Ltd does not store full payment credentials.",
    },
    {
      id: "data-sharing-and-third-parties",
      heading: "Data Sharing and Third Parties",
      body: "[Placeholder] List categories of third parties data may be shared with (payment processors, hosting/infrastructure providers, analytics) and under what circumstances, if any, data is shared with brand partners.",
    },
    {
      id: "data-retention",
      heading: "Data Retention",
      body: "[Placeholder] State how long different categories of data are retained and the criteria used to determine retention periods.",
    },
    {
      id: "childrens-privacy",
      heading: "Children's Privacy",
      body: "[Placeholder] Clarify the platform's minimum age policy and what happens if data from a minor is discovered.",
    },
    {
      id: "your-rights",
      heading: "Your Rights",
      body: "[Placeholder] Describe how users in Bangladesh and abroad can access, correct, or request deletion of their data, and how to submit that request.",
    },
    {
      id: "changes-to-this-policy",
      heading: "Changes to This Policy",
      body: "[Placeholder] Explain how and when this policy may be updated and how users will be notified of material changes.",
    },
    {
      id: "contact-us",
      heading: "Contact Us",
      body: "[Placeholder] Point users to hello@kahinistudios.com for privacy-related questions or requests.",
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms and Conditions",
  updatedLabel: "Last updated: [date]",
  notice: NOTICE,
  sections: [
    {
      id: "acceptance-of-terms",
      heading: "Acceptance of Terms",
      body: "[Placeholder] State that using kahinireels.com or this site constitutes acceptance of these terms, and who is eligible to use the service.",
    },
    {
      id: "description-of-service",
      heading: "Description of Service",
      body: "[Placeholder] Describe the micro-drama streaming service, per-series unlocks, and the monthly subscription tier at a high level.",
    },
    {
      id: "subscriptions-and-payments",
      heading: "Subscriptions and Payments",
      body: "[Placeholder] Cover pricing (Tk 10 per series, Tk 50 per month), billing cycle, accepted payment methods (bKash, Nagad, Rocket), and refund policy.",
    },
    {
      id: "creator-accounts",
      heading: "Creator Accounts",
      body: "[Placeholder] Cover the terms specific to creators publishing through the Kahini pipeline — content ownership, revenue share, and content standards.",
    },
    {
      id: "user-conduct",
      heading: "User Conduct",
      body: "[Placeholder] Describe prohibited uses of the platform, including account sharing, unauthorized redistribution of content, and abusive behavior.",
    },
    {
      id: "intellectual-property",
      heading: "Intellectual Property",
      body: "[Placeholder] Clarify ownership of platform content, creator-produced series, and the Kahini brand and trademarks.",
    },
    {
      id: "termination",
      heading: "Termination",
      body: "[Placeholder] Explain the conditions under which an account or subscription may be suspended or terminated, by either party.",
    },
    {
      id: "disclaimers-and-limitation-of-liability",
      heading: "Disclaimers and Limitation of Liability",
      body: "[Placeholder] Standard disclaimer and liability-limitation language to be drafted by counsel, appropriate for Bangladeshi law.",
    },
    {
      id: "governing-law",
      heading: "Governing Law",
      body: "[Placeholder] Confirm these terms are governed by the laws of Bangladesh and specify a dispute resolution venue.",
    },
    {
      id: "changes-to-these-terms",
      heading: "Changes to These Terms",
      body: "[Placeholder] Explain how and when these terms may be updated and how users will be notified of material changes.",
    },
    {
      id: "contact-us",
      heading: "Contact Us",
      body: "[Placeholder] Point users to hello@kahinistudios.com for questions about these terms.",
    },
  ],
};
