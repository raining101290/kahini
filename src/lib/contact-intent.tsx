"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type ContactSubject = "Creator" | "Brand" | "Press" | "Other";

type ContactIntentValue = {
  subject: ContactSubject | null;
  requestSubject: (subject: ContactSubject) => void;
  clearSubject: () => void;
};

const ContactIntentContext = createContext<ContactIntentValue | null>(null);

export function ContactIntentProvider({ children }: { children: ReactNode }) {
  const [subject, setSubject] = useState<ContactSubject | null>(null);

  return (
    <ContactIntentContext.Provider
      value={{
        subject,
        requestSubject: setSubject,
        clearSubject: () => setSubject(null),
      }}
    >
      {children}
    </ContactIntentContext.Provider>
  );
}

export function useContactIntent() {
  const ctx = useContext(ContactIntentContext);
  if (!ctx) {
    throw new Error(
      "useContactIntent must be used within a ContactIntentProvider"
    );
  }
  return ctx;
}
