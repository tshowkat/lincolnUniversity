import type { Config } from "tailwindcss";

const brand = (name: string) => `rgb(var(--brand-${name}-rgb) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: brand("primary"),
          secondary: brand("secondary"),
          accent: brand("accent"),
          dark: brand("dark"),
          light: brand("light"),
          deep: brand("deep"),
        },
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-heading)", "var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1280px" },
      borderRadius: { "4xl": "2rem" },
      boxShadow: {
        soft: "0 1px 2px rgb(15 23 42 / 0.04), 0 4px 12px -2px rgb(15 23 42 / 0.06), 0 16px 32px -12px rgb(15 23 42 / 0.08)",
        lift: "0 2px 4px rgb(15 23 42 / 0.04), 0 12px 24px -6px rgb(15 23 42 / 0.10), 0 32px 56px -16px rgb(161 15 20 / 0.18)",
        glow: "0 10px 30px -10px rgb(var(--brand-primary-rgb) / 0.55)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      animation: { float: "float 6s ease-in-out infinite" },
    },
  },
  plugins: [],
};

export default config;
