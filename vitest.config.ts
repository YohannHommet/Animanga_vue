import { defineConfig } from "vitest/config";
import { mergeConfig } from "vite";
import ViteConfig from "./vite.config";
import { CoverageC8Options } from "vitest";

export default mergeConfig(
  ViteConfig,
  defineConfig({
    test: {},
    exclude: ["**/node_modules/**"],
    coverageConfig: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["**/node_modules/**", "src/main.ts", "env.d.ts"],
    },
  })
);
