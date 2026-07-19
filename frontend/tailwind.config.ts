import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0b1220",
          900: "#0f1b30",
          800: "#152238",
          700: "#1c2c47",
        },
        accent: {
          blue: "#2f6fed",
          teal: "#12b3a6",
          amber: "#f2a13c",
          red: "#e5484d",
          green: "#22a06b",
        },
        surface: {
          light: "#f4f6fb",
          card: "#ffffff",
          cardDark: "#111d33",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 27, 48, 0.06), 0 8px 24px rgba(15, 27, 48, 0.06)",
        glass: "0 8px 32px rgba(15, 27, 48, 0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
