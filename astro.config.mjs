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
            { label: "What is Ecency?", slug: "get-started/what-is-ecency" },
            { label: "How it works?", slug: "get-started/how-it-works" },
            { label: "How to earn?", slug: "get-started/earning" },
            { label: "Referral system", slug: "get-started/referral" },
            { label: "Ecency vs other socials", slug: "get-started/difference" },
            { label: "Ecency vs other frontends", slug: "ecency/ecency-vs-others" },
          ],
        },
        {
          label: "Hive basics",
          items: [
            { label: "What is Hive?", slug: "hive/what-is-hive" },
            { label: "Hive accounts", slug: "hive/hive-accounts" },
            { label: "Hive tokens", slug: "common/hive-tokens" },
            { label: "Wallet", slug: "common/wallet" },
            {
              label: "Resource Credits",
              items: [
                { label: "What is it?", slug: "hive/resource-credits" },
                { label: "Voting power", slug: "common/resource-credits/voting-power" },
              ],
            },
            {
              label: "Communities",
              items: [
                { label: "Overview", slug: "hive/communities" },
                { label: "Community beneficiary", slug: "hive/community-beneficiary" },
              ],
            },
            { label: "Curation and rewards", slug: "hive/curation-and-rewards" },
            { label: "Publishing", slug: "common/posting" },
            { label: "Reblog", slug: "common/reblog" },
            { label: "Reputation", slug: "common/reputation" },
            { label: "Discover", slug: "common/discover" },
            { label: "Witness voting", slug: "guides/vote-witness" },
            {
              label: "Hivesigner",
              items: [{ label: "What is it?", slug: "hive/hivesigner/about" }],
            },
          ],
        },
        {
          label: "Using Ecency",
          items: [
            { label: "Feed", slug: "ecency/feed" },
            { label: "Publish", slug: "ecency/publish" },
            {
              label: "Decks",
              items: [{ label: "What are Decks?", slug: "ecency/decks/about" }],
            },
            {
              label: "Waves",
              items: [{ label: "What are Waves?", slug: "ecency/waves/about" }],
            },
            { label: "Market", slug: "ecency/market" },
            { label: "Mobile App", slug: "guides/use-mobile-app" },
            {
              label: "Wallets",
              items: [{ label: "Ecency Wallet", slug: "ecency/wallets/about" }],
            },
            { label: "Ecency Points", slug: "ecency/ecency-points" },
            { label: "Boost and Promote", slug: "ecency/boost-and-promote" },
            { label: "Notifications, Drafts, Bookmarks", slug: "ecency/notifications-drafts-bookmarks" },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Create account", slug: "guides/create-account" },
            { label: "Account recovery", slug: "guides/recovery" },
            { label: "Power up/down", slug: "guides/power-up-down" },
            { label: "Delegate Hive Power", slug: "guides/delegate-hp" },
            { label: "Create community", slug: "guides/create-community" },
          ],
        },
        {
          label: "Developers",
          items: [
            { label: "Ecency SDK", slug: "developers/wallets" },
            { label: "API Reference", slug: "developers/api" }, // if you later add this
            {
              label: "Extra services",
              items: [
                { label: "Hivesearcher", slug: "extra-services/hivesearcher" },
                { label: "Hivesigner", slug: "extra-services/hivesigner" },
                { label: "Hivexplorer", slug: "extra-services/hivexplorer" },
              ],
            },
          ],
        },
        { label: "FAQ", slug: "faq" },
        { label: "Contribution", slug: "contribution" },
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
              link: "/get-started/what-is-ecency",
            },
          ],
          footerText: "",
        }),
      ],
      customCss: ["./src/styles/index.css"],
    }),
  ],
});
