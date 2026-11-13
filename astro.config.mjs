// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "node:child_process";
import path from "path";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// Shown in the footer. Falls back when git is unavailable (e.g. a tarball build).
const commitHash = (() => {
  try {
    return execSync("git rev-parse --short HEAD", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return "dev";
  }
})();

// `astro build` starts a short-lived Vite server that pre-bundles React in
// production mode. In the shared cache folder that overwrites the files a
// running `astro dev` is serving: react/jsx-dev-runtime becomes the production
// stub (no `jsxDEV`) and every island stops hydrating until dev is restarted.
const isolateBuildDepCache = {
  name: "isolate-build-dep-cache",
  /** @param {unknown} _ @param {{ mode: string }} env */
  config: (_, { mode }) =>
    mode === "production" ? { cacheDir: "node_modules/.vite-build" } : undefined,
};

// https://astro.build/config
export default defineConfig({
  site: "https://allenyzh.com",
  integrations: [mdx(), sitemap(), react()],

  markdown: {
    shikiConfig: {
      // Both themes are emitted as CSS variables; global.css picks one per site theme.
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },

  vite: {
    plugins: [tailwindcss(), isolateBuildDepCache],
    define: {
      __COMMIT_HASH__: JSON.stringify(commitHash),
    },
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },

  adapter: cloudflare({
    imageService: "compile",
  }),

  server: {
    host: "0.0.0.0",
    // allowedHosts: ['local.watsonbio.com'],
  },
});
