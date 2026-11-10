"use client";

import { useState } from "react";
import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Live GHL chat + Voice AI widget when site.ghlWidgetId is set.
 * Until then, a clearly labeled sample launcher so the layout can be reviewed.
 */
export default function ConciergeWidget() {
  const [open, setOpen] = useState(false);

  if (site.ghlWidgetId) {
    return (
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id={site.ghlWidgetId}
        strategy="lazyOnload"
      />
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="card msg w-[min(20rem,calc(100vw-2.5rem))] bg-surface p-5 shadow-2xl">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-amber">Placeholder</p>
          <p className="mt-2 font-medium">The live concierge goes here</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Add the GHL widget ID as <code className="font-mono text-text">ghlWidgetId</code> in{" "}
            <code className="font-mono text-text">lib/site.ts</code> and this button becomes the working chat and
            voice concierge.
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open the concierge"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber to-ember text-[#1a1206] shadow-[0_10px_40px_-6px_rgba(255,150,30,0.7)] transition-transform hover:scale-105"
      >
        <span className="ring absolute inset-0 rounded-full border border-amber/60" aria-hidden />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 1 1 21 11.5z" />
        </svg>
      </button>
    </div>
  );
}
