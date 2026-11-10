"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const steps = [
  { n: "1", title: "Book a free demo", body: "We look at the questions your business gets, try the concierge together, and decide whether it is a fit. No pressure either way." },
  { n: "2", title: "We build it for you", body: "We train the concierge on your business, set up booking, handoff, and owner alerts, then add the widget to your website. You approve the answers before it goes live." },
  { n: "3", title: "We keep tuning it", body: "We review real conversations and keep improving the answers as your hours, services, and offers change. You never have to manage the AI." },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proc-line",
        { scaleX: 0, scaleY: 0 },
        { scaleX: 1, scaleY: 1, ease: "none", scrollTrigger: { trigger: ".proc-grid", start: "top 75%", end: "bottom 60%", scrub: 0.5 } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow" data-reveal>Done for you</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl" data-reveal>
          You don&rsquo;t learn AI. <span className="accent">You just get the bookings.</span>
        </h2>

        <div className="proc-grid relative mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8">
          <span className="absolute left-5 top-0 h-full w-px bg-line lg:left-0 lg:top-5 lg:h-px lg:w-full" aria-hidden />
          <span className="proc-line absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-amber to-ember lg:left-0 lg:top-5 lg:h-px lg:w-full lg:origin-left lg:bg-gradient-to-r" aria-hidden />
          {steps.map((s, i) => (
            <div key={s.n} className="relative pl-16 lg:pl-0 lg:pt-16" data-reveal={i * 0.1}>
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-amber/50 bg-ink font-mono text-sm text-amber">
                {s.n}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
