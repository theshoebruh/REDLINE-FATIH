/* Navigation, homepage story beats and standing copy. */

export const NAV = [
  { label: 'Shop', route: 'shop' },
  { label: 'Collections', route: 'shop' },
  { label: 'Custom Designs', route: 'custom' },
  { label: 'Community', route: 'community' },
  { label: 'About', route: 'about' }
];

export const BRAND = {
  name: 'Redline Faith',
  tagline: 'Shouting praise at the redline.',
  triad: 'Christ x Cars x Streetwear',
  est: 'Est. 2026 - South Africa',
  heroImage: 'images/brand/hero-crew-garage.jpeg',
  heroBlurb: 'Faith, cars and streetwear built into one thing. Heavyweight tees for people who chase apexes on Saturday and worship on Sunday.'
};

export const CUSTOM_STEPS = [
  { no: '01', title: 'Choose your shirt', detail: 'Fit, colour, size.' },
  { no: '02', title: 'Front or back',     detail: 'One print location per shirt.' },
  { no: '03', title: 'Upload and place',  detail: 'Rotate and resize on the shirt.' },
  { no: '04', title: 'See the price',     detail: 'Live pricing from the printed area.' }
];

export const COMMUNITY_TILES = [
  { no: '01', plate: '[ MEET PLATE — LATE NIGHT GARAGE, WIDE ]', caption: 'Friday night meet', tall: true },
  { no: '02', plate: '[ BUILD PLATE — S-CHASSIS, ENGINE BAY ]',  caption: 'Featured build',   tall: true },
  { no: '03', plate: '[ CREW PLATE — RF CREW PORTRAIT ]',        caption: 'The crew',         tall: true },
  { no: '04', plate: '[ TRACK PLATE — PIT LANE, MOTION BLUR ]',  caption: 'Track day',        tall: false },
  { no: '05', plate: '[ WORN PLATE — CUSTOMER IN RF TEE ]',      caption: 'Worn by you',      tall: false },
  { no: '06', plate: '[ SUNDAY PLATE — CARS + CHURCH LOT ]',     caption: 'Sunday run',       tall: false }
];

export const ABOUT_BLOCKS = [
  {
    no: '01 — Christ',
    title: 'The reason',
    body: 'Redline Faith exists because the loudest thing in our lives should not be the exhaust. Every drop starts with something we actually believe, and the design is just how we say it out loud. No watered-down message, no shame about it.'
  },
  {
    no: '02 — Cars',
    title: 'The language',
    body: 'We are car people first — spanners, oil under the nails, arguing about spring rates at 1am. JDM, German, street, motorsport, the kid with a first-gen hatch. All of it belongs here. The brand speaks that language because it is ours.'
  },
  {
    no: '03 — Community',
    title: 'The point',
    body: 'A shirt is an invitation. Wear it at a meet and somebody asks. That conversation is the whole business plan — a crew that shows up for each other on the road and off it.'
  }
];

export const FOOTER_COLUMNS = [
  { title: 'Shop',  links: [
    { label: 'All tees',   route: 'shop' },
    { label: 'JDM',        route: 'shop', filter: 'JDM' },
    { label: 'GDM',        route: 'shop', filter: 'GDM' },
    { label: 'Motorsport', route: 'shop', filter: 'MOTORSPORT' }
  ]},
  { title: 'Make',  links: [
    { label: 'Custom designs', route: 'custom' },
    { label: 'Bulk orders',    action: 'bulk' }
  ]},
  { title: 'Brand', links: [
    { label: 'About',     route: 'about' },
    { label: 'Community', route: 'community' }
  ]}
];
