/* Collections map to car scenes. Adding one here adds it to nav, filters and the homepage. */

export const COLLECTIONS = [
  {
    id: 'JDM',
    name: 'JDM',
    tagline: 'Rising sun / rotary / night runs',
    plate: '[ COLLECTION PLATE — JDM / TOUGE ]',
    wash: 'radial-gradient(80% 80% at 70% 20%, rgba(225,6,0,.18), transparent 60%)'
  },
  {
    id: 'GDM',
    name: 'GDM',
    tagline: 'Autobahn / precision / stance',
    plate: '[ COLLECTION PLATE — GERMAN / AUTOBAHN ]',
    wash: 'radial-gradient(80% 80% at 30% 30%, rgba(255,255,255,.07), transparent 60%)'
  },
  {
    id: 'STREET',
    name: 'Street',
    tagline: 'Midnight / rolling / raw',
    plate: '[ COLLECTION PLATE — STREET RACE / NIGHT ]',
    wash: 'radial-gradient(80% 80% at 50% 80%, rgba(225,6,0,.14), transparent 60%)'
  },
  {
    id: 'MOTORSPORT',
    name: 'Motorsport',
    tagline: 'Pit lane / telemetry / flags',
    plate: '[ COLLECTION PLATE — TRACK / PIT LANE ]',
    wash: 'radial-gradient(80% 80% at 80% 70%, rgba(255,255,255,.06), transparent 60%)'
  },
  {
    id: 'YOUTH',
    name: 'Youth',
    tagline: 'First car / first faith',
    plate: '[ COLLECTION PLATE — YOUTH / FIRST CAR ]',
    wash: 'radial-gradient(80% 80% at 20% 20%, rgba(225,6,0,.12), transparent 60%)'
  }
];

/** Fallback design rationale per collection, used when a product has no copy yet. */
export const COLLECTION_IDEAS = {
  JDM: 'Late-night touge runs, a rotary screaming past the rev limiter, and the reminder that the fastest line still needs a steady hand.',
  GDM: 'German precision as a metaphor: engineered on purpose, built to last, nothing decorative that does not also serve.',
  STREET: 'Street culture without the ego. Built for the people who show up, help you bleed brakes, and pray over the car before a run.',
  MOTORSPORT: 'Pit-lane language — sector times, flags, telemetry — borrowed to talk about running a race worth finishing.',
  YOUTH: 'For the first car, the first set of keys, the first time faith is actually yours and not inherited.'
};
