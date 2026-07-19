import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    ignores: ["node_modules/**", ".next/**", "vitest.config.ts", "vitest.setup.ts"],
  },
];

export default config;
