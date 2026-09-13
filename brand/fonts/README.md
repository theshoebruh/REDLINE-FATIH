# Fonts

Currently loaded from Google Fonts in `website/index.html`:

| Role | Family | Weights |
| --- | --- | --- |
| Display / headings | Barlow Condensed | 700, 800, 900 |
| Body copy | Barlow | 400-700 |
| Technical labels, numbers, measurements | IBM Plex Mono | 400-600 |

Why: condensed grotesque headlines read as motorsport/editorial without being
decorative, and the mono carries the technical automotive language (sector numbers,
cm measurements, sheet IDs).

If a licensed brand typeface is bought later, drop the web files in this folder,
self-host them via `@font-face` in `website/src/styles/global.css`, and remove the
Google Fonts `<link>`. Keep the three roles.
