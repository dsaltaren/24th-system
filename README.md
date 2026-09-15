# 24th system

Reusable React components, design tokens and 93 working examples. Start with an example, then copy the components you need into your own project.

[Explore the system](https://dsaltaren.com/design-system) · [Open the Paper template](https://app.paper.design/file/01M2ED4QY2KM58B9V0TPM6G6DP/1-0)

## Get started

Use Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Choose an example from the selector. Run `npm run build` to typecheck and build all examples.

## Use the components

`src/` contains the shared React components, styles and tokens. `examples/` contains a runnable example for each component and its documented variants. Open an example to see its imports and required styles. Keep relative source paths intact when copying files. Include the imported stylesheets globally, including styles used by overlays.

The code runs without Next.js or Tailwind. Use your own content, images and licensed fonts. The Paper template is ready to duplicate and adapt, with editable components, grids and presentation layouts.

## What is included

This is a standalone snapshot of 50 portable components. It does not include the portfolio application, private documents, deployment settings, personal media, proprietary font files or the portfolio's Git history. Site-specific compositions remain in the online reference.

Rune Icons retain their Apache-2.0 license in `src/rune-icons-LICENSE.txt`. Other installed dependencies retain their own licenses.

## Stay in sync

The portable source was checked against the published registry on September 14, 2026: all 50 components and 52 source files match. `upstream.json` records the checked file hashes and the deliberate fictional avatar adaptation.

```sh
npm run check:upstream
npm run build
```

The upstream check reports source differences without overwriting local work. Review any difference against the public component bundle, preserve fictional sample data and licenses, then build before publishing. After a successful comparison, `npm run check:upstream -- --record` refreshes the provenance record.

Portfolio features such as editorial selection, analytics, contact delivery and site navigation are application code. They are not dependencies of these portable components. For those behaviors, consult the [live documentation](https://dsaltaren.com/design-system/reuse).

## Questions and sharing

Questions? [Write to Danny on LinkedIn](https://www.linkedin.com/in/dannysaltaren/). If the system helps you, share it on Twitter or LinkedIn and mention Danny Saltaren. It helps a lot.
