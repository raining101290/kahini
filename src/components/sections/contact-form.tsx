"use client";

import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContactIntent, type ContactSubject } from "@/lib/contact-intent";

const SUBJECTS: readonly ContactSubject[] = [
  "Creator",
  "Brand",
  "Press",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormValues = {
  name: string;
  email: string;
  subject: ContactSubject | "";
  message: string;
};

const EMPTY_FORM: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type FieldName = keyof FormValues;

function validateField(field: FieldName, values: FormValues): string | null {
  switch (field) {
    case "name":
      return values.name.trim()
        ? null
        : "Enter your name so we know who's writing.";
    case "email":
      if (!values.email.trim())
        return "Enter an email address so we can reply.";
      return EMAIL_RE.test(values.email.trim())
        ? null
        : "That email address doesn't look right — check for typos.";
    case "subject":
      return values.subject
        ? null
        : "Choose a subject so we can route your message.";
    case "message":
      return values.message.trim()
        ? null
        : "Add a message so we know how to help.";
  }
}

const ALL_FIELDS: FieldName[] = ["name", "email", "subject", "message"];

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {}
  );
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>(
    {}
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { subject: pendingSubject, clearSubject } = useContactIntent();

  useEffect(() => {
    // Syncing from the external contact-intent context (another section
    // requested a preset subject) into local form state — the
    // sync-from-external-system direction the effect rules describe, not
    // the derived-state case the lint guards against.
    if (pendingSubject) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValues((prev) => ({ ...prev, subject: pendingSubject }));
      clearSubject();
    }
  }, [pendingSubject, clearSubject]);

  function handleChange(field: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: FieldName) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, values) ?? undefined,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of ALL_FIELDS) {
      const message = validateField(field, values);
      if (message) nextErrors[field] = message;
    }
    setTouched({ name: true, email: true, subject: true, message: true });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("request-failed");

      toast.success("Message sent — we'll reply within two working days");
      setValues(EMPTY_FORM);
      setTouched({});
      setErrors({});
    } catch {
      setSubmitError(
        "Something went wrong sending your message. Try again, or email us directly at hello@kahinistudios.com."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-body-sm text-ivory/80">
          Name
        </label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          onBlur={() => handleBlur("name")}
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {touched.name && errors.name && (
          <p id="contact-name-error" className="text-body-sm text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-body-sm text-ivory/80">
          Email
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {touched.email && errors.email && (
          <p
            id="contact-email-error"
            className="text-body-sm text-destructive"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-subject"
          className="text-body-sm text-ivory/80"
        >
          Subject
        </label>
        <Select
          value={values.subject}
          onValueChange={(value) => {
            handleChange("subject", value);
            setTouched((prev) => ({ ...prev, subject: true }));
            setErrors((prev) => ({ ...prev, subject: undefined }));
          }}
        >
          <SelectTrigger
            id="contact-subject"
            onBlur={() => handleBlur("subject")}
            aria-invalid={touched.subject && !!errors.subject}
            className="w-full"
          >
            <SelectValue placeholder="Choose a subject" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECTS.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {touched.subject && errors.subject && (
          <p className="text-body-sm text-destructive">{errors.subject}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-body-sm text-ivory/80"
        >
          Message
        </label>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
        />
        {touched.message && errors.message && (
          <p
            id="contact-message-error"
            className="text-body-sm text-destructive"
          >
            {errors.message}
          </p>
        )}
      </div>

      {submitError && (
        <p role="alert" className="text-body-sm text-destructive">
          {submitError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
