# Redline Faith — website

React + Vite prototype storefront. Christian automotive streetwear:
**Christ × Cars × Streetwear**, tagline *"Shouting praise at the redline."*

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

## Deploy

Every push to `main` builds this folder and publishes it to GitHub Pages
(`.github/workflows/deploy-pages.yml`):

- Live: https://redlinefaith.co.za/ (www and theshoebruh.github.io/REDLINE-FATIH redirect here)
- Original single-file prototype: https://redlinefaith.co.za/prototype.html

`vite.config.js` uses a relative `base`, so asset paths must stay relative
(`images/...`, not `/images/...`).

Custom domain: `redlinefaith.co.za` (GoDaddy DNS). It is set under repo
Settings → Pages — **not** via a `CNAME` file, which Actions-based Pages ignores.
GoDaddy records: four `A` records on `@` → 185.199.108.153, .109.153, .110.153,
.111.153, and `CNAME` `www` → `theshoebruh.github.io`.

## Pre-launch screen

`src/pages/ComingSoon.jsx` replaces the whole site while `COMING_SOON` is `true` in
`src/data/launch.js` (all its copy lives there too). It is deliberately static —
no countdown, no email signup, no contact line. Add `?preview` to the URL to see
the shop while it is on.

## Work-in-progress disclaimer

`src/components/DisclaimerGate.jsx` — full-screen notice shown when entering the
shop: the designs are AI-generated placeholders, real artists will make the final
artwork, and the store is not live. Acknowledged state lives in sessionStorage, so
it shows once per visit. Delete the component and its mount in
`layouts/SiteLayout.jsx` when the real artwork lands and the store opens.

## What works

Everything is client-side with mock data — no backend, no payments.

- Homepage story flow (01 brand → 08 shop)
- Shop with collection filters, sort, and header search
- Product page: gallery, colour/size variants, size-guide modal, expandable
  fabric & care, reviews rail, related-products rail
- **Custom design flow**: shirt/colour/size → front or back → rotation → artwork
  upload → live cm dimensions → live tier pricing → sheet placement → summary
- Cart drawer with quantity changes and removal
- Guest checkout with field validation, then order confirmation showing the
  assigned production sheet
- Community page with a placeholder submission flow
- Responsive down to phone width; nav collapses to a sheet under 1100px

## Structure

```
src/
  data/        all mock content and prototype pricing — start here
  utils/       artwork analysis, print pricing, sheet packing
  components/  reusable UI
  pages/       one file per route
  layouts/     site chrome wrapper
  styles/      tokens.css (re-skin here) + global.css
  context/     StoreContext — route, cart, sheets, toast
public/        images, fonts, icons, favicon
```

## The custom print engine

Three files carry the real logic:

**`utils/artwork.js`** — on upload, the image is drawn to a canvas and scanned for
its non-transparent bounding box. Pricing uses *visible* artwork only: transparent
padding around a PNG is never charged for. The file is cropped to that box, and
effective DPI at the chosen print size drives the resolution warning.

**`data/pricing.js`** — the tier table (A7 R250 → A3 R420), the 100 × 60 cm sheet,
flat shipping, production lead time. All prototype values; edit freely.

**`utils/packing.js`** — first-fit rectangle packing on the shared supplier sheet.
Prints may rotate 90°, may never overlap, and a new sheet opens automatically when
one is full. Sheet space is allocated **only** when an order is placed
(`StoreContext.placeOrder`) — browsing the editor reserves nothing. Other
customers' orders are anonymous grey blocks; their artwork is never shown.

## Replacing prototype data

| What | Where |
| --- | --- |
| Products, copy, Scripture | `src/data/products.js` |
| Collections | `src/data/collections.js` |
| Print tiers, sheet size, shipping | `src/data/pricing.js` |
| Blank garments, sizes, size chart | `src/data/shirts.js` |
| Reviews | `src/data/reviews.js` |
| Nav, homepage beats, About copy | `src/data/site.js` |
| Colours, type, spacing | `src/styles/tokens.css` |

## Known gaps

- No router — `StoreContext` holds a route name. Swap in React Router when URLs
  and deep links are needed.
- No accounts (deliberate — guest checkout is the primary flow).
- Payment is a visual placeholder; architecture assumes a South African provider
  is dropped into `pages/Checkout.jsx`.
- Sheet state is in memory. Real sheets need a server: placement must be
  transactional or two customers can claim the same space.
- Photography is placeholder plates except the hero and JDM 01.
