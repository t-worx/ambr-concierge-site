# AMBR AI Concierge site

Scroll-driven marketing site for the AMBR AI Concierge service. Next.js, Tailwind, GSAP ScrollTrigger, Lenis.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before launch: fill in `lib/site.ts`

| Setting | What it does |
| --- | --- |
| `bookingUrl` | GHL calendar link. Replaces the placeholder panel in the Book a Free Demo section. |
| `ghlWidgetId` | The `data-widget-id` from the GHL chat widget embed code. Replaces the placeholder launcher with the live chat and Voice AI widget. Compare `components/ConciergeWidget.tsx` against your embed code in case GHL has changed the script. |
| `heroVideo` | Optional. Put a clip in `/public` (for example `/hero.mp4`) and it becomes the hero background, with playback tied to scroll position. Export it with a keyframe on every frame so scrubbing is smooth. |

## Where things are

- `app/page.tsx` sets the section order.
- `components/Hero.tsx` is the pinned opening scene.
- `components/DayStory.tsx` is the "day without / day with" scene. Edit the `events` list to change the story.
- `components/HowItWorks.tsx` holds the four sample conversations.
- `components/Calculator.tsx` is the missed revenue estimator.
- Colors and fonts are in `app/globals.css`.

## Deploy

Push to GitHub and import the repo in Vercel. No environment variables are needed.
