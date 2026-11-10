import { site } from "@/lib/site";
import { Logo } from "./Nav";

export default function Book() {
  return (
    <section id="book" className="grain relative overflow-hidden py-24 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(255,178,36,0.28),transparent_65%)] blur-2xl" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="eyebrow" data-reveal>Free demo · No obligation</p>
        <h2 className="mt-5 text-4xl font-semibold leading-[1.03] tracking-tight sm:text-7xl" data-reveal>
          The next question is coming. <span className="accent">Be there for it.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted" data-reveal>
          Pick a time and we’ll show you a starter concierge, built from your website, answering questions about your business by chat and by voice.
        </p>

        <div className="card mt-12 overflow-hidden text-left" data-reveal>
          {site.bookingUrl ? (
            <iframe
              src={site.bookingUrl}
              title="Book a free demo"
              className="h-[760px] w-full bg-white"
              loading="lazy"
            />
          ) : (
            <div className="flex min-h-[22rem] flex-col items-center justify-center gap-4 p-10 text-center">
              <span className="rounded-full border border-dashed border-amber/50 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-amber">
                Placeholder
              </span>
              <p className="text-xl font-medium">Demo booking calendar goes here</p>
              <p className="max-w-md text-sm text-muted">
                Add the GHL calendar link as <code className="font-mono text-text">bookingUrl</code> in{" "}
                <code className="font-mono text-text">lib/site.ts</code> and the calendar will appear in this panel.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 text-sm text-muted sm:flex-row sm:px-8">
        <Logo />
        <p>
          © 2026 {site.name}. {site.tagline} for small business.
        </p>
        <a href={`mailto:${site.email}`} className="transition-colors hover:text-text">
          {site.email}
        </a>
      </div>
    </footer>
  );
}
