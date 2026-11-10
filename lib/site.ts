/**
 * Site settings. Fill these in before launch.
 */
export const site = {
  name: "AMBR",
  tagline: "AI Concierge",
  email: "tracywittenkeller@gmail.com",

  /** GHL calendar embed URL, e.g. https://api.leadconnectorhq.com/widget/booking/XXXX
   *  Leave empty to show the placeholder panel in the booking section. */
  bookingUrl: "",

  /** GHL chat + Voice AI widget ID (the data-widget-id value from the GHL embed code).
   *  Leave empty to show the sample concierge launcher instead of the live widget. */
  ghlWidgetId: "",

  /** Optional scroll-scrubbed hero clip, e.g. "/hero.mp4" placed in /public.
   *  Leave empty to use the coded amber orb background. */
  heroVideo: "",
};
