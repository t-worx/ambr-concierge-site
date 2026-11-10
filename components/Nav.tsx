"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative inline-block h-3 w-3 rounded-full bg-amber shadow-[0_0_18px_4px_rgba(255,178,36,0.55)]" />
      <span className="text-[1.05rem] font-semibold tracking-[0.32em]">{site.name}</span>
    </span>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-line bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label={`${site.name} home`}>
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a className="transition-colors hover:text-text" href="#day">The problem</a>
          <a className="transition-colors hover:text-text" href="#how">How it works</a>
          <a className="transition-colors hover:text-text" href="#benefits">Benefits</a>
          <a className="transition-colors hover:text-text" href="#faq">FAQ</a>
        </nav>
        <a href="#book" className="btn !px-5 !py-2.5 !text-sm">
          Book a Free Demo
        </a>
      </div>
    </header>
  );
}
