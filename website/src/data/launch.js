/* Pre-launch switch.
   COMING_SOON = true  → every visitor sees the "Almost ready" screen.
   COMING_SOON = false → the full shop is live.
   While it is on, add ?preview to the URL (e.g. https://redlinefaith.co.za/?preview)
   to see the shop anyway. */

export const COMING_SOON = false;

export const COMING_SOON_COPY = {
  status: 'Pre-launch',
  kicker: 'A note from the garage',
  note: [
    'Hope you’re excited — we know we are. We’re still tightening the last few bolts and finishing our build before the grand reveal.',
    'Five collections, custom prints on your own artwork, and a crew worth belonging to. Stay tuned and stay holy.'
  ],
  signoff: 'See you at the line,',
  signature: 'The RF Team',
  pillars: ['Christ', 'Cars', 'Community'],
  collections: ['JDM', 'GDM', 'Street', 'Motorsport', 'Youth']
};
