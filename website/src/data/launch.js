/* Pre-launch switch.
   COMING_SOON = true  → every visitor sees the "Almost ready" screen.
   COMING_SOON = false → the full shop is live.
   While it is on, add ?preview to the URL (e.g. https://redlinefaith.co.za/?preview)
   to see the shop anyway. */

export const COMING_SOON = true;

export const COMING_SOON_COPY = {
  status: 'Pre-launch',
  kicker: 'The first drop is on the way',
  blurb: 'Heavyweight tees built where car culture meets Christ. Five collections, custom prints on your own artwork, and a crew worth belonging to. We are finishing the last details.',
  pillars: ['Christ', 'Cars', 'Community'],
  collections: ['JDM', 'GDM', 'Street', 'Motorsport', 'Youth']
};
