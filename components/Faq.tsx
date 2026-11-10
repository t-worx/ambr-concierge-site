"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const faqs = [
  { q: "What happens when the concierge can’t answer something?", a: "It doesn’t guess. It collects the visitor’s details, hands the conversation to your team, and texts the owner so someone can follow up quickly. It can also offer to book a call." },
  { q: "Do I have to set anything up or manage it?", a: "No. This is a done-for-you service. We train the concierge on your business, install it, and keep tuning it. Your part is answering a few questions about how you work and approving the answers." },
  { q: "Will it work with my website?", a: "Yes. The concierge is a small widget added to your existing site. We handle the install, and there is no redesign or new platform to learn." },
  { q: "Is it chat or voice?", a: "Both. Visitors can type a question or tap to speak with the concierge by voice. Both use the same information about your business." },
  { q: "Can it book appointments?", a: "Yes. It can offer available times and book directly into a calendar during the conversation." },
  { q: "Will customers know they are talking to AI?", a: "Yes. The concierge is presented as an AI assistant, and a human is always available through handoff. Being upfront about it builds more trust than pretending." },
  { q: "What does it cost?", a: "It depends on your call and chat volume and what you want the concierge to handle. We will give you a clear price on your demo, after we understand your business." },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="eyebrow" data-reveal>Questions</p>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl" data-reveal>
          Fair things to ask <span className="accent">before a demo.</span>
        </h2>
        <div className="mt-12 divide-y divide-line border-y border-line" data-reveal>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="py-1">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg font-medium"
                  >
                    {f.q}
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-amber transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                        isOpen ? "rotate-45 border-amber/50 bg-amber/10" : "border-line"
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 leading-relaxed text-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="sr-only">{site.name} frequently asked questions</p>
      </div>
    </section>
  );
}
