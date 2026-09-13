# Products

One folder per collection, one folder per SKU inside it.

The numbering (`JDM 01`, `GDM 02`, `MOTORSPORT 01`) is part of the design system —
it is the product's name, not a warehouse code. Keep it sequential per collection and
never reuse a retired number.

Adding a product:
1. Create `products/<collection>/<collection>-<nn>/` and drop artwork + photography in.
2. Copy the web-sized images to `website/public/images/products/<slug>/`.
3. Add an entry to `website/src/data/products.js` with matching `slug` and `images`.

A product with no `images` array renders a labelled placeholder plate, so it is safe to
list a design before the shoot happens.
