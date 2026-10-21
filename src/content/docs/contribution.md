---
title: Contribution
description: How to contribute code, translations, bug reports and ideas to Ecency's open-source apps and docs.
---

Ecency is open source and grows through community help. Whether you write code, translate, test or just have good
ideas, there is a place for you.

## Repositories

All of Ecency's main projects are on [github.com/ecency](https://github.com/ecency):

| Repository | What it is |
|---|---|
| [ecency/vision-web](https://github.com/ecency/vision-web) | The web app at ecency.com plus the shared packages (`@ecency/sdk`, `@ecency/wallets`, `@ecency/render-helper`, `@ecency/ui`) and the self-hosted blog app. A pnpm monorepo. |
| [ecency/vision-mobile](https://github.com/ecency/vision-mobile) | The iOS and Android apps (React Native). |
| [ecency/docs](https://github.com/ecency/docs) | This documentation site. |

## Contributing code

1. Look at the open issues in the repository you want to work on, or open one that describes your change.
2. Fork the repository, clone it and create a branch. For vision-web, branch off `develop`.
3. Make your change and add tests where it makes sense.
   - vision-web: run `pnpm test` and `pnpm lint`. Add new UI text to the `en-US.json` locale file only; the other
     languages come from translators. Changes to the shared packages are released with
     [Changesets](https://github.com/changesets/changesets).
   - vision-mobile: follow the setup steps in its README.
4. Open a pull request with a clear description and a linked issue. For UI changes, add screenshots or a short video.

## Improving these docs

The docs are Markdown files under `src/content/docs/` in [ecency/docs](https://github.com/ecency/docs). Fork the repo,
edit or add a page and preview it with `yarn dev`. Then open a pull request.

## Translations

Translations for the web and mobile apps are managed on Crowdin:

- Web app: [crowdin.com/project/esteem-surfer](https://crowdin.com/project/esteem-surfer)
- Mobile app: [crowdin.com/project/esteem-mobile](https://crowdin.com/project/esteem-mobile)

Create a free Crowdin account, join the project and pick your language. New strings from the apps show up there
automatically. Approved translations flow back into the apps.

## Reporting bugs

Open an issue on GitHub in the right repository:

- Problems on ecency.com: [vision-web issues](https://github.com/ecency/vision-web/issues)
- Problems in the mobile app: [vision-mobile issues](https://github.com/ecency/vision-mobile/issues)

Include what you did, what you expected, what happened instead and your browser or device. Add a screenshot if you can.
Please report security issues privately to security@ecency.com instead of in a public issue.

## Ideas and feedback

Share ideas, ask questions or just say hi in the [Ecency Help chat](https://ecency.com/chats/hive-125126/channel).

## Recognizing contributors

We celebrate community members on [ecency.com/contributors](https://ecency.com/contributors). If you contributed but
don't see your name, let the team know in the Help chat.

Thank you for helping Ecency grow!
