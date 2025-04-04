// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeBlack from "starlight-theme-black";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.ecency.com",
  integrations: [
    starlight({
      title: "Ecency",
      social: {
        github: "https://github.com/ecency",
      },
      logo: {
        src: "./src/assets/logo-circle.svg",
      },
      sidebar: [
        {
          label: "Get started",
          items: [
            {
              label: "What is Ecency?",
              slug: "get-started/what-is-ecency",
            },
            {
              label: "How it is different?",
              slug: "get-started/difference",
            },
            {
              label: "How it works?",
              slug: "get-started/how-it-works",
            },
            {
              label: "How to earn?",
              slug: "get-started/earning",
            },
            {
              label: "Referral system",
              slug: "get-started/referral",
            },
          ],
        },

        {
          label: "Hive basics",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Account security", slug: "common/keys" },
            { label: "Hive tokens", slug: "common/hive-tokens" },
            { label: "Wallet", slug: "common/wallet" },
            {
              label: "Resource credits",
              items: [
                {
                  label: "What is it?",
                  slug: "common/resource-credits/what-is-it",
                },
                {
                  label: "Voting power",
                  slug: "common/resource-credits/voting-power",
                },
              ],
            },
            {
              label: "Voting",
              slug: "common/voting",
            },
            {
              label: "Reputation",
              slug: "common/reputation",
            },
            {
              label: "Posting",
              slug: "common/posting",
            },
            {
              label: "Reblog",
              slug: "common/reblog",
            },
            {
              label: "Discover",
              slug: "common/discover",
            },
          ],
        },
        {
          label: "Vision",
          items: [
            {
              label: "Feed",
              slug: "feed",
            },
            {
              label: "Publish",
              slug: "publish",
            },
            {
              label: "Decks",
              items: [
                {
                  label: "What are Decks?",
                  slug: "decks/about",
                },
              ],
            },
            {
              label: "Market",
              slug: "market",
            },
            {
              label: "Witnesses",
              slug: "witnesses",
            },
          ],
        },

        {
          label: "Hivesigner",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "What is it?", slug: "hivesigner/about" },
          ],
        },
        {
          label: "SDK",
          items: [
            {
              label: "External wallets",
              slug: "sdk/wallets",
            },
          ],
        },
        {
          label: "FAQ",
          slug: "faq",
        },
        {
          label: "Contribution",
          slug: "contribution",
        },
      ],
      plugins: [
        starlightThemeBlack({
          navLinks: [
            {
              label: "Open Ecency",
              link: "https://ecency.com",
              attrs: {
                target: "_blank",
              },
            },
            {
              label: "Docs",
              link: "/getting-started/what-is-ecency",
            },
          ],
          footerText: "",
        }),
      ],
      customCss: ["./src/styles/index.css"],
    }),
  ],
});
