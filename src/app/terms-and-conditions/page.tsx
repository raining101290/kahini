import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { termsAndConditions } from "@/content/legal";

export const metadata: Metadata = {
  title: `${termsAndConditions.title} — Kahini`,
};

export default function TermsAndConditionsPage() {
  return <LegalLayout doc={termsAndConditions} />;
}
