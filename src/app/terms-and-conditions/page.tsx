import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { termsAndConditions } from "@/content/legal";

export const metadata: Metadata = {
  title: termsAndConditions.title,
  description:
    "The terms governing use of kahinireels.com and Kahini Studios Ltd's services.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return <LegalLayout doc={termsAndConditions} />;
}
