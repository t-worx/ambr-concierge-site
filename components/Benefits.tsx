import { site } from "@/lib/site";

const items = [
  { k: "Capture", title: "Stop losing the after-hours lead", body: "Evenings, weekends, lunch rushes, holidays. The concierge answers and books while the visitor is still on your site, before they try the next business on the list." },
  { k: "Focus", title: "Give your team their day back", body: "The concierge answers the routine questions, so your staff can spend their time on the work that grows the business: serving customers, closing sales, and solving real problems." },
  { k: "Speed", title: "Answer in seconds, every time", body: "No hold, no contact form, no “we’ll get back to you.” Fast answers are often the difference between a booking and a bounce." },
  { k: "Consistency", title: "The right answer, the same way", body: "The concierge works from your approved information, so customers hear the same accurate answer whether it is Monday morning or Saturday night." },
  { k: "Cost", title: "Coverage without another hire", body: "Extend your front desk to nights and weekends without adding payroll, training, or scheduling for hours that are only sometimes busy." },
  { k: "Safety net", title: "A human is always one step away", body: "When a conversation needs judgment, the concierge hands it to your team and sends you a text. You stay in control of the conversations that matter." },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow" data-reveal>What changes</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl" data-reveal>
          More customers kept. <span className="accent">Fewer interruptions.</span>
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <article
              key={it.k}
              data-reveal={(i % 3) * 0.08}
              className="card group relative overflow-hidden p-7 transition-colors duration-500 hover:border-amber/40"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber/0 blur-3xl transition-colors duration-700 group-hover:bg-amber/20" aria-hidden />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">{it.k}</p>
              <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight">{it.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{it.body}</p>
            </article>
          ))}
        </div>
        <p className="sr-only">{site.name} benefits</p>
      </div>
    </section>
  );
}
