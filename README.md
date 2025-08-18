# Ecency Documentation

This repository contains the source for the [Ecency](https://ecency.com) documentation site.  The site is built with [Astro](https://astro.build) using the [Starlight](https://starlight.astro.build) theme.

## Project Structure

Documentation content lives in [`src/content/docs`](src/content/docs).  Each Markdown (`.md`/`.mdx`) file in that directory becomes a page in the generated site.  Static assets can be placed in `public/` and referenced with relative links.

## Development

Install dependencies and start a local development server:

```bash
yarn install
yarn dev
```

The site will be available at `http://localhost:4321` and hot–reloads as you edit files.

## Build and Preview

To create a production build, run:

```bash
yarn build
```

The static site is output to the `dist/` folder.  You can preview the build locally with:

```bash
yarn preview
```

## Contributing

Improvements and additions are welcome!  Fork this repository, create your changes in `src/content/docs`, and open a pull request.  For more information see the [contribution guide](src/content/docs/contribution.md).

