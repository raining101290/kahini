"use client";

import { Button } from "@/components/ui/button";
import { useContactIntent } from "@/lib/contact-intent";
import type { CollaborationSubject } from "@/content/home";

type CollaborationCtaProps = {
  label: string;
  subject: CollaborationSubject;
};

export function CollaborationCta({ label, subject }: CollaborationCtaProps) {
  const { requestSubject } = useContactIntent();

  return (
    <Button asChild size="lg" className="w-fit">
      <a href="#contact" onClick={() => requestSubject(subject)}>
        {label}
      </a>
    </Button>
  );
}
