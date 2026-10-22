// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLlmsTxt from "starlight-llms-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.ecency.com",
  redirects: {
    // Pages merged in the 2026-10 docs review
    "/common/keys": "/hive/hive-accounts/",
    "/common/voting": "/hive/curation-and-rewards/",
    "/common/resource-credits/what-is-it": "/hive/resource-credits/",
    "/common/resource-credits/voting-power": "/hive/curation-and-rewards/",
    "/get-started/difference": "/ecency/ecency-vs-others/",
    "/get-started/how-it-works": "/get-started/what-is-ecency/",
    // Inbound links used by the web app
    "/communities/default-beneficiary": "/hive/custom-beneficiary/",
    "/publish": "/ecency/publish/",
  },
  integrations: [
    starlight({
      title: "Ecency",
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/ecency" },
      ],
      logo: {
        src: "./src/assets/logo-circle.svg",
      },
      head: [
        { tag: "meta", attrs: { property: "og:image", content: "https://docs.ecency.com/og-image.png" } },
        { tag: "meta", attrs: { name: "twitter:image", content: "https://docs.ecency.com/og-image.png" } },
      ],
      sidebar: [
        {
          label: "Get started",
          items: [
            { label: "What is Ecency?", slug: "get-started/what-is-ecency" },
            { label: "Onboarding checklist", slug: "get-started/onboarding-checklist" },
            { label: "How to earn", slug: "get-started/earning" },
            { label: "Referrals", slug: "get-started/referral" },
            { label: "Why Ecency", slug: "ecency/ecency-vs-others" },
          ],
        },
        {
          label: "Hive basics",
          collapsed: true,
          items: [
            { label: "What is Hive?", slug: "hive/what-is-hive" },
            { label: "Accounts and keys", slug: "hive/hive-accounts" },
            { label: "Hive tokens", slug: "common/hive-tokens" },
            { label: "Resource credits", slug: "hive/resource-credits" },
            { label: "RC troubleshooting", slug: "common/resource-credits/troubleshooting" },
            { label: "Common errors and fixes", slug: "common/errors" },
            { label: "Voting, curation and rewards", slug: "hive/curation-and-rewards" },
            { label: "Content guidelines", slug: "common/posting" },
            { label: "Reblog", slug: "common/reblog" },
            { label: "Reputation", slug: "common/reputation" },
            { label: "Governance", slug: "hive/governance" },
            { label: "Communities", slug: "hive/communities" },
            { label: "Custom beneficiary", slug: "hive/custom-beneficiary" },
          ],
        },
        {
          label: "Social",
          items: [
            { label: "Feed", slug: "ecency/feed" },
            { label: "Waves", slug: "ecency/waves/about" },
            { label: "Chats", slug: "ecency/chats" },
            { label: "Esie AI helper", slug: "ecency/esie" },
            { label: "Tips", slug: "ecency/tips" },
            { label: "Email newsletters", slug: "ecency/newsletters" },
            { label: "Discover", slug: "ecency/discover" },
            { label: "Decks", slug: "ecency/decks/about" },
            { label: "Search", slug: "ecency/search" },
            { label: "Notifications, drafts, bookmarks", slug: "ecency/notifications-drafts-bookmarks" },
            { label: "Mute users", slug: "ecency/mute-users" },
            { label: "Translation", slug: "ecency/translation" },
          ],
        },
        {
          label: "Create",
          items: [
            { label: "Publish", slug: "ecency/publish" },
            { label: "Scheduled posts", slug: "ecency/scheduled-posts" },
            { label: "Snippets and templates", slug: "ecency/snippets-templates" },
            { label: "AI writing assistant", slug: "ecency/ai-assist" },
            { label: "AI images", slug: "ecency/ai-images" },
            { label: "Listen to posts", slug: "ecency/listen" },
            { label: "Blog hosting", slug: "ecency/blog-hosting" },
          ],
        },
        {
          label: "Points and perks",
          items: [
            { label: "Ecency Points", slug: "ecency/ecency-points" },
            { label: "Get Points", slug: "ecency/buy-points" },
            { label: "Daily rewards", slug: "ecency/daily-rewards" },
            { label: "Boost and Promote", slug: "ecency/boost-and-promote" },
            { label: "Ecency Pro", slug: "ecency/ecency-pro" },
            { label: "Curation desk", slug: "ecency/curation-desk" },
          ],
        },
        {
          label: "Wallet",
          items: [
            { label: "Ecency wallet", slug: "ecency/wallets/about" },
            { label: "Payouts and conversions", slug: "ecency/wallets/payouts-and-conversions" },
            { label: "Hive Engine tokens", slug: "ecency/wallets/engine-tokens" },
            { label: "Cross-chain wallets", slug: "ecency/wallets/cross-chain-wallets" },
            { label: "Market", slug: "ecency/market" },
          ],
        },
        {
          label: "Account",
          items: [
            { label: "Profile", slug: "ecency/profile" },
            { label: "Settings", slug: "ecency/settings" },
            { label: "Report content", slug: "ecency/report-content" },
          ],
        },
        {
          label: "Apps and games",
          items: [
            { label: "Mobile app", slug: "guides/use-mobile-app" },
            { label: "Mobile FAQ", slug: "ecency/mobile-faq" },
            { label: "Raidstead", slug: "ecency/raidstead" },
            { label: "Honeyback", slug: "ecency/honeyback" },
          ],
        },
        {
          label: "Guides",
          collapsed: true,
          items: [
            { label: "Create account", slug: "guides/create-account" },
            { label: "Login methods", slug: "guides/login-methods" },
            { label: "Manage keys", slug: "guides/manage-keys" },
            { label: "Account recovery", slug: "guides/recovery" },
            { label: "Seed phrase migration", slug: "guides/seed-phrase-migration" },
            { label: "Power up and down", slug: "guides/power-up-down" },
            { label: "Delegate Hive Power", slug: "guides/delegate-hp" },
            { label: "Delegate RC", slug: "guides/delegate-rc" },
            { label: "HBD savings interest", slug: "guides/hbd-savings-interest" },
            { label: "Recurrent transfers", slug: "guides/recurrent-transfers" },
            { label: "Exchanges: deposit and withdraw", slug: "guides/exchanges" },
            { label: "Create community", slug: "guides/create-community" },
            { label: "Moderate community", slug: "guides/moderate-community" },
            { label: "Vote for witnesses", slug: "guides/vote-witness" },
            { label: "Vote on proposals", slug: "guides/vote-proposals" },
          ],
        },
        {
          label: "Developers",
          collapsed: true,
          items: [
            { label: "Ecency SDK", slug: "developers/sdk" },
            { label: "Ecency wallets", slug: "developers/wallets" },
            { label: "Render helper", slug: "developers/render-helper" },
            { label: "Public endpoints", slug: "developers/public-endpoints" },
            { label: "Images", slug: "developers/images" },
            { label: "Mobile deep links", slug: "developers/deep-links" },
            { label: "Ecency chats", slug: "developers/chats" },
            { label: "Analytics", slug: "developers/analytics" },
            { label: "x402 payments", slug: "developers/x402" },
            { label: "Self-hosted blog", slug: "developers/self-hosted-blog" },
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
        starlightLlmsTxt({
          projectName: "Ecency",
          description: "Ecency is a social app on the Hive blockchain. These docs cover using Ecency, Hive basics, guides and the Ecency developer tools.",
        }),
      ],
      components: {
        SocialIcons: "./src/components/SocialIcons.astro",
        PageTitle: "./src/components/PageTitle.astro",
      },
      customCss: [
        "@fontsource/geist-sans/400.css",
        "@fontsource/geist-sans/600.css",
        "@fontsource/geist-sans/700.css",
        "@fontsource/geist-mono/400.css",
        "./src/styles/ecency.css",
        "./src/styles/visuals.css",
      ],
    }),
  ],
});
