import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const instrument = localFont({
  variable: "--font-instrument",
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "AMBR | The AI Concierge for Your Website",
  description:
    "AMBR is a done-for-you AI concierge for your website. It answers customer questions by chat and voice, books appointments, and hands off to your team, day and night.",
  openGraph: {
    title: "AMBR | The AI Concierge for Your Website",
    description:
      "Stop losing customers to unanswered questions. AMBR answers by chat and voice, books appointments, and hands off to your team.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrument.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
