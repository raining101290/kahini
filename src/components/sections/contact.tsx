import { contact } from "@/content/site";
import { ContactForm } from "@/components/sections/contact-form";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm";

export function Contact() {
  return (
    <section id="contact" className="bg-ink px-6 py-24 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h2 className="text-display-lg text-ivory">Tell us your kahini.</h2>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${contact.email}`}
              className={`text-body-lg text-ivory/90 hover:text-marigold w-fit ${focusRing}`}
            >
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone}`}
              className={`text-body-lg text-ivory/90 hover:text-marigold w-fit ${focusRing}`}
            >
              {contact.phone}
            </a>
            <p className="text-body-md text-muted">{contact.address}</p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
