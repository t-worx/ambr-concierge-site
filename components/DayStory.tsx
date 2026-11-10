"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { site } from "@/lib/site";

type Event = {
  time: string;
  channel: "Chat" | "Call";
  quote: string;
  without: string;
  lost: boolean;
  withAmbr: string;
};

const events: Event[] = [
  { time: "7:12 AM", channel: "Chat", quote: "Do you have anything open today?", without: "No reply. Not open yet.", lost: true, withAmbr: "Booked for 10:30 AM" },
  { time: "10:05 AM", channel: "Call", quote: "What are your prices?", without: "Staff pulled off a job", lost: false, withAmbr: "Answered instantly" },
  { time: "12:40 PM", channel: "Call", quote: "Rings during the lunch rush", without: "Sent to voicemail", lost: true, withAmbr: "Voice AI picked up" },
  { time: "3:15 PM", channel: "Chat", quote: "Do you service my area?", without: "Replied 3 hours later", lost: false, withAmbr: "Answered instantly" },
  { time: "6:48 PM", channel: "Chat", quote: "I need help with my order.", without: "No reply. Closed.", lost: true, withAmbr: "Handed off. You get a text." },
  { time: "9:47 PM", channel: "Call", quote: "Can I book for Saturday?", without: "Missed call", lost: true, withAmbr: "Booked Saturday 9 AM" },
];

const FLIP_START = 7.6;
const FLIP_STEP = 0.45;

export default function DayStory() {
  const root = useRef<HTMLElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const lost = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // JS-on starting state: the "without" day
      gsap.set(".day-card", { autoAlpha: 0, y: 40 });
      gsap.set(".st-without", { autoAlpha: 1 });
      gsap.set(".st-with", { autoAlpha: 0, y: 8 });
      gsap.set(".title-without", { autoAlpha: 1 });
      gsap.set(".title-with", { autoAlpha: 0, y: 24 });
      gsap.set(".day-sweep", { xPercent: -110 });
      gsap.set(".day-glow", { autoAlpha: 0 });
      events.forEach((e, i) =>
        gsap.set(`.day-card-${i} .day-dot`, { backgroundColor: e.lost ? "#ff6b5c" : "#6b655c" })
      );

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onUpdate: () => {
          const t = tl.time();
          let count = 0;
          let idx = 0;
          events.forEach((e, i) => {
            if (t >= i + 0.4) {
              idx = i;
              if (e.lost) count++;
            }
            if (e.lost && t >= FLIP_START + i * FLIP_STEP + 0.2) count--;
          });
          if (t >= FLIP_START) {
            idx = Math.min(events.length - 1, Math.max(0, Math.floor((t - FLIP_START) / FLIP_STEP)));
          }
          if (clock.current) clock.current.textContent = events[idx].time;
          if (lost.current) {
            lost.current.textContent = String(count);
            lost.current.style.color = count > 0 ? "var(--color-miss)" : "var(--color-amber)";
          }
        },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=420%",
          pin: true,
          scrub: 0.5,
        },
      });

      // Act 1: the day without a concierge
      events.forEach((_, i) => {
        tl.to(`.day-card-${i}`, { autoAlpha: 1, y: 0, duration: 0.5 }, i + 0.2);
      });
      tl.to({}, { duration: 0.6 }, 6.2);

      // The switch
      tl.to(".day-sweep", { xPercent: 110, duration: 1.3, ease: "power1.inOut" }, 6.7)
        .to(".title-without", { autoAlpha: 0, y: -24, duration: 0.4 }, 6.9)
        .to(".title-with", { autoAlpha: 1, y: 0, duration: 0.5 }, 7.2)
        .to(".day-glow", { autoAlpha: 1, duration: 1 }, 7.0);

      // Act 2: the same day with the concierge
      events.forEach((_, i) => {
        const at = FLIP_START + i * FLIP_STEP;
        tl.to(`.day-card-${i} .st-without`, { autoAlpha: 0, y: -8, duration: 0.2 }, at)
          .to(`.day-card-${i} .st-with`, { autoAlpha: 1, y: 0, duration: 0.25 }, at + 0.15)
          .to(`.day-card-${i}`, { borderColor: "rgba(255,178,36,0.45)", duration: 0.25 }, at)
          .to(`.day-card-${i} .day-dot`, { backgroundColor: "#ffb224", boxShadow: "0 0 14px 2px rgba(255,178,36,.6)", duration: 0.25 }, at);
      });
      tl.to({}, { duration: 1 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="day" ref={root} className="relative flex min-h-svh items-center-safe overflow-hidden pb-4 pt-[4.5rem] sm:py-20">
      <div className="day-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,178,36,0.13),transparent_60%)]" aria-hidden />
      <div className="day-sweep pointer-events-none absolute inset-y-0 left-0 z-20 w-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,178,36,0.0)_35%,rgba(255,178,36,0.35)_50%,rgba(255,178,36,0.0)_65%,transparent_100%)] motion-reduce:hidden" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-4 px-5 sm:gap-6 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        {/* Left: titles, clock, counter */}
        <div>
          <div className="relative min-h-[4rem] sm:min-h-[11rem] lg:min-h-[15rem]">
            <div className="title-without invisible absolute inset-0 motion-reduce:hidden">
              <p className="eyebrow !text-miss">One ordinary day</p>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Without a <span className="accent !text-miss">concierge.</span>
              </h2>
              <p className="mt-4 hidden max-w-md text-muted sm:block">
                Nobody did anything wrong. Your team was busy, at lunch, or home for the night.
              </p>
            </div>
            <div className="title-with">
              <p className="eyebrow">The same day</p>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                With <span className="accent">{site.name}.</span>
              </h2>
              <p className="mt-4 hidden max-w-md text-muted sm:block">
                Same questions, same hours, same staff. Every one of them gets an answer.
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-end gap-5 whitespace-nowrap sm:mt-8 sm:gap-12">
            <div className="flex items-baseline gap-2 sm:block">
              <p className="eyebrow !text-muted">Time</p>
              <span ref={clock} className="block font-mono text-base tabular-nums sm:mt-1 sm:text-4xl">
                9:47 PM
              </span>
            </div>
            <div className="flex items-baseline gap-2 sm:block">
              <p className="eyebrow !text-muted"><span className="hidden min-[380px]:inline">Customers </span>lost</p>
              <span ref={lost} className="block font-mono text-base tabular-nums text-amber sm:mt-1 sm:text-4xl">
                0
              </span>
            </div>
          </div>
        </div>

        {/* Right: the day's questions */}
        <ol className="min-w-0 space-y-1.5 sm:space-y-3">
          {events.map((e, i) => (
            <li
              key={i}
              className={`day-card day-card-${i} card flex items-center gap-3 px-4 py-1.5 sm:gap-4 sm:px-5 sm:py-4`}
            >
              <span className="day-dot h-2 w-2 shrink-0 rounded-full bg-amber" />
              <span className="hidden w-20 shrink-0 font-mono text-xs text-muted sm:block">
                {e.time}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm sm:text-base">
                  <span className="mr-2 hidden font-mono text-[0.65rem] uppercase tracking-widest text-muted sm:inline">{e.channel}</span>
                  {e.quote}
                </span>
                <span className="relative mt-0.5 block h-5 pr-16 text-xs sm:pr-0 sm:text-sm">
                  <span className="absolute right-0 top-0 font-mono text-[0.65rem] leading-5 text-muted sm:hidden">{e.time}</span>
                  <span className={`st-without invisible absolute inset-0 truncate motion-reduce:hidden ${e.lost ? "text-miss" : "text-muted"}`}>
                    {e.lost ? "✕ " : "△ "}
                    {e.without}
                  </span>
                  <span className="st-with absolute inset-0 truncate text-amber">✓ {e.withAmbr}</span>
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
