"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, gsap } from "@/lib/motion";
import { site } from "@/lib/site";

type Msg = { from: "them" | "ai" | "sys"; text: string };

const steps: { label: string; title: string; body: string; mode: "chat" | "voice"; msgs: Msg[] }[] = [
  {
    label: "01 · Chat",
    title: "It answers the question right away.",
    body: "The concierge is trained on your business: hours, services, pricing, policies, service area, etc. Visitors get a clear answer in seconds instead of filling out a contact form and waiting for an answer.",
    mode: "chat",
    msgs: [
      { from: "them", text: "Are you open on Saturdays?" },
      { from: "ai", text: "We are. Saturday hours are 9 AM to 4 PM. Want me to hold a time for you?" },
    ],
  },
  {
    label: "02 · Voice",
    title: "It talks, for people who would rather call.",
    body: "Visitors can tap to speak with the concierge by voice. Same knowledge, same answers, in a natural conversation. No hold music and no phone tree.",
    mode: "voice",
    msgs: [
      { from: "them", text: "Hi, do you take walk-ins?" },
      { from: "ai", text: "We do, walk-ins are welcome until 6. If you'd like a guaranteed time, I can book one for you now." },
    ],
  },
  {
    label: "03 · Booking",
    title: "It books the appointment.",
    body: "When a visitor is ready, the concierge offers open times from your calendar and confirms the booking in the same conversation, while they are still interested.",
    mode: "chat",
    msgs: [
      { from: "them", text: "Can I come in Tuesday morning?" },
      { from: "ai", text: "I have 9:30 or 11:00 open on Tuesday. Which works better?" },
      { from: "them", text: "9:30" },
      { from: "sys", text: "Appointment booked · Tue 9:30 AM" },
    ],
  },
  {
    label: "04 · Handoff",
    title: "It knows when to get a human.",
    body: "When a customer needs a real person, they get one. The concierge passes the conversation to your team and texts you, so you can step in while they’re still interested.",
    mode: "chat",
    msgs: [
      { from: "them", text: "I need to talk to someone about a billing problem." },
      { from: "ai", text: "I'll get a team member on this now. What's the best number to reach you?" },
      { from: "sys", text: "Handed to your team · You get a text" },
    ],
  },
];

function Panel({ step }: { step: number }) {
  const s = steps[step];
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,178,36,0.22),transparent_65%)] blur-2xl" aria-hidden />
      <div className="card relative overflow-hidden !rounded-[1.75rem] bg-surface shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber to-ember">
            <span className="h-2.5 w-2.5 rounded-full bg-ink" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold">{site.name} Concierge</span>
            <span className="block text-xs text-muted">Online now</span>
          </span>
          <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-widest text-amber">
            {s.mode}
          </span>
        </div>

        <div key={step} className="flex min-h-[19rem] flex-col justify-end gap-2.5 px-4 py-5">
          {s.mode === "voice" && (
            <div className="msg mb-2 flex h-16 items-center justify-center gap-1.5" aria-hidden>
              {Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  className="wavebar block h-10 w-1 rounded-full bg-amber"
                  style={{ animationDelay: `${(i % 7) * 0.12}s`, opacity: 0.45 + ((i * 37) % 55) / 100 }}
                />
              ))}
            </div>
          )}
          {s.msgs.map((m, i) =>
            m.from === "sys" ? (
              <div
                key={i}
                className="msg mx-auto mt-1 rounded-full border border-amber/40 bg-amber/10 px-4 py-1.5 text-xs font-medium text-amber"
                style={{ animationDelay: `${i * 0.28}s` }}
              >
                ✓ {m.text}
              </div>
            ) : (
              <div
                key={i}
                className={`msg max-w-[84%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.from === "them"
                    ? "self-end rounded-br-md bg-white/10"
                    : "self-start rounded-bl-md bg-gradient-to-br from-amber to-ember font-medium text-[#1a1206]"
                }`}
                style={{ animationDelay: `${i * 0.28}s` }}
              >
                {m.text}
              </div>
            )
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-line px-4 py-3 text-sm text-muted">
          <span className="flex-1 rounded-full bg-white/5 px-4 py-2">Ask anything…</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".how-step").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how" ref={root} className="relative overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow" data-reveal>How it works</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl" data-reveal>
          One small widget. <span className="accent">Four jobs done.</span>
        </h2>

        <div className="mt-10 grid gap-10 lg:mt-0 lg:grid-cols-2 lg:gap-20">
          {/* Sticky concierge panel (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-0 flex h-screen items-center">
              <Panel step={active} />
            </div>
          </div>

          <div>
            {steps.map((s, i) => (
              <div key={i} className="how-step flex flex-col justify-center py-10 lg:min-h-[85vh] lg:py-0">
                <div className={`transition-opacity duration-500 ${active === i ? "opacity-100" : "lg:opacity-30"}`}>
                  <p className="font-mono text-sm tracking-widest text-amber">{s.label}</p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{s.title}</h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{s.body}</p>
                </div>
                <div className="mt-8 lg:hidden" data-reveal>
                  <Panel step={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
