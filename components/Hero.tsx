"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { site } from "@/lib/site";

const notes = [
  { icon: "call", title: "Missed call", meta: "9:47 PM", body: "No voicemail left" },
  { icon: "chat", title: "Website chat", meta: "Unanswered", body: "“Are you open Saturday?”" },
  { icon: "chat", title: "Website chat", meta: "Left the site", body: "“How much does it cost?”" },
];

function Icon({ kind }: { kind: string }) {
  return kind === "call" ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 1 1 21 11.5z" />
    </svg>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set(".hero-scene", { autoAlpha: 1 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=170%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            // Scroll-scrubbed hero clip (only when site.heroVideo is set)
            const v = video.current;
            if (v && v.duration) v.currentTime = self.progress * (v.duration - 0.05);
          },
        },
      });
      tl.to(".hero-orb", { scale: 1.9, duration: 3 }, 0)
        .to(".hero-copy", { autoAlpha: 0, y: -70, scale: 0.96, filter: "blur(10px)", duration: 0.8 }, 0.1)
        .to(".hero-cue", { autoAlpha: 0, duration: 0.3 }, 0)
        .from(".hero-note", { autoAlpha: 0, y: 90, scale: 0.92, stagger: 0.35, duration: 0.5, ease: "power2.out" }, 0.7)
        .from(".hero-line", { autoAlpha: 0, y: 40, duration: 0.6, ease: "power2.out" }, 1.9)
        .to({}, { duration: 0.5 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="grain relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Background: scroll-scrubbed clip if provided, otherwise the coded orb */}
      {site.heroVideo ? (
        <video
          ref={video}
          src={site.heroVideo}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
      ) : null}
      <div className="hero-orb pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2" aria-hidden>
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,178,36,0.32)_0%,rgba(255,122,26,0.14)_38%,transparent_68%)] blur-2xl" />
        <div className="ring absolute inset-[18%] rounded-full border border-amber/30" />
        <div className="ring absolute inset-[18%] rounded-full border border-amber/20 [animation-delay:1.5s]" />
        <div className="ring absolute inset-[18%] rounded-full border border-amber/10 [animation-delay:3s]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0908_85%)]" aria-hidden />

      {/* Opening copy */}
      <div className="hero-copy relative z-10 mx-auto max-w-4xl px-5 pt-16 text-center sm:px-8">
        <p className="eyebrow rise">AI Concierge for your website</p>
        <h1 className="rise mt-6 text-[2.6rem] font-semibold leading-[1.04] tracking-tight [animation-delay:0.1s] sm:text-6xl lg:text-7xl">
          You close at five.
          <br />
          Your customers <span className="accent">keep asking.</span>
        </h1>
        <p className="rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted [animation-delay:0.22s] sm:text-xl">
          {site.name} adds a chat and voice concierge to your website. It answers the questions your
          team answers all day, books appointments, and hands off to a human when one is needed.
        </p>
        <div className="rise mt-10 flex flex-col items-center justify-center gap-3 [animation-delay:0.34s] sm:flex-row">
          <a href="#book" className="btn">Book a Free Demo</a>
          <a href="#day" className="btn-ghost">See a day with {site.name}</a>
        </div>
      </div>

      {/* Scroll scene: unanswered questions pile up */}
      <div className="hero-scene pointer-events-none invisible absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-5 motion-reduce:hidden sm:gap-4" aria-hidden>
        {notes.map((n, i) => (
          <div
            key={i}
            className={`hero-note card flex w-full max-w-sm items-center gap-4 px-5 py-4 backdrop-blur-md ${
              i === 0 ? "sm:-translate-x-16" : i === 1 ? "sm:translate-x-14" : "sm:-translate-x-6"
            }`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-miss/15 text-miss">
              <Icon kind={n.icon} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-medium">{n.title}</span>
                <span className="font-mono text-xs text-miss">{n.meta}</span>
              </span>
              <span className="block truncate text-sm text-muted">{n.body}</span>
            </span>
          </div>
        ))}
        <p className="hero-line mt-6 max-w-2xl text-center text-2xl font-semibold leading-snug tracking-tight sm:mt-8 sm:text-4xl">
          Every unanswered question is a customer you{" "}
          <span className="accent">already paid to attract.</span>
        </p>
      </div>

      <div className="hero-cue hidden sm:block absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center motion-reduce:hidden" aria-hidden>
        <span className="eyebrow !text-muted">Scroll</span>
        <span className="mx-auto mt-2 block h-9 w-px bg-gradient-to-b from-amber to-transparent" />
      </div>
    </section>
  );
}
