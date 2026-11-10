"use client";

import { useState } from "react";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Slider(props: {
  label: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-muted">{props.label}</span>
        <span className="font-mono text-lg tabular-nums text-text">{props.display}</span>
      </span>
      <input
        type="range"
        className="mt-4"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
      />
    </label>
  );
}

export default function Calculator() {
  const [missed, setMissed] = useState(10);
  const [rate, setRate] = useState(20);
  const [value, setValue] = useState(400);

  const monthly = missed * (52 / 12) * (rate / 100) * value;
  const yearly = monthly * 12;

  return (
    <section id="math" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow" data-reveal>Run your own numbers</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl" data-reveal>
          What is an unanswered question <span className="accent">costing you?</span>
        </h2>

        <div className="card mt-14 grid overflow-hidden lg:grid-cols-2" data-reveal>
          <div className="space-y-10 p-7 sm:p-10">
            <Slider label="Calls and chats that go unanswered each week" value={missed} min={1} max={60} step={1} display={String(missed)} onChange={setMissed} />
            <Slider label="Share of those that would have become customers" value={rate} min={5} max={60} step={5} display={`${rate}%`} onChange={setRate} />
            <Slider label="Average value of a new customer" value={value} min={50} max={5000} step={50} display={fmt(value)} onChange={setValue} />
          </div>
          <div className="relative flex flex-col justify-center border-t border-line bg-[radial-gradient(ellipse_at_top_right,rgba(255,178,36,0.16),transparent_65%)] p-7 sm:p-10 lg:border-l lg:border-t-0">
            <p className="eyebrow !text-muted">Estimated revenue walking away</p>
            <p className="mt-4 text-5xl font-semibold tracking-tight tabular-nums sm:text-7xl">
              {fmt(monthly)}
              <span className="ml-2 text-lg font-normal text-muted sm:text-xl">/ month</span>
            </p>
            <p className="mt-3 font-mono text-lg tabular-nums text-amber">{fmt(yearly)} / year</p>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted">
              This is a simple estimate based on the numbers you enter, not a promise of results.
              On your demo we will work through it with your real call and chat volume.
            </p>
            <a href="#book" className="btn mt-8 self-start">Book a Free Demo</a>
          </div>
        </div>
      </div>
    </section>
  );
}
