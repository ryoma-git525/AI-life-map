import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#162033",
        panel: "#ffffff",
        cyanGlow: "#38bdf8",
        violetGlow: "#a78bfa",
        action: "#22c55e",
      },
      boxShadow: {
        glow: "0 18px 48px rgba(56, 189, 248, 0.18)",
        action: "0 16px 34px rgba(34, 197, 94, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
