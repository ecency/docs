# Ecency Documentation

Source for [docs.ecency.com](https://docs.ecency.com), the documentation for [Ecency](https://ecency.com). The site is
built with [Astro](https://astro.build) and the [Starlight](https://starlight.astro.build) docs theme.

## Project structure

- `src/content/docs/`: the pages. Each `.md` or `.mdx` file becomes a page, and its path is its URL
  (for example `src/content/docs/developers/sdk.mdx` is `/developers/sdk/`).
- `astro.config.mjs`: site config, sidebar and redirects.
- `public/`: static files served as is.

Every page starts with frontmatter that has a `title` and a one-sentence `description`.

## Development

You need Node.js 22.22 or newer (the deploy workflow uses Node 22) and Yarn.

```bash
yarn install
yarn dev
```

The site runs at `http://localhost:4321` and reloads as you edit.

## Build and preview

```bash
yarn build
yarn preview
```

The static site is written to `dist/`. Pushes to `main` are built and deployed to GitHub Pages by
`.github/workflows/deploy.yml` (`withastro/action`).

## Contributing

Fork the repository, edit or add pages under `src/content/docs/`, and open a pull request. See the
[contribution guide](https://docs.ecency.com/contribution/) for more.
