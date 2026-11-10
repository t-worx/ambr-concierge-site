"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const text =
  "What are your hours? How much does it cost? Do you service my area? Can I book for Saturday? Where do I park? Your team answers the same questions all day. Then everyone goes home, and the questions keep coming.";

const chips = ["Hours", "Pricing", "Availability", "Service area", "Directions", "Booking", "Order status", "Policies", "What to bring", "Insurance"];

export default function Questions() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".q-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ".q-text", start: "top 78%", end: "bottom 45%", scrub: 0.4 },
        }
      );
      gsap.to(".q-row-a", { xPercent: -18, ease: "none", scrollTrigger: { trigger: ".q-rows", start: "top bottom", end: "bottom top", scrub: 0.5 } });
      gsap.fromTo(".q-row-b", { xPercent: -18 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: ".q-rows", start: "top bottom", end: "bottom top", scrub: 0.5 } });
    }, root);
    return () => ctx.revert();
  }, []);

  const words = text.split(" ");
  const splitAt = words.indexOf("Your");

  return (
    <section ref={root} className="relative overflow-hidden py-28 sm:py-40">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="eyebrow" data-reveal>The repetitive 80%</p>
        <p className="q-text mt-8 text-3xl font-semibold leading-[1.2] tracking-tight sm:text-5xl sm:leading-[1.15]">
          {words.map((w, i) => (
            <span key={i} className={`q-word ${i < splitAt ? "text-muted" : ""}`}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>

      <div className="q-rows mt-20 space-y-4" aria-hidden>
        {[0, 1].map((r) => (
          <div key={r} className={`${r === 0 ? "q-row-a" : "q-row-b"} flex w-max gap-4 pl-5`}>
            {[...chips, ...chips, ...chips].map((c, i) => (
              <span key={i} className="card whitespace-nowrap px-6 py-3 text-lg text-muted">
                {r === 0 ? c : chips[(i + 5) % chips.length]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
