import { site } from "@/lib/site";

export default function About() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="card grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16" data-reveal>
          <div>
            <p className="eyebrow">Who builds it</p>
            <p className="mt-6 text-7xl font-semibold tracking-tight sm:text-8xl">
              8<span className="accent">+</span>
            </p>
            <p className="mt-2 text-muted">years building customer follow-up and automation systems for small businesses</p>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Built and managed by a person, <span className="accent">not a login.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {site.name} is run by Tracy Wittenkeller, a digital architect and AI automation consultant who has
              spent more than eight years setting up the systems small businesses use to answer,
              follow up with, and book their customers. Your concierge is configured by someone who
              has done this work for gyms, service companies, and local businesses, and who stays
              on to keep it sharp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
