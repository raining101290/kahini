import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description:
    "How Kahini Studios Ltd collects, uses, and protects your data across kahinireels.com and this site.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <LegalLayout doc={privacyPolicy} />;
}
